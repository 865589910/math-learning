// 数学墙来了游戏
const mathWallState = {
    difficulty: 1,
    score: 0, // 难度1-4：通过的墙数；难度5：积分
    totalWalls: 10, // 通关需要的墙数（仅难度1-4使用）
    lives: 3,
    gameOver: false,
    playerPosition: 0, // 玩家位置 (0, 1, 2, 3, 4 对应五道墙)
    walls: [], // 下落的墙
    currentTarget: null, // 当前目标（数字或算式）
    wallSpeed: 1.0, // 墙下落速度
    customSpeed: 1.0, // 用户自定义速度
    wallInterval: 2800, // 生成墙的间隔（毫秒）
    lastWallTime: 0,
    animationId: null,
    startTime: null,
    wallIdCounter: 0,
    groupIdCounter: 0, // 添加组ID计数器
    currentGroupId: null, // 当前活跃的墙组ID
    lanes: 2, // 墙道数量，根据难度调整
    // 无尽模式专用
    passedWalls: 0, // 无尽模式已通过的墙数
    baseSpeed: 1.0, // 基础速度
    baseLanes: 2 // 基础墙道数
};

// 更新速度显示
function updateWallSpeedDisplay(value) {
    document.getElementById('wall-speed-value').textContent = parseFloat(value).toFixed(1);
}

// 打开游戏模态框
function openMathWallGame() {
    const modal = document.getElementById('math-wall-modal');
    modal.style.display = 'block';
    showMathWallDifficulty();
}

// 关闭游戏模态框
function closeMathWallGame() {
    const modal = document.getElementById('math-wall-modal');
    modal.style.display = 'none';
    
    // 停止游戏
    if (mathWallState.animationId) {
        cancelAnimationFrame(mathWallState.animationId);
        mathWallState.animationId = null;
    }
}

// 显示难度选择界面
function showMathWallDifficulty() {
    document.getElementById('math-wall-difficulty-screen').style.display = 'block';
    document.getElementById('math-wall-game-screen').style.display = 'none';
}

// 返回难度选择
function backToMathWallDifficulty() {
    if (mathWallState.animationId) {
        cancelAnimationFrame(mathWallState.animationId);
        mathWallState.animationId = null;
    }
    showMathWallDifficulty();
}

// 选择难度并开始游戏
function selectMathWallDifficulty(difficulty) {
    mathWallState.difficulty = difficulty;
    
    // 获取用户选择的速度
    const speedSlider = document.getElementById('wall-speed-slider');
    mathWallState.customSpeed = parseFloat(speedSlider.value);
    
    // 根据难度设置墙道数量
    if (difficulty === 1) {
        mathWallState.lanes = 2; // 两道墙
        mathWallState.wallSpeed = mathWallState.customSpeed;
        mathWallState.wallInterval = 2800;
        mathWallState.lives = 3;
    } else if (difficulty === 2) {
        mathWallState.lanes = 2; // 两道墙（新增难度）
        mathWallState.wallSpeed = mathWallState.customSpeed;
        mathWallState.wallInterval = 2800;
        mathWallState.lives = 3;
    } else if (difficulty === 3) {
        mathWallState.lanes = 3; // 三道墙（原难度二）
        mathWallState.wallSpeed = mathWallState.customSpeed;
        mathWallState.wallInterval = 2800;
        mathWallState.lives = 3;
    } else if (difficulty === 4) {
        mathWallState.lanes = 5; // 五道墙（原难度三）
        mathWallState.wallSpeed = mathWallState.customSpeed;
        mathWallState.wallInterval = 2800;
        mathWallState.lives = 3;
    } else if (difficulty === 5) {
        // 无尽模式：固定开局速度0.6，不受滑块影响
        mathWallState.lanes = 2; // 初始两道墙
        mathWallState.wallSpeed = 0.6; // 固定开局速度
        mathWallState.wallInterval = 2800;
        mathWallState.lives = 5; // 五条命
        mathWallState.baseLanes = 2;
        mathWallState.baseSpeed = 0.6; // 固定基础速度
        mathWallState.passedWalls = 0;
    }
    
    startMathWallGame();
}

// 生成算式和答案
function generateMathWallQuestion() {
    let num1, num2, operator, result;
    
    // 难度一：20以内加减法
    // 难度二、三、四、五：100以内加减法
    const maxNumber = mathWallState.difficulty === 1 ? 20 : 100;
    
    operator = Math.random() > 0.5 ? '+' : '-';
    
    if (operator === '+') {
        num1 = Math.floor(Math.random() * (maxNumber - 1)) + 1;
        num2 = Math.floor(Math.random() * (maxNumber - num1)) + 1;
        result = num1 + num2;
    } else {
        // 减法：确保结果为正数
        num1 = Math.floor(Math.random() * (maxNumber - 1)) + 2;
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
        result = num1 - num2;
    }
    
    const expression = `${num1} ${operator} ${num2}`;
    
    // 50%概率显示算式让玩家选择结果，50%显示结果让玩家选择算式
    const showExpression = Math.random() > 0.5;
    
    return {
        expression: expression,
        result: result,
        showExpression: showExpression // true=显示算式选结果，false=显示结果选算式
    };
}

// 生成错误答案
function generateWrongAnswers(correctAnswer, count, isNumber) {
    const wrongAnswers = new Set();
    const maxNumber = mathWallState.difficulty === 1 ? 20 : 100;
    
    while (wrongAnswers.size < count) {
        let wrong;
        if (isNumber) {
            // 生成错误的数字（在正确答案±10范围内，但不等于正确答案）
            const offset = Math.floor(Math.random() * 20) - 10;
            wrong = correctAnswer + offset;
            if (wrong !== correctAnswer && wrong >= 0 && wrong <= maxNumber) {
                wrongAnswers.add(wrong);
            }
        } else {
            // 生成错误的算式
            const num1 = Math.floor(Math.random() * (maxNumber - 1)) + 1;
            const num2 = Math.floor(Math.random() * (maxNumber - 1)) + 1;
            const operator = Math.random() > 0.5 ? '+' : '-';
            
            if (operator === '+') {
                wrong = `${num1} + ${num2}`;
            } else {
                if (num1 >= num2) {
                    wrong = `${num1} - ${num2}`;
                } else {
                    wrong = `${num2} - ${num1}`;
                }
            }
            
            // 确保不等于正确答案
            if (wrong !== correctAnswer) {
                wrongAnswers.add(wrong);
            }
        }
    }
    
    return Array.from(wrongAnswers);
}

// 创建墙
function createWall() {
    const question = generateMathWallQuestion();
    mathWallState.currentTarget = question;
    
    const correctAnswer = question.showExpression ? question.result : question.expression;
    const wrongCount = mathWallState.lanes - 1;
    const wrongAnswers = generateWrongAnswers(
        correctAnswer, 
        wrongCount, 
        question.showExpression
    );
    
    // 创建所有答案数组并打乱
    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    // 为这一组墙分配一个唯一的组ID
    const currentGroupId = mathWallState.groupIdCounter++;
    mathWallState.currentGroupId = currentGroupId; // 记录当前活跃的墙组ID
    
    // 为这一组墙随机选择一个颜色（每组颜色一致）
    const wallColors = [
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // 粉蓝渐变
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // 橙黄渐变
        'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', // 紫蓝渐变
        'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)', // 粉紫渐变
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // 天蓝渐变
        'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)', // 金黄渐变
        'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)', // 清绿渐变
        'linear-gradient(135deg, #ffd3a5 0%, #fd6585 100%)'  // 橙红渐变
    ];
    const groupColor = wallColors[Math.floor(Math.random() * wallColors.length)];
    
    // 为每个墙道创建墙
    const walls = [];
    for (let i = 0; i < mathWallState.lanes; i++) {
        walls.push({
            id: mathWallState.wallIdCounter++,
            groupId: currentGroupId, // 添加组ID
            lane: i,
            y: -100,
            content: allAnswers[i],
            isCorrect: allAnswers[i] === correctAnswer,
            color: groupColor // 添加颜色属性，同组颜色一致
        });
    }
    
    // 更新目标显示
    updateMathWallTarget();
    
    return walls;
}

// 洗牌算法
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 开始游戏
function startMathWallGame() {
    document.getElementById('math-wall-difficulty-screen').style.display = 'none';
    document.getElementById('math-wall-game-screen').style.display = 'block';
    
    // 重置游戏状态
    mathWallState.score = 0;
    mathWallState.gameOver = false;
    mathWallState.playerPosition = Math.floor(mathWallState.lanes / 2); // 居中
    mathWallState.walls = [];
    mathWallState.lastWallTime = Date.now();
    mathWallState.startTime = Date.now();
    mathWallState.wallIdCounter = 0;
    mathWallState.groupIdCounter = 0; // 重置组ID计数器
    mathWallState.currentGroupId = null; // 重置当前组ID
    
    // 无尽模式特殊重置
    if (mathWallState.difficulty === 5) {
        mathWallState.passedWalls = 0;
        mathWallState.wallSpeed = mathWallState.baseSpeed;
    }
    
    // 更新标签显示
    const scoreLabel = document.getElementById('math-wall-score-label');
    if (scoreLabel) {
        if (mathWallState.difficulty === 5) {
            scoreLabel.textContent = '⭐ 积分';
        } else {
            scoreLabel.textContent = '🎯 进度';
        }
    }
    
    // 更新显示
    updateMathWallScore();
    updateMathWallLives();
    
    // 设置游戏容器
    setupGameContainer();
    
    // 立即生成第一组墙
    const firstWalls = createWall();
    mathWallState.walls.push(...firstWalls);
    
    // 开始游戏循环
    gameLoop();
}

// 设置游戏容器
function setupGameContainer() {
    const container = document.getElementById('math-wall-container');
    container.innerHTML = '';
    
    // 创建玩家（小动物）
    const player = document.createElement('div');
    player.id = 'math-wall-player';
    player.className = 'math-wall-player';
    player.textContent = '🐻'; // 可爱的小熊
    container.appendChild(player);
    
    updatePlayerPosition();
}

// 更新玩家位置
function updatePlayerPosition() {
    const player = document.getElementById('math-wall-player');
    const container = document.getElementById('math-wall-container');
    if (!player || !container) return;
    
    const containerWidth = container.clientWidth;
    const laneWidth = containerWidth / mathWallState.lanes;
    const playerX = mathWallState.playerPosition * laneWidth + laneWidth / 2;
    
    player.style.left = `${playerX}px`;
}

// 游戏循环
function gameLoop() {
    if (mathWallState.gameOver) return;
    
    const currentTime = Date.now();
    
    // 检查是否还有当前组的墙存在
    const hasCurrentGroupWalls = mathWallState.walls.some(w => w.groupId === mathWallState.currentGroupId);
    
    // 只有当前组墙完全消失后，才生成新的墙
    if (!hasCurrentGroupWalls && currentTime - mathWallState.lastWallTime > mathWallState.wallInterval) {
        const newWalls = createWall();
        mathWallState.walls.push(...newWalls);
        mathWallState.lastWallTime = currentTime;
    }
    
    // 更新墙的位置
    updateWalls();
    
    // 检查碰撞
    checkCollision();
    
    // 渲染
    renderWalls();
    
    mathWallState.animationId = requestAnimationFrame(gameLoop);
}

// 更新墙的位置
function updateWalls() {
    const container = document.getElementById('math-wall-container');
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    const wallsToRemove = [];
    
    mathWallState.walls.forEach(wall => {
        wall.y += mathWallState.wallSpeed;
        
        // 墙掉出屏幕
        if (wall.y > containerHeight + 100) {
            wallsToRemove.push(wall);
        }
    });
    
    // 移除掉出屏幕的墙
    wallsToRemove.forEach(wall => {
        const index = mathWallState.walls.indexOf(wall);
        if (index > -1) {
            mathWallState.walls.splice(index, 1);
        }
    });
}

// 检查碰撞
function checkCollision() {
    const container = document.getElementById('math-wall-container');
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    const playerBottomOffset = 30; // 玩家离底部的距离（与CSS中的bottom保持一致）
    const playerY = containerHeight - playerBottomOffset; // 动态计算玩家Y坐标
    
    console.log('🎯 碰撞检测 - 容器高度:', containerHeight, '玩家Y:', playerY, '玩家位置:', mathWallState.playerPosition);
    
    mathWallState.walls.forEach(wall => {
        // 检查墙是否到达玩家位置（增加容错范围）
        if (wall.y >= playerY - 60 && wall.y <= playerY + 60 && wall.lane === mathWallState.playerPosition) {
            console.log('💥 碰撞检测触发! 墙Y:', wall.y, '道数:', wall.lane, '内容:', wall.content, '正确:', wall.isCorrect);
            
            if (wall.isCorrect) {
                // 正确答案
                console.log('✅ 正确答案！分数+1');
                if (mathWallState.difficulty === 5) {
                    // 无尽模式：积分+2，通过墙数+1
                    mathWallState.score += 2;
                    mathWallState.passedWalls++;
                    
                    // 每通过5道墙增加一道墙（最多6道）
                    const newLanes = Math.min(6, mathWallState.baseLanes + Math.floor(mathWallState.passedWalls / 5));
                    if (newLanes !== mathWallState.lanes) {
                        mathWallState.lanes = newLanes;
                    }
                    
                    // 每通过10道墙增加速度
                    if (mathWallState.passedWalls % 10 === 0 && mathWallState.passedWalls > 0) {
                        mathWallState.wallSpeed += 0.1;
                    }
                } else {
                    // 普通模式：通过墙数+1
                    mathWallState.score++;
                }
                
                updateMathWallScore();
                
                // 移除这组墙（使用groupId）
                removeWallGroup(wall.groupId);
                
                // 检查是否通关（仅普通模式）
                if (mathWallState.difficulty !== 5 && mathWallState.score >= mathWallState.totalWalls) {
                    endMathWallGame(true); // true表示通关
                }
            } else {
                // 错误答案
                console.log('❌ 错误答案！生命-1');
                mathWallState.lives--;
                updateMathWallLives();
                
                // 移除这组墙（使用groupId）
                removeWallGroup(wall.groupId);
                
                if (mathWallState.lives <= 0) {
                    endMathWallGame(false); // false表示失败
                }
            }
        }
    });
}

// 移除一组墙
function removeWallGroup(groupId) {
    // 根据组ID找到同一时间生成的所有墙并移除
    mathWallState.walls = mathWallState.walls.filter(w => w.groupId !== groupId);
    
    // 如果移除的是当前组，清空当前组ID，允许生成新墙
    if (groupId === mathWallState.currentGroupId) {
        mathWallState.currentGroupId = null;
    }
}

// 渲染墙
function renderWalls() {
    const container = document.getElementById('math-wall-container');
    if (!container) {
        console.error('游戏容器未找到');
        return;
    }
    
    const containerWidth = container.clientWidth;
    const laneWidth = containerWidth / mathWallState.lanes;
    
    // 移除所有现有的墙元素
    const existingWalls = container.querySelectorAll('.math-wall');
    existingWalls.forEach(w => w.remove());
    
    console.log('当前墙块数量:', mathWallState.walls.length);
    
    // 渲染所有墙
    mathWallState.walls.forEach(wall => {
        const wallElement = document.createElement('div');
        wallElement.className = 'math-wall';
        wallElement.style.left = `${wall.lane * laneWidth}px`;
        wallElement.style.top = `${wall.y}px`;
        wallElement.style.width = `${laneWidth - 10}px`;
        wallElement.textContent = wall.content;
        
        // 使用墙的颜色属性，而不是根据正确/错误来设置颜色
        wallElement.style.background = wall.color;
        // 保持统一的边框颜色
        wallElement.style.borderColor = '#9b59b6';
        
        // 添加点击事件：点击墙就移动到对应的位置
        // CSS中已设置 cursor: pointer 和 pointer-events: auto
        
        // 鼠标悬停效果（仅桌面端）
        wallElement.addEventListener('mouseenter', function() {
            if (!mathWallState.gameOver) {
                this.style.transform = 'scale(1.08)';
                this.style.boxShadow = '0 8px 25px rgba(155, 89, 182, 0.6)';
            }
        });
        
        wallElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        
        // 点击事件：移动到该墙下方
        wallElement.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 点击了墙块，道数:', wall.lane, '内容:', wall.content);
            if (!mathWallState.gameOver) {
                mathWallState.playerPosition = wall.lane;
                updatePlayerPosition();
                
                // 添加点击视觉反馈
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        }, { passive: false });
        
        // 触摸事件（移动设备）
        wallElement.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('👍 触摸开始，道数:', wall.lane, '内容:', wall.content);
            if (!mathWallState.gameOver) {
                mathWallState.playerPosition = wall.lane;
                updatePlayerPosition();
                
                // 添加触摸视觉反馈
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = '0 8px 20px rgba(155, 89, 182, 0.7)';
            }
        }, { passive: false });
        
        wallElement.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ 触摸结束，道数:', wall.lane, '内容:', wall.content);
            // 恢复样式
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            }, 100);
        }, { passive: false });
        
        container.appendChild(wallElement);
    });
}

// 玩家移动
function moveMathWallPlayer(direction) {
    if (mathWallState.gameOver) return;
    
    if (direction === 'left' && mathWallState.playerPosition > 0) {
        mathWallState.playerPosition--;
    } else if (direction === 'right' && mathWallState.playerPosition < mathWallState.lanes - 1) {
        mathWallState.playerPosition++;
    }
    
    updatePlayerPosition();
}

// 键盘控制（保留，与点击墙块功能并存）
document.addEventListener('keydown', function(event) {
    if (!mathWallState.gameOver && document.getElementById('math-wall-game-screen').style.display === 'block') {
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
            moveMathWallPlayer('left');
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
            moveMathWallPlayer('right');
        }
    }
});

// 更新目标显示
function updateMathWallTarget() {
    const targetElement = document.getElementById('math-wall-target');
    if (!targetElement || !mathWallState.currentTarget) return;
    
    if (mathWallState.currentTarget.showExpression) {
        targetElement.innerHTML = `
            <div class="target-label">找出结果：</div>
            <div class="target-value">${mathWallState.currentTarget.expression} = ?</div>
        `;
    } else {
        targetElement.innerHTML = `
            <div class="target-label">找出算式：</div>
            <div class="target-value">? = ${mathWallState.currentTarget.result}</div>
        `;
    }
}

// 更新分数（现在显示进度）
function updateMathWallScore() {
    const scoreElement = document.getElementById('math-wall-score');
    if (scoreElement) {
        if (mathWallState.difficulty === 5) {
            // 无尽模式：显示积分
            scoreElement.textContent = mathWallState.score;
        } else {
            // 普通模式：显示进度
            scoreElement.textContent = `${mathWallState.score}/${mathWallState.totalWalls}`;
        }
    }
}

// 更新生命值
function updateMathWallLives() {
    const livesContainer = document.getElementById('math-wall-lives');
    if (!livesContainer) return;
    
    const maxLives = mathWallState.difficulty === 5 ? 5 : 3;
    
    livesContainer.innerHTML = '';
    for (let i = 0; i < maxLives; i++) {
        const heart = document.createElement('span');
        heart.className = 'life-heart';
        if (i < mathWallState.lives) {
            heart.textContent = '❤️';
            heart.classList.add('active');
        } else {
            heart.textContent = '🤍';
        }
        livesContainer.appendChild(heart);
    }
}

// 结束游戏
function endMathWallGame(isWin = false) {
    mathWallState.gameOver = true;
    
    if (mathWallState.animationId) {
        cancelAnimationFrame(mathWallState.animationId);
        mathWallState.animationId = null;
    }
    
    const resultDiv = document.getElementById('math-wall-result');
    let resultHTML = '';
    
    if (mathWallState.difficulty === 5) {
        // 无尽模式：显示最终积分
        const score = mathWallState.score;
        const passedWalls = mathWallState.passedWalls;
        
        if (score >= 100) {
            resultHTML = `
                <div class="result-icon">🏆</div>
                <div class="result-title">太厉害了！</div>
                <div class="result-score">最终积分：${score} 分</div>
                <div class="result-message">通过了 ${passedWalls} 道墙，你是数学高手！</div>
            `;
        } else if (score >= 50) {
            resultHTML = `
                <div class="result-icon">⭐</div>
                <div class="result-title">表现优秀！</div>
                <div class="result-score">最终积分：${score} 分</div>
                <div class="result-message">通过了 ${passedWalls} 道墙，继续加油！</div>
            `;
        } else if (score >= 20) {
            resultHTML = `
                <div class="result-icon">💪</div>
                <div class="result-title">不错哦！</div>
                <div class="result-score">最终积分：${score} 分</div>
                <div class="result-message">通过了 ${passedWalls} 道墙，多多练习会更好！</div>
            `;
        } else {
            resultHTML = `
                <div class="result-icon">🌟</div>
                <div class="result-title">继续努力！</div>
                <div class="result-score">最终积分：${score} 分</div>
                <div class="result-message">通过了 ${passedWalls} 道墙，每次都在进步！</div>
            `;
        }
    } else {
        // 普通模式
        if (isWin) {
            // 通关成功
            resultHTML = `
                <div class="result-icon">🏆</div>
                <div class="result-title">恭喜通关！</div>
                <div class="result-score">成功通过 ${mathWallState.totalWalls} 道墙</div>
                <div class="result-message">你太棒了！可以挑战更高难度了！</div>
            `;
        } else {
            // 失败
            const passedWalls = mathWallState.score;
            if (passedWalls >= 7) {
                resultHTML = `
                    <div class="result-icon">😢</div>
                    <div class="result-title">差一点就通关了！</div>
                    <div class="result-score">通过了 ${passedWalls}/${mathWallState.totalWalls} 道墙</div>
                    <div class="result-message">再试一次，你一定可以的！</div>
                `;
            } else if (passedWalls >= 4) {
                resultHTML = `
                    <div class="result-icon">💪</div>
                    <div class="result-title">继续加油！</div>
                    <div class="result-score">通过了 ${passedWalls}/${mathWallState.totalWalls} 道墙</div>
                    <div class="result-message">多练习，你会越来越好的！</div>
                `;
            } else {
                resultHTML = `
                    <div class="result-icon">🌟</div>
                    <div class="result-title">不要气馁！</div>
                    <div class="result-score">通过了 ${passedWalls}/${mathWallState.totalWalls} 道墙</div>
                    <div class="result-message">每次尝试都是进步，继续努力！</div>
                `;
            }
        }
    }
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.style.display = 'block';
}

// 重新开始游戏
function restartMathWallGame() {
    document.getElementById('math-wall-result').style.display = 'none';
    startMathWallGame();
}

// 点击模态框外部关闭
window.addEventListener('click', function(event) {
    const modal = document.getElementById('math-wall-modal');
    if (event.target === modal) {
        closeMathWallGame();
    }
});
