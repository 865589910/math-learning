// 数字华容道游戏
const klotskiState = {
    difficulty: 3, // 3x3, 4x4, 5x5
    grid: [],
    emptyPos: { row: 0, col: 0 },
    moves: 0,
    timeElapsed: 0,
    gameOver: false,
    timer: null,
    startTime: null,
    bestRecords: {
        3: { moves: Infinity, time: Infinity, efficiency: Infinity },
        4: { moves: Infinity, time: Infinity, efficiency: Infinity },
        5: { moves: Infinity, time: Infinity, efficiency: Infinity }
    }
};

// 动物贴纸图标（用于替代数字）
const animalIcons = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', 
    '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦',
    '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗'
];

// 打开游戏模态框
function openKlotskiGame() {
    const modal = document.getElementById('klotski-modal');
    modal.style.display = 'block';
    showKlotskiDifficulty();
    loadBestRecords();
}

// 关闭游戏模态框
function closeKlotskiGame() {
    const modal = document.getElementById('klotski-modal');
    modal.style.display = 'none';
    
    // 停止计时
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
        klotskiState.timer = null;
    }
}

// 显示难度选择界面
function showKlotskiDifficulty() {
    document.getElementById('klotski-difficulty-screen').style.display = 'block';
    document.getElementById('klotski-game-screen').style.display = 'none';
}

// 返回难度选择
function backToKlotskiDifficulty() {
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
        klotskiState.timer = null;
    }
    
    // 隐藏结果UI
    document.getElementById('klotski-result').style.display = 'none';
    
    showKlotskiDifficulty();
}

// 选择难度并开始游戏
function selectKlotskiDifficulty(difficulty) {
    klotskiState.difficulty = difficulty;
    startKlotskiGame();
}

// 开始游戏
function startKlotskiGame() {
    // 重置状态
    klotskiState.moves = 0;
    klotskiState.timeElapsed = 0;
    klotskiState.gameOver = false;
    klotskiState.startTime = Date.now();
    
    // 隐藏结果UI
    document.getElementById('klotski-result').style.display = 'none';
    
    // 初始化网格
    initializeGrid();
    
    // 显示游戏界面
    document.getElementById('klotski-difficulty-screen').style.display = 'none';
    document.getElementById('klotski-game-screen').style.display = 'block';
    
    // 更新UI
    updateKlotskiUI();
    renderGrid();
    
    // 开始计时
    startTimer();
}

// 初始化网格
function initializeGrid() {
    const size = klotskiState.difficulty;
    const numbers = [];
    
    // 创建有序数组 1 到 size*size-1，最后一个是空格
    for (let i = 1; i < size * size; i++) {
        numbers.push(i);
    }
    numbers.push(0); // 0 代表空格
    
    // 打乱数组
    do {
        shuffleArray(numbers);
    } while (!isSolvable(numbers, size));
    
    // 将一维数组转换为二维网格
    klotskiState.grid = [];
    for (let i = 0; i < size; i++) {
        klotskiState.grid[i] = [];
        for (let j = 0; j < size; j++) {
            const value = numbers[i * size + j];
            klotskiState.grid[i][j] = value;
            if (value === 0) {
                klotskiState.emptyPos = { row: i, col: j };
            }
        }
    }
}

// 检查拼图是否可解
function isSolvable(puzzle, size) {
    let inversions = 0;
    const flatPuzzle = puzzle.filter(n => n !== 0);
    
    for (let i = 0; i < flatPuzzle.length; i++) {
        for (let j = i + 1; j < flatPuzzle.length; j++) {
            if (flatPuzzle[i] > flatPuzzle[j]) {
                inversions++;
            }
        }
    }
    
    if (size % 2 === 1) {
        // 奇数大小：逆序数必须是偶数
        return inversions % 2 === 0;
    } else {
        // 偶数大小：逆序数+空格所在行（从底部算起）必须是奇数
        const emptyRowFromBottom = size - puzzle.indexOf(0) / size;
        return (inversions + emptyRowFromBottom) % 2 === 1;
    }
}

// 打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 渲染网格
function renderGrid() {
    const container = document.getElementById('klotski-grid');
    container.innerHTML = '';
    
    const size = klotskiState.difficulty;
    container.className = `klotski-grid klotski-grid-${size}x${size}`;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const value = klotskiState.grid[i][j];
            const tile = document.createElement('div');
            
            if (value === 0) {
                tile.className = 'klotski-tile klotski-empty';
            } else {
                tile.className = 'klotski-tile klotski-number';
                tile.innerHTML = `
                    <div class="klotski-tile-number">${value}</div>
                    <div class="klotski-tile-icon">${animalIcons[value - 1]}</div>
                `;
                // 添加点击和触摸事件
                tile.onclick = () => moveTile(i, j);
                tile.ontouchend = (e) => {
                    e.preventDefault();
                    moveTile(i, j);
                };
                // 添加视觉反馈
                tile.ontouchstart = (e) => {
                    e.preventDefault();
                    tile.style.transform = 'scale(0.95)';
                };
                tile.ontouchcancel = () => {
                    tile.style.transform = '';
                };
            }
            
            container.appendChild(tile);
        }
    }
}

// 移动方块
function moveTile(row, col) {
    if (klotskiState.gameOver) return;
    
    const emptyRow = klotskiState.emptyPos.row;
    const emptyCol = klotskiState.emptyPos.col;
    
    // 检查是否相邻
    const isAdjacent = 
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1);
    
    if (!isAdjacent) return;
    
    // 交换方块
    klotskiState.grid[emptyRow][emptyCol] = klotskiState.grid[row][col];
    klotskiState.grid[row][col] = 0;
    klotskiState.emptyPos = { row, col };
    
    // 增加步数
    klotskiState.moves++;
    
    // 更新UI
    renderGrid();
    updateKlotskiUI();
    
    // 恢复所有方块的缩放状态
    setTimeout(() => {
        const tiles = document.querySelectorAll('.klotski-tile');
        tiles.forEach(tile => {
            tile.style.transform = '';
        });
    }, 100);
    
    // 检查是否完成
    if (checkWin()) {
        winGame();
    }
}

// 检查是否获胜
function checkWin() {
    const size = klotskiState.difficulty;
    let expectedValue = 1;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i === size - 1 && j === size - 1) {
                // 最后一个格子应该是0（空格）
                if (klotskiState.grid[i][j] !== 0) return false;
            } else {
                if (klotskiState.grid[i][j] !== expectedValue) return false;
                expectedValue++;
            }
        }
    }
    
    return true;
}

// 获胜
function winGame() {
    klotskiState.gameOver = true;
    
    // 停止计时
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
        klotskiState.timer = null;
    }
    
    const timeTaken = klotskiState.timeElapsed;
    const moves = klotskiState.moves;
    const efficiency = (timeTaken / moves).toFixed(2); // 秒/步
    
    // 更新最佳记录
    const difficulty = klotskiState.difficulty;
    let newRecord = false;
    let recordType = [];
    
    if (moves < klotskiState.bestRecords[difficulty].moves) {
        klotskiState.bestRecords[difficulty].moves = moves;
        newRecord = true;
        recordType.push('最少步数');
    }
    if (timeTaken < klotskiState.bestRecords[difficulty].time) {
        klotskiState.bestRecords[difficulty].time = timeTaken;
        newRecord = true;
        recordType.push('最快时间');
    }
    if (parseFloat(efficiency) < klotskiState.bestRecords[difficulty].efficiency) {
        klotskiState.bestRecords[difficulty].efficiency = parseFloat(efficiency);
        newRecord = true;
        recordType.push('最佳效率');
    }
    
    saveBestRecords();
    
    // 显示结果
    const resultDiv = document.getElementById('klotski-result');
    const difficultyName = ['', '', '', '简单(3×3)', '中等(4×4)', '困难(5×5)'][difficulty];
    
    let recordHTML = '';
    if (newRecord) {
        recordHTML = `<p class="new-record">🏆 刷新记录：${recordType.join('、')}！</p>`;
    }
    
    resultDiv.innerHTML = `
        <div class="result-success">
            <div class="result-icon">🎉</div>
            <div class="result-title">恭喜通关！</div>
            <div class="result-stats">
                <p>难度：${difficultyName}</p>
                <p>用时：${formatTime(timeTaken)}</p>
                <p>步数：${moves} 步</p>
                <p>效率：${efficiency} 秒/步</p>
                ${recordHTML}
            </div>
        </div>
    `;
    resultDiv.style.display = 'block';
    
    // 5秒后自动隐藏结果UI
    setTimeout(() => {
        resultDiv.style.display = 'none';
    }, 5000);
}

// 开始计时
function startTimer() {
    if (klotskiState.timer) {
        clearInterval(klotskiState.timer);
    }
    
    klotskiState.timer = setInterval(() => {
        if (!klotskiState.gameOver) {
            klotskiState.timeElapsed = Math.floor((Date.now() - klotskiState.startTime) / 1000);
            updateKlotskiUI();
        }
    }, 1000);
}

// 更新UI
function updateKlotskiUI() {
    const difficultyNames = {
        3: '简单 (3×3)',
        4: '中等 (4×4)',
        5: '困难 (5×5)'
    };
    
    document.getElementById('klotski-difficulty-name').textContent = difficultyNames[klotskiState.difficulty];
    document.getElementById('klotski-moves').textContent = klotskiState.moves;
    document.getElementById('klotski-time').textContent = formatTime(klotskiState.timeElapsed);
    
    // 更新最佳记录显示
    const difficulty = klotskiState.difficulty;
    const bestMoves = klotskiState.bestRecords[difficulty].moves;
    const bestTime = klotskiState.bestRecords[difficulty].time;
    const bestEfficiency = klotskiState.bestRecords[difficulty].efficiency;
    
    document.getElementById('klotski-best-moves').textContent = 
        bestMoves === Infinity ? '--' : bestMoves;
    document.getElementById('klotski-best-time').textContent = 
        bestTime === Infinity ? '--' : formatTime(bestTime);
    document.getElementById('klotski-best-efficiency').textContent = 
        bestEfficiency === Infinity ? '--' : (bestEfficiency.toFixed(2) + ' 秒/步');
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 重新开始游戏
function restartKlotskiGame() {
    document.getElementById('klotski-result').style.display = 'none';
    startKlotskiGame();
}

// 提示功能
function showKlotskiHint() {
    if (klotskiState.gameOver) return;
    
    alert('💡 提示：\n1. 尝试先完成第一行\n2. 然后完成第一列\n3. 逐步缩小问题规模\n4. 最后几个格子需要技巧！');
}

// 保存最佳记录到本地存储
function saveBestRecords() {
    localStorage.setItem('klotski-best-records', JSON.stringify(klotskiState.bestRecords));
}

// 加载最佳记录
function loadBestRecords() {
    const saved = localStorage.getItem('klotski-best-records');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            // 确保每个难度都有 efficiency 字段
            for (let level in loaded) {
                if (!loaded[level].hasOwnProperty('efficiency')) {
                    loaded[level].efficiency = Infinity;
                }
            }
            klotskiState.bestRecords = loaded;
        } catch (e) {
            console.error('Failed to load best records:', e);
        }
    }
}
