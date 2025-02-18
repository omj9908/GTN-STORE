const CONTRACT_ADDRESS = "0x75fc2adb5c68e0c278ad05b4b044b02375ea9379";
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ItemBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ItemPriceSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "buyItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "itemPrices",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mintGTN",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "setItemPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let provider, signer, contract;

// 🔹 메타마스크 연결
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        
        document.getElementById("account").innerText = `지갑 연결됨`;
        console.log("🚀 스마트 컨트랙트 연결 완료:", contract);

        await checkAdmin(); // 관리자 여부 확인

        // 🔹 지갑 연결 후 아이템 가격 다시 로드
        displayDices();
    } else {
        alert("메타마스크를 설치해주세요!");
    }
}


// 🔹 아이템 구매
// 🔹 아이템 구매 함수 (GTN 토큰을 관리자에게 전송)
async function buyItem(itemId) {
    if (!contract) return alert("먼저 메타마스크를 연결하세요!");

    try {
        console.log(`🛒 아이템(${itemId}) 구매 시도 중...`);
        
        // 🔹 스마트 컨트랙트의 buyItem 함수 실행
        const tx = await contract.buyItem(itemId);
        await tx.wait(); // 트랜잭션 완료 대기

        console.log(`✅ 아이템(${itemId}) 구매 완료!`);
        alert("✅ 주사위 구매 완료!");

        checkBalance(); // 🔹 구매 후 잔액 업데이트
    } catch (error) {
        console.error("🚨 구매 실패:", error);
        alert("구매 실패: " + error.message);
    }
}

async function checkAdmin() {
    if (!contract) return;
    
    const currentAccount = await signer.getAddress();
    const ownerAddress = await contract.owner();

    console.log("🚀 현재 계정:", currentAccount);
    console.log("🚀 관리자 계정:", ownerAddress);

    const getGTNButton = document.getElementById("getGTN");

    if (currentAccount.toLowerCase() !== ownerAddress.toLowerCase()) {
        console.log("✅ 일반 유저 감지 → getGTN 버튼 활성화");
        getGTNButton.style.display = "block"; 
    } else {
        console.log("🔒 관리자 계정 감지 → getGTN 버튼 숨김");
        getGTNButton.style.display = "none";  // 🔹 관리자 계정이면 버튼 숨김
    }
}


// 🔹 GTN 지급 (mintGTN 호출)
async function requestGTN() {
    if (!contract) return alert("먼저 메타마스크를 연결하세요!");

    const userAddress = await signer.getAddress();

    try {
        console.log(`🚀 관리자 → 사용자(${userAddress})에게 100 GTN 전송 중...`);
        const tx = await contract.mintGTN(userAddress, ethers.utils.parseUnits("100", 18));
        await tx.wait();

        alert("✅ 100 GTN 전송 완료!");
        checkBalance();
    } catch (error) {
        console.error("🚨 GTN 전송 실패:", error);
        alert("GTN 전송 실패: " + error.message);
    }
}

// 🔹 GTN 잔액 조회
async function checkBalance() {
    if (!contract) return alert("먼저 메타마스크를 연결하세요!");

    const userAddress = await signer.getAddress();
    try {
        const balance = await contract.balanceOf(userAddress);
        document.getElementById("balance").innerText = `잔액: ${ethers.utils.formatUnits(balance, 18)} GTN`;
    } catch (error) {
        console.error("🚨 잔액 조회 실패:", error);
        alert("잔액 조회 실패: " + error.message);
    }
}

// 🔹 주사위 굴리기
async function rollDice() {
    if (!window.loadItems) return alert("아이템 데이터를 불러올 수 없습니다!");
    
    const items = await loadItems();
    const diceResult = Math.floor(Math.random() * items.length);
    document.getElementById("result").innerText = `🎲 주사위 결과: ${items[diceResult].title} 선택됨!`;
}

// 🔹 아이템 가격을 스마트 컨트랙트에서 가져오는 함수 추가
async function getItemPrice(itemId) {
    if (!contract) {
        console.warn("🚨 스마트 컨트랙트가 연결되지 않았습니다! Metamask를 먼저 연결하세요.");
        return "가격 확인 불가";
    }

    try {
        const priceBN = await contract.itemPrices(itemId); // 블록체인에서 가격 조회
        const formattedPrice = ethers.utils.formatUnits(priceBN, 18) + " GTN";

        console.log(`🔍 컨트랙트에서 가져온 가격 (ID: ${itemId}):`, formattedPrice);
        return formattedPrice;
    } catch (error) {
        console.error(`🚨 아이템 가격 조회 실패 (ID: ${itemId}):`, error);
        return "가격 불러오기 실패";
    }
}

// 11:39 수정사항(추가)
async function listenForAccountChange() {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", async (accounts) => {
        console.log("🔄 계정 변경됨:", accounts[0]);
        
        // 새 계정으로 Metamask 연결 다시 시도
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        // 🔹 새 계정으로 `checkAdmin()` 다시 실행하여 버튼 상태 업데이트
        await checkAdmin();

        // 🔹 새로운 계정의 GTN 잔액도 업데이트
        await checkBalance();
    });
}

// ✅ 초기 실행 시 계정 변경 감지 함수 호출
listenForAccountChange();







// ✅ 전역 객체로 등록하여 index.html에서도 사용 가능하도록 설정
window.getItemPrice = getItemPrice;








// 🔹 초기화
async function initialize() {
    await connectWallet();
    await checkAdmin();
}








// ✅ 전역 객체 등록 (index.html에서 호출 가능)
window.connectWallet = connectWallet;
window.onload = initialize;
window.buyItem = buyItem;
window.requestGTN = requestGTN;
window.checkAdmin = checkAdmin;
window.checkBalance = checkBalance;
window.rollDice = rollDice;
