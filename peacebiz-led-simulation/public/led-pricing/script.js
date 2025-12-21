// LEDディスプレー価格計算ツール JavaScript - 実際の見積書ベース価格

// データ分割関数
function _getData(){
    return {
        outdoor: {
            name: "屋外用ディスプレー",
            options: {
                "2.5": { basePrice: 148650, name: "P2.5", cabinet: {width: 96, height: 96} },
                "3.91": { basePrice: 87000, name: "P3.91", cabinet: {width: 96, height: 96} },
                "4.0": { basePrice: 85000, name: "P4.0", cabinet: {width: 96, height: 96} },
                "5.0": { basePrice: 71400, name: "P5.0", cabinet: {width: 96, height: 96} },
                "6.6": { basePrice: 66900, name: "P6.6", cabinet: {width: 96, height: 96} },
                "8.0": { basePrice: 62000, name: "P8.0", cabinet: {width: 96, height: 96} },
                "10.0": { basePrice: 65250, name: "P10.0", cabinet: {width: 96, height: 96} }
            },
            processor: { base: 65000, premium: 80000 },
            installation: 15000
        },
        indoor: {
            name: "屋内用ディスプレー",
            options: {
                "1.56": { basePrice: 180000, name: "P1.56", cabinet: {width: 60, height: 60} },
                "2.0": { basePrice: 150000, name: "P2.0", cabinet: {width: 60, height: 60} },
                "2.5": { basePrice: 120000, name: "P2.5", cabinet: {width: 60, height: 60} },
                "3.0": { basePrice: 90000, name: "P3.0", cabinet: {width: 60, height: 60} },
                "4.0": { basePrice: 75000, name: "P4.0", cabinet: {width: 60, height: 60} }
            },
            processor: { base: 80000, premium: 120000 },
            installation: 15000
        },
        transparent: {
            name: "透明ディスプレー",
            options: {
                "3.9": { basePrice: 142500, name: "P3.9", cabinet: {width: 137.5, height: 100} }
            },
            processor: { base: 70000, premium: 105000 },
            installation: 15000
        },
        transparentFilm: {
            name: "ホログラム透明フィルム",
            options: {
                "2.5": { basePrice: 1005600, name: "P2.5", cabinet: {width: 120, height: 25} },
                "3.91": { basePrice: 385650, name: "P3.91", cabinet: {width: 120, height: 25} },
                "5.0": { basePrice: 275550, name: "P5.0", cabinet: {width: 120, height: 25} },
                "6.25": { basePrice: 210750, name: "P6.25", cabinet: {width: 120, height: 25} },
                "7.82": { basePrice: 165300, name: "P7.82", cabinet: {width: 120, height: 25} }
            },
            processor: { base: 50000, premium: 80000 },
            installation: 10000
        }
    };
}

function _getMultipliers(){
    return {
        user: 2.5,
        dealer: 1.8,
        primaryDealer: 1.3
    };
}

function _getCodes(){
    return {
        internal: ['HVS-EXEC-7429'],
        primary: ['XPR-9273', 'GLX-4816', 'ZNQ-7041', 'MKR-5638', 'TPX-8329'],
        dealer: ['DHQ-2794', 'VNM-4185', 'BGT-6372', 'KWX-9157', 'FJL-3608']
    };
}

// データ初期化
const priceData = _getData();
const priceMultipliers = _getMultipliers();
const dealerCodes = _getCodes();

// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        dealerCode: document.getElementById('dealerCode'),
        displayType: document.querySelectorAll('input[name="displayType"]'),
        width: document.getElementById('width'),
        height: document.getElementById('height'),
        pitch: document.getElementById('pitch'),
        calculateBtn: document.getElementById('calculateBtn'),
        resultsSection: document.getElementById('resultsSection'),
        currentSize: document.getElementById('currentSize'),
        recommendedSize: document.getElementById('recommendedSize'),
        specsSummary: document.getElementById('specsSummary'),
        
        // コンテナ要素
        dualPriceContainer: document.getElementById('dualPriceContainer'),
        singlePriceContainer: document.getElementById('singlePriceContainer'),
        
        // サイズラベル
        smallSizeLabel: document.getElementById('smallSizeLabel'),
        largeSizeLabel: document.getElementById('largeSizeLabel'),
        
        // 小サイズ価格表示要素
        userMainPriceSmall: document.getElementById('userMainPriceSmall'),
        userProcessorPriceSmall: document.getElementById('userProcessorPriceSmall'),
        userInstallationPriceSmall: document.getElementById('userInstallationPriceSmall'),
        userTotalPriceSmall: document.getElementById('userTotalPriceSmall'),
        dealerPriceSectionSmall: document.getElementById('dealerPriceSectionSmall'),
        dealerMainPriceSmall: document.getElementById('dealerMainPriceSmall'),
        dealerProcessorPriceSmall: document.getElementById('dealerProcessorPriceSmall'),
        dealerInstallationPriceSmall: document.getElementById('dealerInstallationPriceSmall'),
        dealerTotalPriceSmall: document.getElementById('dealerTotalPriceSmall'),
        primaryDealerPriceSectionSmall: document.getElementById('primaryDealerPriceSectionSmall'),
        primaryMainPriceSmall: document.getElementById('primaryMainPriceSmall'),
        primaryProcessorPriceSmall: document.getElementById('primaryProcessorPriceSmall'),
        primaryInstallationPriceSmall: document.getElementById('primaryInstallationPriceSmall'),
        primaryTotalPriceSmall: document.getElementById('primaryTotalPriceSmall'),
        
        // 大サイズ価格表示要素
        userMainPriceLarge: document.getElementById('userMainPriceLarge'),
        userProcessorPriceLarge: document.getElementById('userProcessorPriceLarge'),
        userInstallationPriceLarge: document.getElementById('userInstallationPriceLarge'),
        userTotalPriceLarge: document.getElementById('userTotalPriceLarge'),
        dealerPriceSectionLarge: document.getElementById('dealerPriceSectionLarge'),
        dealerMainPriceLarge: document.getElementById('dealerMainPriceLarge'),
        dealerProcessorPriceLarge: document.getElementById('dealerProcessorPriceLarge'),
        dealerInstallationPriceLarge: document.getElementById('dealerInstallationPriceLarge'),
        dealerTotalPriceLarge: document.getElementById('dealerTotalPriceLarge'),
        primaryDealerPriceSectionLarge: document.getElementById('primaryDealerPriceSectionLarge'),
        primaryMainPriceLarge: document.getElementById('primaryMainPriceLarge'),
        primaryProcessorPriceLarge: document.getElementById('primaryProcessorPriceLarge'),
        primaryInstallationPriceLarge: document.getElementById('primaryInstallationPriceLarge'),
        primaryTotalPriceLarge: document.getElementById('primaryTotalPriceLarge'),
        
        // 単一サイズ価格表示要素（フィルム用）
        userMainPrice: document.getElementById('userMainPrice'),
        userShippingPrice: document.getElementById('userShippingPrice'),
        userProcessorPrice: document.getElementById('userProcessorPrice'),
        userInstallationPrice: document.getElementById('userInstallationPrice'),
        userTotalPrice: document.getElementById('userTotalPrice'),
        dealerPriceSection: document.getElementById('dealerPriceSection'),
        dealerMainPrice: document.getElementById('dealerMainPrice'),
        dealerShippingPrice: document.getElementById('dealerShippingPrice'),
        dealerProcessorPrice: document.getElementById('dealerProcessorPrice'),
        dealerInstallationPrice: document.getElementById('dealerInstallationPrice'),
        dealerTotalPrice: document.getElementById('dealerTotalPrice'),
        primaryDealerPriceSection: document.getElementById('primaryDealerPriceSection'),
        primaryMainPrice: document.getElementById('primaryMainPrice'),
        primaryShippingPrice: document.getElementById('primaryShippingPrice'),
        primaryProcessorPrice: document.getElementById('primaryProcessorPrice'),
        primaryInstallationPrice: document.getElementById('primaryInstallationPrice'),
        primaryTotalPrice: document.getElementById('primaryTotalPrice'),
        
        // 原価・利益表示要素（2パターン対応）
        costProfitPriceSection: document.getElementById('costProfitPriceSection'),
        // 小サイズ原価
        costMainPriceSmall: document.getElementById('costMainPriceSmall'),
        costShippingPriceSmall: document.getElementById('costShippingPriceSmall'),
        costProcessorPriceSmall: document.getElementById('costProcessorPriceSmall'),
        costInstallationPriceSmall: document.getElementById('costInstallationPriceSmall'),
        costTotalPriceSmall: document.getElementById('costTotalPriceSmall'),
        // 大サイズ原価
        costMainPriceLarge: document.getElementById('costMainPriceLarge'),
        costShippingPriceLarge: document.getElementById('costShippingPriceLarge'),
        costProcessorPriceLarge: document.getElementById('costProcessorPriceLarge'),
        costInstallationPriceLarge: document.getElementById('costInstallationPriceLarge'),
        costTotalPriceLarge: document.getElementById('costTotalPriceLarge'),
        // 利益分析（2パターン）
        userProfitSmall: document.getElementById('userProfitSmall'),
        userProfitLarge: document.getElementById('userProfitLarge'),
        dealerProfitSmall: document.getElementById('dealerProfitSmall'),
        dealerProfitLarge: document.getElementById('dealerProfitLarge'),
        primaryProfitSmall: document.getElementById('primaryProfitSmall'),
        primaryProfitLarge: document.getElementById('primaryProfitLarge'),
        primaryToDealerProfitSmall: document.getElementById('primaryToDealerProfitSmall'),
        primaryToDealerProfitLarge: document.getElementById('primaryToDealerProfitLarge'),
        primaryToUserProfitSmall: document.getElementById('primaryToUserProfitSmall'),
        primaryToUserProfitLarge: document.getElementById('primaryToUserProfitLarge'),
        dealerToUserProfitSmall: document.getElementById('dealerToUserProfitSmall'),
        dealerToUserProfitLarge: document.getElementById('dealerToUserProfitLarge')
    };

    // イベントリスナーの設定
    _setupListeners(elements);
    
    // 初期表示の更新
    _updateSize(elements);
    _updatePitch(elements);
});

function _setupListeners(el) {
    el.width.addEventListener('input', () => _updateSize(el));
    el.height.addEventListener('input', () => _updateSize(el));
    el.displayType.forEach(radio => {
        radio.addEventListener('change', () => _updatePitch(el));
    });
    el.pitch.addEventListener('change', () => _updateSize(el));
    
    // 計算ボタン
    el.calculateBtn.addEventListener('click', () => _calculate(el));
    
    el.dealerCode.addEventListener('input', () => {
        if (el.resultsSection.style.display !== 'none') {
            _calculate(el);
        }
    });
}

function _getType(el) {
    for (let radio of el.displayType) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return 'outdoor';
}

function _updateSize(el) {
    const w = parseFloat(el.width.value) || 0;
    const h = parseFloat(el.height.value) || 0;
    const area = (w * h) / 10000;

    el.currentSize.textContent = `${(w/100).toFixed(1)}m × ${(h/100).toFixed(1)}m (${area.toFixed(1)}㎡)`;

    const type = _getType(el);
    const recommended = _getRecommended(w, h, type, el);
    el.recommendedSize.textContent = recommended;
}

function _getRecommended(w, h, type, el) {
    const pitch = el.pitch?.value;
    const typeData = priceData[type];
    
    if (!pitch || !typeData) {
        return "ピッチを選択してください";
    }
    
    const pitchData = typeData.options[pitch];
    if (!pitchData) {
        return "選択されたピッチが見つかりません";
    }
    
    // フィルムの場合は入力サイズのまま
    if (type === 'transparentFilm') {
        return "入力サイズで計算します";
    }
    
    const cabinet = pitchData.cabinet;
    // 入力値以下（ギリ小さい）
    const smallerCountX = Math.floor(w / cabinet.width);
    const smallerCountY = Math.floor(h / cabinet.height);
    const smallerW = smallerCountX * cabinet.width;
    const smallerH = smallerCountY * cabinet.height;
    
    // 入力値以上（ギリ大きい）
    const largerCountX = Math.ceil(w / cabinet.width);
    const largerCountY = Math.ceil(h / cabinet.height);
    const largerW = largerCountX * cabinet.width;
    const largerH = largerCountY * cabinet.height;
    
    // 入力サイズが最適かチェック
    const isOptimalSmaller = Math.abs(smallerW - w) < 1 && Math.abs(smallerH - h) < 1;
    const isOptimalLarger = Math.abs(largerW - w) < 1 && Math.abs(largerH - h) < 1;
    
    if (isOptimalSmaller || isOptimalLarger) {
        return "入力サイズが最適です";
    }
    
    // 小さいサイズが0の場合の処理
    if (smallerCountX === 0 || smallerCountY === 0) {
        return `推奨: ${(largerW/100).toFixed(1)}m × ${(largerH/100).toFixed(1)}m (${largerCountX}×${largerCountY}=${largerCountX*largerCountY}枚)`;
    }
    
    // 2パターン表示
    return `小サイズ: ${(smallerW/100).toFixed(1)}m × ${(smallerH/100).toFixed(1)}m (${smallerCountX}×${smallerCountY}=${smallerCountX*smallerCountY}枚) | 大サイズ: ${(largerW/100).toFixed(1)}m × ${(largerH/100).toFixed(1)}m (${largerCountX}×${largerCountY}=${largerCountX*largerCountY}枚)`;
}

function _updatePitch(el) {
    const type = _getType(el);
    const typeData = priceData[type];
    
    el.pitch.innerHTML = '<option value="">ピッチを選択</option>';
    
    if (typeData && typeData.options) {
        Object.keys(typeData.options).forEach(pitch => {
            const option = document.createElement('option');
            option.value = pitch;
            option.textContent = typeData.options[pitch].name;
            el.pitch.appendChild(option);
        });
    }
    
    // 推奨サイズを更新
    _updateSize(el);
}

// シンプルな単一計算関数
// ← 2パターン価格計算に対応
function _calculate(el) {
    const type = _getType(el);
    const inputW = parseFloat(el.width.value) || 0;
    const inputH = parseFloat(el.height.value) || 0;
    const pitch = el.pitch.value;
    const code = el.dealerCode.value.trim();

    // 入力値チェック
    if (inputW <= 0 || inputH <= 0) {
        alert('正しいサイズを入力してください。');
        return false;
    }

    if (!pitch) {
        alert('ピッチを選択してください。');
        return false;
    }

    const typeData = priceData[type];
    const pitchData = typeData.options[pitch];

    if (!pitchData) {
        alert('選択されたピッチが見つかりません。');
        return false;
    }

    // フィルムの場合は単一サイズ表示
    if (type === 'transparentFilm') {
        _calculateSingleSize(el, type, inputW, inputH, pitch, code, typeData, pitchData);
    } else {
        _calculateDualSize(el, type, inputW, inputH, pitch, code, typeData, pitchData);
    }

    // 結果セクションを表示
    el.resultsSection.style.display = 'block';
    
    // 仕様確認セクションを表示
    const specsSection = el.resultsSection.querySelector('.specs-summary');
    if (specsSection) {
        specsSection.style.display = 'block';
    }
    
    // 価格表示セクションを表示
    const priceDisplay = el.resultsSection.querySelector('.price-display');
    if (priceDisplay) {
        priceDisplay.style.display = 'block';
    }
    
    // 注意事項を表示
    const notes = el.resultsSection.querySelector('.notes');
    if (notes) {
        notes.style.display = 'block';
    }

    // 結果セクションにスクロール
    el.resultsSection.scrollIntoView({ behavior: 'smooth' });

    return true;
}

// 単一サイズ計算（フィルム用）
function _calculateSingleSize(el, type, inputW, inputH, pitch, code, typeData, pitchData) {
    // フィルムは入力サイズのまま平米単価で計算
    const actualW = inputW;
    const actualH = inputH;
    const actualArea = (actualW * actualH) / 10000; // ㎡
    const baseMain = Math.round(pitchData.basePrice * actualArea);
    
    const cabinetData = {
        actualW: actualW,
        actualH: actualH,
        horizontalCount: null,
        verticalCount: null,
        totalCount: null
    };
    
    const baseShipping = 250000; // 固定送料25万円
    const baseProcessor = actualArea > 20 ? typeData.processor.premium : typeData.processor.base;
    const baseInstallation = Math.round(typeData.installation * actualArea);

    // 原価合計
    const costTotal = baseMain + baseShipping + baseProcessor + baseInstallation;

    // 各価格レベルの計算
    const prices = _calculatePrices(baseMain, baseShipping, baseProcessor, baseInstallation, costTotal);

    // 単一サイズ表示に切り替え
    el.dualPriceContainer.style.display = 'none';
    el.singlePriceContainer.style.display = 'block';

    // 結果表示
    _updateSingleDisplay(el, prices, code);
    _updateSummary(el, type, pitch, pitchData.name, actualArea, cabinetData, { width: inputW, height: inputH });
}

// 2パターンサイズ計算（通常ディスプレー用）
function _calculateDualSize(el, type, inputW, inputH, pitch, code, typeData, pitchData) {
    const cabinet = pitchData.cabinet;
    
    // 小サイズ（入力値以下）
    const smallerCountX = Math.floor(inputW / cabinet.width);
    const smallerCountY = Math.floor(inputH / cabinet.height);
    const smallerW = smallerCountX * cabinet.width;
    const smallerH = smallerCountY * cabinet.height;
    const smallerArea = (smallerW * smallerH) / 10000;
    
    // 大サイズ（入力値以上）
    const largerCountX = Math.ceil(inputW / cabinet.width);
    const largerCountY = Math.ceil(inputH / cabinet.height);
    const largerW = largerCountX * cabinet.width;
    const largerH = largerCountY * cabinet.height;
    const largerArea = (largerW * largerH) / 10000;
    
    // 小サイズが0の場合は大サイズのみ表示
    if (smallerCountX === 0 || smallerCountY === 0) {
        _calculateSingleSizeFromLarge(el, type, inputW, inputH, pitch, code, typeData, pitchData, largerW, largerH, largerArea, largerCountX, largerCountY);
        return;
    }
    
    // 2パターン表示に切り替え
    el.dualPriceContainer.style.display = 'block';
    el.singlePriceContainer.style.display = 'none';
    
    // サイズラベル更新
    el.smallSizeLabel.textContent = `${(smallerW/100).toFixed(1)}m × ${(smallerH/100).toFixed(1)}m`;
    el.largeSizeLabel.textContent = `${(largerW/100).toFixed(1)}m × ${(largerH/100).toFixed(1)}m`;
    
    // 各サイズの価格計算
    const smallPrices = _calculateSizePrice(smallerArea, typeData, pitchData);
    const largePrices = _calculateSizePrice(largerArea, typeData, pitchData);
    
    // 結果表示
    _updateDualDisplay(el, smallPrices, largePrices, code);
    _updateDualSummary(el, type, pitch, pitchData.name, inputW, inputH, smallerW, smallerH, smallerArea, smallerCountX, smallerCountY, largerW, largerH, largerArea, largerCountX, largerCountY);
}

// 小サイズが0の場合の大サイズ単一表示
function _calculateSingleSizeFromLarge(el, type, inputW, inputH, pitch, code, typeData, pitchData, largerW, largerH, largerArea, largerCountX, largerCountY) {
    const cabinetData = {
        actualW: largerW,
        actualH: largerH,
        horizontalCount: largerCountX,
        verticalCount: largerCountY,
        totalCount: largerCountX * largerCountY
    };
    
    const prices = _calculateSizePrice(largerArea, typeData, pitchData);
    
    // 単一サイズ表示に切り替え
    el.dualPriceContainer.style.display = 'none';
    el.singlePriceContainer.style.display = 'block';
    
    _updateSingleDisplay(el, prices, code);
    _updateSummary(el, type, pitch, pitchData.name, largerArea, cabinetData, { width: inputW, height: inputH });
}

// サイズ別価格計算
function _calculateSizePrice(area, typeData, pitchData) {
    const baseMain = Math.round(pitchData.basePrice * area);
    const baseShipping = 250000; // 固定送料25万円
    const baseProcessor = area > 20 ? typeData.processor.premium : typeData.processor.base;
    const baseInstallation = Math.round(typeData.installation * area);
    const costTotal = baseMain + baseShipping + baseProcessor + baseInstallation;
    
    return _calculatePrices(baseMain, baseShipping, baseProcessor, baseInstallation, costTotal);
}

// 価格計算ロジック（共通）
function _calculatePrices(baseMain, baseShipping, baseProcessor, baseInstallation, costTotal) {
    return {
        cost: {
            main: baseMain,
            shipping: baseShipping,
            processor: baseProcessor,
            installation: baseInstallation,
            total: costTotal
        },
        user: {
            main: Math.round((baseMain + baseShipping) * priceMultipliers.user),
            shipping: 0,
            processor: Math.round(baseProcessor * priceMultipliers.user),
            installation: Math.round(baseInstallation * priceMultipliers.user),
            total: 0
        },
        dealer: {
            main: Math.round((baseMain + baseShipping) * priceMultipliers.dealer) + 200000, // +20万円固定追加
            shipping: 0,
            processor: Math.round(baseProcessor * priceMultipliers.dealer),
            installation: Math.round(baseInstallation * priceMultipliers.dealer),
            total: 0
        },
        primaryDealer: {
            main: Math.round((baseMain + baseShipping) * priceMultipliers.primaryDealer) + 200000, // +20万円固定追加
            shipping: 0,
            processor: Math.round(baseProcessor * priceMultipliers.primaryDealer),
            installation: Math.round(baseInstallation * priceMultipliers.primaryDealer),
            total: 0
        }
    };
}

// 単一サイズ表示更新（フィルム用）
function _updateSingleDisplay(el, prices, code) {
    const codeUpper = code.toUpperCase();
    
    const invalidCodeMessage = document.getElementById('invalidCodeMessage');
    if (invalidCodeMessage) {
        invalidCodeMessage.style.display = 'none';
    }
    
    // 合計計算
    prices.user.total = prices.user.main + prices.user.processor + prices.user.installation;
    prices.dealer.total = prices.dealer.main + prices.dealer.processor + prices.dealer.installation;
    prices.primaryDealer.total = prices.primaryDealer.main + prices.primaryDealer.processor + prices.primaryDealer.installation;
    
    el.userMainPrice.textContent = _formatPrice(prices.user.main);
    el.userShippingPrice.textContent = _formatPrice(prices.user.shipping);
    el.userProcessorPrice.textContent = _formatPrice(prices.user.processor);
    el.userInstallationPrice.textContent = _formatPrice(prices.user.installation);
    el.userTotalPrice.textContent = _formatPrice(prices.user.total);

    el.costProfitPriceSection.style.display = 'none';
    el.dealerPriceSection.style.display = 'none';
    el.primaryDealerPriceSection.style.display = 'none';

    if (!code) {
        return;
    }

    if (dealerCodes.internal.includes(codeUpper)) {
        _showAllPricesSingle(el, prices);
    } else if (dealerCodes.primary.includes(codeUpper)) {
        _showThreeTierSingle(el, prices);
    } else if (dealerCodes.dealer.includes(codeUpper)) {
        _showDealerSingle(el, prices);
    } else if (code.length > 0) {
        _showInvalid(el);
    }
}

// 2パターン表示更新
function _updateDualDisplay(el, smallPrices, largePrices, code) {
    const codeUpper = code.toUpperCase();
    
    const invalidCodeMessage = document.getElementById('invalidCodeMessage');
    if (invalidCodeMessage) {
        invalidCodeMessage.style.display = 'none';
    }
    
    // 合計計算
    smallPrices.user.total = smallPrices.user.main + smallPrices.user.processor + smallPrices.user.installation;
    smallPrices.dealer.total = smallPrices.dealer.main + smallPrices.dealer.processor + smallPrices.dealer.installation;
    smallPrices.primaryDealer.total = smallPrices.primaryDealer.main + smallPrices.primaryDealer.processor + smallPrices.primaryDealer.installation;
    
    largePrices.user.total = largePrices.user.main + largePrices.user.processor + largePrices.user.installation;
    largePrices.dealer.total = largePrices.dealer.main + largePrices.dealer.processor + largePrices.dealer.installation;
    largePrices.primaryDealer.total = largePrices.primaryDealer.main + largePrices.primaryDealer.processor + largePrices.primaryDealer.installation;
    
    // ユーザー価格（常に表示）
    el.userMainPriceSmall.textContent = _formatPrice(smallPrices.user.main);
    el.userProcessorPriceSmall.textContent = _formatPrice(smallPrices.user.processor);
    el.userInstallationPriceSmall.textContent = _formatPrice(smallPrices.user.installation);
    el.userTotalPriceSmall.textContent = _formatPrice(smallPrices.user.total);
    
    el.userMainPriceLarge.textContent = _formatPrice(largePrices.user.main);
    el.userProcessorPriceLarge.textContent = _formatPrice(largePrices.user.processor);
    el.userInstallationPriceLarge.textContent = _formatPrice(largePrices.user.installation);
    el.userTotalPriceLarge.textContent = _formatPrice(largePrices.user.total);

    // 初期状態で非表示
    el.costProfitPriceSection.style.display = 'none';
    el.dealerPriceSectionSmall.style.display = 'none';
    el.dealerPriceSectionLarge.style.display = 'none';
    el.primaryDealerPriceSectionSmall.style.display = 'none';
    el.primaryDealerPriceSectionLarge.style.display = 'none';

    if (!code) {
        return;
    }

    if (dealerCodes.internal.includes(codeUpper)) {
        _showAllPricesDual(el, smallPrices, largePrices);
    } else if (dealerCodes.primary.includes(codeUpper)) {
        _showThreeTierDual(el, smallPrices, largePrices);
    } else if (dealerCodes.dealer.includes(codeUpper)) {
        _showDealerDual(el, smallPrices, largePrices);
    } else if (code.length > 0) {
        _showInvalid(el);
    }
}

// 単一サイズ用表示関数
function _showAllPricesSingle(el, prices) {
    el.costProfitPriceSection.style.display = 'block';
    // 単一サイズの場合は原価は単純な表示になるが、フィルムのみなのでここでは非表示
    // 実際には原価情報は参考用に表示する必要があるかもしれない
    
    _showThreeTierSingle(el, prices);
}

function _showThreeTierSingle(el, prices) {
    el.primaryDealerPriceSection.style.display = 'block';
    el.primaryMainPrice.textContent = _formatPrice(prices.primaryDealer.main);
    el.primaryShippingPrice.textContent = _formatPrice(prices.primaryDealer.shipping);
    el.primaryProcessorPrice.textContent = _formatPrice(prices.primaryDealer.processor);
    el.primaryInstallationPrice.textContent = _formatPrice(prices.primaryDealer.installation);
    el.primaryTotalPrice.textContent = _formatPrice(prices.primaryDealer.total);
    
    _showDealerSingle(el, prices);
}

function _showDealerSingle(el, prices) {
    el.dealerPriceSection.style.display = 'block';
    el.dealerMainPrice.textContent = _formatPrice(prices.dealer.main);
    el.dealerShippingPrice.textContent = _formatPrice(prices.dealer.shipping);
    el.dealerProcessorPrice.textContent = _formatPrice(prices.dealer.processor);
    el.dealerInstallationPrice.textContent = _formatPrice(prices.dealer.installation);
    el.dealerTotalPrice.textContent = _formatPrice(prices.dealer.total);
}

// 2パターン用表示関数
function _showAllPricesDual(el, smallPrices, largePrices) {
    el.costProfitPriceSection.style.display = 'block';
    
    // 原価情報表示
    el.costMainPriceSmall.textContent = _formatPrice(smallPrices.cost.main);
    el.costShippingPriceSmall.textContent = _formatPrice(smallPrices.cost.shipping);
    el.costProcessorPriceSmall.textContent = _formatPrice(smallPrices.cost.processor);
    el.costInstallationPriceSmall.textContent = _formatPrice(smallPrices.cost.installation);
    el.costTotalPriceSmall.textContent = _formatPrice(smallPrices.cost.total);
    
    el.costMainPriceLarge.textContent = _formatPrice(largePrices.cost.main);
    el.costShippingPriceLarge.textContent = _formatPrice(largePrices.cost.shipping);
    el.costProcessorPriceLarge.textContent = _formatPrice(largePrices.cost.processor);
    el.costInstallationPriceLarge.textContent = _formatPrice(largePrices.cost.installation);
    el.costTotalPriceLarge.textContent = _formatPrice(largePrices.cost.total);
    
    // 利益分析表示
    el.userProfitSmall.textContent = _formatPrice(smallPrices.user.total - smallPrices.cost.total);
    el.userProfitLarge.textContent = _formatPrice(largePrices.user.total - largePrices.cost.total);
    el.dealerProfitSmall.textContent = _formatPrice(smallPrices.dealer.total - smallPrices.cost.total);
    el.dealerProfitLarge.textContent = _formatPrice(largePrices.dealer.total - largePrices.cost.total);
    el.primaryProfitSmall.textContent = _formatPrice(smallPrices.primaryDealer.total - smallPrices.cost.total);
    el.primaryProfitLarge.textContent = _formatPrice(largePrices.primaryDealer.total - largePrices.cost.total);
    
    // 下流販売利益表示
    el.primaryToDealerProfitSmall.textContent = _formatPrice(smallPrices.dealer.total - smallPrices.primaryDealer.total);
    el.primaryToDealerProfitLarge.textContent = _formatPrice(largePrices.dealer.total - largePrices.primaryDealer.total);
    el.primaryToUserProfitSmall.textContent = _formatPrice(smallPrices.user.total - smallPrices.primaryDealer.total);
    el.primaryToUserProfitLarge.textContent = _formatPrice(largePrices.user.total - largePrices.primaryDealer.total);
    el.dealerToUserProfitSmall.textContent = _formatPrice(smallPrices.user.total - smallPrices.dealer.total);
    el.dealerToUserProfitLarge.textContent = _formatPrice(largePrices.user.total - largePrices.dealer.total);
    
    _showThreeTierDual(el, smallPrices, largePrices);
}

function _showThreeTierDual(el, smallPrices, largePrices) {
    el.primaryDealerPriceSectionSmall.style.display = 'block';
    el.primaryMainPriceSmall.textContent = _formatPrice(smallPrices.primaryDealer.main);
    el.primaryProcessorPriceSmall.textContent = _formatPrice(smallPrices.primaryDealer.processor);
    el.primaryInstallationPriceSmall.textContent = _formatPrice(smallPrices.primaryDealer.installation);
    el.primaryTotalPriceSmall.textContent = _formatPrice(smallPrices.primaryDealer.total);
    
    el.primaryDealerPriceSectionLarge.style.display = 'block';
    el.primaryMainPriceLarge.textContent = _formatPrice(largePrices.primaryDealer.main);
    el.primaryProcessorPriceLarge.textContent = _formatPrice(largePrices.primaryDealer.processor);
    el.primaryInstallationPriceLarge.textContent = _formatPrice(largePrices.primaryDealer.installation);
    el.primaryTotalPriceLarge.textContent = _formatPrice(largePrices.primaryDealer.total);
    
    _showDealerDual(el, smallPrices, largePrices);
}

function _showDealerDual(el, smallPrices, largePrices) {
    el.dealerPriceSectionSmall.style.display = 'block';
    el.dealerMainPriceSmall.textContent = _formatPrice(smallPrices.dealer.main);
    el.dealerProcessorPriceSmall.textContent = _formatPrice(smallPrices.dealer.processor);
    el.dealerInstallationPriceSmall.textContent = _formatPrice(smallPrices.dealer.installation);
    el.dealerTotalPriceSmall.textContent = _formatPrice(smallPrices.dealer.total);
    
    el.dealerPriceSectionLarge.style.display = 'block';
    el.dealerMainPriceLarge.textContent = _formatPrice(largePrices.dealer.main);
    el.dealerProcessorPriceLarge.textContent = _formatPrice(largePrices.dealer.processor);
    el.dealerInstallationPriceLarge.textContent = _formatPrice(largePrices.dealer.installation);
    el.dealerTotalPriceLarge.textContent = _formatPrice(largePrices.dealer.total);
}

function _showInvalid(el) {
    const invalidCodeMessage = document.getElementById('invalidCodeMessage');
    if (invalidCodeMessage) {
        invalidCodeMessage.style.display = 'block';
        invalidCodeMessage.textContent = '入力された取引先コードが無効です。正しいコードを入力してください。';
    }
}

function _updateSummary(el, type, pitch, pitchName, area, cabinetData, input) {
    if (!el.specsSummary) return;
    
    const inputW = input.width / 100;
    const inputH = input.height / 100;
    const inputArea = (input.width * input.height) / 10000;
    
    const actualW = cabinetData.actualW / 100;
    const actualH = cabinetData.actualH / 100;
    
    // 入力サイズと実際サイズが同じかチェック
    const isSameSize = Math.abs(inputW - actualW) < 0.01 && Math.abs(inputH - actualH) < 0.01;
    
    let sizeDisplay;
    if (type === 'transparentFilm') {
        // フィルムの場合は入力サイズのまま表示
        sizeDisplay = `<strong>サイズ:</strong><br>${inputW.toFixed(1)}m × ${inputH.toFixed(1)}m (${inputArea.toFixed(1)}㎡)<br><span style="color: #38a169; font-size: 0.9em;">✓ フィルムサイズ</span>`;
    } else if (isSameSize) {
        sizeDisplay = `<strong>サイズ:</strong><br>${inputW.toFixed(1)}m × ${inputH.toFixed(1)}m (${inputArea.toFixed(1)}㎡)<br><span style="color: #38a169; font-size: 0.9em;">✓ 最適サイズです</span>`;
    } else {
        sizeDisplay = `<strong>サイズ:</strong><br>入力: ${inputW.toFixed(1)}m × ${inputH.toFixed(1)}m (${inputArea.toFixed(1)}㎡)<br><span style="color: #2563eb; font-weight: 600;">→ 計算用: ${actualW.toFixed(1)}m × ${actualH.toFixed(1)}m (${area.toFixed(1)}㎡)</span>`;
    }
    
    let cabinetInfo = '';
    if (type !== 'transparentFilm' && cabinetData.horizontalCount !== null) {
        cabinetInfo = `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
            <strong>キャビネット組み合わせ:</strong><br>
            <span style="color: #4a5568; font-size: 0.95rem;">${cabinetData.horizontalCount}×${cabinetData.verticalCount}=${cabinetData.totalCount}枚</span>
        </div>`;
    }
    
    const summary = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            <div><strong>ディスプレータイプ:</strong><br>${priceData[type].name}</div>
            <div>${sizeDisplay}</div>
            <div><strong>ピクセルピッチ:</strong><br>${pitchName}</div>
        </div>
        ${cabinetInfo}
    `;
    
    el.specsSummary.innerHTML = summary;
}

function _formatPrice(price) {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
        minimumFractionDigits: 0
    }).format(price);
}

// 2パターン用サマリー更新
function _updateDualSummary(el, type, pitch, pitchName, inputW, inputH, smallerW, smallerH, smallerArea, smallerCountX, smallerCountY, largerW, largerH, largerArea, largerCountX, largerCountY) {
    if (!el.specsSummary) return;
    
    const inputWm = inputW / 100;
    const inputHm = inputH / 100;
    const inputArea = (inputW * inputH) / 10000;
    
    const smallWm = smallerW / 100;
    const smallHm = smallerH / 100;
    const largeWm = largerW / 100;
    const largeHm = largerH / 100;
    
    const summary = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
            <div><strong>ディスプレータイプ:</strong><br>${priceData[type].name}</div>
            <div><strong>入力サイズ:</strong><br>${inputWm.toFixed(1)}m × ${inputHm.toFixed(1)}m (${inputArea.toFixed(1)}㎡)</div>
            <div><strong>ピクセルピッチ:</strong><br>${pitchName}</div>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="padding: 10px; background: #f0f8f0; border-radius: 8px; border-left: 4px solid #27ae60;">
                    <strong>小サイズ計算:</strong><br>
                    <span style="color: #2d5a2d;">${smallWm.toFixed(1)}m × ${smallHm.toFixed(1)}m (${smallerArea.toFixed(1)}㎡)</span><br>
                    <span style="color: #4a5568; font-size: 0.9rem;">キャビネット: ${smallerCountX}×${smallerCountY}=${smallerCountX*smallerCountY}枚</span>
                </div>
                <div style="padding: 10px; background: #fef8f0; border-radius: 8px; border-left: 4px solid #e74c3c;">
                    <strong>大サイズ計算:</strong><br>
                    <span style="color: #8b2635;">${largeWm.toFixed(1)}m × ${largeHm.toFixed(1)}m (${largerArea.toFixed(1)}㎡)</span><br>
                    <span style="color: #4a5568; font-size: 0.9rem;">キャビネット: ${largerCountX}×${largerCountY}=${largerCountX*largerCountY}枚</span>
                </div>
            </div>
        </div>
    `;
    
    el.specsSummary.innerHTML = summary;
}