const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},e={isActive:!1,changeClr:null,start(){this.isActive||(this.isActive=!0,this.changeClr=setInterval((()=>{t.startBtn.parentNode.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3))},stop(){clearInterval(this.changeClr),this.isActive=!1}};t.startBtn.addEventListener("click",(()=>{e.start()})),t.stopBtn.addEventListener("click",(()=>{e.stop()}));
//# sourceMappingURL=01-color-switcher.62319866.js.map