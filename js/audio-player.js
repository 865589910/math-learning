/**
 * 音频播放器 - 播放预生成的高质量AI语音MP3文件
 * 优化版本:预加载机制,减少延迟
 */

class AudioPlayer {
    constructor() {
        this.currentAudio = null;
        this.isPlaying = false;
        this.audioCache = new Map(); // 音频缓存
        this.maxCacheSize = 50; // 最大缓存数量
        
        // 音频文件路径映射
        this.audioBaseDir = 'audio/';
        
        // 分类映射
        this.categoryMap = {
            // Section 1
            'numbers': 'section1_numbers',
            'operations': 'section1_operations',
            'positions': 'section1_positions',
            'comparisons': 'section1_comparisons',
            'units': 'section1_units',
            'quantifiers': 'section1_quantifiers',
            // Section 2
            'questionTypes': 'section2_questionTypes',
            'basicConcepts': 'section2_basicConcepts',
            'items': 'section2_items',
            'animals': 'section2_animals',
            'foods': 'section2_foods',
            'planeShapes': 'section2_shapes',
            'solidShapes': 'section2_shapes',
            // Section 3
            'fillMethods': 'section3_fillMethods',
            'comparisonRules': 'section3_comparisonRules',
            'hundredTable': 'section3_hundredTable',
            // Section 4
            'additionProblems': 'section4_additionProblems',
            'subtractionProblems': 'section4_subtractionProblems',
            'multiplicationProblems': 'section4_multiplicationProblems',
            'divisionProblems': 'section4_divisionProblems'
        };
        
        // 预加载常用音频
        this.preloadCommonAudio();
    }
    
    /**
     * 预加载常用音频(异步)
     */
    preloadCommonAudio() {
        // 预加载数字1-10的语音
        const commonWords = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        setTimeout(() => {
            commonWords.forEach(word => {
                this.preloadAudio(word, 'numbers');
            });
        }, 1000); // 页面加载1秒后开始预加载
    }
    
    /**
     * 预加载单个音频
     */
    preloadAudio(word, category = '') {
        const audioPath = this.getAudioPath(word, category);
        if (!this.audioCache.has(audioPath)) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = audioPath;
            this.audioCache.set(audioPath, audio);
            
            // 控制缓存大小
            if (this.audioCache.size > this.maxCacheSize) {
                const firstKey = this.audioCache.keys().next().value;
                this.audioCache.delete(firstKey);
            }
        }
    }
    
    /**
     * 播放字词语音(优化版)
     * @param {string} word - 要朗读的字词
     * @param {string} category - 字词所属分类
     */
    play(word, category = '') {
        if (!word) return;
        
        // 停止当前播放
        this.stop();
        
        // 构建音频文件路径
        const audioPath = this.getAudioPath(word, category);
        
        // 尝试从缓存获取
        let audio = this.audioCache.get(audioPath);
        
        if (!audio) {
            // 如果缓存中没有,创建新的音频对象
            audio = new Audio(audioPath);
            this.audioCache.set(audioPath, audio);
            
            // 控制缓存大小
            if (this.audioCache.size > this.maxCacheSize) {
                const firstKey = this.audioCache.keys().next().value;
                this.audioCache.delete(firstKey);
            }
        }
        
        this.currentAudio = audio;
        this.isPlaying = true;
        
        // 重置播放位置并播放
        audio.currentTime = 0;
        audio.play().then(() => {
            console.log('🔊 播放:', word);
        }).catch(error => {
            console.error('播放失败:', error);
            console.log('尝试的路径:', audioPath);
            this.isPlaying = false;
        });
        
        // 播放结束事件
        audio.onended = () => {
            this.isPlaying = false;
            console.log('✅ 播放完成');
        };
        
        // 错误处理
        audio.onerror = () => {
            console.error('音频加载失败:', audioPath);
            this.isPlaying = false;
        };
    }
    
    /**
     * 停止播放
     */
    stop() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.isPlaying = false;
        }
    }
    
    /**
     * 获取音频文件路径
     */
    getAudioPath(word, category) {
        // 获取实际的文件夹名称
        const folderName = this.categoryMap[category] || 'section1_numbers';
        
        // 特殊字符处理：将数学符号转换为中文
        let filename = word;
        
        // 统一处理所有符号（按照音频文件的命名规则）
        const symbolMap = {
            // 用于句子的半角符号（如：加数+加数=和）
            '+': '加',
            '-': '减',
            '−': '减',      // 全角减号
            '×': '乘号',
            '÷': '除号',
            '=': '等于',
            '/': '或',      // 应用题关键词中的选择符号
            // 用于单个字符显示的全角符号
            '＋': '加号',
            '－': '减号',
            '>': '大于号',
            '<': '小于号'
        };
        
        for (const [char, replacement] of Object.entries(symbolMap)) {
            filename = filename.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
        }
        
        // 构建完整路径
        return `${this.audioBaseDir}${folderName}/${filename}.mp3`;
    }
}

// 创建全局实例
const audioPlayer = new AudioPlayer();
