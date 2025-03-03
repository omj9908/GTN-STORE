const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { getAddress, isAddress } = require("ethers"); // ✅ ethers 6.x 버전 대응

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/metamaskDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB 연결 성공"))
  .catch(err => console.error("🚨 MongoDB 연결 실패:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    walletAddress: { type: String, unique: true },
    purchasedSkins: { type: [Number], default: [] },
    equippedSkin: {
        id: { type: Number, default: null },
        title: { type: String, default: "" }
    }
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
    try {
        let { username, password, walletAddress } = req.body;

        console.log("🔍 [회원가입 요청] 받은 데이터:", { username, password, walletAddress });

        if (!username || !password || !walletAddress) {
            return res.status(400).json({ success: false, message: "🚨 ID, 비밀번호 및 지갑 주소를 입력하세요." });
        }

        try {
            // ✅ **ethers 6.x 버전에 맞게 주소 변환 방식 변경**
            walletAddress = walletAddress.toLowerCase(); // 🔥 소문자로 변환
            if (!isAddress(walletAddress)) {
                throw new Error("올바르지 않은 지갑 주소 형식");
            }
            walletAddress = getAddress(walletAddress); // ✅ ethers 6.x 방식으로 체크섬 변환
        } catch (error) {
            console.error("🚨 [지갑 주소 변환 실패] 올바르지 않은 MetaMask 주소:", walletAddress);
            return res.status(400).json({ success: false, message: "❌ 올바른 MetaMask 지갑 주소를 입력하세요.", error: error.message });
        }

        console.log("✅ 변환된 지갑 주소:", walletAddress);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: "❌ 이미 존재하는 ID입니다. 다른 ID를 사용하세요." });
        }

        const existingWallet = await User.findOne({ walletAddress });
        if (existingWallet) {
            return res.json({ success: false, message: "❌ 이미 등록된 MetaMask 계정입니다. 로그인하세요." });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // ✅ 비밀번호 해싱 추가

        const newUser = new User({ username, password: hashedPassword, walletAddress });

        await newUser.save();
        console.log("✅ 회원가입 성공 - 저장된 사용자:", newUser);

        res.json({ success: true, message: "✅ 회원가입 성공! 이제 로그인하세요." });

    } catch (error) {
        console.error("🚨 회원가입 오류:", error);
        res.status(500).json({ success: false, message: "서버 내부 오류 발생", error });
    }
});


app.post("/api/login", async (req, res) => {
    try {
        const { username, password, walletAddress } = req.body;
        if (!username || !password || !walletAddress) {
            return res.status(400).json({ success: false, message: "모든 필드를 입력하세요." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // ✅ 비밀번호 검증
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "아이디 또는 비밀번호가 틀렸습니다." });
        }

        const storedWalletAddress = user.walletAddress.toLowerCase();
        const formattedWalletAddress = walletAddress.toLowerCase();

        if (storedWalletAddress !== formattedWalletAddress) {
            return res.status(401).json({ success: false, message: "MetaMask 주소가 일치하지 않습니다." });
        }

        res.json({ success: true, message: "로그인 성공!" });

    } catch (error) {
        console.error("🚨 로그인 오류:", error);
        res.status(500).json({ success: false, message: "서버 내부 오류" });
    }
});


app.post("/api/metamask-login", async (req, res) => {
    const { walletAddress } = req.body;

    try {
        const user = await User.findOne({ walletAddress });

        if (!user) {
            return res.json({ success: false, message: "MetaMask 계정이 등록되지 않았습니다." });
        }

        res.json({ success: true, message: "MetaMask 로그인 성공!", walletAddress: user.walletAddress });
    } catch (error) {
        res.status(500).json({ success: false, message: "로그인 실패", error });
    }
});

// skin
app.post("/api/buy-skin", async (req, res) => {
    const { walletAddress, itemId } = req.body;

    if (!walletAddress || itemId === undefined) {
        return res.status(400).json({ success: false, message: "지갑 주소와 아이템 ID를 입력하세요." });
    }

    try {
        const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
        }

        if (!user.purchasedSkins.includes(itemId)) {
            user.purchasedSkins.push(itemId);
        }

        await user.save();

        console.log(`✅ ${walletAddress}가 스킨(${itemId})을 구매함.`);
        res.json({ success: true, message: "스킨 구매 성공!", purchasedSkins: user.purchasedSkins });
    } catch (error) {
        console.error("🚨 스킨 구매 오류:", error);
        res.status(500).json({ success: false, message: "스킨 구매 실패", error });
    }
});

app.post("/api/equip-skin", async (req, res) => {
    let { walletAddress, skinId, skinTitle } = req.body;

    if (!walletAddress || skinId === undefined) {
        console.log("🚨 요청 오류: 지갑 주소 또는 스킨 ID 없음");
        return res.status(400).json({ success: false, message: "지갑 주소와 아이템 ID를 입력하세요." });
    }

    if (!skinTitle) {
        skinTitle = "기본 스킨"; // 🚨 **skinTitle이 undefined일 경우 기본값 설정**
    }

    walletAddress = walletAddress.toLowerCase();

    try {
        const user = await User.findOne({ walletAddress });

        if (!user) {
            return res.status(404).json({ success: false, message: "사용자가 존재하지 않습니다." });
        }

        // 🔥 **이미 장착된 스킨이 있으면 장착을 막고 경고 메시지를 반환**
        if (user.equippedSkin.id !== null) {
            return res.status(400).json({
                success: false,
                message: `이미 '${user.equippedSkin.title}' 스킨이 장착되어 있습니다. 먼저 해제하세요.`,
                equippedSkin: user.equippedSkin
            });
        }

        // ✅ **새로운 스킨 장착**
        user.equippedSkin = { id: skinId, title: skinTitle };
        await user.save();

        console.log(`✅ ${walletAddress}가 스킨(${skinId} - ${skinTitle})을 장착함.`);
        res.json({ success: true, message: `스킨(${skinTitle}) 장착 성공`, equippedSkin: user.equippedSkin });
    } catch (error) {
        console.error("🚨 스킨 장착 중 오류 발생:", error);
        res.status(500).json({ success: false, message: "스킨 장착 실패", error });
    }
});


app.post("/api/un-equip-skin", async (req, res) => {
    let { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ success: false, message: "지갑 주소를 입력하세요." });
    }

    walletAddress = walletAddress.toLowerCase();

    try {
        const user = await User.findOne({ walletAddress });

        if (!user) {
            return res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
        }

        // ✅ `id: 0`이 falsy 값으로 처리되지 않도록 수정
        if (user.equippedSkin.id === null || user.equippedSkin.id === undefined) {
            return res.status(400).json({ success: false, message: "장착된 스킨이 없습니다." });
        }

        console.log(`❌ ${walletAddress}가 스킨(${user.equippedSkin.id} - ${user.equippedSkin.title}) 장착 해제.`);

        // ✅ 장착 해제 처리
        user.equippedSkin = { id: null, title: "" };
        await user.save();

        res.json({ success: true, message: "스킨 장착 해제 성공!" });
    } catch (error) {
        console.error("🚨 스킨 장착 해제 오류:", error);
        res.status(500).json({ success: false, message: "스킨 장착 해제 실패", error });
    }
});


app.post("/api/get-skins", async (req, res) => {
    let { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ success: false, message: "지갑 주소를 입력하세요." });
    }

    walletAddress = walletAddress.toLowerCase();

    try {
        const user = await User.findOne({ walletAddress });

        if (!user) {
            return res.status(404).json({ success: false, message: "사용자가 존재하지 않습니다." });
        }

        res.json({
            success: true,
            purchasedSkins: user.purchasedSkins,
            equippedSkin: user.equippedSkin
        });
    } catch (error) {
        console.error("🚨 스킨 정보 불러오기 실패:", error);
        res.status(500).json({ success: false, message: "스킨 정보 불러오기 실패", error });
    }
});

app.post("/api/get-purchased-skins", async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({ success: false, message: "지갑 주소가 필요합니다." });
        }

        // 🔹 데이터베이스에서 구매한 스킨을 조회하는 코드 (예제)
        const user = await User.findOne({ walletAddress }); // 예제 코드 (DB 확인 필요)
        const purchasedSkins = user ? user.purchasedSkins : [];

        res.json({ success: true, purchasedSkins });
    } catch (error) {
        console.error("🚨 get-purchased-skins API 오류:", error);
        res.status(500).json({ success: false, message: "서버 오류 발생" });
    }
});


app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
