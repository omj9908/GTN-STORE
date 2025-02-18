// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/access/Ownable.sol";

contract GTNToken is ERC20, Ownable {
    mapping(uint256 => uint256) public itemPrices;
    mapping(address => mapping(uint256 => bool)) public purchaseHistory; // 🔥 아이템 중복 구매 방지

    event ItemBought(address indexed buyer, uint256 itemId, uint256 price);
    event ItemPriceSet(uint256 itemId, uint256 price);

    constructor(uint256 initialSupply) ERC20("GTNToken", "GTN") {
        _mint(msg.sender, initialSupply);

        // 🔹 배포 시 아이템 가격 미리 설정
        itemPrices[0] = 2 * 10 ** 18; // 빨간 주사위 2 GTN
        itemPrices[1] = 3 * 10 ** 18; // 파란 주사위 3 GTN
        itemPrices[2] = 2 * 10 ** 18; // 초록 주사위 2 GTN
        itemPrices[3] = 4 * 10 ** 18; // 노란 주사위 4 GTN
        itemPrices[4] = 5 * 10 ** 18; // 하늘 주사위 5 GTN
        itemPrices[5] = 6 * 10 ** 18; // 보라 주사위 6 GTN
    }

    // 🔹 특정 아이템 가격 설정 (관리자만 가능)
    function setItemPrice(uint256 itemId, uint256 price) external onlyOwner {
        require(price > 0, "Price must be greater than 0");
        itemPrices[itemId] = price;
        emit ItemPriceSet(itemId, price);
    }

    // 🔹 아이템 구매 (GTN 토큰 전송 포함, 중복 구매 방지)
    function buyItem(uint256 itemId) external {
        uint256 price = itemPrices[itemId];
        require(price > 0, "This item is not for sale");
        require(msg.sender != owner(), "Admin cannot buy items!");
        require(balanceOf(msg.sender) >= price, "Insufficient GTN balance!");
        require(!purchaseHistory[msg.sender][itemId], "Item already purchased!");

        _transfer(msg.sender, owner(), price);
        purchaseHistory[msg.sender][itemId] = true;

        emit ItemBought(msg.sender, itemId, price);
    }

    // 🔹 사용자가 특정 아이템을 구매했는지 확인하는 함수
    function hasPurchasedItem(address user, uint256 itemId) external view returns (bool) {
        return purchaseHistory[user][itemId];
    }

    // 🔹 GTN 토큰 발행 (모든 이용자가 가능)
    function mintGTN(address recipient, uint256 amount) public {
        _mint(recipient, amount);
    }

    // 🔹 사용자의 구매한 아이템 목록 조회
    function getPurchaseHistory(address user) external view returns (uint256[] memory) {
        uint256 count = 0;

        // 🔍 사용자가 구매한 아이템 수 확인
        for (uint256 i = 0; i < 6; i++) {
            if (purchaseHistory[user][i]) {
                count++;
            }
        }

        // 📌 구매한 아이템이 없으면 빈 배열 반환
        if (count == 0) {
            return new uint256[](0);     }

        // 🔹 정확한 크기의 배열 생성 및 데이터 저장
        uint256[] memory purchasedItems = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < 6; i++) {
            if (purchaseHistory[user][i]) {
                purchasedItems[index] = i;
                index++;
            }
        }

        return purchasedItems;
    }
}
