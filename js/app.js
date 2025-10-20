// 全局变量
let currentWord = null;
let isDrawing = false;
let showGuide = true;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupModalEvents();
    setupTabNavigation();
});

// 初始化页面,加载所有数据
function initializePage() {
    // 第一部分：核心概念字
    renderWords('numbers', learningData.section1.numbers, 'numbers');
    renderWords('operations', learningData.section1.operations, 'operations');
    renderWords('positions', learningData.section1.positions, 'positions');
    renderWords('comparisons', learningData.section1.comparisons, 'comparisons');
    renderWords('units', learningData.section1.units, 'units');
    renderWords('quantifiers', learningData.section1.quantifiers, 'quantifiers');

    // 第二部分：核心概念词
    renderWords('question-types', learningData.section2.questionTypes, 'questionTypes');
    renderWords('basic-concepts', learningData.section2.basicConcepts, 'basicConcepts');
    renderWords('items', learningData.section2.items, 'items');
    renderWords('animals', learningData.section2.animals, 'animals');
    renderWords('foods', learningData.section2.foods, 'foods');
    renderWords('plane-shapes', learningData.section2.planeShapes, 'planeShapes');
    renderWords('solid-shapes', learningData.section2.solidShapes, 'solidShapes');

    // 第三部分：基础知识点
    renderWords('fill-methods', learningData.section3.fillMethods, 'fillMethods');
    renderWords('comparison-rules', learningData.section3.comparisonRules, 'comparisonRules');
    renderWords('hundred-table', learningData.section3.hundredTable, 'hundredTable');

    // 第四部分：常见应用题型
    renderWords('addition-problems', learningData.section4.additionProblems, 'additionProblems');
    renderWords('subtraction-problems', learningData.section4.subtractionProblems, 'subtractionProblems');
    renderWords('multiplication-problems', learningData.section4.multiplicationProblems, 'multiplicationProblems');
    renderWords('division-problems', learningData.section4.divisionProblems, 'divisionProblems');
}

// 设置选项卡导航功能
function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.section');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // 移除所有激活状态
            tabBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // 添加当前激活状态
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// 渲染字词到页面
function renderWords(containerId, words, category = '') {
    const container = document.getElementById(containerId);
    if (!container || !words) return;

    words.forEach(item => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word-item';
        
        // 根据类型添加不同的class
        if (item.type === 'phrase') {
            wordElement.classList.add('phrase');
        } else if (item.type === 'sentence') {
            wordElement.classList.add('sentence');
        }
        
        wordElement.textContent = item.word;
        // 将分类信息添加到字词数据中
        const wordDataWithCategory = { ...item, category };
        wordElement.onclick = () => showWordModal(wordDataWithCategory);
        container.appendChild(wordElement);
    });
}

// 显示字词弹窗
function showWordModal(wordData) {
    currentWord = wordData;
    const modal = document.getElementById('modal');
    
    // 设置拼音
    document.getElementById('modal-pinyin').textContent = wordData.pinyin;
    
    // 设置解释
    document.getElementById('modal-explanation').innerHTML = wordData.explanation.replace(/\n/g, '<br>');
    
    // 绘制字词在米字格中
    drawWordInGrid(wordData.word);
    
    // 清空练习画布
    clearPracticeCanvas();
    
    // 根据字数调整练习区域的显示
    const practiceArea = document.querySelector('.practice-area');
    const practiceTitle = practiceArea.querySelector('h4');
    if (wordData.word.length > 4) {
        // 句子：隐藏练习区域
        practiceArea.style.display = 'none';
    } else {
        // 字词：显示练习区域
        practiceArea.style.display = 'block';
        if (wordData.word.length === 1) {
            practiceTitle.textContent = '✏️ 练习书写：';
        } else {
            practiceTitle.textContent = `✏️ 练习书写：（${wordData.word.length}个字，每个字一格）`;
        }
    }
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 防止body滚动
    document.body.style.overflow = 'hidden';
}

// 在米字格中绘制字词
function drawWordInGrid(word) {
    const canvas = document.getElementById('word-canvas');
    const ctx = canvas.getContext('2d');
    
    // 判断是否为句子（长度大于4个字认为是句子）
    if (word.length > 4) {
        // 句子：不显示米字格，只显示文字
        const maxWidth = 700;
        const fontSize = 28;
        const charSpacing = 5;
        
        // 计算需要的宽度
        const estimatedWidth = word.length * (fontSize + charSpacing);
        canvas.width = Math.min(estimatedWidth, maxWidth);
        canvas.height = 80;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = `bold ${fontSize}px "KaiTi", "楷体", serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 如果文字太长，自动换行
        if (estimatedWidth > maxWidth) {
            const lines = [];
            const charsPerLine = Math.floor(maxWidth / (fontSize + charSpacing));
            for (let i = 0; i < word.length; i += charsPerLine) {
                lines.push(word.substring(i, i + charsPerLine));
            }
            canvas.height = lines.length * (fontSize + 20);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `bold ${fontSize}px "KaiTi", "楷体", serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            lines.forEach((line, index) => {
                ctx.fillText(line, canvas.width / 2, (index + 0.5) * (fontSize + 20));
            });
        } else {
            ctx.fillText(word, canvas.width / 2, canvas.height / 2);
        }
        return;
    }
    
    // 单字或词组：显示米字格
    const gridSize = 150;
    const gap = 10;
    const charCount = word.length;
    canvas.width = charCount * gridSize + (charCount - 1) * gap;
    canvas.height = gridSize;
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 为每个字绘制一个米字格
    for (let i = 0; i < charCount; i++) {
        const offsetX = i * (gridSize + gap);
        
        // 外框
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX, 0, gridSize, gridSize);
        
        // 米字格辅助线
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // 横中线
        ctx.beginPath();
        ctx.moveTo(offsetX, gridSize / 2);
        ctx.lineTo(offsetX + gridSize, gridSize / 2);
        ctx.stroke();
        
        // 竖中线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize / 2, 0);
        ctx.lineTo(offsetX + gridSize / 2, gridSize);
        ctx.stroke();
        
        // 左上到右下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX + gridSize, gridSize);
        ctx.stroke();
        
        // 右上到左下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize, 0);
        ctx.lineTo(offsetX, gridSize);
        ctx.stroke();
        
        // 在米字格中绘制单个字
        ctx.fillStyle = '#333';
        ctx.font = 'bold 80px "KaiTi", "楷体", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(word[i], offsetX + gridSize / 2, gridSize / 2);
    }
}

// 设置模态框事件
function setupModalEvents() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const clearBtn = document.getElementById('clear-btn');
    const showGuideBtn = document.getElementById('show-guide-btn');
    const practiceCanvas = document.getElementById('practice-canvas');
    
    // 关闭按钮
    closeBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // 点击模态框外部关闭
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // 清除按钮
    clearBtn.onclick = clearPracticeCanvas;
    
    // 显示/隐藏辅助线按钮
    showGuideBtn.onclick = () => {
        showGuide = !showGuide;
        showGuideBtn.textContent = showGuide ? '隐藏辅助线' : '显示辅助线';
        drawPracticeGrid();
    };
    
    // 设置练习画布的绘图事件
    setupDrawingCanvas(practiceCanvas);
    
    // 初始化练习画布
    drawPracticeGrid();
}

// 绘制练习网格
function drawPracticeGrid() {
    const canvas = document.getElementById('practice-canvas');
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!showGuide) return;
    
    // 如果是句子（长度>4），不显示米字格
    if (currentWord && currentWord.word.length > 4) {
        return;
    }
    
    // 根据字数决定显示几个米字格
    const charCount = currentWord ? Math.min(currentWord.word.length, 2) : 2;
    const gridSize = 200;
    const gap = 10;
    
    // 调整画布宽度
    canvas.width = charCount * gridSize + (charCount - 1) * gap;
    
    for (let i = 0; i < charCount; i++) {
        const offsetX = i * (gridSize + gap);
        
        // 外框
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(offsetX, 0, gridSize, gridSize);
        
        // 米字格辅助线
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // 横中线
        ctx.beginPath();
        ctx.moveTo(offsetX, gridSize / 2);
        ctx.lineTo(offsetX + gridSize, gridSize / 2);
        ctx.stroke();
        
        // 竖中线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize / 2, 0);
        ctx.lineTo(offsetX + gridSize / 2, gridSize);
        ctx.stroke();
        
        // 左上到右下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX + gridSize, gridSize);
        ctx.stroke();
        
        // 右上到左下对角线
        ctx.beginPath();
        ctx.moveTo(offsetX + gridSize, 0);
        ctx.lineTo(offsetX, gridSize);
        ctx.stroke();
    }
}

// 设置绘图画布
function setupDrawingCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let lastX = 0;
    let lastY = 0;
    
    // 获取画布坐标的辅助函数
    function getCanvasCoordinates(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        let clientX, clientY;
        if (e.type.startsWith('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }
    
    // 鼠标/触摸事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // 触摸事件（移动端）
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        const coords = getCanvasCoordinates(e, canvas);
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const coords = getCanvasCoordinates(e, canvas);
        
        ctx.strokeStyle = '#f5576c';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        isDrawing = true;
        const coords = getCanvasCoordinates(e, canvas);
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        if (!isDrawing) return;
        
        const coords = getCanvasCoordinates(e, canvas);
        
        ctx.strokeStyle = '#f5576c';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }
}

// 清空练习画布
function clearPracticeCanvas() {
    const canvas = document.getElementById('practice-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPracticeGrid();
}

/**
 * 朗读当前字词（使用预生成的MP3音频文件）
 */
function speakCurrentWord() {
    if (!currentWord) return;
    
    // 获取字词所属的分类
    const category = currentWord.category || '';
    
    // 播放音频
    audioPlayer.play(currentWord.word, category);
}
