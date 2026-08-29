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

    if (side) side.hidden = true;
    const toolbar = main.querySelector('.toolbar');
    if (toolbar) toolbar.hidden = true;
    Array.from(main.children).forEach(function (child) {
      if (child !== bar && child !== previewShell) child.hidden = true;
    });
    if (compareBox) compareBox.classList.add('hidden');
    if (single) single.classList.remove('hidden');

    const oldTitle = previewHead && previewHead.querySelector('b');
    if (oldTitle) oldTitle.textContent = 'Xem trước bộ chữ';

    document.getElementById('previewFullscreen').addEventListener('click', function () {
      const active = previewShell.classList.toggle('fullscreen');
      document.body.classList.toggle('preview-lock', active);
      this.textContent = active ? 'THU NHỎ' : 'TOÀN MÀN HÌNH';
    });

    app.style.display = 'block';
    main.style.height = 'auto';
    main.style.minHeight = '100vh';
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
    @media(max-width:760px){.previewControls{grid-template-columns:1fr}.previewFullscreen{width:100%}.preview-only-mode .main{padding:10px!important}.previewOnlyBar{padding:14px}}
  `;
  document.head.appendChild(style);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPreviewOnly);
  else setTimeout(initPreviewOnly, 0);
})();
