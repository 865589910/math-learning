// 扑克牌游戏逻辑
let gameState = {
    difficulty: 1,
    maxValue: 6,
    cardRange: 5,
    maxDraws: 3,
    currentTurn: 0, // 0: AI1, 1: AI2, 2: Player
    players: [
        { name: '小明', cards: [], total: 0, passed: false, bust: false, drawCount: 0, isAI: true },
        { name: '小红', cards: [], total: 0, passed: false, bust: false, drawCount: 0, isAI: true },
        { name: '你', cards: [], total: 0, passed: false, bust: false, drawCount: 0, isAI: false }
    ],
    gameOver: false
};

// 花色映射
const suits = ['♠', '♥', '♦', '♣'];
const suitColors = {
    '♠': 'black',
    '♣': 'black',
    '♥': 'red',
    '♦': 'red'
};

// 打开游戏模态框
function openCardGame() {
    document.getElementById('card-game-modal').style.display = 'block';
    document.getElementById('difficulty-selection').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    document.body.style.overflow = 'hidden';
}

// 关闭游戏模态框
function closeCardGame() {
    document.getElementById('card-game-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 返回难度选择
function backToDifficulty() {
    // 清空所有卡牌显示
    document.getElementById('ai1-cards').innerHTML = '';
    document.getElementById('ai2-cards').innerHTML = '';
    document.getElementById('player-cards').innerHTML = '';
    
    // 重置信息显示
    document.getElementById('ai1-info').textContent = '已摸牌：0 张';
    document.getElementById('ai2-info').textContent = '已摸牌：0 张';
    document.getElementById('player-total').textContent = '0';
    
    // 清除状态显示
    document.getElementById('ai1-status').textContent = '';
    document.getElementById('ai1-status').className = 'player-status';
    document.getElementById('ai2-status').textContent = '';
    document.getElementById('ai2-status').className = 'player-status';
    document.getElementById('player-status').textContent = '';
    document.getElementById('player-status').className = 'player-status';
    
    // 切换界面
    document.getElementById('difficulty-selection').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
}

// 开始游戏
function startGame(difficulty) {
    // 设置难度参数
    gameState.difficulty = difficulty;
    switch(difficulty) {
        case 1:
            gameState.cardRange = 5;
            gameState.maxValue = 6;
            gameState.maxDraws = 3;
            break;
        case 2:
            gameState.cardRange = 10;
            gameState.maxValue = 11;
            gameState.maxDraws = 3;
            break;
        case 3:
            gameState.cardRange = 13;
            gameState.maxValue = 18;
            gameState.maxDraws = 3;
            break;
    }
    
    // 重置游戏状态
    gameState.currentTurn = 0;
    gameState.gameOver = false;
    gameState.players.forEach(player => {
        player.cards = [];
        player.total = 0;
        player.passed = false;
        player.bust = false;
        player.drawCount = 0;
    });
    
    // 清空所有卡牌显示
    document.getElementById('ai1-cards').innerHTML = '';
    document.getElementById('ai2-cards').innerHTML = '';
    document.getElementById('player-cards').innerHTML = '';
    
    // 重置信息显示
    document.getElementById('ai1-info').textContent = '已摸牌：0 张';
    document.getElementById('ai2-info').textContent = '已摸牌：0 张';
    document.getElementById('player-total').textContent = '0';
    
    // 清除状态显示
    document.getElementById('ai1-status').textContent = '';
    document.getElementById('ai1-status').className = 'player-status';
    document.getElementById('ai2-status').textContent = '';
    document.getElementById('ai2-status').className = 'player-status';
    document.getElementById('player-status').textContent = '';
    document.getElementById('player-status').className = 'player-status';
    
    // 更新界面
    document.getElementById('current-difficulty').textContent = `难度${difficulty}`;
    document.getElementById('current-limit').textContent = `淘汰线：>${gameState.maxValue}`;
    
    // 切换到游戏界面
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('game-result').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    
    // 初始发牌
    initialDeal();
    
    // 开始第一轮
    nextTurn();
}

// 初始发牌（每人一张）
function initialDeal() {
    // 不再初始发牌，直接开始第一回合
    gameState.players.forEach((player, index) => {
        renderPlayer(index);
    });
    
    // 初始化AI的摸牌信息显示
    document.getElementById('ai1-info').textContent = '已摸牌：0 张';
    document.getElementById('ai2-info').textContent = '已摸牌：0 张';
    
    // 初始禁用玩家按钮
    disablePlayerControls();
}

// 抽一张牌
function drawCard() {
    const value = Math.floor(Math.random() * gameState.cardRange) + 1;
    const suit = suits[Math.floor(Math.random() * suits.length)];
    
    // 转换显示文本
    let display = value.toString();
    if (gameState.difficulty >= 3) {
        if (value === 1) display = 'A';
        else if (value === 11) display = 'J';
        else if (value === 12) display = 'Q';
        else if (value === 13) display = 'K';
    }
    
    return {
        value: value,
        display: display,
        suit: suit,
        color: suitColors[suit]
    };
}

// 渲染玩家区域
function renderPlayer(playerIndex) {
    const player = gameState.players[playerIndex];
    const prefix = playerIndex === 0 ? 'ai1' : (playerIndex === 1 ? 'ai2' : 'player');
    const isAI = playerIndex !== 2;
    
    // 渲染卡牌
    const cardsContainer = document.getElementById(`${prefix}-cards`);
    const currentCardCount = cardsContainer.children.length;
    const targetCardCount = player.cards.length;
    
    // 只添加新牌，不重新渲染所有牌
    if (targetCardCount > currentCardCount) {
        const newCardsCount = targetCardCount - currentCardCount;
        for (let i = 0; i < newCardsCount; i++) {
            const cardIndex = currentCardCount + i;
            const card = player.cards[cardIndex];
            const cardEl = document.createElement('div');
            
            if (isAI && !gameState.gameOver) {
                // AI的牌在游戏未结束前显示为背面
                cardEl.className = 'card card-back card-new';
                cardEl.innerHTML = '🎴';
            } else {
                // 玩家的牌或游戏结束后显示正面
                cardEl.className = `card card-new ${card.color}`;
                cardEl.innerHTML = `
                    ${card.display}
                    <div class="card-suit">${card.suit}</div>
                `;
            }
            cardsContainer.appendChild(cardEl);
            
            // 动画结束后移除card-new类，避免下次更新时重复动画
            setTimeout(() => {
                cardEl.classList.remove('card-new');
            }, 300);
        }
    } else if (gameState.gameOver && isAI) {
        // 游戏结束时，翻转AI的牌
        cardsContainer.innerHTML = '';
        player.cards.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = `card ${card.color}`;
            cardEl.innerHTML = `
                ${card.display}
                <div class="card-suit">${card.suit}</div>
            `;
            cardsContainer.appendChild(cardEl);
        });
    }
    
    // 更新信息显示
    if (isAI && !gameState.gameOver) {
        const infoEl = document.getElementById(`${prefix}-info`);
        if (infoEl) {
            infoEl.textContent = `已摸牌：${player.cards.length} 张`;
        }
    } else if (isAI && gameState.gameOver) {
        const infoEl = document.getElementById(`${prefix}-info`);
        if (infoEl) {
            infoEl.textContent = `总分：${player.total}`;
        }
    }
    
    // 只为玩家显示总分（游戏进行中）
    if (!isAI) {
        document.getElementById(`${prefix}-total`).textContent = player.total;
    }
    
    // 渲染状态
    const statusEl = document.getElementById(`${prefix}-status`);
    if (gameState.gameOver) {
        // 游戏结束后才显示爆牌状态
        if (player.bust) {
            statusEl.textContent = '爆了！';
            statusEl.className = 'player-status bust';
        } else if (player.passed) {
            statusEl.textContent = '不摸了';
            statusEl.className = 'player-status passed';
        } else {
            statusEl.textContent = '';
            statusEl.className = 'player-status';
        }
    } else {
        // 游戏进行中，只显示是否停牌
        if (player.passed) {
            statusEl.textContent = '不摸了';
            statusEl.className = 'player-status passed';
        } else {
            statusEl.textContent = '';
            statusEl.className = 'player-status';
        }
    }
    
    // 高亮当前玩家
    const playerBox = cardsContainer.parentElement;
    if (gameState.currentTurn === playerIndex && !gameState.gameOver) {
        playerBox.classList.add('active');
    } else {
        playerBox.classList.remove('active');
    }
}

// 下一回合
function nextTurn() {
    if (gameState.gameOver) return;
    
    // 检查是否所有玩家都已结束
    const allFinished = gameState.players.every(p => p.passed || p.bust || p.drawCount >= gameState.maxDraws);
    if (allFinished) {
        endGame();
        return;
    }
    
    // 找到下一个可以行动的玩家
    let attempts = 0;
    while (attempts < 3) {
        const player = gameState.players[gameState.currentTurn];
        
        // 如果当前玩家已结束，跳到下一个
        if (player.passed || player.bust || player.drawCount >= gameState.maxDraws) {
            gameState.currentTurn = (gameState.currentTurn + 1) % 3;
            attempts++;
            continue;
        }
        
        // 渲染所有玩家状态
        gameState.players.forEach((_, i) => renderPlayer(i));
        
        // 如果是AI，自动行动
        if (player.isAI) {
            updateTurnInfo(`轮到 ${player.name} 了...`);
            setTimeout(() => aiAction(), 1000);
        } else {
            updateTurnInfo('轮到你了！选择摸牌或不摸');
            enablePlayerControls();
        }
        return;
    }
    
    // 如果所有玩家都结束了
    endGame();
}

// 更新回合信息
function updateTurnInfo(text) {
    document.getElementById('turn-info').textContent = text;
}

// AI行动
function aiAction() {
    const player = gameState.players[gameState.currentTurn];
    const playerName = player.name;
    
    // 显示思考状态
    const prefix = gameState.currentTurn === 0 ? 'ai1' : 'ai2';
    const statusEl = document.getElementById(`${prefix}-status`);
    statusEl.textContent = '🤔 思考中...';
    statusEl.className = 'player-status thinking';
    renderPlayer(gameState.currentTurn);
    
    setTimeout(() => {
        // AI策略：
        // - 如果总分为0（还没摸牌），一定摸
        // - 如果总分小于目标值的50%，继续摸
        // - 如果总分在50%-70%之间，有70%概率继续摸
        // - 如果总分在70%-85%之间，有40%概率继续摸
        // - 如果总分大于85%，不摸了
        const targetRatio = player.total / gameState.maxValue;
        let shouldDraw = false;
        
        if (player.total === 0) {
            shouldDraw = true; // 第一次一定摸
        } else if (targetRatio < 0.5) {
            shouldDraw = true;
        } else if (targetRatio < 0.7) {
            shouldDraw = Math.random() > 0.3;
        } else if (targetRatio < 0.85) {
            shouldDraw = Math.random() > 0.6;
        }
        
        if (shouldDraw && player.drawCount < gameState.maxDraws) {
            // 摸牌
            const card = drawCard();
            player.cards.push(card);
            player.total += card.value;
            player.drawCount++;
            
            // 检查是否爆了（不提示）
            if (player.total > gameState.maxValue) {
                player.bust = true;
                updateTurnInfo(`${playerName} 摸了一张牌（已摸 ${player.drawCount} 张）`);
            } else {
                updateTurnInfo(`${playerName} 摸了一张牌（已摸 ${player.drawCount} 张）`);
            }
            
            renderPlayer(gameState.currentTurn);
            
            // 继续下一回合
            setTimeout(() => {
                gameState.currentTurn = (gameState.currentTurn + 1) % 3;
                nextTurn();
            }, 2000);
        } else {
            // 不摸了
            player.passed = true;
            if (player.total === 0) {
                updateTurnInfo(`${playerName} 选择不摸牌`);
            } else {
                updateTurnInfo(`${playerName} 选择不摸了（已摸 ${player.drawCount} 张牌）`);
            }
            renderPlayer(gameState.currentTurn);
            
            setTimeout(() => {
                gameState.currentTurn = (gameState.currentTurn + 1) % 3;
                nextTurn();
            }, 2000);
        }
    }, 1500);
}

// 启用玩家控制
function enablePlayerControls() {
    const player = gameState.players[2];
    document.getElementById('draw-btn').disabled = player.drawCount >= gameState.maxDraws;
    document.getElementById('pass-btn').disabled = false;
}

// 禁用玩家控制
function disablePlayerControls() {
    document.getElementById('draw-btn').disabled = true;
    document.getElementById('pass-btn').disabled = true;
}

// 玩家摸牌
function playerDraw() {
    const player = gameState.players[2];
    
    if (player.drawCount >= gameState.maxDraws) {
        alert(`你已经摸了${gameState.maxDraws}次牌，不能再摸了！`);
        return;
    }
    
    disablePlayerControls();
    
    const card = drawCard();
    player.cards.push(card);
    player.total += card.value;
    player.drawCount++;
    
    // 检查是否爆了
    if (player.total > gameState.maxValue) {
        player.bust = true;
        updateTurnInfo(`你摸了一张 ${card.display}${card.suit}，总分 ${player.total}，💥 爆了！`);
    } else {
        updateTurnInfo(`你摸了一张 ${card.display}${card.suit}，总分 ${player.total}`);
    }
    
    renderPlayer(2);
    
    // 继续下一回合
    setTimeout(() => {
        gameState.currentTurn = (gameState.currentTurn + 1) % 3;
        nextTurn();
    }, 1500);
}

// 玩家不摸
function playerPass() {
    const player = gameState.players[2];
    player.passed = true;
    
    disablePlayerControls();
    
    if (player.total === 0) {
        updateTurnInfo('你选择不摸牌，总分 0');
    } else {
        updateTurnInfo(`你选择不摸了，总分 ${player.total}`);
    }
    renderPlayer(2);
    
    setTimeout(() => {
        gameState.currentTurn = (gameState.currentTurn + 1) % 3;
        nextTurn();
    }, 1500);
}

// 游戏结束
function endGame() {
    gameState.gameOver = true;
    disablePlayerControls();
    
    // 展示所有玩家的手牌
    updateTurnInfo('🎴 所有人都摸完了，现在亮牌比大小！');
    
    // 延迟1秒后展示结果，增加悬念
    setTimeout(() => {
        // 计算获胜者
        let winner = null;
        let maxValidScore = 0;
        
        gameState.players.forEach(player => {
            if (!player.bust && player.total > maxValidScore) {
                maxValidScore = player.total;
                winner = player;
            }
        });
        
        // 渲染所有玩家最终状态（展示AI的牌）
        gameState.players.forEach((player, i) => {
            if (player === winner) {
                const prefix = i === 0 ? 'ai1' : (i === 1 ? 'ai2' : 'player');
                const statusEl = document.getElementById(`${prefix}-status`);
                statusEl.textContent = '🏆 胜利';
                statusEl.className = 'player-status winner';
            }
            renderPlayer(i);
        });
        
        // 显示结果
        const resultEl = document.getElementById('game-result');
        if (winner) {
            if (winner.name === '你') {
                resultEl.innerHTML = '🎉 恭喜你获胜！你的总分是 ' + winner.total;
                resultEl.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            } else {
                resultEl.innerHTML = `😢 ${winner.name} 获胜了！总分是 ${winner.total}，你的总分是 ${gameState.players[2].total}`;
                resultEl.style.background = 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
            }
        } else {
            resultEl.innerHTML = '😅 所有人都爆了！这局没有赢家！';
            resultEl.style.background = 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)';
        }
        
        resultEl.style.display = 'block';
        document.getElementById('restart-btn').style.display = 'inline-block';
        updateTurnInfo('游戏结束！');
    }, 1500);
}

// 重新开始（相同难度）
function restartGame() {
    startGame(gameState.difficulty);
}
