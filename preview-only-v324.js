(function () {
  'use strict';

  function initPreviewOnly() {
    if (document.getElementById('previewOnlyBar')) return;

    const app = document.querySelector('.app');
    const main = document.querySelector('.main');
    const side = document.querySelector('.side');
    const fontFile = document.getElementById('fontFile');
    const sample = document.getElementById('sample');
    const textInput = document.getElementById('text');
    const previewShell = document.querySelector('.previewShell');
    const previewHead = document.querySelector('.previewHead');
    const compareBox = document.getElementById('compareBox');
    const single = document.getElementById('single');
    if (!app || !main || !fontFile || !sample || !textInput || !previewShell) return;

    document.title = 'Font Pro Preview';
    document.body.classList.add('preview-only-mode');

    const samples = {
      en: {
        alphabet: {
          label: 'English alphabet',
          text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789'
        },
        pangram: {
          label: 'English sample sentence',
          text: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\n0123456789'
        },
        symbols: {
          label: 'Numbers & symbols',
          text: '0 1 2 3 4 5 6 7 8 9\n! @ # $ % & * ( ) - + = / ?'
        }
      },
      vi: {
        alphabet: {
          label: 'Bảng chữ cái tiếng Việt',
          text: 'A Ă Â B C D Đ E Ê G H I K L M N O Ô Ơ P Q R S T U Ư V X Y\n0 1 2 3 4 5 6 7 8 9'
        },
        marks: {
          label: 'Đầy đủ chữ và dấu',
          text: 'Á À Ả Ã Ạ | Ă Ắ Ằ Ẳ Ẵ Ặ | Â Ấ Ầ Ẩ Ẫ Ậ\nÉ È Ẻ Ẽ Ẹ | Ê Ế Ề Ể Ễ Ệ | Í Ì Ỉ Ĩ Ị\nÓ Ò Ỏ Õ Ọ | Ô Ố Ồ Ổ Ỗ Ộ | Ơ Ớ Ờ Ở Ỡ Ợ\nÚ Ù Ủ Ũ Ụ | Ư Ứ Ừ Ử Ữ Ự | Ý Ỳ Ỷ Ỹ Ỵ'
        },
        sentence: {
          label: 'Câu mẫu tiếng Việt',
          text: 'TIẾNG VIỆT ĐẦY ĐỦ DẤU\nTRƯỜNG SƠN ĐÔNG, TRƯỜNG SƠN TÂY\nÁO ĐẤU CHÍNH HÃNG – ĐHL SPORTS'
        }
      }
    };

    let previewMode = 'en';

    function setText(value) {
      textInput.value = value;
      textInput.dispatchEvent(new Event('input', { bubbles: true }));
      textInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function loadSampleOptions(mode) {
      sample.innerHTML = '';
      Object.keys(samples[mode]).forEach(function (key) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = samples[mode][key].label;
        sample.appendChild(option);
      });
      sample.value = 'alphabet';
      setText(samples[mode].alphabet.text);
    }

    function setMode(mode) {
      previewMode = mode;
      document.querySelectorAll('.previewModeBtn').forEach(function (button) {
        const active = button.dataset.mode === mode;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      const modeBadge = document.getElementById('previewModeBadge');
      if (modeBadge) modeBadge.textContent = mode === 'en' ? 'ENGLISH PREVIEW' : 'PREVIEW TIẾNG VIỆT';
      document.documentElement.lang = mode === 'en' ? 'en' : 'vi';
      loadSampleOptions(mode);
    }

    // Khóa toàn bộ công cụ tạo/chỉnh sửa font, chỉ mở lại các trường dùng để xem.
    document.querySelectorAll('.side input, .side select, .side textarea, .side button').forEach(function (el) {
      el.disabled = true;
      el.tabIndex = -1;
    });
    [fontFile, sample, textInput].forEach(function (el) {
      el.disabled = false;
      el.tabIndex = 0;
    });

    const bar = document.createElement('section');
    bar.id = 'previewOnlyBar';
    bar.className = 'previewOnlyBar';
    bar.innerHTML =
      '<div class="previewBrand"><span class="previewLogo">Aa</span><div><h1>FONT PRO PREVIEW</h1><p>Chỉ xem trước bộ font — không chỉnh sửa dữ liệu font</p></div></div>' +
      '<div class="previewModeWrap" role="group" aria-label="Chọn chế độ preview">' +
        '<button class="previewModeBtn active" data-mode="en" type="button" aria-pressed="true"><b>EN</b><span>PREVIEW ENGLISH</span></button>' +
        '<button class="previewModeBtn" data-mode="vi" type="button" aria-pressed="false"><b>VI</b><span>PREVIEW TIẾNG VIỆT</span></button>' +
      '</div>' +
      '<div class="previewControls">' +
        '<label class="previewField previewFile"><span>1. Chọn font TTF / OTF</span><div id="previewFileSlot"></div></label>' +
        '<label class="previewField"><span>2. Nội dung mẫu</span><div id="previewSampleSlot"></div></label>' +
        '<button id="previewFullscreen" class="previewFullscreen" type="button">TOÀN MÀN HÌNH</button>' +
      '</div>' +
      '<label class="previewField previewText"><span>3. Nhập nội dung muốn xem</span><div id="previewTextSlot"></div></label>' +
      '<div class="previewNotice">Trang này không có chức năng chỉnh dấu, thay SVG, sửa ký tự, lưu dự án hoặc xuất font.</div>';

    main.insertBefore(bar, main.firstChild);
    document.getElementById('previewFileSlot').appendChild(fontFile);
    document.getElementById('previewSampleSlot').appendChild(sample);
    document.getElementById('previewTextSlot').appendChild(textInput);

    document.querySelectorAll('.previewModeBtn').forEach(function (button) {
      button.addEventListener('click', function () { setMode(button.dataset.mode); });
    });
    sample.addEventListener('change', function () {
      const selected = samples[previewMode][sample.value];
      if (selected) setText(selected.text);
    });

    if (side) side.hidden = true;
    const toolbar = main.querySelector('.toolbar');
    if (toolbar) toolbar.hidden = true;
    Array.from(main.children).forEach(function (child) {
      if (child !== bar && child !== previewShell) child.hidden = true;
    });
    if (compareBox) compareBox.classList.add('hidden');
    if (single) single.classList.remove('hidden');

    const oldTitle = previewHead && previewHead.querySelector('b');
    if (oldTitle) oldTitle.innerHTML = 'Xem trước bộ chữ <span id="previewModeBadge">ENGLISH PREVIEW</span>';

    document.getElementById('previewFullscreen').addEventListener('click', function () {
      const active = previewShell.classList.toggle('fullscreen');
      document.body.classList.toggle('preview-lock', active);
      this.textContent = active ? 'THU NHỎ' : 'TOÀN MÀN HÌNH';
    });

    app.style.display = 'block';
    main.style.height = 'auto';
    main.style.minHeight = '100vh';
    setMode('en');
  }

  const style = document.createElement('style');
  style.textContent = `
    body.preview-only-mode{background:#eef2f7!important;color:#0f172a!important}
    .preview-only-mode .main{max-width:1280px;margin:0 auto;padding:20px!important}
    .previewOnlyBar{background:#fff;border:1px solid #dbe3ee;border-radius:18px;padding:18px;margin-bottom:14px;box-shadow:0 12px 34px rgba(15,23,42,.07)}
    .previewBrand{display:flex;align-items:center;gap:12px;margin-bottom:16px}
    .previewLogo{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:#0f172a;color:#fff;font-size:20px;font-weight:900}
    .previewBrand h1{font-size:19px;line-height:1.2;margin:0;letter-spacing:.02em}
    .previewBrand p{font-size:12px;color:#64748b;margin:4px 0 0}
    .previewModeWrap{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:5px;background:#eef2f7;border-radius:13px;margin-bottom:14px}
    .previewModeBtn{display:flex;align-items:center;justify-content:center;gap:9px;min-height:48px;border:1px solid transparent;border-radius:10px;background:transparent;color:#475569;font-size:12px;font-weight:900;cursor:pointer}
    .previewModeBtn b{display:grid;place-items:center;width:29px;height:29px;border-radius:8px;background:#cbd5e1;color:#334155;font-size:11px}
    .previewModeBtn.active{background:#fff;border-color:#cbd5e1;color:#0f172a;box-shadow:0 4px 12px rgba(15,23,42,.08)}
    .previewModeBtn.active b{background:#2563eb;color:#fff}
    .previewControls{display:grid;grid-template-columns:minmax(260px,1.4fr) minmax(220px,1fr) auto;gap:10px;align-items:end}
    .previewField>span{display:block;font-size:12px;font-weight:800;margin-bottom:6px;color:#334155}
    .previewField input,.previewField select,.previewField textarea{width:100%;border:1px solid #cbd5e1;border-radius:10px;background:#fff;padding:10px;font-size:14px}
    .previewText{display:block;margin-top:12px}
    .previewText textarea{min-height:92px!important;resize:vertical}
    .previewFullscreen{height:40px;border:0;border-radius:10px;padding:0 16px;background:#0f172a;color:#fff;font-size:11px;font-weight:900;cursor:pointer}
    .previewNotice{margin-top:10px;padding:9px 11px;border-radius:10px;background:#eff6ff;color:#1e40af;font-size:11px}
    .preview-only-mode .previewShell{margin-top:0!important;border-radius:18px!important}
    .preview-only-mode .stage{min-height:520px!important}
    .preview-only-mode .preview{min-height:460px!important}
    #previewModeBadge{display:inline-block;margin-left:8px;padding:4px 8px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-size:10px;vertical-align:middle}
    @media(max-width:760px){.previewControls{grid-template-columns:1fr}.previewModeWrap{grid-template-columns:1fr}.previewFullscreen{width:100%}.preview-only-mode .main{padding:10px!important}.previewOnlyBar{padding:14px}}
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPreviewOnly);
  else setTimeout(initPreviewOnly, 0);
})();
