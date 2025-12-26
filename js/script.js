const button = document.querySelector('.page-top');

button.addEventListener('click', () => {
  window.scroll({ 
    top: 0, 
    behavior: "smooth"
  });
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 100){
    button.classList.add('is-active');
  }else{
    button.classList.remove('is-active');
  }
});

//グラフ設定
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawAllCharts); 

function drawAllCharts() {
    drawChart1();
    drawChart2();
    drawChart3();
}
// グラフ描画ステータスを保持
const chartStatuses = {
    'piechart1': false,
    'piechart2': false,
    'piechart3': false
};

// --- グラフ1の描画関数 ---
function drawChart1() {
    if (chartStatuses['piechart1']) return; // 既に描画済みの場合は何もしない

    var data = google.visualization.arrayToDataTable([
        ['年代', '人数'],
        ['20代 (85.00%)', 34],
        ['10代 (10.00%)', 4],
        ['30代 (5.00%)', 2]
    ]);

    var options = {
        colors: ['#ea4335', '#4285f4', '#fbbc05'],
        legend: { position: 'labeled', textStyle: { color: '#333' } }, // テキスト色を黒に変更
        pieSliceText: 'percentage', // パーセンテージ表示
        backgroundColor: 'transparent',
        chartArea: { left: 0, top: 0, width: '100%', height: '90%' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart1'));
    chart.draw(data, options);
    chartStatuses['piechart1'] = true;
}

// --- グラフ2の描画関数 ---
function drawChart2() {
    if (chartStatuses['piechart2']) return;

    var data = google.visualization.arrayToDataTable([
        ['性別', '人数'],
        ['女性 (78.57%)', 33],
        ['男性 (21.43%)', 9],
        ['その他 (0.00%)', 0]
    ]);

    var options = {
        colors: ['#ea4335', '#4285f4', '#fbbc05'],
        legend: { position: 'labeled', textStyle: { color: '#333' } }, // テキスト色を黒に変更
        pieSliceText: 'percentage',
        backgroundColor: 'transparent',
        chartArea: { left: 0, top: 0, width: '100%', height: '90%' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart2'));
    chart.draw(data, options);
    chartStatuses['piechart2'] = true;
}

// --- グラフ3の描画関数 ---
function drawChart3() {
    if (chartStatuses['piechart3']) return;

    var data = google.visualization.arrayToDataTable([
        ['職業', '人数'],
        ['学生 (90.48%)', 38],
        ['社会人 (9.52%)', 4]
    ]);

    var options = {
        colors: ['#ea4335', '#4285f4'],
        legend: {
            position: 'labeled',
            textStyle: { color: '#333' } // テキスト色を黒に変更
        },
        pieSliceText: 'percentage',
        backgroundColor: 'transparent',
        chartArea: { left: 0, top: 0, width: '100%', height: '90%' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart3'));
    chart.draw(data, options);
    chartStatuses['piechart3'] = true;
}

// 全てのグラフ描画関数をマッピング
const chartMap = {
    'piechart1': drawChart1,
    'piechart2': drawChart2,
    'piechart3': drawChart3
};


// アコーディオンのイベントリスナー設定
document.addEventListener('DOMContentLoaded', () => {
    const accordionTitles = document.querySelectorAll('.accordion-title');

    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const item = title.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            
            // 閉じる処理
            if (title.classList.contains('active')) {
                content.style.maxHeight = 0;
                title.classList.remove('active');
            } else {
                // 開く処理
                // すべて閉じる処理 (オプション: 1つだけ開くようにする場合)
                document.querySelectorAll('.accordion-title').forEach(t => {
                    if (t !== title && t.classList.contains('active')) {
                        t.classList.remove('active');
                        t.closest('.accordion-item').querySelector('.accordion-content').style.maxHeight = 0;
                    }
                });
                
                // 現在のアイテムを開く
                title.classList.add('active');
                // 💡 コンテンツの高さを設定して開く
                // content.scrollHeight はコンテンツの完全な高さを返す
                content.style.maxHeight = content.scrollHeight + "px"; 
                
                
                // --- グラフ描画の呼び出し ---
                // 開いたアコーディオン内のグラフIDを特定
                const chartElement = content.querySelector('[id^="piechart"]');
                if (chartElement) {
                    const chartId = chartElement.id;
                    // 該当する描画関数を呼び出す
                    if (chartMap[chartId]) {
                        chartMap[chartId]();
                    }
                }
            }
        });
    });
});

(function ($) {
  var $nav = $('#navArea');
  var $btn = $('.toggle_btn');
  var $mask = $('#mask');
  var open = 'open';
  $btn.on('click', function () {
    if (!$nav.hasClass(open)) {
      $nav.addClass(open);
    } else {
      $nav.removeClass(open);
    }
  });
  $mask.on('click', function () {
    // マスクをクリックしたときの処理（メニューを閉じる処理）
    $nav.removeClass(open);
  });
// 💡 閉じタグに (jQuery) を追加して、全体をラップする
})(jQuery);

// この関数でインラインSVGを作って表示する
function bgSVG() {
  // 設定
  var settings = {
    count     : 30,  // 表示する泡の数
    minRadius : 20,  // 泡の半径の最小値
    maxRadius : 150, // 泡の半径の最大値
    blurRadius: 10,  // ぼかしの半径
    minRgb    : 150, // rgb 値の最小値
    maxRgb    : 255  // rgb 値の最大値
  };

  var createSvgElm = function (tagName) {
    // SVGの要素を作るための関数
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
  },
      svg = createSvgElm('svg'),             // svg要素
      def = createSvgElm('defs'),            // defs要素 / フィルタ用
      filter = createSvgElm('filter'),       // filter要素
      blur = createSvgElm('feGaussianBlur'), // ブラーのための要素
      wW = window.innerWidth,
      wH = window.innerHeight,
      rand = function (min, max, integer) {
        // 範囲内でランダムな数を出す関数
        var num = Math.random() * (max - min);
        // 整数にするかどうか
        if (integer) {
          num = Math.floor(num);
        }
        return num + min;
      },
      rgb = function (min, max) {
        // 範囲内でランダムなrgbカラーコードを出す関数
        var channels = [];
        for (var i = 0; i < 3; i++) {
          channels.push(rand(min, max, true));
        }
        return 'rgb(' + channels.join(',') + ')';
      };

  // svg要素に属性を指定
  svg.setAttribute('version', '1.1');
  svg.setAttribute('class', 'bg');

  // フィルタ用の要素と属性を作ってsvg要素に追加
  filter.id = 'blur';
  blur.setAttribute('stdDeviation', settings.blurRadius);
  filter.appendChild(blur);
  def.appendChild(filter);
  svg.appendChild(def);

  // 指定した数だけバブルを作ってsvg要素に追加
  for (var i = 0; i < settings.count; i++) {

    var bubble = createSvgElm('g'),       // バブル用のグループ
        blurred = createSvgElm('circle'), // 塗りつぶしなしで縁にぼかしのあるバブル
        filled = createSvgElm('circle'),  // 半透明の塗りつぶしと縁があるバブル
        posX = rand(0, wW), // X方向の配置
        posY = rand(0, wH), // Y方向の配置
        radius = rand(settings.minRadius, settings.maxRadius), // バブルの半径
        color = rgb(settings.minRgb, settings.maxRgb);         // バブルに使う色

    // g要素を移動
    bubble.setAttribute('transform', 'translate(' + posX + ',' + posY + ')');

    // ぼかしバブルに各属性を指定
    blurred.setAttribute('r', radius);
    blurred.setAttribute('fill', color);
    blurred.setAttribute('stroke', color);
    blurred.setAttribute('filter', 'url(#blur)');
    blurred.setAttribute('class', 'blurred');

    // 塗りつぶしありバブルに各属性を指定
    filled.setAttribute('r', radius);
    filled.setAttribute('fill', color);
    filled.setAttribute('stroke', color);
    filled.setAttribute('class', 'filled');

    // 2つのバブルをg要素に追加
    bubble.appendChild(blurred);
    bubble.appendChild(filled);

    // グループをsvg要素に追加
    svg.appendChild(bubble)

  }

  // HTMLのbody要素にsvg要素を追加
  document.getElementsByTagName('body')[0].appendChild(svg);
}

// ウィンドウがロードされたらbgSVGを実行
window.addEventListener('load', bgSVG, false);