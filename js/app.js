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
    renderWords('confusing-keywords', learningData.section4.confusingKeywords, 'confusingKeywords');
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
    
    // 设置解释（不包含例题）
    const explanationDiv = document.getElementById('modal-explanation');
    let explanationHTML = wordData.explanation.replace(/\n/g, '<br>');
    
    // 如果是几何图形，添加图形绘制
    const shapeWords = ['长方形', '正方形', '圆', '三角形', '平行四边形', '长方体', '正方体', '圆柱', '球', '三棱柱'];
    if (shapeWords.includes(wordData.word)) {
        explanationHTML += '<div class="shape-container" id="shape-canvas-container"><canvas id="shape-canvas" width="300" height="200"></canvas></div>';
    }
    
    explanationDiv.innerHTML = explanationHTML;
    
    // 如果是几何图形，绘制图形
    if (shapeWords.includes(wordData.word)) {
        setTimeout(() => drawShape(wordData.word), 10);
    }
    
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
    
    // 在练习区域后面添加例题（如果有）
    let examplesContainer = document.getElementById('examples-container');
    if (!examplesContainer) {
        // 创建例题容器
        examplesContainer = document.createElement('div');
        examplesContainer.id = 'examples-container';
        examplesContainer.className = 'examples-container';
        document.querySelector('.modal-body').appendChild(examplesContainer);
    }
    
    // 清空之前的例题
    examplesContainer.innerHTML = '';
    
    // 如果有例题，添加例题展示
    if (wordData.examples && wordData.examples.length > 0) {
        let examplesHTML = '<div class="examples-section">';
        examplesHTML += '<h5>📝 例题：</h5>';
        wordData.examples.forEach((example, index) => {
            const exampleId = `example-${Date.now()}-${index}`;
            examplesHTML += `
                <div class="example-item">
                    <div class="example-number">例题${index + 1}：</div>
                    <div class="example-question">${example.question}</div>
            `;
            
            // 如果有gridData，先显示只有中心数字的空表格
            if (example.gridData) {
                const centerNum = example.gridData.center;
                examplesHTML += '<div class="grid-table-container">';
                examplesHTML += '<table class="hundred-table-grid">';
                for (let row = 0; row < 3; row++) {
                    examplesHTML += '<tr>';
                    for (let col = 0; col < 3; col++) {
                        const isCenter = (row === 1 && col === 1);
                        const cellClass = isCenter ? 'center-cell' : 'empty-cell';
                        const cellContent = isCenter ? centerNum : '?';
                        examplesHTML += `<td class="${cellClass}">${cellContent}</td>`;
                    }
                    examplesHTML += '</tr>';
                }
                examplesHTML += '</table>';
                examplesHTML += '</div>';
            }
            
            examplesHTML += `
                    <button class="show-answer-btn" onclick="toggleAnswer('${exampleId}')" data-shown="false">
                        👁️ 查看答案
                    </button>
                    <div class="example-answer-section" id="${exampleId}" style="display: none;">
            `;
            
            // 在答案区域显示完整的表格
            if (example.gridData) {
                const grid = example.gridData.grid;
                examplesHTML += '<div class="grid-table-container">';
                examplesHTML += '<div class="answer-label">✅ 完整表格：</div>';
                examplesHTML += '<table class="hundred-table-grid filled">';
                for (let row = 0; row < 3; row++) {
                    examplesHTML += '<tr>';
                    for (let col = 0; col < 3; col++) {
                        const cellClass = (row === 1 && col === 1) ? 'center-cell' : '';
                        examplesHTML += `<td class="${cellClass}">${grid[row][col]}</td>`;
                    }
                    examplesHTML += '</tr>';
                }
                examplesHTML += '</table>';
                examplesHTML += '</div>';
            }
            
            examplesHTML += `
                        <div class="example-analysis"><strong>💡 分析：</strong>${example.analysis}</div>
            `;
            
            // 只有当formula和answer不为空时才显示
            if (example.formula) {
                examplesHTML += `<div class="example-formula"><strong>🔢 算式：</strong>${example.formula}</div>`;
            }
            if (example.answer) {
                examplesHTML += `<div class="example-answer"><strong>✅ 答案：</strong>${example.answer}</div>`;
            }
            
            examplesHTML += `
                    </div>
                </div>
            `;
        });
        examplesHTML += '</div>';
        examplesContainer.innerHTML = examplesHTML;
        examplesContainer.style.display = 'block';
    } else {
        examplesContainer.style.display = 'none';
    }
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 防止body滚动
    document.body.style.overflow = 'hidden';
}

// 切换答案显示/隐藏
function toggleAnswer(exampleId) {
    const answerSection = document.getElementById(exampleId);
    const button = document.querySelector(`button[onclick="toggleAnswer('${exampleId}')"]`);
    
    if (answerSection.style.display === 'none') {
        answerSection.style.display = 'block';
        button.innerHTML = '👁️‍🗨️ 隐藏答案';
        button.setAttribute('data-shown', 'true');
    } else {
        answerSection.style.display = 'none';
        button.innerHTML = '👁️ 查看答案';
        button.setAttribute('data-shown', 'false');
    }
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

/**
 * 绘制几何图形
 */
function drawShape(shapeName) {
    const canvas = document.getElementById('shape-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#667eea';
    ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
    ctx.lineWidth = 3;
    
    switch(shapeName) {
        case '长方形':
            // 绘制长方形
            ctx.beginPath();
            ctx.rect(centerX - 100, centerY - 60, 200, 120);
            ctx.fill();
            ctx.stroke();
            break;
            
        case '正方形':
            // 绘制正方形
            ctx.beginPath();
            ctx.rect(centerX - 70, centerY - 70, 140, 140);
            ctx.fill();
            ctx.stroke();
            break;
            
        case '圆':
            // 绘制圆
            ctx.beginPath();
            ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            break;
            
        case '三角形':
            // 绘制三角形
            ctx.beginPath();
            ctx.moveTo(centerX, centerY - 80);
            ctx.lineTo(centerX - 90, centerY + 60);
            ctx.lineTo(centerX + 90, centerY + 60);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
        case '平行四边形':
            // 绘制平行四边形
            ctx.beginPath();
            ctx.moveTo(centerX - 70, centerY - 50);
            ctx.lineTo(centerX + 30, centerY - 50);
            ctx.lineTo(centerX + 70, centerY + 50);
            ctx.lineTo(centerX - 30, centerY + 50);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            break;
            
        case '长方体':
            // 绘制长方体（立体效果）
            drawCuboid(ctx, centerX, centerY);
            break;
            
        case '正方体':
            // 绘制正方体
            drawCube(ctx, centerX, centerY);
            break;
            
        case '圆柱':
            // 绘制圆柱
            drawCylinder(ctx, centerX, centerY);
            break;
            
        case '球':
            // 绘制球（带阴影）
            drawSphere(ctx, centerX, centerY);
            break;
            
        case '三棱柱':
            // 绘制三棱柱
            drawTriangularPrism(ctx, centerX, centerY);
            break;
    }
}

// 绘制长方体
function drawCuboid(ctx, centerX, centerY) {
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.strokeStyle = '#667eea';
    
    // 前面
    ctx.beginPath();
    ctx.rect(centerX - 70, centerY - 30, 100, 70);
    ctx.fill();
    ctx.stroke();
    
    // 侧面
    ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
    ctx.beginPath();
    ctx.moveTo(centerX + 30, centerY - 30);
    ctx.lineTo(centerX + 70, centerY - 55);
    ctx.lineTo(centerX + 70, centerY + 15);
    ctx.lineTo(centerX + 30, centerY + 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 顶面
    ctx.fillStyle = 'rgba(102, 126, 234, 0.25)';
    ctx.beginPath();
    ctx.moveTo(centerX - 70, centerY - 30);
    ctx.lineTo(centerX - 30, centerY - 55);
    ctx.lineTo(centerX + 70, centerY - 55);
    ctx.lineTo(centerX + 30, centerY - 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// 绘制正方体
function drawCube(ctx, centerX, centerY) {
    const size = 60;
    const offset = 30;
    
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.strokeStyle = '#667eea';
    
    // 前面
    ctx.beginPath();
    ctx.rect(centerX - size/2, centerY - size/2 + 10, size, size);
    ctx.fill();
    ctx.stroke();
    
    // 侧面
    ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
    ctx.beginPath();
    ctx.moveTo(centerX + size/2, centerY - size/2 + 10);
    ctx.lineTo(centerX + size/2 + offset, centerY - size/2 - offset + 10);
    ctx.lineTo(centerX + size/2 + offset, centerY + size/2 - offset + 10);
    ctx.lineTo(centerX + size/2, centerY + size/2 + 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 顶面
    ctx.fillStyle = 'rgba(102, 126, 234, 0.25)';
    ctx.beginPath();
    ctx.moveTo(centerX - size/2, centerY - size/2 + 10);
    ctx.lineTo(centerX - size/2 + offset, centerY - size/2 - offset + 10);
    ctx.lineTo(centerX + size/2 + offset, centerY - size/2 - offset + 10);
    ctx.lineTo(centerX + size/2, centerY - size/2 + 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// 绘制圆柱
function drawCylinder(ctx, centerX, centerY) {
    const radiusX = 45;
    const radiusY = 15;
    const height = 90;
    
    // 底部椭圆
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + height/2, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // 侧面矩形
    ctx.fillStyle = 'rgba(102, 126, 234, 0.25)';
    ctx.fillRect(centerX - radiusX, centerY - height/2, radiusX * 2, height);
    
    // 侧面边线
    ctx.beginPath();
    ctx.moveTo(centerX - radiusX, centerY - height/2);
    ctx.lineTo(centerX - radiusX, centerY + height/2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + radiusX, centerY - height/2);
    ctx.lineTo(centerX + radiusX, centerY + height/2);
    ctx.stroke();
    
    // 顶部椭圆（在最上层）
    ctx.fillStyle = 'rgba(102, 126, 234, 0.5)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - height/2, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

// 绘制球
function drawSphere(ctx, centerX, centerY) {
    const radius = 65;
    
    // 外轮廓阴影
    ctx.shadowColor = 'rgba(102, 126, 234, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    // 创建径向渐变，模拟球体光照
    const gradient = ctx.createRadialGradient(
        centerX - 25, centerY - 25, 5,
        centerX, centerY, radius
    );
    gradient.addColorStop(0, '#e8eeff');
    gradient.addColorStop(0.4, 'rgba(150, 170, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.4)');
    
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // 重置阴影
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 球体轮廓
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // 添加高光点
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(centerX - 20, centerY - 20, 12, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制三棱柱
function drawTriangularPrism(ctx, centerX, centerY) {
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 2;
    
    // 前面三角形
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY + 40);
    ctx.lineTo(centerX, centerY - 40);
    ctx.lineTo(centerX + 50, centerY + 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 侧面
    ctx.fillStyle = 'rgba(102, 126, 234, 0.2)';
    ctx.beginPath();
    ctx.moveTo(centerX + 50, centerY + 40);
    ctx.lineTo(centerX + 90, centerY + 20);
    ctx.lineTo(centerX + 40, centerY - 60);
    ctx.lineTo(centerX, centerY - 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // 顶面
    ctx.fillStyle = 'rgba(102, 126, 234, 0.25)';
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY + 40);
    ctx.lineTo(centerX, centerY - 40);
    ctx.lineTo(centerX + 40, centerY - 60);
    ctx.lineTo(centerX - 10, centerY + 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
