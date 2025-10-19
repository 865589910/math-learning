// 猜数游戏逻辑

let guessGameState = {
    difficulty: null,
    min: 1,
    max: 50,
    bombNumber: null,
    gameOver: false,
    guessCount: 0
};

// 打开猜数游戏模态框
function openGuessNumberGame() {
    document.getElementById('guess-number-modal').style.display = 'flex';
    showGuessNumberDifficultySelection();
}

// 关闭猜数游戏模态框
function closeGuessNumberGame() {
    document.getElementById('guess-number-modal').style.display = 'none';
    resetGuessNumberGame();
}

// 显示难度选择界面
function showGuessNumberDifficultySelection() {
    document.getElementById('guess-number-difficulty-screen').style.display = 'flex';
    document.getElementById('guess-number-game-screen').style.display = 'none';
}

// 选择难度并开始游戏
function selectGuessNumberDifficulty(difficulty) {
    guessGameState.difficulty = difficulty;
    
    switch(difficulty) {
        case 1:
            guessGameState.min = 1;
            guessGameState.max = 50;
            break;
        case 2:
            guessGameState.min = 1;
            guessGameState.max = 100;
            break;
        case 3:
            guessGameState.min = 1;
            guessGameState.max = 200;
            break;
    }
    
    startGuessNumberGame();
}

// 开始游戏
function startGuessNumberGame() {
    // 重置游戏状态
    guessGameState.bombNumber = Math.floor(Math.random() * guessGameState.max) + 1;
    guessGameState.gameOver = false;
    guessGameState.guessCount = 0;
    
    console.log('炸弹数字（用于调试）:', guessGameState.bombNumber);
    
    // 切换到游戏界面
    document.getElementById('guess-number-difficulty-screen').style.display = 'none';
    document.getElementById('guess-number-game-screen').style.display = 'block';
    
    // 重置范围
    const maxNum = guessGameState.max;
    guessGameState.min = 1;
    guessGameState.max = maxNum;
    
    // 更新界面
    updateGuessNumberDisplay();
    createNumberGrid();
    
    // 显示初始提示
    showGuessNumberMessage('游戏开始！请点击一个数字进行猜测，避开炸弹！', 'info');
    
    // 隐藏重新开始按钮
    document.getElementById('guess-restart-btn').style.display = 'inline-block';
}

// 创建数字网格
function createNumberGrid() {
    const container = document.getElementById('numbers-grid');
    container.innerHTML = '';
    
    const maxNum = guessGameState.difficulty === 1 ? 50 : (guessGameState.difficulty === 2 ? 100 : 200);
    
    for (let i = 1; i <= maxNum; i++) {
        const numberElement = document.createElement('div');
        numberElement.className = 'guess-number';
        numberElement.textContent = i;
        numberElement.dataset.value = i;
        
        // 如果数字不在当前范围内，不显示
        if (i < guessGameState.min || i > guessGameState.max) {
            numberElement.style.display = 'none';
        } else {
            numberElement.addEventListener('click', function() {
                if (guessGameState.gameOver) return;
                
                const guess = parseInt(this.dataset.value);
                handleGuess(guess);
            });
        }
        
        container.appendChild(numberElement);
    }
}

// 处理猜测
function handleGuess(guess) {
    if (guessGameState.gameOver) return;
    
    guessGameState.guessCount++;
    
    // 检查猜测结果
    if (guess === guessGameState.bombNumber) {
        // 猜中炸弹
        showGuessNumberMessage(`💥 BOOM！数字 ${guessGameState.bombNumber} 就是炸弹！游戏结束！`, 'danger');
        
        // 标记炸弹数字
        const bombElement = document.querySelector(`.guess-number[data-value="${guessGameState.bombNumber}"]`);
        if (bombElement) {
            bombElement.classList.add('bomb');
        }
        
        guessGameState.gameOver = true;
        
    } else {
        // 调整范围
        if (guess < guessGameState.bombNumber) {
            guessGameState.min = guess + 1;
            showGuessNumberMessage(`✅ 安全！炸弹数字比 ${guess} 大。`, 'success');
        } else {
            guessGameState.max = guess - 1;
            showGuessNumberMessage(`✅ 安全！炸弹数字比 ${guess} 小。`, 'success');
        }
        
        // 重新创建数字网格（只显示范围内的）
        createNumberGrid();
        
        // 检查游戏是否结束（范围缩小到只有一个数字）
        if (guessGameState.min === guessGameState.max) {
            if (guessGameState.min === guessGameState.bombNumber) {
                showGuessNumberMessage(`💥 范围已经缩小到只有一个数字 ${guessGameState.bombNumber}，它就是炸弹！游戏结束！`, 'danger');
                
                // 标记炸弹数字
                const bombElement = document.querySelector(`.guess-number[data-value="${guessGameState.bombNumber}"]`);
                if (bombElement) {
                    bombElement.classList.add('bomb');
                }
            } else {
                showGuessNumberMessage(`🎉 恭喜！${guessGameState.bombNumber} 是炸弹，但你成功避免了它！`, 'success');
            }
            guessGameState.gameOver = true;
        }
    }
    
    updateGuessNumberDisplay();
}

// 更新显示信息
function updateGuessNumberDisplay() {
    const difficultyNames = ['', '简单(1-50)', '中等(1-100)', '困难(1-200)'];
    
    document.getElementById('guess-min').textContent = guessGameState.min;
    document.getElementById('guess-max').textContent = guessGameState.max;
    document.getElementById('guess-remaining').textContent = guessGameState.max - guessGameState.min + 1;
    document.getElementById('guess-count').textContent = guessGameState.guessCount;
    document.getElementById('guess-difficulty-name').textContent = difficultyNames[guessGameState.difficulty];
}

// 显示提示消息
function showGuessNumberMessage(message, type) {
    const messageEl = document.getElementById('guess-message');
    messageEl.textContent = message;
    messageEl.className = `guess-message ${type}`;
    messageEl.style.display = 'flex';
}

// 重新开始游戏
function restartGuessNumberGame() {
    startGuessNumberGame();
}

// 返回难度选择
function backToGuessNumberDifficulty() {
    showGuessNumberDifficultySelection();
}

// 重置游戏
function resetGuessNumberGame() {
    guessGameState = {
        difficulty: null,
        min: 1,
        max: 50,
        bombNumber: null,
        gameOver: false,
        guessCount: 0
    };
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 绑定关闭按钮
    const closeBtn = document.querySelector('#guess-number-modal .close-btn');
    if (closeBtn) {
        closeBtn.onclick = closeGuessNumberGame;
    }
    
    // 点击模态框外部关闭
    const modal = document.getElementById('guess-number-modal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeGuessNumberGame();
            }
        };
    }
});
