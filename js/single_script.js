// ハンバーガーメニューの開閉処理 (jQuery)
(function($) {
  var $nav   = $('#navArea');
  var $btn   = $('.toggle_btn');
  var $mask  = $('#mask');
  var open   = 'open'; // class
  // menu open close
  $btn.on( 'click', function() {
    if ( ! $nav.hasClass( open ) ) {
      $nav.addClass( open );
    } else {
      $nav.removeClass( open );
    }
  });
  // mask close
  $mask.on('click', function() {
    $nav.removeClass( open );
  });
} )(jQuery);

// ... (省略: bgSVG関数とモーダル処理は変更なし)
// この関数でインラインSVGを作って表示する---------------------------------------------------
function bgSVG() {
  // ... (省略)
}

// ウィンドウがロードされたらbgSVGを実行
window.addEventListener('load', bgSVG, false);

$(function () {
  const $modalMask = $('#modal-mask');

  //クリックしてモーダルを開く
  $('.heading').on('click', function () {
    const targetModalId = $(this).data('modal-target');
    $(targetModalId).addClass('appear');
    $modalMask.addClass('appear');
  });

  // モーダルを閉じる関数
  function closeModal() {
    $('.modal').removeClass('appear');
    $modalMask.removeClass('appear');
  }

  // 閉じるボタン（.modal-close）をクリックしてモーダルを閉じる
  $('.modal-close').on('click', function () {
    closeModal();
  });

  // モーダル背景マスク（#modal-mask）をクリックしてモーダルを閉じる
  $modalMask.on('click', function () {
    closeModal();
  });
});

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