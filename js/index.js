const CONTRACT_ADDRESS = "0x0fb599e09f6a68145164611c8ef727ff1d87a644";
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
				"name": "user",
				"type": "address"
			}
		],
		"name": "getPurchaseHistory",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "purchaseHistory",
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
	}
];

let provider, signer, contract, currentAccount;

let isWalletConnected = false;

async function connectWallet() {
    if (isWalletConnected) {
        console.log("🔄 이미 MetaMask와 연결됨.");
        return;
    }

    if (!window.ethereum) {
        alert("MetaMask가 설치되어 있지 않습니다!");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length === 0) {
        alert("메타마스크 계정을 선택해야 합니다!");
        return;
    }

    const storedAccount = localStorage.getItem("userAccount");
    const metaMaskAccount = accounts[0].toLowerCase();

    if (!storedAccount) {
        alert("로그인이 필요합니다!");
        window.location.href = "login.html";
        return;
    }

    if (storedAccount.toLowerCase() !== metaMaskAccount) {
        alert(`⚠️ 로그인한 계정(${storedAccount})과 MetaMask 계정(${metaMaskAccount})이 다릅니다.`);
        return;
    }

    signer = provider.getSigner(metaMaskAccount);
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    console.log(`✅ MetaMask 연결 완료: ${metaMaskAccount}`);
    isWalletConnected = true; 

    await checkBalance();
    await checkAdmin();
    await loadPurchaseHistory();
}

async function checkLogin() {
    const storedAccount = localStorage.getItem("userAccount");

    if (!storedAccount) {
        window.location.href = "login.html";
    } else {
        await connectWallet(); 
    }
}

function logout() {
    localStorage.removeItem("userAccount");
    alert("로그아웃 되었습니다.");
    window.location.href = "login.html";
}

async function buyItem(itemId) {
    if (!contract) return alert("먼저 메타마스크를 연결하세요!");

    try {
        console.log(`🛒 아이템(${itemId}) 구매 시도 중...`);

        const tx = await contract.buyItem(itemId);
        await tx.wait(); 

        console.log(`✅ 아이템(${itemId}) 구매 완료!`);
        alert("✅ 주사위 구매 완료!");

        await checkBalance(); // 🔹 구매 후 잔액 업데이트
        await loadPurchaseHistory();
        await displayDices();

    } catch (error) {
        console.error("🚨 구매 실패:", error);
        alert("구매 실패: " + error.message);
    }
}

if (typeof window.displayDices === "undefined") {
    window.displayDices = async function () {
        console.log("displayDices() 실행됨");

        const items = await loadItems();
        if (!items || items.length === 0) {
            console.warn("아이템 데이터가 없습니다. JSON 파일을 확인하세요.");
            return;
        }

        const purchasedSkins = await loadPurchasedSkins();  // 🔥 최신 구매 내역 반영
        console.log("최신 구매한 스킨 목록:", purchasedSkins);

        const container = document.getElementById("diceList");
        if (!container) {
            console.error("diceList' 요소를 찾을 수 없음. HTML을 확인하세요.");
            return;
        }

        container.innerHTML = "";

        for (const dice of items) {
            let price = "불러오는 중...";
            if (window.getItemPrice) {
                price = await window.getItemPrice(dice.id);
            }

            const isPurchased = purchasedSkins.includes(dice.id);
            const isEquipped = equippedSkins.includes(dice.id);
            const buttonLabel = isEquipped ? "장착 해제" : isPurchased ? "장착하기" : "구매하기";
            const buttonAction = isEquipped ? `unSkin(${dice.id})` : isPurchased ? `equipSkin(${dice.id})` : `buyItem(${dice.id})`;

            const card = document.createElement("div");
            card.className = "dice-card";
            card.innerHTML = `
                <img src="${dice.src}" alt="${dice.title}">
                <h3>${dice.title}</h3>
                <p>가격: ${price}</p>
                <button id="skin-btn-${dice.id}" onclick="${buttonAction}">${buttonLabel}</button>
            `;
            container.appendChild(card);
        }

        console.log("주사위 리스트 최신화 완료");
    };
}

let isAdminChecked = false;

async function checkAdmin() {
    if (isAdminChecked) {
        return; 
    }

    if (!contract || !signer) {
        console.warn("🚨 contract 또는 signer가 설정되지 않음. MetaMask 연결을 먼저 수행합니다.");
        await connectWallet();
    }

    try {
        const currentAccount = await signer.getAddress();
        const ownerAddress = await contract.owner();

        const getGTNButton = document.getElementById("getGTN");

        if (currentAccount.toLowerCase() !== ownerAddress.toLowerCase()) {
            getGTNButton.style.display = "block"; 
        } else {
            getGTNButton.style.display = "none";
        }

        isAdminChecked = true; 
    } catch (error) {
        console.error("🚨 관리자 확인 실패:", error);
    }
}


// 🔹 GTN 지급 (mintGTN 호출)
async function requestGTN() {
    if (!contract) return alert("먼저 메타마스크를 연결하세요!");

    const connectedAccounts = await provider.send("eth_requestAccounts", []);
    if (connectedAccounts.length === 0) {
        alert("메타마스크 계정을 선택해야 합니다!");
        return;
    }

    let recipientInput = document.getElementById("customAccount"); 
    let recipient = recipientInput ? recipientInput.value.trim() : null;
    const currentAccount = connectedAccounts[0];

    if (!recipient) {
        recipient = currentAccount;  // 입력한 값이 없으면 현재 MetaMask 계정 사용
    }

    try {
        console.log(`🚀 ${recipient}에게 100 GTN 전송 중...`);
        
        const tx = await contract.mintGTN(recipient, ethers.utils.parseUnits("100", 18));
        await tx.wait();

        alert(`✅ ${recipient}에게 100 GTN 전송 완료!`);
        checkBalance(recipient);
        await addGTNToMetaMask();
    } catch (error) {
        console.error("🚨 GTN 전송 실패:", error);
        alert("GTN 전송 실패: " + error.message);
    }
}


// 🔹 MetaMask에 GTN 토큰 자동 추가
async function addGTNToMetaMask() {
    if (!window.ethereum) {
        alert("MetaMask가 필요합니다!");
        return;
    }

    try {
        const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: CONTRACT_ADDRESS,
                    symbol: "GTN",
                    decimals: 18,
                    image: "https://gateway.pinata.cloud/ipfs/QmSr7KSnGs25KJpDWksGPqGjsBMGABCTkBUVKozyoCnaMY" 
                }
            }
        });

        if (wasAdded) {
            console.log("✅ MetaMask에 GTN 토큰이 추가되었습니다!");
            alert("✅ MetaMask에 GTN 토큰이 추가되었습니다!");
        } else {
            console.log("❌ MetaMask에서 GTN 토큰 추가가 거부되었습니다.");
        }
    } catch (error) {
        console.error("🚨 MetaMask에 GTN 토큰 추가 실패:", error);
        alert("MetaMask에 GTN 토큰 추가 실패: " + error.message);
    }
}

// 🔹 GTN 잔액 조회
async function checkBalance() {
    if (!contract || !signer) {
        console.warn("🚨 contract 또는 signer가 설정되지 않음. MetaMask 연결을 먼저 수행합니다.");
        await connectWallet();
    }

    try {
        const userAddress = await signer.getAddress();
        const balance = await contract.balanceOf(userAddress);
        document.getElementById("balance").innerText = `잔액: ${ethers.utils.formatUnits(balance, 18)} GTN`;
    } catch (error) {
        console.error("🚨 잔액 조회 실패:", error);
        alert("잔액 조회 실패: " + error.message);
    }
}

async function getItemName(itemId) {
    const items = await loadItems(); // items.json에서 데이터 가져오기
    const item = items.find(i => i.id === itemId); // itemId로 아이템 찾기
    return item ? item.title : "알 수 없는 주사위"; // 아이템이 없으면 기본값 반환
}

async function loadItems() {
    try {
        const response = await fetch("items.json");
        if (!response.ok) throw new Error("아이템 데이터를 불러오는데 실패했습니다.");

        const data = await response.json();
        console.log("✅ items.json 데이터 로드 성공:", data);
        return data;
    } catch (error) {
        console.error("🚨 items.json 데이터 로드 실패:", error);
        return [];
    }
}


let equippedSkin = null;

function loadEquippedSkin() {
    const storedSkin = localStorage.getItem("equippedSkin");
    equippedSkin = storedSkin ? JSON.parse(storedSkin) : null;
}

// 장착하기 리스트
let equippedSkins = []; 

async function equipSkin(itemId) {
    if (equippedSkins.length > 0) {
        alert("이미 스킨을 장착하고 있습니다. 먼저 장착을 해제하세요.");
        return;
    }

    const itemName = await getItemName(itemId); 

    equippedSkins = [{ id: itemId, name: itemName }];
    console.log("장착한 스킨 목록:", equippedSkins);

    document.querySelectorAll(".equip-btn").forEach(btn => {
        btn.innerText = "장착하기";
        btn.setAttribute("onclick", `equipSkin(${btn.dataset.id})`);
    });

    const button = document.getElementById(`skin-btn-${itemId}`);
    button.innerText = "장착 해제";
    button.setAttribute("onclick", `unSkin(${itemId})`);
}

function unSkin(itemId) {
    equippedSkins = []; 
    console.log("장착 해제 후 스킨 목록:", equippedSkins);

    const button = document.getElementById(`skin-btn-${itemId}`);
    button.innerText = "장착하기";
    button.setAttribute("onclick", `equipSkin(${itemId})`);
}

window.equipSkin = equipSkin;
window.unSkin = unSkin;


async function loadPurchasedSkins() {
    if (!contract) return alert("먼저 메타마스크를 연결하세요!");

    const userAddress = await signer.getAddress();
    console.log(`🛍️ 사용자(${userAddress})의 구매한 스킨 불러오기...`);

    try {
        const purchasedItems = await contract.getPurchaseHistory(userAddress);

        console.log("✅ 구매한 스킨 목록:", purchasedItems);
        return purchasedItems.map(item => Number(item));
    } catch (error) {
        console.error("🚨 구매한 스킨 불러오기 실패:", error);
        return [];
    }
}

async function displayDices() {
    const items = await loadItems();
    const purchasedSkins = await loadPurchasedSkins();
    const container = document.getElementById("diceList");
    container.innerHTML = "";

    for (const dice of items) {
        let price = "불러오는 중...";
        if (window.getItemPrice) {
            price = await window.getItemPrice(dice.id);
        }

        const card = document.createElement("div");
        card.className = "dice-card";

        // 🔹 이미 구매한 스킨인지 확인
        const isPurchased = purchasedSkins.includes(dice.id);
        const isEquipped = equippedSkins.includes(dice.id);
        const buttonLabel = isEquipped ? "장착 해제" : isPurchased ? "장착하기" : "구매하기";
        const buttonAction = isEquipped ? `unequipSkin(${dice.id})` : isPurchased ? `equipSkin(${dice.id})` : `buyItem(${dice.id})`;

        card.innerHTML = `
            <img src="${dice.src}" alt="${dice.title}">
            <h3>${dice.title}</h3>
            <p>가격: ${price}</p>
            <button id="skin-btn-${dice.id}" onclick="${buttonAction}">${buttonLabel}</button>
        `;
        container.appendChild(card);
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
        const priceBN = await contract.itemPrices(itemId);
        if (priceBN.eq(0)) {
            console.warn(`🚨 경고: ID ${itemId}에 대한 가격이 0입니다.`);
            return "가격 없음";
        }

        const formattedPrice = ethers.utils.formatUnits(priceBN, 18) + " GTN";
        console.log(`🔍 컨트랙트에서 가져온 가격 (ID: ${itemId}):`, formattedPrice);
        return formattedPrice;
    } catch (error) {
        console.error(`🚨 아이템 가격 조회 실패 (ID: ${itemId}):`, error);
        return "가격 확인 불가";
    }
}

let isAccountListenerAdded = false;



async function listenForAccountChange() {
    if (!window.ethereum || isAccountListenerAdded) {
        return;
    }

    window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
            alert("MetaMask 연결이 해제되었습니다. 다시 로그인하세요.");
            localStorage.removeItem("userAccount");
            window.location.href = "login.html";
            return;
        }

        const newMetaMaskAccount = accounts[0].toLowerCase();
        const storedAccount = localStorage.getItem("userAccount");

        if (storedAccount.toLowerCase() !== newMetaMaskAccount) {
            alert(`⚠️ 로그인한 계정(${storedAccount})과 MetaMask 계정(${newMetaMaskAccount})이 다릅니다.`);
            return;
        }

        await connectWallet(); 
    });

    isAccountListenerAdded = true;
}

listenForAccountChange();

let isPurchaseHistoryLoaded = false;

async function loadPurchaseHistory() {
    if (isPurchaseHistoryLoaded) {
        return; // 🔄 이미 구매 내역을 불러왔습니다.
    }

    if (!contract) {
        console.warn("🚨 contract가 설정되지 않음. MetaMask 연결을 먼저 수행합니다.");
        await connectWallet();
    }

    try {
        const userAddress = await signer.getAddress();
        const purchasedItems = await contract.getPurchaseHistory(userAddress);

        if (!purchasedItems || purchasedItems.length === 0) {
            console.warn("🚨 구매 내역 없음."); // ✅ 한 번만 출력
            document.getElementById("purchaseList").innerHTML = "<li>구매 내역이 없습니다.</li>";
        } else {
            const list = document.getElementById("purchaseList");
            list.innerHTML = "";
            for (const itemId of purchasedItems) {
                const listItem = document.createElement("li");
                listItem.textContent = `🎲 스킨 ID: ${itemId}`;
                list.appendChild(listItem);
            }
        }

        isPurchaseHistoryLoaded = true; // ✅ 구매 내역 확인 완료 플래그
    } catch (error) {
        console.error("🚨 구매 내역 불러오기 실패:", error);
    }
}

async function debugPurchaseHistory() {
    if (!signer) {
        console.warn("signer가 설정되지 않음. MetaMask 연결을 먼저 수행합니다.");
        await connectWallet();
    }

    try {
        const userAddress = await signer.getAddress();
        const purchasedItems = await contract.getPurchaseHistory(userAddress);

        console.log("[디버깅] 현재 블록체인에서 반환된 구매 내역:", purchasedItems);
    } catch (error) {
        console.error("[디버깅 실패] 구매 내역을 가져오는 중 오류 발생:", error);
    }
}

debugPurchaseHistory();

window.loadPurchaseHistory = loadPurchaseHistory;

window.onload = async function() {
    await connectWallet();
    await loadPurchaseHistory(); 
	await displayDices();
};

window.getItemPrice = getItemPrice;


let isInitialized = false;

async function initialize() {
    if (isInitialized) {
        return;
    }

    console.log("🟢 초기화 시작");

    await connectWallet();

    const storedAccount = localStorage.getItem("userAccount");
    if (!storedAccount) {
        alert("로그인이 필요합니다!");
        window.location.href = "login.html";
        return;
    }

    listenForAccountChange();

    await checkAdmin();
    await checkBalance();
    await loadPurchaseHistory();

    isInitialized = true;
}

window.connectWallet = connectWallet;
window.checkBalance = checkBalance;
window.buyItem = buyItem;
window.requestGTN = requestGTN;
window.checkAdmin = checkAdmin;
window.rollDice = rollDice;
window.displayDices = displayDices;
