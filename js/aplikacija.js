(()=>{const a=document.querySelector("#runjsButton"),b=document.querySelector("#code_iframe").contentWindow,c=document.querySelector("#text"),d=document.querySelector(".binaries-anim"),e=document.querySelector(".outer");a.onclick=function(){setTimeout(function(){b.document.querySelector("#output-script").innerHTML=c.value+";\n      \n      ;var showAdditionals = document.querySelectorAll(\".show-btns\");\n     \n      var additionalinfo = document.querySelectorAll(\".show-additional\");\n      for (let i = 0; i < showAdditionals.length; i++) {\n        showAdditionals[i].addEventListener(\"click\", function() {          \n          this.classList.toggle(\"button-additional-informations\");\n       \n          this.nextSibling.classList.toggle(\"toggle-show-additional\");\n        });\n      };"},1e3),b.location.reload()};let f=0;document.getElementById("resize___").onclick=function(){window.screenTop||window.screenY?document.exitFullscreen():document.documentElement.requestFullscreen()},document.getElementById("backgrounds___").onclick=function(){document.getElementById("style").innerHTML=0==f%2?`
    
    [data-co="o"] {
      color: #333;
    }
   
body{
      background: #f4f4f4;
    }
    
  
::-webkit-scrollbar-track,::-webkit-scrollbar-corner { background:#e4e4e4;}

::-webkit-scrollbar-thumb { background: #c8c0c0;}
::-webkit-scrollbar-thumb:hover {background: #222;}
textarea {color: #888;}#indikator-of-line{border-top: 1px solid #c8c0c0;border-bottom: 1px solid #c8c0c0}
    `:``,f++}})(),document.getElementById("info_").onclick=function(){document.getElementById("info").style.display="block"},document.getElementById("info-close").onclick=function(){this.parentNode.style.display="none"};