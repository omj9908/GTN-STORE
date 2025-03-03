const NFT_CONTRACT_ADDRESS = "0x7ca8d5bbc44f936a4a575952341e6821967ffdfe"; // ✅ 배포된 컨트랙트 주소
const GANACHE_RPC_URL = "http://127.0.0.1:7545";

let provider, signer, nftContract, currentAccount;

const ABI_NFT = [
    {
        "inputs": [],
        "name": "getNFTsForSale",
        "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "getNFTInfo",
        "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "string", "name": "description", "type": "string" },
            { "internalType": "string", "name": "tokenURI", "type": "string" },
            { "internalType": "uint256", "name": "price", "type": "uint256" },
            { "internalType": "bool", "name": "isForSale", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
        "name": "buyNFT",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];

// ✅ MetaMask 연결
async function connectWallet() {
    if (!window.ethereum) {
        alert("🚨 MetaMask가 설치되어 있지 않습니다!");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    currentAccount = await signer.getAddress();
    nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ABI_NFT, signer);

    document.getElementById("walletAddress").textContent = `🔗 ${currentAccount}`;
    await loadMarketplaceNFTs();
}

// ✅ IPFS URL 변환
function formatIPFSUrl(ipfsURI) {
    if (!ipfsURI) return "";
    if (ipfsURI.startsWith("ipfs://")) {
        return ipfsURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    return ipfsURI;
}

// ✅ NFT 메타데이터에서 이미지 가져오기
async function fetchImageFromMetadata(tokenURI) {
    console.log(`🔍 Fetching metadata from: ${tokenURI}`);

    try {
        const formattedURI = formatIPFSUrl(tokenURI);
        const response = await fetch(formattedURI);
        if (!response.ok) throw new Error(`Failed to fetch metadata: ${response.status}`);
        const metadata = await response.json();

        let imageUrl = metadata.image || "https://dummyimage.com/250x250/cccccc/000000.png&text=No+Image";
        if (imageUrl.startsWith("ipfs://")) {
            imageUrl = formatIPFSUrl(imageUrl);
        }

        return imageUrl;
    } catch (error) {
        console.error("❌ NFT 메타데이터 로드 오류:", error);
        return "https://dummyimage.com/250x250/cccccc/000000.png&text=No+Image";
    }
}

// ✅ 판매 중인 NFT 목록 불러오기
async function loadMarketplaceNFTs() {
    console.log("📌 판매 중인 NFT 목록 불러오기...");

    const nftList = document.getElementById("nftList");
    nftList.innerHTML = "";

    try {
        // ✅ 판매 중인 NFT 조회
        const tokenIds = await nftContract.getNFTsForSale();

        console.log(`🛒 판매 중인 NFT 개수 (조회된 전체): ${tokenIds.length}`);

        for (const tokenId of tokenIds) {
            const [name, description, tokenURI, price, isForSale] = await nftContract.getNFTInfo(tokenId);

            // ✅ 판매 중인지 다시 한 번 확인
            if (!isForSale) continue;

            const imageUrl = await fetchImageFromMetadata(tokenURI);

            const nftItem = document.createElement("div");
            nftItem.classList.add("nft-item");
            nftItem.innerHTML = `
                <img src="${imageUrl}" width="200">
                <p><strong>이름:</strong> ${name}</p>
                <p><strong>설명:</strong> ${description}</p>
                <p><strong>가격:</strong> ${ethers.utils.formatEther(price)} GTN</p>
                <button class="btn btn-success" onclick="buyNFT(${tokenId}, ${price})">🛒 구매하기</button>
            `;
            nftList.appendChild(nftItem);
        }
    } catch (error) {
        console.error("🚨 판매 목록 불러오기 실패:", error);
    }
}

async function buyNFT(tokenId, price) {
    try {
        console.log(`📌 NFT #${tokenId} 구매 요청`);

        const [name, description, tokenURI, currentPrice, isForSale] = await nftContract.getNFTInfo(tokenId);
        if (!isForSale) {
            alert("🚨 상품이 절품되었습니다!");
            return;
        }

        const priceInWei = ethers.utils.parseEther(ethers.utils.formatEther(currentPrice.toString()));

        const tx = await nftContract.buyNFT(tokenId, { value: priceInWei });
        await tx.wait();

        alert(`✅ NFT #${tokenId} 구매 성공!`);
        loadMarketplaceNFTs();
    } catch (error) {
        console.error("🚨 구매 실패:", error);
        alert("🚨 NFT 구매 중 오류 발생!");
    }
}

function logout() {
    console.log("🚪 로그아웃 실행");

    document.getElementById("walletAddress").textContent = "로그아웃됨";

    alert("로그아웃 되었습니다!");
    window.location.href = "index.html"; 
}

window.onload = async function () {
    await connectWallet();
    window.logout = logout;
};
