(function () {
  'use strict';

  const PRESETS = {
    en: [
      ['full', 'Complete English test', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789\n\nTHE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\nPACK MY BOX WITH FIVE DOZEN LIQUOR JUGS\nSPHINX OF BLACK QUARTZ, JUDGE MY VOW\n\nAV AW AY FA LT TA TO VA WA YA\n0123456789  ! @ # $ % & * ( ) - + = / ?'],
      ['alphabet', 'Alphabet A–Z', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789'],
      ['football', 'Football namesets', 'MESSI 10\nRONALDO 7\nHAALAND 9\nMBAPPE 10\nYAMAL 10\nBELLINGHAM 5\nDE BRUYNE 17\nVAN DIJK 4'],
      ['clubs', 'Club names', 'MANCHESTER CITY\nFC BARCELONA\nREAL MADRID\nMANCHESTER UNITED\nLIVERPOOL\nARSENAL\nPARIS SAINT-GERMAIN\nINTER MIAMI'],
      ['spacing', 'Spacing & kerning', 'AA AB AC AD AE AF AG AH AI AJ AK AL AM\nAV AW AY FA LT LY PA TA TO TR VA WA YA\nHO HOH NON MOM WAVE WATER PLAYER\n111 222 333 444 555 666 777 888 999 000'],
      ['numbers', 'Numbers & punctuation', '0 1 2 3 4 5 6 7 8 9\n10 11 17 19 23 26 30 66 77 99\n! @ # $ % & * ( ) [ ] { }\n- – — + = / \\ : ; . , ?'],
      ['custom', 'Custom text', 'TYPE YOUR TEXT HERE']
    ],
    vi: [
      ['full', 'Kiểm tra tiếng Việt đầy đủ', 'A Ă Â B C D Đ E Ê G H I K L M N O Ô Ơ P Q R S T U Ư V X Y\n0 1 2 3 4 5 6 7 8 9\n\nÁ À Ả Ã Ạ | Ă Ắ Ằ Ẳ Ẵ Ặ | Â Ấ Ầ Ẩ Ẫ Ậ\nÉ È Ẻ Ẽ Ẹ | Ê Ế Ề Ể Ễ Ệ | Í Ì Ỉ Ĩ Ị\nÓ Ò Ỏ Õ Ọ | Ô Ố Ồ Ổ Ỗ Ộ | Ơ Ớ Ờ Ở Ỡ Ợ\nÚ Ù Ủ Ũ Ụ | Ư Ứ Ừ Ử Ữ Ự | Ý Ỳ Ỷ Ỹ Ỵ\n\nTIẾNG VIỆT ĐẦY ĐỦ DẤU\nTRƯỜNG SƠN ĐÔNG, TRƯỜNG SƠN TÂY\nÁO ĐẤU CHÍNH HÃNG – ĐHL SPORTS'],
      ['alphabet', 'Bảng chữ cái Việt Nam', 'A Ă Â B C D Đ E Ê G H I K L M N O Ô Ơ P Q R S T U Ư V X Y\n0 1 2 3 4 5 6 7 8 9'],
      ['marks', 'Toàn bộ chữ có dấu', 'Á À Ả Ã Ạ | Ă Ắ Ằ Ẳ Ẵ Ặ | Â Ấ Ầ Ẩ Ẫ Ậ\nÉ È Ẻ Ẽ Ẹ | Ê Ế Ề Ể Ễ Ệ | Í Ì Ỉ Ĩ Ị\nÓ Ò Ỏ Õ Ọ | Ô Ố Ồ Ổ Ỗ Ộ | Ơ Ớ Ờ Ở Ỡ Ợ\nÚ Ù Ủ Ũ Ụ | Ư Ứ Ừ Ử Ữ Ự | Ý Ỳ Ỷ Ỹ Ỵ'],
      ['names', 'Tên người Việt Nam', 'NGUYỄN QUANG HẢI 19\nĐỖ HÙNG DŨNG 8\nĐẶNG VĂN LÂM 1\nBÙI HOÀNG VIỆT ANH 20\nPHẠM TUẤN HẢI 10\nNGUYỄN TIẾN LINH 22\nVŨ VĂN THANH 17'],
      ['words', 'Từ dễ lỗi dấu', 'ĐẦY ĐỦ  ĐỒNG ĐỘI  ĐỘI TUYỂN\nTRƯỜNG  HƯỚNG  TƯỞNG  THƯỞNG\nNGUYỄN  HUYỀN  QUYỀN  TUYẾT\nHOÀNG  QUẢNG  THẮNG  NGHĨA\nPHƯỢNG  CƯỜNG  DŨNG  HẢI'],
      ['sentences', 'Câu tiếng Việt', 'CHÚ BÉ LOẮT CHOẮT\nXÁCH CÁI XẮC XINH XINH\nCÁI CHÂN THOĂN THOẮT\nCÁI ĐẦU NGHÊNH NGHÊNH\n\nNHIỄU ĐIỀU PHỦ LẤY GIÁ GƯƠNG\nNGƯỜI TRONG MỘT NƯỚC PHẢI THƯƠNG NHAU CÙNG'],
      ['custom', 'Tự nhập nội dung', 'NHẬP NỘI DUNG CẦN XEM TẠI ĐÂY']
    ]
  };

  function init() {
    if (document.getElementById('fontPreviewApp')) return;
    const app = document.querySelector('.app');
    const main = document.querySelector('.main');
    const side = document.querySelector('.side');
    const fontFile = document.getElementById('fontFile');
    if (!app || !main || !fontFile) return;

    document.title = 'Font Pro Preview V33';
    document.documentElement.lang = 'vi';
    document.body.className = 'previewOnlyBody';
    document.querySelectorAll('.studioTop,.workflowBar,.feedbackModal').forEach(el => el.hidden = true);
    fontFile.remove();
    fontFile.onchange = null;
    fontFile.disabled = false;
    fontFile.tabIndex = 0;
    if (side) side.remove();
    main.innerHTML = '';
    app.style.display = 'block';
    main.className = 'previewMain';

    main.innerHTML = `
      <section id="fontPreviewApp" class="previewApp">
        <header class="appHeader">
          <div class="brandBox"><span class="brandIcon">FP</span><div><h1>FONT PRO PREVIEW</h1><p>Kiểm tra font nameset trực tiếp trên Chrome</p></div></div>
          <div class="headerBadge">PREVIEW ONLY</div>
        </header>
        <section class="controlCard">
          <div class="modeTabs" role="group" aria-label="Chế độ preview">
            <button class="modeBtn active" data-mode="en" type="button"><b>EN</b><span>PREVIEW ENGLISH</span></button>
            <button class="modeBtn" data-mode="vi" type="button"><b>VI</b><span>PREVIEW TIẾNG VIỆT</span></button>
          </div>
          <div class="sourceRow">
            <label class="field"><span>1. CHỌN FONT TTF / OTF</span><div id="fontInputSlot"></div></label>
            <label class="field"><span>2. BỘ NỘI DUNG KIỂM TRA</span><select id="presetSelect"></select></label>
          </div>
          <div id="fontLoadStatus" class="loadStatus">Chưa nạp font — hãy chọn một file TTF hoặc OTF.</div>
          <div class="adjustGrid">
            <label class="rangeField"><span>Cỡ chữ</span><div><button data-size-step="-10" type="button">−</button><input id="sizeRange" type="range" min="24" max="300" value="96"><input id="sizeNumber" type="number" min="24" max="300" value="96"><button data-size-step="10" type="button">+</button></div></label>
            <label class="rangeField"><span>Giãn chữ</span><div><button data-space-step="-1" type="button">−</button><input id="spaceRange" type="range" min="-10" max="40" value="0"><input id="spaceNumber" type="number" min="-10" max="40" value="0"><button data-space-step="1" type="button">+</button></div></label>
            <label class="colorField"><span>Màu chữ</span><input id="textColor" type="color" value="#f4cf64"></label>
            <label class="colorField"><span>Màu nền</span><input id="bgColor" type="color" value="#000000"></label>
          </div>
          <label class="field textField"><span>3. NỘI DUNG PREVIEW — CÓ THỂ SỬA TRỰC TIẾP</span><textarea id="previewText" spellcheck="false"></textarea></label>
          <div class="quickActions"><button id="fitWidth" type="button">VỪA CHIỀU NGANG</button><button id="resetView" type="button">ĐẶT LẠI HIỂN THỊ</button><button id="clearText" type="button">XÓA NỘI DUNG</button></div>
        </section>
        <section id="viewer" class="viewer">
          <div class="viewerHead">
            <div><small>LIVE PREVIEW</small><strong id="viewerMode">ENGLISH</strong><span id="viewerInfo">96px • giãn chữ 0px</span></div>
            <div class="viewerActions"><button id="zoomOut" type="button" title="Thu nhỏ">−</button><button id="zoomReset" type="button">96px</button><button id="zoomIn" type="button" title="Phóng to">+</button><button id="fullScreen" class="fullScreen" type="button">⛶ TOÀN MÀN HÌNH</button></div>
          </div>
          <div id="previewStage" class="previewStage"><div id="rawPreview" class="rawPreview"></div></div>
        </section>
      </section>`;

    document.getElementById('fontInputSlot').appendChild(fontFile);
    const ui = { mode:'en', family:'Arial', face:null, preset:document.getElementById('presetSelect'), text:document.getElementById('previewText'), size:document.getElementById('sizeRange'), sizeNum:document.getElementById('sizeNumber'), space:document.getElementById('spaceRange'), spaceNum:document.getElementById('spaceNumber'), color:document.getElementById('textColor'), bg:document.getElementById('bgColor'), preview:document.getElementById('rawPreview'), stage:document.getElementById('previewStage'), viewer:document.getElementById('viewer'), status:document.getElementById('fontLoadStatus') };
    function currentPreset(){return PRESETS[ui.mode].find(x=>x[0]===ui.preset.value)||PRESETS[ui.mode][0]}
    function setText(text){ui.text.value=text;render()}
    function clamp(value,min,max){return Math.max(min,Math.min(max,Number(value)||min))}
    function setSize(value){value=clamp(value,24,300);ui.size.value=value;ui.sizeNum.value=value;render()}
    function setSpace(value){value=clamp(value,-10,40);ui.space.value=value;ui.spaceNum.value=value;render()}
    function loadPresets(){ui.preset.innerHTML=PRESETS[ui.mode].map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');ui.preset.value='full';setText(currentPreset()[2])}
    function render(){ui.preview.textContent=ui.text.value||' ';ui.preview.style.fontFamily=`'${ui.family}', Arial, sans-serif`;ui.preview.style.fontSize=ui.size.value+'px';ui.preview.style.letterSpacing=ui.space.value+'px';ui.preview.style.color=ui.color.value;ui.stage.style.backgroundColor=ui.bg.value;document.getElementById('viewerInfo').textContent=`${ui.size.value}px • giãn chữ ${ui.space.value}px`}
    function setMode(mode){ui.mode=mode;document.querySelectorAll('.modeBtn').forEach(btn=>btn.classList.toggle('active',btn.dataset.mode===mode));document.getElementById('viewerMode').textContent=mode==='en'?'ENGLISH':'TIẾNG VIỆT';loadPresets()}
    function fitWidth(){const lines=ui.text.value.split('\n').filter(Boolean);if(!lines.length)return;const probe=document.createElement('canvas').getContext('2d');let size=260;const available=Math.max(280,ui.stage.clientWidth-64);for(;size>=24;size-=2){probe.font=`${size}px '${ui.family}'`;const widest=Math.max(...lines.map(line=>probe.measureText(line).width+Math.max(0,line.length-1)*Number(ui.space.value)));if(widest<=available)break}setSize(size)}

    fontFile.addEventListener('change',async function(){const file=fontFile.files&&fontFile.files[0];if(!file)return;ui.status.className='loadStatus loading';ui.status.textContent='Đang nạp và kiểm tra '+file.name+'…';try{if(ui.face)document.fonts.delete(ui.face);const family='PreviewFont'+Date.now();const face=new FontFace(family,await file.arrayBuffer());await face.load();document.fonts.add(face);ui.face=face;ui.family=family;ui.status.className='loadStatus success';ui.status.textContent='✓ Đã nạp: '+file.name+' — font chỉ được dùng tạm thời trong trình duyệt.';render()}catch(error){ui.family='Arial';ui.status.className='loadStatus error';ui.status.textContent='Không thể mở font: '+error.message;render()}});
    document.querySelectorAll('.modeBtn').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
    ui.preset.addEventListener('change',()=>setText(currentPreset()[2]));ui.text.addEventListener('input',render);ui.size.addEventListener('input',()=>setSize(ui.size.value));ui.sizeNum.addEventListener('input',()=>setSize(ui.sizeNum.value));ui.space.addEventListener('input',()=>setSpace(ui.space.value));ui.spaceNum.addEventListener('input',()=>setSpace(ui.spaceNum.value));ui.color.addEventListener('input',render);ui.bg.addEventListener('input',render);
    document.querySelectorAll('[data-size-step]').forEach(btn=>btn.addEventListener('click',()=>setSize(Number(ui.size.value)+Number(btn.dataset.sizeStep))));document.querySelectorAll('[data-space-step]').forEach(btn=>btn.addEventListener('click',()=>setSpace(Number(ui.space.value)+Number(btn.dataset.spaceStep))));
    document.getElementById('zoomOut').addEventListener('click',()=>setSize(Number(ui.size.value)-10));document.getElementById('zoomIn').addEventListener('click',()=>setSize(Number(ui.size.value)+10));document.getElementById('zoomReset').addEventListener('click',()=>setSize(96));document.getElementById('fitWidth').addEventListener('click',fitWidth);document.getElementById('resetView').addEventListener('click',()=>{ui.color.value='#f4cf64';ui.bg.value='#000000';setSpace(0);setSize(96)});document.getElementById('clearText').addEventListener('click',()=>{setText('');ui.text.focus()});
    document.getElementById('fullScreen').addEventListener('click',async function(){try{if(!document.fullscreenElement)await ui.viewer.requestFullscreen();else await document.exitFullscreen()}catch(_){ui.viewer.classList.toggle('fullscreenFallback');document.body.classList.toggle('viewerLocked',ui.viewer.classList.contains('fullscreenFallback'))}});
    document.addEventListener('fullscreenchange',function(){const active=document.fullscreenElement===ui.viewer;document.getElementById('fullScreen').textContent=active?'✕ THOÁT TOÀN MÀN HÌNH':'⛶ TOÀN MÀN HÌNH'});
    setMode('en');render();
  }

  const style=document.createElement('style');style.textContent=`
    *{box-sizing:border-box}.studioTop,.workflowBar,.feedbackModal{display:none!important}.previewOnlyBody{margin:0!important;background:#eaf0f7!important;color:#0f172a!important;font-family:Segoe UI,Arial,sans-serif!important}.previewMain{max-width:1480px;margin:auto;padding:20px}.previewApp{width:100%}
    .appHeader{display:flex;align-items:center;justify-content:space-between;background:#0f1b30;color:#fff;border-radius:18px;padding:16px 20px;margin-bottom:14px;box-shadow:0 12px 30px rgba(15,23,42,.12)}.brandBox{display:flex;align-items:center;gap:12px}.brandIcon{display:grid;place-items:center;width:48px;height:48px;border-radius:13px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);font-weight:900}.brandBox h1{margin:0;font-size:20px;letter-spacing:.05em}.brandBox p{margin:4px 0 0;color:#b9c7da;font-size:12px}.headerBadge{border:1px solid #385074;border-radius:999px;padding:7px 11px;color:#bdd3f5;font-size:10px;font-weight:900;letter-spacing:.1em}
    .controlCard{background:#fff;border:1px solid #d7e0ec;border-radius:18px;padding:16px;box-shadow:0 10px 28px rgba(15,23,42,.07)}.modeTabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#edf2f8;border-radius:13px;padding:5px;margin-bottom:14px}.modeBtn{min-height:48px;border:1px solid transparent;border-radius:10px;background:transparent;color:#52647c;font-weight:900;cursor:pointer}.modeBtn b{display:inline-grid;place-items:center;width:29px;height:29px;margin-right:8px;border-radius:8px;background:#cfdae8}.modeBtn.active{background:#fff;border-color:#cbd7e6;color:#0f172a;box-shadow:0 5px 13px rgba(15,23,42,.08)}.modeBtn.active b{background:#2563eb;color:#fff}.sourceRow{display:grid;grid-template-columns:1fr 1fr;gap:10px}.field>span,.rangeField>span,.colorField>span{display:block;margin-bottom:6px;color:#34455d;font-size:11px;font-weight:900;letter-spacing:.03em}.field input,.field select,.field textarea{width:100%;border:1px solid #c8d5e5;border-radius:10px;background:#fff;padding:10px;font:600 13px Segoe UI,Arial}.loadStatus{margin-top:9px;padding:9px 11px;border-radius:9px;background:#f1f5f9;color:#64748b;font-size:12px}.loadStatus.loading{background:#fff7df;color:#8a5b00}.loadStatus.success{background:#eaf8ee;color:#16743a}.loadStatus.error{background:#ffeded;color:#b42318}
    .adjustGrid{display:grid;grid-template-columns:1.5fr 1.5fr .55fr .55fr;gap:10px;margin-top:13px}.rangeField>div{display:grid;grid-template-columns:34px 1fr 70px 34px;gap:5px}.rangeField button,.quickActions button,.viewerActions button{border:1px solid #c6d3e2;border-radius:8px;background:#fff;color:#17243a;font-weight:900;cursor:pointer}.rangeField input[type=range]{width:100%}.rangeField input[type=number]{width:100%;border:1px solid #c6d3e2;border-radius:8px;text-align:center;font-weight:800}.colorField input{width:100%;height:39px;padding:3px;border:1px solid #c6d3e2;border-radius:9px;background:#fff}.textField{display:block;margin-top:13px}.textField textarea{min-height:150px;resize:vertical;line-height:1.5}.quickActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.quickActions button{padding:8px 11px;font-size:11px}
    .viewer{margin-top:14px;border:1px solid #1f314a;border-radius:18px;overflow:hidden;background:#000;box-shadow:0 12px 30px rgba(15,23,42,.12)}.viewerHead{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 13px;background:#0f1b30;color:#fff}.viewerHead>div:first-child{display:flex;align-items:center;gap:9px;flex-wrap:wrap}.viewerHead small{color:#5ea0ff;font-size:9px;font-weight:900;letter-spacing:.16em}.viewerHead strong{font-size:12px}.viewerHead span{color:#b8c7da;font-size:11px}.viewerActions{display:flex;gap:6px}.viewerActions button{min-width:36px;height:34px;padding:0 10px}.viewerActions .fullScreen{background:#2563eb;color:#fff;border-color:#2563eb}.previewStage{height:570px;overflow:auto;padding:38px;background:#000}.rawPreview{display:flex;min-width:max-content;min-height:100%;align-items:center;justify-content:center;white-space:pre;line-height:1.18;text-align:center;font-kerning:normal;font-variant-ligatures:normal}.viewer:fullscreen,.viewer.fullscreenFallback{position:fixed;inset:0;z-index:99999;margin:0;border-radius:0;width:100vw;height:100vh}.viewer:fullscreen .previewStage,.viewer.fullscreenFallback .previewStage{height:calc(100vh - 58px)}.viewerLocked{overflow:hidden!important}
    @media(max-width:900px){.previewMain{padding:10px}.sourceRow,.adjustGrid{grid-template-columns:1fr 1fr}.previewStage{height:460px}.viewerHead{align-items:flex-start;flex-direction:column}.viewerActions{width:100%;flex-wrap:wrap}.viewerActions .fullScreen{margin-left:auto}}
    @media(max-width:580px){.modeTabs,.sourceRow,.adjustGrid{grid-template-columns:1fr}.appHeader{padding:13px}.headerBadge{display:none}.rangeField>div{grid-template-columns:34px 1fr 62px 34px}.previewStage{height:400px;padding:20px}.fullScreen{width:100%;margin:0!important}}
  `;document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else setTimeout(init,0);
})();
