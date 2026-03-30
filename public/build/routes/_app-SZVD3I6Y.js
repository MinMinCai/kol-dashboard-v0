import{a as N}from"/build/_shared/chunk-DRJK5Z5U.js";import{c as R,w as S}from"/build/_shared/chunk-Z44VZMPQ.js";import{K as L,Q as k,U as C,V as u,j as p,n as B,p as v,q as o,r as E,t as l,u as d,y as g,z as G}from"/build/_shared/chunk-LZGZ24F6.js";import{b,c as I,f as z}from"/build/_shared/chunk-VIXTUVVD.js";import"/build/_shared/chunk-6CLXP6UY.js";import{a as K,b as h}from"/build/_shared/chunk-BVJBT3X3.js";import{d as s}from"/build/_shared/chunk-T36URGAI.js";var x=s(K(),1);var t=s(h(),1);function O(){let{toast:n,hideToast:a,banner:i,hideBanner:r}=N(),c=I(),m=b(),[f,T]=(0,x.useState)(100);return(0,x.useEffect)(()=>{if(n?.isOpen){T(100);let y=Date.now(),_=1e4,A=setInterval(()=>{let H=Date.now()-y,w=Math.max(0,100-H/_*100);T(w),w===0&&(a(),clearInterval(A))},50);return()=>clearInterval(A)}},[n?.isOpen,a]),(0,t.jsxs)(t.Fragment,{children:[i?.isOpen&&m.pathname!=="/reports/generate"&&(0,t.jsx)(p,{bg:"green.6",c:"white",p:"sm",style:{position:"sticky",top:0,zIndex:1e3,width:"100%"},children:(0,t.jsxs)(o,{justify:"center",align:"center",style:{position:"relative"},children:[(0,t.jsxs)(o,{gap:"xs",children:[(0,t.jsx)(C,{color:"white",variant:"transparent",size:"sm",children:(0,t.jsx)(R,{size:18})}),(0,t.jsx)(l,{fw:600,size:"sm",children:i.message})]}),(0,t.jsx)(g,{component:"a",href:i.actionLink||"/reports/generate",variant:"transparent",color:"white",size:"sm",pl:"xs",style:{textDecoration:"underline"},children:"\u67E5\u770B\u4E26\u4E0B\u8F09 \u2192"}),(0,t.jsx)(v,{onClick:r,variant:"transparent",color:"white",style:{position:"absolute",right:16},children:(0,t.jsx)(S,{size:16})})]})}),(0,t.jsx)(E,{position:{top:20,right:20},zIndex:2e3,children:(0,t.jsx)(B,{transition:"slide-left",duration:300,mounted:!!n?.isOpen,children:y=>(0,t.jsxs)(G,{withBorder:!0,shadow:"xl",radius:"md",p:0,style:{...y,width:400,overflow:"hidden"},children:[(0,t.jsx)(p,{p:"md",children:(0,t.jsxs)(o,{wrap:"nowrap",align:"flex-start",justify:"space-between",children:[(0,t.jsxs)(o,{wrap:"nowrap",align:"flex-start",gap:"sm",children:[(0,t.jsx)(p,{style:{fontSize:32,lineHeight:1},children:"\u{1F389}"}),(0,t.jsxs)(p,{children:[(0,t.jsx)(u,{order:5,mb:4,children:n?.title}),(0,t.jsxs)(l,{size:"sm",c:"dimmed",mb:2,children:["\u6848\u4EF6: ",n?.message.split("|")[0]]}),(0,t.jsxs)(l,{size:"sm",c:"dimmed",children:["\u6A94\u6848: ",n?.message.split("|")[1]||"\u7D50\u6848\u5831\u544A_v1.pptx"]}),(0,t.jsxs)(o,{mt:"md",gap:"sm",children:[(0,t.jsx)(g,{size:"xs",color:"blue",onClick:()=>{alert("\u5831\u544A\u4E0B\u8F09\u4E2D..."),a()},children:"\u7ACB\u5373\u4E0B\u8F09"}),(0,t.jsx)(g,{size:"xs",variant:"light",color:"gray",onClick:()=>{n?.actionLink&&c(n.actionLink),a()},children:"\u7A0D\u5F8C\u67E5\u770B"})]})]})]}),(0,t.jsx)(v,{variant:"subtle",color:"gray",onClick:a,children:(0,t.jsx)(S,{size:16})})]})}),(0,t.jsx)(L,{value:f,size:"xs",color:"blue",radius:0})]})})})]})}var e=s(h(),1),M=[{to:"/dashboard",label:"Dashboard",icon:"\u{1F4CA}"},{to:"/proposals",label:"\u63D0\u6848\u7BA1\u7406",icon:"\u{1F4CB}"},{to:"/kols",label:"KOL \u7BA1\u7406",icon:"\u{1F465}"},{to:"/insertion-orders",label:"\u59D4\u520A\u55AE\u7BA1\u7406",icon:"\u{1F4DD}"},{to:"/favorites",label:"\u6211\u7684\u6536\u85CF",icon:"\u2764\uFE0F"},{to:"/reports/generate",label:"\u7D50\u6848\u5831\u544A\u7522\u751F",icon:"\u{1F4C8}"}];function W(n){return{display:"block",width:"100%",textAlign:"left",padding:"9px 12px",borderRadius:10,background:"transparent",color:n?"var(--mantine-color-blue-filled)":"var(--mantine-color-text)",fontWeight:n?600:500,border:"1px solid transparent",textDecoration:"none",boxSizing:"border-box",fontSize:14,transition:"color 150ms"}}function D(){let n=b();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(O,{}),(0,e.jsxs)(d,{header:{height:64},navbar:{width:260,breakpoint:"sm"},padding:"md",children:[(0,e.jsxs)(d.Header,{children:[(0,e.jsx)("style",{dangerouslySetInnerHTML:{__html:`
          body.sidebar-collapsed {
            --app-shell-navbar-offset: 0px !important;
            --app-shell-navbar-width: 0px !important;
          }
          /* Mantine AppShell attribute/class names can vary by version/build.
             Target the common ones to ensure true collapse (no overlay text/icons). */
          body.sidebar-collapsed [data-app-shell-navbar],
          body.sidebar-collapsed [data-mantine-appshell-navbar],
          body.sidebar-collapsed .mantine-AppShell-navbar {
            display: none !important;
          }
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar {
            white-space: nowrap;
            overflow: hidden;
          }
          body.sidebar-collapsed [data-app-shell-main],
          body.sidebar-collapsed [data-mantine-appshell-main],
          body.sidebar-collapsed .mantine-AppShell-main {
            margin-left: 0 !important;
          }
          body.sidebar-collapsed [data-app-shell-main] *,
          body.sidebar-collapsed [data-mantine-appshell-main] *,
          body.sidebar-collapsed .mantine-AppShell-main * {
            pointer-events: auto;
          }
          /* Ensure smooth transition */
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar,
          [data-app-shell-main],
          [data-mantine-appshell-main],
          .mantine-AppShell-main {
            transition: transform 200ms ease, padding 200ms ease, margin 200ms ease, width 200ms ease, opacity 200ms ease !important;
          }
          body.sidebar-collapsed .nav-label {
            display: none !important;
          }
        `}}),(0,e.jsxs)(o,{justify:"space-between",align:"center",h:"100%",px:"md",children:[(0,e.jsxs)(o,{gap:"sm",children:[(0,e.jsx)("button",{id:"kol-sidebar-toggle-btn",type:"button",onClick:()=>document.body.classList.toggle("sidebar-collapsed"),style:{background:"transparent",border:"1px solid var(--mantine-color-default-border)",borderRadius:6,padding:"4px 8px",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--mantine-color-text)"},children:"\u2630"}),(0,e.jsxs)(k,{gap:0,children:[(0,e.jsx)(u,{order:4,children:"KOL DB"}),(0,e.jsx)(l,{size:"xs",c:"dimmed",children:"\u7D71\u4E00\u7BA1\u7406 KOL / \u63D0\u6848 / \u59D4\u520A\u55AE"})]})]}),(0,e.jsxs)("button",{id:"kol-theme-toggle-btn",type:"button",suppressHydrationWarning:!0,onClick:()=>{let a="mantine-color-scheme-value",r=(()=>{try{return localStorage.getItem(a)||"light"}catch{return"light"}})()==="dark"?"light":"dark";document.documentElement.setAttribute("data-mantine-color-scheme",r);try{localStorage.setItem(a,r)}catch{}let c=document.getElementById("kol-theme-icon"),m=document.getElementById("kol-theme-label");c&&(c.textContent=r==="dark"?"\u2600\uFE0F":"\u{1F319}"),m&&(m.textContent=r==="dark"?"Light":"Dark")},style:{background:"transparent",border:"1px solid var(--mantine-color-default-border)",borderRadius:8,padding:"6px 12px",cursor:"pointer",color:"var(--mantine-color-dimmed)",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:6,lineHeight:1},children:[(0,e.jsx)("span",{id:"kol-theme-icon",children:"\u{1F319}"}),(0,e.jsx)("span",{id:"kol-theme-label",children:"Dark"})]}),(0,e.jsx)("script",{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`
(function() {
  var STORAGE_KEY = 'mantine-color-scheme-value';
  var btn = document.getElementById('kol-theme-toggle-btn');
  var icon = document.getElementById('kol-theme-icon');
  var label = document.getElementById('kol-theme-label');

  function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-mantine-color-scheme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
    if (icon) icon.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  // Apply saved theme on load
  applyTheme(getTheme());
})();
              `}})]})]}),(0,e.jsxs)(d.Navbar,{p:"sm",style:{zIndex:90,pointerEvents:"auto"},children:[(0,e.jsx)(k,{gap:"xs",style:{flex:1},children:M.map(a=>{let i=n.pathname===a.to||n.pathname.startsWith(`${a.to}/`);return(0,e.jsxs)("a",{href:a.to,style:W(i),children:[(0,e.jsx)("span",{className:"nav-icon",style:{marginRight:8},children:a.icon}),(0,e.jsx)("span",{className:"nav-label",children:a.label})]},a.to)})}),(0,e.jsxs)("div",{style:{marginTop:"auto",paddingTop:12},children:[(0,e.jsxs)("a",{href:"/settings",style:{display:"block",width:"100%",textAlign:"left",padding:"9px 12px",borderRadius:10,color:"var(--mantine-color-text)",textDecoration:"none",boxSizing:"border-box",fontSize:14,border:"1px solid transparent",marginBottom:4},children:[(0,e.jsx)("span",{className:"nav-icon",style:{marginRight:8},children:"\u2699\uFE0F"}),(0,e.jsx)("span",{className:"nav-label",children:"\u7CFB\u7D71\u8A2D\u5B9A"})]}),(0,e.jsxs)("a",{href:"/login",style:{display:"block",width:"100%",textAlign:"left",padding:"9px 12px",borderRadius:10,color:"var(--mantine-color-dimmed)",textDecoration:"none",boxSizing:"border-box",fontSize:14,border:"1px solid transparent"},children:[(0,e.jsx)("span",{className:"nav-icon",style:{marginRight:8},children:"\u{1F6AA}"}),(0,e.jsx)("span",{className:"nav-label",children:"\u767B\u51FA\uFF08\u56DE\u767B\u5165\u9801\uFF09"})]})]})]}),(0,e.jsx)(d.Main,{children:(0,e.jsx)(z,{})})]})]})}export{D as default};
