import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r}from"./index.CVf8TyFT.js";function Y({content:p,title:$,chapterTitle:S,chapterNumber:o,totalChapters:C,storySlug:a,hasNextChapter:M=!1,hasPrevChapter:F=!1}){const[i,d]=r.useState(18),[l,v]=r.useState(1.9),[c,g]=r.useState("serif"),[m,u]=r.useState("justify"),[f,b]=r.useState(!1),[j,z]=r.useState(0),[y,k]=r.useState(!1),[O,_]=r.useState(!1),[w,B]=r.useState(0),[x,N]=r.useState(null),T=r.useRef(null),h=r.useRef(null);r.useEffect(()=>{const t=localStorage.getItem("novel-reader-settings");if(t){const n=JSON.parse(t);d(n.fontSize||18),v(n.lineHeight||1.9),g(n.fontFamily||"serif"),u(n.textAlign||"justify")}const s=localStorage.getItem(`bookmark-${a}-${o}`);s&&N(Number(s))},[a,o]),r.useEffect(()=>{localStorage.setItem("novel-reader-settings",JSON.stringify({fontSize:i,lineHeight:l,fontFamily:c,textAlign:m}))},[i,l,c,m]),r.useEffect(()=>{const t=p.split(/\s+/).length;B(Math.ceil(t/200))},[p]),r.useEffect(()=>{const t=()=>{if(h.current){const{scrollTop:s,scrollHeight:n,clientHeight:I}=document.documentElement,H=h.current.offsetTop,q=h.current.offsetHeight,J=s-H+I,V=Math.min(100,Math.max(0,J/q*100));z(V)}};return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]);const E=t=>t.replace(/^### (.+)$/gm,'<h3 class="novel-h3">$1</h3>').replace(/^## (.+)$/gm,'<h2 class="novel-h2">$1</h2>').replace(/^# (.+)$/gm,'<h1 class="novel-h1">$1</h1>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^> (.+)$/gm,'<blockquote class="novel-quote">$1</blockquote>').replace(/^---$/gm,'<hr class="novel-divider" />').replace(/\n\n/g,'</p><p class="novel-paragraph">').replace(/\n/g,"<br />"),R=async()=>{document.fullscreenElement?(await document.exitFullscreen(),k(!1)):(await document.documentElement.requestFullscreen(),k(!0))},W=()=>{const t=window.scrollY;localStorage.setItem(`bookmark-${a}-${o}`,String(t)),N(t)},A=()=>{x!==null&&window.scrollTo({top:x,behavior:"smooth"})},L={serif:"font-serif",sans:"font-sans",mono:"font-mono"},P={serif:"'Georgia', 'Times New Roman', serif",sans:"'Inter', 'Segoe UI', sans-serif",mono:"'JetBrains Mono', 'Consolas', monospace"};return e.jsxs("div",{className:`min-h-screen ${y?"fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-primary)]":""}`,children:[e.jsx("div",{className:"fixed top-0 left-0 right-0 h-1 bg-[var(--bg-secondary)] z-50",children:e.jsx("div",{className:"h-full bg-[var(--accent-primary)] transition-all duration-150",style:{width:`${j}%`}})}),e.jsxs("div",{className:"fixed bottom-6 right-6 z-40 flex flex-col gap-2",children:[e.jsx("button",{onClick:()=>b(!f),className:"p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full shadow-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",title:"Paramètres",children:e.jsxs("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]})}),e.jsx("button",{onClick:W,className:"p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full shadow-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",title:"Marquer cette position",children:e.jsx("svg",{className:"w-5 h-5",fill:x!==null?"currentColor":"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"})})}),x!==null&&e.jsx("button",{onClick:A,className:"p-3 bg-[var(--accent-primary)] rounded-full shadow-lg text-white hover:opacity-90 transition-opacity",title:"Aller au marque-page",children:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 10l7-7m0 0l7 7m-7-7v18"})})}),e.jsx("button",{onClick:R,className:"p-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-full shadow-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",title:"Plein écran",children:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:y?e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}):e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"})})})]}),f&&e.jsxs("div",{className:"fixed bottom-24 right-6 z-50 w-80 p-5 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl shadow-2xl",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-[var(--accent-primary)] font-semibold",children:"Paramètres de lecture"}),e.jsx("button",{onClick:()=>b(!1),className:"text-[var(--text-secondary)] hover:text-[var(--accent-primary)]",children:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsxs("div",{className:"mb-5",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{className:"text-[var(--text-secondary)] text-sm",children:"Taille du texte"}),e.jsxs("span",{className:"text-[var(--accent-primary)] text-sm font-medium",children:[i,"px"]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>d(t=>Math.max(12,t-2)),className:"w-10 h-10 flex items-center justify-center bg-[var(--bg-primary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",children:"A-"}),e.jsx("input",{type:"range",min:"12",max:"28",value:i,onChange:t=>d(Number(t.target.value)),className:"flex-1 accent-[var(--accent-primary)]"}),e.jsx("button",{onClick:()=>d(t=>Math.min(28,t+2)),className:"w-10 h-10 flex items-center justify-center bg-[var(--bg-primary)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-lg",children:"A+"})]})]}),e.jsxs("div",{className:"mb-5",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{className:"text-[var(--text-secondary)] text-sm",children:"Interligne"}),e.jsx("span",{className:"text-[var(--accent-primary)] text-sm font-medium",children:l.toFixed(1)})]}),e.jsx("input",{type:"range",min:"1.4",max:"2.5",step:"0.1",value:l,onChange:t=>v(Number(t.target.value)),className:"w-full accent-[var(--accent-primary)]"})]}),e.jsxs("div",{className:"mb-5",children:[e.jsx("label",{className:"text-[var(--text-secondary)] text-sm mb-2 block",children:"Police"}),e.jsx("div",{className:"grid grid-cols-3 gap-2",children:[{id:"serif",label:"Serif",preview:"Aa"},{id:"sans",label:"Sans",preview:"Aa"},{id:"mono",label:"Mono",preview:"Aa"}].map(({id:t,label:s,preview:n})=>e.jsxs("button",{onClick:()=>g(t),className:`py-3 px-2 rounded-lg text-center transition-colors ${c===t?"bg-[var(--accent-primary)] text-white":"bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,children:[e.jsx("span",{className:`block text-lg ${L[t]}`,children:n}),e.jsx("span",{className:"text-xs",children:s})]},t))})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-[var(--text-secondary)] text-sm mb-2 block",children:"Alignement"}),e.jsx("div",{className:"grid grid-cols-3 gap-2",children:[{id:"left",icon:"⬅️"},{id:"justify",icon:"☰"},{id:"center",icon:"⬌"}].map(({id:t,icon:s})=>e.jsx("button",{onClick:()=>u(t),className:`py-2 px-3 rounded-lg transition-colors ${m===t?"bg-[var(--accent-primary)] text-white":"bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"}`,children:s},t))})]}),e.jsx("div",{className:"pt-4 border-t border-[var(--card-border)]",children:e.jsxs("div",{className:"flex items-center justify-between text-sm text-[var(--text-secondary)]",children:[e.jsxs("span",{children:["⏱️ ~",w," min de lecture"]}),e.jsxs("span",{children:["📖 ",Math.round(j),"% lu"]})]})})]}),e.jsxs("header",{className:"max-w-3xl mx-auto px-4 pt-8 pb-6 text-center",children:[e.jsxs("a",{href:`/stories/${a}`,className:"inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-4",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),"Retour à l'histoire"]}),e.jsxs("p",{className:"text-[var(--accent-primary)]/70 mb-2 text-sm uppercase tracking-wider",children:["Chapitre ",o," sur ",C]}),e.jsx("h1",{className:"text-3xl md:text-4xl mb-4",style:{fontFamily:"var(--font-title)",color:"var(--accent-primary)"},children:S}),e.jsxs("p",{className:"text-[var(--text-secondary)] text-sm",children:[$," • ~",w," min de lecture"]})]}),e.jsx("article",{ref:h,className:"max-w-3xl mx-auto px-4 md:px-8 pb-16",children:e.jsx("div",{ref:T,className:`novel-content ${L[c]}`,style:{fontSize:`${i}px`,lineHeight:l,textAlign:m,fontFamily:P[c]},dangerouslySetInnerHTML:{__html:`<p class="novel-paragraph">${E(p)}</p>`}})}),e.jsx("nav",{className:"max-w-3xl mx-auto px-4 py-8 border-t border-[var(--card-border)]",children:e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[F?e.jsxs("a",{href:`/stories/${a}/chapter/${o-1}`,className:"flex items-center gap-2 px-5 py-3 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-lg hover:border-[var(--accent-primary)]/50 transition-colors",children:[e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 19l-7-7 7-7"})}),e.jsx("span",{className:"hidden sm:inline",children:"Chapitre précédent"}),e.jsx("span",{className:"sm:hidden",children:"Préc."})]}):e.jsx("div",{}),e.jsx("a",{href:`/stories/${a}`,className:"px-5 py-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors",children:"📚 Sommaire"}),M?e.jsxs("a",{href:`/stories/${a}/chapter/${o+1}`,className:"flex items-center gap-2 px-5 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity",children:[e.jsx("span",{className:"hidden sm:inline",children:"Chapitre suivant"}),e.jsx("span",{className:"sm:hidden",children:"Suiv."}),e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]}):e.jsxs("a",{href:`/stories/${a}`,className:"flex items-center gap-2 px-5 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity",children:[e.jsx("span",{children:"Fin"}),e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})]})]})}),e.jsx("style",{children:`
        .novel-content {
          color: var(--text-primary);
        }
        
        .novel-paragraph {
          margin-bottom: 1.5em;
          text-indent: 2em;
        }
        
        .novel-paragraph:first-of-type {
          text-indent: 0;
        }
        
        .novel-paragraph:first-of-type::first-letter {
          font-size: 3em;
          float: left;
          line-height: 0.8;
          padding-right: 0.1em;
          color: var(--accent-primary);
          font-family: var(--font-title);
        }
        
        .novel-h1 {
          font-family: var(--font-title);
          font-size: 2em;
          color: var(--accent-primary);
          margin: 2em 0 1em;
          text-align: center;
        }
        
        .novel-h2 {
          font-family: var(--font-title);
          font-size: 1.5em;
          color: var(--accent-primary);
          margin: 1.5em 0 0.75em;
        }
        
        .novel-h3 {
          font-family: var(--font-title);
          font-size: 1.25em;
          color: var(--accent-secondary);
          margin: 1.25em 0 0.5em;
        }
        
        .novel-quote {
          border-left: 3px solid var(--accent-primary);
          padding: 1em 1.5em;
          margin: 1.5em 0;
          background: var(--card-bg);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: var(--text-secondary);
        }
        
        .novel-divider {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
          margin: 3em auto;
          width: 60%;
        }
        
        .novel-content strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .novel-content em {
          color: var(--text-secondary);
        }
      `})]})}export{Y as default};
