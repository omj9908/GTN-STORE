let diceResult = [];

// 🛑 점수판 객체 정의 (초기화)
let scoreBoard = {
    ones: null, twos: null, threes: null, fours: null, fives: null, sixes: null,
    threeOfAKind: null, fourOfAKind: null, fullHouse: null, smallStraight: null, 
    largeStraight: null, yahtzee: null, chance: null,
    upperSectionTotal: 0, bonus: 0, upperSectionGrandTotal: 0,
    lowerSectionTotal: 0, grandTotal: 0,
};

// 🛑 `savedScores`는 localStorage에서 불러와 저장
export let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];

// 🟢 점수 저장 함수
export function saveScores() {
    console.log("💾 saveScores() 실행됨!");

    const scoreResult = document.getElementById("score-result").dataset.scores;
    if (!scoreResult) {
        console.warn("⚠️ 저장할 점수가 없습니다!");
        return;
    }

    const scoreArray = scoreResult.split(',').map(Number);
    savedScores.push(scoreArray);

    // 🔥 localStorage에 저장
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    
    console.log("✅ 저장된 점수 목록:", savedScores);
    console.log("💾 localStorage에 저장됨:", localStorage.getItem("savedScores"));
}

// 🟢 점수 불러오기 함수
export function loadScores() {
    console.log("🔄 loadScores() 실행됨!");
    let savedData = localStorage.getItem("savedScores");

    if (!savedData) {
        console.warn("⚠️ 저장된 점수가 없습니다!");
        return;
    }

    // 🛑 JSON 파싱 후 기존 `savedScores` 배열을 비우고 새 데이터 삽입
    savedScores.length = 0;
    savedScores.push(...JSON.parse(savedData));

    console.log("✅ 불러온 점수 목록:", savedScores);

    // 🟢 점수 리스트를 HTML 요소에 추가
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (!scoreDisplay) {
        console.error("❌ `scoreDisplay` 요소를 찾을 수 없음!");
        return;
    }

    // 🔥 기존 리스트 초기화
    scoreDisplay.innerHTML = '';

    // 🔹 불러온 점수를 리스트 형식으로 출력
    savedScores.forEach((scoreArray, index) => {
        const listItem = document.createElement('div');
        listItem.textContent = `🎲 게임 ${index + 1}: ${scoreArray.join(', ')}`;
        scoreDisplay.appendChild(listItem);
    });

    console.log("✅ 점수 리스트 업데이트 완료!");
}


// 🟢 저장된 점수 표시 함수
export function displayScores() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.innerHTML = '저장된 점수: ' + savedScores.join(', ');
}

// 🟢 점수 리셋 함수
export function resetSavedScores() {
    console.log("🗑️ savedScores 초기화를 방지함");
    // ✅ 초기화 대신 최근 점수를 유지
    if (savedScores.length > 1) {
        savedScores = [savedScores[savedScores.length - 1]]; // 가장 마지막 값만 유지
    }
}

export function scoreCategory(category) {
    console.log("🔄 점수 계산 시작:", category);
    
    // ✅ savedScores 배열이 비어있으면 경고 및 종료
    if (!savedScores || savedScores.length === 0) {
        console.warn("⚠️ 불러올 점수가 없습니다.");
        return;
    }

    let dice = savedScores[savedScores.length - 1]; // 🔥 가장 최근의 점수 사용

    console.log("🎲 현재 주사위 결과:", dice);
    
    if (!dice || !Array.isArray(dice)) {
        console.error("❌ 주사위 점수를 올바르게 가져오지 못했습니다.");
        return;
    }

    let score = 0;

    // ✅ 카테고리별 점수 계산
    if (category === "ones") {
        score = countNumbers(dice, 1) * 1;
        scoreBoard.ones = score;
    } else if (category === "twos") {
        score = countNumbers(dice, 2) * 2;
        scoreBoard.twos = score;
    } else if (category === "threes") {
        score = countNumbers(dice, 3) * 3;
        scoreBoard.threes = score;
    } else if (category === "fours") {
        score = countNumbers(dice, 4) * 4;
        scoreBoard.fours = score;
    } else if (category === "fives") {
        score = countNumbers(dice, 5) * 5;
        scoreBoard.fives = score;
    } else if (category === "sixes") {   
        score = countNumbers(dice, 6) * 6;
        scoreBoard.sixes = score;
    } else if (category === "threeOfAKind") {
        if (hasSameValues(dice, 3)) {
            score = dice.reduce((a, b) => a + b, 0);
            scoreBoard.threeOfAKind = score;
        } else {
            scoreBoard.threeOfAKind = 0;
        }
    } else if (category === "fourOfAKind") {
        if (hasSameValues(dice, 4)) {
            score = dice.reduce((a, b) => a + b, 0);
            scoreBoard.fourOfAKind = score;
        } else {
            scoreBoard.fourOfAKind = 0;
        }
    } else if (category === "fullHouse") {
        if (isFullHouse(dice)) {
            scoreBoard.fullHouse = 25;
        } else {
            scoreBoard.fullHouse = 0;
        }
    } else if (category === "smallStraight") {
        if (isSmallStraight(dice)) {
            scoreBoard.smallStraight = 30;
        } else {
            scoreBoard.smallStraight = 0;
        }
    } else if (category === "largeStraight") {
        if (isLargeStraight(dice)) {
            scoreBoard.largeStraight = 40;
        } else {
            scoreBoard.largeStraight = 0;
        }
    } else if (category === "yahtzee") {
        if (hasSameValues(dice, 5)) {
            scoreBoard.yahtzee = 50;
        } else {
            scoreBoard.yahtzee = 0;
        }
    } else if (category === "chance") {
        score = dice.reduce((a, b) => a + b, 0);
        scoreBoard.chance = score;
    }

    console.log(`✅ 계산된 점수 (${category}): ${score}`);

    // 🔥 점수를 HTML에 반영
    let scoreElement = document.getElementById(`score${capitalize(category)}`);
    if (scoreElement) {
        scoreElement.textContent = score;
    } else {
        console.error(`⚠️ 점수를 표시할 HTML 요소를 찾을 수 없음: score${capitalize(category)}`);
    }

    // 🔥 점수판 업데이트 실행
    updateScoreBoard();

    // 🔥 버튼 비활성화 (한 번 선택하면 다시 못 선택하게)
    disableCategoryButton(category);
}



// 🟢 점수판 업데이트 함수
export function updateScoreBoard() {
    console.log("📝 점수판 업데이트 중...");
    
    if (!savedScores || savedScores.length === 0) {
        console.warn("⚠️ 불러올 점수가 없습니다.");
        return;
    }

    let latestScore = savedScores[savedScores.length - 1]; // 가장 최근 점수 가져오기
    console.log("✅ 적용할 점수:", latestScore);

    if (!latestScore || !Array.isArray(latestScore)) {
        console.warn("❌ 최신 점수가 올바른 배열 형태가 아닙니다!");
        return;
    }

    // ✅ 점수판 업데이트
    let upperSectionSum = 0;
    let categories = ["ones", "twos", "threes", "fours", "fives", "sixes"];

    categories.forEach(category => {
        let element = document.getElementById(`score${capitalize(category)}`);
        if (element) {
            let score = scoreBoard[category] || 0;
            element.textContent = score;
            upperSectionSum += score;
        }
    });

    document.getElementById("upperSectionTotal").textContent = upperSectionSum;

    // ✅ 보너스 적용
    scoreBoard.bonus = upperSectionSum >= 63 ? 35 : 0;
    document.getElementById("bonus").textContent = scoreBoard.bonus;

    // ✅ 총점 업데이트
    scoreBoard.grandTotal = upperSectionSum + scoreBoard.bonus;
    document.getElementById("grandTotal").textContent = scoreBoard.grandTotal;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// 🟢 숫자 개수 세기 함수
function countNumbers(dice, number) {
    return dice.filter(die => die === number).length;
}

// 🟢 동일 숫자가 일정 개수 이상 존재하는지 체크
function hasSameValues(dice, count) {
    const counts = {};
    dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
    return Object.values(counts).some(c => c >= count);
}

// 🟢 풀하우스 체크 함수
function isFullHouse(dice) {
    const counts = Object.values(dice.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {}));
    return counts.includes(2) && counts.includes(3);
}

// 🟢 스트레이트 체크 함수
function isSmallStraight(dice) {
    return /1234|2345|3456/.test([...new Set(dice)].sort().join(''));
}

function isLargeStraight(dice) {
    return /12345|23456/.test([...new Set(dice)].sort().join(''));
}

// 🟢 버튼 비활성화 함수
function disableCategoryButton(category) {
    document.getElementById(category).disabled = true;
}
