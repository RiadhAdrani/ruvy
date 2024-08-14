var Gr=Object.defineProperty;var so=t=>{throw TypeError(t)};var qr=(t,e,n)=>e in t?Gr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ee=(t,e,n)=>qr(t,typeof e!="symbol"?e+"":e,n),Zr=(t,e,n)=>e.has(t)||so("Cannot "+n);var io=(t,e,n)=>e.has(t)?so("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n);var Tt=(t,e,n)=>(Zr(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Yr=/[\p{Lu}]/u,Xr=/[\p{Ll}]/u,lo=/^[\p{Lu}](?![\p{Lu}])/gu,Go=/([\p{Alpha}\p{N}_]|$)/u,An=/[_.\- ]+/,Vr=new RegExp("^"+An.source),uo=new RegExp(An.source+Go.source,"gu"),co=new RegExp("\\d+"+Go.source,"gu"),Qr=(t,e,n,o)=>{let r=!1,a=!1,s=!1,i=!1;for(let l=0;l<t.length;l++){const u=t[l];i=l>2?t[l-3]==="-":!0,r&&Yr.test(u)?(t=t.slice(0,l)+"-"+t.slice(l),r=!1,s=a,a=!0,l++):a&&s&&Xr.test(u)&&(!i||o)?(t=t.slice(0,l-1)+"-"+t.slice(l-1),s=a,a=!1,r=!0):(r=e(u)===u&&n(u)!==u,s=a,a=n(u)===u&&e(u)!==u)}return t},Kr=(t,e)=>(lo.lastIndex=0,t.replace(lo,n=>e(n))),ea=(t,e)=>(uo.lastIndex=0,co.lastIndex=0,t.replace(uo,(n,o)=>e(o)).replace(co,n=>e(n)));function ta(t,e){if(!(typeof t=="string"||Array.isArray(t)))throw new TypeError("Expected the input to be `string | string[]`");if(e={pascalCase:!1,preserveConsecutiveUppercase:!1,...e},Array.isArray(t)?t=t.map(a=>a.trim()).filter(a=>a.length).join("-"):t=t.trim(),t.length===0)return"";const n=e.locale===!1?a=>a.toLowerCase():a=>a.toLocaleLowerCase(e.locale),o=e.locale===!1?a=>a.toUpperCase():a=>a.toLocaleUpperCase(e.locale);return t.length===1?An.test(t)?"":e.pascalCase?o(t):n(t):(t!==n(t)&&(t=Qr(t,n,o,e.preserveConsecutiveUppercase)),t=t.replace(Vr,""),t=e.preserveConsecutiveUppercase?Kr(t,n):n(t),e.pascalCase&&(t=o(t.charAt(0))+t.slice(1)),ea(t,o))}const na=t=>typeof t=="number",oa=t=>Array.isArray(t),ra=t=>t===null,aa=t=>t===void 0,sa=t=>["string","number","bigint","boolean","undefined","symbol","null"].includes(typeof t),ia=(t,e)=>sa(t)||ra(t)?!1:Object.prototype.hasOwnProperty.call(t,e);var ft;(function(t){t.SVG="http://www.w3.org/2000/svg",t.HTML="http://www.w3.org/1999/xhtml",t.MATH="http://www.w3.org/1998/Math/MathML"})(ft||(ft={}));const la=["stop","prevent","self","capture","once","passive"];let Ie={};const ua=["ns"],Bt="class:",ca=(t={})=>{Ie=t},da=(t,e={},n=[])=>{const o=e.ns??ft.HTML,r=document.createElementNS(o,t);r.__events__={};const a=[];for(const s of Object.keys(e)){if(ua.includes(s))continue;const i=e[s];if(Yo(s)){a.push({key:s,value:i});continue}const l=Xo(s);if(l){const{event:u,modifiers:p}=l;Vo(s,u,i,r,p);continue}gn(s,i,r)}if(a.length>0){const s=Zo(a);gn("class",s,r)}return n.forEach(s=>{const i=s instanceof Node?s:qo(s);r.appendChild(i)}),r},qo=(t="")=>document.createTextNode(`${t}`),Zo=t=>[...t.filter(n=>n.key==="class"),...t.filter(n=>n.key==="className"),...t.filter(n=>n.key.startsWith(Bt))].reduce((n,o)=>(o.key.startsWith(Bt)&&o.value?n.push(o.key.substring(Bt.length)):oa(o.value)?n.push(o.value.filter(r=>!!r).join(" ")):typeof o.value=="string"&&n.push(o.value),n),[]).join(" "),Yo=t=>{var e,n,o,r;return!!(t==="class"||t==="className"&&!((n=(e=Ie.attributes)==null?void 0:e.class)!=null&&n.className)||t.startsWith(Bt)&&((r=(o=Ie.attributes)==null?void 0:o.class)==null?void 0:r.directive)!==!1)},ha=/@[a-zA-Z][a-zA-Z0-9\-:]*/,pa=/on[a-zA-Z][a-zA-Z0-9\-:]*/,ma=/on:[a-zA-Z][a-zA-Z0-9\-:]*/,Xo=t=>{var a,s,i,l,u,p;let e;if(ha.test(t)&&((s=(a=Ie.events)==null?void 0:a.syntax)==null?void 0:s.vue)!==!1)e=t.substring(1);else if(pa.test(t)&&((l=(i=Ie.events)==null?void 0:i.syntax)==null?void 0:l.react)!==!1)e=t.substring(2);else if(ma.test(t)&&((p=(u=Ie.events)==null?void 0:u.syntax)==null?void 0:p.svelte)!==!1)e=t.substring(3);else return!1;const n=e.indexOf(":");if(n===-1)return{event:e.toLowerCase(),modifiers:[]};const o=e.substring(0,n).toLowerCase(),r=e.substring(n+1).split("-").reduce((g,m)=>(la.includes(m)&&g.push(m),g),[]);return{event:o,modifiers:r}},Vo=(t,e,n,o,r=[])=>{var u;let a;typeof n=="function"?a=n:a=()=>0;const s=r.length===0?a:p=>{if(!(r.includes("self")&&p.target!==o)){for(const g of r)g==="stop"?p.stopPropagation():g==="prevent"&&p.preventDefault();a(p)}},i=(u=Ie.events)!=null&&u.wrapper?p=>{var g,m;return(m=(g=Ie.events)==null?void 0:g.wrapper)==null?void 0:m.call(g,p,s)}:s,l={};r.includes("once")&&(l.once=!0),r.includes("capture")&&(l.capture=!0),r.includes("passive")&&(l.passive=!0),Qo(t,e,o),o.__events__[t]=i,o.addEventListener(e,i,l)},Qo=(t,e,n)=>{const o=n==null?void 0:n.__events__,r=o==null?void 0:o[t];r&&(n.removeEventListener(e,r),delete o[t])},gn=(t,e,n)=>{let o=`${e}`,r=!0;if(er.includes(t))o=!!e,n.toggleAttribute(t,o);else{if(t==="style"&&n.style){const i=n;typeof e=="string"?o=e:e&&typeof e=="object"&&(r=!1,Object.keys(e).forEach(l=>{try{i.style[l]=`${e[l]}`}catch(u){console.error(u)}}))}r&&n.setAttribute(t,o)}const a=Ko(t),s=a in n;r&&s&&(n[a]=o)},fa=(t,e)=>{er.includes(t)&&e.toggleAttribute(t,!1),e.removeAttribute(t);const n=Ko(t);ia(e,n)&&(e[n]=null)},Ko=t=>{let e;for(const n of Object.keys(ho)){const o=ho[n];(n===t||o===t)&&(e={key:n,value:o})}return e?e.value:ta(t.replaceAll(":"," "))},Gt=(t,e,n=-1)=>{const o=e.childNodes.item(n);e.insertBefore(t,o)},ga=(t,e)=>{if(!t.parentNode)return;const n=t.parentNode.childNodes.item(e),o=t.parentNode.childNodes.item(e-1);n===t||o===t||Gt(t,t.parentNode,e)},ba=t=>{t.remove()},ho={class:"className",accesskey:"accessKey",autocapitalize:"autoCapitalize",contenteditable:"contentEditable",contextmenu:"contextMenu",playsinline:"playsInline",spellcheck:"spellCheck",tabindex:"tabIndex",noshade:"noShade",hreflang:"hrefLang",referrerpolicy:"referrerPolicy",datetime:"dateTime",autoplay:"autoPlay",crossorigin:"crossOrigin",ismap:"isMap",usemap:"useMap",srclang:"srcLang",allowfullscreen:"allowFullScreen",allowpaymentrequest:"allowPaymentRequest",srcdoc:"srcDoc",colspan:"colSpan",rowspan:"rowSpan",autofocus:"autoFocus",formaction:"formAction",formenctype:"formEncType",formmethod:"formMethod",formnovalidate:"formNoValidate",formtarget:"formTarget",acceptcharset:"acceptCharset",autocomplete:"autoComplete",novalidate:"noValidate",dirname:"dirName",maxlength:"maxLength",readonly:"readOnly",minlength:"minLength"},er=["contenteditable","autofocus","autoplay","allowfullscreen","allowpaymentreques","checked","controls","compact","disabled","hidden","ismap","loop","multiple","muted","open","playsinline","readonly","required","selected","async","defer"],ya=t=>Array.isArray(t),po=t=>typeof t=="object",bn=t=>t===null,va=t=>typeof t=="boolean",wa=t=>typeof t=="function",mo=t=>[!1,0,-0,"",null,void 0,NaN].includes(t),xa=t=>["string","number","bigint","boolean","undefined","symbol","null"].includes(typeof t),De=(t,e)=>xa(t)||bn(t)?!1:Object.prototype.hasOwnProperty.call(t,e),fo=(t,e)=>{if(Object.is(t,e))return!0;if(!po(t)||!po(e)||bn(t)||bn(e))return!1},yt=(t,e,n=10)=>{const o=fo(t,e);if(typeof o=="boolean")return o;const r=Object.keys(t),a=Object.keys(e);if(r.length!==a.length||[...r].sort().join("")!==[...a].sort().join(""))return!1;for(let s=0;s<r.length;s++){const i=t[r[s]],l=e[r[s]];if(fo(i,l)===!1||n>0&&!yt(i,l,n-1))return!1}return!0};var k=(t=>(t.Function="#-function",t.Element="#-element",t.Root="#-root",t.Text="#-text",t.Null="#-null",t.Context="#-context",t.Outlet="#-outlet",t.Portal="#-portal",t.Fragment="#-fragment",t.JsxFragment="#-jsx-fragment",t.ErrorBoundary="#-error-boundary",t))(k||{}),Q=(t=>(t.State="#-state",t.Effect="#-effect",t.Memo="#-memo",t.Ref="#-ref",t.Context="#-context",t.Composable="#-composable",t.Error="#-error",t))(Q||{}),O=(t=>(t.Mounted="#-mounted",t.Mounting="#-mounting",t.Unmounting="#-unmounting",t.Unmounted="#-unmounted",t))(O||{});const tr=Symbol.for("ruvy-component"),gt=()=>null,ka=t=>t,Da=()=>null,nr=t=>null;var N=(t=>(t.RenderElement="render-element",t.RenderText="render-text",t.RenderInnerHTML="render-inner-html",t.ReorderElements="reorder-elements",t.ChangeElementPosition="change-element-position",t.RunEffectCleanup="run-cleanup",t.RunEffect="run-effect",t.UnmountComponent="unmount-component",t.UpdateProps="update-props",t.UpdateText="update-text",t.UnmountedComponent="unmounted-component",t.RemoveComponent="remove-component",t.UpdatePortalChildren="update-portal-children",t.SetComponentMounted="mounted-component",t.RefElement="ref-element",t.UnrefEelement="unref-element",t))(N||{});const Ea=["unmount-component","render-element","render-text","unref-element","ref-element","render-inner-html","unmounted-component","remove-component","change-element-position","reorder-elements","update-portal-children","update-props","update-text","mounted-component","run-cleanup","run-effect"];class R extends Error{constructor(e){super(),this.message=`[Ruvy] : ${e}`}}let ln=0,go=-1;const Tn=()=>{let t="";const e=Date.now();e-go<10?ln++:ln=0,go=e;const n=Math.floor(Math.random()*10)+10,o=Math.floor(Math.random()*100)+100,r=Math.floor(Math.random()*10)+10;return t=`${e}-${ln}-${n}-${o}-${r}`,t};function bo(t,e,n){const o=[...t],r=o.splice(e,1)[0];return o.splice(n,0,r),o}const le=t=>({date:new Date,id:Tn(),...t}),Fa=t=>{const e=is(t.props);return le({component:t,execute:()=>{const o=da(t.type,e),r=Bn(t);if(!r.instance)throw new R("unable to find element hosting parent.");const{index:a}=Yt(t);Gt(o,r.instance,a),t.instance=o,t.status=O.Mounted},type:N.RenderElement})},yo=(t,e)=>le({component:t,execute:()=>{const o=t.instance;if(!o)throw new R("unable to set innerHTML, component is not yet mounted.");o.innerHTML=e},type:N.RenderInnerHTML}),Ca=(t,e)=>le({component:t,execute:()=>{const o=t.instance;if(!o)throw new R("unable to update element, component is not yet mounted.");for(const r of e){const{key:a,operation:s}=r,i=Xo(a);if(i){const{event:l}=i;s==="create"||s==="update"?Vo(a,l,r.value,o):Qo(a,l,o)}else s==="create"||s==="update"?gn(a,r.value,o):fa(a,o)}},type:N.UpdateProps}),vo=(t,e)=>le({execute:()=>{const o=t.instance;if(!o)throw new R("unable to set reference, component is not yet mounted.");e.value=o},component:t,type:N.RefElement}),Aa=(t,e)=>le({execute:()=>{e.value=void 0},component:t,type:N.UnrefEelement}),Ta=t=>le({execute:()=>{t.status=O.Mounted},component:t,type:N.SetComponentMounted}),Sa=(t,e)=>le({execute:()=>{if(zt(t)&&!e.isHostParentUnmounting){const o=t.instance;if(!o)throw new R("unable to unmount node, component instance does not exist.");ba(o)}t.status=O.Unmounted},component:t,type:N.UnmountComponent}),_a=t=>le({execute:()=>{Pn(t).forEach(o=>{const r=o.instance;if(!r)throw new R("unable to change element position, component instance does not exist.");const{index:a,found:s}=Yt(o);if(!s)throw new R("unable to compute node index in dom");if(!r.parentElement)throw new R("element does not have any parent");ga(r,a)})},component:t,type:N.ReorderElements}),Ra=t=>le({component:t,execute:()=>{const n=qo(t.text),o=t.domParent;if(!o.instance)throw new R("unable to find element hosting parent.");const{index:r,found:a}=Yt(t);if(!a)throw new R("unable to compute node index in dom");Gt(n,o.instance,r),t.instance=n},type:N.RenderText}),Ba=(t,e)=>le({component:t,execute:()=>{const o=t.instance;if(!o)throw new R("unable to change element position, component instance does not exist.");o.data=e},type:N.UpdateText}),yn=(t,e)=>le({component:t,execute:()=>{const o=e.callback();typeof o=="function"&&(e.cleanup=o)},type:N.RunEffect}),or=(t,e)=>le({component:t,execute:()=>{var o;(o=e.cleanup)==null||o.call(e),e.cleanup=void 0},type:N.RunEffectCleanup}),Ia=t=>le({component:t,execute:()=>{const n=t.instance;if(!n)throw new R("unable to change portal, component instance does not exist.");Pn(t).forEach(o=>{const r=o.instance;if(!r)throw new R("unable to move element to new portal, component instance does not exist.");Gt(r,n)})},type:N.UpdatePortalChildren}),Pa=(t,e,...n)=>(n=n.flat(),{type:t,props:{...e,children:n},children:n,symbol:tr,key:(e==null?void 0:e.key)??void 0}),rr=t=>t;window.createJsxElement=Pa;window.createJsxFragmentElement=rr;function Ma(t,e){let n=t.length;const o=new Array(n),r={};let a=n;const s=La(e),i=Na(t);for(e.forEach(function(u){if(!i.has(u[0])||!i.has(u[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});a--;)r[a]||l(t[a],a,new Set);return o;function l(u,p,g){if(g.has(u)){let f;try{f=", node was:"+JSON.stringify(u)}catch{f=""}throw new Error("Cyclic dependency"+f)}if(!i.has(u))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(u));if(r[p])return;r[p]=!0;let m=s.get(u)||new Set;if(m=Array.from(m),p=m.length){g.add(u);do{const f=m[--p];l(f,i.get(f),g)}while(p);g.delete(u)}o[--n]=u}}function La(t){const e=new Map;for(let n=0,o=t.length;n<o;n++){const r=t[n];e.has(r[0])||e.set(r[0],new Set),e.has(r[1])||e.set(r[1],new Set),e.get(r[0]).add(r[1])}return e}function Na(t){const e=new Map;for(let n=0,o=t.length;n<o;n++)e.set(t[n],n);return e}const vn={};let de,Sn;const Oa=5;let _e="idle",dt=[],Se=[],ht=!1,It=0;const wo=()=>{_e="idle",dt=[],Se=[],ht=!1,It=0,de=void 0,Sn=void 0},ar=(t,e)=>(t.forEach(n=>{e.includes(n)||(e.push(n),be(n)&&ar(n.subscribers,e))}),e),Ut=(t,e)=>t.tag===k.Root?!1:t.parent===e?!0:Ut(t.parent,e),Ua=t=>{const e=[];t.forEach((a,s)=>{if(e.includes(a))return;if(be(a)){e.push(a);return}let i=e.find(l=>be(l)?!1:Ut(a,l));i??(i=t.slice(s).find(l=>be(l)?!1:Ut(a,l))),i||e.push(a)});const n=e.reduce((a,s,i)=>{if(be(s)){const l=[];s.subscribers.forEach(u=>{const p=e.indexOf(u);p!==-1&&l.push([p.toString(),i.toString()])}),a.push(...l)}return a},[]),r=Ma(e.map((a,s)=>s.toString()),n).map(a=>{const s=e[parseInt(a)];if(!s)throw new R("something went wrong while trying to optimize dependencies");return s}).reverse();if(!ht){const a=[],s=[];return r.forEach(l=>{be(l)?a.push(l):s.push(l)}),[...a.sort((l,u)=>l.index-u.index),...s]}return r},$a=()=>{if(vn.preventRequestsProcessing)return;if(It++,It>100)throw new R("infinite re-rendering detected: update depth exceeded 100.");_e!=="unmounting"&&(_e="processing");const t=Se.some(i=>i.type==="route"),e=t?[]:Se.filter(i=>i.type==="mount");if(ht&&e.length>0)throw new R("cannot mount application twice, try to unmount the current one first.");const n=Se.some(i=>i.type==="unmount");if(n&&(_e="unmounting",!ht)){if(vn.skipThrowingWhenUnmountingNoApp){wo();return}throw new R("no application to be unmounted")}const o=Se.filter(i=>i.type==="update"),r=ar(o.map(i=>i.requester),[]),a=Ua(r);Se=[];const s=oe();if(a.forEach(i=>{const l=i;let u;if(be(l))u=_s(l);else{const p=l.props,g=l.type,m=l.props.children,f=l.ctx.index,_=createJsxElement(g,p,...m),T=Je(l.ctx);u=pt(_,l,l.ctx.parent,f,T).tasks}ge(u,s)}),e.forEach(i=>{const{child:l,root:u}=i,p=u.children.length,g=u,m=pt(l,void 0,g,p,{contexts:{},dom:{parent:g},index:p,key:p,parent:g});u.children=[m.component],ge(m.tasks,s),ht=!0}),t){const i=pt(Sn,de==null?void 0:de.children[0],de,0,{contexts:{},dom:{parent:de},index:0,key:0,parent:de});ge(i.tasks,s)}if(n&&de){const i=de.children[0],l=qt(i,{});ge(l,s),Array.from(Ss()).sort((u,p)=>p[1].index-u[1].index).forEach(([u])=>ge(Rs(u),s)),wo()}if(Ha(s),_e="idle",dt.length===0){It=0;return}Se=dt,dt=[],nt(Se[0])},nt=t=>{if(vn.preventRequests===!0||_e==="unmounting")return;const e={date:new Date,fulfilled:!1,id:Tn(),...t};if(_e==="processing"){dt.push(e);return}Se.push(e),_e!=="batching"&&(_e="batching",setTimeout(()=>$a(),Oa))};ca({events:{wrapper:(t,e)=>{try{e(t)}catch(n){console.error(n)}},syntax:{svelte:!1,vue:!1}}});const za=({app:t,host:e})=>{if(de)throw new R("an app is already mounted");de={children:[],instance:e,tag:k.Root},Sn=t,nt({root:de,child:t,type:"mount"})},Ha=t=>{Ea.forEach(e=>{t[e].forEach(n=>{try{n.execute()}catch(o){console.error(o)}})})},ja=t=>{let e=location.pathname;return t&&e.startsWith(t)&&(e=e.replace(t,"")),e||(e="/"),e},Ja=t=>[{path:t},"",t],Wa=()=>{const t=location.search,e=new URLSearchParams(t);return Array.from(e.entries()).reduce((o,r)=>(o[r[0]]=r[1],o),{})},Ga={getPath:ja,createHistoryArgs:Ja,getQueryParams:Wa},sr=t=>{const{protocol:e,hostname:n}=location,o=`${e}//${n}${t}`;return new URL(o)},qa=t=>{let e=location.hash.substring(1);return t&&e.startsWith(t)&&(e=e.replace(t,"")),e||(e="/"),sr(e).pathname},Za=()=>{const e=sr(location.hash.substring(1)).search,n=new URLSearchParams(e);return Array.from(n.entries()).reduce((r,a)=>(r[a[0]]=a[1],r),{})},Ya=t=>{const e=`/#${t}`;return[{path:e},"",e]},Xa={getPath:qa,createHistoryArgs:Ya,getQueryParams:Za},Va=t=>!("path"in t),xo=t=>"path"in t&&t.path==="",Qa=t=>"path"in t&&t.path==="*",Pt=(t,e)=>t.endsWith("/")&&e.startsWith("/")?`${t}${e.substring(1)}`:!t.endsWith("/")&&!e.startsWith("/")?`${t}/${e}`:`${t}${e}`,wn=(t,e="",n=[],o=[])=>t.reduce((r,a)=>{if(xo(a))return r;if(Va(a)){const m=[...n,a.element];if(a.children){const f=wn(a.children,e,m,o);return{...r,...f}}return r}if([...a.path].filter(m=>m==="/").length>1)throw new xn('path cannot contain multiple segments like "/segment-1/segment-2"');const i=Pt(e,a.path);if(Qa(a)){const m={params:o,path:i,steps:[...n],title:a.title};return m.steps.push(a.element),r[i]=m,r}const l=a,u=[...n,l.element],g={params:[...o,...l.path.split("/").reduce((m,f)=>(f.startsWith(":")&&m.push(f.substring(1)),m),[])],path:i,steps:u,name:l.name,title:l.title};if(l.children){const m=wn(l.children,g.path,[...g.steps],[...g.params]);r={...r,...m};const f=l.children.find(_=>xo(_));f&&(g.steps.push(f.element),g.name=f.name??g.name,g.title=f.title??g.title,g.isIndex=!0)}return g.path==="/"&&(g.isIndex=!0),r[i]=g,r},{});var $t;(function(t){t.Browser="browser",t.Hash="hash"})($t||($t={}));const Ka=(t,e)=>{const n=e[t],o=t.split("/");if(n){const l=o.reduce((u,p)=>{if(p.startsWith(":")){const g=p.substring(1);u[g]=p}return u},{});return{steps:n.steps,params:l,route:n}}let r="/",a,s=[];for(let l=0;l<o.length;l++){const u=Pt(r,o[l]);if(e[u]){r=u,a=e[r],s=[...a.steps];continue}const g=Pt(r,"/:"),m=Object.keys(e).filter(F=>F.startsWith(g)).sort()[0];if(m){r=m,a=e[r],s=[...a.steps];continue}const f=Pt(r,"/*"),_=e[f];let T;const B=a==null?void 0:a.isIndex;if(_)r=f,a=e[r],T=a.steps.at(-1);else{const F=e["/*"];T=F==null?void 0:F.steps.at(-1)}if(B){const F=s.length-1;s[F]=T}else s.push(T);break}const i=r.split("/").reduce((l,u,p)=>{if(u.startsWith(":")){const g=u.substring(1),m=o[p];l[g]=m}return l},{});return{steps:s,params:i,route:a}},ko=(t,e,n)=>{const{name:o,params:r}=t,a=Object.keys(e).find(l=>e[l].name===o);if(!a)return;const s=e[a];if(!s)return;let i=s.path.split("/").map(l=>{if(l.startsWith(":")){const u=l.substring(1);return r?r[u]:void 0}return l}).join("/");if(t.query){const l=t.query,u=Object.keys(l).map(p=>`${p}=${l[p]}`).join("&");i=`${i}?${u}`}return t.hash&&(i=`${i}#${t.hash}`),n&&(i=`${n}${i}`),i};class xn extends Error{constructor(e){super(`[DOM Router]: ${e}`)}}class es{constructor(e){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"cache",{enumerable:!0,configurable:!0,writable:!0,value:{params:{},processed:{},steps:[],url:""}}),Object.defineProperty(this,"base",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"correctScrolling",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"type",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onChanged",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"listener",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"transformTitle",{enumerable:!0,configurable:!0,writable:!0,value:void 0});const{onChanged:n,routes:o,base:r,correctScrolling:a,transformTitle:s,type:i}=e;if(typeof r=="string"){if(!r.startsWith("/"))throw new xn(`invalid base "${r}" : should start with "/"`);this.base=r}this.correctScrolling=a??!1,this.type=i??$t.Browser,this.onChanged=n,this.transformTitle=s??(l=>l??""),this.routes=wn(o),this.listener=()=>{this.processPath()&&this.onChanged()},window.addEventListener("popstate",this.listener),this.processPath()}get engine(){return this.type===$t.Browser?Ga:Xa}unload(){window.removeEventListener("popstate",this.listener)}processPath(){var a,s,i;const e=location.href;if(e===this.cache.url)return!1;const n=this.engine.getPath(this.base),o=this.cache.processed[n],r=o??Ka(n,this.routes);return o||(this.cache.processed[n]=r),this.cache.params=Object.keys(r.params).reduce((l,u)=>(l[u]=decodeURI(r.params[u]),l),{}),this.cache.url=e,this.cache.steps=r.steps,(a=r.route)!=null&&a.title&&(document.title=((i=this.transformTitle)==null?void 0:i.call(this,(s=r.route)==null?void 0:s.title))??document.title),this.correctScrolling&&window.scrollTo({top:0}),!0}navigate(e,n){var r;if(typeof e=="number")history.go(e);else{let a;if(typeof e=="string")a=e;else{const i=ko(e,this.routes,this.base);if(typeof i!="string")throw new xn(`named path "${e.name}" is not found`);a=i}this.base&&!a.startsWith(this.base)&&(a=`${this.base}${a}`);const s=this.engine.createHistoryArgs(a);n!=null&&n.replace?history.replaceState(...s):history.pushState(...s)}this.processPath()&&((r=this.onChanged)==null||r.call(this))}getElementByDepth(e){return this.cache.steps.at(e)}getPath(){return this.engine.getPath(this.base)}getParams(){return this.cache.params}getSearchParams(){return this.engine.getQueryParams()}toHref(e){let n;if(typeof e=="string"?n=e:n=ko(e,this.routes,this.base),!!n)return this.base&&!n.startsWith(this.base)&&(n=`${this.base}${n}`),n}}const _n=t=>t.startsWith("/");let Pe;const ir=t=>{if(t.tagName.toLowerCase()==="a")return t;const e=t.parentElement;if(e){if(e.tagName.toLowerCase()==="a")return e;if(e.parentElement)return ir(e.parentElement)}};document.addEventListener("click",t=>{if(!Pe)return;const e=ir(t.target);if(e){const n=e.getAttribute("href");n&&_n(n)&&(t.preventDefault(),os(n))}});const ts=t=>{if(Pe)throw new R("another router was already mounted, please unmount it first");const e=()=>{nt({type:"route"})};Pe=new es({...t,onChanged:e})},Rn=t=>{if(!Pe)throw new R("a router is yet to be created");return t(Pe)},ns=t=>Pe?Pe.getElementByDepth(t):null,os=(t,e={})=>{Rn(n=>{n.navigate(t,e)})},lr=t=>{if(!(aa(t)||na(t)))return typeof t=="string"&&(!Pe||!_n(t))?t:Rn(e=>e.toHref(t))},rs=()=>Rn(t=>t.getPath()),ur=["if","else","else-if","switch","case","case:default","innerHTML","tag","ns","children","key","ref"],pt=(t,e,n,o,r)=>{const a=In(t),s=cr(t,o),i=ys[a],l=i(t,e,n,s,r);if(!e){const u=Ta(l.component);Z(u,l.tasks)}if(vt(l.component))try{l.component.tag===k.ErrorBoundary&&l.component.ctx.errorContext&&(l.children=[l.component.fallback]);const u=dr(l);ge(u,l.tasks)}catch(u){if(l.component.tag===k.ErrorBoundary){const p=bs(l,u);ge(p,l.tasks)}else throw u}return l},as=(t,e,n,o,r)=>{const{type:a,props:s}=t;let i=t.children;const l=e??{children:[],key:o,parent:n,props:s,status:O.Mounting,tag:k.Element,type:a,domParent:r.dom.parent},u=oe(),p=s.innerHTML;if(e){if(typeof p=="string"&&p!==l.props.innerHTML){const T=yo(l,p);Z(T,u),i=[]}const m=ss(l.props,s);if(m.length>0){const T=Ca(l,m);Z(T,u)}const f=e.props.ref,_=s.ref;if(_!==f){if(un(f)){const T=Aa(l,f);Z(T,u)}if(un(_)){const T=vo(l,_);Z(T,u)}}l.props=s}else{const m=Fa(l);if(Z(m,u),typeof p=="string"){const _=yo(l,p);i=[],Z(_,u)}const f=s.ref;if(un(f)){const _=vo(l,f);Z(_,u)}}const g=Je(r,m=>m.dom={parent:l});return{children:i,component:l,tasks:u,ctx:g}},ss=(t,e)=>Object.keys({...t,...e}).reduce((n,o)=>(ur.includes(o)||(De(e,o)?De(t,o)?yt(t[o],e[o])||n.push({key:o,operation:"update",value:e[o]}):n.push({key:o,operation:"create",value:e[o]}):n.push({key:o,operation:"remove"})),n),[]),is=t=>Object.keys(t).reduce((e,n)=>([...ur,"tag"].includes(n)||(e[n]=t[n]),e),{}),ls=(t,e,n,o,r)=>{const{props:a,type:s}=t,i=t.children,l=oe(),u=e??{children:[],key:o,parent:n,props:a,status:O.Mounting,tag:k.Context,type:s};e&&(u.props=a);const p=a.ctx.id,g=Je(r,m=>m.contexts[p]=a.value);return{children:i,component:u,ctx:g,tasks:l}},us=(t,e,n,o,r)=>{const{props:a,type:s}=t,i=t.children,l=oe(),u=e??{children:[],key:o,parent:n,type:s,props:a,status:O.Mounting,tag:k.Fragment};return e&&(u.props=a),{children:i,component:u,ctx:r,tasks:l}},cs=(t,e,n,o,r)=>{const{props:a,type:s}=t,i=t.children,l=oe(),u=e??{children:[],key:o,props:a,parent:n,type:s,status:O.Mounting,tag:k.JsxFragment};return{children:i,component:u,ctx:r,tasks:l}},ds=(t,e,n,o,r)=>{const a=oe(),{props:s,type:i}=t,l=e??{children:[],hooks:[],key:o,parent:n,props:s,type:i,status:O.Mounting,tag:k.Function,ctx:Je(r)};return e&&(l.props=s,l.ctx=r),{children:[hr({component:l,tasks:a,ctx:r},()=>i(s))],component:l,ctx:r,tasks:a}},hs=(t,e,n,o,r)=>{const a=oe();return{component:e??{key:o,parent:n,status:O.Mounting,tag:k.Null},children:[],ctx:r,tasks:a}},ps=(t,e,n,o,r)=>{const a=oe(),{props:s,type:i}=t,l=(r.outletDepth??-1)+1,u=Je(r,m=>{m.outletDepth=l}),p=e??{children:[],key:o,parent:n,props:s,status:O.Mounting,tag:k.Outlet,type:i,ctx:u};return e&&(p.props=s),{children:[ns(l)],ctx:u,component:p,tasks:a}},ms=(t,e,n,o,r)=>{const{type:a,props:s}=t,{children:i,container:l}=s,u=oe(),p=e??{children:[],key:o,parent:n,props:s,status:O.Mounting,tag:k.Portal,instance:l,type:a};if(e){const m=s.container,f=p.props.container;if(m!==f){p.instance=m;const _=Ia(p);Z(_,u)}p.props=s}const g={...r,dom:{...r.dom,parent:p}};return{component:p,children:i,ctx:g,tasks:u}},fs=(t,e,n,o,r)=>{const a=`${t}`,s=oe(),i=e??{key:o,parent:n,status:O.Mounting,tag:k.Text,text:a,position:0,domParent:r.dom.parent};if(e){if(a!==i.text){i.text=a;const l=Ba(i,a);Z(l,s)}}else{const l=Ra(i);Z(l,s)}return{component:i,ctx:r,children:[],tasks:s}},gs=(t,e,n,o,r)=>{const a=oe(),{props:s,type:i}=t,l=t.children,u=Je(r,m=>{m.errorContext=void 0}),p=wa(s.errorEffect)?s.errorEffect:void 0,g=e??{type:i,children:[],key:o,parent:n,props:s,ctx:u,status:O.Mounting,tag:k.ErrorBoundary,fallback:s.fallback,errorEffect:p};return e&&(g.props=s,g.errorEffect=p,g.fallback=s.fallback),{children:l,component:g,ctx:u,tasks:a}},Do=t=>{t.data=void 0,t.ctx.errorContext=void 0,nt({type:"update",requester:t})},bs=(t,e)=>{const{component:n}=t,o={error:e,recover:()=>Do(n)};n.data=o,n.ctx.errorContext=o,t.ctx.errorContext=o;const r=oe();if(n.errorEffect){const i=yn(n,{callback:()=>{var l;(l=n.errorEffect)==null||l.call(n,e,()=>Do(n))},deps:[],type:Q.Effect});Z(i,r)}t.children=[n.fallback];const a=dr(t);return ge(a,r),r},ys={[k.Element]:as,[k.Context]:ls,[k.Fragment]:us,[k.JsxFragment]:cs,[k.Function]:ds,[k.Outlet]:ps,[k.Text]:fs,[k.Null]:hs,[k.Portal]:ms,[k.ErrorBoundary]:gs},oe=()=>({[N.SetComponentMounted]:[],[N.RemoveComponent]:[],[N.RenderElement]:[],[N.RenderInnerHTML]:[],[N.RenderText]:[],[N.ReorderElements]:[],[N.RunEffect]:[],[N.RunEffectCleanup]:[],[N.UnmountComponent]:[],[N.UpdatePortalChildren]:[],[N.UpdateProps]:[],[N.UpdateText]:[],[N.UnmountedComponent]:[],[N.RefElement]:[],[N.UnrefEelement]:[],[N.ChangeElementPosition]:[]}),vs=t=>[k.Function,k.Element,k.Portal,k.Portal,k.Fragment,k.JsxFragment,k.Context,k.Outlet,k.ErrorBoundary].includes(t.tag),ws=t=>!vs(t)||!De(t.props,"switch")?!1:{value:t.props.switch},zt=t=>[k.Element,k.Text].includes(t.tag),xs=t=>[k.Element,k.Portal,k.Root].includes(t.tag),Bn=t=>{if(t.tag===k.Root)throw new R("unable to locate the parent node.");return xs(t.parent)?t.parent:Bn(t.parent)},un=t=>De(t,"value"),Z=(t,e)=>{e[t.type].push(t)},ge=(t,e)=>{for(const n of Object.keys(t))e[n].push(...t[n])},qt=(t,e)=>{const n=oe(),o={...e};if(t.status=O.Unmounting,(be(t)||t.tag===k.Function)&&t.hooks.forEach(r=>{if(r.type===Q.Effect&&typeof r.cleanup=="function"){const a=or(t,r);Z(a,n)}else r.type===Q.Composable&&Is(r.name,t)}),"tag"in t){const r=Sa(t,e);Z(r,n),vt(t)&&t.children.forEach(a=>{const s=qt(a,o);ge(s,n)})}return n},Zt=t=>t!==null&&typeof t=="object"&&!Array.isArray(t)&&De(t,"type")&&De(t,"props")&&De(t,"children")&&De(t,"symbol")&&t.symbol===tr&&typeof t.props=="object"&&Array.isArray(t.children),In=t=>{if(Zt(t)){if(t.type===ka)return k.Portal;if(t.type===nr)return k.ErrorBoundary;if(t.type===k.Context)return k.Context;if(t.type===gt)return k.Outlet;if(t.type===Da)return k.Fragment;if(t.type===rr)return k.JsxFragment;if(typeof t.type=="function")return k.Function;if(typeof t.type=="string")return k.Element}return[null,!1,void 0].includes(t)?k.Null:k.Text},vt=t=>[k.Fragment,k.JsxFragment,k.Element,k.Function,k.Context,k.Function,k.Portal,k.Outlet,k.ErrorBoundary].includes(t.tag),cr=(t,e)=>Zt(t)?t.key??e:e,tt=(t,e)=>{if(!Zt(t))return!1;const{props:n}=t;return De(n,e)?{value:n[e]}:!1},ks=t=>vt(t)?t.children.reduce((e,n,o)=>{const r=n.key;return e[r]={component:n,index:o},n.status=O.Unmounting,e},{}):{},Ds=(t,e)=>{const n=[];typeof t.props.tag=="string"&&(t.type=t.props.tag);const o=Object.keys(t.props).reduce((r,a)=>{const s=t.props[a];if(Yo(a))n.push({key:a,value:s});else if(a==="href"&&t.type.toLowerCase()==="a"){const i=tt(t,"href");i&&(r[a]=lr(i.value))}else r[a]=s;return r},{});if(n.length>0){const r=Zo(n);o.class=r}o.ns=e.ns??o.ns??ft.HTML,t.props=o},Es=(t,e,n,o,r)=>{if(r)return!0;{const a=tt(t,"case");if(a)return!(a.value===o);if(!(e===n-1))throw new R('missing "case" prop within a switch control component.');if(!tt(t,"case:default"))throw new R('missing "case" or "case:default" prop in the last element of a switch control component.');return!1}},Fs=(t,e,n)=>{const o=!!e;if(t==="if")return{nullify:!o,sequence:{fullfilled:o,last:"if"}};if(n===!1)throw new R('cannot use "else" or "else-if" directives outside a conditional sequence');if(t==="else-if"&&n.last==="else")throw new R('cannot use "else-if" directive after "else" directive');return n.fullfilled?{nullify:!0,sequence:{fullfilled:!0,last:t}}:t==="else-if"?{nullify:!o,sequence:{fullfilled:o,last:"else-if"}}:{nullify:!o,sequence:!1}},dr=t=>{const e=oe(),n=t.component,o=ws(n);let r=o===!1,a=!1;const s=ks(n),i=new Set([]),l=t.children.length;for(let u=0;u<l;u++){const p=t.children[u];let g=!1;o&&(g=Es(p,u,l,o.value,r),g||(r=!0));const m=cr(p,u);if(i.has(m))throw new R(`duplicate key "${m}" detected. make sure to assign unique keys for each child. if key is not defined, the framework will use the component index as a key instead.`);i.add(m);let f=g?null:p;const _=tt(p,"if"),T=tt(p,"else-if"),B=tt(p,"else");if(o&&T||o&&B)throw new R('cannot have an "else" or "else-if" directive within a "switch" control component');const F=(_?1:0)+(T?1:0)+(B?1:0);if(F>1)throw new R('cannot have more than one conditional directive : "if" | "else" | "else-if"');if(F===1){const y=_?"if":T?"else-if":"else",D=_?_.value:T?T.value:!0,I=Fs(y,D,a);a=I.sequence,g=I.nullify}else a=!1;f=g?null:f,In(f)===k.Element&&Ds(f,t.ctx);let h;const b=Je(t.ctx,y=>{y.index=u,y.key=m,y.parent=t.component}),v=s[m];if(!v||Cs(f,v.component)){h=pt(f,void 0,n,u,b);const y=n.children.length;n.children.push(h.component),u!==y&&(n.children=bo(n.children,y,u))}else{v.component.status=O.Mounted,h=pt(f,v.component,n,u,t.ctx);const y=n.children.indexOf(v.component);if(y===-1)throw new R("unable to determine component index");if(y!==u){n.children=bo(n.children,y,u);const D=_a(v.component);Z(D,h.tasks)}}ge(h.tasks,e)}return n.children=n.children.filter(u=>{if(u.status===O.Unmounting){const p=qt(u,{});return ge(p,e),!1}return!0}),e},Je=(t,e)=>{const n={...t,contexts:{...t.contexts},dom:{...t.dom}};return e==null||e(n),n},Cs=(t,e)=>{if(In(t)!==e.tag)return!0;if(!Zt(t))return!1;const o=e;return t.type===o.type?o.tag===k.Element&&(t.props.ns??ft.HTML)!==o.props.ns:!0},Pn=t=>zt(t)?[t]:vt(t)?t.children?t.children.reduce((e,n)=>(zt(n)?e.push(n):e.push(...Pn(n)),e),[]):[]:[],Yt=(t,e)=>{let n=0,o=!1;e??(e=Bn(t));for(const r of e.children){if(o)break;if(r===t){o=!0;break}if(r.status!==O.Unmounting&&r.tag!==k.Portal){if(zt(r)){n++;continue}if(vt(r)){const{found:a,index:s}=Yt(t,r);n+=s,a&&(o=!0)}}}return{index:n,found:o}};let se=-1,P;const hr=(t,e)=>{P=t;const n=e();return P=void 0,se=-1,n},Me=t=>{if(!P)throw new R('cannot call "useState" outisde of a functional component body.');const e=P.component;se++;let n;if(P.component.status===O.Mounting){const o=typeof t=="function"?t():t;n={type:Q.State,value:o,getValue:()=>n.value,setValue:r=>{if(e.status===O.Unmounting||e.status===O.Unmounted)return;let a;typeof r=="function"?a=r(n.value):a=r,yt(n.value,a)||(n.value=a,nt({requester:e,type:"update"}))}},P.component.hooks.push(n)}else n=P.component.hooks[se];if(!n||n.type!==Q.State)throw new R("unexpected hook type : expected state but got something else.");return[n.value,n.setValue,n.getValue]},wt=(t,e)=>{if(!P)throw new R('cannot call "useEffect" outisde of a functional component body.');se++;let n;if(P.component.status===O.Mounting){n={callback:t,deps:e,type:Q.Effect},P.component.hooks.push(n);const o=yn(P.component,n);Z(o,P.tasks)}else{if(n=P.component.hooks[se],!n||n.type!==Q.Effect)throw new R("unexpected hook type : expected effect but got something else.");if(!yt(e,n.deps)){if(typeof n.cleanup=="function"){const r=or(P.component,n);Z(r,P.tasks)}n.callback=t,n.deps=e;const o=yn(P.component,n);Z(o,P.tasks)}}},ve=(t,e)=>{if(!P)throw new R('cannot call "useMemo" outisde of a functional component body.');se++;let n;if(P.component.status===O.Mounting){const o=t();n={type:Q.Memo,deps:e,value:o},P.component.hooks.push(n)}else{if(n=P.component.hooks[se],!n||n.type!==Q.Memo)throw new R("unexpected hook type : expected memo but got something else.");yt(n.deps,e)||(n.value=t(),n.deps=e)}return n.value},kn=(t,e)=>ve(()=>t,e),pr=t=>{if(!P)throw new R('cannot call "useRef" outisde of a functional component body.');se++;let e;if(P.component.status===O.Mounting)e={type:Q.Ref,value:{value:t}},P.component.hooks.push(e);else if(e=P.component.hooks[se],!e||e.type!==Q.Ref)throw new R("unexpected hook type : expected ref but got something else.");return e.value},As=t=>{if(!P)throw new R('cannot call "useComposable" outisde of a functional component body.');se++;let e,n;if(P.component.status===O.Mounting)n=Fo(t),e={type:Q.Composable,name:t},Bs(t,P.component),P.component.hooks.push(e);else{if(e=P.component.hooks[se],!e||e.type!==Q.Composable)throw new R("unexpected hook type : expected composable but got something else.");n=Fo(e.name)}return n},Ts=()=>{if(!P)throw new R('cannot call "useErrorBoundary" outisde of a functional component body.');if(be(P.component))throw new R('cannot call "useErrorBoundary" inside a composable.');if(!P.ctx.errorContext)throw new R('cannot call "useErrorBoundary" outside of a fallback component.');se++;let t;const{recover:e,error:n}=P.ctx.errorContext;if(P.component.status===O.Mounting)t={type:Q.Error},P.component.hooks.push(t);else if(t=P.component.hooks[se],!t||t.type!==Q.Error)throw new R("unexpected hook type : expected error but got something else.");return[n,e]};let Eo=0;const bt=new Map,Ss=()=>bt.entries(),Mn=(t,e)=>{if(P)throw new R("cannot create a composable inside a function component or another composable.");if(bt.has(t))throw new R(`composable with name "${t}" is already created`);const n={hooks:[],id:Tn(),name:t,subscribers:[],value:void 0,status:O.Mounting,index:Eo,callback:e};return Eo++,bt.set(t,n),nt({requester:n,type:"update"}),()=>As(t)},Xt=t=>{const e=bt.get(t);if(!e)throw new R("unable to retrieve composable value, entry not found.");return e},be=t=>!De(t,"tag"),Fo=t=>Xt(t).value,_s=t=>{const e={component:t,ctx:{},tasks:oe()};return hr(e,()=>{const n=t.callback();return t.value=n,t.status!==O.Mounted&&(t.status=O.Mounted),n}),e.tasks},Rs=t=>{const e=Xt(t),n=qt(e,{});return bt.delete(t),n},Bs=(t,e)=>{const n=Xt(t);if(be(e)){n.subscribers.includes(e)||n.subscribers.push(e);return}n.subscribers.find(r=>be(r)?!1:Ut(e,r))||n.subscribers.push(e)},Is=(t,e)=>{const n=Xt(t);n.subscribers=n.subscribers.filter(o=>o!==e)},mr=(...t)=>t.filter(n=>!mo(n)).map(n=>ya(n)?n.filter(o=>!mo(o)).join(" "):n).join(" ").trim(),Ps=()=>{const[t,e]=Ts();return createJsxElement("div",null,createJsxElement("h1",null,"Ooops !"),createJsxElement("h3",null,"Something went wrong!"),createJsxElement("p",null,t),createJsxElement("button",{onClick:e},"reload"))},Ms=()=>createJsxElement(nr,{fallback:createJsxElement(Ps,null)},createJsxElement(gt,null));/*! @license DOMPurify 3.1.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.6/LICENSE */const{entries:fr,setPrototypeOf:Co,isFrozen:Ls,getPrototypeOf:Ns,getOwnPropertyDescriptor:Os}=Object;let{freeze:ne,seal:he,create:gr}=Object,{apply:Dn,construct:En}=typeof Reflect<"u"&&Reflect;ne||(ne=function(e){return e});he||(he=function(e){return e});Dn||(Dn=function(e,n,o){return e.apply(n,o)});En||(En=function(e,n){return new e(...n)});const St=ie(Array.prototype.forEach),Ao=ie(Array.prototype.pop),st=ie(Array.prototype.push),Mt=ie(String.prototype.toLowerCase),cn=ie(String.prototype.toString),To=ie(String.prototype.match),it=ie(String.prototype.replace),Us=ie(String.prototype.indexOf),$s=ie(String.prototype.trim),me=ie(Object.prototype.hasOwnProperty),te=ie(RegExp.prototype.test),lt=zs(TypeError);function ie(t){return function(e){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return Dn(t,e,o)}}function zs(t){return function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return En(t,n)}}function M(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Mt;Co&&Co(t,null);let o=e.length;for(;o--;){let r=e[o];if(typeof r=="string"){const a=n(r);a!==r&&(Ls(e)||(e[o]=a),r=a)}t[r]=!0}return t}function Hs(t){for(let e=0;e<t.length;e++)me(t,e)||(t[e]=null);return t}function $e(t){const e=gr(null);for(const[n,o]of fr(t))me(t,n)&&(Array.isArray(o)?e[n]=Hs(o):o&&typeof o=="object"&&o.constructor===Object?e[n]=$e(o):e[n]=o);return e}function ut(t,e){for(;t!==null;){const o=Os(t,e);if(o){if(o.get)return ie(o.get);if(typeof o.value=="function")return ie(o.value)}t=Ns(t)}function n(){return null}return n}const So=ne(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),dn=ne(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),hn=ne(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),js=ne(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),pn=ne(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Js=ne(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),_o=ne(["#text"]),Ro=ne(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),mn=ne(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bo=ne(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_t=ne(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ws=he(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Gs=he(/<%[\w\W]*|[\w\W]*%>/gm),qs=he(/\${[\w\W]*}/gm),Zs=he(/^data-[\-\w.\u00B7-\uFFFF]/),Ys=he(/^aria-[\-\w]+$/),br=he(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Xs=he(/^(?:\w+script|data):/i),Vs=he(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yr=he(/^html$/i),Qs=he(/^[a-z][.\w]*(-[.\w]+)+$/i);var Io=Object.freeze({__proto__:null,MUSTACHE_EXPR:Ws,ERB_EXPR:Gs,TMPLIT_EXPR:qs,DATA_ATTR:Zs,ARIA_ATTR:Ys,IS_ALLOWED_URI:br,IS_SCRIPT_OR_DATA:Xs,ATTR_WHITESPACE:Vs,DOCTYPE_NAME:yr,CUSTOM_ELEMENT:Qs});const ct={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ks=function(){return typeof window>"u"?null:window},ei=function(e,n){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let o=null;const r="data-tt-policy-suffix";n&&n.hasAttribute(r)&&(o=n.getAttribute(r));const a="dompurify"+(o?"#"+o:"");try{return e.createPolicy(a,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}};function vr(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ks();const e=C=>vr(C);if(e.version="3.1.6",e.removed=[],!t||!t.document||t.document.nodeType!==ct.document)return e.isSupported=!1,e;let{document:n}=t;const o=n,r=o.currentScript,{DocumentFragment:a,HTMLTemplateElement:s,Node:i,Element:l,NodeFilter:u,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:m,trustedTypes:f}=t,_=l.prototype,T=ut(_,"cloneNode"),B=ut(_,"remove"),F=ut(_,"nextSibling"),d=ut(_,"childNodes"),h=ut(_,"parentNode");if(typeof s=="function"){const C=n.createElement("template");C.content&&C.content.ownerDocument&&(n=C.content.ownerDocument)}let b,v="";const{implementation:y,createNodeIterator:D,createDocumentFragment:I,getElementsByTagName:S}=n,{importNode:j}=o;let $={};e.isSupported=typeof fr=="function"&&typeof h=="function"&&y&&y.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ue,ERB_EXPR:We,TMPLIT_EXPR:Ge,DATA_ATTR:Qt,ARIA_ATTR:Kt,IS_SCRIPT_OR_DATA:kt,ATTR_WHITESPACE:G,CUSTOM_ELEMENT:ce}=Io;let{IS_ALLOWED_URI:Ce}=Io,J=null;const re=M({},[...So,...dn,...hn,...pn,..._o]);let W=null;const pe=M({},[...Ro,...mn,...Bo,..._t]);let z=Object.seal(gr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,Re=null,qe=!0,Ze=!0,Ye=!1,Ne=!0,Be=!1,Oe=!0,Ue=!1,en=!1,tn=!1,Xe=!1,Dt=!1,Et=!1,Un=!0,$n=!1;const Or="user-content-";let nn=!0,ot=!1,Ve={},Qe=null;const zn=M({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Hn=null;const jn=M({},["audio","video","img","source","image","track"]);let on=null;const Jn=M({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ft="http://www.w3.org/1998/Math/MathML",Ct="http://www.w3.org/2000/svg",Ae="http://www.w3.org/1999/xhtml";let Ke=Ae,rn=!1,an=null;const Ur=M({},[Ft,Ct,Ae],cn);let rt=null;const $r=["application/xhtml+xml","text/html"],zr="text/html";let q=null,et=null;const Hr=n.createElement("form"),Wn=function(c){return c instanceof RegExp||c instanceof Function},sn=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(et&&et===c)){if((!c||typeof c!="object")&&(c={}),c=$e(c),rt=$r.indexOf(c.PARSER_MEDIA_TYPE)===-1?zr:c.PARSER_MEDIA_TYPE,q=rt==="application/xhtml+xml"?cn:Mt,J=me(c,"ALLOWED_TAGS")?M({},c.ALLOWED_TAGS,q):re,W=me(c,"ALLOWED_ATTR")?M({},c.ALLOWED_ATTR,q):pe,an=me(c,"ALLOWED_NAMESPACES")?M({},c.ALLOWED_NAMESPACES,cn):Ur,on=me(c,"ADD_URI_SAFE_ATTR")?M($e(Jn),c.ADD_URI_SAFE_ATTR,q):Jn,Hn=me(c,"ADD_DATA_URI_TAGS")?M($e(jn),c.ADD_DATA_URI_TAGS,q):jn,Qe=me(c,"FORBID_CONTENTS")?M({},c.FORBID_CONTENTS,q):zn,we=me(c,"FORBID_TAGS")?M({},c.FORBID_TAGS,q):{},Re=me(c,"FORBID_ATTR")?M({},c.FORBID_ATTR,q):{},Ve=me(c,"USE_PROFILES")?c.USE_PROFILES:!1,qe=c.ALLOW_ARIA_ATTR!==!1,Ze=c.ALLOW_DATA_ATTR!==!1,Ye=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Ne=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=c.SAFE_FOR_TEMPLATES||!1,Oe=c.SAFE_FOR_XML!==!1,Ue=c.WHOLE_DOCUMENT||!1,Xe=c.RETURN_DOM||!1,Dt=c.RETURN_DOM_FRAGMENT||!1,Et=c.RETURN_TRUSTED_TYPE||!1,tn=c.FORCE_BODY||!1,Un=c.SANITIZE_DOM!==!1,$n=c.SANITIZE_NAMED_PROPS||!1,nn=c.KEEP_CONTENT!==!1,ot=c.IN_PLACE||!1,Ce=c.ALLOWED_URI_REGEXP||br,Ke=c.NAMESPACE||Ae,z=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&Wn(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(z.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Wn(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(z.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(z.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Be&&(Ze=!1),Dt&&(Xe=!0),Ve&&(J=M({},_o),W=[],Ve.html===!0&&(M(J,So),M(W,Ro)),Ve.svg===!0&&(M(J,dn),M(W,mn),M(W,_t)),Ve.svgFilters===!0&&(M(J,hn),M(W,mn),M(W,_t)),Ve.mathMl===!0&&(M(J,pn),M(W,Bo),M(W,_t))),c.ADD_TAGS&&(J===re&&(J=$e(J)),M(J,c.ADD_TAGS,q)),c.ADD_ATTR&&(W===pe&&(W=$e(W)),M(W,c.ADD_ATTR,q)),c.ADD_URI_SAFE_ATTR&&M(on,c.ADD_URI_SAFE_ATTR,q),c.FORBID_CONTENTS&&(Qe===zn&&(Qe=$e(Qe)),M(Qe,c.FORBID_CONTENTS,q)),nn&&(J["#text"]=!0),Ue&&M(J,["html","head","body"]),J.table&&(M(J,["tbody"]),delete we.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw lt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw lt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');b=c.TRUSTED_TYPES_POLICY,v=b.createHTML("")}else b===void 0&&(b=ei(f,r)),b!==null&&typeof v=="string"&&(v=b.createHTML(""));ne&&ne(c),et=c}},Gn=M({},["mi","mo","mn","ms","mtext"]),qn=M({},["foreignobject","annotation-xml"]),jr=M({},["title","style","font","a","script"]),Zn=M({},[...dn,...hn,...js]),Yn=M({},[...pn,...Js]),Jr=function(c){let w=h(c);(!w||!w.tagName)&&(w={namespaceURI:Ke,tagName:"template"});const E=Mt(c.tagName),H=Mt(w.tagName);return an[c.namespaceURI]?c.namespaceURI===Ct?w.namespaceURI===Ae?E==="svg":w.namespaceURI===Ft?E==="svg"&&(H==="annotation-xml"||Gn[H]):!!Zn[E]:c.namespaceURI===Ft?w.namespaceURI===Ae?E==="math":w.namespaceURI===Ct?E==="math"&&qn[H]:!!Yn[E]:c.namespaceURI===Ae?w.namespaceURI===Ct&&!qn[H]||w.namespaceURI===Ft&&!Gn[H]?!1:!Yn[E]&&(jr[E]||!Zn[E]):!!(rt==="application/xhtml+xml"&&an[c.namespaceURI]):!1},xe=function(c){st(e.removed,{element:c});try{h(c).removeChild(c)}catch{B(c)}},At=function(c,w){try{st(e.removed,{attribute:w.getAttributeNode(c),from:w})}catch{st(e.removed,{attribute:null,from:w})}if(w.removeAttribute(c),c==="is"&&!W[c])if(Xe||Dt)try{xe(w)}catch{}else try{w.setAttribute(c,"")}catch{}},Xn=function(c){let w=null,E=null;if(tn)c="<remove></remove>"+c;else{const Y=To(c,/^[\r\n\t ]+/);E=Y&&Y[0]}rt==="application/xhtml+xml"&&Ke===Ae&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");const H=b?b.createHTML(c):c;if(Ke===Ae)try{w=new m().parseFromString(H,rt)}catch{}if(!w||!w.documentElement){w=y.createDocument(Ke,"template",null);try{w.documentElement.innerHTML=rn?v:H}catch{}}const X=w.body||w.documentElement;return c&&E&&X.insertBefore(n.createTextNode(E),X.childNodes[0]||null),Ke===Ae?S.call(w,Ue?"html":"body")[0]:Ue?w.documentElement:X},Vn=function(c){return D.call(c.ownerDocument||c,c,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Qn=function(c){return c instanceof g&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof p)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},Kn=function(c){return typeof i=="function"&&c instanceof i},Te=function(c,w,E){$[c]&&St($[c],H=>{H.call(e,w,E,et)})},eo=function(c){let w=null;if(Te("beforeSanitizeElements",c,null),Qn(c))return xe(c),!0;const E=q(c.nodeName);if(Te("uponSanitizeElement",c,{tagName:E,allowedTags:J}),c.hasChildNodes()&&!Kn(c.firstElementChild)&&te(/<[/\w]/g,c.innerHTML)&&te(/<[/\w]/g,c.textContent)||c.nodeType===ct.progressingInstruction||Oe&&c.nodeType===ct.comment&&te(/<[/\w]/g,c.data))return xe(c),!0;if(!J[E]||we[E]){if(!we[E]&&no(E)&&(z.tagNameCheck instanceof RegExp&&te(z.tagNameCheck,E)||z.tagNameCheck instanceof Function&&z.tagNameCheck(E)))return!1;if(nn&&!Qe[E]){const H=h(c)||c.parentNode,X=d(c)||c.childNodes;if(X&&H){const Y=X.length;for(let ae=Y-1;ae>=0;--ae){const ke=T(X[ae],!0);ke.__removalCount=(c.__removalCount||0)+1,H.insertBefore(ke,F(c))}}}return xe(c),!0}return c instanceof l&&!Jr(c)||(E==="noscript"||E==="noembed"||E==="noframes")&&te(/<\/no(script|embed|frames)/i,c.innerHTML)?(xe(c),!0):(Be&&c.nodeType===ct.text&&(w=c.textContent,St([ue,We,Ge],H=>{w=it(w,H," ")}),c.textContent!==w&&(st(e.removed,{element:c.cloneNode()}),c.textContent=w)),Te("afterSanitizeElements",c,null),!1)},to=function(c,w,E){if(Un&&(w==="id"||w==="name")&&(E in n||E in Hr))return!1;if(!(Ze&&!Re[w]&&te(Qt,w))){if(!(qe&&te(Kt,w))){if(!W[w]||Re[w]){if(!(no(c)&&(z.tagNameCheck instanceof RegExp&&te(z.tagNameCheck,c)||z.tagNameCheck instanceof Function&&z.tagNameCheck(c))&&(z.attributeNameCheck instanceof RegExp&&te(z.attributeNameCheck,w)||z.attributeNameCheck instanceof Function&&z.attributeNameCheck(w))||w==="is"&&z.allowCustomizedBuiltInElements&&(z.tagNameCheck instanceof RegExp&&te(z.tagNameCheck,E)||z.tagNameCheck instanceof Function&&z.tagNameCheck(E))))return!1}else if(!on[w]){if(!te(Ce,it(E,G,""))){if(!((w==="src"||w==="xlink:href"||w==="href")&&c!=="script"&&Us(E,"data:")===0&&Hn[c])){if(!(Ye&&!te(kt,it(E,G,"")))){if(E)return!1}}}}}}return!0},no=function(c){return c!=="annotation-xml"&&To(c,ce)},oo=function(c){Te("beforeSanitizeAttributes",c,null);const{attributes:w}=c;if(!w)return;const E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:W};let H=w.length;for(;H--;){const X=w[H],{name:Y,namespaceURI:ae,value:ke}=X,at=q(Y);let K=Y==="value"?ke:$s(ke);if(E.attrName=at,E.attrValue=K,E.keepAttr=!0,E.forceKeepAttr=void 0,Te("uponSanitizeAttribute",c,E),K=E.attrValue,Oe&&te(/((--!?|])>)|<\/(style|title)/i,K)){At(Y,c);continue}if(E.forceKeepAttr||(At(Y,c),!E.keepAttr))continue;if(!Ne&&te(/\/>/i,K)){At(Y,c);continue}Be&&St([ue,We,Ge],ao=>{K=it(K,ao," ")});const ro=q(c.nodeName);if(to(ro,at,K)){if($n&&(at==="id"||at==="name")&&(At(Y,c),K=Or+K),b&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!ae)switch(f.getAttributeType(ro,at)){case"TrustedHTML":{K=b.createHTML(K);break}case"TrustedScriptURL":{K=b.createScriptURL(K);break}}try{ae?c.setAttributeNS(ae,Y,K):c.setAttribute(Y,K),Qn(c)?xe(c):Ao(e.removed)}catch{}}}Te("afterSanitizeAttributes",c,null)},Wr=function C(c){let w=null;const E=Vn(c);for(Te("beforeSanitizeShadowDOM",c,null);w=E.nextNode();)Te("uponSanitizeShadowNode",w,null),!eo(w)&&(w.content instanceof a&&C(w.content),oo(w));Te("afterSanitizeShadowDOM",c,null)};return e.sanitize=function(C){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},w=null,E=null,H=null,X=null;if(rn=!C,rn&&(C="<!-->"),typeof C!="string"&&!Kn(C))if(typeof C.toString=="function"){if(C=C.toString(),typeof C!="string")throw lt("dirty is not a string, aborting")}else throw lt("toString is not a function");if(!e.isSupported)return C;if(en||sn(c),e.removed=[],typeof C=="string"&&(ot=!1),ot){if(C.nodeName){const ke=q(C.nodeName);if(!J[ke]||we[ke])throw lt("root node is forbidden and cannot be sanitized in-place")}}else if(C instanceof i)w=Xn("<!---->"),E=w.ownerDocument.importNode(C,!0),E.nodeType===ct.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?w=E:w.appendChild(E);else{if(!Xe&&!Be&&!Ue&&C.indexOf("<")===-1)return b&&Et?b.createHTML(C):C;if(w=Xn(C),!w)return Xe?null:Et?v:""}w&&tn&&xe(w.firstChild);const Y=Vn(ot?C:w);for(;H=Y.nextNode();)eo(H)||(H.content instanceof a&&Wr(H.content),oo(H));if(ot)return C;if(Xe){if(Dt)for(X=I.call(w.ownerDocument);w.firstChild;)X.appendChild(w.firstChild);else X=w;return(W.shadowroot||W.shadowrootmode)&&(X=j.call(o,X,!0)),X}let ae=Ue?w.outerHTML:w.innerHTML;return Ue&&J["!doctype"]&&w.ownerDocument&&w.ownerDocument.doctype&&w.ownerDocument.doctype.name&&te(yr,w.ownerDocument.doctype.name)&&(ae="<!DOCTYPE "+w.ownerDocument.doctype.name+`>
`+ae),Be&&St([ue,We,Ge],ke=>{ae=it(ae,ke," ")}),b&&Et?b.createHTML(ae):ae},e.setConfig=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};sn(C),en=!0},e.clearConfig=function(){et=null,en=!1},e.isValidAttribute=function(C,c,w){et||sn({});const E=q(C),H=q(c);return to(E,H,w)},e.addHook=function(C,c){typeof c=="function"&&($[C]=$[C]||[],st($[C],c))},e.removeHook=function(C){if($[C])return Ao($[C])},e.removeHooks=function(C){$[C]&&($[C]=[])},e.removeAllHooks=function(){$={}},e}var ti=vr();function Ln(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let Le=Ln();function wr(t){Le=t}const xr=/[&<>"']/,ni=new RegExp(xr.source,"g"),kr=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,oi=new RegExp(kr.source,"g"),ri={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Po=t=>ri[t];function V(t,e){if(e){if(xr.test(t))return t.replace(ni,Po)}else if(kr.test(t))return t.replace(oi,Po);return t}const ai=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function Dr(t){return t.replace(ai,(e,n)=>(n=n.toLowerCase(),n==="colon"?":":n.charAt(0)==="#"?n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1)):""))}const si=/(^|[^\[])\^/g;function U(t,e){t=typeof t=="string"?t:t.source,e=e||"";const n={replace:(o,r)=>(r=r.source||r,r=r.replace(si,"$1"),t=t.replace(o,r),n),getRegex:()=>new RegExp(t,e)};return n}const ii=/[^\w:]/g,li=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function Mo(t,e,n){if(t){let o;try{o=decodeURIComponent(Dr(n)).replace(ii,"").toLowerCase()}catch{return null}if(o.indexOf("javascript:")===0||o.indexOf("vbscript:")===0||o.indexOf("data:")===0)return null}e&&!li.test(n)&&(n=hi(e,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const Rt={},ui=/^[^:]+:\/*[^/]*$/,ci=/^([^:]+:)[\s\S]*$/,di=/^([^:]+:\/*[^/]*)[\s\S]*$/;function hi(t,e){Rt[" "+t]||(ui.test(t)?Rt[" "+t]=t+"/":Rt[" "+t]=Lt(t,"/",!0)),t=Rt[" "+t];const n=t.indexOf(":")===-1;return e.substring(0,2)==="//"?n?e:t.replace(ci,"$1")+e:e.charAt(0)==="/"?n?e:t.replace(di,"$1")+e:t+e}const Ht={exec:function(){}};function Lo(t,e){const n=t.replace(/\|/g,(a,s,i)=>{let l=!1,u=s;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),o=n.split(/ \|/);let r=0;if(o[0].trim()||o.shift(),o.length>0&&!o[o.length-1].trim()&&o.pop(),o.length>e)o.splice(e);else for(;o.length<e;)o.push("");for(;r<o.length;r++)o[r]=o[r].trim().replace(/\\\|/g,"|");return o}function Lt(t,e,n){const o=t.length;if(o===0)return"";let r=0;for(;r<o;){const a=t.charAt(o-r-1);if(a===e&&!n)r++;else if(a!==e&&n)r++;else break}return t.slice(0,o-r)}function pi(t,e){if(t.indexOf(e[1])===-1)return-1;const n=t.length;let o=0,r=0;for(;r<n;r++)if(t[r]==="\\")r++;else if(t[r]===e[0])o++;else if(t[r]===e[1]&&(o--,o<0))return r;return-1}function mi(t,e){!t||t.silent||(e&&console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"),(t.sanitize||t.sanitizer)&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"),(t.highlight||t.langPrefix!=="language-")&&console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."),t.mangle&&console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`."),t.baseUrl&&console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."),t.smartypants&&console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."),t.xhtml&&console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."),(t.headerIds||t.headerPrefix)&&console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`."))}function No(t,e,n,o){const r=e.href,a=e.title?V(e.title):null,s=t[1].replace(/\\([\[\]])/g,"$1");if(t[0].charAt(0)!=="!"){o.state.inLink=!0;const i={type:"link",raw:n,href:r,title:a,text:s,tokens:o.inlineTokens(s)};return o.state.inLink=!1,i}return{type:"image",raw:n,href:r,title:a,text:V(s)}}function fi(t,e){const n=t.match(/^(\s+)(?:```)/);if(n===null)return e;const o=n[1];return e.split(`
`).map(r=>{const a=r.match(/^\s+/);if(a===null)return r;const[s]=a;return s.length>=o.length?r.slice(o.length):r}).join(`
`)}class jt{constructor(e){this.options=e||Le}space(e){const n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){const n=this.rules.block.code.exec(e);if(n){const o=n[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?o:Lt(o,`
`)}}}fences(e){const n=this.rules.block.fences.exec(e);if(n){const o=n[0],r=fi(o,n[3]||"");return{type:"code",raw:o,lang:n[2]?n[2].trim().replace(this.rules.inline._escapes,"$1"):n[2],text:r}}}heading(e){const n=this.rules.block.heading.exec(e);if(n){let o=n[2].trim();if(/#$/.test(o)){const r=Lt(o,"#");(this.options.pedantic||!r||/ $/.test(r))&&(o=r.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:o,tokens:this.lexer.inline(o)}}}hr(e){const n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:n[0]}}blockquote(e){const n=this.rules.block.blockquote.exec(e);if(n){const o=n[0].replace(/^ *>[ \t]?/gm,""),r=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(o);return this.lexer.state.top=r,{type:"blockquote",raw:n[0],tokens:a,text:o}}}list(e){let n=this.rules.block.list.exec(e);if(n){let o,r,a,s,i,l,u,p,g,m,f,_,T=n[1].trim();const B=T.length>1,F={type:"list",raw:"",ordered:B,start:B?+T.slice(0,-1):"",loose:!1,items:[]};T=B?`\\d{1,9}\\${T.slice(-1)}`:`\\${T}`,this.options.pedantic&&(T=B?T:"[*+-]");const d=new RegExp(`^( {0,3}${T})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(_=!1,!(!(n=d.exec(e))||this.rules.block.hr.test(e)));){if(o=n[0],e=e.substring(o.length),p=n[2].split(`
`,1)[0].replace(/^\t+/,b=>" ".repeat(3*b.length)),g=e.split(`
`,1)[0],this.options.pedantic?(s=2,f=p.trimLeft()):(s=n[2].search(/[^ ]/),s=s>4?1:s,f=p.slice(s),s+=n[1].length),l=!1,!p&&/^ *$/.test(g)&&(o+=g+`
`,e=e.substring(g.length+1),_=!0),!_){const b=new RegExp(`^ {0,${Math.min(3,s-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),v=new RegExp(`^ {0,${Math.min(3,s-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),y=new RegExp(`^ {0,${Math.min(3,s-1)}}(?:\`\`\`|~~~)`),D=new RegExp(`^ {0,${Math.min(3,s-1)}}#`);for(;e&&(m=e.split(`
`,1)[0],g=m,this.options.pedantic&&(g=g.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(y.test(g)||D.test(g)||b.test(g)||v.test(e)));){if(g.search(/[^ ]/)>=s||!g.trim())f+=`
`+g.slice(s);else{if(l||p.search(/[^ ]/)>=4||y.test(p)||D.test(p)||v.test(p))break;f+=`
`+g}!l&&!g.trim()&&(l=!0),o+=m+`
`,e=e.substring(m.length+1),p=g.slice(s)}}F.loose||(u?F.loose=!0:/\n *\n *$/.test(o)&&(u=!0)),this.options.gfm&&(r=/^\[[ xX]\] /.exec(f),r&&(a=r[0]!=="[ ] ",f=f.replace(/^\[[ xX]\] +/,""))),F.items.push({type:"list_item",raw:o,task:!!r,checked:a,loose:!1,text:f}),F.raw+=o}F.items[F.items.length-1].raw=o.trimRight(),F.items[F.items.length-1].text=f.trimRight(),F.raw=F.raw.trimRight();const h=F.items.length;for(i=0;i<h;i++)if(this.lexer.state.top=!1,F.items[i].tokens=this.lexer.blockTokens(F.items[i].text,[]),!F.loose){const b=F.items[i].tokens.filter(y=>y.type==="space"),v=b.length>0&&b.some(y=>/\n.*\n/.test(y.raw));F.loose=v}if(F.loose)for(i=0;i<h;i++)F.items[i].loose=!0;return F}}html(e){const n=this.rules.block.html.exec(e);if(n){const o={type:"html",block:!0,raw:n[0],pre:!this.options.sanitizer&&(n[1]==="pre"||n[1]==="script"||n[1]==="style"),text:n[0]};if(this.options.sanitize){const r=this.options.sanitizer?this.options.sanitizer(n[0]):V(n[0]);o.type="paragraph",o.text=r,o.tokens=this.lexer.inline(r)}return o}}def(e){const n=this.rules.block.def.exec(e);if(n){const o=n[1].toLowerCase().replace(/\s+/g," "),r=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",a=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline._escapes,"$1"):n[3];return{type:"def",tag:o,raw:n[0],href:r,title:a}}}table(e){const n=this.rules.block.table.exec(e);if(n){const o={type:"table",header:Lo(n[1]).map(r=>({text:r})),align:n[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(o.header.length===o.align.length){o.raw=n[0];let r=o.align.length,a,s,i,l;for(a=0;a<r;a++)/^ *-+: *$/.test(o.align[a])?o.align[a]="right":/^ *:-+: *$/.test(o.align[a])?o.align[a]="center":/^ *:-+ *$/.test(o.align[a])?o.align[a]="left":o.align[a]=null;for(r=o.rows.length,a=0;a<r;a++)o.rows[a]=Lo(o.rows[a],o.header.length).map(u=>({text:u}));for(r=o.header.length,s=0;s<r;s++)o.header[s].tokens=this.lexer.inline(o.header[s].text);for(r=o.rows.length,s=0;s<r;s++)for(l=o.rows[s],i=0;i<l.length;i++)l[i].tokens=this.lexer.inline(l[i].text);return o}}}lheading(e){const n=this.rules.block.lheading.exec(e);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(e){const n=this.rules.block.paragraph.exec(e);if(n){const o=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:o,tokens:this.lexer.inline(o)}}}text(e){const n=this.rules.block.text.exec(e);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(e){const n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:V(n[1])}}tag(e){const n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):V(n[0]):n[0]}}link(e){const n=this.rules.inline.link.exec(e);if(n){const o=n[2].trim();if(!this.options.pedantic&&/^</.test(o)){if(!/>$/.test(o))return;const s=Lt(o.slice(0,-1),"\\");if((o.length-s.length)%2===0)return}else{const s=pi(n[2],"()");if(s>-1){const l=(n[0].indexOf("!")===0?5:4)+n[1].length+s;n[2]=n[2].substring(0,s),n[0]=n[0].substring(0,l).trim(),n[3]=""}}let r=n[2],a="";if(this.options.pedantic){const s=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);s&&(r=s[1],a=s[3])}else a=n[3]?n[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(o)?r=r.slice(1):r=r.slice(1,-1)),No(n,{href:r&&r.replace(this.rules.inline._escapes,"$1"),title:a&&a.replace(this.rules.inline._escapes,"$1")},n[0],this.lexer)}}reflink(e,n){let o;if((o=this.rules.inline.reflink.exec(e))||(o=this.rules.inline.nolink.exec(e))){let r=(o[2]||o[1]).replace(/\s+/g," ");if(r=n[r.toLowerCase()],!r){const a=o[0].charAt(0);return{type:"text",raw:a,text:a}}return No(o,r,o[0],this.lexer)}}emStrong(e,n,o=""){let r=this.rules.inline.emStrong.lDelim.exec(e);if(!r||r[3]&&o.match(/[\p{L}\p{N}]/u))return;if(!(r[1]||r[2]||"")||!o||this.rules.inline.punctuation.exec(o)){const s=r[0].length-1;let i,l,u=s,p=0;const g=r[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(g.lastIndex=0,n=n.slice(-1*e.length+s);(r=g.exec(n))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(l=i.length,r[3]||r[4]){u+=l;continue}else if((r[5]||r[6])&&s%3&&!((s+l)%3)){p+=l;continue}if(u-=l,u>0)continue;l=Math.min(l,l+u+p);const m=e.slice(0,s+r.index+l+1);if(Math.min(s,l)%2){const _=m.slice(1,-1);return{type:"em",raw:m,text:_,tokens:this.lexer.inlineTokens(_)}}const f=m.slice(2,-2);return{type:"strong",raw:m,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){const n=this.rules.inline.code.exec(e);if(n){let o=n[2].replace(/\n/g," ");const r=/[^ ]/.test(o),a=/^ /.test(o)&&/ $/.test(o);return r&&a&&(o=o.substring(1,o.length-1)),o=V(o,!0),{type:"codespan",raw:n[0],text:o}}}br(e){const n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){const n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(e,n){const o=this.rules.inline.autolink.exec(e);if(o){let r,a;return o[2]==="@"?(r=V(this.options.mangle?n(o[1]):o[1]),a="mailto:"+r):(r=V(o[1]),a=r),{type:"link",raw:o[0],text:r,href:a,tokens:[{type:"text",raw:r,text:r}]}}}url(e,n){let o;if(o=this.rules.inline.url.exec(e)){let r,a;if(o[2]==="@")r=V(this.options.mangle?n(o[0]):o[0]),a="mailto:"+r;else{let s;do s=o[0],o[0]=this.rules.inline._backpedal.exec(o[0])[0];while(s!==o[0]);r=V(o[0]),o[1]==="www."?a="http://"+o[0]:a=o[0]}return{type:"link",raw:o[0],text:r,href:a,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e,n){const o=this.rules.inline.text.exec(e);if(o){let r;return this.lexer.state.inRawBlock?r=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):V(o[0]):o[0]:r=V(this.options.smartypants?n(o[0]):o[0]),{type:"text",raw:o[0],text:r}}}}const A={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Ht,lheading:/^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};A._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;A._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;A.def=U(A.def).replace("label",A._label).replace("title",A._title).getRegex();A.bullet=/(?:[*+-]|\d{1,9}[.)])/;A.listItemStart=U(/^( *)(bull) */).replace("bull",A.bullet).getRegex();A.list=U(A.list).replace(/bull/g,A.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+A.def.source+")").getRegex();A._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";A._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;A.html=U(A.html,"i").replace("comment",A._comment).replace("tag",A._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();A.lheading=U(A.lheading).replace(/bull/g,A.bullet).getRegex();A.paragraph=U(A._paragraph).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.blockquote=U(A.blockquote).replace("paragraph",A.paragraph).getRegex();A.normal={...A};A.gfm={...A.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"};A.gfm.table=U(A.gfm.table).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.gfm.paragraph=U(A._paragraph).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",A.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.pedantic={...A.normal,html:U(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",A._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ht,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:U(A.normal._paragraph).replace("hr",A.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",A.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const x={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Ht,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,rDelimAst:/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Ht,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^((?![*_])[\spunctuation])/};x._punctuation="\\p{P}$+<=>`^|~";x.punctuation=U(x.punctuation,"u").replace(/punctuation/g,x._punctuation).getRegex();x.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;x.anyPunctuation=/\\[punct]/g;x._escapes=/\\([punct])/g;x._comment=U(A._comment).replace("(?:-->|$)","-->").getRegex();x.emStrong.lDelim=U(x.emStrong.lDelim,"u").replace(/punct/g,x._punctuation).getRegex();x.emStrong.rDelimAst=U(x.emStrong.rDelimAst,"gu").replace(/punct/g,x._punctuation).getRegex();x.emStrong.rDelimUnd=U(x.emStrong.rDelimUnd,"gu").replace(/punct/g,x._punctuation).getRegex();x.anyPunctuation=U(x.anyPunctuation,"gu").replace(/punct/g,x._punctuation).getRegex();x._escapes=U(x._escapes,"gu").replace(/punct/g,x._punctuation).getRegex();x._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;x._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;x.autolink=U(x.autolink).replace("scheme",x._scheme).replace("email",x._email).getRegex();x._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;x.tag=U(x.tag).replace("comment",x._comment).replace("attribute",x._attribute).getRegex();x._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;x._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;x._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;x.link=U(x.link).replace("label",x._label).replace("href",x._href).replace("title",x._title).getRegex();x.reflink=U(x.reflink).replace("label",x._label).replace("ref",A._label).getRegex();x.nolink=U(x.nolink).replace("ref",A._label).getRegex();x.reflinkSearch=U(x.reflinkSearch,"g").replace("reflink",x.reflink).replace("nolink",x.nolink).getRegex();x.normal={...x};x.pedantic={...x.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:U(/^!?\[(label)\]\((.*?)\)/).replace("label",x._label).getRegex(),reflink:U(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",x._label).getRegex()};x.gfm={...x.normal,escape:U(x.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/};x.gfm.url=U(x.gfm.url,"i").replace("email",x.gfm._extended_email).getRegex();x.breaks={...x.gfm,br:U(x.br).replace("{2,}","*").getRegex(),text:U(x.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};function gi(t){return t.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function Oo(t){let e="",n,o;const r=t.length;for(n=0;n<r;n++)o=t.charCodeAt(n),Math.random()>.5&&(o="x"+o.toString(16)),e+="&#"+o+";";return e}class Ee{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Le,this.options.tokenizer=this.options.tokenizer||new jt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:A.normal,inline:x.normal};this.options.pedantic?(n.block=A.pedantic,n.inline=x.pedantic):this.options.gfm&&(n.block=A.gfm,this.options.breaks?n.inline=x.breaks:n.inline=x.gfm),this.tokenizer.rules=n}static get rules(){return{block:A,inline:x}}static lex(e,n){return new Ee(n).lex(e)}static lexInline(e,n){return new Ee(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let n;for(;n=this.inlineQueue.shift();)this.inlineTokens(n.src,n.tokens);return this.tokens}blockTokens(e,n=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(i,l,u)=>l+"    ".repeat(u.length));let o,r,a,s;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(i=>(o=i.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))){if(o=this.tokenizer.space(e)){e=e.substring(o.raw.length),o.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(e)){e=e.substring(o.raw.length),r=n[n.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):n.push(o);continue}if(o=this.tokenizer.fences(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(e)){e=e.substring(o.raw.length),r=n[n.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+o.raw,r.text+=`
`+o.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title});continue}if(o=this.tokenizer.table(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(e)){e=e.substring(o.raw.length),n.push(o);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let i=1/0;const l=e.slice(1);let u;this.options.extensions.startBlock.forEach(function(p){u=p.call({lexer:this},l),typeof u=="number"&&u>=0&&(i=Math.min(i,u))}),i<1/0&&i>=0&&(a=e.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(a))){r=n[n.length-1],s&&r.type==="paragraph"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):n.push(o),s=a.length!==e.length,e=e.substring(o.raw.length);continue}if(o=this.tokenizer.text(e)){e=e.substring(o.raw.length),r=n[n.length-1],r&&r.type==="text"?(r.raw+=`
`+o.raw,r.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):n.push(o);continue}if(e){const i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let o,r,a,s=e,i,l,u;if(this.tokens.links){const p=Object.keys(this.tokens.links);if(p.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)p.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(u=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(p=>(o=p.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))){if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),r=n[n.length-1],r&&o.type==="text"&&r.type==="text"?(r.raw+=o.raw,r.text+=o.text):n.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length),r=n[n.length-1],r&&o.type==="text"&&r.type==="text"?(r.raw+=o.raw,r.text+=o.text):n.push(o);continue}if(o=this.tokenizer.emStrong(e,s,u)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.autolink(e,Oo)){e=e.substring(o.raw.length),n.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e,Oo))){e=e.substring(o.raw.length),n.push(o);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let p=1/0;const g=e.slice(1);let m;this.options.extensions.startInline.forEach(function(f){m=f.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(a=e.substring(0,p+1))}if(o=this.tokenizer.inlineText(a,gi)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(u=o.raw.slice(-1)),l=!0,r=n[n.length-1],r&&r.type==="text"?(r.raw+=o.raw,r.text+=o.text):n.push(o);continue}if(e){const p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}}class Jt{constructor(e){this.options=e||Le}code(e,n,o){const r=(n||"").match(/\S*/)[0];if(this.options.highlight){const a=this.options.highlight(e,r);a!=null&&a!==e&&(o=!0,e=a)}return e=e.replace(/\n$/,"")+`
`,r?'<pre><code class="'+this.options.langPrefix+V(r)+'">'+(o?e:V(e,!0))+`</code></pre>
`:"<pre><code>"+(o?e:V(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,n){return e}heading(e,n,o,r){if(this.options.headerIds){const a=this.options.headerPrefix+r.slug(o);return`<h${n} id="${a}">${e}</h${n}>
`}return`<h${n}>${e}</h${n}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,n,o){const r=n?"ol":"ul",a=n&&o!==1?' start="'+o+'"':"";return"<"+r+a+`>
`+e+"</"+r+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,n){return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,n){const o=n.header?"th":"td";return(n.align?`<${o} align="${n.align}">`:`<${o}>`)+e+`</${o}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,n,o){if(e=Mo(this.options.sanitize,this.options.baseUrl,e),e===null)return o;let r='<a href="'+e+'"';return n&&(r+=' title="'+n+'"'),r+=">"+o+"</a>",r}image(e,n,o){if(e=Mo(this.options.sanitize,this.options.baseUrl,e),e===null)return o;let r=`<img src="${e}" alt="${o}"`;return n&&(r+=` title="${n}"`),r+=this.options.xhtml?"/>":">",r}text(e){return e}}class Nn{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,n,o){return""+o}image(e,n,o){return""+o}br(){return""}}class On{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,n){let o=e,r=0;if(this.seen.hasOwnProperty(o)){r=this.seen[e];do r++,o=e+"-"+r;while(this.seen.hasOwnProperty(o))}return n||(this.seen[e]=r,this.seen[o]=0),o}slug(e,n={}){const o=this.serialize(e);return this.getNextSafeSlug(o,n.dryrun)}}class Fe{constructor(e){this.options=e||Le,this.options.renderer=this.options.renderer||new Jt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new Nn,this.slugger=new On}static parse(e,n){return new Fe(n).parse(e)}static parseInline(e,n){return new Fe(n).parseInline(e)}parse(e,n=!0){let o="",r,a,s,i,l,u,p,g,m,f,_,T,B,F,d,h,b,v,y;const D=e.length;for(r=0;r<D;r++){if(f=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[f.type]&&(y=this.options.extensions.renderers[f.type].call({parser:this},f),y!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(f.type))){o+=y||"";continue}switch(f.type){case"space":continue;case"hr":{o+=this.renderer.hr();continue}case"heading":{o+=this.renderer.heading(this.parseInline(f.tokens),f.depth,Dr(this.parseInline(f.tokens,this.textRenderer)),this.slugger);continue}case"code":{o+=this.renderer.code(f.text,f.lang,f.escaped);continue}case"table":{for(g="",p="",i=f.header.length,a=0;a<i;a++)p+=this.renderer.tablecell(this.parseInline(f.header[a].tokens),{header:!0,align:f.align[a]});for(g+=this.renderer.tablerow(p),m="",i=f.rows.length,a=0;a<i;a++){for(u=f.rows[a],p="",l=u.length,s=0;s<l;s++)p+=this.renderer.tablecell(this.parseInline(u[s].tokens),{header:!1,align:f.align[s]});m+=this.renderer.tablerow(p)}o+=this.renderer.table(g,m);continue}case"blockquote":{m=this.parse(f.tokens),o+=this.renderer.blockquote(m);continue}case"list":{for(_=f.ordered,T=f.start,B=f.loose,i=f.items.length,m="",a=0;a<i;a++)d=f.items[a],h=d.checked,b=d.task,F="",d.task&&(v=this.renderer.checkbox(h),B?d.tokens.length>0&&d.tokens[0].type==="paragraph"?(d.tokens[0].text=v+" "+d.tokens[0].text,d.tokens[0].tokens&&d.tokens[0].tokens.length>0&&d.tokens[0].tokens[0].type==="text"&&(d.tokens[0].tokens[0].text=v+" "+d.tokens[0].tokens[0].text)):d.tokens.unshift({type:"text",text:v}):F+=v),F+=this.parse(d.tokens,B),m+=this.renderer.listitem(F,b,h);o+=this.renderer.list(m,_,T);continue}case"html":{o+=this.renderer.html(f.text,f.block);continue}case"paragraph":{o+=this.renderer.paragraph(this.parseInline(f.tokens));continue}case"text":{for(m=f.tokens?this.parseInline(f.tokens):f.text;r+1<D&&e[r+1].type==="text";)f=e[++r],m+=`
`+(f.tokens?this.parseInline(f.tokens):f.text);o+=n?this.renderer.paragraph(m):m;continue}default:{const I='Token with "'+f.type+'" type was not found.';if(this.options.silent){console.error(I);return}else throw new Error(I)}}}return o}parseInline(e,n){n=n||this.renderer;let o="",r,a,s;const i=e.length;for(r=0;r<i;r++){if(a=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]&&(s=this.options.extensions.renderers[a.type].call({parser:this},a),s!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type))){o+=s||"";continue}switch(a.type){case"escape":{o+=n.text(a.text);break}case"html":{o+=n.html(a.text);break}case"link":{o+=n.link(a.href,a.title,this.parseInline(a.tokens,n));break}case"image":{o+=n.image(a.href,a.title,a.text);break}case"strong":{o+=n.strong(this.parseInline(a.tokens,n));break}case"em":{o+=n.em(this.parseInline(a.tokens,n));break}case"codespan":{o+=n.codespan(a.text);break}case"br":{o+=n.br();break}case"del":{o+=n.del(this.parseInline(a.tokens,n));break}case"text":{o+=n.text(a.text);break}default:{const l='Token with "'+a.type+'" type was not found.';if(this.options.silent){console.error(l);return}else throw new Error(l)}}}return o}}class mt{constructor(e){this.options=e||Le}preprocess(e){return e}postprocess(e){return e}}ee(mt,"passThroughHooks",new Set(["preprocess","postprocess"]));var je,Fn,Er;class bi{constructor(...e){io(this,je);ee(this,"defaults",Ln());ee(this,"options",this.setOptions);ee(this,"parse",Tt(this,je,Fn).call(this,Ee.lex,Fe.parse));ee(this,"parseInline",Tt(this,je,Fn).call(this,Ee.lexInline,Fe.parseInline));ee(this,"Parser",Fe);ee(this,"parser",Fe.parse);ee(this,"Renderer",Jt);ee(this,"TextRenderer",Nn);ee(this,"Lexer",Ee);ee(this,"lexer",Ee.lex);ee(this,"Tokenizer",jt);ee(this,"Slugger",On);ee(this,"Hooks",mt);this.use(...e)}walkTokens(e,n){let o=[];for(const r of e)switch(o=o.concat(n.call(this,r)),r.type){case"table":{for(const a of r.header)o=o.concat(this.walkTokens(a.tokens,n));for(const a of r.rows)for(const s of a)o=o.concat(this.walkTokens(s.tokens,n));break}case"list":{o=o.concat(this.walkTokens(r.items,n));break}default:this.defaults.extensions&&this.defaults.extensions.childTokens&&this.defaults.extensions.childTokens[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{o=o.concat(this.walkTokens(r[a],n))}):r.tokens&&(o=o.concat(this.walkTokens(r.tokens,n)))}return o}use(...e){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(o=>{const r={...o};if(r.async=this.defaults.async||r.async||!1,o.extensions&&(o.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if(a.renderer){const s=n.renderers[a.name];s?n.renderers[a.name]=function(...i){let l=a.renderer.apply(this,i);return l===!1&&(l=s.apply(this,i)),l}:n.renderers[a.name]=a.renderer}if(a.tokenizer){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");n[a.level]?n[a.level].unshift(a.tokenizer):n[a.level]=[a.tokenizer],a.start&&(a.level==="block"?n.startBlock?n.startBlock.push(a.start):n.startBlock=[a.start]:a.level==="inline"&&(n.startInline?n.startInline.push(a.start):n.startInline=[a.start]))}a.childTokens&&(n.childTokens[a.name]=a.childTokens)}),r.extensions=n),o.renderer){const a=this.defaults.renderer||new Jt(this.defaults);for(const s in o.renderer){const i=a[s];a[s]=(...l)=>{let u=o.renderer[s].apply(a,l);return u===!1&&(u=i.apply(a,l)),u}}r.renderer=a}if(o.tokenizer){const a=this.defaults.tokenizer||new jt(this.defaults);for(const s in o.tokenizer){const i=a[s];a[s]=(...l)=>{let u=o.tokenizer[s].apply(a,l);return u===!1&&(u=i.apply(a,l)),u}}r.tokenizer=a}if(o.hooks){const a=this.defaults.hooks||new mt;for(const s in o.hooks){const i=a[s];mt.passThroughHooks.has(s)?a[s]=l=>{if(this.defaults.async)return Promise.resolve(o.hooks[s].call(a,l)).then(p=>i.call(a,p));const u=o.hooks[s].call(a,l);return i.call(a,u)}:a[s]=(...l)=>{let u=o.hooks[s].apply(a,l);return u===!1&&(u=i.apply(a,l)),u}}r.hooks=a}if(o.walkTokens){const a=this.defaults.walkTokens;r.walkTokens=function(s){let i=[];return i.push(o.walkTokens.call(this,s)),a&&(i=i.concat(a.call(this,s))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}}je=new WeakSet,Fn=function(e,n){return(o,r,a)=>{typeof r=="function"&&(a=r,r=null);const s={...r};r={...this.defaults,...s};const i=Tt(this,je,Er).call(this,r.silent,r.async,a);if(typeof o>"u"||o===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof o!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(o)+", string expected"));if(mi(r,a),r.hooks&&(r.hooks.options=r),a){const l=r.highlight;let u;try{r.hooks&&(o=r.hooks.preprocess(o)),u=e(o,r)}catch(m){return i(m)}const p=m=>{let f;if(!m)try{r.walkTokens&&this.walkTokens(u,r.walkTokens),f=n(u,r),r.hooks&&(f=r.hooks.postprocess(f))}catch(_){m=_}return r.highlight=l,m?i(m):a(null,f)};if(!l||l.length<3||(delete r.highlight,!u.length))return p();let g=0;this.walkTokens(u,m=>{m.type==="code"&&(g++,setTimeout(()=>{l(m.text,m.lang,(f,_)=>{if(f)return p(f);_!=null&&_!==m.text&&(m.text=_,m.escaped=!0),g--,g===0&&p()})},0))}),g===0&&p();return}if(r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(o):o).then(l=>e(l,r)).then(l=>r.walkTokens?Promise.all(this.walkTokens(l,r.walkTokens)).then(()=>l):l).then(l=>n(l,r)).then(l=>r.hooks?r.hooks.postprocess(l):l).catch(i);try{r.hooks&&(o=r.hooks.preprocess(o));const l=e(o,r);r.walkTokens&&this.walkTokens(l,r.walkTokens);let u=n(l,r);return r.hooks&&(u=r.hooks.postprocess(u)),u}catch(l){return i(l)}}},Er=function(e,n,o){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const a="<p>An error occurred:</p><pre>"+V(r.message+"",!0)+"</pre>";if(n)return Promise.resolve(a);if(o){o(null,a);return}return a}if(n)return Promise.reject(r);if(o){o(r);return}throw r}};const He=new bi(Le);function L(t,e,n){return He.parse(t,e,n)}L.options=L.setOptions=function(t){return He.setOptions(t),L.defaults=He.defaults,wr(L.defaults),L};L.getDefaults=Ln;L.defaults=Le;L.use=function(...t){return He.use(...t),L.defaults=He.defaults,wr(L.defaults),L};L.walkTokens=function(t,e){return He.walkTokens(t,e)};L.parseInline=He.parseInline;L.Parser=Fe;L.parser=Fe.parse;L.Renderer=Jt;L.TextRenderer=Nn;L.Lexer=Ee;L.lexer=Ee.lex;L.Tokenizer=jt;L.Slugger=On;L.Hooks=mt;L.parse=L;L.options;L.setOptions;L.use;L.walkTokens;L.parseInline;Fe.parse;Ee.lex;const yi=/[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g,vi=Object.hasOwnProperty;class Fr{constructor(){this.occurrences,this.reset()}slug(e,n){const o=this;let r=wi(e,n===!0);const a=r;for(;vi.call(o.occurrences,r);)o.occurrences[a]++,r=a+"-"+o.occurrences[a];return o.occurrences[r]=0,r}reset(){this.occurrences=Object.create(null)}}function wi(t,e){return typeof t!="string"?"":(e||(t=t.toLowerCase()),t.replace(yi,"").replace(/ /g,"-"))}let Cr=new Fr,Ar=[];function xi({prefix:t="",globalSlugs:e=!1}={}){return{headerIds:!1,hooks:{preprocess(n){return e||ki(),n}},renderer:{heading(n,o,r){r=r.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"");const a=`${t}${Cr.slug(r)}`,s={level:o,text:n,id:a};return Ar.push(s),`<h${o} id="${a}">${n}</h${o}>
`}}}}function ki(){Ar=[],Cr=new Fr}function Di(){return{mangle:!1,walkTokens(t){if(t.type!=="link"||!t.href.startsWith("mailto:"))return;const e=t.href.substring(7),n=Ei(e);t.href=`mailto:${n}`,!(t.tokens.length!==1||t.tokens[0].type!=="text"||t.tokens[0].text!==e)&&(t.text=n,t.tokens[0].text=n)}}}function Ei(t){let e="",n,o;const r=t.length;for(n=0;n<r;n++)o=t.charCodeAt(n),Math.random()>.5&&(o="x"+o.toString(16)),e+="&#"+o+";";return e}var Uo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Fi(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Tr={exports:{}};(function(t){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=function(o){var r=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,a=0,s={},i={manual:o.Prism&&o.Prism.manual,disableWorkerMessageHandler:o.Prism&&o.Prism.disableWorkerMessageHandler,util:{encode:function d(h){return h instanceof l?new l(h.type,d(h.content),h.alias):Array.isArray(h)?h.map(d):h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(d){return Object.prototype.toString.call(d).slice(8,-1)},objId:function(d){return d.__id||Object.defineProperty(d,"__id",{value:++a}),d.__id},clone:function d(h,b){b=b||{};var v,y;switch(i.util.type(h)){case"Object":if(y=i.util.objId(h),b[y])return b[y];v={},b[y]=v;for(var D in h)h.hasOwnProperty(D)&&(v[D]=d(h[D],b));return v;case"Array":return y=i.util.objId(h),b[y]?b[y]:(v=[],b[y]=v,h.forEach(function(I,S){v[S]=d(I,b)}),v);default:return h}},getLanguage:function(d){for(;d;){var h=r.exec(d.className);if(h)return h[1].toLowerCase();d=d.parentElement}return"none"},setLanguage:function(d,h){d.className=d.className.replace(RegExp(r,"gi"),""),d.classList.add("language-"+h)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(v){var d=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(v.stack)||[])[1];if(d){var h=document.getElementsByTagName("script");for(var b in h)if(h[b].src==d)return h[b]}return null}},isActive:function(d,h,b){for(var v="no-"+h;d;){var y=d.classList;if(y.contains(h))return!0;if(y.contains(v))return!1;d=d.parentElement}return!!b}},languages:{plain:s,plaintext:s,text:s,txt:s,extend:function(d,h){var b=i.util.clone(i.languages[d]);for(var v in h)b[v]=h[v];return b},insertBefore:function(d,h,b,v){v=v||i.languages;var y=v[d],D={};for(var I in y)if(y.hasOwnProperty(I)){if(I==h)for(var S in b)b.hasOwnProperty(S)&&(D[S]=b[S]);b.hasOwnProperty(I)||(D[I]=y[I])}var j=v[d];return v[d]=D,i.languages.DFS(i.languages,function($,ue){ue===j&&$!=d&&(this[$]=D)}),D},DFS:function d(h,b,v,y){y=y||{};var D=i.util.objId;for(var I in h)if(h.hasOwnProperty(I)){b.call(h,I,h[I],v||I);var S=h[I],j=i.util.type(S);j==="Object"&&!y[D(S)]?(y[D(S)]=!0,d(S,b,null,y)):j==="Array"&&!y[D(S)]&&(y[D(S)]=!0,d(S,b,I,y))}}},plugins:{},highlightAll:function(d,h){i.highlightAllUnder(document,d,h)},highlightAllUnder:function(d,h,b){var v={callback:b,container:d,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",v),v.elements=Array.prototype.slice.apply(v.container.querySelectorAll(v.selector)),i.hooks.run("before-all-elements-highlight",v);for(var y=0,D;D=v.elements[y++];)i.highlightElement(D,h===!0,v.callback)},highlightElement:function(d,h,b){var v=i.util.getLanguage(d),y=i.languages[v];i.util.setLanguage(d,v);var D=d.parentElement;D&&D.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(D,v);var I=d.textContent,S={element:d,language:v,grammar:y,code:I};function j(ue){S.highlightedCode=ue,i.hooks.run("before-insert",S),S.element.innerHTML=S.highlightedCode,i.hooks.run("after-highlight",S),i.hooks.run("complete",S),b&&b.call(S.element)}if(i.hooks.run("before-sanity-check",S),D=S.element.parentElement,D&&D.nodeName.toLowerCase()==="pre"&&!D.hasAttribute("tabindex")&&D.setAttribute("tabindex","0"),!S.code){i.hooks.run("complete",S),b&&b.call(S.element);return}if(i.hooks.run("before-highlight",S),!S.grammar){j(i.util.encode(S.code));return}if(h&&o.Worker){var $=new Worker(i.filename);$.onmessage=function(ue){j(ue.data)},$.postMessage(JSON.stringify({language:S.language,code:S.code,immediateClose:!0}))}else j(i.highlight(S.code,S.grammar,S.language))},highlight:function(d,h,b){var v={code:d,grammar:h,language:b};if(i.hooks.run("before-tokenize",v),!v.grammar)throw new Error('The language "'+v.language+'" has no grammar.');return v.tokens=i.tokenize(v.code,v.grammar),i.hooks.run("after-tokenize",v),l.stringify(i.util.encode(v.tokens),v.language)},tokenize:function(d,h){var b=h.rest;if(b){for(var v in b)h[v]=b[v];delete h.rest}var y=new g;return m(y,y.head,d),p(d,y,h,y.head,0),_(y)},hooks:{all:{},add:function(d,h){var b=i.hooks.all;b[d]=b[d]||[],b[d].push(h)},run:function(d,h){var b=i.hooks.all[d];if(!(!b||!b.length))for(var v=0,y;y=b[v++];)y(h)}},Token:l};o.Prism=i;function l(d,h,b,v){this.type=d,this.content=h,this.alias=b,this.length=(v||"").length|0}l.stringify=function d(h,b){if(typeof h=="string")return h;if(Array.isArray(h)){var v="";return h.forEach(function(j){v+=d(j,b)}),v}var y={type:h.type,content:d(h.content,b),tag:"span",classes:["token",h.type],attributes:{},language:b},D=h.alias;D&&(Array.isArray(D)?Array.prototype.push.apply(y.classes,D):y.classes.push(D)),i.hooks.run("wrap",y);var I="";for(var S in y.attributes)I+=" "+S+'="'+(y.attributes[S]||"").replace(/"/g,"&quot;")+'"';return"<"+y.tag+' class="'+y.classes.join(" ")+'"'+I+">"+y.content+"</"+y.tag+">"};function u(d,h,b,v){d.lastIndex=h;var y=d.exec(b);if(y&&v&&y[1]){var D=y[1].length;y.index+=D,y[0]=y[0].slice(D)}return y}function p(d,h,b,v,y,D){for(var I in b)if(!(!b.hasOwnProperty(I)||!b[I])){var S=b[I];S=Array.isArray(S)?S:[S];for(var j=0;j<S.length;++j){if(D&&D.cause==I+","+j)return;var $=S[j],ue=$.inside,We=!!$.lookbehind,Ge=!!$.greedy,Qt=$.alias;if(Ge&&!$.pattern.global){var Kt=$.pattern.toString().match(/[imsuy]*$/)[0];$.pattern=RegExp($.pattern.source,Kt+"g")}for(var kt=$.pattern||$,G=v.next,ce=y;G!==h.tail&&!(D&&ce>=D.reach);ce+=G.value.length,G=G.next){var Ce=G.value;if(h.length>d.length)return;if(!(Ce instanceof l)){var J=1,re;if(Ge){if(re=u(kt,ce,d,We),!re||re.index>=d.length)break;var we=re.index,W=re.index+re[0].length,pe=ce;for(pe+=G.value.length;we>=pe;)G=G.next,pe+=G.value.length;if(pe-=G.value.length,ce=pe,G.value instanceof l)continue;for(var z=G;z!==h.tail&&(pe<W||typeof z.value=="string");z=z.next)J++,pe+=z.value.length;J--,Ce=d.slice(ce,pe),re.index-=ce}else if(re=u(kt,0,Ce,We),!re)continue;var we=re.index,Re=re[0],qe=Ce.slice(0,we),Ze=Ce.slice(we+Re.length),Ye=ce+Ce.length;D&&Ye>D.reach&&(D.reach=Ye);var Ne=G.prev;qe&&(Ne=m(h,Ne,qe),ce+=qe.length),f(h,Ne,J);var Be=new l(I,ue?i.tokenize(Re,ue):Re,Qt,Re);if(G=m(h,Ne,Be),Ze&&m(h,G,Ze),J>1){var Oe={cause:I+","+j,reach:Ye};p(d,h,b,G.prev,ce,Oe),D&&Oe.reach>D.reach&&(D.reach=Oe.reach)}}}}}}function g(){var d={value:null,prev:null,next:null},h={value:null,prev:d,next:null};d.next=h,this.head=d,this.tail=h,this.length=0}function m(d,h,b){var v=h.next,y={value:b,prev:h,next:v};return h.next=y,v.prev=y,d.length++,y}function f(d,h,b){for(var v=h.next,y=0;y<b&&v!==d.tail;y++)v=v.next;h.next=v,v.prev=h,d.length-=y}function _(d){for(var h=[],b=d.head.next;b!==d.tail;)h.push(b.value),b=b.next;return h}if(!o.document)return o.addEventListener&&(i.disableWorkerMessageHandler||o.addEventListener("message",function(d){var h=JSON.parse(d.data),b=h.language,v=h.code,y=h.immediateClose;o.postMessage(i.highlight(v,i.languages[b],b)),y&&o.close()},!1)),i;var T=i.util.currentScript();T&&(i.filename=T.src,T.hasAttribute("data-manual")&&(i.manual=!0));function B(){i.manual||i.highlightAll()}if(!i.manual){var F=document.readyState;F==="loading"||F==="interactive"&&T&&T.defer?document.addEventListener("DOMContentLoaded",B):window.requestAnimationFrame?window.requestAnimationFrame(B):window.setTimeout(B,16)}return i}(e);t.exports&&(t.exports=n),typeof Uo<"u"&&(Uo.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(o){o.type==="entity"&&(o.attributes.title=o.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(r,a){var s={};s["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[a]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};i["language-"+a]={pattern:/[\s\S]+/,inside:n.languages[a]};var l={};l[r]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return r}),"i"),lookbehind:!0,greedy:!0,inside:i},n.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(o,r){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+o+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[r,"language-"+r],inside:n.languages[r]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,function(o){var r=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;o.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+r.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+r.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+r.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+r.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:r,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},o.languages.css.atrule.inside.rest=o.languages.css;var a=o.languages.markup;a&&(a.tag.addInlined("style","css"),a.tag.addAttribute("style","css"))}(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,function(){if(typeof n>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var o="Loading…",r=function(T,B){return"✖ Error "+T+" while fetching file: "+B},a="✖ Error: File does not exist or is empty",s={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",l="loading",u="loaded",p="failed",g="pre[data-src]:not(["+i+'="'+u+'"]):not(['+i+'="'+l+'"])';function m(T,B,F){var d=new XMLHttpRequest;d.open("GET",T,!0),d.onreadystatechange=function(){d.readyState==4&&(d.status<400&&d.responseText?B(d.responseText):d.status>=400?F(r(d.status,d.statusText)):F(a))},d.send(null)}function f(T){var B=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(T||"");if(B){var F=Number(B[1]),d=B[2],h=B[3];return d?h?[F,Number(h)]:[F,void 0]:[F,F]}}n.hooks.add("before-highlightall",function(T){T.selector+=", "+g}),n.hooks.add("before-sanity-check",function(T){var B=T.element;if(B.matches(g)){T.code="",B.setAttribute(i,l);var F=B.appendChild(document.createElement("CODE"));F.textContent=o;var d=B.getAttribute("data-src"),h=T.language;if(h==="none"){var b=(/\.(\w+)$/.exec(d)||[,"none"])[1];h=s[b]||b}n.util.setLanguage(F,h),n.util.setLanguage(B,h);var v=n.plugins.autoloader;v&&v.loadLanguages(h),m(d,function(y){B.setAttribute(i,u);var D=f(B.getAttribute("data-range"));if(D){var I=y.split(/\r\n?|\n/g),S=D[0],j=D[1]==null?I.length:D[1];S<0&&(S+=I.length),S=Math.max(0,Math.min(S-1,I.length)),j<0&&(j+=I.length),j=Math.max(0,Math.min(j,I.length)),y=I.slice(S,j).join(`
`),B.hasAttribute("data-start")||B.setAttribute("data-start",String(S+1))}F.textContent=y,n.highlightElement(F)},function(y){B.setAttribute(i,p),F.textContent=y})}}),n.plugins.fileHighlight={highlight:function(B){for(var F=(B||document).querySelectorAll(g),d=0,h;h=F[d++];)n.highlightElement(h)}};var _=!1;n.fileHighlight=function(){_||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),_=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(Tr);var Ci=Tr.exports;const Ai=Fi(Ci);(function(t){t.languages.typescript=t.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),t.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete t.languages.typescript.parameter,delete t.languages.typescript["literal-property"];var e=t.languages.extend("typescript",{});delete e["class-name"],t.languages.typescript["class-name"].inside=e,t.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),t.languages.ts=t.languages.typescript})(Prism);L.use(xi());L.use(Di());const Ti=ti(window),xt=({content:t})=>{const e=pr(),n=ve(()=>Ti.sanitize(L.parse(t),{ADD_ATTR:["target","src","style","frameBorder"],ADD_TAGS:["iframe"]}),t);return wt(()=>{if(!e.value)return;Ai.highlightAll(),e.value.querySelectorAll(".markdown-container pre[class*='language-']").forEach(r=>{r.addEventListener("click",()=>{const a=r.textContent;a!==null&&navigator.clipboard.writeText(a).then(()=>{alert("Snippet copied !")}).catch(s=>{console.error("Failed to copy text to clipboard:",s)})})}),e.value.querySelectorAll("a").forEach(r=>{const a=r.getAttribute("href");a&&_n(a)&&r.setAttribute("href",lr(a)??"")});const o=location.hash;o.trim()&&setTimeout(()=>{var a;const r=(a=e.value)==null?void 0:a.querySelector(o);r==null||r.scrollIntoView()},100)},t),createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:"markdown-container w-100%",ref:e,innerHTML:n}))},Sr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20132%20130.96'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:url(%23linear-gradient);}.cls-2{fill:url(%23linear-gradient-2);}.cls-3{fill:url(%23linear-gradient-3);}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='33.43'%20y1='18.71'%20x2='89.12'%20y2='18.71'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23e1e1e1'/%3e%3cstop%20offset='1'%20stop-color='%23818181'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='5.95'%20y1='6.91'%20x2='95.98'%20y2='147.81'%20xlink:href='%23linear-gradient'/%3e%3clinearGradient%20id='linear-gradient-3'%20x1='37.37'%20y1='-13.16'%20x2='127.4'%20y2='127.74'%20xlink:href='%23linear-gradient'/%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='OBJECTS'%3e%3cpath%20class='cls-1'%20d='M49.31,0H82.69a6.41,6.41,0,0,1,5,10.43L66,37.42l-21.68-27A6.41,6.41,0,0,1,49.31,0Z'/%3e%3cpath%20class='cls-2'%20d='M17.05,0,5.49,18A34.58,34.58,0,0,0,7.62,58.33L66,131l28.21-35.1L17.16,0Z'/%3e%3cpath%20class='cls-3'%20d='M115,0l11.55,18a34.58,34.58,0,0,1-2.13,40.35L66,131,37.79,95.86,114.84,0Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",_r="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20132%20130.96'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:url(%23linear-gradient);}.cls-2{fill:url(%23linear-gradient-2);}.cls-3{fill:url(%23linear-gradient-3);}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='33.43'%20y1='18.71'%20x2='89.12'%20y2='18.71'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%231e1e1e'/%3e%3cstop%20offset='1'%20stop-color='%237e7e7e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='5.95'%20y1='6.91'%20x2='95.98'%20y2='147.81'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%237e7e7e'/%3e%3cstop%20offset='1'%20stop-color='%231e1e1e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-3'%20x1='37.37'%20y1='-13.16'%20x2='127.4'%20y2='127.74'%20xlink:href='%23linear-gradient-2'/%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='OBJECTS'%3e%3cpath%20class='cls-1'%20d='M49.31,0H82.69a6.41,6.41,0,0,1,5,10.43L66,37.42l-21.68-27A6.41,6.41,0,0,1,49.31,0Z'/%3e%3cpath%20class='cls-2'%20d='M17.05,0,5.49,18A34.58,34.58,0,0,0,7.62,58.33L66,131l28.21-35.1L17.16,0Z'/%3e%3cpath%20class='cls-3'%20d='M115,0l11.55,18a34.58,34.58,0,0,1-2.13,40.35L66,131,37.79,95.86,114.84,0Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",Rr=()=>!!(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches),fn=t=>`@apply ${t.join(" ")}`,Wt=t=>rs().substring(0,t.length)===t,Si=()=>Rr()?Sr:_r,Nt=t=>{const{children:e,type:n,class:o}=t,r=ve(()=>fn(n==="fill"?["border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]","bg-[color:var(--secondary)] hover:bg-[color:var(--secondary-hover)]"]:n==="outline"?["border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]","hover:bg-[color:var(--secondary)]","bg-transparent"]:["bg-transparent hover:bg-[color:var(--secondary)]","border-transparent","color-[var(--text-low)] hover:color-[var(--text)]"]),n);return createJsxElement("button",{...t,class:mr("p-x-4 p-y-2 cursor-pointer rounded",r,o)},e)},Br=()=>createJsxElement("div",{class:"text-center m-t-auto text-[var(--text-lowest)] text-[0.8em]"},createJsxElement("p",null,"Released under the MIT License."),createJsxElement("p",null,"Copyright © 2023-present Riadh Adrani"));var fe=(t=>(t.Dark="dark",t.Light="light",t.Device="device",t))(fe||{});const ye=["0.5.0","0.5.2","0.5.3","0.5.4","0.5.5","0.5.6","0.5.7","0.5.8","0.5.9"],_i=(t,e)=>{const[n,o,r]=Me(localStorage.getItem(t)!==null?JSON.parse(localStorage.getItem(t)):e);return wt(()=>{localStorage.setItem(t,JSON.stringify(n))},[n]),[n,o,r]},Ri=()=>{const[t,e]=Me({width:window.innerWidth,height:window.innerHeight});return wt(()=>{const n=()=>{const{innerHeight:o,innerWidth:r}=window;e({height:o,width:r})};return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)}),t},Ir=Mn("scroll",()=>{const[t,e]=Me([]),n=pr(document.body.querySelector("#app")),o=Ri();return wt(()=>{if(n.value){if(o.width>766){n.value.style.maxHeight="",n.value.style.overflowY="";return}n.value.style.maxHeight=t.length>0?"100vh":"",n.value.style.overflowY=t.length>0?"hidden":""}},[t,o]),[()=>e([...t,0]),()=>{e(t.slice(0,t.length-1))}]}),Bi=Mn("markdown",()=>{const[t,e]=Me({});return{record:t,getEntry:o=>o in t?t[o]:(fetch(o).then(async r=>{const a=await r.text();e(s=>({...s,[o]:a}))}),"")}}),Pr=t=>{const{getEntry:e}=Bi();return e(t)},Vt=Mn("app",()=>{const[t,e]=_i("@riadh-adrani-ruvy-docs-theme",fe.Device),[n,o]=Me(!1),[r,a]=Me(ye.at(-1)),[s,i]=Ir(),l=ve(()=>t!==fe.Device?t:Rr()?fe.Dark:fe.Light,t);wt(()=>{var m;(m=document.querySelector(":root"))==null||m.setAttribute("data-theme",l);const g=document.querySelector("link[rel~='icon']");g&&(g.href=Si())},l);const u=kn(g=>{const m=g??l===fe.Dark?fe.Light:fe.Dark;e(m)},t),p=kn(g=>{const m=va(g)?g:!n;m?s():i(),o(m)},n);return{theme:t,computedTheme:l,version:r,setVersion:a,toggleNav:p,toggleTheme:u,isNavOpen:n}}),Mr=()=>{const{computedTheme:t}=Vt();return ve(()=>t===fe.Dark?Sr:_r,t)},Ii=()=>{const t=ve(()=>["```bash","npm install @riadh-adrani/ruvy","```"].join(`
`)),e=Mr();return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:"col-center flex-1"},createJsxElement("div",{class:"col-center gap-5 flex-1 p-b-20"},createJsxElement("div",{class:"col-center"},createJsxElement("img",{src:e,class:"h-150px w-150px"}),createJsxElement("h1",{class:"text-72px text-center",style:{background:"linear-gradient(var(--text-lowest),var(--text))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}},"Ruvy")),createJsxElement("p",{class:"text-center m-b-5 color-[var(--text-low)]"},"Ruvy is a lightweight front-end framework inspired by the principles of React, designed specifically for learning purposes. It incorporates familiar concepts such as JSX, function components, and hooks, providing a simplified and synchronous approach to building web applications."),createJsxElement("div",{class:"row self-center gap-4 m-b-5"},createJsxElement("a",{href:"/learn"},createJsxElement(Nt,{type:"fill"},"Get Started")),createJsxElement("a",{href:"/docs"},createJsxElement(Nt,{type:"fill"},"Browse Docs")),createJsxElement("a",{href:"https://stackblitz.com/edit/ruvy-dbjavf?file=src%2Fmain.tsx",target:"_blank"},createJsxElement(Nt,{type:"fill"},"Try on StackBlitz"))),createJsxElement("div",{class:"cursor-pointer home-create-bash rounded self-center"},createJsxElement(xt,{content:t??""}))),createJsxElement(Br,null)))},Pi=`# Introduction

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
`,Mi=[{from:"0.5.0",md:Pi}],ze=t=>{const{children:e,class:n,isActive:o}=t,r=ve(()=>{let a="p-x-2 text-[0.9em]";return o?a+=" color-[var(--link)]":a+=" color-[var(--text-low)] hover:color-[var(--text-strong)]",mr(a,n)},[n,o]);return createJsxElement("a",{...t,class:r},e)},Lr=()=>createJsxElement("div",null,createJsxElement("h1",null,"Not found"),createJsxElement(ze,{href:"/",class:"p-x-0!"},"Go back to Home page")),Ot=({versions:t})=>{const{version:e}=Vt(),n=ve(()=>{const o=ye.indexOf(e);if(o===-1)throw"invalid version";for(const r of t){if(r.from===e||r.to===e)return r.md;const a=ye.indexOf(r.from);if(r.to){const s=ye.indexOf(r.to);if(a<=o&&o<=s)return r.md}else if(a<=o)return r.md}},[e,t]);return n?createJsxElement(xt,{content:n}):createJsxElement(Lr,null)},Li=()=>createJsxElement(createJsxFragmentElement,null,createJsxElement(Ot,{versions:Mi})),Ni="data:text/markdown;base64,IyBBY2tub3dsZWRnbWVudAoKV2Ugd291bGQgbGlrZSB0byBleHByZXNzIG91ciBoZWFydGZlbHQgYXBwcmVjaWF0aW9uIHRvIHRoZSBSZWFjdCB0ZWFtIGZvciB0aGVpciBleGNlcHRpb25hbCB3b3JrIGFuZCB0aGUgaW5jcmVkaWJsZSBjb250cmlidXRpb25zIHRoZXkgaGF2ZSBtYWRlIHRvIHRoZSB3b3JsZCBvZiBmcm9udC1lbmQgZGV2ZWxvcG1lbnQuIFJlYWN0IGhhcyBiZWVuIGFuIGltbWVuc2Ugc291cmNlIG9mIGluc3BpcmF0aW9uIGZvciBvdXIgZnJhbWV3b3JrLCBhbmQgd2UgYWNrbm93bGVkZ2UgdGhlIHNpZ25pZmljYW50IGltcGFjdCBpdCBoYXMgaGFkIG9uIHNoYXBpbmcgdGhlIHdlYiBkZXZlbG9wbWVudCBsYW5kc2NhcGUuCgo8YnIvPgoKV2Ugd291bGQgYWxzbyBsaWtlIHRvIGV4dGVuZCBvdXIgZ3JhdGl0dWRlIHRvIENoYXQgR1BULCB0aGUgcG93ZXJmdWwgbGFuZ3VhZ2UgbW9kZWwgdGhhdCBoYXMgYmVlbiBhbiBpbnZhbHVhYmxlIGNvbXBhbmlvbiB0aHJvdWdob3V0IHRoZSBzZWFyY2ggcHJvY2VzcyBhbmQgdGhlIGNyZWF0aW9uIG9mIHRoaXMgZG9jdW1lbnRhdGlvbi4gSXRzIHJlbWFya2FibGUgY2FwYWJpbGl0aWVzIGhhdmUgZ3JlYXRseSBhc3Npc3RlZCB1cyBpbiBwcm92aWRpbmcgYWNjdXJhdGUgYW5kIGhlbHBmdWwgaW5mb3JtYXRpb24gdG8gb3VyIHVzZXJzLgoKPGJyLz4KCkZ1cnRoZXJtb3JlLCB3ZSB3b3VsZCBsaWtlIHRvIHRoYW5rIHRoZSBlbnRpcmUgd2ViIGNvbW11bml0eSBmb3IgdGhlaXIgY29udGludW91cyBkZWRpY2F0aW9uIHRvIGltcHJvdmluZyB0aGUgdG9vbHMgYW5kIHRlY2hub2xvZ2llcyB0aGF0IGRyaXZlIHRoZSB3ZWIgZm9yd2FyZC4gVGhlIGNvbGxlY3RpdmUgZWZmb3J0IGFuZCBwYXNzaW9uIHdpdGhpbiB0aGUgY29tbXVuaXR5IGhhdmUgZm9zdGVyZWQgYW4gZW52aXJvbm1lbnQgb2YgY29sbGFib3JhdGlvbiwgaW5ub3ZhdGlvbiwgYW5kIHRoZSBwdXJzdWl0IG9mIGV4Y2VsbGVuY2UuCgo8YnIvPgoKSXQgaXMgdGhyb3VnaCB0aGUgY29sbGFib3JhdGlvbiBhbmQgZGVkaWNhdGlvbiBvZiB0aGVzZSBpbmRpdmlkdWFscyBhbmQgdGVhbXMgdGhhdCB3ZSBoYXZlIGJlZW4gYWJsZSB0byBjcmVhdGUgb3VyIGZyYW1ld29yayBhbmQgcHJvdmlkZSBkZXZlbG9wZXJzIGxpa2UgeW91IHdpdGggYSBwb3dlcmZ1bCBhbmQgaW50dWl0aXZlIHRvb2xzZXQgZm9yIGJ1aWxkaW5nIGV4Y2VwdGlvbmFsIHdlYiBhcHBsaWNhdGlvbnMuIFdlIGFyZSBncmF0ZWZ1bCBmb3IgdGhlaXIgb25nb2luZyBjb250cmlidXRpb25zIGFuZCB0aGUgcG9zaXRpdmUgaW1wYWN0IHRoZXkgaGF2ZSBoYWQgb24gb3VyIGpvdXJuZXkuCgo8YnIvPgoKVGhhbmsgeW91IGFsbCBmb3IgeW91ciBpbnNwaXJpbmcgd29yaywgdW53YXZlcmluZyBzdXBwb3J0LCBhbmQgY29tbWl0bWVudCB0byBwdXNoaW5nIHRoZSBib3VuZGFyaWVzIG9mIHdoYXQgaXMgcG9zc2libGUgaW4gd2ViIGRldmVsb3BtZW50Lgo=",Oi=()=>{const t=Pr(Ni);return createJsxElement(createJsxFragmentElement,null,createJsxElement(xt,{content:t}))},Ui="data:text/markdown;base64,IyBNYWRlIHdpdGggUnV2eQoKIyMjIGBVbmRlciBjb25zdHJ1Y3Rpb24uLi5gCg==",$i=()=>{const t=Pr(Ui);return createJsxElement(createJsxFragmentElement,null,createJsxElement(xt,{content:t}))},zi=`# Types

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
`,$o=`# replace

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
`,zo=`# batch

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
`,Hi=`# createStore

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
`,ji=`# createRouter

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
`,Ji=`# createRouter

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
`,Wi=[{from:"0.5.0",to:"0.5.0",md:ji},{from:"0.5.2",md:Ji}],Gi=`# createComposable

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
`,qi=[{from:"0.5.2",md:Gi}],Zi=`# createContext

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
`,Yi=`# createContext

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
`,Xi=[{from:"0.5.0",to:"0.5.0",md:Zi},{from:"0.5.2",md:Yi}],Vi=`# mountApp

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
`,Qi=`# mountApp

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
`,Ki=[{from:"0.5.0",to:"0.5.0",md:Vi},{from:"0.5.2",md:Qi}],el=`# useState

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
`,tl=`# useState

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
`,nl=[{from:"0.5.0",to:"0.5.0",md:el},{from:"0.5.2",md:tl}],ol=`# useEffect

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
`,rl=`# useEffect

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
`,al=[{from:"0.5.0",to:"0.5.0",md:ol},{from:"0.5.2",md:rl}],sl=`# useMemo

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
`,il=`# useMemo

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
`,ll=[{from:"0.5.0",to:"0.5.0",md:sl},{from:"0.5.2",md:il}],ul=`# useCallback

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
`,cl=`# useCallback

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
`,dl=[{from:"0.5.0",to:"0.5.0",md:ul},{from:"0.5.2",md:cl}],hl=`# useId

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
`,pl=`# useId

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
`,ml=[{from:"0.5.0",to:"0.5.0",md:hl},{from:"0.5.2",md:pl}],fl=`# useContext

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
`,gl=`# useContext

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
`,bl=[{from:"0.5.0",to:"0.5.0",md:fl},{from:"0.5.2",md:gl}],yl=`# useComposable

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
`,vl=[{from:"0.5.2",md:yl}],wl=`# getParams

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
`,xl=`# getParams

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
`,kl=[{from:"0.5.0",to:"0.5.0",md:xl},{from:"0.5.2",md:wl}],Dl=`# getSearchParams

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
`,El=`# getSearchParams

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
`,Fl=[{from:"0.5.0",to:"0.5.0",md:El},{from:"0.5.2",md:Dl}],Cl=`# getPathname

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
`,Al=`# getPathname

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
`,Tl=[{from:"0.5.0",to:"0.5.0",md:Al},{from:"0.5.2",md:Cl}],Sl=`# navigate

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
`,_l='# navigate\n\n`navigate` lets you navigate programmatically between routes.\n\n<hr/>\n\n### Type & Parameters\n\n```ts\nfunction navigate(request: DestinationRequest, options?: DestinationOptions): void;\n```\n\nAccepts two arguments, with the second one being optional :\n\n- `request` : could be one of the following :\n  - `string` : path string like `/ruvy`.\n  - `number` : relative navigation like `-1` which will go back by one entry, or `1` which will go forward by one entry.\n  - `object` : describing a named destination having the following keys :\n    - `name` : path name as provided in the router.\n    - `query` (optional) : a record of string or number that will be used to build query params.\n    - `params` (optional) : a record containing parameters of a dynamic route.\n    - `hash` (optional) : a string targeting an element id.\n- `options` (optional) : additional options :\n  - `replace` (optional) : a boolean indicating if the router should replace the current state or push a new one.\n\n<hr/>\n\n### Notes ⚠️\n\n- `navigate` pushes a new entry to the `history` object by default.\n- `replace` is removed in version `0.5.1`, instead, use `navigate` with the `replace` option set to `true`.\n\n<hr/>\n\n### Example\n\n<iframe src="https://stackblitz.com/edit/ruvy-q9bibe?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>\n',Rl=[{from:"0.5.0",to:"0.5.0",md:Sl},{from:"0.5.2",md:_l}],Bl=`# Outlet

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
`,Il=`# Outlet

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
`,Pl=[{from:"0.5.0",to:"0.5.0",md:Bl},{from:"0.5.2",md:Il}],Ml=`# Fragment

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
`,Ll=`# Fragment

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
`,Nl=[{from:"0.5.0",to:"0.5.0",md:Ml},{from:"0.5.2",md:Ll}],Ol=`# Portal

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
`,Ul=`# Portal

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
`,$l=[{from:"0.5.0",to:"0.5.0",md:Ol},{from:"0.5.2",md:Ul}],zl=`# ErrorBoundary

\`<ErrorBoundary/>\` is a component that let's catch unexpected errors without causing the app to crash

<hr/>

### Type & Parameters

\`\`\`ts
type ErrorEffectHandler = (error: unknown, recover: () => void) => void;

type ErrorBoundaryProps = {
  fallback?: RuvyNode;
  errorEffect?: ErrorEffectHandler;
};

function ErrorBoundary(props: PropsWithUtility<ErrorBoundaryProps>): JSX.Element;
\`\`\`

<hr/>

### Example

\`\`\`ts
import { ErrorBoundary } from '@riadh-adrani/ruvy';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ComponentWithError />
      </ErrorBoundary>
    </>
  );
}
\`\`\`
`,Hl=[{from:"0.5.7",md:zl}],jl=`# useErrorBoundary

\`useErrorBoundary\` is a hook that lets you retrieve the caught \`error\` and allow \`recovery\` within the \`fallback\` component.

<hr/>

### Type & Parameters

\`\`\`ts
type UseErrorBoundary = [Error | string, () => void];

function useErrorBoundary(): UseErrorBoundary;
\`\`\`

<br/>

### Returns

returns an array of two elements:

- \`error\` : contain the thrown error
- \`recover\` : a function that will attempt to recover from the error.

<br/>

### Notes ⚠️

- Throws if called outside of the fallback component.
- Throws if called from a composable.

<hr/>

### Example

<iframe src="https://stackblitz.com/edit/ruvy-a3desu?embed=1&file=src%2Fmain.tsx&hideExplorer=1&hideNavigation=1" class="stackblitz"></iframe>
`,Jl=[{from:"0.5.7",md:jl}],Wl=`# API

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
`,Gl=`# API

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
`,ql=`# API

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
- [\`useErrorBoundary\`](/docs/api/useErrorBoundary)

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
- [\`<ErrorBoundary/>\`](/docs/api/error-boundary)
`,Zl=[{from:"0.5.0",to:"0.5.0",md:Wl},{from:"0.5.2",to:"0.5.6",md:Gl},{from:"0.5.7",md:ql}],Yl=`# Beyond React: Exploring Additional Features and Differences

In this section, we go beyond the realm of \`React\` and delve into the unique features and differentiating factors of our framework. While our framework draws inspiration from \`React\`, it also brings its own set of innovative functionalities and approaches to front-end development. Here, you will discover additional features that enrich your development experience, allowing you to tackle complex challenges with ease. We also highlight the key differences between our framework and React, providing insights into how our approach may diverge or enhance certain aspects of application development. Join us on this exploration as we showcase the unique capabilities that set our framework apart and empower you to create exceptional web applications.

---

Here is the list of differences and additional features :

<br/>

- [\`class attribute\`](/docs/more/class-attribute)
- [\`joinClasses()\`](/docs/more/joinClasses)
- [\`if directives\`](/docs/more/if-directive)
- [\`switch directives\`](/docs/more/switch-directive)
`,Xl=[{from:"0.5.0",md:Yl}],Vl=`# Class attribute

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
`,Ql="# Class attribute\n\nIn our framework, we have adopted the use of the `class` attribute instead of `className`, as commonly used in `React`. This decision was made to streamline the styling process and provide a more intuitive experience for developers. By using the familiar `class` attribute, you can leverage the power of CSS classes directly, without the need for additional JSX transformations. This not only simplifies the syntax but also allows you to seamlessly apply multiple classes to an element by providing either a `string` or an `array of strings` as the value of the class attribute. This flexibility empowers you to organize and manage your styles more efficiently, making it easier to achieve the desired look and feel for your components. Embracing the class attribute in our framework provides a smooth transition for developers familiar with traditional HTML and CSS practices, enhancing productivity and promoting code clarity.\n\n---\n\n### `class`\n\nusing `class` instead of `className`:\n\n<br/>\n\n```ts\n<div class=\"better\">Nice</div>\n```\n\n### `className`\n\nWhile it is better to use `class` attribute, we made the decision that keeping `className` will make the `developer experience` lenient for react dev.\n\n<br/>\n\n```ts\n<div className=\"the-react-way\">Nice</div>\n```\n\n### `Arrayable`\n\nOrganize your classes:\n\n<br/>\n\n```ts\n<div class={['better', 'way', 'for', 'css', 'classes']}>Nice</div>\n```\n\n### `class:* directive`\n\nYou can also conditionally add classes with the `class:*` directive.\n\n<br/>\n\n```ts\nconst isActive = withinUrl();\n\n<div class:active={isActive}>Nice</div>;\n```\n\n## Using them all at once ?\n\nYes, you can use all of the above in the same component, but they will be applied in this order : `class` + `className` + `class:*`\n\n<br/>\n\n```ts\n<div class:active class=\"ruvy\" className={'react'} />\n// same as 👇\n<div class=\"ruvy react active\"/>\n```\n",Kl=[{from:"0.5.0",to:"0.5.0",md:Vl},{from:"0.5.2",md:Ql}],eu="# joinClasses\n\n`joinClasses` is a function that filters and join classes of different types.\n\n<hr/>\n\n### Type & Parameters\n\n```ts\nfunction joinClasses(...classes: Arrayable<string | undefined | null>): string;\n```\n\nAccepts `Arrayable` arguments of type `string`, `undefined` or `null`.\n\n<hr/>\n\n### Notes ⚠️\n\n- Eleminate `falsy` values like `undefined`, `null` or `false`.\n\n<hr/>\n\n### Example\n\n```ts\njoinClasses('join', 'classes'); // 👉 `join classes`\n\njoinClasses(['join'], 'classes'); // 👉 `join classes`\n\njoinClasses(['join'], undefined, 'classes', null); // 👉 `join classes`\n```\n",tu=[{from:"0.5.0",md:eu}],nu=`# \`if\` directive

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
`,ou=[{from:"0.5.0",md:nu}],ru=`# \`switch\` directive

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
`,au=[{from:"0.5.0",md:ru}],su=`# Event modifiers

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
`,iu=`# Event modifiers

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
`,lu=[{from:"0.5.0",to:"0.5.0",md:su},{from:"0.5.2",md:iu}],uu=[{path:"/mountApp",versions:Ki,title:"mountApp"},{path:"/createRouter",versions:Wi,title:"createRouter"},{path:"/createStore",versions:[{from:"0.5.0",to:"0.5.0",md:Hi}],title:"createStore"},{path:"/createComposable",versions:qi,title:"createComposable"},{path:"/useState",versions:nl,title:"useState"},{path:"/useEffect",versions:al,title:"useEffect"},{path:"/useMemo",versions:ll,title:"useMemo"},{path:"/useCallback",versions:dl,title:"useCallback"},{path:"/useContext",versions:bl,title:"useContext"},{path:"/useComposable",versions:vl,title:"useComposable"},{path:"/useId",versions:ml,title:"useId"},{path:"/useErrorBoundary",versions:Jl,title:"useErrorBoundary"},{path:"/createContext",versions:Xi,title:"createContext"},{path:"/getParams",versions:kl,title:"getParams"},{path:"/getSearchParams",versions:Fl,title:"getSearchParams"},{path:"/getPathname",versions:Tl,title:"getPathname"},{path:"/replace",versions:[{from:"0.5.0",to:"0.5.0",md:$o}],element:$o,title:"replace"},{path:"/navigate",versions:Rl,title:"navigate"},{path:"/batch",versions:[{from:"0.5.0",to:"0.5.0",md:zo}],element:zo,title:"batch"},{path:"/outlet",versions:Pl,title:"<Outlet/>"},{path:"/fragment",versions:Nl,title:"<Fragment/>"},{path:"/portal",versions:$l,title:"<Portal/>"},{path:"/error-boundary",versions:Hl,title:"<ErrorBoundary/>"}],cu=[{path:"/class-attribute",versions:Kl,title:"Class attribute"},{path:"/joinClasses",versions:tu,title:"joinClasses"},{path:"/if-directive",versions:ou,title:"if directives"},{path:"/switch-directive",versions:au,title:"switch directives"},{path:"/event-modifiers",versions:lu,title:"Event modifiers"}],Ho=[{path:"/api",title:"API",children:uu,versions:Zl},{path:"/more",title:"More",children:cu,versions:Xl},{path:"/types",title:"Types",children:[],versions:[{from:"0.5.0",md:zi}]}],du=`# Tutorial : Todo

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
`,hu=[{from:"0.5.0",md:du}],pu=`# Learn

Welcome to this section of the documentation! We will try to make you comfortable using \`Ruvy\`, we will be emulating the new \`React\` documentation, because it is well written, and we have at least 80% in common.

<br/>

- [\`Quick Start\`](/learn/quick-start)
- [\`Setup\`](/learn/setup)
- [\`Tutorial: Todo\`](/learn/tutorial-todo)

<br/>

You can also dive deep into the [\`docs\`](/docs).
`,mu=[{from:"0.5.0",md:pu}],fu=`# Quick Start

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
`,gu=`# Quick Start

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
`,bu=[{from:"0.5.0",to:"0.5.0",md:fu},{from:"0.5.2",md:gu}],yu=`# Setup a new Project

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
`,vu=[{from:"0.5.0",md:yu}],jo=[{path:"",versions:mu},{path:"/quick-start",versions:bu,title:"Quick Start"},{path:"/setup",versions:vu,title:"Setup"},{path:"/tutorial-todo",versions:hu,title:"Tutorial : Todo"}],Jo=t=>createJsxElement("label",{...t,class:"switch rounded scale-55 u-border"},createJsxElement("input",{checked:t.checked,type:"checkbox","class:switch-input":!0}),createJsxElement("span",{class:"switch-slider rounded before:rounded"})),wu=()=>{const{computedTheme:t,toggleTheme:e,isNavOpen:n,toggleNav:o,version:r,setVersion:a}=Vt(),s=Mr(),i=ve(()=>[{title:"Learn",href:"/learn"},{title:"Docs",href:"/docs"},{title:"Changelogs",href:"/changelogs"},{title:"Examples",href:"/examples"},{title:"Acknowledgment",href:"/acknowledgment"}]),l=ve(()=>[{title:"GitHub",href:"https://github.com/RiadhAdrani/ruvy"}]);return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:["row-center","w-100%","bg-[color:var(--primary)]","p-x-5","h-[var(--nav-bar-height)]","border-b border-b-1px border-b-solid border-[color:var(--border-low)]","fixed top-0px z-[var(--nav-bar-z)]"]},createJsxElement("div",{class:"row justify-between items-center max-w-1200px flex-1 z-2"},createJsxElement("div",{class:"row items-center gap-8"},createJsxElement("a",{href:{name:"Home"},class:"p-x-1 row-center gap-3"},createJsxElement("img",{src:s,class:"h-25px w-25px"}),createJsxElement("h2",{class:"hidden md:inline-block"},"Ruvy")),createJsxElement("div",{class:"row hidden md:flex gap-1"},i.map(u=>createJsxElement(ze,{href:u.href,target:"_blank",isActive:Wt(u.href)},u.title)))),createJsxElement("div",{class:"row hidden gap-3 md:flex items-center"},createJsxElement("div",{class:"row gap-1"},l.map(u=>createJsxElement(ze,{href:u.href,target:"_blank"},u.title))),createJsxElement("select",{onChange:u=>a(u.currentTarget.value),class:"py-0.5 px-1 border-[var(--border)] bg-[var(--secondary)] text-inherit"},ye.toReversed().map(u=>createJsxElement("option",{class:"p-y-0.5",key:u,selected:r===u,value:u},createJsxElement("div",null,"v",u)," ",createJsxElement("div",{class:"m-l-2",if:u===ye.at(-1)},"@latest")))),createJsxElement(Jo,{checked:t===fe.Dark,onChange:()=>e()})),createJsxElement("div",{class:"col md:hidden"},createJsxElement(Nt,{type:"text",class:["nav-bar-mobile-btn col-center",n?"nav-bar-mobile-btn-expanded":""],onClick:()=>o()})))),createJsxElement("div",{class:["col md:hidden",n?"top-[var(--nav-bar-height)] opacity-100":"-top-100vh opacity-0","fixed left-0px right-0px","bg-[color:var(--primary)]","overflow-y-auto","duration-[var(--t-long)]","p-5","z-1"],style:{height:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:["col gap-3 p-y-5","border-b border-b-solid border-b-1px border-[color:var(--border-low)]"]},i.map(u=>createJsxElement(ze,{href:u.href,class:"",target:"_blank",isActive:Wt(u.href),onClick:()=>o(!1)},u.title))),createJsxElement("div",{class:["col gap-3 p-y-5","border-b border-b-solid border-b-1px border-[color:var(--border-low)]"]},l.map(u=>createJsxElement(ze,{href:u.href,target:"_blank"},u.title))),createJsxElement("div",{class:"row items-center justify-between p-t-5"},createJsxElement("p",{class:"p-x-2"},"Version"),createJsxElement("select",{onChange:u=>a(u.target.value),class:"p-1"},ye.map(u=>createJsxElement("option",{class:"p-y-1",key:u,selected:r===u,value:u},createJsxElement("div",null,"v",u)," ",createJsxElement("div",{class:"m-l-2",if:u===ye.at(-1)},"@latest"))))),createJsxElement("div",{class:"row items-center justify-between p-y-5 text-[var(--text-low)]"},createJsxElement("p",{class:"p-x-2"},"Theme"),createJsxElement(Jo,{checked:t===fe.Dark,onChange:()=>e()})),createJsxElement(Br,null)))},Cn=t=>{var i;const{item:e,root:n,onClick:o}=t,[r,a]=Me(!1),s=kn(()=>a(!r),r);return createJsxElement(createJsxFragmentElement,null,e.children?createJsxElement("details",{open:r},createJsxElement("summary",{onClick:s},createJsxElement(ze,{...t,href:`${n}${e.path}`,isActive:Wt(`${n}${e.path}`),onClick:o,class:"m-y-2"},e.title)),createJsxElement("div",{class:"m-l-2 col border-l-solid  border-l-1px border-l-[color:var(--border)]"},(i=e.children)==null?void 0:i.map(l=>createJsxElement(Cn,{item:{...l,path:`${e.path}${l.path}`},root:n,onClick:o},l.title)))):createJsxElement(ze,{...t,href:`${n}${e.path}`,isActive:Wt(`${n}${e.path}`),onClick:o,class:"m-l-18px m-y-1"},e.title))},xu=({items:t,root:e})=>{const[n,o]=Me(!1),[r,a]=Ir(),s=()=>{const l=!n;o(l),l?r():a()},i=()=>{o(!1),a()};return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:["fixed top-[var(--nav-bar-height)]","w-[var(--side-bar-width)]","bg-[var(--primary)]","border-r border-r-solid border-r-[color:var(--border-low)]","overflow-hidden","hidden md:flex md:col"],style:{height:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:"col gap-2 overflow-auto p-y-10 w-[var(--side-bar-width)]",style:{height:"calc(100vh - var(--nav-bar-height))"}},t.map(l=>createJsxElement(Cn,{item:l,root:e})))),createJsxElement("div",{class:"col md:hidden fixed right-0 left-0 top-[var(--nav-bar-height)] w-100%"},createJsxElement("p",{class:["text-[var(--text-low)] hover:text-[var(--text)]","p-y-1.5 w-100% cursor-pointer bg-[var(--primary)]","border-b p-x-6 border-b-solid border-b-[color:var(--border-low)]","h-[var(--side-bar-height)]"],onClick:()=>s()},"Menu"),createJsxElement("div",{class:["bg-[var(--primary)] fixed w-100% overflow-hidden",n?"bottom-0px opacity-100":"-bottom-100vh opacity-0"],style:{height:"calc(100vh - var(--nav-bar-height) - var(--side-bar-height))"}},createJsxElement("div",{class:"col gap-2 overflow-auto p-t-5 p-x-5",style:{height:"calc(100vh - var(--nav-bar-height) - var(--side-bar-height))"}},t.map(l=>createJsxElement(Cn,{item:l,root:e,onClick:i}))))))},Nr=(t,e)=>t.reduce((n,o)=>{const r=ye.indexOf(e);if(o.versions.some(s=>{if(s.from===e||s.to===e)return!0;const i=ye.indexOf(s.from);if(s.to){const l=ye.indexOf(s.to);if(i<=r&&r<=l)return!0}else if(i<=r)return!0;return!1})){const s=o.children?Nr(o.children,e):void 0,i={...o,children:s};n.push(i)}return n},[]),Wo=({rootURL:t,sideBarItems:e})=>{const{version:n}=Vt(),o=ve(()=>Nr(e,n),[e,n]);return createJsxElement(createJsxFragmentElement,null,createJsxElement(xu,{items:o,root:t}),createJsxElement("div",{class:["row overflow-x-none flex-1 justify-stretch self-stretch","m-l-0 md:m-l-[var(--side-bar-width)]","p-l-0 md:p-l-10"]},createJsxElement(gt,null)))},ku=`# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- add \`useUnmount\` hook that let you execute a callback when a component is unmounted.

## 0.5.9 - 2024-03-31

### Fixed

- fix tsconfig.

## 0.5.8 - 2024-03-31

### Fixed

- fix bad dom types export.

## 0.5.7 - 2024-03-31

### Added

- add \`<ErrorBoundary/>\` component to catch unexpected errors.
- add \`useErrorBoundary\` hook that can be used within the fallback of an \`<ErrorBoundary/>\` component to get \`error\` or attempt \`recovery\`.

## 0.5.6 - 2024-03-11

### Changed

- reworked typing.

## 0.5.5 - 2024-02-04

### Fixed

- bump \`@riadh-adrani/dom-router\` version.

## 0.5.4 - 2024-02-02

### Fixed

- export missing \`getParams\` from router.

## 0.5.3 - 2024-01-28

### Fixed

- bump \`@riadh-adrani/domer\` version.
- bump \`@riadh-adrani/dom-router\` version.

## 0.5.2 - 2024-01-14

### Fixed

- fixed \`createDestination\` throwing when used without a router.

## 0.5.1 - 2024-01-14

### Added

- \`createComposable\` create a global hook that can be accessed from anywhere in the tree.
- \`useComposable\` retrieve a named \`composable\`.
- \`unmountApp\` used to unmount the current app instance.
- \`unmountRouter\` used to unmount the current router instance.
- \`createDestination\` create a valid url using a destination request.

### Changed

- remake the framework from scratch and changed its architecture to be more expandable and dynamic.
- switched to \`@riadh-adrani/domer\` instead of \`@riadh-adrani/dom-utils\` for DOM manipulations.
- switched to \`@riadh-adrani/dom-router\` as the base of the routing system.
- \`navigate\` now accepts a second parameter \`DestinationOptions\`.

### Removed

- \`createStore\` is removed, replaced by \`createComposable\`.
- \`batch\` no longer useful during to framework architectural change.
- \`replace\` removed, you can set \`DestinationOptions.replace\` to \`true\` instead.

## 0.5.0 - 2023-10-03

### Removed

- removed experimental hooks \`useReactive\` and \`usePromise\`.

## 0.4.14 - 2023-09-09

### Changed

- optimized \`actions\` by collecting them while traversing the tree.

## 0.4.13 - 2023-09-02

### Added

- \`dom:focused\` attribute that will try to focus the element when created, ignored after the first render.

### Changed

- \`innerHTML\` to \`dom:innerHTML\` to indicate it's framework-specific.

### Fixed

- changing unmounted element position causes the app to crash.

## 0.4.12 - 2023-08-17

### Added

- named \`<Fragment/>\` component.

### Changed

- \`class\` attributes now accepts arrayables of \`boolean\`, \`undefied\` or \`null\`.

## 0.4.11 - 2023-08-13

### Fixed

- children not correctly reordered in some edge cases.
- allow the use of event modifiers without an actual function value

## 0.4.10 - 2023-08-10

### Added

- \`dom:tag\` to make html element tag dynamic.

### Fixed

- \`<Portal/>\` element not properly changing containers.

## 0.4.9 - 2023-08-04

### Added

- \`innerHTML\` attribute that allow direct setting of an HTMLElement innerHTML prop.
- add event modifiers like \`Vue.js\`, in this form \`onEvent:prevent\`, \`onEvent:stop\` or both \`onEvent:prevent-stop\`.

## 0.4.8 - 2023-07-30

## 0.4.7 - 2023-07-30

## 0.4.6 - 2023-07-24

### Removed

- removed all \`deprecated\` functions and classes.

### Fixed

- \`anchor\` element not working as intended

## 0.4.5 - 2023-07-19

### Added

- \`name\` route property, similar to \`vue-router\`.
- \`titleTransform\` handler to preprocess the title before applying it.
- \`createStore\` similar to \`writable\` store in \`svelte\`

### Changed

- \`navigate\` now accepts a number or an object for a \`named\` route.

### Deprecated

- \`useKey\` is now replaced with \`createStore\`.
- \`Store\` as it is becoming useless.

## 0.4.4 - 2023-07-06

### Added

- Add \`switch\`, \`case\` and \`case:default\` directives.
- Attach host \`Branch\` object to dom node.
- \`ref\` typing.

### Changed

- \`useState\` accepts an initilizer function, and a setter callback.
- improved project structure.
- improved typing.

## 0.4.3 - 2023-07-01

### Changed

- refactored project structure for a smaller bundle size.

## 0.4.2 - 2023-06-28

## 0.4.1 - 2023-06-28

### Added

- \`else\` and \`else-if\` directives that goes with \`if\` directive, similar to \`vue.js\`

### Changed

- improve \`JSX.Element\`s typing
- better \`svg\` elements typing

## 0.4.0 - 2023-06-25

### Added

- \`if\` directive which accepts a boolean to determine if a component should be rendered or not.
- \`PropWithUtility\` that allow the developer to initialize a prop type with optional \`children\`, \`key\` and \`if\` properties.
- \`getPathname\` returns the current url without the \`base\`.

### Changed

- \`useReactive\` uses \`@riadh-adrani/utils/createReactive\` to create reactive object instances.
- \`mountRouter\` config is now optional.
- deperecated \`getRoute\` in favor of \`getPathname\`.

## 0.3.0 - 2023-06-22

### Added

- \`useContext\`, same as \`react.js\`.
- \`useReactive\`, similar to \`vue.js\`'s \`reactive\`.
- \`usePromise\`, a hook that allows the user to fetch data while tracking the request state and return value.
- \`joinClasses\`, a utility function that filter and returns a valid className as a string.
- \`getSearchQuery\`, a function that returns the search params of the current route as a typed object.
- \`getRoute\`, a function that returns the current url without the \`base\`.
- added \`SVG\` elements with shallow typing.
- creation of the docs website.
- add \`titleSuffix\` and \`titlePrefix\` as optional params in \`RouterParams\`.
- add \`<Portal/>\` component, allowing to teleport elements in another DOM container.

### Fixed

- \`scrollToTop\` not having any effect, when a new page is loaded.

## 0.2.0 - 2023-06-02

### Added

- JSX syntax for writing expressive and reusable UI components.
- Function components for a modular and composable code structure.
- Hooks for managing state, performing side effects, and custom logic reuse: \`useState\`, \`useEffect\`, \`useMemo\`, \`useCallback\`, \`useId\` and \`useRef\`.
- Synchronous rendering for a straightforward and beginner-friendly development experience.
- Intuitive API that closely resembles React's patterns and conventions.
- SPA Router.
- key-value Store.
`,Du=()=>createJsxElement(xt,{content:ku}),Eu=[{path:"/",element:createJsxElement(createJsxFragmentElement,null,createJsxElement(wu,null),createJsxElement("div",{class:"w-100% overflow-x-hidden row-center p-x-6 m-t-[var(--nav-bar-height)]",style:{minHeight:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:"col max-w-1200px flex-1 self-stretch overflow-x-hidden p-y-12 md:p-y-10"},createJsxElement(gt,null)))),children:[{path:"/*",element:createJsxElement(Lr,null)},{path:"",title:"Home",element:createJsxElement(Ii,null),name:"Home"},{path:"/changelogs",title:"Changelogs",element:createJsxElement(Du,null),name:"ChangeLogs"},{path:"/acknowledgment",title:"Acknowledgment",element:createJsxElement(Oi,null)},{path:"/examples",title:"Examples",element:createJsxElement($i,null)},{path:"/learn",title:"Learn",element:createJsxElement(Wo,{rootURL:"/learn",sideBarItems:jo}),children:jo.map(t=>({title:t.title,path:t.path,element:createJsxElement(Ot,{versions:t.versions})}))},{path:"/docs",title:"Docs",element:createJsxElement(Wo,{rootURL:"/docs",sideBarItems:Ho}),children:[{path:"",element:createJsxElement(Li,null)},...Ho.map(t=>({path:t.path,title:t.title,element:createJsxElement(gt,null),children:[{path:"",element:createJsxElement(Ot,{versions:t.versions})},...t.children.map(e=>({path:e.path,title:e.title,element:createJsxElement(Ot,{versions:e.versions})}))]}))]}]}];ts({routes:Eu,base:"/ruvy",transformTitle:t=>`${t} - Ruvy`,correctScrolling:!0});za({app:createJsxElement(Ms,null),host:document.querySelector("#app")});
