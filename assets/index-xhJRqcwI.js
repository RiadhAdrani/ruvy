var _r=Object.defineProperty;var Rr=(n,e,t)=>e in n?_r(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var jn=(n,e,t)=>(Rr(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const Br=/[\p{Lu}]/u,Ir=/[\p{Ll}]/u,Wn=/^[\p{Lu}](?![\p{Lu}])/gu,So=/([\p{Alpha}\p{N}_]|$)/u,gn=/[_.\- ]+/,Pr=new RegExp("^"+gn.source),Gn=new RegExp(gn.source+So.source,"gu"),qn=new RegExp("\\d+"+So.source,"gu"),Mr=(n,e,t,o)=>{let r=!1,a=!1,i=!1,s=!1;for(let l=0;l<n.length;l++){const u=n[l];s=l>2?n[l-3]==="-":!0,r&&Br.test(u)?(n=n.slice(0,l)+"-"+n.slice(l),r=!1,i=a,a=!0,l++):a&&i&&Ir.test(u)&&(!s||o)?(n=n.slice(0,l-1)+"-"+n.slice(l-1),i=a,a=!1,r=!0):(r=e(u)===u&&t(u)!==u,i=a,a=t(u)===u&&e(u)!==u)}return n},Lr=(n,e)=>(Wn.lastIndex=0,n.replace(Wn,t=>e(t))),Nr=(n,e)=>(Gn.lastIndex=0,qn.lastIndex=0,n.replace(Gn,(t,o)=>e(o)).replace(qn,t=>e(t)));function Or(n,e){if(!(typeof n=="string"||Array.isArray(n)))throw new TypeError("Expected the input to be `string | string[]`");if(e={pascalCase:!1,preserveConsecutiveUppercase:!1,...e},Array.isArray(n)?n=n.map(a=>a.trim()).filter(a=>a.length).join("-"):n=n.trim(),n.length===0)return"";const t=e.locale===!1?a=>a.toLowerCase():a=>a.toLocaleLowerCase(e.locale),o=e.locale===!1?a=>a.toUpperCase():a=>a.toLocaleUpperCase(e.locale);return n.length===1?gn.test(n)?"":e.pascalCase?o(n):t(n):(n!==t(n)&&(n=Mr(n,t,o,e.preserveConsecutiveUppercase)),n=n.replace(Pr,""),n=e.preserveConsecutiveUppercase?Lr(n,t):t(n),e.pascalCase&&(n=o(n.charAt(0))+n.slice(1)),Nr(n,o))}const Ur=n=>Array.isArray(n),$r=n=>n===null,zr=n=>["string","number","bigint","boolean","undefined","symbol","null"].includes(typeof n),Hr=(n,e)=>zr(n)||$r(n)?!1:Object.prototype.hasOwnProperty.call(n,e);var at;(function(n){n.SVG="http://www.w3.org/2000/svg",n.HTML="http://www.w3.org/1999/xhtml",n.MATH="http://www.w3.org/1998/Math/MathML"})(at||(at={}));const Jr=["stop","prevent","self","capture","once","passive"];let Te={};const jr=["ns"],Dt="class:",Wr=(n={})=>{Te=n},Gr=(n,e={},t=[])=>{const o=e.ns??at.HTML,r=document.createElementNS(o,n);r.__events__={};const a=[];for(const i of Object.keys(e)){if(jr.includes(i))continue;const s=e[i];if(Bo(i)){a.push({key:i,value:s});continue}const l=Io(i);if(l){const{event:u,modifiers:p}=l;Po(i,u,s,r,p);continue}an(i,s,r)}if(a.length>0){const i=Ro(a);an("class",i,r)}return t.forEach(i=>{const s=i instanceof Node?i:_o(i);r.appendChild(s)}),r},_o=(n="")=>document.createTextNode(`${n}`),Ro=n=>[...n.filter(t=>t.key==="class"),...n.filter(t=>t.key==="className"),...n.filter(t=>t.key.startsWith(Dt))].reduce((t,o)=>(o.key.startsWith(Dt)&&o.value?t.push(o.key.substring(Dt.length)):Ur(o.value)?t.push(o.value.filter(r=>!!r).join(" ")):typeof o.value=="string"&&t.push(o.value),t),[]).join(" "),Bo=n=>{var e,t,o,r;return!!(n==="class"||n==="className"&&!((t=(e=Te.attributes)==null?void 0:e.class)!=null&&t.className)||n.startsWith(Dt)&&((r=(o=Te.attributes)==null?void 0:o.class)==null?void 0:r.directive)!==!1)},qr=/@[a-zA-Z][a-zA-Z0-9\-:]*/,Zr=/on[a-zA-Z][a-zA-Z0-9\-:]*/,Yr=/on:[a-zA-Z][a-zA-Z0-9\-:]*/,Io=n=>{var a,i,s,l,u,p;let e;if(qr.test(n)&&((i=(a=Te.events)==null?void 0:a.syntax)==null?void 0:i.vue)!==!1)e=n.substring(1);else if(Zr.test(n)&&((l=(s=Te.events)==null?void 0:s.syntax)==null?void 0:l.react)!==!1)e=n.substring(2);else if(Yr.test(n)&&((p=(u=Te.events)==null?void 0:u.syntax)==null?void 0:p.svelte)!==!1)e=n.substring(3);else return!1;const t=e.indexOf(":");if(t===-1)return{event:e.toLowerCase(),modifiers:[]};const o=e.substring(0,t).toLowerCase(),r=e.substring(t+1).split("-").reduce((m,f)=>(Jr.includes(f)&&m.push(f),m),[]);return{event:o,modifiers:r}},Po=(n,e,t,o,r=[])=>{var u;let a;typeof t=="function"?a=t:a=()=>0;const i=r.length===0?a:p=>{if(!(r.includes("self")&&p.target!==o)){for(const m of r)m==="stop"?p.stopPropagation():m==="prevent"&&p.preventDefault();a(p)}},s=(u=Te.events)!=null&&u.wrapper?p=>{var m,f;return(f=(m=Te.events)==null?void 0:m.wrapper)==null?void 0:f.call(m,p,i)}:i,l={};r.includes("once")&&(l.once=!0),r.includes("capture")&&(l.capture=!0),r.includes("passive")&&(l.passive=!0),Mo(n,e,o),o.__events__[n]=s,o.addEventListener(e,s,l)},Mo=(n,e,t)=>{const o=t==null?void 0:t.__events__,r=o==null?void 0:o[n];r&&(t.removeEventListener(e,r),delete o[n])},an=(n,e,t)=>{let o=`${e}`,r=!0;if(No.includes(n))o=!!e,t.toggleAttribute(n,o);else{if(n==="style"&&t.style){const s=t;typeof e=="string"?o=e:e&&typeof e=="object"&&(r=!1,Object.keys(e).forEach(l=>{try{s.style[l]=`${e[l]}`}catch(u){console.error(u)}}))}r&&t.setAttribute(n,o)}const a=Lo(n),i=a in t;r&&i&&(t[a]=o)},Xr=(n,e)=>{No.includes(n)&&e.toggleAttribute(n,!1),e.removeAttribute(n);const t=Lo(n);Hr(e,t)&&(e[t]=null)},Lo=n=>{let e;for(const t of Object.keys(Zn)){const o=Zn[t];(t===n||o===n)&&(e={key:t,value:o})}return e?e.value:Or(n.replaceAll(":"," "))},Mt=(n,e,t=-1)=>{const o=e.childNodes.item(t);e.insertBefore(n,o)},Vr=(n,e)=>{if(!n.parentNode)return;const t=n.parentNode.childNodes.item(e),o=n.parentNode.childNodes.item(e-1);t===n||o===n||Mt(n,n.parentNode,e)},Qr=n=>{n.remove()},Zn={class:"className",accesskey:"accessKey",autocapitalize:"autoCapitalize",contenteditable:"contentEditable",contextmenu:"contextMenu",playsinline:"playsInline",spellcheck:"spellCheck",tabindex:"tabIndex",noshade:"noShade",hreflang:"hrefLang",referrerpolicy:"referrerPolicy",datetime:"dateTime",autoplay:"autoPlay",crossorigin:"crossOrigin",ismap:"isMap",usemap:"useMap",srclang:"srcLang",allowfullscreen:"allowFullScreen",allowpaymentrequest:"allowPaymentRequest",srcdoc:"srcDoc",colspan:"colSpan",rowspan:"rowSpan",autofocus:"autoFocus",formaction:"formAction",formenctype:"formEncType",formmethod:"formMethod",formnovalidate:"formNoValidate",formtarget:"formTarget",acceptcharset:"acceptCharset",autocomplete:"autoComplete",novalidate:"noValidate",dirname:"dirName",maxlength:"maxLength",readonly:"readOnly",minlength:"minLength"},No=["contenteditable","autofocus","autoplay","allowfullscreen","allowpaymentreques","checked","controls","compact","disabled","hidden","ismap","loop","multiple","muted","open","playsinline","readonly","required","selected","async","defer"],Kr=n=>typeof n=="number",ea=n=>Array.isArray(n),Yn=n=>typeof n=="object",sn=n=>n===null,ta=n=>n===void 0,na=n=>typeof n=="boolean",oa=n=>typeof n=="function",Xn=n=>[!1,0,-0,"",null,void 0,NaN].includes(n),ra=n=>["string","number","bigint","boolean","undefined","symbol","null"].includes(typeof n),we=(n,e)=>ra(n)||sn(n)?!1:Object.prototype.hasOwnProperty.call(n,e),Vn=(n,e)=>{if(Object.is(n,e))return!0;if(!Yn(n)||!Yn(e)||sn(n)||sn(e))return!1},lt=(n,e,t=10)=>{const o=Vn(n,e);if(typeof o=="boolean")return o;const r=Object.keys(n),a=Object.keys(e);if(r.length!==a.length||[...r].sort().join("")!==[...a].sort().join(""))return!1;for(let i=0;i<r.length;i++){const s=n[r[i]],l=e[r[i]];if(Vn(s,l)===!1||t>0&&!lt(s,l,t-1))return!1}return!0};var k=(n=>(n.Function="#-function",n.Element="#-element",n.Root="#-root",n.Text="#-text",n.Null="#-null",n.Context="#-context",n.Outlet="#-outlet",n.Portal="#-portal",n.Fragment="#-fragment",n.JsxFragment="#-jsx-fragment",n.ErrorBoundary="#-error-boundary",n))(k||{}),Q=(n=>(n.State="#-state",n.Effect="#-effect",n.Memo="#-memo",n.Ref="#-ref",n.Context="#-context",n.Composable="#-composable",n.Error="#-error",n))(Q||{}),U=(n=>(n.Mounted="#-mounted",n.Mounting="#-mounting",n.Unmounting="#-unmounting",n.Unmounted="#-unmounted",n))(U||{});const Oo=Symbol.for("ruvy-component"),st=()=>null,aa=n=>n,sa=()=>null,Uo=n=>null;var O=(n=>(n.RenderElement="render-element",n.RenderText="render-text",n.RenderInnerHTML="render-inner-html",n.ReorderElements="reorder-elements",n.ChangeElementPosition="change-element-position",n.RunEffectCleanup="run-cleanup",n.RunEffect="run-effect",n.UnmountComponent="unmount-component",n.UpdateProps="update-props",n.UpdateText="update-text",n.UnmountedComponent="unmounted-component",n.RemoveComponent="remove-component",n.UpdatePortalChildren="update-portal-children",n.SetComponentMounted="mounted-component",n.RefElement="ref-element",n.UnrefEelement="unref-element",n))(O||{});const ia=["unmount-component","render-element","render-text","unref-element","ref-element","render-inner-html","unmounted-component","remove-component","change-element-position","reorder-elements","update-portal-children","update-props","update-text","mounted-component","run-cleanup","run-effect"];class R extends Error{constructor(e){super(),this.message=`[Ruvy] : ${e}`}}let Vt=0,Qn=-1;const bn=()=>{let n="";const e=Date.now();e-Qn<10?Vt++:Vt=0,Qn=e;const t=Math.floor(Math.random()*10)+10,o=Math.floor(Math.random()*100)+100,r=Math.floor(Math.random()*10)+10;return n=`${e}-${Vt}-${t}-${o}-${r}`,n};function Kn(n,e,t){const o=[...n],r=o.splice(e,1)[0];return o.splice(t,0,r),o}const ae=n=>({date:new Date,id:bn(),...n}),la=n=>{const e=Ga(n.props);return ae({component:n,execute:()=>{const o=Gr(n.type,e),r=Dn(n);if(!r.instance)throw new R("unable to find element hosting parent.");const{index:a}=Ot(n);Mt(o,r.instance,a),n.instance=o,n.status=U.Mounted},type:O.RenderElement})},eo=(n,e)=>ae({component:n,execute:()=>{const o=n.instance;if(!o)throw new R("unable to set innerHTML, component is not yet mounted.");o.innerHTML=e},type:O.RenderInnerHTML}),ua=(n,e)=>ae({component:n,execute:()=>{const o=n.instance;if(!o)throw new R("unable to update element, component is not yet mounted.");for(const r of e){const{key:a,operation:i}=r,s=Io(a);if(s){const{event:l}=s;i==="create"||i==="update"?Po(a,l,r.value,o):Mo(a,l,o)}else i==="create"||i==="update"?an(a,r.value,o):Xr(a,o)}},type:O.UpdateProps}),to=(n,e)=>ae({execute:()=>{const o=n.instance;if(!o)throw new R("unable to set reference, component is not yet mounted.");e.value=o},component:n,type:O.RefElement}),ca=(n,e)=>ae({execute:()=>{e.value=void 0},component:n,type:O.UnrefEelement}),da=n=>ae({execute:()=>{n.status=U.Mounted},component:n,type:O.SetComponentMounted}),ha=(n,e)=>ae({execute:()=>{if(Rt(n)&&!e.isHostParentUnmounting){const o=n.instance;if(!o)throw new R("unable to unmount node, component instance does not exist.");Qr(o)}n.status=U.Unmounted},component:n,type:O.UnmountComponent}),pa=n=>ae({execute:()=>{Fn(n).forEach(o=>{const r=o.instance;if(!r)throw new R("unable to change element position, component instance does not exist.");const{index:a,found:i}=Ot(o);if(!i)throw new R("unable to compute node index in dom");if(!r.parentElement)throw new R("element does not have any parent");Vr(r,a)})},component:n,type:O.ReorderElements}),ma=n=>ae({component:n,execute:()=>{const t=_o(n.text),o=n.domParent;if(!o.instance)throw new R("unable to find element hosting parent.");const{index:r,found:a}=Ot(n);if(!a)throw new R("unable to compute node index in dom");Mt(t,o.instance,r),n.instance=t},type:O.RenderText}),fa=(n,e)=>ae({component:n,execute:()=>{const o=n.instance;if(!o)throw new R("unable to change element position, component instance does not exist.");o.data=e},type:O.UpdateText}),ln=(n,e)=>ae({component:n,execute:()=>{const o=e.callback();typeof o=="function"&&(e.cleanup=o)},type:O.RunEffect}),$o=(n,e)=>ae({component:n,execute:()=>{var o;(o=e.cleanup)==null||o.call(e),e.cleanup=void 0},type:O.RunEffectCleanup}),ga=n=>ae({component:n,execute:()=>{const t=n.instance;if(!t)throw new R("unable to change portal, component instance does not exist.");Fn(n).forEach(o=>{const r=o.instance;if(!r)throw new R("unable to move element to new portal, component instance does not exist.");Mt(r,t)})},type:O.UpdatePortalChildren}),ba=(n,e,...t)=>(t=t.flat(),{type:n,props:{...e,children:t},children:t,symbol:Oo,key:(e==null?void 0:e.key)??void 0}),zo=n=>n;window.createJsxElement=ba;window.createJsxFragmentElement=zo;var no=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ho(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var yn={exports:{}};yn.exports=function(n){return Jo(ya(n),n)};yn.exports.array=Jo;function Jo(n,e){var t=n.length,o=new Array(t),r={},a=t,i=va(e),s=wa(n);for(e.forEach(function(u){if(!s.has(u[0])||!s.has(u[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});a--;)r[a]||l(n[a],a,new Set);return o;function l(u,p,m){if(m.has(u)){var f;try{f=", node was:"+JSON.stringify(u)}catch{f=""}throw new Error("Cyclic dependency"+f)}if(!s.has(u))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(u));if(!r[p]){r[p]=!0;var g=i.get(u)||new Set;if(g=Array.from(g),p=g.length){m.add(u);do{var B=g[--p];l(B,s.get(B),m)}while(p);m.delete(u)}o[--t]=u}}}function ya(n){for(var e=new Set,t=0,o=n.length;t<o;t++){var r=n[t];e.add(r[0]),e.add(r[1])}return Array.from(e)}function va(n){for(var e=new Map,t=0,o=n.length;t<o;t++){var r=n[t];e.has(r[0])||e.set(r[0],new Set),e.has(r[1])||e.set(r[1],new Set),e.get(r[0]).add(r[1])}return e}function wa(n){for(var e=new Map,t=0,o=n.length;t<o;t++)e.set(n[t],t);return e}var xa=yn.exports;const Da=Ho(xa),un={};let ue,vn;const ka=5;let Ce="idle",nt=[],Ee=[],ot=!1,kt=0;const oo=()=>{Ce="idle",nt=[],Ee=[],ot=!1,kt=0,ue=void 0,vn=void 0},jo=(n,e)=>(n.forEach(t=>{e.includes(t)||(e.push(t),me(t)&&jo(t.subscribers,e))}),e),St=(n,e)=>n.tag===k.Root?!1:n.parent===e?!0:St(n.parent,e),Fa=n=>{const e=[];n.forEach((a,i)=>{if(e.includes(a))return;if(me(a)){e.push(a);return}let s=e.find(l=>me(l)?!1:St(a,l));s??(s=n.slice(i).find(l=>me(l)?!1:St(a,l))),s||e.push(a)});const t=e.reduce((a,i,s)=>{if(me(i)){const l=[];i.subscribers.forEach(u=>{const p=e.indexOf(u);p!==-1&&l.push([p.toString(),s.toString()])}),a.push(...l)}return a},[]),r=Da.array(e.map((a,i)=>i.toString()),t).map(a=>{const i=e[parseInt(a)];if(!i)throw new R("something went wrong while trying to optimize dependencies");return i}).reverse();if(!ot){const a=[],i=[];return r.forEach(l=>{me(l)?a.push(l):i.push(l)}),[...a.sort((l,u)=>l.index-u.index),...i]}return r},Ea=()=>{if(un.preventRequestsProcessing)return;if(kt++,kt>100)throw new R("infinite re-rendering detected: update depth exceeded 100.");Ce!=="unmounting"&&(Ce="processing");const n=Ee.some(s=>s.type==="route"),e=n?[]:Ee.filter(s=>s.type==="mount");if(ot&&e.length>0)throw new R("cannot mount application twice, try to unmount the current one first.");const t=Ee.some(s=>s.type==="unmount");if(t&&(Ce="unmounting",!ot)){if(un.skipThrowingWhenUnmountingNoApp){oo();return}throw new R("no application to be unmounted")}const o=Ee.filter(s=>s.type==="update"),r=jo(o.map(s=>s.requester),[]),a=Fa(r);Ee=[];const i=ee();if(a.forEach(s=>{const l=s;let u;if(me(l))u=fs(l);else{const p=l.props,m=l.type,f=l.props.children,g=l.ctx.index,B=createJsxElement(m,p,...f),T=Oe(l.ctx);u=rt(B,l,l.ctx.parent,g,T).tasks}pe(u,i)}),e.forEach(s=>{const{child:l,root:u}=s,p=u.children.length,m=u,f=rt(l,void 0,m,p,{contexts:{},dom:{parent:m},index:p,key:p,parent:m});u.children=[f.component],pe(f.tasks,i),ot=!0}),n){const s=rt(vn,ue==null?void 0:ue.children[0],ue,0,{contexts:{},dom:{parent:ue},index:0,key:0,parent:ue});pe(s.tasks,i)}if(t&&ue){const s=ue.children[0],l=Lt(s,{});pe(l,i),Array.from(ms()).sort((u,p)=>p[1].index-u[1].index).forEach(([u])=>pe(gs(u),i)),oo()}if(Aa(i),Ce="idle",nt.length===0){kt=0;return}Ee=nt,nt=[],Ye(Ee[0])},Ye=n=>{if(un.preventRequests===!0||Ce==="unmounting")return;const e={date:new Date,fulfilled:!1,id:bn(),...n};if(Ce==="processing"){nt.push(e);return}Ee.push(e),Ce!=="batching"&&(Ce="batching",setTimeout(()=>Ea(),ka))};Wr({events:{wrapper:(n,e)=>{try{e(n)}catch(t){console.error(t)}},syntax:{svelte:!1,vue:!1}}});const Ca=({app:n,host:e})=>{if(ue)throw new R("an app is already mounted");ue={children:[],instance:e,tag:k.Root},vn=n,Ye({root:ue,child:n,type:"mount"})},Aa=n=>{ia.forEach(e=>{n[e].forEach(t=>{try{t.execute()}catch(o){console.error(o)}})})},Ta=n=>{let e=location.pathname;return n&&e.startsWith(n)&&(e=e.replace(n,"")),e||(e="/"),e},Sa=n=>[{path:n},"",n],_a=()=>{const n=location.search,e=new URLSearchParams(n);return Array.from(e.entries()).reduce((o,r)=>(o[r[0]]=r[1],o),{})},Ra={getPath:Ta,createHistoryArgs:Sa,getQueryParams:_a},Wo=n=>{const{protocol:e,hostname:t}=location,o=`${e}//${t}${n}`;return new URL(o)},Ba=n=>{let e=location.hash.substring(1);return n&&e.startsWith(n)&&(e=e.replace(n,"")),e||(e="/"),Wo(e).pathname},Ia=()=>{const e=Wo(location.hash.substring(1)).search,t=new URLSearchParams(e);return Array.from(t.entries()).reduce((r,a)=>(r[a[0]]=a[1],r),{})},Pa=n=>{const e=`/#${n}`;return[{path:e},"",e]},Ma={getPath:Ba,createHistoryArgs:Pa,getQueryParams:Ia},La=n=>!("path"in n),ro=n=>"path"in n&&n.path==="",Na=n=>"path"in n&&n.path==="*",Ft=(n,e)=>n.endsWith("/")&&e.startsWith("/")?`${n}${e.substring(1)}`:!n.endsWith("/")&&!e.startsWith("/")?`${n}/${e}`:`${n}${e}`,cn=(n,e="",t=[],o=[])=>n.reduce((r,a)=>{if(ro(a))return r;if(La(a)){const f=[...t,a.element];if(a.children){const g=cn(a.children,e,f,o);return{...r,...g}}return r}if([...a.path].filter(f=>f==="/").length>1)throw new dn('path cannot contain multiple segments like "/segment-1/segment-2"');const s=Ft(e,a.path);if(Na(a)){const f={params:o,path:s,steps:[...t],title:a.title};return f.steps.push(a.element),r[s]=f,r}const l=a,u=[...t,l.element],m={params:[...o,...l.path.split("/").reduce((f,g)=>(g.startsWith(":")&&f.push(g.substring(1)),f),[])],path:s,steps:u,name:l.name,title:l.title};if(l.children){const f=cn(l.children,m.path,[...m.steps],[...m.params]);r={...r,...f};const g=l.children.find(B=>ro(B));g&&(m.steps.push(g.element),m.name=g.name??m.name,m.title=g.title??m.title,m.isIndex=!0)}return m.path==="/"&&(m.isIndex=!0),r[s]=m,r},{});var _t;(function(n){n.Browser="browser",n.Hash="hash"})(_t||(_t={}));const Oa=(n,e)=>{const t=e[n],o=n.split("/");if(t){const l=o.reduce((u,p)=>{if(p.startsWith(":")){const m=p.substring(1);u[m]=p}return u},{});return{steps:t.steps,params:l,route:t}}let r="/",a,i=[];for(let l=0;l<o.length;l++){const u=Ft(r,o[l]);if(e[u]){r=u,a=e[r],i=[...a.steps];continue}const m=Ft(r,"/:"),f=Object.keys(e).filter(E=>E.startsWith(m)).sort()[0];if(f){r=f,a=e[r],i=[...a.steps];continue}const g=Ft(r,"/*"),B=e[g];let T;const I=a==null?void 0:a.isIndex;if(B)r=g,a=e[r],T=a.steps.at(-1);else{const E=e["/*"];T=E==null?void 0:E.steps.at(-1)}if(I){const E=i.length-1;i[E]=T}else i.push(T);break}const s=r.split("/").reduce((l,u,p)=>{if(u.startsWith(":")){const m=u.substring(1),f=o[p];l[m]=f}return l},{});return{steps:i,params:s,route:a}},ao=(n,e,t)=>{const{name:o,params:r}=n,a=Object.keys(e).find(l=>e[l].name===o);if(!a)return;const i=e[a];if(!i)return;let s=i.path.split("/").map(l=>{if(l.startsWith(":")){const u=l.substring(1);return r?r[u]:void 0}return l}).join("/");if(n.query){const l=n.query,u=Object.keys(l).map(p=>`${p}=${l[p]}`).join("&");s=`${s}?${u}`}return n.hash&&(s=`${s}#${n.hash}`),t&&(s=`${t}${s}`),s};class dn extends Error{constructor(e){super(`[DOM Router]: ${e}`)}}class Ua{constructor(e){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"cache",{enumerable:!0,configurable:!0,writable:!0,value:{params:{},processed:{},steps:[],url:""}}),Object.defineProperty(this,"base",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"correctScrolling",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"type",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onChanged",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"listener",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"transformTitle",{enumerable:!0,configurable:!0,writable:!0,value:void 0});const{onChanged:t,routes:o,base:r,correctScrolling:a,transformTitle:i,type:s}=e;if(typeof r=="string"){if(!r.startsWith("/"))throw new dn(`invalid base "${r}" : should start with "/"`);this.base=r}this.correctScrolling=a??!1,this.type=s??_t.Browser,this.onChanged=t,this.transformTitle=i??(l=>l??""),this.routes=cn(o),this.listener=()=>{this.processPath()&&this.onChanged()},window.addEventListener("popstate",this.listener),this.processPath()}get engine(){return this.type===_t.Browser?Ra:Ma}unload(){window.removeEventListener("popstate",this.listener)}processPath(){var a,i,s;const e=location.href;if(e===this.cache.url)return!1;const t=this.engine.getPath(this.base),o=this.cache.processed[t],r=o??Oa(t,this.routes);return o||(this.cache.processed[t]=r),this.cache.params=Object.keys(r.params).reduce((l,u)=>(l[u]=decodeURI(r.params[u]),l),{}),this.cache.url=e,this.cache.steps=r.steps,(a=r.route)!=null&&a.title&&(document.title=((s=this.transformTitle)==null?void 0:s.call(this,(i=r.route)==null?void 0:i.title))??document.title),this.correctScrolling&&window.scrollTo({top:0}),!0}navigate(e,t){var r;if(typeof e=="number")history.go(e);else{let a;if(typeof e=="string")a=e;else{const s=ao(e,this.routes,this.base);if(typeof s!="string")throw new dn(`named path "${e.name}" is not found`);a=s}this.base&&!a.startsWith(this.base)&&(a=`${this.base}${a}`);const i=this.engine.createHistoryArgs(a);t!=null&&t.replace?history.replaceState(...i):history.pushState(...i)}this.processPath()&&((r=this.onChanged)==null||r.call(this))}getElementByDepth(e){return this.cache.steps.at(e)}getPath(){return this.engine.getPath(this.base)}getParams(){return this.cache.params}getSearchParams(){return this.engine.getQueryParams()}toHref(e){let t;if(typeof e=="string"?t=e:t=ao(e,this.routes,this.base),!!t)return this.base&&!t.startsWith(this.base)&&(t=`${this.base}${t}`),t}}const wn=n=>n.startsWith("/");let Se;const Go=n=>{if(n.tagName.toLowerCase()==="a")return n;const e=n.parentElement;if(e){if(e.tagName.toLowerCase()==="a")return e;if(e.parentElement)return Go(e.parentElement)}};document.addEventListener("click",n=>{if(!Se)return;const e=Go(n.target);if(e){const t=e.getAttribute("href");t&&wn(t)&&(n.preventDefault(),Ha(t))}});const $a=n=>{if(Se)throw new R("another router was already mounted, please unmount it first");const e=()=>{Ye({type:"route"})};Se=new Ua({...n,onChanged:e})},xn=n=>{if(!Se)throw new R("a router is yet to be created");return n(Se)},za=n=>Se?Se.getElementByDepth(n):null,Ha=(n,e={})=>{xn(t=>{t.navigate(n,e)})},qo=n=>{if(!(ta(n)||Kr(n)))return typeof n=="string"&&(!Se||!wn(n))?n:xn(e=>e.toHref(n))},Ja=()=>xn(n=>n.getPath()),Zo=["if","else","else-if","switch","case","case:default","innerHTML","tag","ns","children","key","ref"],rt=(n,e,t,o,r)=>{const a=kn(n),i=Yo(n,o),s=os[a],l=s(n,e,t,i,r);if(!e){const u=da(l.component);X(u,l.tasks)}if(ut(l.component))try{l.component.tag===k.ErrorBoundary&&l.component.ctx.errorContext&&(l.children=[l.component.fallback]);const u=Xo(l);pe(u,l.tasks)}catch(u){if(l.component.tag===k.ErrorBoundary){const p=ns(l,u);pe(p,l.tasks)}else throw u}return l},ja=(n,e,t,o,r)=>{const{type:a,props:i}=n;let s=n.children;const l=e??{children:[],key:o,parent:t,props:i,status:U.Mounting,tag:k.Element,type:a,domParent:r.dom.parent},u=ee(),p=i.innerHTML;if(e){if(typeof p=="string"&&p!==l.props.innerHTML){const T=eo(l,p);X(T,u),s=[]}const f=Wa(l.props,i);if(f.length>0){const T=ua(l,f);X(T,u)}const g=e.props.ref,B=i.ref;if(B!==g){if(Qt(g)){const T=ca(l,g);X(T,u)}if(Qt(B)){const T=to(l,B);X(T,u)}}l.props=i}else{const f=la(l);if(X(f,u),typeof p=="string"){const B=eo(l,p);s=[],X(B,u)}const g=i.ref;if(Qt(g)){const B=to(l,g);X(B,u)}}const m=Oe(r,f=>f.dom={parent:l});return{children:s,component:l,tasks:u,ctx:m}},Wa=(n,e)=>Object.keys({...n,...e}).reduce((t,o)=>(Zo.includes(o)||(we(e,o)?we(n,o)?lt(n[o],e[o])||t.push({key:o,operation:"update",value:e[o]}):t.push({key:o,operation:"create",value:e[o]}):t.push({key:o,operation:"remove"})),t),[]),Ga=n=>Object.keys(n).reduce((e,t)=>([...Zo,"tag"].includes(t)||(e[t]=n[t]),e),{}),qa=(n,e,t,o,r)=>{const{props:a,type:i}=n,s=n.children,l=ee(),u=e??{children:[],key:o,parent:t,props:a,status:U.Mounting,tag:k.Context,type:i};e&&(u.props=a);const p=a.ctx.id,m=Oe(r,f=>f.contexts[p]=a.value);return{children:s,component:u,ctx:m,tasks:l}},Za=(n,e,t,o,r)=>{const{props:a,type:i}=n,s=n.children,l=ee(),u=e??{children:[],key:o,parent:t,type:i,props:a,status:U.Mounting,tag:k.Fragment};return e&&(u.props=a),{children:s,component:u,ctx:r,tasks:l}},Ya=(n,e,t,o,r)=>{const{props:a,type:i}=n,s=n.children,l=ee(),u=e??{children:[],key:o,props:a,parent:t,type:i,status:U.Mounting,tag:k.JsxFragment};return{children:s,component:u,ctx:r,tasks:l}},Xa=(n,e,t,o,r)=>{const a=ee(),{props:i,type:s}=n,l=e??{children:[],hooks:[],key:o,parent:t,props:i,type:s,status:U.Mounting,tag:k.Function,ctx:Oe(r)};return e&&(l.props=i,l.ctx=r),{children:[Vo({component:l,tasks:a,ctx:r},()=>s(i))],component:l,ctx:r,tasks:a}},Va=(n,e,t,o,r)=>{const a=ee();return{component:e??{key:o,parent:t,status:U.Mounting,tag:k.Null},children:[],ctx:r,tasks:a}},Qa=(n,e,t,o,r)=>{const a=ee(),{props:i,type:s}=n,l=(r.outletDepth??-1)+1,u=Oe(r,f=>{f.outletDepth=l}),p=e??{children:[],key:o,parent:t,props:i,status:U.Mounting,tag:k.Outlet,type:s,ctx:u};return e&&(p.props=i),{children:[za(l)],ctx:u,component:p,tasks:a}},Ka=(n,e,t,o,r)=>{const{type:a,props:i}=n,{children:s,container:l}=i,u=ee(),p=e??{children:[],key:o,parent:t,props:i,status:U.Mounting,tag:k.Portal,instance:l,type:a};if(e){const f=i.container,g=p.props.container;if(f!==g){p.instance=f;const B=ga(p);X(B,u)}p.props=i}const m={...r,dom:{...r.dom,parent:p}};return{component:p,children:s,ctx:m,tasks:u}},es=(n,e,t,o,r)=>{const a=`${n}`,i=ee(),s=e??{key:o,parent:t,status:U.Mounting,tag:k.Text,text:a,position:0,domParent:r.dom.parent};if(e){if(a!==s.text){s.text=a;const l=fa(s,a);X(l,i)}}else{const l=ma(s);X(l,i)}return{component:s,ctx:r,children:[],tasks:i}},ts=(n,e,t,o,r)=>{const a=ee(),{props:i,type:s}=n,l=n.children,u=Oe(r,f=>{f.errorContext=void 0}),p=oa(i.errorEffect)?i.errorEffect:void 0,m=e??{type:s,children:[],key:o,parent:t,props:i,ctx:u,status:U.Mounting,tag:k.ErrorBoundary,fallback:i.fallback,errorEffect:p};return e&&(m.props=i,m.errorEffect=p,m.fallback=i.fallback),{children:l,component:m,ctx:u,tasks:a}},so=n=>{n.data=void 0,n.ctx.errorContext=void 0,Ye({type:"update",requester:n})},ns=(n,e)=>{const{component:t}=n,o={error:e,recover:()=>so(t)};t.data=o,t.ctx.errorContext=o,n.ctx.errorContext=o;const r=ee();if(t.errorEffect){const s=ln(t,{callback:()=>{var l;(l=t.errorEffect)==null||l.call(t,e,()=>so(t))},deps:[],type:Q.Effect});X(s,r)}n.children=[t.fallback];const a=Xo(n);return pe(a,r),r},os={[k.Element]:ja,[k.Context]:qa,[k.Fragment]:Za,[k.JsxFragment]:Ya,[k.Function]:Xa,[k.Outlet]:Qa,[k.Text]:es,[k.Null]:Va,[k.Portal]:Ka,[k.ErrorBoundary]:ts},ee=()=>({[O.SetComponentMounted]:[],[O.RemoveComponent]:[],[O.RenderElement]:[],[O.RenderInnerHTML]:[],[O.RenderText]:[],[O.ReorderElements]:[],[O.RunEffect]:[],[O.RunEffectCleanup]:[],[O.UnmountComponent]:[],[O.UpdatePortalChildren]:[],[O.UpdateProps]:[],[O.UpdateText]:[],[O.UnmountedComponent]:[],[O.RefElement]:[],[O.UnrefEelement]:[],[O.ChangeElementPosition]:[]}),rs=n=>[k.Function,k.Element,k.Portal,k.Portal,k.Fragment,k.JsxFragment,k.Context,k.Outlet,k.ErrorBoundary].includes(n.tag),as=n=>!rs(n)||!we(n.props,"switch")?!1:{value:n.props.switch},Rt=n=>[k.Element,k.Text].includes(n.tag),ss=n=>[k.Element,k.Portal,k.Root].includes(n.tag),Dn=n=>{if(n.tag===k.Root)throw new R("unable to locate the parent node.");return ss(n.parent)?n.parent:Dn(n.parent)},Qt=n=>we(n,"value"),X=(n,e)=>{e[n.type].push(n)},pe=(n,e)=>{for(const t of Object.keys(n))e[t].push(...n[t])},Lt=(n,e)=>{const t=ee(),o={...e};if(n.status=U.Unmounting,(me(n)||n.tag===k.Function)&&n.hooks.forEach(r=>{if(r.type===Q.Effect&&typeof r.cleanup=="function"){const a=$o(n,r);X(a,t)}else r.type===Q.Composable&&ys(r.name,n)}),"tag"in n){const r=ha(n,e);X(r,t),ut(n)&&n.children.forEach(a=>{const i=Lt(a,o);pe(i,t)})}return t},Nt=n=>n!==null&&typeof n=="object"&&!Array.isArray(n)&&we(n,"type")&&we(n,"props")&&we(n,"children")&&we(n,"symbol")&&n.symbol===Oo&&typeof n.props=="object"&&Array.isArray(n.children),kn=n=>{if(Nt(n)){if(n.type===aa)return k.Portal;if(n.type===Uo)return k.ErrorBoundary;if(n.type===k.Context)return k.Context;if(n.type===st)return k.Outlet;if(n.type===sa)return k.Fragment;if(n.type===zo)return k.JsxFragment;if(typeof n.type=="function")return k.Function;if(typeof n.type=="string")return k.Element}return[null,!1,void 0].includes(n)?k.Null:k.Text},ut=n=>[k.Fragment,k.JsxFragment,k.Element,k.Function,k.Context,k.Function,k.Portal,k.Outlet,k.ErrorBoundary].includes(n.tag),Yo=(n,e)=>Nt(n)?n.key??e:e,Ze=(n,e)=>{if(!Nt(n))return!1;const{props:t}=n;return we(t,e)?{value:t[e]}:!1},is=n=>ut(n)?n.children.reduce((e,t,o)=>{const r=t.key;return e[r]={component:t,index:o},t.status=U.Unmounting,e},{}):{},ls=(n,e)=>{const t=[];typeof n.props.tag=="string"&&(n.type=n.props.tag);const o=Object.keys(n.props).reduce((r,a)=>{const i=n.props[a];if(Bo(a))t.push({key:a,value:i});else if(a==="href"&&n.type.toLowerCase()==="a"){const s=Ze(n,"href");s&&(r[a]=qo(s.value))}else r[a]=i;return r},{});if(t.length>0){const r=Ro(t);o.class=r}o.ns=e.ns??o.ns??at.HTML,n.props=o},us=(n,e,t,o,r)=>{if(r)return!0;{const a=Ze(n,"case");if(a)return!(a.value===o);if(!(e===t-1))throw new R('missing "case" prop within a switch control component.');if(!Ze(n,"case:default"))throw new R('missing "case" or "case:default" prop in the last element of a switch control component.');return!1}},cs=(n,e,t)=>{const o=!!e;if(n==="if")return{nullify:!o,sequence:{fullfilled:o,last:"if"}};if(t===!1)throw new R('cannot use "else" or "else-if" directives outside a conditional sequence');if(n==="else-if"&&t.last==="else")throw new R('cannot use "else-if" directive after "else" directive');return t.fullfilled?{nullify:!0,sequence:{fullfilled:!0,last:n}}:n==="else-if"?{nullify:!o,sequence:{fullfilled:o,last:"else-if"}}:{nullify:!o,sequence:!1}},Xo=n=>{const e=ee(),t=n.component,o=as(t);let r=o===!1,a=!1;const i=is(t),s=new Set([]),l=n.children.length;for(let u=0;u<l;u++){const p=n.children[u];let m=!1;o&&(m=us(p,u,l,o.value,r),m||(r=!0));const f=Yo(p,u);if(s.has(f))throw new R(`duplicate key "${f}" detected. make sure to assign unique keys for each child. if key is not defined, the framework will use the component index as a key instead.`);s.add(f);let g=m?null:p;const B=Ze(p,"if"),T=Ze(p,"else-if"),I=Ze(p,"else");if(o&&T||o&&I)throw new R('cannot have an "else" or "else-if" directive within a "switch" control component');const E=(B?1:0)+(T?1:0)+(I?1:0);if(E>1)throw new R('cannot have more than one conditional directive : "if" | "else" | "else-if"');if(E===1){const b=B?"if":T?"else-if":"else",F=B?B.value:T?T.value:!0,P=cs(b,F,a);a=P.sequence,m=P.nullify}else a=!1;g=m?null:g,kn(g)===k.Element&&ls(g,n.ctx);let d;const v=Oe(n.ctx,b=>{b.index=u,b.key=f,b.parent=n.component}),y=i[f];if(!y||ds(g,y.component)){d=rt(g,void 0,t,u,v);const b=t.children.length;t.children.push(d.component),u!==b&&(t.children=Kn(t.children,b,u))}else{y.component.status=U.Mounted,d=rt(g,y.component,t,u,n.ctx);const b=t.children.indexOf(y.component);if(b===-1)throw new R("unable to determine component index");if(b!==u){t.children=Kn(t.children,b,u);const F=pa(y.component);X(F,d.tasks)}}pe(d.tasks,e)}return t.children=t.children.filter(u=>{if(u.status===U.Unmounting){const p=Lt(u,{});return pe(p,e),!1}return!0}),e},Oe=(n,e)=>{const t={...n,contexts:{...n.contexts},dom:{...n.dom}};return e==null||e(t),t},ds=(n,e)=>{if(kn(n)!==e.tag)return!0;if(!Nt(n))return!1;const o=e;return n.type===o.type?o.tag===k.Element&&(n.props.ns??at.HTML)!==o.props.ns:!0},Fn=n=>Rt(n)?[n]:ut(n)?n.children?n.children.reduce((e,t)=>(Rt(t)?e.push(t):e.push(...Fn(t)),e),[]):[]:[],Ot=(n,e)=>{let t=0,o=!1;e??(e=Dn(n));for(const r of e.children){if(o)break;if(r===n){o=!0;break}if(r.status!==U.Unmounting&&r.tag!==k.Portal){if(Rt(r)){t++;continue}if(ut(r)){const{found:a,index:i}=Ot(n,r);t+=i,a&&(o=!0)}}}return{index:t,found:o}};let re=-1,L;const Vo=(n,e)=>{L=n;const t=e();return L=void 0,re=-1,t},_e=n=>{if(!L)throw new R('cannot call "useState" outisde of a functional component body.');const e=L.component;re++;let t;if(L.component.status===U.Mounting){const o=typeof n=="function"?n():n;t={type:Q.State,value:o,getValue:()=>t.value,setValue:r=>{if(e.status===U.Unmounting||e.status===U.Unmounted)return;let a;typeof r=="function"?a=r(t.value):a=r,lt(t.value,a)||(t.value=a,Ye({requester:e,type:"update"}))}},L.component.hooks.push(t)}else t=L.component.hooks[re];if(!t||t.type!==Q.State)throw new R("unexpected hook type : expected state but got something else.");return[t.value,t.setValue,t.getValue]},ct=(n,e)=>{if(!L)throw new R('cannot call "useEffect" outisde of a functional component body.');re++;let t;if(L.component.status===U.Mounting){t={callback:n,deps:e,type:Q.Effect},L.component.hooks.push(t);const o=ln(L.component,t);X(o,L.tasks)}else{if(t=L.component.hooks[re],!t||t.type!==Q.Effect)throw new R("unexpected hook type : expected effect but got something else.");if(!lt(e,t.deps)){if(typeof t.cleanup=="function"){const r=$o(L.component,t);X(r,L.tasks)}t.callback=n,t.deps=e;const o=ln(L.component,t);X(o,L.tasks)}}},ge=(n,e)=>{if(!L)throw new R('cannot call "useMemo" outisde of a functional component body.');re++;let t;if(L.component.status===U.Mounting){const o=n();t={type:Q.Memo,deps:e,value:o},L.component.hooks.push(t)}else{if(t=L.component.hooks[re],!t||t.type!==Q.Memo)throw new R("unexpected hook type : expected memo but got something else.");lt(t.deps,e)||(t.value=n(),t.deps=e)}return t.value},hn=(n,e)=>ge(()=>n,e),Qo=n=>{if(!L)throw new R('cannot call "useRef" outisde of a functional component body.');re++;let e;if(L.component.status===U.Mounting)e={type:Q.Ref,value:{value:n}},L.component.hooks.push(e);else if(e=L.component.hooks[re],!e||e.type!==Q.Ref)throw new R("unexpected hook type : expected ref but got something else.");return e.value},hs=n=>{if(!L)throw new R('cannot call "useComposable" outisde of a functional component body.');re++;let e,t;if(L.component.status===U.Mounting)t=lo(n),e={type:Q.Composable,name:n},bs(n,L.component),L.component.hooks.push(e);else{if(e=L.component.hooks[re],!e||e.type!==Q.Composable)throw new R("unexpected hook type : expected composable but got something else.");t=lo(e.name)}return t},ps=()=>{if(!L)throw new R('cannot call "useErrorBoundary" outisde of a functional component body.');if(me(L.component))throw new R('cannot call "useErrorBoundary" inside a composable.');if(!L.ctx.errorContext)throw new R('cannot call "useErrorBoundary" outside of a fallback component.');re++;let n;const{recover:e,error:t}=L.ctx.errorContext;if(L.component.status===U.Mounting)n={type:Q.Error},L.component.hooks.push(n);else if(n=L.component.hooks[re],!n||n.type!==Q.Error)throw new R("unexpected hook type : expected error but got something else.");return[t,e]};let io=0;const it=new Map,ms=()=>it.entries(),En=(n,e)=>{if(L)throw new R("cannot create a composable inside a function component or another composable.");if(it.has(n))throw new R(`composable with name "${n}" is already created`);const t={hooks:[],id:bn(),name:n,subscribers:[],value:void 0,status:U.Mounting,index:io,callback:e};return io++,it.set(n,t),Ye({requester:t,type:"update"}),()=>hs(n)},Ut=n=>{const e=it.get(n);if(!e)throw new R("unable to retrieve composable value, entry not found.");return e},me=n=>!we(n,"tag"),lo=n=>Ut(n).value,fs=n=>{const e={component:n,ctx:{},tasks:ee()};return Vo(e,()=>{const t=n.callback();return n.value=t,n.status!==U.Mounted&&(n.status=U.Mounted),t}),e.tasks},gs=n=>{const e=Ut(n),t=Lt(e,{});return it.delete(n),t},bs=(n,e)=>{const t=Ut(n);if(me(e)){t.subscribers.includes(e)||t.subscribers.push(e);return}t.subscribers.find(r=>me(r)?!1:St(e,r))||t.subscribers.push(e)},ys=(n,e)=>{const t=Ut(n);t.subscribers=t.subscribers.filter(o=>o!==e)},Ko=(...n)=>n.filter(t=>!Xn(t)).map(t=>ea(t)?t.filter(o=>!Xn(o)).join(" "):t).join(" ").trim(),vs=()=>{const[n,e]=ps();return createJsxElement("div",null,createJsxElement("h1",null,"Ooops !"),createJsxElement("h3",null,"Something went wrong!"),createJsxElement("p",null,n),createJsxElement("button",{onClick:e},"reload"))},ws=()=>createJsxElement(Uo,{fallback:createJsxElement(vs,null)},createJsxElement(st,null));/*! @license DOMPurify 3.0.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.3/LICENSE */const{entries:er,setPrototypeOf:uo,isFrozen:xs,getPrototypeOf:Ds,getOwnPropertyDescriptor:ks}=Object;let{freeze:K,seal:be,create:Fs}=Object,{apply:pn,construct:mn}=typeof Reflect<"u"&&Reflect;pn||(pn=function(e,t,o){return e.apply(t,o)});K||(K=function(e){return e});be||(be=function(e){return e});mn||(mn=function(e,t){return new e(...t)});const Es=ce(Array.prototype.forEach),co=ce(Array.prototype.pop),et=ce(Array.prototype.push),Et=ce(String.prototype.toLowerCase),Kt=ce(String.prototype.toString),Cs=ce(String.prototype.match),de=ce(String.prototype.replace),As=ce(String.prototype.indexOf),Ts=ce(String.prototype.trim),oe=ce(RegExp.prototype.test),tt=Ss(TypeError);function ce(n){return function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),r=1;r<t;r++)o[r-1]=arguments[r];return pn(n,e,o)}}function Ss(n){return function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return mn(n,t)}}function M(n,e,t){var o;t=(o=t)!==null&&o!==void 0?o:Et,uo&&uo(n,null);let r=e.length;for(;r--;){let a=e[r];if(typeof a=="string"){const i=t(a);i!==a&&(xs(e)||(e[r]=i),a=i)}n[a]=!0}return n}function qe(n){const e=Fs(null);for(const[t,o]of er(n))e[t]=o;return e}function vt(n,e){for(;n!==null;){const o=ks(n,e);if(o){if(o.get)return ce(o.get);if(typeof o.value=="function")return ce(o.value)}n=Ds(n)}function t(o){return console.warn("fallback value for",o),null}return t}const ho=K(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),en=K(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),tn=K(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_s=K(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),nn=K(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Rs=K(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),po=K(["#text"]),mo=K(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),on=K(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fo=K(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),wt=K(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bs=be(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Is=be(/<%[\w\W]*|[\w\W]*%>/gm),Ps=be(/\${[\w\W]*}/gm),Ms=be(/^data-[\-\w.\u00B7-\uFFFF]/),Ls=be(/^aria-[\-\w]+$/),tr=be(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ns=be(/^(?:\w+script|data):/i),Os=be(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),nr=be(/^html$/i);var go=Object.freeze({__proto__:null,MUSTACHE_EXPR:Bs,ERB_EXPR:Is,TMPLIT_EXPR:Ps,DATA_ATTR:Ms,ARIA_ATTR:Ls,IS_ALLOWED_URI:tr,IS_SCRIPT_OR_DATA:Ns,ATTR_WHITESPACE:Os,DOCTYPE_NAME:nr});const Us=()=>typeof window>"u"?null:window,$s=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let o=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(o=t.getAttribute(r));const a="dompurify"+(o?"#"+o:"");try{return e.createPolicy(a,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}};function or(){let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Us();const e=C=>or(C);if(e.version="3.0.3",e.removed=[],!n||!n.document||n.document.nodeType!==9)return e.isSupported=!1,e;const t=n.document,o=t.currentScript;let{document:r}=n;const{DocumentFragment:a,HTMLTemplateElement:i,Node:s,Element:l,NodeFilter:u,NamedNodeMap:p=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:m,DOMParser:f,trustedTypes:g}=n,B=l.prototype,T=vt(B,"cloneNode"),I=vt(B,"nextSibling"),E=vt(B,"childNodes"),h=vt(B,"parentNode");if(typeof i=="function"){const C=r.createElement("template");C.content&&C.content.ownerDocument&&(r=C.content.ownerDocument)}let d,v="";const{implementation:y,createNodeIterator:b,createDocumentFragment:F,getElementsByTagName:P}=r,{importNode:S}=t;let N={};e.isSupported=typeof er=="function"&&typeof h=="function"&&y&&y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:G,ERB_EXPR:se,TMPLIT_EXPR:$e,DATA_ATTR:ht,ARIA_ATTR:zt,IS_SCRIPT_OR_DATA:Ht,ATTR_WHITESPACE:Xe}=go;let{IS_ALLOWED_URI:q}=go,$=null;const xe=M({},[...ho,...en,...tn,...nn,...po]);let J=null;const te=M({},[...mo,...on,...fo,...wt]);let j=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ne=null,De=null,Ie=!0,Ae=!0,ze=!1,Ve=!0,ye=!1,ie=!1,Qe=!1,Pe=!1,He=!1,pt=!1,mt=!1,Tn=!0,Sn=!1;const xr="user-content-";let Jt=!0,Ke=!1,Je={},je=null;const _n=M({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Rn=null;const Bn=M({},["audio","video","img","source","image","track"]);let jt=null;const In=M({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ft="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",ke="http://www.w3.org/1999/xhtml";let We=ke,Wt=!1,Gt=null;const Dr=M({},[ft,gt,ke],Kt);let Me;const kr=["application/xhtml+xml","text/html"],Fr="text/html";let Z,Ge=null;const Er=r.createElement("form"),Pn=function(c){return c instanceof RegExp||c instanceof Function},qt=function(c){if(!(Ge&&Ge===c)){if((!c||typeof c!="object")&&(c={}),c=qe(c),Me=kr.indexOf(c.PARSER_MEDIA_TYPE)===-1?Me=Fr:Me=c.PARSER_MEDIA_TYPE,Z=Me==="application/xhtml+xml"?Kt:Et,$="ALLOWED_TAGS"in c?M({},c.ALLOWED_TAGS,Z):xe,J="ALLOWED_ATTR"in c?M({},c.ALLOWED_ATTR,Z):te,Gt="ALLOWED_NAMESPACES"in c?M({},c.ALLOWED_NAMESPACES,Kt):Dr,jt="ADD_URI_SAFE_ATTR"in c?M(qe(In),c.ADD_URI_SAFE_ATTR,Z):In,Rn="ADD_DATA_URI_TAGS"in c?M(qe(Bn),c.ADD_DATA_URI_TAGS,Z):Bn,je="FORBID_CONTENTS"in c?M({},c.FORBID_CONTENTS,Z):_n,ne="FORBID_TAGS"in c?M({},c.FORBID_TAGS,Z):{},De="FORBID_ATTR"in c?M({},c.FORBID_ATTR,Z):{},Je="USE_PROFILES"in c?c.USE_PROFILES:!1,Ie=c.ALLOW_ARIA_ATTR!==!1,Ae=c.ALLOW_DATA_ATTR!==!1,ze=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Ve=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ye=c.SAFE_FOR_TEMPLATES||!1,ie=c.WHOLE_DOCUMENT||!1,He=c.RETURN_DOM||!1,pt=c.RETURN_DOM_FRAGMENT||!1,mt=c.RETURN_TRUSTED_TYPE||!1,Pe=c.FORCE_BODY||!1,Tn=c.SANITIZE_DOM!==!1,Sn=c.SANITIZE_NAMED_PROPS||!1,Jt=c.KEEP_CONTENT!==!1,Ke=c.IN_PLACE||!1,q=c.ALLOWED_URI_REGEXP||tr,We=c.NAMESPACE||ke,j=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&Pn(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(j.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Pn(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(j.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(j.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ye&&(Ae=!1),pt&&(He=!0),Je&&($=M({},[...po]),J=[],Je.html===!0&&(M($,ho),M(J,mo)),Je.svg===!0&&(M($,en),M(J,on),M(J,wt)),Je.svgFilters===!0&&(M($,tn),M(J,on),M(J,wt)),Je.mathMl===!0&&(M($,nn),M(J,fo),M(J,wt))),c.ADD_TAGS&&($===xe&&($=qe($)),M($,c.ADD_TAGS,Z)),c.ADD_ATTR&&(J===te&&(J=qe(J)),M(J,c.ADD_ATTR,Z)),c.ADD_URI_SAFE_ATTR&&M(jt,c.ADD_URI_SAFE_ATTR,Z),c.FORBID_CONTENTS&&(je===_n&&(je=qe(je)),M(je,c.FORBID_CONTENTS,Z)),Jt&&($["#text"]=!0),ie&&M($,["html","head","body"]),$.table&&(M($,["tbody"]),delete ne.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw tt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw tt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');d=c.TRUSTED_TYPES_POLICY,v=d.createHTML("")}else d===void 0&&(d=$s(g,o)),d!==null&&typeof v=="string"&&(v=d.createHTML(""));K&&K(c),Ge=c}},Mn=M({},["mi","mo","mn","ms","mtext"]),Ln=M({},["foreignobject","desc","title","annotation-xml"]),Cr=M({},["title","style","font","a","script"]),bt=M({},en);M(bt,tn),M(bt,_s);const Zt=M({},nn);M(Zt,Rs);const Ar=function(c){let w=h(c);(!w||!w.tagName)&&(w={namespaceURI:We,tagName:"template"});const D=Et(c.tagName),H=Et(w.tagName);return Gt[c.namespaceURI]?c.namespaceURI===gt?w.namespaceURI===ke?D==="svg":w.namespaceURI===ft?D==="svg"&&(H==="annotation-xml"||Mn[H]):!!bt[D]:c.namespaceURI===ft?w.namespaceURI===ke?D==="math":w.namespaceURI===gt?D==="math"&&Ln[H]:!!Zt[D]:c.namespaceURI===ke?w.namespaceURI===gt&&!Ln[H]||w.namespaceURI===ft&&!Mn[H]?!1:!Zt[D]&&(Cr[D]||!bt[D]):!!(Me==="application/xhtml+xml"&&Gt[c.namespaceURI]):!1},Le=function(c){et(e.removed,{element:c});try{c.parentNode.removeChild(c)}catch{c.remove()}},Yt=function(c,w){try{et(e.removed,{attribute:w.getAttributeNode(c),from:w})}catch{et(e.removed,{attribute:null,from:w})}if(w.removeAttribute(c),c==="is"&&!J[c])if(He||pt)try{Le(w)}catch{}else try{w.setAttribute(c,"")}catch{}},Nn=function(c){let w,D;if(Pe)c="<remove></remove>"+c;else{const le=Cs(c,/^[\r\n\t ]+/);D=le&&le[0]}Me==="application/xhtml+xml"&&We===ke&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const H=d?d.createHTML(c):c;if(We===ke)try{w=new f().parseFromString(H,Me)}catch{}if(!w||!w.documentElement){w=y.createDocument(We,"template",null);try{w.documentElement.innerHTML=Wt?v:H}catch{}}const Y=w.body||w.documentElement;return c&&D&&Y.insertBefore(r.createTextNode(D),Y.childNodes[0]||null),We===ke?P.call(w,ie?"html":"body")[0]:ie?w.documentElement:Y},On=function(c){return b.call(c.ownerDocument||c,c,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT,null,!1)},Tr=function(c){return c instanceof m&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof p)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},yt=function(c){return typeof s=="object"?c instanceof s:c&&typeof c=="object"&&typeof c.nodeType=="number"&&typeof c.nodeName=="string"},Fe=function(c,w,D){N[c]&&Es(N[c],H=>{H.call(e,w,D,Ge)})},Un=function(c){let w;if(Fe("beforeSanitizeElements",c,null),Tr(c))return Le(c),!0;const D=Z(c.nodeName);if(Fe("uponSanitizeElement",c,{tagName:D,allowedTags:$}),c.hasChildNodes()&&!yt(c.firstElementChild)&&(!yt(c.content)||!yt(c.content.firstElementChild))&&oe(/<[/\w]/g,c.innerHTML)&&oe(/<[/\w]/g,c.textContent))return Le(c),!0;if(!$[D]||ne[D]){if(!ne[D]&&zn(D)&&(j.tagNameCheck instanceof RegExp&&oe(j.tagNameCheck,D)||j.tagNameCheck instanceof Function&&j.tagNameCheck(D)))return!1;if(Jt&&!je[D]){const H=h(c)||c.parentNode,Y=E(c)||c.childNodes;if(Y&&H){const le=Y.length;for(let W=le-1;W>=0;--W)H.insertBefore(T(Y[W],!0),I(c))}}return Le(c),!0}return c instanceof l&&!Ar(c)||(D==="noscript"||D==="noembed")&&oe(/<\/no(script|embed)/i,c.innerHTML)?(Le(c),!0):(ye&&c.nodeType===3&&(w=c.textContent,w=de(w,G," "),w=de(w,se," "),w=de(w,$e," "),c.textContent!==w&&(et(e.removed,{element:c.cloneNode()}),c.textContent=w)),Fe("afterSanitizeElements",c,null),!1)},$n=function(c,w,D){if(Tn&&(w==="id"||w==="name")&&(D in r||D in Er))return!1;if(!(Ae&&!De[w]&&oe(ht,w))){if(!(Ie&&oe(zt,w))){if(!J[w]||De[w]){if(!(zn(c)&&(j.tagNameCheck instanceof RegExp&&oe(j.tagNameCheck,c)||j.tagNameCheck instanceof Function&&j.tagNameCheck(c))&&(j.attributeNameCheck instanceof RegExp&&oe(j.attributeNameCheck,w)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(w))||w==="is"&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&oe(j.tagNameCheck,D)||j.tagNameCheck instanceof Function&&j.tagNameCheck(D))))return!1}else if(!jt[w]){if(!oe(q,de(D,Xe,""))){if(!((w==="src"||w==="xlink:href"||w==="href")&&c!=="script"&&As(D,"data:")===0&&Rn[c])){if(!(ze&&!oe(Ht,de(D,Xe,"")))){if(D)return!1}}}}}}return!0},zn=function(c){return c.indexOf("-")>0},Hn=function(c){let w,D,H,Y;Fe("beforeSanitizeAttributes",c,null);const{attributes:le}=c;if(!le)return;const W={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:J};for(Y=le.length;Y--;){w=le[Y];const{name:ve,namespaceURI:Xt}=w;if(D=ve==="value"?w.value:Ts(w.value),H=Z(ve),W.attrName=H,W.attrValue=D,W.keepAttr=!0,W.forceKeepAttr=void 0,Fe("uponSanitizeAttribute",c,W),D=W.attrValue,W.forceKeepAttr||(Yt(ve,c),!W.keepAttr))continue;if(!Ve&&oe(/\/>/i,D)){Yt(ve,c);continue}ye&&(D=de(D,G," "),D=de(D,se," "),D=de(D,$e," "));const Jn=Z(c.nodeName);if($n(Jn,H,D)){if(Sn&&(H==="id"||H==="name")&&(Yt(ve,c),D=xr+D),d&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!Xt)switch(g.getAttributeType(Jn,H)){case"TrustedHTML":{D=d.createHTML(D);break}case"TrustedScriptURL":{D=d.createScriptURL(D);break}}try{Xt?c.setAttributeNS(Xt,ve,D):c.setAttribute(ve,D),co(e.removed)}catch{}}}Fe("afterSanitizeAttributes",c,null)},Sr=function C(c){let w;const D=On(c);for(Fe("beforeSanitizeShadowDOM",c,null);w=D.nextNode();)Fe("uponSanitizeShadowNode",w,null),!Un(w)&&(w.content instanceof a&&C(w.content),Hn(w));Fe("afterSanitizeShadowDOM",c,null)};return e.sanitize=function(C){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},w,D,H,Y;if(Wt=!C,Wt&&(C="<!-->"),typeof C!="string"&&!yt(C))if(typeof C.toString=="function"){if(C=C.toString(),typeof C!="string")throw tt("dirty is not a string, aborting")}else throw tt("toString is not a function");if(!e.isSupported)return C;if(Qe||qt(c),e.removed=[],typeof C=="string"&&(Ke=!1),Ke){if(C.nodeName){const ve=Z(C.nodeName);if(!$[ve]||ne[ve])throw tt("root node is forbidden and cannot be sanitized in-place")}}else if(C instanceof s)w=Nn("<!---->"),D=w.ownerDocument.importNode(C,!0),D.nodeType===1&&D.nodeName==="BODY"||D.nodeName==="HTML"?w=D:w.appendChild(D);else{if(!He&&!ye&&!ie&&C.indexOf("<")===-1)return d&&mt?d.createHTML(C):C;if(w=Nn(C),!w)return He?null:mt?v:""}w&&Pe&&Le(w.firstChild);const le=On(Ke?C:w);for(;H=le.nextNode();)Un(H)||(H.content instanceof a&&Sr(H.content),Hn(H));if(Ke)return C;if(He){if(pt)for(Y=F.call(w.ownerDocument);w.firstChild;)Y.appendChild(w.firstChild);else Y=w;return(J.shadowroot||J.shadowrootmod)&&(Y=S.call(t,Y,!0)),Y}let W=ie?w.outerHTML:w.innerHTML;return ie&&$["!doctype"]&&w.ownerDocument&&w.ownerDocument.doctype&&w.ownerDocument.doctype.name&&oe(nr,w.ownerDocument.doctype.name)&&(W="<!DOCTYPE "+w.ownerDocument.doctype.name+`>
`+W),ye&&(W=de(W,G," "),W=de(W,se," "),W=de(W,$e," ")),d&&mt?d.createHTML(W):W},e.setConfig=function(C){qt(C),Qe=!0},e.clearConfig=function(){Ge=null,Qe=!1},e.isValidAttribute=function(C,c,w){Ge||qt({});const D=Z(C),H=Z(c);return $n(D,H,w)},e.addHook=function(C,c){typeof c=="function"&&(N[C]=N[C]||[],et(N[C],c))},e.removeHook=function(C){if(N[C])return co(N[C])},e.removeHooks=function(C){N[C]&&(N[C]=[])},e.removeAllHooks=function(){N={}},e}var zs=or();function rr(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let Ue=rr();function Hs(n){Ue=n}const ar=/[&<>"']/,Js=new RegExp(ar.source,"g"),sr=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,js=new RegExp(sr.source,"g"),Ws={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bo=n=>Ws[n];function V(n,e){if(e){if(ar.test(n))return n.replace(Js,bo)}else if(sr.test(n))return n.replace(js,bo);return n}const Gs=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function ir(n){return n.replace(Gs,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const qs=/(^|[^\[])\^/g;function z(n,e){n=typeof n=="string"?n:n.source,e=e||"";const t={replace:(o,r)=>(r=r.source||r,r=r.replace(qs,"$1"),n=n.replace(o,r),t),getRegex:()=>new RegExp(n,e)};return t}const Zs=/[^\w:]/g,Ys=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function yo(n,e,t){if(n){let o;try{o=decodeURIComponent(ir(t)).replace(Zs,"").toLowerCase()}catch{return null}if(o.indexOf("javascript:")===0||o.indexOf("vbscript:")===0||o.indexOf("data:")===0)return null}e&&!Ys.test(t)&&(t=Ks(e,t));try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}const xt={},Xs=/^[^:]+:\/*[^/]*$/,Vs=/^([^:]+:)[\s\S]*$/,Qs=/^([^:]+:\/*[^/]*)[\s\S]*$/;function Ks(n,e){xt[" "+n]||(Xs.test(n)?xt[" "+n]=n+"/":xt[" "+n]=Ct(n,"/",!0)),n=xt[" "+n];const t=n.indexOf(":")===-1;return e.substring(0,2)==="//"?t?e:n.replace(Vs,"$1")+e:e.charAt(0)==="/"?t?e:n.replace(Qs,"$1")+e:n+e}const Bt={exec:function(){}};function vo(n,e){const t=n.replace(/\|/g,(a,i,s)=>{let l=!1,u=i;for(;--u>=0&&s[u]==="\\";)l=!l;return l?"|":" |"}),o=t.split(/ \|/);let r=0;if(o[0].trim()||o.shift(),o.length>0&&!o[o.length-1].trim()&&o.pop(),o.length>e)o.splice(e);else for(;o.length<e;)o.push("");for(;r<o.length;r++)o[r]=o[r].trim().replace(/\\\|/g,"|");return o}function Ct(n,e,t){const o=n.length;if(o===0)return"";let r=0;for(;r<o;){const a=n.charAt(o-r-1);if(a===e&&!t)r++;else if(a!==e&&t)r++;else break}return n.slice(0,o-r)}function ei(n,e){if(n.indexOf(e[1])===-1)return-1;const t=n.length;let o=0,r=0;for(;r<t;r++)if(n[r]==="\\")r++;else if(n[r]===e[0])o++;else if(n[r]===e[1]&&(o--,o<0))return r;return-1}function ti(n,e){!n||n.silent||(e&&console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"),(n.sanitize||n.sanitizer)&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"),(n.highlight||n.langPrefix!=="language-")&&console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."),n.mangle&&console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`."),n.baseUrl&&console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."),n.smartypants&&console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."),n.xhtml&&console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."),(n.headerIds||n.headerPrefix)&&console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`."))}function wo(n,e,t,o){const r=e.href,a=e.title?V(e.title):null,i=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){o.state.inLink=!0;const s={type:"link",raw:t,href:r,title:a,text:i,tokens:o.inlineTokens(i)};return o.state.inLink=!1,s}return{type:"image",raw:t,href:r,title:a,text:V(i)}}function ni(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const o=t[1];return e.split(`
`).map(r=>{const a=r.match(/^\s+/);if(a===null)return r;const[i]=a;return i.length>=o.length?r.slice(o.length):r}).join(`
`)}class Cn{constructor(e){this.options=e||Ue}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const o=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?o:Ct(o,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const o=t[0],r=ni(o,t[3]||"");return{type:"code",raw:o,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let o=t[2].trim();if(/#$/.test(o)){const r=Ct(o,"#");(this.options.pedantic||!r||/ $/.test(r))&&(o=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:o,tokens:this.lexer.inline(o)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const o=t[0].replace(/^ *>[ \t]?/gm,""),r=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(o);return this.lexer.state.top=r,{type:"blockquote",raw:t[0],tokens:a,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let o,r,a,i,s,l,u,p,m,f,g,B,T=t[1].trim();const I=T.length>1,E={type:"list",raw:"",ordered:I,start:I?+T.slice(0,-1):"",loose:!1,items:[]};T=I?`\\d{1,9}\\${T.slice(-1)}`:`\\${T}`,this.options.pedantic&&(T=I?T:"[*+-]");const h=new RegExp(`^( {0,3}${T})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(B=!1,!(!(t=h.exec(e))||this.rules.block.hr.test(e)));){if(o=t[0],e=e.substring(o.length),p=t[2].split(`
`,1)[0].replace(/^\t+/,v=>" ".repeat(3*v.length)),m=e.split(`
`,1)[0],this.options.pedantic?(i=2,g=p.trimLeft()):(i=t[2].search(/[^ ]/),i=i>4?1:i,g=p.slice(i),i+=t[1].length),l=!1,!p&&/^ *$/.test(m)&&(o+=m+`
`,e=e.substring(m.length+1),B=!0),!B){const v=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),y=new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),b=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),F=new RegExp(`^ {0,${Math.min(3,i-1)}}#`);for(;e&&(f=e.split(`
`,1)[0],m=f,this.options.pedantic&&(m=m.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(b.test(m)||F.test(m)||v.test(m)||y.test(e)));){if(m.search(/[^ ]/)>=i||!m.trim())g+=`
`+m.slice(i);else{if(l||p.search(/[^ ]/)>=4||b.test(p)||F.test(p)||y.test(p))break;g+=`
`+m}!l&&!m.trim()&&(l=!0),o+=f+`
`,e=e.substring(f.length+1),p=m.slice(i)}}E.loose||(u?E.loose=!0:/\n *\n *$/.test(o)&&(u=!0)),this.options.gfm&&(r=/^\[[ xX]\] /.exec(g),r&&(a=r[0]!=="[ ] ",g=g.replace(/^\[[ xX]\] +/,""))),E.items.push({type:"list_item",raw:o,task:!!r,checked:a,loose:!1,text:g}),E.raw+=o}E.items[E.items.length-1].raw=o.trimRight(),E.items[E.items.length-1].text=g.trimRight(),E.raw=E.raw.trimRight();const d=E.items.length;for(s=0;s<d;s++)if(this.lexer.state.top=!1,E.items[s].tokens=this.lexer.blockTokens(E.items[s].text,[]),!E.loose){const v=E.items[s].tokens.filter(b=>b.type==="space"),y=v.length>0&&v.some(b=>/\n.*\n/.test(b.raw));E.loose=y}if(E.loose)for(s=0;s<d;s++)E.items[s].loose=!0;return E}}html(e){const t=this.rules.block.html.exec(e);if(t){const o={type:"html",block:!0,raw:t[0],pre:!this.options.sanitizer&&(t[1]==="pre"||t[1]==="script"||t[1]==="style"),text:t[0]};if(this.options.sanitize){const r=this.options.sanitizer?this.options.sanitizer(t[0]):V(t[0]);o.type="paragraph",o.text=r,o.tokens=this.lexer.inline(r)}return o}}def(e){const t=this.rules.block.def.exec(e);if(t){const o=t[1].toLowerCase().replace(/\s+/g," "),r=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3];return{type:"def",tag:o,raw:t[0],href:r,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(t){const o={type:"table",header:vo(t[1]).map(r=>({text:r})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(o.header.length===o.align.length){o.raw=t[0];let r=o.align.length,a,i,s,l;for(a=0;a<r;a++)/^ *-+: *$/.test(o.align[a])?o.align[a]="right":/^ *:-+: *$/.test(o.align[a])?o.align[a]="center":/^ *:-+ *$/.test(o.align[a])?o.align[a]="left":o.align[a]=null;for(r=o.rows.length,a=0;a<r;a++)o.rows[a]=vo(o.rows[a],o.header.length).map(u=>({text:u}));for(r=o.header.length,i=0;i<r;i++)o.header[i].tokens=this.lexer.inline(o.header[i].text);for(r=o.rows.length,i=0;i<r;i++)for(l=o.rows[i],s=0;s<l.length;s++)l[s].tokens=this.lexer.inline(l[s].text);return o}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const o=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:o,tokens:this.lexer.inline(o)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:V(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):V(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const o=t[2].trim();if(!this.options.pedantic&&/^</.test(o)){if(!/>$/.test(o))return;const i=Ct(o.slice(0,-1),"\\");if((o.length-i.length)%2===0)return}else{const i=ei(t[2],"()");if(i>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let r=t[2],a="";if(this.options.pedantic){const i=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);i&&(r=i[1],a=i[3])}else a=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(o)?r=r.slice(1):r=r.slice(1,-1)),wo(t,{href:r&&r.replace(this.rules.inline._escapes,"$1"),title:a&&a.replace(this.rules.inline._escapes,"$1")},t[0],this.lexer)}}reflink(e,t){let o;if((o=this.rules.inline.reflink.exec(e))||(o=this.rules.inline.nolink.exec(e))){let r=(o[2]||o[1]).replace(/\s+/g," ");if(r=t[r.toLowerCase()],!r){const a=o[0].charAt(0);return{type:"text",raw:a,text:a}}return wo(o,r,o[0],this.lexer)}}emStrong(e,t,o=""){let r=this.rules.inline.emStrong.lDelim.exec(e);if(!r||r[3]&&o.match(/[\p{L}\p{N}]/u))return;const a=r[1]||r[2]||"";if(!a||a&&(o===""||this.rules.inline.punctuation.exec(o))){const i=r[0].length-1;let s,l,u=i,p=0;const m=r[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+i);(r=m.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(l=s.length,r[3]||r[4]){u+=l;continue}else if((r[5]||r[6])&&i%3&&!((i+l)%3)){p+=l;continue}if(u-=l,u>0)continue;l=Math.min(l,l+u+p);const f=e.slice(0,i+r.index+l+1);if(Math.min(i,l)%2){const B=f.slice(1,-1);return{type:"em",raw:f,text:B,tokens:this.lexer.inlineTokens(B)}}const g=f.slice(2,-2);return{type:"strong",raw:f,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let o=t[2].replace(/\n/g," ");const r=/[^ ]/.test(o),a=/^ /.test(o)&&/ $/.test(o);return r&&a&&(o=o.substring(1,o.length-1)),o=V(o,!0),{type:"codespan",raw:t[0],text:o}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){const o=this.rules.inline.autolink.exec(e);if(o){let r,a;return o[2]==="@"?(r=V(this.options.mangle?t(o[1]):o[1]),a="mailto:"+r):(r=V(o[1]),a=r),{type:"link",raw:o[0],text:r,href:a,tokens:[{type:"text",raw:r,text:r}]}}}url(e,t){let o;if(o=this.rules.inline.url.exec(e)){let r,a;if(o[2]==="@")r=V(this.options.mangle?t(o[0]):o[0]),a="mailto:"+r;else{let i;do i=o[0],o[0]=this.rules.inline._backpedal.exec(o[0])[0];while(i!==o[0]);r=V(o[0]),o[1]==="www."?a="http://"+o[0]:a=o[0]}return{type:"link",raw:o[0],text:r,href:a,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e,t){const o=this.rules.inline.text.exec(e);if(o){let r;return this.lexer.state.inRawBlock?r=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):V(o[0]):o[0]:r=V(this.options.smartypants?t(o[0]):o[0]),{type:"text",raw:o[0],text:r}}}}const A={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Bt,lheading:/^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};A._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;A._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;A.def=z(A.def).replace("label",A._label).replace("title",A._title).getRegex();A.bullet=/(?:[*+-]|\d{1,9}[.)])/;A.listItemStart=z(/^( *)(bull) */).replace("bull",A.bullet).getRegex();A.list=z(A.list).replace(/bull/g,A.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+A.def.source+")").getRegex();A._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";A._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;A.html=z(A.html,"i").replace("comment",A._comment).replace("tag",A._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();A.lheading=z(A.lheading).replace(/bull/g,A.bullet).getRegex();A.paragraph=z(A._paragraph).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.blockquote=z(A.blockquote).replace("paragraph",A.paragraph).getRegex();A.normal={...A};A.gfm={...A.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"};A.gfm.table=z(A.gfm.table).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.gfm.paragraph=z(A._paragraph).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",A.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.pedantic={...A.normal,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",A._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(A.normal._paragraph).replace("hr",A.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",A.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const x={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Bt,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Bt,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};x._uc_punctuation="\\u00A1\\u00A7\\u00AB\\u00B6\\u00B7\\u00BB\\u00BF\\u037E\\u0387\\u055A-\\u055F\\u0589\\u058A\\u05BE\\u05C0\\u05C3\\u05C6\\u05F3\\u05F4\\u0609\\u060A\\u060C\\u060D\\u061B\\u061E\\u061F\\u066A-\\u066D\\u06D4\\u0700-\\u070D\\u07F7-\\u07F9\\u0830-\\u083E\\u085E\\u0964\\u0965\\u0970\\u0AF0\\u0DF4\\u0E4F\\u0E5A\\u0E5B\\u0F04-\\u0F12\\u0F14\\u0F3A-\\u0F3D\\u0F85\\u0FD0-\\u0FD4\\u0FD9\\u0FDA\\u104A-\\u104F\\u10FB\\u1360-\\u1368\\u1400\\u166D\\u166E\\u169B\\u169C\\u16EB-\\u16ED\\u1735\\u1736\\u17D4-\\u17D6\\u17D8-\\u17DA\\u1800-\\u180A\\u1944\\u1945\\u1A1E\\u1A1F\\u1AA0-\\u1AA6\\u1AA8-\\u1AAD\\u1B5A-\\u1B60\\u1BFC-\\u1BFF\\u1C3B-\\u1C3F\\u1C7E\\u1C7F\\u1CC0-\\u1CC7\\u1CD3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205E\\u207D\\u207E\\u208D\\u208E\\u2308-\\u230B\\u2329\\u232A\\u2768-\\u2775\\u27C5\\u27C6\\u27E6-\\u27EF\\u2983-\\u2998\\u29D8-\\u29DB\\u29FC\\u29FD\\u2CF9-\\u2CFC\\u2CFE\\u2CFF\\u2D70\\u2E00-\\u2E2E\\u2E30-\\u2E42\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301F\\u3030\\u303D\\u30A0\\u30FB\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA673\\uA67E\\uA6F2-\\uA6F7\\uA874-\\uA877\\uA8CE\\uA8CF\\uA8F8-\\uA8FA\\uA8FC\\uA92E\\uA92F\\uA95F\\uA9C1-\\uA9CD\\uA9DE\\uA9DF\\uAA5C-\\uAA5F\\uAADE\\uAADF\\uAAF0\\uAAF1\\uABEB\\uFD3E\\uFD3F\\uFE10-\\uFE19\\uFE30-\\uFE52\\uFE54-\\uFE61\\uFE63\\uFE68\\uFE6A\\uFE6B\\uFF01-\\uFF03\\uFF05-\\uFF0A\\uFF0C-\\uFF0F\\uFF1A\\uFF1B\\uFF1F\\uFF20\\uFF3B-\\uFF3D\\uFF3F\\uFF5B\\uFF5D\\uFF5F-\\uFF65";x._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~\\\\"+x._uc_punctuation;x.punctuation=z(x.punctuation).replace(/punctuation/g,x._punctuation).getRegex();x.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;x.escapedPunct=/\\[punct_*]/g;x._comment=z(A._comment).replace("(?:-->|$)","-->").getRegex();x.emStrong.lDelim=z(x.emStrong.lDelim).replace(/punct/g,x._punctuation).getRegex();x.emStrong.rDelimAst=z(x.emStrong.rDelimAst,"g").replace(/punct/g,x._punctuation).getRegex();x.emStrong.rDelimUnd=z(x.emStrong.rDelimUnd,"g").replace(/punct/g,x._punctuation).getRegex();x.escapedPunct=z(x.escapedPunct,"g").replace(/punct/g,x._punctuation).getRegex();x._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;x._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;x._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;x.autolink=z(x.autolink).replace("scheme",x._scheme).replace("email",x._email).getRegex();x._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;x.tag=z(x.tag).replace("comment",x._comment).replace("attribute",x._attribute).getRegex();x._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;x._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;x._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;x.link=z(x.link).replace("label",x._label).replace("href",x._href).replace("title",x._title).getRegex();x.reflink=z(x.reflink).replace("label",x._label).replace("ref",A._label).getRegex();x.nolink=z(x.nolink).replace("ref",A._label).getRegex();x.reflinkSearch=z(x.reflinkSearch,"g").replace("reflink",x.reflink).replace("nolink",x.nolink).getRegex();x.normal={...x};x.pedantic={...x.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",x._label).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",x._label).getRegex()};x.gfm={...x.normal,escape:z(x.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/};x.gfm.url=z(x.gfm.url,"i").replace("email",x.gfm._extended_email).getRegex();x.breaks={...x.gfm,br:z(x.br).replace("{2,}","*").getRegex(),text:z(x.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};function oi(n){return n.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function xo(n){let e="",t,o;const r=n.length;for(t=0;t<r;t++)o=n.charCodeAt(t),Math.random()>.5&&(o="x"+o.toString(16)),e+="&#"+o+";";return e}class Re{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ue,this.options.tokenizer=this.options.tokenizer||new Cn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:A.normal,inline:x.normal};this.options.pedantic?(t.block=A.pedantic,t.inline=x.pedantic):this.options.gfm&&(t.block=A.gfm,this.options.breaks?t.inline=x.breaks:t.inline=x.gfm),this.tokenizer.rules=t}static get rules(){return{block:A,inline:x}}static lex(e,t){return new Re(t).lex(e)}static lexInline(e,t){return new Re(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let t;for(;t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(s,l,u)=>l+"    ".repeat(u.length));let o,r,a,i;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(s=>(o=s.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))){if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length),o.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+o.raw,r.text+=`
`+o.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),t.push(o);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let s=1/0;const l=e.slice(1);let u;this.options.extensions.startBlock.forEach(function(p){u=p.call({lexer:this},l),typeof u=="number"&&u>=0&&(s=Math.min(s,u))}),s<1/0&&s>=0&&(a=e.substring(0,s+1))}if(this.state.top&&(o=this.tokenizer.paragraph(a))){r=t[t.length-1],i&&r.type==="paragraph"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(o),i=a.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length),r=t[t.length-1],r&&r.type==="text"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(o);continue}if(e){const s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let o,r,a,i=e,s,l,u;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)p.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.escapedPunct.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.escapedPunct.lastIndex);for(;e;)if(l||(u=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(o=p.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))){if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),r=t[t.length-1],r&&o.type==="text"&&r.type==="text"?(r.raw+=o.raw,r.text+=o.text):t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length),r=t[t.length-1],r&&o.type==="text"&&r.type==="text"?(r.raw+=o.raw,r.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,i,u)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e,xo)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e,xo))){e=e.substring(o.raw.length),t.push(o);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const m=e.slice(1);let f;this.options.extensions.startInline.forEach(function(g){f=g.call({lexer:this},m),typeof f=="number"&&f>=0&&(p=Math.min(p,f))}),p<1/0&&p>=0&&(a=e.substring(0,p+1))}if(o=this.tokenizer.inlineText(a,oi)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(u=o.raw.slice(-1)),l=!0,r=t[t.length-1],r&&r.type==="text"?(r.raw+=o.raw,r.text+=o.text):t.push(o);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}}class An{constructor(e){this.options=e||Ue}code(e,t,o){const r=(t||"").match(/\S*/)[0];if(this.options.highlight){const a=this.options.highlight(e,r);a!=null&&a!==e&&(o=!0,e=a)}return e=e.replace(/\n$/,"")+`
`,r?'<pre><code class="'+this.options.langPrefix+V(r)+'">'+(o?e:V(e,!0))+`</code></pre>
`:"<pre><code>"+(o?e:V(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,o,r){if(this.options.headerIds){const a=this.options.headerPrefix+r.slug(o);return`<h${t} id="${a}">${e}</h${t}>
`}return`<h${t}>${e}</h${t}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,t,o){const r=t?"ol":"ul",a=t&&o!==1?' start="'+o+'"':"";return"<"+r+a+`>
`+e+"</"+r+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const o=t.header?"th":"td";return(t.align?`<${o} align="${t.align}">`:`<${o}>`)+e+`</${o}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,t,o){if(e=yo(this.options.sanitize,this.options.baseUrl,e),e===null)return o;let r='<a href="'+e+'"';return t&&(r+=' title="'+t+'"'),r+=">"+o+"</a>",r}image(e,t,o){if(e=yo(this.options.sanitize,this.options.baseUrl,e),e===null)return o;let r=`<img src="${e}" alt="${o}"`;return t&&(r+=` title="${t}"`),r+=this.options.xhtml?"/>":">",r}text(e){return e}}class lr{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,o){return""+o}image(e,t,o){return""+o}br(){return""}}class ur{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let o=e,r=0;if(this.seen.hasOwnProperty(o)){r=this.seen[e];do r++,o=e+"-"+r;while(this.seen.hasOwnProperty(o))}return t||(this.seen[e]=r,this.seen[o]=0),o}slug(e,t={}){const o=this.serialize(e);return this.getNextSafeSlug(o,t.dryrun)}}class Be{constructor(e){this.options=e||Ue,this.options.renderer=this.options.renderer||new An,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new lr,this.slugger=new ur}static parse(e,t){return new Be(t).parse(e)}static parseInline(e,t){return new Be(t).parseInline(e)}parse(e,t=!0){let o="",r,a,i,s,l,u,p,m,f,g,B,T,I,E,h,d,v,y,b;const F=e.length;for(r=0;r<F;r++){if(g=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[g.type]&&(b=this.options.extensions.renderers[g.type].call({parser:this},g),b!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(g.type))){o+=b||"";continue}switch(g.type){case"space":continue;case"hr":{o+=this.renderer.hr();continue}case"heading":{o+=this.renderer.heading(this.parseInline(g.tokens),g.depth,ir(this.parseInline(g.tokens,this.textRenderer)),this.slugger);continue}case"code":{o+=this.renderer.code(g.text,g.lang,g.escaped);continue}case"table":{for(m="",p="",s=g.header.length,a=0;a<s;a++)p+=this.renderer.tablecell(this.parseInline(g.header[a].tokens),{header:!0,align:g.align[a]});for(m+=this.renderer.tablerow(p),f="",s=g.rows.length,a=0;a<s;a++){for(u=g.rows[a],p="",l=u.length,i=0;i<l;i++)p+=this.renderer.tablecell(this.parseInline(u[i].tokens),{header:!1,align:g.align[i]});f+=this.renderer.tablerow(p)}o+=this.renderer.table(m,f);continue}case"blockquote":{f=this.parse(g.tokens),o+=this.renderer.blockquote(f);continue}case"list":{for(B=g.ordered,T=g.start,I=g.loose,s=g.items.length,f="",a=0;a<s;a++)h=g.items[a],d=h.checked,v=h.task,E="",h.task&&(y=this.renderer.checkbox(d),I?h.tokens.length>0&&h.tokens[0].type==="paragraph"?(h.tokens[0].text=y+" "+h.tokens[0].text,h.tokens[0].tokens&&h.tokens[0].tokens.length>0&&h.tokens[0].tokens[0].type==="text"&&(h.tokens[0].tokens[0].text=y+" "+h.tokens[0].tokens[0].text)):h.tokens.unshift({type:"text",text:y}):E+=y),E+=this.parse(h.tokens,I),f+=this.renderer.listitem(E,v,d);o+=this.renderer.list(f,B,T);continue}case"html":{o+=this.renderer.html(g.text,g.block);continue}case"paragraph":{o+=this.renderer.paragraph(this.parseInline(g.tokens));continue}case"text":{for(f=g.tokens?this.parseInline(g.tokens):g.text;r+1<F&&e[r+1].type==="text";)g=e[++r],f+=`
`+(g.tokens?this.parseInline(g.tokens):g.text);o+=t?this.renderer.paragraph(f):f;continue}default:{const P='Token with "'+g.type+'" type was not found.';if(this.options.silent){console.error(P);return}else throw new Error(P)}}}return o}parseInline(e,t){t=t||this.renderer;let o="",r,a,i;const s=e.length;for(r=0;r<s;r++){if(a=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]&&(i=this.options.extensions.renderers[a.type].call({parser:this},a),i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type))){o+=i||"";continue}switch(a.type){case"escape":{o+=t.text(a.text);break}case"html":{o+=t.html(a.text);break}case"link":{o+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{o+=t.image(a.href,a.title,a.text);break}case"strong":{o+=t.strong(this.parseInline(a.tokens,t));break}case"em":{o+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{o+=t.codespan(a.text);break}case"br":{o+=t.br();break}case"del":{o+=t.del(this.parseInline(a.tokens,t));break}case"text":{o+=t.text(a.text);break}default:{const l='Token with "'+a.type+'" type was not found.';if(this.options.silent){console.error(l);return}else throw new Error(l)}}}return o}}class It{constructor(e){this.options=e||Ue}preprocess(e){return e}postprocess(e){return e}}jn(It,"passThroughHooks",new Set(["preprocess","postprocess"]));function ri(n,e,t){return o=>{if(o.message+=`
Please report this to https://github.com/markedjs/marked.`,n){const r="<p>An error occurred:</p><pre>"+V(o.message+"",!0)+"</pre>";if(e)return Promise.resolve(r);if(t){t(null,r);return}return r}if(e)return Promise.reject(o);if(t){t(o);return}throw o}}function cr(n,e){return(t,o,r)=>{typeof o=="function"&&(r=o,o=null);const a={...o};o={..._.defaults,...a};const i=ri(o.silent,o.async,r);if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(ti(o,r),o.hooks&&(o.hooks.options=o),r){const s=o.highlight;let l;try{o.hooks&&(t=o.hooks.preprocess(t)),l=n(t,o)}catch(m){return i(m)}const u=function(m){let f;if(!m)try{o.walkTokens&&_.walkTokens(l,o.walkTokens),f=e(l,o),o.hooks&&(f=o.hooks.postprocess(f))}catch(g){m=g}return o.highlight=s,m?i(m):r(null,f)};if(!s||s.length<3||(delete o.highlight,!l.length))return u();let p=0;_.walkTokens(l,function(m){m.type==="code"&&(p++,setTimeout(()=>{s(m.text,m.lang,function(f,g){if(f)return u(f);g!=null&&g!==m.text&&(m.text=g,m.escaped=!0),p--,p===0&&u()})},0))}),p===0&&u();return}if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(t):t).then(s=>n(s,o)).then(s=>o.walkTokens?Promise.all(_.walkTokens(s,o.walkTokens)).then(()=>s):s).then(s=>e(s,o)).then(s=>o.hooks?o.hooks.postprocess(s):s).catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));const s=n(t,o);o.walkTokens&&_.walkTokens(s,o.walkTokens);let l=e(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}function _(n,e,t){return cr(Re.lex,Be.parse)(n,e,t)}_.options=_.setOptions=function(n){return _.defaults={..._.defaults,...n},Hs(_.defaults),_};_.getDefaults=rr;_.defaults=Ue;_.use=function(...n){const e=_.defaults.extensions||{renderers:{},childTokens:{}};n.forEach(t=>{const o={...t};if(o.async=_.defaults.async||o.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if(r.renderer){const a=e.renderers[r.name];a?e.renderers[r.name]=function(...i){let s=r.renderer.apply(this,i);return s===!1&&(s=a.apply(this,i)),s}:e.renderers[r.name]=r.renderer}if(r.tokenizer){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");e[r.level]?e[r.level].unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),o.extensions=e),t.renderer){const r=_.defaults.renderer||new An;for(const a in t.renderer){const i=r[a];r[a]=(...s)=>{let l=t.renderer[a].apply(r,s);return l===!1&&(l=i.apply(r,s)),l}}o.renderer=r}if(t.tokenizer){const r=_.defaults.tokenizer||new Cn;for(const a in t.tokenizer){const i=r[a];r[a]=(...s)=>{let l=t.tokenizer[a].apply(r,s);return l===!1&&(l=i.apply(r,s)),l}}o.tokenizer=r}if(t.hooks){const r=_.defaults.hooks||new It;for(const a in t.hooks){const i=r[a];It.passThroughHooks.has(a)?r[a]=s=>{if(_.defaults.async)return Promise.resolve(t.hooks[a].call(r,s)).then(u=>i.call(r,u));const l=t.hooks[a].call(r,s);return i.call(r,l)}:r[a]=(...s)=>{let l=t.hooks[a].apply(r,s);return l===!1&&(l=i.apply(r,s)),l}}o.hooks=r}if(t.walkTokens){const r=_.defaults.walkTokens;o.walkTokens=function(a){let i=[];return i.push(t.walkTokens.call(this,a)),r&&(i=i.concat(r.call(this,a))),i}}_.setOptions(o)})};_.walkTokens=function(n,e){let t=[];for(const o of n)switch(t=t.concat(e.call(_,o)),o.type){case"table":{for(const r of o.header)t=t.concat(_.walkTokens(r.tokens,e));for(const r of o.rows)for(const a of r)t=t.concat(_.walkTokens(a.tokens,e));break}case"list":{t=t.concat(_.walkTokens(o.items,e));break}default:_.defaults.extensions&&_.defaults.extensions.childTokens&&_.defaults.extensions.childTokens[o.type]?_.defaults.extensions.childTokens[o.type].forEach(function(r){t=t.concat(_.walkTokens(o[r],e))}):o.tokens&&(t=t.concat(_.walkTokens(o.tokens,e)))}return t};_.parseInline=cr(Re.lexInline,Be.parseInline);_.Parser=Be;_.parser=Be.parse;_.Renderer=An;_.TextRenderer=lr;_.Lexer=Re;_.lexer=Re.lex;_.Tokenizer=Cn;_.Slugger=ur;_.Hooks=It;_.parse=_;_.options;_.setOptions;_.use;_.walkTokens;_.parseInline;Be.parse;Re.lex;const ai=/[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g,si=Object.hasOwnProperty;class ii{constructor(){this.occurrences,this.reset()}slug(e,t){const o=this;let r=li(e,t===!0);const a=r;for(;si.call(o.occurrences,r);)o.occurrences[a]++,r=a+"-"+o.occurrences[a];return o.occurrences[r]=0,r}reset(){this.occurrences=Object.create(null)}}function li(n,e){return typeof n!="string"?"":(e||(n=n.toLowerCase()),n.replace(ai,"").replace(/ /g,"-"))}let Do;function ui({prefix:n=""}={}){return{headerIds:!1,hooks:{preprocess(e){return Do=new ii,e}},renderer:{heading(e,t,o){return o=o.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,""),`<h${t} id="${n}${Do.slug(o)}">${e}</h${t}>
`}}}}function ci(){return{mangle:!1,walkTokens(n){if(n.type!=="link"||!n.href.startsWith("mailto:"))return;const e=n.href.substring(7),t=di(e);n.href=`mailto:${t}`,!(n.tokens.length!==1||n.tokens[0].type!=="text"||n.tokens[0].text!==e)&&(n.text=t,n.tokens[0].text=t)}}}function di(n){let e="",t,o;const r=n.length;for(t=0;t<r;t++)o=n.charCodeAt(t),Math.random()>.5&&(o="x"+o.toString(16)),e+="&#"+o+";";return e}var dr={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(o){var r=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,a=0,i={},s={manual:o.Prism&&o.Prism.manual,disableWorkerMessageHandler:o.Prism&&o.Prism.disableWorkerMessageHandler,util:{encode:function h(d){return d instanceof l?new l(d.type,h(d.content),d.alias):Array.isArray(d)?d.map(h):d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(h){return Object.prototype.toString.call(h).slice(8,-1)},objId:function(h){return h.__id||Object.defineProperty(h,"__id",{value:++a}),h.__id},clone:function h(d,v){v=v||{};var y,b;switch(s.util.type(d)){case"Object":if(b=s.util.objId(d),v[b])return v[b];y={},v[b]=y;for(var F in d)d.hasOwnProperty(F)&&(y[F]=h(d[F],v));return y;case"Array":return b=s.util.objId(d),v[b]?v[b]:(y=[],v[b]=y,d.forEach(function(P,S){y[S]=h(P,v)}),y);default:return d}},getLanguage:function(h){for(;h;){var d=r.exec(h.className);if(d)return d[1].toLowerCase();h=h.parentElement}return"none"},setLanguage:function(h,d){h.className=h.className.replace(RegExp(r,"gi"),""),h.classList.add("language-"+d)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(y){var h=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(y.stack)||[])[1];if(h){var d=document.getElementsByTagName("script");for(var v in d)if(d[v].src==h)return d[v]}return null}},isActive:function(h,d,v){for(var y="no-"+d;h;){var b=h.classList;if(b.contains(d))return!0;if(b.contains(y))return!1;h=h.parentElement}return!!v}},languages:{plain:i,plaintext:i,text:i,txt:i,extend:function(h,d){var v=s.util.clone(s.languages[h]);for(var y in d)v[y]=d[y];return v},insertBefore:function(h,d,v,y){y=y||s.languages;var b=y[h],F={};for(var P in b)if(b.hasOwnProperty(P)){if(P==d)for(var S in v)v.hasOwnProperty(S)&&(F[S]=v[S]);v.hasOwnProperty(P)||(F[P]=b[P])}var N=y[h];return y[h]=F,s.languages.DFS(s.languages,function(G,se){se===N&&G!=h&&(this[G]=F)}),F},DFS:function h(d,v,y,b){b=b||{};var F=s.util.objId;for(var P in d)if(d.hasOwnProperty(P)){v.call(d,P,d[P],y||P);var S=d[P],N=s.util.type(S);N==="Object"&&!b[F(S)]?(b[F(S)]=!0,h(S,v,null,b)):N==="Array"&&!b[F(S)]&&(b[F(S)]=!0,h(S,v,P,b))}}},plugins:{},highlightAll:function(h,d){s.highlightAllUnder(document,h,d)},highlightAllUnder:function(h,d,v){var y={callback:v,container:h,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};s.hooks.run("before-highlightall",y),y.elements=Array.prototype.slice.apply(y.container.querySelectorAll(y.selector)),s.hooks.run("before-all-elements-highlight",y);for(var b=0,F;F=y.elements[b++];)s.highlightElement(F,d===!0,y.callback)},highlightElement:function(h,d,v){var y=s.util.getLanguage(h),b=s.languages[y];s.util.setLanguage(h,y);var F=h.parentElement;F&&F.nodeName.toLowerCase()==="pre"&&s.util.setLanguage(F,y);var P=h.textContent,S={element:h,language:y,grammar:b,code:P};function N(se){S.highlightedCode=se,s.hooks.run("before-insert",S),S.element.innerHTML=S.highlightedCode,s.hooks.run("after-highlight",S),s.hooks.run("complete",S),v&&v.call(S.element)}if(s.hooks.run("before-sanity-check",S),F=S.element.parentElement,F&&F.nodeName.toLowerCase()==="pre"&&!F.hasAttribute("tabindex")&&F.setAttribute("tabindex","0"),!S.code){s.hooks.run("complete",S),v&&v.call(S.element);return}if(s.hooks.run("before-highlight",S),!S.grammar){N(s.util.encode(S.code));return}if(d&&o.Worker){var G=new Worker(s.filename);G.onmessage=function(se){N(se.data)},G.postMessage(JSON.stringify({language:S.language,code:S.code,immediateClose:!0}))}else N(s.highlight(S.code,S.grammar,S.language))},highlight:function(h,d,v){var y={code:h,grammar:d,language:v};if(s.hooks.run("before-tokenize",y),!y.grammar)throw new Error('The language "'+y.language+'" has no grammar.');return y.tokens=s.tokenize(y.code,y.grammar),s.hooks.run("after-tokenize",y),l.stringify(s.util.encode(y.tokens),y.language)},tokenize:function(h,d){var v=d.rest;if(v){for(var y in v)d[y]=v[y];delete d.rest}var b=new m;return f(b,b.head,h),p(h,b,d,b.head,0),B(b)},hooks:{all:{},add:function(h,d){var v=s.hooks.all;v[h]=v[h]||[],v[h].push(d)},run:function(h,d){var v=s.hooks.all[h];if(!(!v||!v.length))for(var y=0,b;b=v[y++];)b(d)}},Token:l};o.Prism=s;function l(h,d,v,y){this.type=h,this.content=d,this.alias=v,this.length=(y||"").length|0}l.stringify=function h(d,v){if(typeof d=="string")return d;if(Array.isArray(d)){var y="";return d.forEach(function(N){y+=h(N,v)}),y}var b={type:d.type,content:h(d.content,v),tag:"span",classes:["token",d.type],attributes:{},language:v},F=d.alias;F&&(Array.isArray(F)?Array.prototype.push.apply(b.classes,F):b.classes.push(F)),s.hooks.run("wrap",b);var P="";for(var S in b.attributes)P+=" "+S+'="'+(b.attributes[S]||"").replace(/"/g,"&quot;")+'"';return"<"+b.tag+' class="'+b.classes.join(" ")+'"'+P+">"+b.content+"</"+b.tag+">"};function u(h,d,v,y){h.lastIndex=d;var b=h.exec(v);if(b&&y&&b[1]){var F=b[1].length;b.index+=F,b[0]=b[0].slice(F)}return b}function p(h,d,v,y,b,F){for(var P in v)if(!(!v.hasOwnProperty(P)||!v[P])){var S=v[P];S=Array.isArray(S)?S:[S];for(var N=0;N<S.length;++N){if(F&&F.cause==P+","+N)return;var G=S[N],se=G.inside,$e=!!G.lookbehind,ht=!!G.greedy,zt=G.alias;if(ht&&!G.pattern.global){var Ht=G.pattern.toString().match(/[imsuy]*$/)[0];G.pattern=RegExp(G.pattern.source,Ht+"g")}for(var Xe=G.pattern||G,q=y.next,$=b;q!==d.tail&&!(F&&$>=F.reach);$+=q.value.length,q=q.next){var xe=q.value;if(d.length>h.length)return;if(!(xe instanceof l)){var J=1,te;if(ht){if(te=u(Xe,$,h,$e),!te||te.index>=h.length)break;var Ie=te.index,j=te.index+te[0].length,ne=$;for(ne+=q.value.length;Ie>=ne;)q=q.next,ne+=q.value.length;if(ne-=q.value.length,$=ne,q.value instanceof l)continue;for(var De=q;De!==d.tail&&(ne<j||typeof De.value=="string");De=De.next)J++,ne+=De.value.length;J--,xe=h.slice($,ne),te.index-=$}else if(te=u(Xe,0,xe,$e),!te)continue;var Ie=te.index,Ae=te[0],ze=xe.slice(0,Ie),Ve=xe.slice(Ie+Ae.length),ye=$+xe.length;F&&ye>F.reach&&(F.reach=ye);var ie=q.prev;ze&&(ie=f(d,ie,ze),$+=ze.length),g(d,ie,J);var Qe=new l(P,se?s.tokenize(Ae,se):Ae,zt,Ae);if(q=f(d,ie,Qe),Ve&&f(d,q,Ve),J>1){var Pe={cause:P+","+N,reach:ye};p(h,d,v,q.prev,$,Pe),F&&Pe.reach>F.reach&&(F.reach=Pe.reach)}}}}}}function m(){var h={value:null,prev:null,next:null},d={value:null,prev:h,next:null};h.next=d,this.head=h,this.tail=d,this.length=0}function f(h,d,v){var y=d.next,b={value:v,prev:d,next:y};return d.next=b,y.prev=b,h.length++,b}function g(h,d,v){for(var y=d.next,b=0;b<v&&y!==h.tail;b++)y=y.next;d.next=y,y.prev=d,h.length-=b}function B(h){for(var d=[],v=h.head.next;v!==h.tail;)d.push(v.value),v=v.next;return d}if(!o.document)return o.addEventListener&&(s.disableWorkerMessageHandler||o.addEventListener("message",function(h){var d=JSON.parse(h.data),v=d.language,y=d.code,b=d.immediateClose;o.postMessage(s.highlight(y,s.languages[v],v)),b&&o.close()},!1)),s;var T=s.util.currentScript();T&&(s.filename=T.src,T.hasAttribute("data-manual")&&(s.manual=!0));function I(){s.manual||s.highlightAll()}if(!s.manual){var E=document.readyState;E==="loading"||E==="interactive"&&T&&T.defer?document.addEventListener("DOMContentLoaded",I):window.requestAnimationFrame?window.requestAnimationFrame(I):window.setTimeout(I,16)}return s}(e);n.exports&&(n.exports=t),typeof no<"u"&&(no.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(o){o.type==="entity"&&(o.attributes.title=o.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(r,a){var i={};i["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[a]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};s["language-"+a]={pattern:/[\s\S]+/,inside:t.languages[a]};var l={};l[r]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return r}),"i"),lookbehind:!0,greedy:!0,inside:s},t.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(o,r){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+o+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[r,"language-"+r],inside:t.languages[r]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(o){var r=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;o.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+r.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+r.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+r.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+r.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:r,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},o.languages.css.atrule.inside.rest=o.languages.css;var a=o.languages.markup;a&&(a.tag.addInlined("style","css"),a.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var o="Loading…",r=function(T,I){return"✖ Error "+T+" while fetching file: "+I},a="✖ Error: File does not exist or is empty",i={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},s="data-src-status",l="loading",u="loaded",p="failed",m="pre[data-src]:not(["+s+'="'+u+'"]):not(['+s+'="'+l+'"])';function f(T,I,E){var h=new XMLHttpRequest;h.open("GET",T,!0),h.onreadystatechange=function(){h.readyState==4&&(h.status<400&&h.responseText?I(h.responseText):h.status>=400?E(r(h.status,h.statusText)):E(a))},h.send(null)}function g(T){var I=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(T||"");if(I){var E=Number(I[1]),h=I[2],d=I[3];return h?d?[E,Number(d)]:[E,void 0]:[E,E]}}t.hooks.add("before-highlightall",function(T){T.selector+=", "+m}),t.hooks.add("before-sanity-check",function(T){var I=T.element;if(I.matches(m)){T.code="",I.setAttribute(s,l);var E=I.appendChild(document.createElement("CODE"));E.textContent=o;var h=I.getAttribute("data-src"),d=T.language;if(d==="none"){var v=(/\.(\w+)$/.exec(h)||[,"none"])[1];d=i[v]||v}t.util.setLanguage(E,d),t.util.setLanguage(I,d);var y=t.plugins.autoloader;y&&y.loadLanguages(d),f(h,function(b){I.setAttribute(s,u);var F=g(I.getAttribute("data-range"));if(F){var P=b.split(/\r\n?|\n/g),S=F[0],N=F[1]==null?P.length:F[1];S<0&&(S+=P.length),S=Math.max(0,Math.min(S-1,P.length)),N<0&&(N+=P.length),N=Math.max(0,Math.min(N,P.length)),b=P.slice(S,N).join(`
`),I.hasAttribute("data-start")||I.setAttribute("data-start",String(S+1))}E.textContent=b,t.highlightElement(E)},function(b){I.setAttribute(s,p),E.textContent=b})}}),t.plugins.fileHighlight={highlight:function(I){for(var E=(I||document).querySelectorAll(m),h=0,d;d=E[h++];)t.highlightElement(d)}};var B=!1;t.fileHighlight=function(){B||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),B=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(dr);var hi=dr.exports;const pi=Ho(hi);(function(n){n.languages.typescript=n.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),n.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete n.languages.typescript.parameter,delete n.languages.typescript["literal-property"];var e=n.languages.extend("typescript",{});delete e["class-name"],n.languages.typescript["class-name"].inside=e,n.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),n.languages.ts=n.languages.typescript})(Prism);_.use(ui());_.use(ci());const mi=zs(window),dt=({content:n})=>{const e=Qo(),t=ge(()=>mi.sanitize(_.parse(n),{ADD_ATTR:["target","src","style","frameBorder"],ADD_TAGS:["iframe"]}),n);return ct(()=>{if(!e.value)return;pi.highlightAll(),e.value.querySelectorAll(".markdown-container pre[class*='language-']").forEach(r=>{r.addEventListener("click",()=>{const a=r.textContent;a!==null&&navigator.clipboard.writeText(a).then(()=>{alert("Snippet copied !")}).catch(i=>{console.error("Failed to copy text to clipboard:",i)})})}),e.value.querySelectorAll("a").forEach(r=>{const a=r.getAttribute("href");a&&wn(a)&&r.setAttribute("href",qo(a)??"")});const o=location.hash;o.trim()&&setTimeout(()=>{var a;const r=(a=e.value)==null?void 0:a.querySelector(o);r==null||r.scrollIntoView()},100)},n),createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:"markdown-container w-100%",ref:e,innerHTML:t}))},hr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20132%20130.96'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:url(%23linear-gradient);}.cls-2{fill:url(%23linear-gradient-2);}.cls-3{fill:url(%23linear-gradient-3);}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='33.43'%20y1='18.71'%20x2='89.12'%20y2='18.71'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23e1e1e1'/%3e%3cstop%20offset='1'%20stop-color='%23818181'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='5.95'%20y1='6.91'%20x2='95.98'%20y2='147.81'%20xlink:href='%23linear-gradient'/%3e%3clinearGradient%20id='linear-gradient-3'%20x1='37.37'%20y1='-13.16'%20x2='127.4'%20y2='127.74'%20xlink:href='%23linear-gradient'/%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='OBJECTS'%3e%3cpath%20class='cls-1'%20d='M49.31,0H82.69a6.41,6.41,0,0,1,5,10.43L66,37.42l-21.68-27A6.41,6.41,0,0,1,49.31,0Z'/%3e%3cpath%20class='cls-2'%20d='M17.05,0,5.49,18A34.58,34.58,0,0,0,7.62,58.33L66,131l28.21-35.1L17.16,0Z'/%3e%3cpath%20class='cls-3'%20d='M115,0l11.55,18a34.58,34.58,0,0,1-2.13,40.35L66,131,37.79,95.86,114.84,0Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",pr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20132%20130.96'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:url(%23linear-gradient);}.cls-2{fill:url(%23linear-gradient-2);}.cls-3{fill:url(%23linear-gradient-3);}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='33.43'%20y1='18.71'%20x2='89.12'%20y2='18.71'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%231e1e1e'/%3e%3cstop%20offset='1'%20stop-color='%237e7e7e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='5.95'%20y1='6.91'%20x2='95.98'%20y2='147.81'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%237e7e7e'/%3e%3cstop%20offset='1'%20stop-color='%231e1e1e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-3'%20x1='37.37'%20y1='-13.16'%20x2='127.4'%20y2='127.74'%20xlink:href='%23linear-gradient-2'/%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='OBJECTS'%3e%3cpath%20class='cls-1'%20d='M49.31,0H82.69a6.41,6.41,0,0,1,5,10.43L66,37.42l-21.68-27A6.41,6.41,0,0,1,49.31,0Z'/%3e%3cpath%20class='cls-2'%20d='M17.05,0,5.49,18A34.58,34.58,0,0,0,7.62,58.33L66,131l28.21-35.1L17.16,0Z'/%3e%3cpath%20class='cls-3'%20d='M115,0l11.55,18a34.58,34.58,0,0,1-2.13,40.35L66,131,37.79,95.86,114.84,0Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",mr=()=>!!(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches),rn=n=>`@apply ${n.join(" ")}`,Pt=n=>Ja().substring(0,n.length)===n,fi=()=>mr()?hr:pr,At=n=>{const{children:e,type:t,class:o}=n,r=ge(()=>rn(t==="fill"?["border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]","bg-[color:var(--secondary)] hover:bg-[color:var(--secondary-hover)]"]:t==="outline"?["border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]","hover:bg-[color:var(--secondary)]","bg-transparent"]:["bg-transparent hover:bg-[color:var(--secondary)]","border-transparent","color-[var(--text-low)] hover:color-[var(--text)]"]),t);return createJsxElement("button",{...n,class:Ko("p-x-4 p-y-2 cursor-pointer rounded",r,o)},e)},fr=()=>createJsxElement("div",{class:"text-center m-t-auto text-[var(--text-lowest)] text-[0.8em]"},createJsxElement("p",null,"Released under the MIT License."),createJsxElement("p",null,"Copyright © 2023-present Riadh Adrani"));var he=(n=>(n.Dark="dark",n.Light="light",n.Device="device",n))(he||{});const fe=["0.5.0","0.5.2","0.5.3","0.5.4","0.5.5","0.5.6"],gi=(n,e)=>{const[t,o,r]=_e(localStorage.getItem(n)!==null?JSON.parse(localStorage.getItem(n)):e);return ct(()=>{localStorage.setItem(n,JSON.stringify(t))},[t]),[t,o,r]},bi=()=>{const[n,e]=_e({width:window.innerWidth,height:window.innerHeight});return ct(()=>{const t=()=>{const{innerHeight:o,innerWidth:r}=window;e({height:o,width:r})};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)}),n},gr=En("scroll",()=>{const[n,e]=_e([]),t=Qo(document.body.querySelector("#app")),o=bi();return ct(()=>{if(t.value){if(o.width>766){t.value.style.maxHeight="",t.value.style.overflowY="";return}t.value.style.maxHeight=n.length>0?"100vh":"",t.value.style.overflowY=n.length>0?"hidden":""}},[n,o]),[()=>e([...n,0]),()=>{e(n.slice(0,n.length-1))}]}),yi=En("markdown",()=>{const[n,e]=_e({});return{record:n,getEntry:o=>o in n?n[o]:(fetch(o).then(async r=>{const a=await r.text();e(i=>({...i,[o]:a}))}),"")}}),br=n=>{const{getEntry:e}=yi();return e(n)},$t=En("app",()=>{const[n,e]=gi("@riadh-adrani-ruvy-docs-theme",he.Device),[t,o]=_e(!1),[r,a]=_e(fe.at(-1)),[i,s]=gr(),l=ge(()=>n!==he.Device?n:mr()?he.Dark:he.Light,n);ct(()=>{var f;(f=document.querySelector(":root"))==null||f.setAttribute("data-theme",l);const m=document.querySelector("link[rel~='icon']");m&&(m.href=fi())},l);const u=hn(m=>{const f=m??l===he.Dark?he.Light:he.Dark;e(f)},n),p=hn(m=>{const f=na(m)?m:!t;f?i():s(),o(f)},t);return{theme:n,computedTheme:l,version:r,setVersion:a,toggleNav:p,toggleTheme:u,isNavOpen:t}}),yr=()=>{const{computedTheme:n}=$t();return ge(()=>n===he.Dark?hr:pr,n)},vi=()=>{const n=ge(()=>["```bash","npm install @riadh-adrani/ruvy","```"].join(`
`)),e=yr();return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:"col-center flex-1"},createJsxElement("div",{class:"col-center gap-5 flex-1 p-b-20"},createJsxElement("div",{class:"col-center"},createJsxElement("img",{src:e,class:"h-150px w-150px"}),createJsxElement("h1",{class:"text-72px text-center",style:{background:"linear-gradient(var(--text-lowest),var(--text))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}},"Ruvy")),createJsxElement("p",{class:"text-center m-b-5 color-[var(--text-low)]"},"Ruvy is a lightweight front-end framework inspired by the principles of React, designed specifically for learning purposes. It incorporates familiar concepts such as JSX, function components, and hooks, providing a simplified and synchronous approach to building web applications."),createJsxElement("div",{class:"row self-center gap-4 m-b-5"},createJsxElement("a",{href:"/learn"},createJsxElement(At,{type:"fill"},"Get Started")),createJsxElement("a",{href:"/docs"},createJsxElement(At,{type:"fill"},"Browse Docs")),createJsxElement("a",{href:"https://stackblitz.com/edit/ruvy-dbjavf?file=src%2Fmain.tsx",target:"_blank"},createJsxElement(At,{type:"fill"},"Try on StackBlitz"))),createJsxElement("div",{class:"cursor-pointer home-create-bash rounded self-center"},createJsxElement(dt,{content:n??""}))),createJsxElement(fr,null)))},wi=`# Introduction

Welcome to the Ruvy.js documentation!

---

## What is Ruvy.js ?

Ruvy is a lightweight front-end framework inspired by the principles of React, designed specifically for learning purposes. It incorporates familiar concepts such as JSX, function components, and hooks, providing a simplified and synchronous approach to building web applications.

---

## Main features

- JSX syntax for writing expressive and reusable UI components.
- Function components for a modular and composable code structure.
- Hooks for managing state, performing side effects, and custom logic reuse.
- Synchronous rendering for a straightforward and beginner-friendly development experience.
- Intuitive API that closely resembles React's patterns and conventions.
- Built-in router very similar to \`React Router DOM\`.
- Built-in global stores with \`composables\`.

---

## Pre-Requisite Knowledge

Before diving into our framework, it is essential to have a solid foundation in a few key technologies. Familiarity with JavaScript is crucial, as our framework heavily relies on JavaScript for building interactive web applications. Additionally, having a good understanding of TypeScript will enhance your development experience, as TypeScript provides type-checking and static analysis capabilities.

<br/>

A solid grasp of HTML and CSS is also necessary, as these languages form the backbone of web development. Being comfortable with structuring web pages and styling elements will empower you to create visually appealing and well-structured user interfaces.

<br/>

While not mandatory, some prior experience with other frameworks, particularly React, can be highly beneficial. React has influenced our framework's design and architecture, so having exposure to React's concepts, such as JSX, function components, and hooks, will accelerate your learning and understanding of our framework.

<br/>

With a solid understanding of JavaScript, TypeScript, HTML, CSS, and some exposure to other frameworks like React, you will be well-equipped to leverage the full potential of our framework and unlock a world of creative possibilities in building modern web applications.
`,xi=[{from:"0.5.0",md:wi}],Ne=n=>{const{children:e,class:t,isActive:o}=n,r=ge(()=>{let a="p-x-2 text-[0.9em]";return o?a+=" color-[var(--link)]":a+=" color-[var(--text-low)] hover:color-[var(--text-strong)]",Ko(a,t)},[t,o]);return createJsxElement("a",{...n,class:r},e)},vr=()=>createJsxElement("div",null,createJsxElement("h1",null,"Not found"),createJsxElement(Ne,{href:"/",class:"p-x-0!"},"Go back to Home page")),Tt=({versions:n})=>{const{version:e}=$t(),t=ge(()=>{const o=fe.indexOf(e);if(o===-1)throw"invalid version";for(const r of n){if(r.from===e||r.to===e)return r.md;const a=fe.indexOf(r.from);if(r.to){const i=fe.indexOf(r.to);if(a<=o&&o<=i)return r.md}else if(a<=o)return r.md}},[e,n]);return t?createJsxElement(dt,{content:t}):createJsxElement(vr,null)},Di=()=>createJsxElement(createJsxFragmentElement,null,createJsxElement(Tt,{versions:xi})),ki="data:text/markdown;base64,IyBBY2tub3dsZWRnbWVudAoKV2Ugd291bGQgbGlrZSB0byBleHByZXNzIG91ciBoZWFydGZlbHQgYXBwcmVjaWF0aW9uIHRvIHRoZSBSZWFjdCB0ZWFtIGZvciB0aGVpciBleGNlcHRpb25hbCB3b3JrIGFuZCB0aGUgaW5jcmVkaWJsZSBjb250cmlidXRpb25zIHRoZXkgaGF2ZSBtYWRlIHRvIHRoZSB3b3JsZCBvZiBmcm9udC1lbmQgZGV2ZWxvcG1lbnQuIFJlYWN0IGhhcyBiZWVuIGFuIGltbWVuc2Ugc291cmNlIG9mIGluc3BpcmF0aW9uIGZvciBvdXIgZnJhbWV3b3JrLCBhbmQgd2UgYWNrbm93bGVkZ2UgdGhlIHNpZ25pZmljYW50IGltcGFjdCBpdCBoYXMgaGFkIG9uIHNoYXBpbmcgdGhlIHdlYiBkZXZlbG9wbWVudCBsYW5kc2NhcGUuCgo8YnIvPgoKV2Ugd291bGQgYWxzbyBsaWtlIHRvIGV4dGVuZCBvdXIgZ3JhdGl0dWRlIHRvIENoYXQgR1BULCB0aGUgcG93ZXJmdWwgbGFuZ3VhZ2UgbW9kZWwgdGhhdCBoYXMgYmVlbiBhbiBpbnZhbHVhYmxlIGNvbXBhbmlvbiB0aHJvdWdob3V0IHRoZSBzZWFyY2ggcHJvY2VzcyBhbmQgdGhlIGNyZWF0aW9uIG9mIHRoaXMgZG9jdW1lbnRhdGlvbi4gSXRzIHJlbWFya2FibGUgY2FwYWJpbGl0aWVzIGhhdmUgZ3JlYXRseSBhc3Npc3RlZCB1cyBpbiBwcm92aWRpbmcgYWNjdXJhdGUgYW5kIGhlbHBmdWwgaW5mb3JtYXRpb24gdG8gb3VyIHVzZXJzLgoKPGJyLz4KCkZ1cnRoZXJtb3JlLCB3ZSB3b3VsZCBsaWtlIHRvIHRoYW5rIHRoZSBlbnRpcmUgd2ViIGNvbW11bml0eSBmb3IgdGhlaXIgY29udGludW91cyBkZWRpY2F0aW9uIHRvIGltcHJvdmluZyB0aGUgdG9vbHMgYW5kIHRlY2hub2xvZ2llcyB0aGF0IGRyaXZlIHRoZSB3ZWIgZm9yd2FyZC4gVGhlIGNvbGxlY3RpdmUgZWZmb3J0IGFuZCBwYXNzaW9uIHdpdGhpbiB0aGUgY29tbXVuaXR5IGhhdmUgZm9zdGVyZWQgYW4gZW52aXJvbm1lbnQgb2YgY29sbGFib3JhdGlvbiwgaW5ub3ZhdGlvbiwgYW5kIHRoZSBwdXJzdWl0IG9mIGV4Y2VsbGVuY2UuCgo8YnIvPgoKSXQgaXMgdGhyb3VnaCB0aGUgY29sbGFib3JhdGlvbiBhbmQgZGVkaWNhdGlvbiBvZiB0aGVzZSBpbmRpdmlkdWFscyBhbmQgdGVhbXMgdGhhdCB3ZSBoYXZlIGJlZW4gYWJsZSB0byBjcmVhdGUgb3VyIGZyYW1ld29yayBhbmQgcHJvdmlkZSBkZXZlbG9wZXJzIGxpa2UgeW91IHdpdGggYSBwb3dlcmZ1bCBhbmQgaW50dWl0aXZlIHRvb2xzZXQgZm9yIGJ1aWxkaW5nIGV4Y2VwdGlvbmFsIHdlYiBhcHBsaWNhdGlvbnMuIFdlIGFyZSBncmF0ZWZ1bCBmb3IgdGhlaXIgb25nb2luZyBjb250cmlidXRpb25zIGFuZCB0aGUgcG9zaXRpdmUgaW1wYWN0IHRoZXkgaGF2ZSBoYWQgb24gb3VyIGpvdXJuZXkuCgo8YnIvPgoKVGhhbmsgeW91IGFsbCBmb3IgeW91ciBpbnNwaXJpbmcgd29yaywgdW53YXZlcmluZyBzdXBwb3J0LCBhbmQgY29tbWl0bWVudCB0byBwdXNoaW5nIHRoZSBib3VuZGFyaWVzIG9mIHdoYXQgaXMgcG9zc2libGUgaW4gd2ViIGRldmVsb3BtZW50Lgo=",Fi=()=>{const n=br(ki);return createJsxElement(createJsxFragmentElement,null,createJsxElement(dt,{content:n}))},Ei="data:text/markdown;base64,IyBNYWRlIHdpdGggUnV2eQoKIyMjIGBVbmRlciBjb25zdHJ1Y3Rpb24uLi5gCg==",Ci=()=>{const n=br(Ei);return createJsxElement(createJsxFragmentElement,null,createJsxElement(dt,{content:n}))},Ai=`# Types

<br/>

## \`PortalProps\`

\`\`\`ts
type PortalProps = PropsWithUtility<{ container: Element }>;
\`\`\`

Props used for [\`<Portal/>\`](/docs/api/portal) component.

<br/>

@see [\`PropsWithUtility\`](#propswithutility)

---

## \`PortalBranchType\`

\`\`\`ts
type PortalBranchType = typeof Portal;
\`\`\`

Branch type for [\`<Portal/>\`](/docs/api/portal) component.

---

## \`Namespace\`

\`\`\`ts
enum Namespace {
  HTML = 'http://www.w3.org/1999/xhtml',
  SVG = 'http://www.w3.org/2000/svg',
  MATH = 'http://www.w3.org/1998/Math/MathML',
}
\`\`\`

Accepted namespaces for DOM element rendering.

---

## \`BranchTag\`

\`\`\`ts
enum BranchTag {
  Function = '#-function-branch',
  Element = '#-element-branch',
  Root = '#-root-branch',
  Fragment = '#-fragment-branch',
  Text = '#-text-branch',
  Null = '#-null-branch',
  Outlet = '#-outlet-branch',
  Context = '#-context-branch',
  Portal = '#-portal-branch',
  Conditional = '#-conditional-branch',
}
\`\`\`

Enumeration of the possible Branch tags.

---

## \`BranchTag\`

\`\`\`ts
enum HookType {
  State = '#-use-state',
  Effect = '#-use-effect',
  Memo = '#-use-Memo',
  Ref = '#-use-ref',
  Context = '#-use-context',
  Reactive = '#-use-reactive',
  Promise = '#-use-promise',
}
\`\`\`

Enumeration of the possible Hook types.

---

## \`BranchStatus\`

\`\`\`ts
enum BranchStatus {
  Mounted = '#-mounted',
  Mounting = '#-pending',
  Unmounting = '#-un-mounting',
  Unmounted = '#-un-mounted',
}
\`\`\`

Includes branch status.

---

## \`ActionType\`

\`\`\`ts
enum ActionType {
  Render = '#-action-render-element',
  Reorder = '#-action-order-elements',
  Cleanup = '#-action-clean-effect',
  Effect = '#-action-run-effect',
  Unmount = '#-action-unmount-element',
  UpdateProps = '#-action-update-props',
  UpdateText = '#-action-text-node',
  Unmounted = '#-action-unmounted',
  RemoveBranch = '#-action-remove-branch',
  UpdatePortalChildren = '#-action-update-portal-children',
}
\`\`\`

Enumeration of the different commit action types.

---

## \`UseMemoData\`

\`\`\`ts
interface UseMemoData<T = unknown> {
  deps: unknown;
  value: T;
}
\`\`\`

Schema of the data store in a [\`useMemo\`](/docs/api/useMemo) hook.

---

## \`UseMemoParams\`

\`\`\`ts
interface UseMemoParams<T = unknown> {
  callback: () => T;
  deps?: unknown;
}
\`\`\`

Schema of the data needed for [\`useMemo\`](/docs/api/useMemo) hook.

---

## \`UseRefData\`

\`\`\`ts
interface UseRefData<T = unknown> {
  value: T;
}
\`\`\`

Schema of the data store in [\`useRef\`](/docs/api/useRef) hook.

---

## \`Effect\`

\`\`\`ts
type Effect = Callback<Callback | void>;
\`\`\`

Type for multiple effects creator, like the [\`useEffect\`](/docs/api/useEffect) hook.

---

## \`UseEffectData\`

\`\`\`ts
interface UseEffectData {
  deps: unknown;
  callback: Effect;
  cleanUp?: Effect;
  pendingEffect?: Effect;
  pendingCleanUp?: Effect;
}
\`\`\`

Schema of the data store in [\`useEffect\`](/docs/api/useEffect) hook.

---

## \`UseEffectParams\`

\`\`\`ts
type UseEffectParams = Pick<UseEffectData, 'callback' | 'deps'>;
\`\`\`

Schema of the data needed for [\`useEffect\`](/docs/api/useEffect) hook.

<br/>

@see [\`UseEffectData\`](#useeffectdata)

---

## \`BranchProps\`

\`\`\`ts
type BranchProps = Record<string, unknown>;
\`\`\`

Describe object storing a branch props.

---

## \`BranchHooks\`

\`\`\`ts
type BranchHooks = Record<string, HookData<unknown>>;
\`\`\`

Describe object storing a branch hooks.

<br/>

@see [\`HookData\`](#hookdata)

---

## \`BranchKey\`

\`\`\`ts
type BranchKey = string | number;
\`\`\`

Valid types of a branch/component key.

---

## \`BranchTemplate\`

\`\`\`ts
interface BranchTemplate<T = unknown> {
  type: T;
  props: Record<string, unknown>;
  children: Array<unknown>;
  symbol: typeof BranchSymbol;
  key?: BranchKey;
}
\`\`\`

Describes template generated by \`JSX\` components.

<br/>

@see [\`BranchKey\`](#branchkey)

---

## \`BranchTemplateFunction\`

\`\`\`ts
type BranchTemplateFunction = BranchTemplate<CallbackWithArgs<[Record<string, unknown>], unknown>>;
\`\`\`

Describes template generated by a \`JSX\` functional component.

<br/>

@see [\`BranchTemplate\`](#branchtemplate)

---

## \`FragmentType\`

\`\`\`ts
type FragmentType = typeof createFragmentTemplate;
\`\`\`

Branch type of a \`JSX\` fragment element.

---

## \`BranchTemplateFragment\`

\`\`\`ts
type BranchTemplateFragment = BranchTemplate<FragmentType>;
\`\`\`

Describes template generated by a fragment \`JSX\` component.

<br/>

@see [\`BranchTemplate\`](#branchtemplate), [\`FragmentType\`](#fragmenttype)

---

## \`HookDispatcher\`

\`\`\`ts
type HookDispatcher<D, R> = (key: string, data: D, current: Branch) => R;
\`\`\`

Describes a common hook dispatcher.

<br/>

@see [\`Branch\`](#branch)

---

## \`BranchAction\`

\`\`\`ts
interface BranchAction {
  type: ActionType;
  requestTime: number;
  callback: Callback;
  debug?: unknown;
}
\`\`\`

Schema of a commit action.

<br/>

@see [\`ActionType\`](#actiontype)

---

## \`Branch\`

\`\`\`ts
interface Branch<Type = unknown> {
  text?: string;
  tag: BranchTag;
  type: Type;
  props: BranchProps;
  hooks: BranchHooks;
  pendingActions: Array<BranchAction>;
  parent?: Branch;
  status: BranchStatus;
  children: Array<Branch>;
  instance?: Node;
  key: BranchKey;
  old?: Branch;
  unmountedChildren: Array<Branch>;
}
\`\`\`

Schema of a Branch, the equivalent of a \`Fiber\` in \`React\`.

<br/>

@see [\`BranchTag\`](#branchtag), [\`BranchProps\`](#branchprops), [\`BranchHooks\`](#branchhooks), [\`BranchAction\`](#branchaction), [\`BranchStatus\`](#branchstatus), [\`BranchKey\`](#branchkey)

---

## \`PropDiff\`

\`\`\`ts
interface PropDiff<T = unknown> {
  prop: string;
  value: T;
  op: 'set' | 'update' | 'remove';
  priority: number;
}
\`\`\`

Result of an element's prop diffing operation.

---

## \`RuvyNode\`

\`\`\`ts
type RuvyNode = BranchTemplate | string | boolean | null | undefined | number;
\`\`\`

Possible types of a Ruvy \`JSX\` element.

<br/>

@see [\`BranchTemplate\`](#branchtemplate)

---

## \`RuvyNode\`

\`\`\`ts
type RuvyNode = BranchTemplate | string | boolean | null | undefined | number;
\`\`\`

Possible types of a Ruvy \`JSX\` element.

<br/>

@see [\`BranchTemplate\`](#branchtemplate)

---

## \`ContextObject\`

\`\`\`ts
interface ContextObject<T = unknown> {
  Provider: (props: ContextComponentProps<T>) => BranchTemplate<BranchTag.Context>;
}
\`\`\`

Object schema created by the [\`createContext\`](/docs/api/createContext) method.

<br/>

@see [\`BranchTemplate\`](#branchtemplate), [\`ContextComponentProps\`](#contextcomponentprops), [\`BranchTag\`](#branchtag)

---

## \`ContextComponentProps\`

\`\`\`ts
interface ContextComponentProps<T = unknown> {
  value: T;
  children?: Array<unknown>;
}
\`\`\`

Props needed for a context provider component.

---

## \`ComponentHandler\`

### \`@deprecated\`

\`\`\`ts
interface ComponentHandler<B = unknown, T = BranchTemplate, D = unknown> {
  create: (template: T, parent: Branch, key: BranchKey, data?: D) => Branch<B>;
  diff: (template: T, current: Branch<B>, data?: D) => Array<unknown>;
}
\`\`\`

Describe a common component handler generator.

<br/>

@see [\`BranchTemplate\`](#branchtemplate), [\`Branch\`](#branch), [\`BranchKey\`](#branchkey),

---

## \`ComponentFunctionHandler\`

\`\`\`ts
type ComponentFunctionHandler<T = BranchTemplate, B = unknown, D = unknown> = (
  template: T,
  current: Branch<B> | undefined,
  parent: Branch,
  key: BranchKey,
  data?: D
) => { branch: Branch<B>; unprocessedChildren: Array<unknown> };
\`\`\`

Describe a common component handler.

<br/>

@see [\`BranchTemplate\`](#branchtemplate), [\`Branch\`](#branch), [\`BranchKey\`](#branchkey),

---

## \`MountParams\`

\`\`\`ts
interface MountParams {
  hostElement: HTMLElement;
  callback: Callback<JSX.Element>;
}
\`\`\`

Describe parameters needed to mount a \`Ruvy\` app.

<br/>

---

## \`CommonRoute\`

\`\`\`ts
interface CommonRoute<T = unknown> {
  path: string;
  redirectTo?: string;
  title?: string;
  name?: string;
  component: T;
}
\`\`\`

Common routing properties.

<br/>

---

## \`RawRoute\`

\`\`\`ts
interface RawRoute<T = unknown> extends CommonRoute<T> {
  routes?: Array<RawRoute<T>>;
}
\`\`\`

Route schema for Router initialization.

<br/>

@see [\`CommonRoute\`](#commonroute)

---

## \`Route\`

\`\`\`ts
interface Route<T = unknown> extends CommonRoute<T> {
  fragments: Array<string>;
  isDynamic: boolean;
}
\`\`\`

Processed Router's route schema.

<br/>

@see [\`CommonRoute\`](#commonroute)

<br/>

---

## \`TransformTitle\`

\`\`\`ts
type TransformTitle = (title: string) => string;
\`\`\`

Transform current route's title before applying it.

---

## \`RouterConstructorParams\`

\`\`\`ts
interface RouterConstructorParams {
  onStateChange: Callback;
  base?: string;
  scrollToTop?: boolean;
  titleSuffix?: string;
  titlePrefix?: string;
  transformTitle?: TransformTitle;
}
\`\`\`

Router constructor parameters.

<br/>

@see [\`TransformTitle\`](#transformtitle)

## <br/>

## \`RouterParams\`

\`\`\`ts
interface RouterParams {
  onStateChange: Callback;
  base?: string;
  scrollToTop?: boolean;
  titleSuffix?: string;
  titlePrefix?: string;
}
\`\`\`

Parameters schema for [\`createRouter\`](/docs/api/createRouter)

<br/>

---

## \`StoreItem\`

\`\`\`ts
interface StoreItem<T = unknown> {
  key: string;
  value: T;
  history: Array<T>;
  creationIndex: number;
}
\`\`\`

Global store item instance schema.

<br/>

---

## \`StoreEffect\`

\`\`\`ts
interface StoreEffect {
  key: string;
  dep: unknown;
  effect: EffectCallback;
  called: number;
  shouldRun: boolean;
  cleanUp?: Callback;
}
\`\`\`

Global store effect instance schema.

<br/>

@see [\`EffectCallback\`](#effectcallback)

---

## \`EffectCallback\`

\`\`\`ts
type EffectCallback = Callback<void | Callback>;
\`\`\`

Globally stored effect.

---

## \`StoreItemSetter\`

\`\`\`ts
type StoreItemSetter<T = unknown> = (key: string, value: T) => void;
\`\`\`

Globally stored item's setter.

---

## \`StoreItemGetter\`

\`\`\`ts
type StoreItemGetter<T = unknown> = (key: string) => T;
\`\`\`

Globally stored item's getter.

---

## \`StoreItemCleaner\`

\`\`\`ts
type StoreItemCleaner = (item: StoreItem, wasUsed: boolean) => void;
\`\`\`

Globally stored item's cleaner.

---

## \`StoreItemUpdate\`

\`\`\`ts
type StoreItemUpdate<T = unknown> = (key: string, value: T) => void;
\`\`\`

Globally stored item's update function.

---

## \`StoreEffectSetter\`

\`\`\`ts
type StoreEffectSetter = (key: string, effect: EffectCallback, dep: unknown) => void;
\`\`\`

Globally stored effect's setter.

---

## \`StoreEffectRunner\`

\`\`\`ts
type StoreEffectRunner = (item: StoreEffect) => void;
\`\`\`

---

## \`StoreEffectCleaner\`

\`\`\`ts
type StoreEffectCleaner = (item: StoreEffect, wasUsed: boolean) => void;
\`\`\`

---

## \`StoreCollection\`

\`\`\`ts
interface StoreCollection<T> {
  name: string;
  items: Record<string, T>;
  used: Array<string>;
}
\`\`\`

---

## \`StoreItemsCollection\`

\`\`\`ts
interface StoreItemsCollection extends StoreCollection<StoreItem> {
  set: StoreItemSetter;
  get: StoreItemGetter;
  clean: StoreItemCleaner;
  update: StoreItemUpdate;
}
\`\`\`

---

## \`StoreEffectsCollection\`

\`\`\`ts
interface StoreEffectsCollection extends StoreCollection<StoreEffect> {
  runner: StoreEffectRunner;
  clean: StoreEffectCleaner;
  set: StoreEffectSetter;
}
\`\`\`

---

## \`SetStateCallback\`

\`\`\`ts
type SetStateCallback<T> = (currentValue: T) => T;
\`\`\`

callback used as a setter for [\`useState\`](/docs/api/useState).

---

## \`StateSetter\`

\`\`\`ts
type StateSetter<T> = (valeuOrSetter: T | SetStateCallback<T>) => void;
\`\`\`

setter function returned by [\`useState\`](/docs/api/useState).

<br/>

@see [\`SetStateCallback\`](#setstatecallback)

---

## \`StateGetter\`

\`\`\`ts
type StateGetter<T> = Callback<T>;
\`\`\`

getter function returned by [\`useState\`](/docs/api/useState).

---

## \`StateInitializer\`

\`\`\`ts
type StateInitializer<T> = Callback<T>;
\`\`\`

a state initializer function provided to [\`useState\`](/docs/api/useState).

---

## \`StateArray\`

\`\`\`ts
type StateArray<T> = [T, StateSetter<T>, StateGetter<T>];
\`\`\`

a state initializer function provided to [\`useState\`](/docs/api/useState).

<br/>

@see [\`StateSetter\`](#statesetter), [\`StateGetter\`](#stategetter)

---

## \`Any\`

\`\`\`ts
type Any = any;
\`\`\`

helper type.

---

## \`PropsWithChildren\`

### \`@deprecated\`

\`\`\`ts
type PropsWithChildren<T extends object> = { children?: Array<RuvyNode> } & T;
\`\`\`

---

## \`CallbackWithArgs\`

\`\`\`ts
type CallbackWithArgs<A extends Array<unknown> = [], R = void> = (...args: A) => R;
\`\`\`

---

## \`DOMEventTarget\`

\`\`\`ts
type DOMEventTarget<T extends Element> = Event & T;
\`\`\`

---

## \`DOMEvent\`

\`\`\`ts
type DOMEvent<E extends Event = Event, T extends Element = HTMLElement> = Event &
  E & {
    target: DOMEventTarget<HTMLElement>;
    currentTarget: DOMEventTarget<T>;
  };
\`\`\`

---

## \`DOMEventHandler\`

\`\`\`ts
type DOMEventHandler<E extends Event = Event, T extends Element = HTMLElement> = (
  event: DOMEvent<E, T>
) => void;
\`\`\`

---

## \`Selector\`

\`\`\`ts
type Selector = { [key in keyof CSS.Properties]: Arrayable<CSS.Properties[key]> } & Record<
  string,
  unknown
>;
\`\`\`

---

## \`UtilityProps\`

\`\`\`ts
interface UtilityProps {
  children: Array<RuvyNode>;
  key: BranchKey;
  if: boolean;
  else: unknown;
  'else-if': boolean;
  switch: unknown;
  case: unknown;
  'case:default': unknown;
}
\`\`\`

---

## \`PropsWithUtility\`

\`\`\`ts
type PropsWithUtility<T extends object = object> = Partial<UtilityProps> & T;
\`\`\`

@see [\`UtilityProps\`](#utilityprops)

---

## \`NamedNavigationRequest\`

\`\`\`ts
interface NamedNavigationRequest {
  name: string;
  params?: Record<string, string | number>;
  search?: Record<string, string | number>;
}
\`\`\`

---

## \`NavigationRequest\`

\`\`\`ts
type NavigationRequest = number | string | NamedNavigationRequest;
\`\`\`

@see [\`NamedNavigationRequest\`](#namednavigationrequest)
`,ko=`# replace

\`replace\` lets you replace the current route without adding a new entry in the \`hsitory\` object.

<hr/>

### Type & Parameters

\`\`\`ts
function replace(request: Exclude<NavigationRequest, number>): void;
\`\`\`

The only parameter is \`request\` of type [\`NavigationRequest\`](/docs/types#navigationrequest) omitting \`number\`.

<hr/>

### Notes ⚠️

- Unlike \`navigate\`, \`replace\` override the newest entry in the \`history\` object.

<hr/>

### Example

#### Replace with a path string

\`\`\`ts
// ...

replace('/sign-in');

// ...
\`\`\`

#### Replace with a named route

\`\`\`ts
//...

replace({ name: 'Home' });

//...
\`\`\`

#### Replace with a named dynamic route

\`\`\`ts
//...

replace({ name: 'UserPage', params: { id: 1 } });

//...
\`\`\`
`,Fo=`# batch

\`batch\` lets you batch state updates in a single one.

<hr/>

### Type & Parameters

\`\`\`ts
function batch<T>(callback: Callback): T;
\`\`\`

The only parameter is the \`callback\` that contains multiple state updates.

<hr/>

### Notes ⚠️

- \`batch\` callback should not be asynchronous or it will not do its intended job.

<hr/>

### Example

#### Updating multiple states after an asynchronous api fetch

\`\`\`ts
import { useEffect, batch } from '@riadh-adrani/ruvy';

function User() {
  // ...

  useEffect(() => {
    fetchData().then(data => {
      // maybe perform data checking here

      // and here we batch all our state updates
      batch(() => {
        setData(data);
        setLoading(false);
      });
    });
  });

  // ...
}
\`\`\`
`,Ti=`# createStore

\`createStore\` is a function that lets you create a new global store, accessed from anywhere.

<hr/>

### Type & Parameters

\`\`\`ts
function createStore<T>(key: string, initialValue: T): [StateGetter<T>, (value: T) => void];
\`\`\`

accepts two parameters :

- \`key\` : a unique string identifying the state within the global state store.
- \`initialState\` : initialize the state value.

<br/>

### Returns

\`createStore\` returns a [StateArray](/docs/types#statearray) omitting the first value.

<hr/>

### Notes ⚠️

- \`createStore\` will throw when a store with the same name is already created.

<hr/>

### Example

\`\`\`ts
import { createStore } from '@riadh-adrani/ruvy';

// create a store outside the component scope
const [getCount, setCount] = createStore('count', 0);

function MyComponent() {
  function onClickHandler() {
    setCount(getCount() + 1);
  }

  return <div onClick={onClickHandler}>{getCount()}</div>;
}
\`\`\`
`,Si=`# createRouter

\`createrRouter\` allows the user to initialize a router that uses the \`DOM History API\` to update the URL and react to any changes.

<hr/>

### Type & Parameters

\`\`\`ts
function createRouter(routes: Array<RawRoute<RuvyNode>>, params: RouterParams): void;
\`\`\`

acceps two arguments:

<br/>

- \`routes\` : the list of routes in the app, could be nested.
- \`params\` : an object containing additional routing config:
  - <small>_\`base\`_</small> : (optional) The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.
  - <small>_\`scrolToTop\`_</small> : (optional) auto scroll the window to the top when a new page loads.
  - <small>_\`titleSuffix\`_</small> : (optional) text to be added to all routes as a suffix.
  - <small>_\`titlePrefix\`_</small> : (optional) text to be added to all routes as a prefix.
  - <small>_\`transformTitle\`_</small> : (optional) transform title before applying it.

<hr/>

### Route entry

A route entry is of type [\`RawRoute\`](/docs/types#rawroute) composed of the following keys:

<br/>

- \`path\` : the path of the route or the segment of route.
- \`component\` : the component representing the route.
- \`name\` : (optional) a globally unique name.
- \`title\` : (optional) the tab bar title of the route.
- \`redirectTo\` : (optional) a redirection full path.

<hr/>

### Dynamic routes

Like React Router or any other routing system, you only need to add \`:\` before the route name to indicate that it is a dynamic one like \`:id\` (nested) or \`/user/:id\` (flat).

<hr/>

### Notes ⚠️

- You need to use this method before calling \`mountApp\` to create a new router correctly.
- Calling this methid twice will override the previous settings.
- The \`routes\` parameter accept a mix of nested and flat routes.
- When using nested routes, add a slash \`/\` only for the first level of routes.
- Dynamic routes will be matched the last.
- Use an anchor element \`<a/>\` as the equivalent of \`<Link/>\` with \`href\` being the \`to\` attribute, e.g: \`<a href="/">Home</a>\`.
- Using \`e.preventDefault()\` on a sibling or parents of the anchor tag will cause the navigation effect to fail, because it relies on the event being propagated to the \`window\` object. you can use [\`navigate\`](/docs/api/navigate) or [\`replace\`](/docs/api/replace) instead.

<hr/>

### Examples

#### \`Creating a simple router\`

\`\`\`ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    { path: '/', component: <Home />, title: 'Home' },
    { path: '/docs', component: <Docs />, title: 'Docs' },
  ],
  {}
);
\`\`\`

#### \`Creating nested routes\`

\`\`\`ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    {
      path: '/',
      component: <Home />,
      title: 'Home',
      name: 'Home',
      routes: [
        { path: 'docs', component: <Docs />, title: 'Docs' },
        { path: 'help', component: <Help />, title: 'Help' },
      ],
    },
  ],
  {}
);
\`\`\`

#### \`A mix of flat and nested routes\`

\`\`\`ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    {
      path: '/',
      component: <Home />,
      title: 'Home',
      routes: [
        { path: 'docs', component: <Docs />, title: 'Docs' },
        { path: 'help', component: <Help />, title: 'Help' },
      ],
    },
    {
      path: '/examples',
      component: <Examples />,
      title: 'Example',
    },
  ],
  {}
);
\`\`\`

#### \`Dynamic routes\`

\`\`\`ts
import { createRouter } from '@riadh-adrani/ruvy';

createRouter(
  [
    { path: '/', component: <Home />, title: 'Home' },
    {
      path: '/user',
      name: 'User',
      component: <User />,
      title: 'Docs',
      routes: [{ path: ':id', name: 'UserId', component: <UserSecion /> }],
    },
  ],
  {}
);
\`\`\`
`,_i=`# createRouter

\`createrRouter\` allows the user to initialize a router that uses the \`DOM History API\` to update the URL and react to any changes.

<hr/>

### Type & Parameters

\`\`\`ts
function createRouter(options: RouterOptions): void;
\`\`\`

options support the given properties :

<br/>

- \`routes\` : an arrat of the app's routes, could be nested.
- \`correctScrolling\` : (optional) auto scroll the window to the top when a new page loads.
- \`base\` : (optional) The basename of the app for situations where you can't deploy to the root of the domain, but a sub directory.
- \`transformTitle\` : (optional) a function used to transform title before applying it.
- \`type\` : (optional) specify router type \`Browser\` or \`Hash\`. \`Browser\` by default.

<hr/>

### Routes Entries

> Router types are re-exported from [\`@riadh-adrani/dom-router\`](https://github.com/RiadhAdrani/dom-router?tab=readme-ov-file#types)

#### \`Layout Raw Route\`

Used to wrap routes in a layout :

\`\`\`ts
interface LayoutRawRoute<T = unknown> {
  element: T;
  children?: Array<RawRoute<T>>;
}
\`\`\`

#### \`Path Raw Route\`

Used for both wrapping path/layout entries :

\`\`\`ts
interface PathRawRoute<T = unknown> {
  path: string;
  name?: string;
  element?: T;
  title?: string;
  children?: Array<RawRoute<T>>;
}
\`\`\`

#### \`Index Raw Route\`

Used to define the main/index path of a nested \`PathRoute\`. Will be considered only when nested within a \`PathRawRoute\`

\`\`\`ts
interface IndexRawRoute<T = unknown> {
  path: '';
  name?: string;
  element?: T;
  title?: string;
}
\`\`\`

#### \`Catch Raw Route\`

Used to define a catch route.

\`\`\`ts
interface CatchRawRoute<T = unknown> {
  path: '*';
  title?: string;
  element?: T;
}
\`\`\`

### Dynamic routes

Like React Router or any other routing system, you only need to add \`:\` before the route name to indicate that it is a dynamic one like \`:id\` (nested) or \`/user/:id\` (flat).

<hr/>

### Notes ⚠️

- You need to use this method before calling \`mountApp\` to create a new router correctly.
- The \`routes\` parameter accept a mix of nested and flat routes.
- Dynamic routes will be matched the last.
- Use an anchor element \`<a/>\` as the equivalent of \`<Link/>\` with \`href\` being the \`to\` attribute, e.g: \`<a href="/">Home</a>\`.
- Using \`e.preventDefault()\` on a sibling or parents of the anchor tag will cause the navigation effect to fail, because it relies on the event being propagated to the \`window\` object. you can use [\`navigate\`](/docs/api/navigate).

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-tvwwac?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,Ri=[{from:"0.5.0",to:"0.5.0",md:Si},{from:"0.5.2",md:_i}],Bi=`# createComposable

\`createContext\` lets you create a global store and return a getter \`hook\`.

<hr/>

### Type & Parameters

\`\`\`ts
function createComposable<T>(name: string, callback: () => T): () => T;
\`\`\`

- name : a globally unique name.
- callback : a callback returning any values or methods.

<br/>

### Returns

createComposable returns a \`hook\` that can be used inside a functional component.

<br/>

### Notes ⚠️

- You can use all \`hooks\` except for \`useContext\`, which will throw an exception.
- throws if name is already used by another composable.
- throws if it is called inside a functional component or another composable.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-lqiij9?embed=1&file=src%2FCount.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,Ii=[{from:"0.5.2",md:Bi}],Pi=`# createContext

\`createContext\` lets you create a context that components can provide or read.

<hr/>

### Type & Parameters

\`\`\`ts
function createContext<T>(object: T): ContextObject<T>;
\`\`\`

The only parameter is \`object\`, which is the initial value of the context.

<br/>

### Returns

createContext returns a [\`ContextObject\`](/docs/types#contextobject).

<br/>

The context object itself does not hold any information. It represents which context other components read or provide. Typically, you will use \`Context.Provider\` in components above to specify the context value, and call [\`useContext(Context)\`](/docs/api/useContext) in components below to read it. The context object has a single property, \`Context.Provider\` that lets you provide the context value to components.

<hr/>

### Example

#### Creating the context and using Context.Provider

\`\`\`ts
import { useState, createContext, useContext } from '@riadh-adrani/ruvy';

// creating a new context object.
const CountContext = createContext(0);

function Parent() {
  const [count, setCount] = useState(0);

  // surrounding the child with a Context.Provider
  return <CountContext.Provider value={count}><Child/></CountContext.Provider/>
}

function Child() {
  // consuming the context
  const count = useContext(CountContext)

  return <div>{count}</div>
}
\`\`\`
`,Mi=`# createContext

\`createContext\` lets you create a context that components can provide or read.

<hr/>

### Type & Parameters

\`\`\`ts
function createContext<T>(init?: T): ContextObject<T>;
\`\`\`

The only parameter is \`init\`, which is optional. Use generic \`T\` to type context value in \`Typescript\`.

<br/>

### Returns

createContext returns a [\`ContextObject\`](/docs/types#contextobject).

<br/>

The context object itself does not hold any information. It represents which context other components read or provide. Typically, you will use \`Context.Provider\` in components above to specify the context value, and call [\`useContext(Context)\`](/docs/api/useContext) or \`ContextObject.use()\` in components below to read it. The context object has multiple properties:

<br/>

- \`Context.Provider\` : lets you provide the context value to components.
- \`id\` : generated id, used internally by the framework to identify the context.
- \`use\` : shorthand function to be used instead of \`useContext(ContextObject)\`.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-jewpid?embed=1&file=src%2FCount.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,Li=[{from:"0.5.0",to:"0.5.0",md:Pi},{from:"0.5.2",md:Mi}],Ni=`# mountApp

\`mountApp\` let's you mount your application and render it inside a browser DOM node.

<hr/>

### Type & Parameters

\`\`\`ts
function mountApp(params: MountParams): void;
\`\`\`

The only parameter is the \`params\` object of type [\`MountParams\`](/docs/types#mountparams), which contains multiple options :

<br/>

- _\`hostElement\`_ (required) : A DOM element. Ruvy will use it to render the app.
- _\`callback\`_ (required) : A callback returning a JSX element, it represent your app.

<hr/>

### Notes ⚠️

- contrary to \`React\`, \`Ruvy\` allows the user to create **only a single app** in a given document, so if you try to call \`mountApp\` twice or more, you won't get two running apps.

<hr/>

### Example

Mounting an "Hello World" app

\`\`\`ts
import { mountApp } from '@riadh-adrani/ruvy';

const App = () => <div>Hello World</div>;

const host = document.body;

// mounting the app
mountApp({ hostElement: host, callback: App });
\`\`\`
`,Oi=`# mountApp

\`mountApp\` let's you mount your application and render it inside a browser DOM node.

<hr/>

### Type & Parameters

\`\`\`ts
function mountApp(params: MountParams): void;
\`\`\`

The only parameter is the \`params\` object of type [\`MountParams\`](/docs/types#mountparams), which contains multiple options :

<br/>

- _\`host\`_ (required) : A DOM element in which the application will be injected.
- _\`app\`_ (required) : a ruvy template.

<hr/>

### Notes ⚠️

- contrary to \`React\`, \`Ruvy\` allows the user to create **only a single app** in a given document, so if you try to call \`mountApp\` twice or more, you won't get two running apps.

<hr/>

### Example

<br/>

<iframe src="https://stackblitz.com/edit/ruvy-c7vnhf?embed=1&file=src%2Fmain.tsx&hideExplorer=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
`,Ui=[{from:"0.5.0",to:"0.5.0",md:Ni},{from:"0.5.2",md:Oi}],$i=`# useState

\`useState\` is a hook that lets you add a state variable inside a component.

<hr/>

### Type & Parameters

\`\`\`ts
function useState<T>(initialState: T): StateArray<T>;
\`\`\`

The only parameter is the \`initialState\`, which as its name suggests, initialize the state value, it can be a intializer callback like \`React\`.

<br/>

### Returns

\`useState\` returns a [StateArray](/docs/types#statearray), which is an array of three values:

1. \`value\` : The current state, which will take the value of \`initialState\` during the first render.
2. \`setter\`: a function that lets you update the state which will trigger a re-render, accepts a callback with the current state as the argument.
3. \`getter\` : a function that returns the current value of the state. useful when trying to access the state value within an _asynchronous function_ .

<hr/>

### Notes ⚠️

- useState is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

<hr/>

### Example

\`\`\`ts
import { useState } from '@riadh-adrani/ruvy';

function MyComponent() {
  const [count, setCount] = useState(42);

  function onClickHandler() {
    setCount(count + 1);
  }

  return <div onClick={onClickHandler}>{count}</div>;
}
\`\`\`
`,zi=`# useState

\`useState\` is a hook that lets you add a state variable inside a component.

<hr/>

### Type & Parameters

\`\`\`ts
function useState<T>(initialState: T): UseState<T>;
\`\`\`

The only parameter is the \`initialState\`, which as its name suggests, initialize the state value, it can be a intializer callback like \`React\`.

<br/>

### Returns

\`useState\` returns a [UseState](/docs/types#statearray) object, which is an array of three values:

1. \`value\` : The current state, which will take the value of \`initialState\` during the first render.
2. \`setter\`: a function that lets you update the state which will trigger a re-render, accepts a callback with the current state as the argument.
3. \`getter\` : a function that returns the current value of the state. useful when trying to access the state value within an _asynchronous function_ .

<hr/>

### Notes ⚠️

- useState is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-7fb6t1?embed=1&file=src%2FButton.tsx&hideExplorer=1&hideNavigation=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
`,Hi=[{from:"0.5.0",to:"0.5.0",md:$i},{from:"0.5.2",md:zi}],Ji=`# useEffect

\`useEffect\` is a hook that lets synchronize your component with an external

<hr/>

### Type & Parameters

\`\`\`ts
function useEffect(callback: Effect, deps?: unknown): void;
\`\`\`

accepts two parameters:

- \`callback\` : of type [\`Effect\`](/docs/types#effect), it is a setup function that may also return a cleanup function. When the component is mounted, the framework will run your function, and each time dependencies changes, the \`cleanup\` function will be executed and the effect will run again. The \`cleanup\` function runs one last time when the component is unmounted.

- \`deps\` (optional) : an object or a list of values that \`useEffect\` should track in order to rerun the callback and the cleanup functions.

<hr/>

### Notes ⚠️

- Avoid updating state unconditionally inside \`useEffect\` as that might cause an infinite-loop of rerenders.
- The cleanup functions will run each time the \`deps\` provided changes, and when the component is unmounted.
- Unlike \`React\`, deps could be any object, an array is not mandatory.
- Unlike \`React\`, the default behavior without deps is to run once.

<hr/>

### Example

#### Subscribing to an external system

\`\`\`ts
import { useState, useEffect } from '@riadh-adrani/ruvy';

function MyComponent() {
  const [data, setData] = useState(0);

  useEffect(() => {
    const connection = createConnection('some-data-api-url').subscribe(it => setData(id));

    return () => connection.disconnect();
  });

  return <div>{data}</div>;
}
\`\`\`
`,ji=`# useEffect

\`useEffect\` is a hook that lets synchronize your component with an external

<hr/>

### Type & Parameters

\`\`\`ts
function useEffect(callback: Effect, deps?: unknown): void;
\`\`\`

accepts two parameters:

- \`callback\` : of type [\`Effect\`](/docs/types#effect), it is a setup function that may also return a cleanup function. When the component is mounted, the framework will run your function, and each time dependencies changes, the \`cleanup\` function will be executed and the effect will run again. The \`cleanup\` function runs one last time when the component is unmounted.

- \`deps\` (optional) : an object or a list of values that \`useEffect\` should track in order to rerun the callback and the cleanup functions.

<hr/>

### Notes ⚠️

- Avoid updating state unconditionally inside \`useEffect\` as that might cause an infinite-loop of rerenders.
- The cleanup functions will run each time the \`deps\` provided changes, and when the component is unmounted.
- Unlike \`React\`, deps could be any object, an array is not mandatory.
- Unlike \`React\`, the default behavior without deps is to run once.

<hr/>

### Example

<br/>

<iframe src="https://stackblitz.com/edit/ruvy-gnkbsq?embed=1&file=src%2FStopWatch.tsx&hideExplorer=1&hideNavigation=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
`,Wi=[{from:"0.5.0",to:"0.5.0",md:Ji},{from:"0.5.2",md:ji}],Gi=`# useMemo

\`useMemo\` is a hook that lets cache the result of a calculation between re-renders.

<hr/>

### Type & Parameters

\`\`\`ts
function useMemo<T>(callback: () => T, deps?: unknown): T;
\`\`\`

accepts two parameters:

- \`callback\` : The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type.

- \`deps\` (optional) : an object or a list of values that will trigger the recomputation of the cached value when they changes.

<hr/>

### Notes ⚠️

- Unlike \`React\`, deps could be any object, an array is not mandatory.
- Unlike \`React\`, the default behavior without deps is to memoize once.

<hr/>

### Example

#### Memoize an array of items

\`\`\`ts
import { useMemo } from '@riadh-adrani/ruvy';

function TodoList({ todos }: { todos: Array<ToDo> }) {
  const visibleTodos = useMemo(() => filterTodos(todos), [todos]);
  // ...
}
\`\`\`

On every subsequent render, Ruvy will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared deeply), useMemo will return the value you already calculated before. Otherwise, the calculation will re-run which will return a new value.

In other words, useMemo caches a calculation result between re-renders until its dependencies change.
`,qi=`# useMemo

\`useMemo\` is a hook that lets cache the result of a calculation between re-renders.

<hr/>

### Type & Parameters

\`\`\`ts
function useMemo<T>(callback: () => T, deps?: unknown): T;
\`\`\`

accepts two parameters:

- \`callback\` : The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type.

- \`deps\` (optional) : an object or a list of values that will trigger the recomputation of the cached value when they changes.

<br/>

On every subsequent render, Ruvy will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared deeply), useMemo will return the value you already calculated before. Otherwise, the calculation will re-run which will return a new value.

In other words, \`useMemo\` caches a calculation result between re-renders until its dependencies change.

<hr/>

### Notes ⚠️

- Unlike \`React\`, deps could be any object, an array is not mandatory.
- Unlike \`React\`, the default behavior without deps is to memoize once.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-ycuqms?embed=1&file=src%2FList.tsx&hideExplorer=1&hideNavigation=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
`,Zi=[{from:"0.5.0",to:"0.5.0",md:Gi},{from:"0.5.2",md:qi}],Yi=`# useCallback

\`useCallback\` is a hook that lets you cache a function definition between re-renders.

<hr/>

### Type & Parameters

\`\`\`ts
function useCallback<T>(callback: T, deps?: unknown): T;
\`\`\`

accepts two parameters:

- \`callback\` : The function that will be memoized

- \`deps\` (optional) : The list of all reactive values referenced inside of the \`callback\` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.

<hr/>

### Notes ⚠️

- Unlike \`React\`, deps could be any object, an array is not mandatory.
- Unlike \`React\`, the default behavior without deps is to memoize the callback once.

<hr/>

### Example

#### Memoize event handlers

\`\`\`ts
import { useCallback, useState } from '@riadh-adrani/ruvy';

function Component() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => setCount(count + 1), count);

  return <button onClick={onClick}>{count}</button>;
}
\`\`\`
`,Xi=`# useCallback

\`useCallback\` is a hook that lets you cache a function definition between re-renders.

<hr/>

### Type & Parameters

\`\`\`ts
function useCallback<T>(callback: T, deps?: unknown): T;
\`\`\`

accepts two parameters:

- \`callback\` : The function that will be memoized

- \`deps\` (optional) : The list of all reactive values referenced inside of the \`callback\` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body.

<hr/>

### Notes ⚠️

- Unlike \`React\`, deps could be any object, an array is not mandatory.
- Unlike \`React\`, the default behavior without deps is to memoize the callback once.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-zbkr1h?embed=1&file=src%2FButton.tsx&hideExplorer=1&hideNavigation=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
`,Vi=[{from:"0.5.0",to:"0.5.0",md:Yi},{from:"0.5.2",md:Xi}],Qi=`# useId

\`useId\` is a hook for generating unique IDs that can be passed to accessibility attributes.

<hr/>

### Type & Parameters

\`\`\`ts
function useId(length?: number): string;
\`\`\`

The function accepts one optional parameter which is the \`length\` of the generated ID.

<br/>

### Returns

\`useId \`returns a unique ID string associated with this particular \`useId\` call in this particular component.

<hr/>

### Notes ⚠️

- Like \`React\`, do not call useId to generate keys in a list. Keys should be generated from your data.
- IDs generated by this method are a random concatenation of \`letters\`, \`-\` , \`_\` or \`numbers\`, which means they are not always suitable as a \`class\` or an \`id\`, because they may start with a number. A workaround is to prefix it with an \`underscore (_)\` or a \`hyphen (-)\` or any letter.

<hr/>

### Example

\`\`\`ts
import { useId } from '@riadh-adrani/ruvy';

function MyComponent() {
  const id = useId();

  // ...
}
\`\`\`
`,Ki=`# useId

\`useId\` is a hook for generating unique IDs that can be passed to accessibility attributes.

<hr/>

### Type & Parameters

\`\`\`ts
function useId(): string;
\`\`\`

<br/>

### Returns

\`useId\` returns a unique ID string associated with this particular \`hook\` call in this particular component.

<hr/>

### Notes ⚠️

- Like \`React\`, do not call useId to generate keys in a list. Keys should be generated from your data.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-qlgy4g?embed=1&file=src%2FButton.tsx&hideExplorer=1&hideNavigation=1" frameBorder="0" style="width:100%;height:500px;"></iframe>
`,el=[{from:"0.5.0",to:"0.5.0",md:Qi},{from:"0.5.2",md:Ki}],tl=`# useContext

\`useContext\` is a hook that lets you subscribe to context from your component, which removes the need of props drilling.

<br/>

Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.

<br/>

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called [\`"props drilling"\`](https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props).

<hr/>

### Type & Parameters

\`\`\`ts
function useContext<T>(object: ContextObject<T>): T;
\`\`\`

The only parameter is the context \`object\` of type [\`ContextObject\`](/docs/types#contextobject), which is the output of [\`createContext\`](/docs/api/createContext). Like \`React\`, The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

<br/>

### Returns

useContext returns the context value for the calling component. It is determined as the value passed to the closest \`Context.Provider\` above the calling component in the tree. If there is no such provider, then the returned value will be the defaultValue you have passed to createContext for that context. The returned value is always up-to-date. Ruvy automatically re-renders components that read some context if it changes.

<hr/>

### Notes ⚠️

- \`useContext\` call in a component is not affected by providers returned from the same component. The corresponding \`<Context.Provider>\` needs to be above the component doing the \`useContext\` call.
- If The context is not found, an \`exception\` will be thrown.

<hr/>

### Example

#### Creating the context and using Context.Provider

\`\`\`ts
import { useState, createContext, useContext } from '@riadh-adrani/ruvy';

// creating a new context object.
const CountContext = createContext(0);

function Parent() {
  const [count, setCount] = useState(0);

  // surrounding the child with a Context.Provider
  return <CountContext.Provider value={count}><Child/></CountContext.Provider/>
}

function Child() {
  // consuming the context
  const count = useContext(CountContext)

  return <div>{count}</div>
}
\`\`\`
`,nl=`# useContext

\`useContext\` is a hook that lets you subscribe to context from your component, which removes the need of props drilling.

<br/>

Passing props is a great way to explicitly pipe data through your UI tree to the components that use it.

<br/>

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and lifting state up that high can lead to a situation called [\`"props drilling"\`](https://react.dev/learn/passing-data-deeply-with-context#the-problem-with-passing-props).

<hr/>

### Type & Parameters

\`\`\`ts
function useContext<T>(object: ContextObject<T>): T;
\`\`\`

The only parameter is the context \`object\` of type [\`ContextObject\`](/docs/types#contextobject), which is the output of [\`createContext\`](/docs/api/createContext). Like \`React\`, The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

<br/>

### Returns

useContext returns the context value for the calling component. It is determined as the value passed to the closest \`Context.Provider\` above the calling component in the tree. If there is no such provider, then the returned value will be the defaultValue you have passed to createContext for that context. The returned value is always up-to-date. Ruvy automatically re-renders components that read some context if it changes.

<hr/>

### Notes ⚠️

- use \`ContextObject.use\` as a shorthand for \`useContext(ContextObject)\`.
- \`useContext\` call in a component is not affected by providers returned from the same component. The corresponding \`<Context.Provider>\` needs to be above the component doing the \`useContext\` call.
- If The context is not found, an \`exception\` will be thrown.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-jewpid?embed=1&file=src%2FCount.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,ol=[{from:"0.5.0",to:"0.5.0",md:tl},{from:"0.5.2",md:nl}],rl=`# useComposable

\`useComposable\` is a hook that lets you subscribe to a composable by its \`name\`.

<hr/>

### Type & Parameters

\`\`\`ts
function useComposable<T>(name: string): T;
\`\`\`

- name : composable's uniqe name.

<br/>

### Returns

returns the composable current value.

<br/>

### Notes ⚠️

- Throws if name does not match any composable.
- You can use the shorthand method returned by [\`createComposable\`](/docs/api/createComposable) instead.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-lqiij9?embed=1&file=src%2FCount.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,al=[{from:"0.5.2",md:rl}],sl=`# getParams

\`getParams\` is a function that returns an object of key/value pairs of the dynamic params from the current URL that were matched to the closest route by the current router.

<hr/>

### Type & Parameters

\`\`\`ts
function getParams(): Record<string, string | undefined>;
\`\`\`

This function has no parameters.

<br/>

### Returns

returns an object of key/value pairs of the dynamic params from the current URL matched by the current route.

<hr/>

### Notes ⚠️

- \`getParams\` is not a hook.
- throws an exception if no \`Router\` was initialized.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-aarsuf?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,il=`# getParams

\`getParams\` is a function that returns an object of key/value pairs of the dynamic params from the current URL that were matched by the current route. Child routes inherit all params from their parent routes.

<hr/>

### Type & Parameters

\`\`\`ts
function getParams(): Record<string, string>;
\`\`\`

This function has no parameters.

<br/>

### Returns

returns an object of key/value pairs of the dynamic params from the current URL matched by the current route.

<hr/>

### Notes ⚠️

- \`getParams\` is not a hook.

<hr/>

### Example

#### Extract user ID from the current path.

\`\`\`ts
import { getParams } from '@riadh-adrani/ruvy';

function Component() {
  // route = /users/:id/settings
  // url = /users/123/settings
  const { id } = getParams();

  console.log(id); // displays "123"
  // ...
}
\`\`\`
`,ll=[{from:"0.5.0",to:"0.5.0",md:il},{from:"0.5.2",md:sl}],ul=`# getSearchParams

\`getSearchParams\` is a function that returns an object of key/value pairs of the dynamic search params (if they exists) from the current URL.

<hr/>

### Type & Parameters

\`\`\`ts
function getSearchParams(): Record<string, string | undefined>;
\`\`\`

This function has no parameters.

<br/>

### Returns

returns an object of key/value pairs of the search params from the current URL matched by the current route.

<hr/>

### Notes ⚠️

- \`getSearchParams\` is not a hook.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-97b6gb?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,cl=`# getSearchParams

\`getSearchParams\` is a function that returns an object of key/value pairs of the dynamic search params (if they exists) from the current URL.

<hr/>

### Type & Parameters

\`\`\`ts
function getSearchParams(): Record<string, string | undefined>;
\`\`\`

This function has no parameters.

<br/>

### Returns

returns an object of key/value pairs of the search params from the current URL matched by the current route.

<hr/>

### Notes ⚠️

- \`getSearchParams\` is not a hook.

<hr/>

### Example

#### Extract query from search params

\`\`\`ts
import { getSearchParams } from '@riadh-adrani/ruvy';

function Component() {
  // url = /search?q=ruvy
  const { q } = getSearchParams();

  console.log(q); // displays "ruvy"
  // ...
}
\`\`\`
`,dl=[{from:"0.5.0",to:"0.5.0",md:cl},{from:"0.5.2",md:ul}],hl=`# getPathname

\`getPathname\` is a function that returns the current URL's pathname.

<hr/>

### Type & Parameters

\`\`\`ts
function getPathname(): string;
\`\`\`

This function has no parameters.

<br/>

### Returns

returns the current \`pathname\` without the \`base\`.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-dpmsqk?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,pl=`# getPathname

\`getPathname\` is a function that returns the current URL's pathname.

<hr/>

### Type & Parameters

\`\`\`ts
function getPathname(): string;
\`\`\`

This function has no parameters.

<br/>

### Returns

returns the current \`pathname\` without the \`base\`.

<hr/>

### Example

#### Get current route

\`\`\`ts
import { getPathname } from '@riadh-adrani/ruvy';

function Component() {
  // url = /search
  const route = getPathname();

  console.log(route); // displays "/search"
  // ...
}
\`\`\`

#### Get current route without the base

\`\`\`ts
import { getPathname } from '@riadh-adrani/ruvy';

function Component() {
  // base = /ruvy
  // url = /ruvy/search
  const route = getPathname();

  console.log(route); // displays "/search"
  // ...
}
\`\`\`
`,ml=[{from:"0.5.0",to:"0.5.0",md:pl},{from:"0.5.2",md:hl}],fl=`# navigate

\`navigate\` lets you navigate programmatically between routes.

<hr/>

### Type & Parameters

\`\`\`ts
function navigate(request: NavigationRequest): void;
\`\`\`

The only parameter is \`request\` of type [\`NavigationRequest\`](/docs/types#navigationrequest).

<hr/>

### Notes ⚠️

- \`navigate\` pushes a new entry to the \`history\` object.

<hr/>

### Example

#### Navigate with a path string

\`\`\`ts
// ...

navigate('/sign-in');

// ...
\`\`\`

#### Navigate with a named route

\`\`\`ts
//...

navigate({ name: 'Home' });

//...
\`\`\`

#### Navigate with a named dynamic route

\`\`\`ts
//...

navigate({ name: 'UserPage', params: { id: 1 } });

//...
\`\`\`

#### Navigate relatively

\`\`\`ts
//...

navigate(-1); // previous path
navigate(1); // forward path

//...
\`\`\`
`,gl='# navigate\n\n`navigate` lets you navigate programmatically between routes.\n\n<hr/>\n\n### Type & Parameters\n\n```ts\nfunction navigate(request: DestinationRequest, options?: DestinationOptions): void;\n```\n\nAccepts two arguments, with the second one being optional :\n\n- `request` : could be one of the following :\n  - `string` : path string like `/ruvy`.\n  - `number` : relative navigation like `-1` which will go back by one entry, or `1` which will go forward by one entry.\n  - `object` : describing a named destination having the following keys :\n    - `name` : path name as provided in the router.\n    - `query` (optional) : a record of string or number that will be used to build query params.\n    - `params` (optional) : a record containing parameters of a dynamic route.\n    - `hash` (optional) : a string targeting an element id.\n- `options` (optional) : additional options :\n  - `replace` (optional) : a boolean indicating if the router should replace the current state or push a new one.\n\n<hr/>\n\n### Notes ⚠️\n\n- `navigate` pushes a new entry to the `history` object by default.\n- `replace` is removed in version `0.5.1`, instead, use `navigate` with the `replace` option set to `true`.\n\n<hr/>\n\n### Example\n\n<iframe src="https://stackblitz.com/edit/ruvy-q9bibe?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>\n',bl=[{from:"0.5.0",to:"0.5.0",md:fl},{from:"0.5.2",md:gl}],yl=`# Outlet

\`<Outlet/>\` is a component that dynamically renders the suitable elements for the current router state.

<hr/>

### Type & Parameters

\`\`\`ts
function Outlet(): void;
\`\`\`

The only parameter is the \`path\` string.

<hr/>

### Notes ⚠️

- \`<Outlet/>\` returns the \`catch\`/\`catch-all\` component when no route mathces the current context.

<hr/>

### Example

#### Rendering the content of the website

\`\`\`ts
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import { Outlet } from '@riadh-adrani/ruvy';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
\`\`\`

#### Rendering a dynamic section of a page

\`\`\`ts
import SideBar from './SideBar.js';
import { Outlet } from '@riadh-adrani/ruvy';

function User() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}
\`\`\`
`,vl=`# Outlet

\`<Outlet/>\` is a component that dynamically renders the suitable elements for the current router state.

<hr/>

### Type & Parameters

\`\`\`ts
function Outlet(): void;
\`\`\`

The only parameter is the \`path\` string.

<hr/>

### Notes ⚠️

- \`<Outlet/>\` returns the local \`catch\` (or the root \`catch-all\`) component when no route mathces the current context, or \`undefined\` otherwise.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-dveo5e?embed=1&file=src%2FNavBar.tsx&hideExplorer=1&hideNavigation=1&view=preview" class="stackblitz"></iframe>
`,wl=[{from:"0.5.0",to:"0.5.0",md:yl},{from:"0.5.2",md:vl}],xl=`# Fragment

\`<Fragment/>\`, used also as \`<></>\`, is a built-in component that allows the user to group elements without the need of a wrapper node.

<hr/>

### Type & Parameters

\`\`\`ts
function Fragment(props: PropsWithUtility): JSX.Element;
\`\`\`

accepts an object of type [\`PropsWithUtility\`](/docs/types#propswithutility).

<hr/>

### Example

#### <Fragment/>

\`\`\`ts
function Layout() {
  return (
    <Fragment>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Fragment>
  );
}
\`\`\`

<hr/>

#### <></>

\`\`\`ts
function Layout() {
  return (
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );
}
\`\`\`
`,Dl=`# Fragment

\`<Fragment/>\`, used also as \`<></>\`, is a built-in component that allows the user to group elements without the need of a wrapper node.

<hr/>

### Type & Parameters

\`\`\`ts
function Fragment(props: PropsWithUtility): JSX.Element;
\`\`\`

accepts an object of type [\`PropsWithUtility\`](/docs/types#propswithutility).

<hr/>

#### Example

<iframe src="https://stackblitz.com/edit/ruvy-bjc9lc?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,kl=[{from:"0.5.0",to:"0.5.0",md:xl},{from:"0.5.2",md:Dl}],Fl=`# Portal

\`<Portal/>\` is a built-in component that allows us to "teleport" a part of a component's template into a DOM node that exists outside the DOM hierarchy of that component.

<hr/>

### Type & Parameters

\`\`\`ts
function Portal(props: PortalProps): JSX.Element;
\`\`\`

accepts an object of type [\`PortalProps\`](/docs/types#portalprops) with the following properties:

- \`container\` : the HTML element that will host the children.
- \`key\` : (optional) component key.
- \`children\` : (optional) children to be teleported. Can be ignored as you can nest children directly in the JSX.

<hr/>

### Notes ⚠️

- The \`container\` must be already in the DOM when the \`<Portal>\` component is mounted. Ideally, this should be an element outside the entire application. If targeting another element rendered by the framework, you need to make sure that element is mounted before the \`<Portal>\`.

<hr/>

### Example

#### Rendering a modal in the \`body\`

\`\`\`ts
import HelloModal from './HelloModal.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import { Portal } from '@riadh-adrani/ruvy';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <Portal container={document.body}>
        <HelloModal />
      </Portal>
    </>
  );
}
\`\`\`
`,El=`# Portal

\`<Portal/>\` is a built-in component that allows you to "teleport" a part of a component's template into a DOM node that exists outside the DOM hierarchy of that component.

<hr/>

### Type & Parameters

\`\`\`ts
function Portal(props: PortalProps): JSX.Element;
\`\`\`

accepts an object of type [\`PortalProps\`](/docs/types#portalprops) with the following properties:

- \`container\` : the HTML element that will host the children.
- \`key\` : (optional) component key.
- \`children\` : (optional) children to be teleported. Can be ignored as you can nest children directly in the JSX.

<hr/>

### Notes ⚠️

- The \`container\` must be already in the DOM when the \`<Portal>\` component is mounted. Ideally, this should be an element outside the entire application. If targeting another element rendered by the framework, you need to make sure that element is mounted before the \`<Portal>\`.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-8z1pcj?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,Cl=[{from:"0.5.0",to:"0.5.0",md:Fl},{from:"0.5.2",md:El}],Al=`# API

Welcome to the API documentation section, where you will find detailed information about the various features and functionalities provided by our framework's API. This comprehensive resource serves as your guide to understanding and harnessing the power of our framework's capabilities, allowing you to build robust and dynamic web applications. Whether you're a beginner seeking to explore the basics or an experienced developer looking to leverage advanced features, this API documentation will provide you with the necessary insights, examples, and guidelines to make the most of our framework's API. Let's dive in and unlock the full potential of our framework!

---

Here is the full list of the \`API\` methods :

<br/>

## Initialization

- [\`mountApp\`](/docs/api/mountApp)
- [\`createrRouter\`](/docs/api/createRouter)

<br/>

## Hooks

- [\`useState\`](/docs/api/useState)
- [\`useEffect\`](/docs/api/useEffect)
- [\`useMemo\`](/docs/api/useMemo)
- [\`useCallback\`](/docs/api/useCallback)
- [\`useContext\`](/docs/api/useContext)
- [\`useId\`](/docs/api/useId)

<br/>

## Store

- [\`createStore\`](/docs/api/createStore)

<br/>

## Context

- [\`createContext\`](/docs/api/createContext)

<br/>

## Utils

- [\`getParams\`](/docs/api/getParams)
- [\`getSearchQuery\`](/docs/api/getSearchQuery)
- [\`getPathname\`](/docs/api/getPathname)
- [\`batch\`](/docs/api/batch)
- [\`navigate\`](/docs/api/navigate)
- [\`replace\`](/docs/api/replace)

<br/>

## Components

- [\`<Outlet/>\`](/docs/api/outlet)
- [\`<Portal/>\`](/docs/api/portal)
- [\`<Fragment/>\`](/docs/api/fragment)
`,Tl=`# API

Welcome to the API documentation section, where you will find detailed information about the various features and functionalities provided by our framework's API. This comprehensive resource serves as your guide to understanding and harnessing the power of our framework's capabilities, allowing you to build robust and dynamic web applications. Whether you're a beginner seeking to explore the basics or an experienced developer looking to leverage advanced features, this API documentation will provide you with the necessary insights, examples, and guidelines to make the most of our framework's API. Let's dive in and unlock the full potential of our framework!

---

Here is the full list of the \`API\` methods :

<br/>

## Initialization

- [\`mountApp\`](/docs/api/mountApp)
- [\`createrRouter\`](/docs/api/createRouter)

<br/>

## Hooks

- [\`useState\`](/docs/api/useState)
- [\`useEffect\`](/docs/api/useEffect)
- [\`useMemo\`](/docs/api/useMemo)
- [\`useCallback\`](/docs/api/useCallback)
- [\`useContext\`](/docs/api/useContext)
- [\`useId\`](/docs/api/useId)
- [\`useComposable\`](/docs/api/useComposable)

<br/>

## Store

- [\`createComposable\`](/docs/api/createComposable)

<br/>

## Context

- [\`createContext\`](/docs/api/createContext)

<br/>

## Utils

- [\`getParams\`](/docs/api/getParams)
- [\`getSearchQuery\`](/docs/api/getSearchQuery)
- [\`getPathname\`](/docs/api/getPathname)
- [\`navigate\`](/docs/api/navigate)

<br/>

## Components

- [\`<Outlet/>\`](/docs/api/outlet)
- [\`<Portal/>\`](/docs/api/portal)
- [\`<Fragment/>\`](/docs/api/fragment)
`,Sl=[{from:"0.5.0",to:"0.5.0",md:Al},{from:"0.5.2",md:Tl}],_l=`# Beyond React: Exploring Additional Features and Differences

In this section, we go beyond the realm of \`React\` and delve into the unique features and differentiating factors of our framework. While our framework draws inspiration from \`React\`, it also brings its own set of innovative functionalities and approaches to front-end development. Here, you will discover additional features that enrich your development experience, allowing you to tackle complex challenges with ease. We also highlight the key differences between our framework and React, providing insights into how our approach may diverge or enhance certain aspects of application development. Join us on this exploration as we showcase the unique capabilities that set our framework apart and empower you to create exceptional web applications.

---

Here is the list of differences and additional features :

<br/>

- [\`class attribute\`](/docs/more/class-attribute)
- [\`joinClasses()\`](/docs/more/joinClasses)
- [\`if directives\`](/docs/more/if-directive)
- [\`switch directives\`](/docs/more/switch-directive)
`,Rl=[{from:"0.5.0",md:_l}],Bl=`# Class attribute

In our framework, we have adopted the use of the \`class\` attribute instead of \`className\`, as commonly used in \`React\`. This decision was made to streamline the styling process and provide a more intuitive experience for developers. By using the familiar \`class\` attribute, you can leverage the power of CSS classes directly, without the need for additional JSX transformations. This not only simplifies the syntax but also allows you to seamlessly apply multiple classes to an element by providing either a \`string\` or an \`array of strings\` as the value of the class attribute. This flexibility empowers you to organize and manage your styles more efficiently, making it easier to achieve the desired look and feel for your components. Embracing the class attribute in our framework provides a smooth transition for developers familiar with traditional HTML and CSS practices, enhancing productivity and promoting code clarity.

---

### class not className

Just use \`class\` instead of \`className\`:

<br/>

\`\`\`ts
<div class="better">Nice</div>
\`\`\`

---

### string or array, it is all the same

Organize your classes:

<br/>

\`\`\`ts
<div class={['better', 'way', 'for', 'css', 'classes']}>Nice</div>
\`\`\`

---

### class directive

Conditionally add classes:

<br/>

\`\`\`ts
const isActive = useMemo(() => {
  //...
});

<div class:active={isActive}>Nice</div>;
\`\`\`
`,Il="# Class attribute\n\nIn our framework, we have adopted the use of the `class` attribute instead of `className`, as commonly used in `React`. This decision was made to streamline the styling process and provide a more intuitive experience for developers. By using the familiar `class` attribute, you can leverage the power of CSS classes directly, without the need for additional JSX transformations. This not only simplifies the syntax but also allows you to seamlessly apply multiple classes to an element by providing either a `string` or an `array of strings` as the value of the class attribute. This flexibility empowers you to organize and manage your styles more efficiently, making it easier to achieve the desired look and feel for your components. Embracing the class attribute in our framework provides a smooth transition for developers familiar with traditional HTML and CSS practices, enhancing productivity and promoting code clarity.\n\n---\n\n### `class`\n\nusing `class` instead of `className`:\n\n<br/>\n\n```ts\n<div class=\"better\">Nice</div>\n```\n\n### `className`\n\nWhile it is better to use `class` attribute, we made the decision that keeping `className` will make the `developer experience` lenient for react dev.\n\n<br/>\n\n```ts\n<div className=\"the-react-way\">Nice</div>\n```\n\n### `Arrayable`\n\nOrganize your classes:\n\n<br/>\n\n```ts\n<div class={['better', 'way', 'for', 'css', 'classes']}>Nice</div>\n```\n\n### `class:* directive`\n\nYou can also conditionally add classes with the `class:*` directive.\n\n<br/>\n\n```ts\nconst isActive = withinUrl();\n\n<div class:active={isActive}>Nice</div>;\n```\n\n## Using them all at once ?\n\nYes, you can use all of the above in the same component, but they will be applied in this order : `class` + `className` + `class:*`\n\n<br/>\n\n```ts\n<div class:active class=\"ruvy\" className={'react'} />\n// same as 👇\n<div class=\"ruvy react active\"/>\n```\n",Pl=[{from:"0.5.0",to:"0.5.0",md:Bl},{from:"0.5.2",md:Il}],Ml="# joinClasses\n\n`joinClasses` is a function that filters and join classes of different types.\n\n<hr/>\n\n### Type & Parameters\n\n```ts\nfunction joinClasses(...classes: Arrayable<string | undefined | null>): string;\n```\n\nAccepts `Arrayable` arguments of type `string`, `undefined` or `null`.\n\n<hr/>\n\n### Notes ⚠️\n\n- Eleminate `falsy` values like `undefined`, `null` or `false`.\n\n<hr/>\n\n### Example\n\n```ts\njoinClasses('join', 'classes'); // 👉 `join classes`\n\njoinClasses(['join'], 'classes'); // 👉 `join classes`\n\njoinClasses(['join'], undefined, 'classes', null); // 👉 `join classes`\n```\n",Ll=[{from:"0.5.0",md:Ml}],Nl=`# \`if\` directive

A structural directive that conditionally includes a component based on the value of an expression coerced to \`boolean\`. When the expression does not evaluates to \`false\`, the framework will render it, otherwise it will be ignored from the tree of components.

<br/>

### Example

\`\`\`ts
<>
  <div if={true}>Show me</div> // will be rendered
  <div if={false}>Hide me</div> // will be hidden
</>
\`\`\`

# \`else-if\` directive

You can use the \`else-if\` directive to indicate an \`"else if block"\` for \`if\` or another \`else-if\` directive.

<br/>

### Example

\`\`\`ts
<>
  <div if={false}>Show me</div>
  <div else-if={true}>Else-if</div> // 👈 will be rendered
</>
\`\`\`

You can chain \`else-if\`s :

<br/>

\`\`\`ts
<>
  <div if={false}>Show me</div>
  <div else-if={false}>Else-if 1</div>
  <div else-if={true}>Else-if 2</div> // 👈 will be rendered
</>
\`\`\`

# \`else\` directive

You can use the \`else\` directive to indicate an \`"else block"\` for \`if\` or \`else-if\` directives. The value is not taken into consideration.

### Example

\`\`\`ts
<>
  <div if={false}>Show me</div>
  <div else>Else</div> // 👈 will be rendered
</>

<>
  <div if={false}>Show me</div>
  <div else-if={false}>Show me</div>
  <div else>Else</div> // 👈 will be rendered
</>

<>
  <div if={false}>Show me</div>
  <div else-if={false}>Show me</div>
  <div else-if={false}>Show me</div>
  <div else>Else</div> // 👈 will be rendered
</>
\`\`\`

# Notes ⚠️

- Cannot use \`else\` or \`else-if\` directives before an \`if\` directive at the beginning, otherwise the framework will throw an error.
- It does not matter if you assign a \`falsy\` value to the \`else\` attribute, it will always be set to true.
`,Ol=[{from:"0.5.0",md:Nl}],Ul=`# \`switch\` directive

A structural directive that conditionally includes a child component based on the comparison of its value with child's\`case\` value.

<br/>

### Example

\`\`\`ts
<div switch={1}>
  <div case={0}>0</div>
  <div case={1}>2</div> // 👈 will be rendered
  <div case={2}>3</div>
</div>
\`\`\`

# \`case\` directive

Used on children to make \`switch\` directives compare and select the given children if comparison is positive.

> ⚠️ If parent does not include a \`switch\` attribute, this directive will be ignored.

<br/>

### Example

\`\`\`ts
<div switch={1}>
  <div case={0}>0</div>
  <div case={1}>2</div> // 👈 will be rendered
  <div case={2}>3</div>
</div>
\`\`\`

# \`case:default\` directive

Used as a fallback when every previous \`case\` failed.

> ⚠️ If parent does not include a \`switch\` attribute, this directive will be ignored.

> ⚠️ Should only be used on the last children component.

### Example

\`\`\`ts
<div switch={-1}>
  <div case={0}>0</div>
  <div case={1}>2</div>
  <div case={2}>3</div>
  <div case:default>No case is matched</div> // 👈 will be rendered
</div>
\`\`\`
`,$l=[{from:"0.5.0",md:Ul}],zl=`# Event modifiers

It is a very common need to call \`event.preventDefault()\` or \`event.stopPropagation()\` inside event handlers. We can do it easily within methods, but it would be better if the methods can be more pure with only data logic rather than having to deal with DOM event details.

<br/>

At the moment we have two most common modifiers:

<br/>

- \`onClick:prevent\` : for \`preventDefault()\`
- \`onClick:stop\` : for \`stopPropagation()\`

<br/>

> ✅ You can also combine them like this : _\`onClick:prevent-stop\`_

<br/>

### Example

\`\`\`ts
const clickHandler = () => {
  // logic
};

<>
  // no modifier
  <button onClick={clickHandler}></button>
  // will stop propagation to the parent
  <button onClick:stop={clickHandler}></button>
  // will prevent default behavior
  <button onClick:prevent={clickHandler}></button>
  // will do both
  <button onClick:prevent-stop={clickHandler}></button>
</>;
\`\`\`

### Notes ⚠️

- You can only use on method per event which means defining \`onClick\` and \`onClick:prevent\` for example will result in only one of them to be used as an event listener.
`,Hl=`# Event modifiers

It is a very common need to call \`event.preventDefault()\` or \`event.stopPropagation()\` inside event handlers. We can do it easily within methods, but it would be better if the methods can be more pure with only data logic rather than having to deal with DOM event details.

<br/>

We offer this event modifiers :

<br/>

- \`prevent\` : will call \`preventDefault()\` before your logic.
- \`stop\` : will call \`stopPropagation()\` before your logic.
- \`self\` : will check if the target (caller) is the same as the HTML element.
- \`capture\` : will handle an event emitted by an inner html elemet here first.
- \`once\` : will call the event once, unless updated.
- \`passive\` : [mdn](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive) : indicates that the function specified by listener will never call \`preventDefault()\`. If a passive listener does call \`preventDefault()\`, the user agent will do nothing other than generate a console warning.

<br/>

> Syntax should be in this form : _\`onEvent:modifier\`_ like : _\`onClick:prevent\`_.

> You can also chain them like : _\`onClick:prevent-stop-self\`_

> Order is important : using \`self\` before \`stop\` will not always stop the propagation of the event unless it is emitted by the specified corresponding DOM element.

<br/>

### Example

\`\`\`ts
const clickHandler = () => {
  // logic
};

<>
  // no modifier
  <button onClick={clickHandler}></button>
  // will stop propagation to the parent
  <button onClick:stop={clickHandler}></button>
  // will prevent default behavior
  <button onClick:prevent={clickHandler}></button>
  // will do both
  <button onClick:prevent-stop={clickHandler}></button>
</>;
\`\`\`
`,Jl=[{from:"0.5.0",to:"0.5.0",md:zl},{from:"0.5.2",md:Hl}],jl=[{path:"/mountApp",versions:Ui,title:"mountApp"},{path:"/createRouter",versions:Ri,title:"createRouter"},{path:"/createStore",versions:[{from:"0.5.0",to:"0.5.0",md:Ti}],title:"createStore"},{path:"/createComposable",versions:Ii,title:"createComposable"},{path:"/useState",versions:Hi,title:"useState"},{path:"/useEffect",versions:Wi,title:"useEffect"},{path:"/useMemo",versions:Zi,title:"useMemo"},{path:"/useCallback",versions:Vi,title:"useCallback"},{path:"/useContext",versions:ol,title:"useContext"},{path:"/useComposable",versions:al,title:"useComposable"},{path:"/useId",versions:el,title:"useId"},{path:"/createContext",versions:Li,title:"createContext"},{path:"/getParams",versions:ll,title:"getParams"},{path:"/getSearchParams",versions:dl,title:"getSearchParams"},{path:"/getPathname",versions:ml,title:"getPathname"},{path:"/replace",versions:[{from:"0.5.0",to:"0.5.0",md:ko}],element:ko,title:"replace"},{path:"/navigate",versions:bl,title:"navigate"},{path:"/batch",versions:[{from:"0.5.0",to:"0.5.0",md:Fo}],element:Fo,title:"batch"},{path:"/outlet",versions:wl,title:"<Outlet/>"},{path:"/fragment",versions:kl,title:"<Fragment/>"},{path:"/portal",versions:Cl,title:"<Portal/>"}],Wl=[{path:"/class-attribute",versions:Pl,title:"Class attribute"},{path:"/joinClasses",versions:Ll,title:"joinClasses"},{path:"/if-directive",versions:Ol,title:"if directives"},{path:"/switch-directive",versions:$l,title:"switch directives"},{path:"/event-modifiers",versions:Jl,title:"Event modifiers"}],Eo=[{path:"/api",title:"API",children:jl,versions:Sl},{path:"/more",title:"More",children:Wl,versions:Rl},{path:"/types",title:"Types",children:[],versions:[{from:"0.5.0",md:Ai}]}],Gl=`# Tutorial : Todo

Welcome to our comprehensive tutorial on building a simple \`Todo List App\` with \`Ruvy\`. In this tutorial, we will take you on a step-by-step journey to create a fully functional todo list, where you'll learn and apply the fundamental concepts of \`Ruvy\`. By the end of this tutorial, you'll have a solid understanding of Ruvy's \`component-based\` architecture, the power of \`hooks\` for managing, and how to efficiently \`create\`, \`rea\`d, and \`delete\` todo items. Whether you're a seasoned developer exploring a new framework or a beginner taking your first steps in web development, this tutorial will equip you with the skills to build dynamic web applications using Ruvy. Let's get started and bring your todo list to life with \`Ruvy\`!

<br/>

> ⚠️ We will be using \`TypeScript\` as it provides a better user experience and solid development flow.

> ✔️ You can find the final result <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx" target="_blank">\`here\`</a>.

<br/>

## \`Setup the project 1️⃣\`

For simplicity pursposes, we will be using the starter template in \`StackBlitz\`, which you can find <a href="https://stackblitz.com/edit/ruvy" target="_blank">\`here\`</a>.

<hr/>

## \`Starting with a blank slate 🏜️\`

Delete the content of the \`src > main.tsx\`, we are starting from zero 👌.

<hr/>

## \`This is not a CSS tutorial ⛔\`

This is obviously not a \`CSS\` tutorial, so you can copy the content of <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx,src%2Fstyle.css" target="_blank">\`this file\`</a> and replace whatever you have in your \`src/style.css\`.

<br/>

> Don't forget to import \`style.css\` in \`main.tsx\`

<br/>

\`\`\`ts
import './style.css';
\`\`\`

<hr/>

## \`Mounting our application 💨\`

First, we need to mount our application to the DOM using \`mountApp\`, which we can import from \`@riadh-adrani/ruvy\`.

</br>

\`\`\`ts
import { mountApp } from '@riadh-adrani/ruvy';
\`\`\`

\`mountApp\` needs two parameters, a \`hosting element\` and the \`Application callback\`:

<br/>

\`\`\`ts
import { mountApp } from '@riadh-adrani/ruvy';
import './style.css';

const hostElement = document.querySelector<HTMLDivElement>('#app')!; // 👈 asserting that the element exists

const App = () => <div>Hello World</div>;

mountApp({ hostElement, callback: App });
\`\`\`

This should display the "Hello World" text in the screen.

<hr/>

## \`Creating the Layout 📏\`

For organizational purposes, we will be writing our code in a new file that we will call \`App.tsx\`. Then, we will move the \`App\` callback to the new file.

<br/>

As a layout, we will have a big title at the top, under that we will place an input with a button which will allow us to add new todos. At the end, we will display the list of todos with the ability to edit and delete each one, we will have something like this:

\`\`\`ts
const App = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input />
        <button>add</button>
      </div>
      <div>
        <div>
          <input type="checkbox" />
          <p>todo</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};

export default App;
\`\`\`

It looks ugly at the moment, so let's add some classes :

<br/>

\`\`\`ts
const App = () => {
  return (
    <div class="app-wrapper">
      <h1>Todo App</h1>
      <div class="new-todo-wrapper">
        <input class="new-todo-input" />
        <button>add</button>
      </div>
      <div class="todo-items-wrapper">
        <div class="todo-item">
          <input type="checkbox" />
          <p class="todo-item-text">todo</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};
\`\`\`

Not the best, but that will do the job.

<hr/>

## \`Adding a new Todo 📃\`

To create a new todo, we need a \`state\` where we will store the user input, another \`state\` for the todos. We will use <a href="/docs/api/useState" target="_blank">\`useState\`</a>, now, let's declare a new \`interface\` for our \`Todo\` object:

<br/>

\`\`\`ts
export interface ITodo {
  done: boolean;
  text: string;
  id: string;
}
\`\`\`

then, at the top of the \`App\` function, we will use \`useState\`:

<br/>

\`\`\`ts
const [newTodoText, setNewTodoText] = useState('');

const [todos, setTodos] = useState<Array<ITodo>>([]);
\`\`\`

Then we need a function to update the \`newTodoText\` value, and another one to create and push a new todo item :

<br/>

\`\`\`ts
// update the input field
const updateNewTodoText = (value: string) => {
  setNewTodoText('');
};

const addNewTodo = () => {
  // we don't add a todo when the text is empty
  if (!newTodoText.value.trim()) {
    alert('text is empty !');
    return;
  }

  // create a new todo
  const newTodo: ITodo = {
    done: false,
    id: Date.now().toString(),
    text: newTodoText,
  };

  // reset the value of the newTodoText
  setNewTodoText('');

  // push it to the list of todos
  setTodos([...todos, newTodo]);
};
\`\`\`

let's update our components tree to take into consideration our states and events:

<br/>

\`\`\`ts
return (
  <div class="app-wrapper">
    <h1>Todo App</h1>
    <div class="new-todo-wrapper">
      <input
        class="new-todo-input"
        value={newTodoText}
        onInput={e => updateNewTodoText(e.currentTarget.value)}
      />
      <button onClick={addNewTodo}>add</button>
    </div>
    <div class="todo-items-wrapper">
      {todos.map(it => (
        <div class="todo-item" key={it.id}>
          <input type="checkbox" checked={it.done} />
          <p class="todo-item-text">{it.text}</p>
          <button>edit</button>
          <button>delete</button>
        </div>
      ))}
    </div>
  </div>
);
\`\`\`

Now, you can test both cases:

1. When the box is empty, and you click the \`add\` button, an alert saying \`"text is empty"\` should popup.
2. When the box is filled with at least on character and you click the \`add\` button, a new todo will appear just underneath.

<hr/>

## \`Creating a <Todo/> component ⚛️\`

Let's create a new component \`<Todo/>\` that will help us organize our code; create a new file \`Todo.tsx\`, we will be moving the logic in the \`map\` function into the new file:

\`\`\`ts
import type { ITodo } from './App';

// it is recommended to create a props type
export interface TodoProps {
  // we don't need the key internally,
  // but Ruvy uses it to keep tracking the position of the element,
  key: string;
  // the actual data of the todo item
  it: ITodo;
}

const Todo = ({ it }: TodoProps) => {
  return (
    <div class="todo-item">
      <input type="checkbox" checked={it.done} />
      <p class="todo-item-text">{it.text}</p>
      <button>edit</button>
      <button>delete</button>
    </div>
  );
};

export default Todo;
\`\`\`

And then, let's refactor our \`map\` function to use our new \`<Todo/>\` component:

<br/>

\`\`\`ts
<div class="todo-items-wrapper">
  {todos.map(it => (
    <Todo it={it} key={it.id} />
  ))}
</div>
\`\`\`

A little more cleaner 🧹 !

<hr/>

## \`Deleting a Todo ❌\`

We will add a new click listener to the \`delete\` button of the Todo component, we need the function itself, which we will add just before the return statement of the \`App\` component:

<br/>

\`\`\`ts
const deleteTodo = (id: string) => {
  // filter out todos with the given id
  setTodos(todos.filter(it => it.id !== id));
};
\`\`\`

However, we need to pass it to the \`<Todo/>\` component, so we will modify the \`TodoProps\` to accept a new property that we will call \`onDelete\` :

<br/>

\`\`\`ts
import type { ITodo } from './App';

// it is recommended to create a props type
export interface TodoProps {
  // we don't need the key internally,
  // but Ruvy uses it to keep tracking the position of the element,
  key: string;
  // the actual data of the todo item
  it: ITodo;
  onDelete: (it: string) => void; // 👈 add this line
}

const Todo = ({ it, onDelete }: TodoProps) => {
  // deconstruct this 👆
  return (
    <div class="todo-item">
      <input type="checkbox" checked={it.done} />
      <p class="todo-item-text">{it.text}</p>
      <button>edit</button>
      <button onClick={() => onDelete(it.id)}>delete</button> // 👈 update this line
    </div>
  );
};

export default Todo;
\`\`\`

Finally we pass the function to the component from \`App.tsx\` like this :

<br/>

\`\`\`ts
<Todo it={it} key={it.id} onDelete={deleteTodo} />
\`\`\`

<hr/>

## \`Updating a Todo 📝\`

As you may have guessed, we will be doing the same thing with the \`update\` process, but this time we need to change the state of the \`Todo\` component to an \`edit\` state, and then update it according to the needs. In the \`edit\` state, We will be displaying an input with two button \`save\` and \`cancel\`. We will add a new props named \`onUpdate\` just like \`onDelete\`,

<br/>

Here's how it should look after all what we dicussed earlier:

<br/>

\`\`\`ts
import type { ITodo } from './App';

// it is recommended to create a props type
export interface TodoProps {
  // we don't need the key internally,
  // but Ruvy uses it to keep tracking the position of the element,
  key: string;
  // the actual data of the todo item
  it: ITodo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, update: Partial<Omit<ITodo, 'id'>>) => void;
  // 👆 this will be executing whenever we want to update the todo
}

const Todo = ({ it, onDelete, onUpdate }: TodoProps) => {
  const [editMode, setEditMode] = useState({ is: false, text: it.text });
  // this 👆 will store the edit state and the draft text

  // toggle between edit and normal mode
  const toggleEditMode = (value: boolean) => {
    if (value) {
      // initialize the text to the todo text value
      setEditMode({ ...editMode, is: true, text: it.text });
    } else {
      setEditMode({ ...editMode, is: false });
    }
  };

  // update the todo text
  const onSave = () => {
    onUpdate(it.id, { text: editMode.text });
    toggleEditMode(false);
  };

  // toggle the done state
  const toggleDone = () => {
    onUpdate(it.id, { done: !it.done });
  };

  return (
    <div class="todo-item">
      <>
        {!editMode.is ? (
          <>
            <input type="checkbox" checked={it.done} onChange={() => toggleDone()} />
            // add this 👆
            <p class="todo-item-text" style={{ textDecoration: it.done ? 'line-through' : '' }}>
              // 👆 will add a line-through when item is done
              {it.text}
            </p>
            <button onClick={() => toggleEditMode(true)}>edit</button>
            // and this 👆
            <button onClick={() => onDelete(it.id)}>delete</button>
          </>
        ) : (
          <>
            <input
              class="todo-item-input"
              value={editMode.text}
              //  also this 👆
              onInput={e => setEditMode({ ...editMode, text: currentTarget.value })}
              // this 👆 will update the draft text
            />
            <button onClick={() => onSave()}>save</button>
            // don't forget this 👆 which will update the text and close the edit mode
            <button onClick={() => toggleEditMode(false)}>cancel</button>
            // and finally add this 👆 to cancel from edit mode
          </>
        )}
      </>
    </div>
  );
};

export default Todo;
\`\`\`

And in \`App.tsx\` :

<br/>

\`\`\`ts
// ...

const updateTodo = (id: string, update: Partial<Omit<ITodo, 'id'>>) => {
  setTodos(todos.map(it => (it.id === id ? { ...it, ...update } : it)));
};

// ...

<div class="todo-items-wrapper">
  {todos.map(it => (
    <Todo it={it} key={it.id} onDelete={deleteTodo} onUpdate={updateTodo} />
  ))}
</div>;

// ...
\`\`\`

And that's it for this tutorial, we hope you find it useful ! You can check the solution <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx" target="_blank">\`here\`</a>.

<hr/>

## \`What's next 🎉\`

Congrats on completing the tutorial, but we suggest that you continue your journey of learning through creating more complex apps, you may find these [\`examples\`](/examples) for inspiration, and in case of doubt feel free to check the [\`documentation\`](/docs).

<br/>

**\`🎉 Happy Coding ! 🎉\`**
`,ql=[{from:"0.5.0",md:Gl}],Zl=`# Learn

Welcome to this section of the documentation! We will try to make you comfortable using \`Ruvy\`, we will be emulating the new \`React\` documentation, because it is well written, and we have at least 80% in common.

<br/>

- [\`Quick Start\`](/learn/quick-start)
- [\`Setup\`](/learn/setup)
- [\`Tutorial: Todo\`](/learn/tutorial-todo)

<br/>

You can also dive deep into the [\`docs\`](/docs).
`,Yl=[{from:"0.5.0",md:Zl}],Xl=`# Quick Start

In this section, you will learn:

> - How to create and nest components
> - How to add markup and styles
> - How to display data
> - How to render conditions and lists
> - How to respond to events and update the screen

<br/>

## Creating and nesting components

\`React\`, \`Vue\`, \`Angular\`, \`Svelte\` and many other frameworks' apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

<br/>

\`Ruvy\` components are JavaScript functions that return markup:

<br/>

\`\`\`ts
function MyButton() {
  return <button>Click me</button>;
}
\`\`\`

Now that you’ve declared MyButton, you can nest it into another component:

<br/>

\`\`\`ts
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
\`\`\`

Notice that \`<MyButton/>\` starts with a capital letter. That’s how you know it’s a \`Ruvy\` component. \`Ruvy\` Component names must always start with a capital letter, while HTML tags must be lowercase.

<hr/>

## Writing markup with JSX

The markup syntax you’ve seen above is called JSX. It is optional, but most \`Ruvy\` projects use JSX for its convenience, and we highly recommend it, otherwise, you may question your own existence.

<br/>

JSX is stricter than HTML. You have to close tags like \`<br />\`. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a \`<div>...</div>\` or an empty \`<>...</>\` wrapper:

\`\`\`ts
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
\`\`\`

<hr/>

## Adding styles

Unlike \`React\`, you specify a CSS class not with \`className\`, but with \`class\` just like html:

<br/>

\`\`\`ts
<img class="avatar" />
\`\`\`

Then you write the CSS rules for it in a separate CSS file:

\`\`\`css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
\`\`\`

We do not prescribe how you add CSS files. In the simplest case, you’ll add a \`<link>\` tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

<hr/>

## Displaying Data

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display \`user.name\`:

<br/>

\`\`\`ts
return <h1>{user.name}</h1>;
\`\`\`

You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes. For example, \`class="avatar"\` passes the \`"avatar"\` string as the CSS class, but \`src={user.imageUrl}\` reads the JavaScript \`user.imageUrl\` variable value, and then passes that value as the src attribute:

<br/>

\`\`\`ts
return <img class="avatar" src={user.imageUrl} />;
\`\`\`

<hr/>

## Conditional rendering

Like \`React\`, you can use the same techniques as you use when writing regular JavaScript code. For example, you can use an if statement to conditionally include JSX:

<br/>

\`\`\`ts
let content;

if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return <div>{content}</div>;
\`\`\`

If you prefer more compact code, you can use the \`conditional ? operator\`. Unlike if, it works inside JSX:

<br/>

\`\`\`ts
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
\`\`\`

When you don’t need the else branch, you can also use a shorter \`logical &&\` syntax:

<br/>

\`\`\`ts
<div>{isLoggedIn && <AdminPanel />}</div>
\`\`\`

### conditional directives

We saved the best for last, we offer [\`if\`](/docs/more/if-directive), [\`else-if\`](/docs/more/if-directive#elseif) and [\`else\`](/docs/more/if-directive#else) directives that works like \`Vue.js\`.

<br/>

\`\`\`ts
<>
  <div if={false} />
  <div else-if={false} />
  <div else /> // 👈 will render
</>
\`\`\`

### switch directives

You can also check the [\`switch directives\`](/docs/more/switch-directive), works like \`switch\` in Javascript.

<hr/>

## Rendering lists

You will rely on JavaScript features like for loop and the array map() function to render lists of components.

For example, let’s say you have an array of products:

<br/>

\`\`\`ts
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
\`\`\`

Inside your component, use the \`map()\` function to transform an array of products into an array of \`<li>\` items:

\`\`\`ts
const listItems = products.map(product => <li key={product.id}>{product.title}</li>);

return <ul>{listItems}</ul>;
\`\`\`

Notice how \`<li>\` has a \`key \` attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. \`Ruvy\` uses your keys to know what happened if you later insert, delete, or reorder the items.

<br/>

> If there is a duplicate \`key\`, \`Ruvy\` will throw an error.

<hr/>

## Responding to events

You can respond to events by declaring event handler functions inside your components:

<br/>

\`\`\`ts
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

Notice how \`onClick={handleClick}\` has no parentheses at the end! **DO NOT** call the event handler function: you only need to pass it down. \`Ruvy\` will call your event handler when the user clicks the button.

<hr/>

## Updating the screen

Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.

<br/>

First, import \`useState\`:

<br/>

\`\`\`ts
import { useState } from '@riadh-adrani/ruvy';
\`\`\`

Now you can declare a state variable inside your component:

<br/>

\`\`\`ts
function MyButton() {
  const [count, setCount, getCount] = useState(0);
  // ...
\`\`\`

You’ll get three things from \`useState\`: the current state (\`count\`), the function that lets you update it (\`setCount\`) and a getter function \`getCount\` that will retrieve the current value of the state. You can give them any names, but the convention is to write [\`\`value\`\`, \`\`setValue\`\`, \`getValue\`].

<br/>

The first time the button is displayed, \`count\` will be \`0\` because you passed \`0\` to \`useState()\`. When you want to change state, call \`setCount()\` and pass the new value to it. Clicking this button will increment the counter:

\`\`\`ts
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
\`\`\`

\`Ruvy\` will compute your component function again. This time, count will be \`1\`. Then it will be \`2\`. And so on.

<br/>

If you render the same component multiple times, each will get \`its own state\`.

<br/>

> For more infos about hooks, check out the [Hooks](/docs/api#hooks) documentation.

<hr/>

## Next step

Check out the [Tutorial](/learn/tutorial-todo) to put them into practice and build your first mini-app.

<br/>
`,Vl=`# Quick Start

In this section, you will learn:

> - How to create and nest components
> - How to add markup and styles
> - How to display data
> - How to render conditions and lists
> - How to respond to events and update the screen

<br/>

## Creating and nesting components

\`React\`, \`Vue\`, \`Angular\`, \`Svelte\` and many other frameworks' apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

<br/>

\`Ruvy\` components are JavaScript functions that return markup:

<br/>

\`\`\`ts
function MyButton() {
  return <button>Click me</button>;
}
\`\`\`

Now that you’ve declared MyButton, you can nest it into another component:

<br/>

\`\`\`ts
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
\`\`\`

Notice that \`<MyButton/>\` starts with a capital letter. That’s how you know it’s a \`Ruvy\` component. \`Ruvy\` Component names must always start with a capital letter, while HTML tags must be lowercase.

<hr/>

## Writing markup with JSX

The markup syntax you’ve seen above is called JSX. It is optional, but most \`Ruvy\` projects use JSX for its convenience, and we highly recommend it, otherwise, you may question your own existence.

<br/>

JSX is stricter than HTML. You have to close tags like \`<br />\`. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a \`<div>...</div>\` or an empty \`<>...</>\` wrapper:

\`\`\`ts
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
}
\`\`\`

<hr/>

## Adding styles

Unlike \`React\`, you can specify a CSS class with \`class\` attribute just like html, but you can still use \`className\` too, for more information see [\`class section\`](/ruvy/docs/more/class-attribute)

<br/>

\`\`\`ts
<img class="avatar" />
\`\`\`

Then you write the CSS rules for it in a separate CSS file:

\`\`\`css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
\`\`\`

We do not prescribe how you add CSS files. In the simplest case, you’ll add a \`<link>\` tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

<hr/>

## Displaying Data

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display \`user.name\`:

<br/>

\`\`\`ts
return <h1>{user.name}</h1>;
\`\`\`

You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes. For example, \`class="avatar"\` passes the \`"avatar"\` string as the CSS class, but \`src={user.imageUrl}\` reads the JavaScript \`user.imageUrl\` variable value, and then passes that value as the src attribute:

<br/>

\`\`\`ts
return <img class="avatar" src={user.imageUrl} />;
\`\`\`

<hr/>

## Conditional rendering

Like \`React\`, you can use the same techniques as you use when writing regular JavaScript code. For example, you can use an if statement to conditionally include JSX:

<br/>

\`\`\`ts
let content;

if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

return <div>{content}</div>;
\`\`\`

If you prefer more compact code, you can use the \`conditional ? operator\`. Unlike if, it works inside JSX:

<br/>

\`\`\`ts
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
\`\`\`

When you don’t need the else branch, you can also use a shorter \`logical &&\` syntax:

<br/>

\`\`\`ts
<div>{isLoggedIn && <AdminPanel />}</div>
\`\`\`

### conditional directives

We saved the best for last, we offer [\`if\`](/docs/more/if-directive), [\`else-if\`](/docs/more/if-directive#elseif) and [\`else\`](/docs/more/if-directive#else) directives that works like \`Vue.js\`.

<br/>

\`\`\`ts
<>
  <div if={false} />
  <div else-if={false} />
  <div else /> // 👈 will render
</>
\`\`\`

### switch directives

You can also check the [\`switch directives\`](/docs/more/switch-directive), works like \`switch\` in Javascript.

<hr/>

## Rendering lists

You will rely on JavaScript features like for loop and the array map() function to render lists of components.

For example, let’s say you have an array of products:

<br/>

\`\`\`ts
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
\`\`\`

Inside your component, use the \`map()\` function to transform an array of products into an array of \`<li>\` items:

\`\`\`ts
const listItems = products.map(product => <li key={product.id}>{product.title}</li>);

return <ul>{listItems}</ul>;
\`\`\`

Notice how \`<li>\` has a \`key \` attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. \`Ruvy\` uses your keys to know what happened if you later insert, delete, or reorder the items.

<br/>

> If there is a duplicate \`key\`, \`Ruvy\` will throw an error.

<hr/>

## Responding to events

You can respond to events by declaring event handler functions inside your components:

<br/>

\`\`\`ts
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

Notice how \`onClick={handleClick}\` has no parentheses at the end! **DO NOT** call the event handler function: you only need to pass it down. \`Ruvy\` will call your event handler when the user clicks the button.

<hr/>

## Updating the screen

Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.

<br/>

First, import \`useState\`:

<br/>

\`\`\`ts
import { useState } from '@riadh-adrani/ruvy';
\`\`\`

Now you can declare a state variable inside your component:

<br/>

\`\`\`ts
function MyButton() {
  const [count, setCount, getCount] = useState(0);
  // ...
\`\`\`

You’ll get three things from \`useState\`: the current state (\`count\`), the function that lets you update it (\`setCount\`) and a getter function \`getCount\` that will retrieve the current value of the state. You can give them any names, but the convention is to write [\`\`value\`\`, \`\`setValue\`\`, \`getValue\`].

<br/>

The first time the button is displayed, \`count\` will be \`0\` because you passed \`0\` to \`useState()\`. When you want to change state, call \`setCount()\` and pass the new value to it. Clicking this button will increment the counter:

\`\`\`ts
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}
\`\`\`

\`Ruvy\` will compute your component function again. This time, count will be \`1\`. Then it will be \`2\`. And so on.

<br/>

If you render the same component multiple times, each will get \`its own state\`.

<br/>

> For more infos about hooks, check out the [Hooks](/docs/api#hooks) documentation.

<hr/>

## Next step

Check out the [Tutorial](/learn/tutorial-todo) to put them into practice and build your first mini-app.

<br/>
`,Ql=[{from:"0.5.0",to:"0.5.0",md:Xl},{from:"0.5.2",md:Vl}],Kl=`# Setup a new Project

Unlike \`React\`, \`Ruvy\` is a framework, so it is recommended to build your whole app using it, we suggest a few methods to create your project:

---

## \`CLI\`

You can create a new starter template using our cli <a target="_blank" href="https://github.com/RiadhAdrani/create-ruvy">\`create-ruvy\`</a>:

<br/>

\`npm\`

\`\`\`bash
npx @riadh-adrani/create-ruvy
\`\`\`

\`yarn\`

\`\`\`bash
yarn create @riadh-adrani/ruvy
\`\`\`

---

## \`StackBlitz\`

If you want to quickly try \`Ruvy\`, we offer a starter sandbox on \`StackBlitz\` that you can check out <a target="_blank" href="https://stackblitz.com/edit/ruvy-dbjavf?file=src%2Fmain.tsx">here</a>.

<br/>

<iframe src="https://stackblitz.com/edit/ruvy-dbjavf?embed=1&file=src%2Fmain.tsx" class="stackblitz"></iframe>
`,eu=[{from:"0.5.0",md:Kl}],Co=[{path:"",versions:Yl},{path:"/quick-start",versions:Ql,title:"Quick Start"},{path:"/setup",versions:eu,title:"Setup"},{path:"/tutorial-todo",versions:ql,title:"Tutorial : Todo"}],Ao=n=>createJsxElement("label",{...n,class:"switch rounded scale-55 u-border"},createJsxElement("input",{checked:n.checked,type:"checkbox","class:switch-input":!0}),createJsxElement("span",{class:"switch-slider rounded before:rounded"})),tu=()=>{const{computedTheme:n,toggleTheme:e,isNavOpen:t,toggleNav:o,version:r,setVersion:a}=$t(),i=yr(),s=ge(()=>[{title:"Learn",href:"/learn"},{title:"Docs",href:"/docs"},{title:"Changelogs",href:"/changelogs"},{title:"Examples",href:"/examples"},{title:"Acknowledgment",href:"/acknowledgment"}]),l=ge(()=>[{title:"GitHub",href:"https://github.com/RiadhAdrani/ruvy"}]);return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:["row-center","w-100%","bg-[color:var(--primary)]","p-x-5","h-[var(--nav-bar-height)]","border-b border-b-1px border-b-solid border-[color:var(--border-low)]","fixed top-0px z-[var(--nav-bar-z)]"]},createJsxElement("div",{class:"row justify-between items-center max-w-1200px flex-1 z-2"},createJsxElement("div",{class:"row items-center gap-8"},createJsxElement("a",{href:{name:"Home"},class:"p-x-1 row-center gap-3"},createJsxElement("img",{src:i,class:"h-25px w-25px"}),createJsxElement("h2",{class:"hidden md:inline-block"},"Ruvy")),createJsxElement("div",{class:"row hidden md:flex gap-1"},s.map(u=>createJsxElement(Ne,{href:u.href,target:"_blank",isActive:Pt(u.href)},u.title)))),createJsxElement("div",{class:"row hidden gap-3 md:flex items-center"},createJsxElement("div",{class:"row gap-1"},l.map(u=>createJsxElement(Ne,{href:u.href,target:"_blank"},u.title))),createJsxElement("select",{onChange:u=>a(u.currentTarget.value),class:"py-0.5 px-1 border-[var(--border)] bg-[var(--secondary)] text-inherit"},fe.toReversed().map(u=>createJsxElement("option",{class:"p-y-0.5",key:u,selected:r===u,value:u},createJsxElement("div",null,"v",u)," ",createJsxElement("div",{class:"m-l-2",if:u===fe.at(-1)},"@latest")))),createJsxElement(Ao,{checked:n===he.Dark,onChange:()=>e()})),createJsxElement("div",{class:"col md:hidden"},createJsxElement(At,{type:"text",class:["nav-bar-mobile-btn col-center",t?"nav-bar-mobile-btn-expanded":""],onClick:()=>o()})))),createJsxElement("div",{class:["col md:hidden",t?"top-[var(--nav-bar-height)] opacity-100":"-top-100vh opacity-0","fixed left-0px right-0px","bg-[color:var(--primary)]","overflow-y-auto","duration-[var(--t-long)]","p-5","z-1"],style:{height:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:["col gap-3 p-y-5","border-b border-b-solid border-b-1px border-[color:var(--border-low)]"]},s.map(u=>createJsxElement(Ne,{href:u.href,class:"",target:"_blank",isActive:Pt(u.href),onClick:()=>o(!1)},u.title))),createJsxElement("div",{class:["col gap-3 p-y-5","border-b border-b-solid border-b-1px border-[color:var(--border-low)]"]},l.map(u=>createJsxElement(Ne,{href:u.href,target:"_blank"},u.title))),createJsxElement("div",{class:"row items-center justify-between p-t-5"},createJsxElement("p",{class:"p-x-2"},"Version"),createJsxElement("select",{onChange:u=>a(u.target.value),class:"p-1"},fe.map(u=>createJsxElement("option",{class:"p-y-1",key:u,selected:r===u,value:u},createJsxElement("div",null,"v",u)," ",createJsxElement("div",{class:"m-l-2",if:u===fe.at(-1)},"@latest"))))),createJsxElement("div",{class:"row items-center justify-between p-y-5 text-[var(--text-low)]"},createJsxElement("p",{class:"p-x-2"},"Theme"),createJsxElement(Ao,{checked:n===he.Dark,onChange:()=>e()})),createJsxElement(fr,null)))},fn=n=>{var s;const{item:e,root:t,onClick:o}=n,[r,a]=_e(!1),i=hn(()=>a(!r),r);return createJsxElement(createJsxFragmentElement,null,e.children?createJsxElement("details",{open:r},createJsxElement("summary",{onClick:i},createJsxElement(Ne,{...n,href:`${t}${e.path}`,isActive:Pt(`${t}${e.path}`),onClick:o,class:"m-y-2"},e.title)),createJsxElement("div",{class:"m-l-2 col border-l-solid  border-l-1px border-l-[color:var(--border)]"},(s=e.children)==null?void 0:s.map(l=>createJsxElement(fn,{item:{...l,path:`${e.path}${l.path}`},root:t,onClick:o},l.title)))):createJsxElement(Ne,{...n,href:`${t}${e.path}`,isActive:Pt(`${t}${e.path}`),onClick:o,class:"m-l-18px m-y-1"},e.title))},nu=({items:n,root:e})=>{const[t,o]=_e(!1),[r,a]=gr(),i=()=>{const l=!t;o(l),l?r():a()},s=()=>{o(!1),a()};return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:["fixed top-[var(--nav-bar-height)]","w-[var(--side-bar-width)]","bg-[var(--primary)]","border-r border-r-solid border-r-[color:var(--border-low)]","overflow-hidden","hidden md:flex md:col"],style:{height:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:"col gap-2 overflow-auto p-y-10 w-[var(--side-bar-width)]",style:{height:"calc(100vh - var(--nav-bar-height))"}},n.map(l=>createJsxElement(fn,{item:l,root:e})))),createJsxElement("div",{class:"col md:hidden fixed right-0 left-0 top-[var(--nav-bar-height)] w-100%"},createJsxElement("p",{class:["text-[var(--text-low)] hover:text-[var(--text)]","p-y-1.5 w-100% cursor-pointer bg-[var(--primary)]","border-b p-x-6 border-b-solid border-b-[color:var(--border-low)]","h-[var(--side-bar-height)]"],onClick:()=>i()},"Menu"),createJsxElement("div",{class:["bg-[var(--primary)] fixed w-100% overflow-hidden",t?"bottom-0px opacity-100":"-bottom-100vh opacity-0"],style:{height:"calc(100vh - var(--nav-bar-height) - var(--side-bar-height))"}},createJsxElement("div",{class:"col gap-2 overflow-auto p-t-5 p-x-5",style:{height:"calc(100vh - var(--nav-bar-height) - var(--side-bar-height))"}},n.map(l=>createJsxElement(fn,{item:l,root:e,onClick:s}))))))},wr=(n,e)=>n.reduce((t,o)=>{const r=fe.indexOf(e);if(o.versions.some(i=>{if(i.from===e||i.to===e)return!0;const s=fe.indexOf(i.from);if(i.to){const l=fe.indexOf(i.to);if(s<=r&&r<=l)return!0}else if(s<=r)return!0;return!1})){const i=o.children?wr(o.children,e):void 0,s={...o,children:i};t.push(s)}return t},[]),To=({rootURL:n,sideBarItems:e})=>{const{version:t}=$t(),o=ge(()=>wr(e,t),[e,t]);return createJsxElement(createJsxFragmentElement,null,createJsxElement(nu,{items:o,root:n}),createJsxElement("div",{class:["row overflow-x-none flex-1 justify-stretch self-stretch","m-l-0 md:m-l-[var(--side-bar-width)]","p-l-0 md:p-l-10"]},createJsxElement(st,null)))},ou="# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n## Unreleased\n\n## 0.5.6 - 2024-03-11\n### Changed\n- reworked typing.\n\n## 0.5.5 - 2024-02-04\n### Fixed\n- bump `@riadh-adrani/dom-router` version.\n\n## 0.5.4 - 2024-02-02\n### Fixed\n- export missing `getParams` from router.\n\n## 0.5.3 - 2024-01-28\n### Fixed\n- bump `@riadh-adrani/domer` version.\n- bump `@riadh-adrani/dom-router` version.\n\n## 0.5.2 - 2024-01-14\n### Fixed\n- fixed `createDestination` throwing when used without a router.\n\n## 0.5.1 - 2024-01-14\n### Added\n- `createComposable` create a global hook that can be accessed from anywhere in the tree.\n- `useComposable` retrieve a named `composable`.\n- `unmountApp` used to unmount the current app instance.\n- `unmountRouter` used to unmount the current router instance.\n- `createDestination` create a valid url using a destination request.\n\n### Changed\n- remake the framework from scratch and changed its architecture to be more expandable and dynamic.\n- switched to `@riadh-adrani/domer` instead of `@riadh-adrani/dom-utils` for DOM manipulations.\n- switched to `@riadh-adrani/dom-router` as the base of the routing system.\n- `navigate` now accepts a second parameter `DestinationOptions`.\n\n### Removed\n- `createStore` is removed, replaced by `createComposable`.\n- `batch` no longer useful during to framework architectural change.\n- `replace` removed, you can set `DestinationOptions.replace` to `true` instead.\n\n## 0.5.0 - 2023-10-03\n### Removed\n- removed experimental hooks `useReactive` and `usePromise`.\n\n## 0.4.14 - 2023-09-09\n### Changed\n- optimized `actions` by collecting them while traversing the tree.\n\n## 0.4.13 - 2023-09-02\n### Added\n- `dom:focused` attribute that will try to focus the element when created, ignored after the first render.\n\n### Changed\n- `innerHTML` to `dom:innerHTML` to indicate it's framework-specific.\n\n### Fixed\n- changing unmounted element position causes the app to crash.\n\n## 0.4.12 - 2023-08-17\n### Added\n- named `<Fragment/>` component.\n\n### Changed\n- `class` attributes now accepts arrayables of `boolean`, `undefied` or `null`.\n\n## 0.4.11 - 2023-08-13\n### Fixed\n- children not correctly reordered in some edge cases.\n- allow the use of event modifiers without an actual function value\n\n## 0.4.10 - 2023-08-10\n### Added\n- `dom:tag` to make html element tag dynamic.\n\n### Fixed\n- `<Portal/>` element not properly changing containers.\n\n## 0.4.9 - 2023-08-04\n### Added\n- `innerHTML` attribute that allow direct setting of an HTMLElement innerHTML prop.\n- add event modifiers like `Vue.js`, in this form `onEvent:prevent`, `onEvent:stop` or both `onEvent:prevent-stop`.\n\n## 0.4.8 - 2023-07-30\n\n## 0.4.7 - 2023-07-30\n\n## 0.4.6 - 2023-07-24\n### Removed\n- removed all `deprecated` functions and classes.\n\n### Fixed\n- `anchor` element not working as intended\n\n## 0.4.5 - 2023-07-19\n### Added\n- `name` route property, similar to `vue-router`.\n- `titleTransform` handler to preprocess the title before applying it.\n- `createStore` similar to `writable` store in `svelte`\n\n### Changed\n- `navigate` now accepts a number or an object for a `named` route.\n\n### Deprecated\n- `useKey` is now replaced with `createStore`.\n- `Store` as it is becoming useless.\n\n## 0.4.4 - 2023-07-06\n### Added\n- Add `switch`, `case` and `case:default` directives.\n- Attach host `Branch` object to dom node.\n- `ref` typing.\n\n### Changed\n- `useState` accepts an initilizer function, and a setter callback.\n- improved project structure.\n- improved typing.\n\n## 0.4.3 - 2023-07-01\n### Changed\n- refactored project structure for a smaller bundle size.\n\n## 0.4.2 - 2023-06-28\n\n## 0.4.1 - 2023-06-28\n### Added\n- `else` and `else-if` directives that goes with `if` directive, similar to `vue.js`\n\n### Changed\n- improve `JSX.Element`s typing\n- better `svg` elements typing\n\n## 0.4.0 - 2023-06-25\n### Added\n- `if` directive which accepts a boolean to determine if a component should be rendered or not.\n- `PropWithUtility` that allow the developer to initialize a prop type with optional `children`, `key` and `if` properties.\n- `getPathname` returns the current url without the `base`.\n\n### Changed\n- `useReactive` uses `@riadh-adrani/utils/createReactive` to create reactive object instances.\n- `mountRouter` config is now optional.\n- deperecated `getRoute` in favor of `getPathname`.\n\n## 0.3.0 - 2023-06-22\n### Added\n- `useContext`, same as `react.js`.\n- `useReactive`, similar to `vue.js`'s `reactive`.\n- `usePromise`, a hook that allows the user to fetch data while tracking the request state and return value.\n- `joinClasses`, a utility function that filter and returns a valid className as a string.\n- `getSearchQuery`, a function that returns the search params of the current route as a typed object.\n- `getRoute`, a function that returns the current url without the `base`.\n- added `SVG` elements with shallow typing.\n- creation of the docs website.\n- add `titleSuffix` and `titlePrefix` as optional params in `RouterParams`.\n- add `<Portal/>` component, allowing to teleport elements in another DOM container.\n\n### Fixed\n- `scrollToTop` not having any effect, when a new page is loaded.\n\n## 0.2.0 - 2023-06-02\n### Added\n- JSX syntax for writing expressive and reusable UI components.\n- Function components for a modular and composable code structure.\n- Hooks for managing state, performing side effects, and custom logic reuse: `useState`, `useEffect`, `useMemo`, `useCallback`, `useId` and `useRef`.\n- Synchronous rendering for a straightforward and beginner-friendly development experience.\n- Intuitive API that closely resembles React's patterns and conventions.\n- SPA Router.\n- key-value Store.\n",ru=()=>createJsxElement(dt,{content:ou}),au=[{path:"/",element:createJsxElement(createJsxFragmentElement,null,createJsxElement(tu,null),createJsxElement("div",{class:"w-100% overflow-x-hidden row-center p-x-6 m-t-[var(--nav-bar-height)]",style:{minHeight:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:"col max-w-1200px flex-1 self-stretch overflow-x-hidden p-y-12 md:p-y-10"},createJsxElement(st,null)))),children:[{path:"/*",element:createJsxElement(vr,null)},{path:"",title:"Home",element:createJsxElement(vi,null),name:"Home"},{path:"/changelogs",title:"Changelogs",element:createJsxElement(ru,null),name:"ChangeLogs"},{path:"/acknowledgment",title:"Acknowledgment",element:createJsxElement(Fi,null)},{path:"/examples",title:"Examples",element:createJsxElement(Ci,null)},{path:"/learn",title:"Learn",element:createJsxElement(To,{rootURL:"/learn",sideBarItems:Co}),children:Co.map(n=>({title:n.title,path:n.path,element:createJsxElement(Tt,{versions:n.versions})}))},{path:"/docs",title:"Docs",element:createJsxElement(To,{rootURL:"/docs",sideBarItems:Eo}),children:[{path:"",element:createJsxElement(Di,null)},...Eo.map(n=>({path:n.path,title:n.title,element:createJsxElement(st,null),children:[{path:"",element:createJsxElement(Tt,{versions:n.versions})},...n.children.map(e=>({path:e.path,title:e.title,element:createJsxElement(Tt,{versions:e.versions})}))]}))]}]}];$a({routes:au,base:"/ruvy",transformTitle:n=>`${n} - Ruvy`,correctScrolling:!0});Ca({app:createJsxElement(ws,null),host:document.querySelector("#app")});
