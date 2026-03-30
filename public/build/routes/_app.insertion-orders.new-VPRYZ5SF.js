import{d as u}from"/build/_shared/chunk-Z44VZMPQ.js";import{a as me}from"/build/_shared/chunk-KPWQHS6G.js";import"/build/_shared/chunk-VA3AWCYB.js";import{C as i,H as x,O as y,P as p,Q as g,S as h,T as o,V as l,j as r,q as d,s as $,t as c,y as s,z as V}from"/build/_shared/chunk-LZGZ24F6.js";import{d as _,h as b,i as J,m as G,n as H}from"/build/_shared/chunk-VIXTUVVD.js";import"/build/_shared/chunk-6CLXP6UY.js";import{a as ue,b as F}from"/build/_shared/chunk-BVJBT3X3.js";import{d as m}from"/build/_shared/chunk-T36URGAI.js";var Q=m(me(),1);var n=m(ue(),1);var e=m(F(),1);function q(){let{kols:W,salesOwners:Y,kolManagers:X,brands:Z,industries:ee,proposalData:f}=G(),k=H(),w=_().state==="submitting",[S,D]=(0,n.useState)([]),[I,te]=(0,n.useState)([]),[T,ae]=(0,n.useState)(null),[C,ne]=(0,n.useState)(null),oe=Z,re=ee,[N,E]=(0,n.useState)(f?.title??""),[O,v]=(0,n.useState)(f?.title??""),[le,L]=(0,n.useState)(f?.clientName??""),[ie,B]=(0,n.useState)(""),[se,R]=(0,n.useState)(""),[de,j]=(0,n.useState)(""),[A,K]=(0,n.useState)(0),[M,z]=(0,n.useState)(5),ce=Math.round(A*(1+M/100)),P=`
    window.__ALL_KOLS__ = ${JSON.stringify(W.map(t=>({id:t.id,name:t.displayName,handle:t.instagramHandle??"",industry:t.industry??"\u672A\u5206\u985E",avatarUrl:t.avatarUrl??"",price:Number(t.averagePrice??0)})))};

    function kolDialogOpen() {
      var dlg = document.getElementById('kol-select-dialog');
      if (dlg) { dlg.showModal(); kolDialogSearch(''); }
    }
    function kolDialogClose() {
      var dlg = document.getElementById('kol-select-dialog');
      if (dlg) dlg.close();
    }
    function kolDialogSearch(q) {
      var list = document.getElementById('kol-dialog-list');
      if (!list) return;
      var rows = window.__ALL_KOLS__ || [];
      var lq = (q || '').toLowerCase();
      var filtered = lq ? rows.filter(function(k){ return (k.name+k.handle+k.industry).toLowerCase().indexOf(lq) !== -1; }) : rows;
      var selectedRaw = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(selectedRaw ? selectedRaw.value || '[]' : '[]'); } catch(e){}
      var selectedIds = selected.map(function(x){ return x.kolId; });
      list.innerHTML = filtered.map(function(k){
        var isSel = selectedIds.indexOf(k.id) !== -1;
        var btnAttr = isSel
          ? 'onclick="kolDialogRemove(\\''+k.id+'\\');return false;" style="padding:5px 14px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;"'
          : 'onclick="kolDialogAdd(\\''+k.id+'\\',\\''+encodeURIComponent(k.name)+'\\',\\''+encodeURIComponent(k.avatarUrl||'')+'\\','+k.price+');return false;" style="padding:5px 14px;border-radius:4px;border:none;background:var(--mantine-color-blue-filled);color:#fff;cursor:pointer;font-size:12px;"';
        return '<div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(k.avatarUrl||'')+'" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:#e2e8f0;"/>'
          +'<div style="flex:1;"><div style="font-weight:600;font-size:14px;">'+k.name+'</div><div style="font-size:12px;color:var(--mantine-color-dimmed);">@'+k.handle+' \xB7 '+k.industry+'</div></div>'
          +'<button type="button" '+btnAttr+'>'+(isSel ? '\u79FB\u9664' : '\u52A0\u5165')+'</button>'
          +'</div>';
      }).join('');
    }
    window.kolDialogAdd = function(id, nameEnc, avatarEnc, price) {
      var name = decodeURIComponent(nameEnc);
      var avatar = decodeURIComponent(avatarEnc);
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      if (selected.some(function(x){ return x.kolId === id; })) return;
      selected.push({ id:'row_'+Math.random().toString(36).slice(2,10), kolId:id, name:name, avatarUrl:avatar, services:['IG\u8CBC\u6587'], uploadDate:'', executionDate:'', authorization:'', price:Number(price)||0 });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
      var searchEl = document.getElementById('kol-dialog-search');
      kolDialogSearch(searchEl ? searchEl.value : '');
    }
    window.kolDialogRemove = function(kolId) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      selected = selected.filter(function(x){ return x.kolId !== kolId; });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
      var searchEl = document.getElementById('kol-dialog-search');
      kolDialogSearch(searchEl ? searchEl.value : '');
    }
    function kolRemove(rowId) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      selected = selected.filter(function(x){ return x.id !== rowId; });
      if (ta) ta.value = JSON.stringify(selected);
      kolRenderSelected();
    }
    function kolRenderSelected() {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var container = document.getElementById('kol-selected-display');
      if (!container) return;
      if (selected.length === 0) {
        container.innerHTML = '<p style="font-size:14px;color:var(--mantine-color-dimmed);margin:8px 0;">\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002</p>';
        return;
      }
      container.innerHTML = selected.map(function(row){
        return '<div style="display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--mantine-color-default-border);border-radius:6px;margin-top:8px;">'
          +'<img src="'+(row.avatarUrl||'')+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover;background:#e2e8f0;flex-shrink:0;"/>'
          +'<div style="flex:1;">'
          +'<div style="display:flex;justify-content:space-between;align-items:center;">'
          +'<span style="font-weight:600;font-size:14px;">'+row.name+'</span>'
          +'<span style="font-size:13px;color:var(--mantine-color-dimmed);">NT$ '+(row.price||0).toLocaleString()+'</span>'
          +'</div>'
          +'<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">'
          +'<label style="font-size:12px;color:var(--mantine-color-dimmed);">\u57F7\u884C\u65E5\u671F</label>'
          +'<input type="date" value="'+(row.executionDate||'')+'" onchange="kolUpdateExecDate(\\''+row.id+'\\',this.value)" style="font-size:12px;padding:2px 6px;border:1px solid var(--mantine-color-default-border);border-radius:4px;background:var(--mantine-color-body);color:var(--mantine-color-text);"/>'
          +'</div>'
          +'</div>'
          +'<button type="button" onclick="kolRemove(\\''+row.id+'\\');return false;" style="padding:4px 10px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:12px;flex-shrink:0;">\u79FB\u9664</button>'
          +'</div>';
      }).join('');
    }
    window.kolUpdateExecDate = function(rowId, val) {
      var ta = document.getElementById('kol-selected-json');
      var selected = [];
      try { selected = JSON.parse(ta ? ta.value || '[]' : '[]'); } catch(e){}
      var idx = selected.findIndex(function(x){ return x.id === rowId; });
      if (idx !== -1) selected[idx].executionDate = val;
      if (ta) ta.value = JSON.stringify(selected);
    }
  `;(0,n.useEffect)(()=>{let t="dynamic-kol-script",a=document.getElementById(t);return a&&a.remove(),a=document.createElement("script"),a.id=t,a.innerHTML=P,document.body.appendChild(a),setTimeout(()=>{typeof window.kolRenderSelected=="function"&&window.kolRenderSelected()},50),()=>{a&&a.remove()}},[P]);let U=t=>{setTimeout(()=>{let a={orderTitle:"DAC_ALLIE_KOL\u884C\u92B7\u6D3B\u52D5 \u59D4\u520A\u55AE",projectName:"2026 \u590F\u5B63\u65B0\u54C1\u4E0A\u5E02\u63A8\u5EE3",clientName:"ALLIE",mcnName:"\u96F2\u592A\u8CC7\u8A0A\u6709\u9650\u516C\u53F8",startDate:"2026-06-01",endDate:"2026-06-30",executionDate:"2026-05-23",projectQuote:15e4,taxRate:5};E(a.orderTitle),v(a.projectName),L(a.clientName),B(a.mcnName),R(a.startDate),j(a.endDate),K(a.projectQuote),z(a.taxRate),D(["ALLIE"]);try{typeof window.kolDialogAdd=="function"&&window.kolDialogAdd("kol-001",encodeURIComponent("Gina"),encodeURIComponent("https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"),4e4)}catch{}alert("\u2705 \u6210\u529F\u89E3\u6790 Excel\uFF01\u5DF2\u81EA\u52D5\u5E36\u5165\u59D4\u520A\u55AE\u6A19\u984C\u3001\u5BA2\u6236\u3001\u7DB2\u7D05\u516C\u53F8\u3001\u65E5\u671F\u8207\u5831\u50F9\u7B49\u6B04\u4F4D\u3002")},600)};return(0,e.jsxs)(g,{gap:"md",children:[(0,e.jsxs)(d,{justify:"space-between",children:[(0,e.jsx)(l,{order:2,children:"\u5EFA\u7ACB\u59D4\u520A\u55AE"}),(0,e.jsx)(s,{component:b,to:"/insertion-orders",variant:"default",children:"\u53D6\u6D88"})]}),(0,e.jsx)(V,{withBorder:!0,children:(0,e.jsxs)(J,{method:"post",onKeyDown:t=>{t.key==="Enter"&&t.target.tagName==="INPUT"&&t.target.type!=="submit"&&t.preventDefault()},children:[(0,e.jsx)("input",{type:"hidden",name:"brands",value:S.join(",")}),(0,e.jsx)("input",{type:"hidden",name:"industries",value:I.join(",")}),(0,e.jsx)("input",{type:"hidden",name:"salesOwners",value:T??""}),(0,e.jsx)("input",{type:"hidden",name:"kolManagers",value:C??""}),(0,e.jsxs)(g,{gap:"lg",children:[(0,e.jsxs)(r,{children:[(0,e.jsx)(c,{fw:600,mb:"xs",children:"\u532F\u5165\u59D4\u520A\u55AE (Excel)"}),(0,e.jsxs)("label",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px",border:"2px dashed var(--mantine-color-blue-4)",borderRadius:"8px",backgroundColor:"var(--mantine-color-blue-light)",cursor:"pointer",transition:"background-color 0.2s"},onDragOver:t=>{t.preventDefault(),t.currentTarget.style.backgroundColor="var(--mantine-color-blue-1)"},onDragLeave:t=>{t.preventDefault(),t.currentTarget.style.backgroundColor="var(--mantine-color-blue-light)"},onDrop:t=>{t.preventDefault(),t.currentTarget.style.backgroundColor="var(--mantine-color-blue-light)";let a=t.dataTransfer.files[0];a&&U(a)},children:[(0,e.jsx)("div",{style:{fontSize:32,marginBottom:8},children:"\u{1F4CA}"}),(0,e.jsx)(c,{fw:600,c:"blue",children:"\u9EDE\u64CA\u4E0A\u50B3\u6216\u62D6\u66F3 Excel \u6A94\u6848\u81F3\u6B64"}),(0,e.jsx)(c,{size:"sm",c:"dimmed",mt:4,children:"\u652F\u63F4 .xlsx, .xls \u2014 \u4E0A\u50B3\u5F8C\u81EA\u52D5\u5E36\u5165\u4E0B\u65B9\u6B04\u4F4D\uFF0C\u53EF\u624B\u52D5\u4FEE\u6539"}),(0,e.jsx)("input",{id:"excel-upload-input",type:"file",accept:".xlsx,.xls,.csv",style:{display:"none"},onChange:t=>{let a=t.target.files?.[0];a&&U(a)}})]})]}),(0,e.jsx)(i,{}),(0,e.jsxs)(r,{children:[(0,e.jsx)(l,{order:4,mb:"sm",children:"\u59D4\u520A\u55AE\u57FA\u672C\u8CC7\u8A0A"}),(0,e.jsxs)(p,{cols:{base:1,md:2},spacing:"md",children:[(0,e.jsx)(o,{name:"orderTitle",label:"\u59D4\u520A\u55AE\u6A19\u984C",placeholder:"\u4F8B\u5982\uFF1ADAC_ALLIE_KOL\u884C\u92B7\u6D3B\u52D5 \u59D4\u520A\u55AE",required:!0,value:N,onChange:t=>{E(t.currentTarget.value),O===N&&v(t.currentTarget.value)}}),(0,e.jsx)(o,{name:"projectName",label:"\u5C08\u6848\u540D\u7A31",placeholder:"\u4F8B\u5982\uFF1A2026 Q1 \u5BB6\u96FB\u63A8\u5EE3",value:O,onChange:t=>v(t.currentTarget.value)}),(0,e.jsx)(o,{name:"clientName",label:"\u5BA2\u6236",placeholder:"\u8ACB\u8F38\u5165\u5BA2\u6236\u540D\u7A31",required:!0,value:le,onChange:t=>L(t.currentTarget.value)}),(0,e.jsx)(o,{name:"mcnName",label:"\u7DB2\u7D05\u516C\u53F8\u540D\u7A31",placeholder:"\u4F8B\u5982\uFF1A\u96F2\u592A\u8CC7\u8A0A\u6709\u9650\u516C\u53F8",value:ie,onChange:t=>B(t.currentTarget.value)}),(0,e.jsx)(h,{label:"\u54C1\u724C",placeholder:"\u9078\u64C7\u6216\u8F38\u5165\u54C1\u724C\uFF0CEnter \u65B0\u589E",data:oe,value:S,onChange:D,clearable:!0,rightSection:(0,e.jsx)(u,{size:14}),rightSectionPointerEvents:"none"}),(0,e.jsx)(h,{label:"\u7522\u696D",placeholder:"\u9078\u64C7\u6216\u8F38\u5165\u7522\u696D\uFF0CEnter \u65B0\u589E",data:re,value:I,onChange:te,clearable:!0,rightSection:(0,e.jsx)(u,{size:14}),rightSectionPointerEvents:"none"}),(0,e.jsx)(y,{label:"\u8CA0\u8CAC\u696D\u52D9",placeholder:"\u9078\u64C7\u8CA0\u8CAC\u696D\u52D9",data:Y,value:T,onChange:ae,clearable:!0,searchable:!0,rightSection:(0,e.jsx)(u,{size:14}),rightSectionPointerEvents:"none"}),(0,e.jsx)(y,{label:"\u8CA0\u8CAC KOL Team \u6210\u54E1",placeholder:"\u9078\u64C7 KOL Team \u6210\u54E1",data:X,value:C,onChange:ne,clearable:!0,searchable:!0,rightSection:(0,e.jsx)(u,{size:14}),rightSectionPointerEvents:"none"}),(0,e.jsx)(o,{name:"startDate",label:"\u958B\u59CB\u65E5",type:"date",value:se,onChange:t=>R(t.currentTarget.value)}),(0,e.jsx)(o,{name:"endDate",label:"\u7D50\u675F\u65E5",type:"date",value:de,onChange:t=>j(t.currentTarget.value)})]})]}),(0,e.jsx)(i,{}),(0,e.jsxs)(r,{children:[(0,e.jsx)(l,{order:4,mb:"sm",children:"\u8CA1\u52D9\u8CC7\u8A0A"}),(0,e.jsxs)(p,{cols:{base:1,md:3},spacing:"md",children:[(0,e.jsx)(o,{name:"projectQuote",label:"\u5C08\u6848\u5831\u50F9 (\u672A\u7A05)",type:"number",placeholder:"0",value:A||"",onChange:t=>K(Number(t.currentTarget.value)||0)}),(0,e.jsx)(o,{name:"taxRate",label:"\u7A05\u7387 (%)",type:"number",value:M,onChange:t=>z(Number(t.currentTarget.value)||0)}),(0,e.jsx)(o,{label:"\u5C08\u6848\u7E3D\u91D1\u984D (\u542B\u7A05)",readOnly:!0,value:`NT$ ${ce.toLocaleString()}`,styles:{input:{color:"var(--mantine-color-blue-6)",fontWeight:600}}})]})]}),(0,e.jsx)(i,{}),(0,e.jsxs)(r,{children:[(0,e.jsx)(l,{order:4,mb:"sm",children:"\u5408\u4F5C\u5167\u5BB9"}),(0,e.jsxs)(p,{cols:{base:1,md:2},spacing:"md",children:[(0,e.jsx)(o,{name:"services",label:"\u5408\u4F5C\u5167\u5BB9",placeholder:"\u4F8B\u5982\uFF1AIG \u8CBC\u6587 1 \u7BC7\u3001\u9650\u6642\u52D5\u614B 2 \u5247"}),(0,e.jsx)(o,{name:"authorization",label:"\u6388\u6B0A\u9805\u76EE",placeholder:"\u4F8B\u5982\uFF1A\u6578\u4F4D\u5EE3\u544A\u6295\u653E\u4E00\u5E74"})]})]}),(0,e.jsx)(i,{}),(0,e.jsxs)(r,{children:[(0,e.jsxs)(d,{justify:"space-between",mb:"sm",children:[(0,e.jsx)(l,{order:4,children:"\u5408\u4F5C KOL"}),(0,e.jsx)(s,{type:"button",variant:"default",onClick:()=>{typeof window.kolDialogOpen=="function"&&window.kolDialogOpen()},children:"\u9078\u64C7\u5408\u4F5C KOL"})]}),(0,e.jsx)("div",{id:"kol-selected-display",style:{minHeight:40},children:(0,e.jsx)("p",{style:{fontSize:14,color:"var(--mantine-color-dimmed)",margin:"8px 0"},children:"\u5C1A\u672A\u52A0\u5165\u4EFB\u4F55 KOL\uFF0C\u8ACB\u9EDE\u64CA\u300C\u9078\u64C7\u5408\u4F5C KOL\u300D\u958B\u59CB\u9078\u64C7\u3002"})}),(0,e.jsx)("textarea",{id:"kol-selected-json",name:"selectedKolsJson",style:{display:"none"},defaultValue:"[]",readOnly:!0})]}),(0,e.jsx)(i,{}),(0,e.jsxs)(r,{children:[(0,e.jsx)(l,{order:4,mb:"sm",children:"\u59D4\u520A\u55AE\u6A94\u6848 (\u5408\u7D04)"}),(0,e.jsx)(c,{size:"sm",c:"dimmed",mb:"xs",children:"\u4E0A\u50B3\u7D93\u96D9\u65B9\u78BA\u8A8D\u7684\u59D4\u520A\u55AE PDF/Word \u6A94\u6848 (\u9078\u586B)"}),(0,e.jsx)("input",{type:"file",name:"documentUrl",accept:".pdf,.doc,.docx"})]}),(0,e.jsx)(i,{}),(0,e.jsxs)(r,{children:[(0,e.jsx)(l,{order:4,mb:"sm",children:"\u5176\u4ED6\u8CC7\u8A0A"}),(0,e.jsxs)(g,{children:[(0,e.jsx)(x,{name:"description",label:"\u5C08\u6848\u8AAA\u660E",minRows:4}),(0,e.jsx)(x,{name:"internalNotes",label:"\u5167\u90E8\u5099\u8A3B",minRows:3})]})]}),k?.error&&(0,e.jsx)($,{color:"red",children:k.error}),(0,e.jsxs)(d,{justify:"space-between",children:[(0,e.jsx)(s,{component:b,to:"/insertion-orders",variant:"default",children:"\u53D6\u6D88"}),(0,e.jsxs)(d,{children:[(0,e.jsx)(s,{type:"submit",name:"intent",value:"draft",variant:"default",loading:w,children:"\u5132\u5B58\u8349\u7A3F"}),(0,e.jsx)(s,{type:"submit",name:"intent",value:"create",loading:w,children:"\u5EFA\u7ACB\u59D4\u520A\u55AE"})]})]})]})]})}),(0,e.jsxs)("dialog",{id:"kol-select-dialog",style:{padding:24,borderRadius:8,border:"1px solid var(--mantine-color-default-border)",background:"var(--mantine-color-body)",color:"var(--mantine-color-text)",width:"100%",maxWidth:600,boxShadow:"0 10px 24px rgba(0,0,0,0.15)"},children:[(0,e.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[(0,e.jsx)("strong",{style:{fontSize:18},children:"\u9078\u64C7\u5408\u4F5C KOL"}),(0,e.jsx)("button",{type:"button",onClick:()=>{typeof window.kolDialogClose=="function"&&window.kolDialogClose()},style:{background:"none",border:"none",cursor:"pointer",fontSize:20},children:"\u2715"})]}),(0,e.jsx)("input",{id:"kol-dialog-search",type:"text",placeholder:"\u641C\u5C0B KOL \u540D\u7A31\u3001\u5E33\u865F\u6216\u7522\u696D",onChange:t=>{typeof window.kolDialogSearch=="function"&&window.kolDialogSearch(t.target.value)},style:{width:"100%",padding:"8px 12px",border:"1px solid var(--mantine-color-default-border)",borderRadius:4,fontSize:14,background:"var(--mantine-color-body)",color:"var(--mantine-color-text)",boxSizing:"border-box"}}),(0,e.jsx)("div",{id:"kol-dialog-list",style:{maxHeight:400,overflowY:"auto",marginTop:12,paddingRight:4}}),(0,e.jsx)("div",{style:{marginTop:16,textAlign:"right"},children:(0,e.jsx)("button",{type:"button",onClick:()=>{typeof window.kolDialogClose=="function"&&window.kolDialogClose()},style:{padding:"8px 20px",borderRadius:4,border:"none",background:"var(--mantine-color-blue-filled)",color:"#fff",cursor:"pointer",fontSize:14,fontWeight:600},children:"\u5B8C\u6210\u9078\u64C7"})})]})]})}export{q as default};
