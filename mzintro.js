/* 开头动画 v19：代码少女睁眼（Komari 版）
   用法：在 Komari 后台 → 设置 → 站点 → Custom Body 末尾追加一行
   <script src="https://leelokhan.helioho.st/mzintro.js"></script>
   只在首页播，每个浏览器标签页只播一次；点一下跳过，约 8 秒自动消失。 */
(function(){
  "use strict";
  var css = `
  #mzIntro{position:fixed;inset:0;z-index:99999;overflow:hidden;
    background:radial-gradient(1200px 800px at 50% 38%,#171233 0%,#0a0a18 55%,#05060f 100%);
    transition:opacity .5s ease,transform .5s ease;
    animation:introAutoHide .6s ease 8s forwards;}
  #mzIntro::before{content:"";position:absolute;inset:0;
    background-image:linear-gradient(rgba(143,123,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(143,123,255,.055) 1px,transparent 1px);
    background-size:44px 44px;
    -webkit-mask-image:radial-gradient(circle at 50% 42%,#000 30%,transparent 78%);
            mask-image:radial-gradient(circle at 50% 42%,#000 30%,transparent 78%);}
  #mzIntro.leaving{opacity:0;transform:scale(1.05);pointer-events:none;}
  @keyframes introAutoHide{to{opacity:0;visibility:hidden;}}
  #mzIntroCanvas{position:absolute;inset:0;width:100%;height:100%;display:block;}
  .mz-flash{position:absolute;inset:0;pointer-events:none;opacity:0;
    background:radial-gradient(circle at 50% 40%,rgba(255,222,160,.9),rgba(255,143,171,.38) 42%,transparent 72%);}
  #mzIntro.eyes-open .mz-flash{animation:introFlash 1.05s ease-out;}
  @keyframes introFlash{0%{opacity:0}12%{opacity:.95}100%{opacity:0}}
  .mz-name{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);white-space:nowrap;
    font-family:"Noto Serif SC","Songti SC","STSong",serif;font-weight:900;
    font-size:clamp(64px,13vw,132px);letter-spacing:.3em;text-indent:.3em;opacity:0;transition:opacity .5s ease;
    line-height:1.1;filter:drop-shadow(0 0 14px rgba(240,189,118,.30));}
  .mz-name span{display:inline-block;opacity:0;color:#f6c97e;transform:translateY(34px) scale(1.6);filter:blur(10px);
    transition:opacity .55s ease,transform .6s cubic-bezier(.16,1.3,.3,1),filter .55s ease;
    text-shadow:0 0 18px rgba(240,189,118,.55),0 0 46px rgba(242,96,126,.35);}
  @supports ((-webkit-background-clip:text) or (background-clip:text)){
    .mz-name span{background:linear-gradient(180deg,#fff6dd 0%,#f9dc9a 38%,#f0bd76 62%,#c97f35 100%);
      -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;text-shadow:none;}
  }
  .mz-sub{position:absolute;left:50%;top:calc(42% + clamp(84px,10vw,118px));
    white-space:nowrap;font-size:clamp(11px,1.6vw,14px);letter-spacing:.55em;text-indent:.55em;color:#b3aec2;opacity:0;
    transform:translateX(-50%) translateY(10px);transition:opacity .8s ease,transform .8s ease;}
  .mz-sub::before,.mz-sub::after{content:"";display:inline-block;width:36px;height:1px;vertical-align:middle;
    background:linear-gradient(90deg,transparent,rgba(240,189,118,.75));}
  .mz-sub::before{margin-right:16px;}
  .mz-sub::after{margin-left:16px;background:linear-gradient(90deg,rgba(240,189,118,.75),transparent);}
  #mzIntro .mz-name{display:none;}
  .mz-hint{position:absolute;right:18px;bottom:14px;font-size:12px;letter-spacing:.25em;color:rgba(245,241,232,.42);
    opacity:0;animation:introHintIn 1s ease 1.4s forwards;user-select:none;}
  @keyframes introHintIn{to{opacity:1}}
`;
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
  var wrap = document.createElement("div");
  wrap.innerHTML = `<div id="mzIntro" role="presentation">
  <canvas id="mzIntroCanvas"></canvas>
  <div class="mz-flash"></div>
  <div class="mz-name"><span>美</span><span>滋</span><span>滋</span></div>
  <div class="mz-sub">服 务 器 监 控 · KOMARI MONITOR</div>
  <div class="mz-hint">点击跳过</div>
</div>`;
  document.body.appendChild(wrap.firstChild);
})();

(function(){
  "use strict";
  var intro=document.getElementById('mzIntro');
  function kill(){ if(intro&&intro.parentNode) intro.parentNode.removeChild(intro);
    document.documentElement.style.overflow=''; }
  /* Komari 适配：只在首页播，每次刷新都播 */
  if (location.pathname !== '/' && location.pathname !== '/index.html') { kill(); return; }
  try{
    if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){ kill(); return; }
    document.documentElement.style.overflow='hidden';
    var cvs=document.getElementById('mzIntroCanvas'), ctx=cvs.getContext('2d');
    var DPR=Math.min(window.devicePixelRatio||1,1.5), CW=0, CH=0;
    function resize(){ CW=window.innerWidth; CH=window.innerHeight;
      cvs.width=CW*DPR; cvs.height=CH*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); layout(); }
    /* === PORTRAIT DATA START === */
    var PW=464, PH=424;
    var PORTRAIT={w:116,h:106,pal:["#fbf2eb", "#f9e8e7", "#f6e6ea", "#f9e7e4", "#f5e4e7", "#f2e3e7", "#fbe2db", "#fce0d8", "#fdded7", "#f4dfe0", "#eddde3", "#fcded6", "#fddcd5", "#faddd6", "#fcdbd1", "#fcd8d0", "#decbd7", "#fcd1c6", "#e9c6b6", "#ccb6c8", "#e4a88b", "#c5b2c6", "#bea9be", "#e29786", "#c79674", "#cb7c61", "#d76755", "#9e7e81", "#9d6646", "#965b3a", "#7b5947", "#d5392f", "#d03228", "#cf3127", "#ce3026", "#a84749", "#b13535", "#76503b", "#7c402c", "#ce2d25", "#c42c25", "#b4211b", "#901d1a", "#911310", "#830d0b", "#65493b", "#593e35", "#583626", "#443438", "#482c21", "#3b2d31", "#362b31", "#34282e", "#452017", "#302326", "#600807", "#400a09", "#281e24", "#23191d", "#1c0f11", "#b7a6ff"],data:"0000000000000000000000000000000000000000000ryFFFFFFGGGHGxFFGGGFGFFFFwr0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000wEFFzzFGGBBBBwxzyxFGBHGFFEFxr00000000000000000000000000000000000000000000000000000000000000000000000000000000000000wEFFzFGGBwxyzzzzEzwzyzwBGFEEFEr000000000000000000000000000000000000000000000000000000000000000000000000000000000000wEGFEEFBwzzyyFGGFzzyFGFzxwBFFEGyr0000000000000000000000000000000000000000000000000000000000000000000000000000000000rEGFFFGwzzzzFIJIJGFFGIIJGzzzBGEEGFo00000000000000000000000000000000000000000000000000000000000000000000000000000000ryGFFFBxEzzzGHFFGFFEzGGzxGHFzywGFFGw00000000000000000000000000000000000000000000000000000000000000000000000000000000wFGGFBxEEzzGFzzFEFFzzFFFzzzGFEEwFEGIr000000000000000000000000000000000000000000000000000000000000000000000000000000wGGFFBxEEzzGFzzzzzGEzzyzzFzyzFFzyrFFGGo0000000000000000000000000000000000000000000000000000000000000000000000000000rFIGFGwEEEzFFFEzzzzGzzzzzzFzzzyFzEzrxzIr000000000000000000000000000000000000000000000000000000000000000000000000000lBGIGFBEFEEFFFEEzzyFFzzzzzzyGzzyyzEzwwzGGo00000000000000000000000000000000000000000000000000000000000000000000000000tHIGEBEFFEEFGzzzzzyGzzzzzzyyGzzzzzzzyrFFIA0000000000000000000000000000000000000000000000000000000000000000000000000quIIFFxEFzzFGEzzzzzzGzzzzyzzyFzzzzyzyzzAzGGo000000000000000000000000000000000000000000000000000000000000000000000000tBJFFBFGzzFGEEEzzzzzGzzyyyyyxxFzzyyxEzywBFJr000000000000000000000000000000000000000000000000000000000000000000000000tIIFGzGFzzGyEEzzzzzFGzzzzyxxwwGxFExwwyzxBFIr000000000000000000000000000000000000000000000000000000000000000000000000uJGFGFGzzxGrywyyyFwGFwzyyxwwrrGrwwwrrwwwwHGBi0000000000000000000000000000000000000000000000000000000000000000000000fDJFHFGEzzFwryrwwwrrGwwwwxwrrrrFrrwrrrwrxzBGFr0000000000000000000000000000000000000000000000000000000000000000000000lJUFGFGEzzGrwwrrrxrrIwwrrrrrwwrGrrwwwwwFFEwGGB0000000000000000000000000000000000000000000000000000000000000000000000uDJGGGEEEzGwGwrwzzFwIzrrrrrwEEwGwzzFyyFFGzxBIB0000000000000000000000000000000000000000000000000000000000000000000000CDJIGGEEEFFEHEFFGEFFJFwFwrwEEEFGFFEFEyzFFzzFGJo00000000000000000000000000000000000000000000000000000000000000000000NCDJIGFEEzGEFGEFFFzzFJFEEEEEEEzFHFEzzFzyGFzyBGJr000000000000000000000000000000000000000000000000000000000000000000RTRDHJIGEzzzGzGEEEFzzEGJFFEEEEFzyFIGzzzFzzGzzzBFHCAo00000000000000000000000000000000000000000000000000000000000000RRLPRSIIHGEzzEGEGzEzEFEzGJEFEzzzFzzFJGFyyFyzGzzzxGBPNvq000000000000000000000000000000000000000000000000000000000000TRvjRMJJJGIFEzGFzGEzzGEEFJDFFzzzyFyzGJGGzyEEyGyzzwJwNNNKq0000000000000000000000000000000000000000000000000000000000WRsulLMJIJGIFzzIEzGEzFGEFGBAFFyyyyGzFGJGFFFyFyGxxzzHECPNNKq000000000000000000000000000000000000000000000000000000000WLlqqutlHIIIGFGGzzGEEIFFGHoAGzyyyFFzGGtHFGFyFzGyxFzHGBNNPNtq0000000000000000000000000000000000000000000000000000000XTpqpttqpJJIIGGGGzEGFGGEGGqerGzyyyGxzGHjBFIGFGzGzzFzHHwNPPPNq0000000000000000000000000000000000000000000000000000000XRtqptuupqHIIGIFIzFGGIFGGBi8qGxxxyGxFGBgqGGIGGyGzFEzHBFDPPPNtq00000000000000000000000000000000000000000000000000000TWKqltutqqjAIGIGGIFFGIGGGHqqoqGxxxFFxGGDsqBGIIIFGzGyzHHHDPPPPKt00000000000000000000000000000000000000000000000000000XLlttuDtlppDIJIIIIGFIIGIGlggiqGxwwGxzGGliflGHIIGFzGzyHUOBPPQPPq00000000000000000000000000000000000000000000000000000XOttuuDttlttIJIIIIGGIIHBldefglGwwFFxGGBifgfpBHIIyFGzFJSRBQQQPNvq000000000000000000000000000000000000000000000000000XXRPtttDtqqqJIJIIIJIFIUUtpjjjflGwxGwFHGojiinsDAIIEGFzHJPPHQQPPPLq000000000000000000000000000000000000000000000000000XXQQKutuutqtuIUDqAJ000000000pjjFwFzFFBAos0000000000EEHURRMPPPPPPq000000000000000000000000000000000000000000000000000XWRRvCTusutDUIJAooA0F0hsBD00tooFFFxxrFlq0D0Fuks0F0GE0HJOQSQQPPPPvq0000000000000000000000000000000000000000000000000XXTRRRRRRuttluIJHijp00Bjk0ll00j0yywxrrqi0j000q0qB00zF0JJQRSQQPPPPLt0000000000000000000000000000000000000000000000000XXQQRRRRTDXDtqHJJojop00lo0llj0jFFwwrlrgg00ll0oooG0Fz00JURURQQPQPPPq0000000000000000000000000000000000000000000000000XXQQRRRRKMWUIJJIJHjoo00ljijii00xwwAjoiggiiiiiii000zF00IUUURQQQQPPNvq00000000000000000000000000000000000000000000000XXTQRRRTTtCXIIJIJJIAjj000ijiij0ww0jjqjggggiiiiil000E000HJITRRQQQPPNLt00000000000000000000000000000000000000000000000XXRQRRRTTRWSFIUJJJJGAjj0Fjiijoolj0ggfgggggiiiijBB0yF000HJVTRRRQQQPPPq0000000000000000000000000000000000000000000000WXWRQRRTTTWXHEIVJIJIFIDplrqiiiiiggggf1fggggiiiiqBqGFIIJGIVXXRRRQQQPPNvt00000000000000000000000000000000000000000000WXXRQQRRRTTXXFGVVUGJIzIJDJjroiiiiggggd18gggggiiqrpAGIIIIIHMXXWRRRRQQPNNt0000000000000000000000000000000000000000000TXXRRPRRRTTXXUEJYSUGUGEJupJtgjliigggggggggggggioleHIIIJGIJFBXXXWRRRRQPNPvA00000000000000000000000000000000000000000WXWRNNRRRTTWXXGGXXVJGJGxqqlpuliggggggfffggggffggggpJIIIGIGIHBTXXXWRRRRPRNPtq000000000000000000000000000000000000000XWTQNNNQTRTWXXHFSXXVHIGGGDtquHAggggggggffggggfgfgggHIIIFGJFJBUDXXXXTRRQTNNNPtq0000000000000000000000000000000000000WTTPNNNRTTTTXXSFSXXSVIJFGJJuqJJJtgggggfffggfffgffggAJIIGEGUFHGXDTXXXXTRTRQPNNPvqq0000000000000000000000000000000000WRTNNNPRRTWXWXXGUXXXSUIFGGUJttJJJJtffgffjiiiijffffetJJIIFEGUGFIMXDXXXXWTWTRQPNNNKqt0000000000000000000000000000000RTRRNNNQRRRTWWXXHUVXXXUJGEGIJJDqJUJUJuifgffgiggffgfjAJUJIIEzHJJFGDXSOXXXXXTTRRQPNNNKqt00000000000000000000000000000TTTQNNNQRRRTTWXXJSVXXXXJGEFGUJJDpUUJUUJvjdfgfffggfckHUJUUIIzyIJJGxBXXSTXXXXWTRRRQPNNNNqv000000000000000000000000000TRNPNNNQRRRTTTWXSUYVXXXSHzFGJUJUupUUUSSSsplffffgffglsOSSSUIGyzUJJJEwMXXSXXXXXTRRRRQPNNNLtq0000000000000000000000000RQLAANNQQRRRTTTXVJYXUXXXHEFGIUJUUuqSOSSSKsoopjffffjposvSSOSJEyGUJJJGEAXXXSTYXXWRRRRQQPNLrAtq00000000000000000000000RQLArrAQQRRRTTTWXJUXYJXXHFGGGUUDLMttMSSSSKsooooojioooosvOOOSGzFMLDJJJFxAXXXVSXXXTRRRRQPQAArAtq000000000000000000000RQLArrAADRRRRTTWXSJXXYJSHzGGIUJUvLOCuOSOSSLmpooooppooopnvOOOSzEGKvVUJJJFwATXYSSXXWRRRRRQMAAArAAq0000000000000000000RQNArrAAAAORRTTTWXJIXXXUGEFGUUUJUMvvKMOSSSSKmnpoloooloplpsLSOHyFMMSUUJJJJFrrSXXUSXXTRRRRTAAAAArAAq000000000000000000QRLrrAAAAADTRTTTXXHJXXSGFFHUUJJUUSKCCCCCKLvsmmsvspoopsqppqtsKFEIOMSUUJJJJJGwAMXSJXXWRRRRMAAAAAAAPqo0000000000000000TRNPAAAAAAAAOTTTWXXHIXSGFGUUUUUUSSSMCCCCCKCtmmmnNXXNTvqppttqpBEGIMSOOMMUUJUMDtplpDOXXTTRTAAAAAAArPNq000000000000000RRQNNAAAAAAAAATTTXXXIIUHHDMLLMOOOOOSSLCCCCMCvkhknnRXXXCtpqtqptGHIGOMKLMMMCuttttpltttuMWTTOAAAAAAAANNtq00000000000000WQNNNLAAAAAAAAMTWXXXDppCKKKKKKKKMOOOOOLCCCLCvkbaksnsvpqqpttqquGUIEDpjllppjgffegltutttttLXDAAAAAAALNNNt00000000000000TQNNNPAAAAAAAADTWXLpptppKKKKKKKKCCLMSOLKCCCCtpb6bnnspqtuqtqpqHMSGEBlcgjjgffffffdaputttttuDDAAAAAARNNNq0000000000000QTNNNNPDAAAAAADDMXLpltlipvKKKKKKKCKLKKOOCCCCCtophhknnsstttqtjpJOOHzxrljefdceddfddg4ltttttuutttAAADPNNNvo000000000000RRNNNNPNAAAAAADDDTTvtpqCltCCCCKKKCCKKKKMMMCCKtomnknnnnnsntlppsHDDtGzyriddcccdddddcg2ptttuuuuuttAAPPPNNKo000000000000WRNNNPQTAAAAADDDDMCCtjqjpCCCCCCCCCCCCCuDtpvuMtnbhknsppooppsnkktpBtuGwwAgddcccdddddgf6tttuuuuuuKADRPPPNLq000000000000WRNNNPQQMAAAADDDDDtuCtspplCCCCCCCCCCCqtqipuulpa6hhkpjjjopkbbbbklpppAEFAodecccccddfff7lttuuuttCDAMQQPPPNs000000000000WTNNPQRRTAAAADtsvCuuCtitptCCCCCCCCCCtpoicppllhbabbnejggjgjb55a6kqpglFGxqceccecccddddf2tutuuuuCDATRRQPPPt000000000000WWPPPQRRWDAADDtvKCvuuttqllKCCCCCCCCupjfedolqkba55kjidff8jpp52255kjdixGyrceccccccccccd8putttutLDMTRRRQPQt000000000000WWQQQQRRTOAADMCvvCCCvCppSpKCCKCCCCsliddedflk5a55allqljjlpijj54262jgjFAFFeeeccccccc8ccdhutttttODTTRRRQPPv000000000000RWQQQQRTWWDDDMKCCvvLLMpqllLCMCCCtoliddcccej5a556nidijjjigfdlh54562nBqjFBedeececccc8ccc4tttttuOMWTTRRQRP0000000000000QWTQQQRTWWODDDKvCCCvKOqtqtOCMKtolliddecccj5aa55hjfdddddfdddfl554563kdiBpdeeccccccc898cclttttCMTTTTTRRTR00000000000000XWQRRTWWXWDDMLvvCCCCOOjqpMMMqlllidddeccjbab55alfddddddededdgn555b55jlqgdeeccc9ccc888ccjttttDLKKNTTRRWW00000000000000XWRRRTWWXXMDJMCCCOCLOtpvtCuMqlljddddecjh5b656kjfddeedeeeddddjj555babjeddeeccc9cc8888c84ttttKOMTvTTTTXR00000000000000XXTRRTWWWXSHJOKCKKKOMMuvuuCDqojfdddecih5bb65blggfdddedeedddddjh656h5bjddeeecdcec8888888ttttKTOTOPTTWX0000000000000000XWRRTWWWTHJUOOLnvLKvvvvttCCqlifeddcfj6bb66bligggfddeecedfgggglb55bh5bjeecccgdc8ce87888ptttMOLOORTTXX0000000000000000XXRTTWWXHJUJSOsKvLLKCvvvuvupjgfddccjbbh66bhjggggggdcccdgggggggnb65bh5hiecccgfcccc88888luttOMvtvTWWXW0000000000000000WXWTWWXHJUJHOLKTnOOMvvvvvvuplgdddcjbbh666blgggggiifc89giigggggjj666hb3hgc9cifccc88888cjDuDOKvvvttLX000000000000000000XXTWWHJUSHHPvTOsNMMvvvvvCuqojgfdjh6hb66bkigggggiii77eiiiggggggjh666hb3kecfj8ccc888888gDMuOCvvvvvqq000000000000000000XXWTHHJSHHHKPMLNKKMCvvvvuuqooigjhbhb666hjggggggiiif4giiggggfdddlb666kh6kgilccccc88888etDDOCvvvCvvCj00000000000000000WXWHHJSSHHUKOOOKvKLCvvvvtuqoqjikbhbhb6blggggggggiii2iiiggggfddfgnb3hbbh6kjpce8cc88888epDOOCCvCCCCKj000000000000000000XHJHUSUHHNWMOOvLLMCCvvCqtqoqjnhmk66hbkjgggffgggiijeiiggggdddddcjmh55hkkhjpge8ccc88889lDSOKCCCCCCvA000000000000000000HUHHSXUHMvNLLLNvMOKCCvCptqoslhnhhm66hofgdfdffgggiiliiggggffddcdjn55kkb6hhpieccc888788gDSOMCCCCCCvHr0000000000000000xHSGUXXUMLvKLLNKsOOKKCCtqtsssnkh66bk63hjffffd7fgggiliggggd9cddcjh52hhkb56knjcc88888888etDMOCCCCCCvHFo000000000000000GJHHUXXMLLvKLvnnNOOKLCCtqtsnsnbh6355kb5hjdfdd7dgggijigggdd77d9jh4ah56k522bkoec88888888cpDSOKCCCCKCH0B00000000000000FF0HHJWNsLLKvsksPSOOLLCKqqqsnnhbh65355hb3bjgdddddggijiggfdfddcjb2bh442k4445hng8e8888888cluMOMCCCCLDH0wo0000000000000G0EHHJOsvLOvvsLOOOTOMLCCpptssn66hb55444hb26jgdfdddggjgggfdddgja4hh4444h4444hkj8888888888guDOMLCCKMDI00B000000000000EH0HGHHtKNLOKNOOLLMOSMLKtptuvsk66bh544444hh55hjddddggjiggdddjh52kh24444h4444bbpc8888888888quOMMKCKMJF00r000000000000GG0HHHMNLLNsLTMLLLLLSOLLqptuCmk656h4444444hk55hjdddfgjggfffjh5amkb44444h4444bbngc888888888ptOMMMKMOUG000F00000000000HF0HHHMLLvnnLOOOMOMLOOLMppqtvbh655bh4444444hmb5bjgdfgjggfijb5hkkk544444h4444abhlec8c888888juMMMMMMOJHr00G00000000000JH0HHMLNshknLLMOOLLLOOMKpqptsbh555ah4444444bhmh56jidgoggjj65hhhkb444444h44444b5pd888888888euDMMMMOOGIG00E00000000000JH0BMLPnbbnnvLLLLLLMTOOMqqptn6h5555ha4444445hhhk66hjiqjjh6bhabhh5444444h44444b2sfc888e8888eqDMMMMOOHHH00Gw0000000000JJwvNNh66nlmnLMLLLLOTOOMuqpth6h65555h4444455hbbbhb6hlDlb6hh555bh554444ba4444ab5nic888888888pDDMMMOMtBHw0GE00000000000HMNsb63hnnbhLMLLLOTTOSDDppth66b5555bb445555h5h5bhhbkkhbhb555bhha55444h44444b25njc88888888ejDuMMMOKqtBG0GG00000000000Dvm6333kmk36sLMLLTTTOODupptk66h65555h555556h5bb66hkkkkh6a666bkb655555h44445h55nlcc88888888euuDMMMOtlAB0IG0000000000osh6333bmn636nLOLOTTTOMDtqptmb6bb6566bh65666h66h6abhknhhbb66bhhbaa6a5bb55555h56nlcc88cc8888cqtuMMMOMqpFBHE0000000001hb36333hkh336bKMOTTTTODppqptnh66h66666bb66b6hh6bhbbbbhbbbbbbhkbbbaa66haaaa5bb6hsldcc88c8888cotuMMMMVuppxH000000000bbhnkh333hk53336sOOSTTOOuppqpqskb6bb66bb6hbbbbbkbbhbbbbbkbbbbhhhbbbbbbhbbaaa6h6bkspgcc8888888cjutDMMMSUtlBw000000003bbhkkkk63hh33333nOOTTTMMtpppqqvmkbbhbbbbbbhbbbbkbbbkbbbhhhbbbkkbbbbbbhhbbbbbbbbhmCtjdc888c8c8cdtuDMMMOUDqlFw000000hkh6hkkknm6hmh3363hLOTTOLMtpppqqDnmkbbhbbbbbbhhbbkhbbbkbbhhhhbmnbbbbbbbkbbbbbbhbhmnDDjdc8c8c8e8ccpuDDMMOSJulrzr00000on636kkmnnnkmmmb366vTSTLLOqpppqtusmmmhhhbbbbbhkhhhnbbbkkhmmkmnnhbbbbbhkhhbbbbhbhmmvDDofc9e8ccecc9juDuMMMMUUtpGxr0000Hsk33kknkmkkhbnnmb3nTTOKLOqppppuuMsmmmmkkhbbbbhhmhnkkmknnmmmmskkhhhhhmbbbbbbkhkmmsSDDticccccc8ccc8uuuCMOvSJDptFwr000BnnnbknmnhbbbhkhnknnTXLCLMpppppuDMSnmmmmmnmmkkkmkmnnmnmmsssnnmmmmmmnkhhkkkknkmmksVSDDDjdc98ccc88cepuDtMOtvDCulHFr000nkkkkkkh33333bkbkknnPTCKLLppqpquDMVSsmmmmnnmmmmmmnmnssstuKusnnnmmnnkmmmmmmnkmmmsVVVDDDpdcccecc88cehuDtCMMpDtDuGwFr003333hb33333333hbhb6mKOCCMCpppqquDOVVOsnmmmnnmmmkknlsqtuCKKvCuvsnnmmmmmmmnnmmmnsKVVVDDDtgdccccccccc4sDtuMOttttDH0wwo0h33hkkmnhb33335h6hbhsLCCMupppqquDSSVVKCssnnnnnnjpquDDvsstttnnssssnnmmmnnmmnssnnOVVVMDDDjeeeeeecccccmDttKOLttqDJw0Fr0mhbkmnnolllh333h56h6nKCKOtpppppDOSSVVNntDuuqtppuutssvsnnnsnnnnnnnnnnnsnssssnnnsVVVVODDDpdeeeeceeccc4tttuONvttHJH00wrkmh6mnpoljlllb3h6666hvCKOtppppqDSSSVVVsnsuDDDuDuttquvnnnnnspnnsnnmmmmmmnnnnnmnKVVVVSDDDtgccccccecceckuttLNKttHHH00wwmnnknnjgffdgjlhbb666bvCKMtpppptDSOSVVVKnnsCuuuttpuutssnnnnpnnpskmmmmmmnnnnnnmnSVVVVVDDDDjecccecccecd2tttCOLCtHHJr00Bnkkmneddddeccjojh666bsCMutppppuMOOOVVVSsnnsuuuuqutCuuqlkjlllpqnhbbhhhkmmmnnmnsVVVVVVMDDDoddcccccedcc8hutuMLLvsHJw00Hkkkn4eedddedecjln6666nCMttpppqDSMMMVVVVsnnnssstuututDtqppquttpnbbbbbbkhbnmmnnLVVVVVVMDDDtiddeeedeeccd4suuDNNvjDHE00Hhkn6eeecddeeecilnmh66hKCqtpppuMMMMMVVVVLsnnnnmnsutstOKtqpstpljnbbbbbkhbknbhksVVVVVVVSDDDDjdddddecfiiiijtuuLLLjsHx00H",open:[[42, 31, 44], [43, 31, 41], [44, 31, 56], [45, 31, 54], [46, 31, 59], [47, 31, 56], [48, 31, 56], [49, 31, 56], [50, 31, 46], [64, 31, 46], [65, 31, 56], [66, 31, 56], [67, 31, 59], [68, 31, 59], [69, 31, 56], [70, 31, 56], [71, 31, 44], [72, 31, 41], [73, 31, 42], [42, 32, 43], [44, 32, 38], [49, 32, 42], [50, 32, 44], [63, 32, 47], [65, 32, 47], [70, 32, 55], [72, 32, 41], [75, 32, 41], [42, 33, 42], [43, 33, 41], [47, 33, 25], [50, 33, 25], [51, 33, 2], [53, 33, 26], [62, 33, 9], [64, 33, 20], [65, 33, 24], [66, 33, 20], [68, 33, 2], [71, 33, 41], [72, 33, 43], [75, 33, 43], [43, 34, 41], [44, 34, 31], [47, 34, 25], [51, 34, 15], [62, 34, 15], [63, 34, 18], [66, 34, 25], [71, 34, 43], [74, 34, 41], [75, 34, 44], [43, 35, 35], [44, 35, 41], [51, 35, 15], [52, 35, 26], [69, 35, 26], [70, 35, 43], [71, 35, 43], [74, 35, 43], [75, 35, 43], [43, 36, 25], [44, 36, 41], [45, 36, 25], [51, 36, 25], [54, 36, 26], [69, 36, 41], [70, 36, 43], [71, 36, 41], [73, 36, 41], [74, 36, 44], [75, 36, 42], [44, 37, 25], [54, 37, 15], [70, 37, 42], [73, 37, 43], [74, 37, 43], [75, 37, 41]],closed:[[41, 34], [42, 35], [43, 35], [44, 36], [45, 36], [46, 36], [47, 36], [48, 36], [49, 36], [50, 36], [51, 35], [52, 35], [53, 34], [40, 35], [54, 35], [63, 34], [64, 35], [65, 35], [66, 36], [67, 36], [68, 36], [69, 36], [70, 36], [71, 36], [72, 36], [73, 36], [74, 36], [75, 35], [76, 35], [62, 36], [77, 36]],lash:60};
    function buildPoints(){
      var ALPH='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
      var base=[], gx, gy, v;
      for(gy=0; gy<PORTRAIT.h; gy++) for(gx=0; gx<PORTRAIT.w; gx++){
        v=ALPH.indexOf(PORTRAIT.data.charAt(gy*PORTRAIT.w+gx));
        if(v>0) base.push({x:gx*4+2+(Math.random()-.5)*2, y:gy*4+2+(Math.random()-.5)*2, c:PORTRAIT.pal[v-1]});
      }
      var open=PORTRAIT.open.map(function(p){ return {x:p[0]*4+2, y:p[1]*4+2, c:PORTRAIT.pal[p[2]]}; });
      var closed=PORTRAIT.closed.map(function(p){ return {x:p[0]*4+2, y:p[1]*4+2, c:PORTRAIT.pal[PORTRAIT.lash]}; });
      return {base:base, closed:closed, open:open};
    }
    /* === PORTRAIT DATA END === */
    var pts=buildPoints();
    var basePts=pts.base, closedPts=pts.closed, openPts=pts.open;
    /* ---------- 粒子 ---------- */
    var CHARS='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789{}<>/=+*#;:constletfn=>の美滋滋';
    function pickChar(){ return CHARS[Math.floor(Math.random()*CHARS.length)]; }
    var RAIN_CHARS='01';
    function pickRain(){ return RAIN_CHARS[Math.floor(Math.random()*RAIN_CHARS.length)]; }
    var S=1, OX=0, OY=0;
    var particles=[], eyeParts=[];
    function layout(){ var dw=Math.min(CW*.96,760,CH*.85); S=dw/PW; OX=(CW-dw)/2; OY=CH*.40-(PH*S)/2;
      particles.forEach(function(p){ var t=toScreen({x:p.px,y:p.py}); p.tx=t[0]; p.ty=t[1]; });
      eyeParts.forEach(function(p){ var a=toScreen({x:p.cpx,y:p.cpy}), b=toScreen({x:p.opx,y:p.opy});
        p.cx=a[0]; p.cy=a[1]; p.ox=b[0]; p.oy=b[1]; });
    }
    layout();
    function toScreen(p){ return [OX+p.x*S, OY+p.y*S]; }
    resize();
    var GOLDS=['#f6c97e','#ffe9b8','#f0bd76','#e8a34c'];
    function mixHex(h1,h2,f){ var a=parseInt(h1.slice(1),16), c2=parseInt(h2.slice(1),16);
      var r=Math.round((a>>16)+(((c2>>16)-(a>>16))*f)), g=Math.round(((a>>8)&255)+((((c2>>8)&255)-((a>>8)&255))*f)), bl=Math.round((a&255)+(((c2&255)-(a&255))*f));
      return 'rgb('+r+','+g+','+bl+')'; }
    particles=basePts.map(function(p){
      var t=toScreen(p), sx=Math.random()<.5?-40:CW+40, sy=Math.random()*CH;
      if(Math.random()<.4){ sx=Math.random()*CW; sy=Math.random()<.5?-40:CH+40; }
      var d=Math.hypot(t[0]-CW/2,t[1]-CH*.4)/Math.max(CW,CH);
      return {px:p.x,py:p.y,tx:t[0],ty:t[1],x:sx,y:sy,ttx:t[0],tty:t[1],c:p.c,
        cols2:[p.c,mixHex(p.c,'#ffffff',.45),mixHex(p.c,'#ffffff',.75),'#ffffff'],
        delay:.1+d*.7+Math.random()*.2, dur:.85,
        d2:d*.45+Math.random()*.3, ph:Math.random()*6.283, ch:pickChar(), duty:Math.random()<.45, vx:0, vy:0, burst:false};
    });
    function sortEye(list,cx,cy){ return list.slice().sort(function(a,b){
      return Math.atan2(a.y-cy,a.x-cx)-Math.atan2(b.y-cy,b.x-cx); }); }
    [[190,136],[281,136]].forEach(function(eye){
      var cx=eye[0], cy=eye[1];
      var C=sortEye(closedPts.filter(function(p){return Math.abs(p.x-cx)<45;}),cx,cy);
      var O=sortEye(openPts.filter(function(p){return Math.abs(p.x-cx)<45;}),cx,cy);
      var N=Math.max(C.length,O.length);
      for(var i=0;i<N;i++){
        var cp=C[Math.floor(i*C.length/N)], op=O[Math.floor(i*O.length/N)];
        if(!cp||!op) continue;
        var cs=toScreen(cp), os=toScreen(op);
        eyeParts.push({cpx:cp.x,cpy:cp.y,opx:op.x,opy:op.y,cx:cs[0],cy:cs[1],ox:os[0],oy:os[1],
          x:cs[0]+(Math.random()-.5)*30, y:cs[1]-30-Math.random()*60, ttx:os[0], tty:os[1], d2:Math.random()*.3,
          c0:cp.c, c1:op.c, ch:pickChar(), extra:(i>=C.length), vx:0, vy:0, burst:false});
      }
    });
    /* ---------- 代码雨 & 火花 ---------- */
    var rainCols=[], rainCell=32;
    function makeStreamChar(){ var r=Math.random();
      return {ch:Math.random()<.5?'0':'1', b:r<.06?1.25:(.45+Math.random()*.55)}; }
    function initRain(){ rainCols=[]; var n=Math.ceil(CW/rainCell), rows=Math.ceil(CH/rainCell)+2;
      for(var i=0;i<n;i++){ var chars=[];
        for(var r=0;r<rows;r++) chars.push(makeStreamChar());
        rainCols.push({x:i*rainCell+rainCell/2, o:Math.random()*rainCell, v:.5+Math.random()*.5, chars:chars, rows:rows});
      }
    }
    initRain();
    window.addEventListener('resize',initRain);
    var sparks=[], sparksDone=false, exitT=-1;
    /* ---------- 时间轴 ---------- */
    var T_OPEN=1.65, T_OPEN_END=2.25, T_TXT=2.95, T_SUB=4.35, T_EXIT=6.0;
    /* ---------- 把「美滋滋」渲染到离屏画布采样成粒子起点 ---------- */
    var textPts=null;
    function assignTextTargets(){
      if(!textPts) return;
      function pick(){ var p=textPts[(Math.random()*textPts.length)|0];
        return [p[0]+(Math.random()-.5)*2.6, p[1]+(Math.random()-.5)*2.6]; }
      particles.forEach(function(p){ var s=pick(); p.ttx=s[0]; p.tty=s[1]; });
      eyeParts.forEach(function(p){ var s=pick(); p.ttx=s[0]; p.tty=s[1]; });
    }
    function sampleText(){
      try{
        var fsB=300, mg=40;
        var oc=document.createElement('canvas');
        var g0=oc.getContext('2d');
        g0.font='900 '+fsB+'px "Noto Serif SC","Songti SC","STSong",serif';
        var word='美滋滋', lsB=fsB*.3, ws=[], twB=0, i, w;
        for(i=0;i<word.length;i++){ w=g0.measureText(word[i]).width; ws.push(w); twB+=w+(i?lsB:0); }
        oc.width=Math.ceil(twB+mg*2); oc.height=Math.ceil(fsB*1.35);
        var g=oc.getContext('2d');
        g.font='900 '+fsB+'px "Noto Serif SC","Songti SC","STSong",serif';
        g.textBaseline='middle'; g.fillStyle='#fff';
        var x=mg, cyB=oc.height/2;
        for(i=0;i<word.length;i++){ g.fillText(word[i], x, cyB); x+=ws[i]+lsB; }
        var img=g.getImageData(0,0,oc.width,oc.height).data, ptsB=[];
        for(var yy=2; yy<oc.height; yy+=9) for(var xx=2; xx<oc.width; xx+=9){
          if(img[(yy*oc.width+xx)*4+3]>110) ptsB.push([xx,yy]);
        }
        if(ptsB.length>200){
          var fsD=Math.min(150,Math.max(72,CW*.16)), scale=fsD/fsB;
          var twD=twB*scale, x0=CW/2-twD/2+fsD*.15, y0=CH*.42;
          textPts=ptsB.map(function(p){ return [x0+(p[0]-mg)*scale, y0+(p[1]-cyB)*scale]; });
          assignTextTargets();
        }
      }catch(e){}
    }
    sampleText();
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ sampleText(); });
    window.addEventListener('resize', function(){ sampleText(); });
    var start=performance.now(), textShown=false, morphed=false, opened=false, subShown=false, exited=false, frame=0, resampled=false;
    function easeOut(t){ return 1-Math.pow(1-t,3); }
    function easeInOut(t){ return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2; }
    function clamp01(v){ return v<0?0:v>1?1:v; }
    function startExit(){
      if(exited) return; exited=true;
      exitT=(performance.now()-start)/1000;
      intro.classList.add('leaving');
      intro.addEventListener('transitionend',function h(e){ if(e.propertyName==='opacity'){ intro.removeEventListener('transitionend',h); kill(); } });
      particles.concat(eyeParts).forEach(function(p){
        var px=p._x!==undefined?p._x:p.x, py=p._y!==undefined?p._y:p.y;
        var dx=px-CW/2, dy=py-CH*.42, d=Math.hypot(dx,dy)||1, sp=380+Math.random()*760;
        p.vx=dx/d*sp; p.vy=dy/d*sp-30; p.burst=true;
      });
      setTimeout(kill,550);
    }
    intro.addEventListener('pointerdown',startExit);
    window.addEventListener('keydown',startExit);
    setTimeout(startExit,(T_EXIT+1.2)*1000);
    function tick(now){
      if(!intro.parentNode) return;
      var t=(now-start)/1000;
      ctx.clearRect(0,0,CW,CH);
      var rainA=t<2.6?.5:.3;
      ctx.font='22px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
      rainCols.forEach(function(c){
        c.o+=c.v;
        while(c.o>=rainCell){ c.o-=rainCell; c.chars.pop(); c.chars.unshift(makeStreamChar()); }
        for(var r=0;r<c.rows;r++){
          var yy=r*rainCell+c.o-rainCell+rainCell/2, sc=c.chars[r];
          ctx.fillStyle=sc.b>1.1?'rgba(196,255,210,'+(rainA*sc.b*.8).toFixed(3)+')':'rgba(34,235,96,'+(rainA*sc.b*.62).toFixed(3)+')';
          ctx.fillText(sc.ch, c.x, yy);
        }
      });
      var openP=easeInOut(clamp01((t-T_OPEN)/(T_OPEN_END-T_OPEN)));
      if(openP>0&&!sparksDone){ sparksDone=true;
        [190,281].forEach(function(cx){ for(var i=0;i<13;i++){
          sparks.push({x:OX+cx*S+(Math.random()-.5)*30, y:OY+136*S+(Math.random()-.5)*14,
            vx:(Math.random()-.5)*110, vy:-30-Math.random()*90, life:1});
        }});
      }
      if(t>=T_OPEN&&!opened){ opened=true; intro.classList.add('eyes-open'); }
      if(t>=T_SUB&&!subShown){ subShown=true;
        try{ var sb=intro.querySelector('.mz-sub'); sb.style.transitionDelay='.1s'; sb.style.opacity='1'; sb.style.transform='translateX(-50%) translateY(0)'; }catch(e){}
      }
      if(t>=T_TXT-.35&&!resampled){ resampled=true; sampleText(); }
      if(t>=T_EXIT) startExit();
      if(exited&&exitT>=0&&t-exitT>.55) kill();
      var breathe=Math.sin(Math.max(0,t-2.3)*1.6)*2.4*clamp01((t-2.2)/.4);
      var m2g=easeInOut(clamp01((t-T_TXT)/1.25));
      frame++;
      var exitFade=exitT>=0?clamp01(1-(t-exitT)/.55):1;
      var fontSize=Math.max(7,S*7.6);
      ctx.textAlign='center'; ctx.textBaseline='middle';
      particles.forEach(function(p,i){
        var ap=easeOut(clamp01((t-p.delay)/p.dur));
        var gx=p.x+(p.tx-p.x)*ap, gy=p.y+(p.ty-p.y)*ap+breathe*ap*(1-m2g);
        var m2=easeInOut(clamp01((t-T_TXT-p.d2)/1.25));
        var x=gx+(p.ttx-gx)*m2+Math.sin(t*2.1+p.ph)*1.3*m2*(1-m2)*4,
            y=gy+(p.tty-gy)*m2+Math.cos(t*1.7+p.ph)*1.0*m2*(1-m2)*4;
        if(!p.duty){ x+=(x-CW/2)*.05*m2; y+=(y-CH*.42)*.05*m2; }
        if(p.burst&&exitT>=0){ x+=p.vx*(t-exitT); y+=p.vy*(t-exitT); }
        p._x=x; p._y=y; p._m2=m2; p._ap=ap;
        if(m2>0&&((frame+i)%9)===0) p.ch=pickChar();
      });
      ctx.font='700 '+fontSize+'px ui-monospace,Menlo,Consolas,monospace';
      particles.forEach(function(p){
        if(p._m2>=0.9) return;
        ctx.globalAlpha=(.25+.75*p._ap)*exitFade*(p.duty?1:(1-p._m2));
        ctx.fillStyle=p._m2<=0?p.c:p.cols2[Math.min(3,(p._m2*4)|0)];
        ctx.fillText(p.ch,p._x,p._y);
      });
      ctx.font='700 '+Math.max(3.5,Math.min(150,Math.max(72,CW*.16))*.045)+'px ui-monospace,Menlo,Consolas,monospace';
      particles.forEach(function(p){
        if(p._m2<0.9||!p.duty) return;
        ctx.globalAlpha=(.25+.75*p._ap)*exitFade;
        ctx.fillStyle='#ffffff';
        ctx.fillText(p.ch,p._x,p._y);
      });
      eyeParts.forEach(function(p){
        var lp=clamp01((t-.55)/.9), e=easeOut(lp);
        var ax=p.x+(p.cx-p.x)*e, ay=p.y+(p.cy-p.y)*e;
        var gx=ax+(p.ox-ax)*openP, gy=ay+(p.oy-ay)*openP+breathe*e*(1-m2g) - Math.sin(openP*Math.PI)*7*(1-m2g);
        var m2=easeInOut(clamp01((t-T_TXT-p.d2)/1.25));
        var x=gx+(p.ttx-gx)*m2, y=gy+(p.tty-gy)*m2;
        if(p.burst&&exitT>=0){ x+=p.vx*(t-exitT); y+=p.vy*(t-exitT); }
        p._x=x; p._y=y;
        ctx.globalAlpha=(p.extra?openP*e:e)*exitFade;
        ctx.fillStyle=m2<=0?(openP>.5?p.c1:p.c0):(m2<.5?mixHex(p.c1,'#ffffff',.5):'#ffffff');
        ctx.fillText(p.ch,x,y);
      });
      sparks=sparks.filter(function(sp){ return sp.life>0; });
      sparks.forEach(function(sp){
        sp.life-=.016; sp.x+=sp.vx*.016; sp.y+=sp.vy*.016; sp.vy+=60*.016;
        ctx.globalAlpha=Math.max(sp.life,0)*.9;
        ctx.fillStyle='#ffd9a0'; ctx.fillText('*',sp.x,sp.y);
      });
      ctx.globalAlpha=1;
      requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener('resize',resize);
    requestAnimationFrame(tick);
  }catch(err){ kill(); }
})();

