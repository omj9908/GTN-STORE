const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/metamaskDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB 연결 성공"))
  .catch(err => console.error("MongoDB 연결 실패:", err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // 사용자 ID
    password: { type: String, required: true }, // 해싱된 비밀번호
    walletAddress: { type: String, unique: true } // MetaMask 주소 (없을 수도 있음)
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
    const { username, password, walletAddress } = req.body;

    if (!username || !password || !walletAddress) {
        return res.json({ success: false, message: "ID, 비밀번호 및 지갑 주소를 입력하세요." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: "이미 존재하는 ID입니다. 다른 ID를 사용하세요." });
        }

        const existingWallet = await User.findOne({ walletAddress });
        if (existingWallet) {
            return res.json({ success: false, message: "이미 등록된 MetaMask 계정입니다. 로그인하세요." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, walletAddress });
        await newUser.save();

        res.json({ success: true, message: "회원가입 성공! 이제 로그인하세요." });
    } catch (error) {
        res.status(500).json({ success: false, message: "회원가입 실패", error });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password, walletAddress } = req.body;


    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ success: false, message: "ID가 존재하지 않습니다." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "비밀번호가 일치하지 않습니다." });
        }

        if (user.walletAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            return res.json({ success: false, message: "MetaMask 주소가 일치하지 않습니다." });
        }

        res.json({ success: true, message: "로그인 성공!", walletAddress: user.walletAddress });
    } catch (error) {
        res.status(500).json({ success: false, message: "로그인 실패", error });
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

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
