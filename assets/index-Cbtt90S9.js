var Ro=Object.defineProperty;var Bo=(n,e,t)=>e in n?Ro(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Jn=(n,e,t)=>(Bo(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const _o=/[\p{Lu}]/u,Io=/[\p{Ll}]/u,Wn=/^[\p{Lu}](?![\p{Lu}])/gu,Rr=/([\p{Alpha}\p{N}_]|$)/u,fn=/[_.\- ]+/,Po=new RegExp("^"+fn.source),Gn=new RegExp(fn.source+Rr.source,"gu"),jn=new RegExp("\\d+"+Rr.source,"gu"),Mo=(n,e,t,r)=>{let o=!1,a=!1,i=!1,s=!1;for(let l=0;l<n.length;l++){const c=n[l];s=l>2?n[l-3]==="-":!0,o&&_o.test(c)?(n=n.slice(0,l)+"-"+n.slice(l),o=!1,i=a,a=!0,l++):a&&i&&Io.test(c)&&(!s||r)?(n=n.slice(0,l-1)+"-"+n.slice(l-1),i=a,a=!1,o=!0):(o=e(c)===c&&t(c)!==c,i=a,a=t(c)===c&&e(c)!==c)}return n},Lo=(n,e)=>(Wn.lastIndex=0,n.replace(Wn,t=>e(t))),No=(n,e)=>(Gn.lastIndex=0,jn.lastIndex=0,n.replace(Gn,(t,r)=>e(r)).replace(jn,t=>e(t)));function Oo(n,e){if(!(typeof n=="string"||Array.isArray(n)))throw new TypeError("Expected the input to be `string | string[]`");if(e={pascalCase:!1,preserveConsecutiveUppercase:!1,...e},Array.isArray(n)?n=n.map(a=>a.trim()).filter(a=>a.length).join("-"):n=n.trim(),n.length===0)return"";const t=e.locale===!1?a=>a.toLowerCase():a=>a.toLocaleLowerCase(e.locale),r=e.locale===!1?a=>a.toUpperCase():a=>a.toLocaleUpperCase(e.locale);return n.length===1?fn.test(n)?"":e.pascalCase?r(n):t(n):(n!==t(n)&&(n=Mo(n,t,r,e.preserveConsecutiveUppercase)),n=n.replace(Po,""),n=e.preserveConsecutiveUppercase?Lo(n,t):t(n),e.pascalCase&&(n=r(n.charAt(0))+n.slice(1)),No(n,r))}const Uo=n=>Array.isArray(n),$o=n=>n===null,zo=n=>["string","number","bigint","boolean","undefined","symbol","null"].includes(typeof n),Br=(n,e)=>zo(n)||$o(n)?!1:Object.prototype.hasOwnProperty.call(n,e);var at;(function(n){n.SVG="http://www.w3.org/2000/svg",n.HTML="http://www.w3.org/1999/xhtml",n.MATH="http://www.w3.org/1998/Math/MathML"})(at||(at={}));const Ho=["stop","prevent","self","capture","once","passive"];let Te={};const Jo=["ns"],xt="class:",Wo=(n={})=>{Te=n},Go=(n,e={},t=[])=>{const r=e.ns??at.HTML,o=document.createElementNS(r,n);o.__events__={};const a=[];for(const i of Object.keys(e)){if(Jo.includes(i))continue;const s=e[i];if(Pr(i)){a.push({key:i,value:s});continue}const l=Mr(i);if(l){const{event:c,modifiers:h}=l;Lr(i,c,s,o,h);continue}an(i,s,o)}if(a.length>0){const i=Ir(a);an("class",i,o)}return t.forEach(i=>{const s=i instanceof Node?i:_r(i);o.appendChild(s)}),o},_r=(n="")=>document.createTextNode(`${n}`),Ir=n=>[...n.filter(t=>t.key==="class"),...n.filter(t=>t.key==="className"),...n.filter(t=>t.key.startsWith(xt))].reduce((t,r)=>(r.key.startsWith(xt)&&r.value?t.push(r.key.substring(xt.length)):Uo(r.value)?t.push(r.value.filter(o=>!!o).join(" ")):typeof r.value=="string"&&t.push(r.value),t),[]).join(" "),Pr=n=>{var e,t,r,o;return!!(n==="class"||n==="className"&&!((t=(e=Te.attributes)==null?void 0:e.class)!=null&&t.className)||n.startsWith(xt)&&((o=(r=Te.attributes)==null?void 0:r.class)==null?void 0:o.directive)!==!1)},jo=/@[a-zA-Z][a-zA-Z0-9\-:]*/,Zo=/on[a-zA-Z][a-zA-Z0-9\-:]*/,Yo=/on:[a-zA-Z][a-zA-Z0-9\-:]*/,Mr=n=>{var a,i,s,l,c,h;let e;if(jo.test(n)&&((i=(a=Te.events)==null?void 0:a.syntax)==null?void 0:i.vue)!==!1)e=n.substring(1);else if(Zo.test(n)&&((l=(s=Te.events)==null?void 0:s.syntax)==null?void 0:l.react)!==!1)e=n.substring(2);else if(Yo.test(n)&&((h=(c=Te.events)==null?void 0:c.syntax)==null?void 0:h.svelte)!==!1)e=n.substring(3);else return!1;const t=e.indexOf(":");if(t===-1)return{event:e.toLowerCase(),modifiers:[]};const r=e.substring(0,t).toLowerCase(),o=e.substring(t+1).split("-").reduce((f,m)=>(Ho.includes(m)&&f.push(m),f),[]);return{event:r,modifiers:o}},Lr=(n,e,t,r,o=[])=>{var c;let a;typeof t=="function"?a=t:a=()=>0;const i=o.length===0?a:h=>{if(!(o.includes("self")&&h.target!==r)){for(const f of o)f==="stop"?h.stopPropagation():f==="prevent"&&h.preventDefault();a(h)}},s=(c=Te.events)!=null&&c.wrapper?h=>{var f,m;return(m=(f=Te.events)==null?void 0:f.wrapper)==null?void 0:m.call(f,h,i)}:i,l={};o.includes("once")&&(l.once=!0),o.includes("capture")&&(l.capture=!0),o.includes("passive")&&(l.passive=!0),Nr(n,e,r),r.__events__[n]=s,r.addEventListener(e,s,l)},Nr=(n,e,t)=>{const r=t==null?void 0:t.__events__,o=r==null?void 0:r[n];o&&(t.removeEventListener(e,o),delete r[n])},an=(n,e,t)=>{let r=`${e}`,o=!0;if(Ur.includes(n))t.toggleAttribute(n,!!e);else{if(n==="style"&&t.style){const i=t;typeof e=="string"?r=e:e&&typeof e=="object"&&(o=!1,Object.keys(e).forEach(s=>{try{i.style[s]=`${e[s]}`}catch(l){console.error(l)}}))}o&&t.setAttribute(n,r)}const a=Or(n);o&&Br(t,a)&&(t[a]=r)},qo=(n,e)=>{Ur.includes(n)&&e.toggleAttribute(n,!1),e.removeAttribute(n);const t=Or(n);Br(e,t)&&delete e[t]},Or=n=>{let e;for(const t of Object.keys(Zn)){const r=Zn[t];(t===n||r===n)&&(e={key:t,value:r})}return e?e.value:Oo(n.replaceAll(":"," "))},Pt=(n,e,t=-1)=>{const r=e.childNodes.item(t);e.insertBefore(n,r)},Vo=(n,e)=>{if(!n.parentNode)return;const t=n.parentNode.childNodes.item(e),r=n.parentNode.childNodes.item(e-1);t===n||r===n||Pt(n,n.parentNode,e)},Xo=n=>{n.remove()},Zn={class:"className",accesskey:"accessKey",autocapitalize:"autoCapitalize",contenteditable:"contentEditable",contextmenu:"contextMenu",playsinline:"playsInline",spellcheck:"spellCheck",tabindex:"tabIndex",noshade:"noShade",hreflang:"hrefLang",referrerpolicy:"referrerPolicy",datetime:"dateTime",autoplay:"autoPlay",crossorigin:"crossOrigin",ismap:"isMap",usemap:"useMap",srclang:"srcLang",allowfullscreen:"allowFullScreen",allowpaymentrequest:"allowPaymentRequest",srcdoc:"srcDoc",colspan:"colSpan",rowspan:"rowSpan",autofocus:"autoFocus",formaction:"formAction",formenctype:"formEncType",formmethod:"formMethod",formnovalidate:"formNoValidate",formtarget:"formTarget",acceptcharset:"acceptCharset",autocomplete:"autoComplete",novalidate:"noValidate",dirname:"dirName",maxlength:"maxLength",readonly:"readOnly",minlength:"minLength"},Ur=["contenteditable","autofocus","autoplay","allowfullscreen","allowpaymentreques","checked","controls","compact","disabled","hidden","ismap","loop","multiple","muted","open","playsinline","readonly","required","selected","async","defer"],Qo=n=>typeof n=="number",Ko=n=>Array.isArray(n),Yn=n=>typeof n=="object",sn=n=>n===null,ea=n=>n===void 0,ta=n=>typeof n=="boolean",qn=n=>[!1,0,-0,"",null,void 0,NaN].includes(n),na=n=>["string","number","bigint","boolean","undefined","symbol","null"].includes(typeof n),we=(n,e)=>na(n)||sn(n)?!1:Object.prototype.hasOwnProperty.call(n,e),Vn=(n,e)=>{if(Object.is(n,e))return!0;if(!Yn(n)||!Yn(e)||sn(n)||sn(e))return!1},lt=(n,e,t=10)=>{const r=Vn(n,e);if(typeof r=="boolean")return r;const o=Object.keys(n),a=Object.keys(e);if(o.length!==a.length||[...o].sort().join("")!==[...a].sort().join(""))return!1;for(let i=0;i<o.length;i++){const s=n[o[i]],l=e[o[i]];if(Vn(s,l)===!1||t>0&&!lt(s,l,t-1))return!1}return!0};var E=(n=>(n.Function="#-function",n.Element="#-element",n.Root="#-root",n.Text="#-text",n.Null="#-null",n.Context="#-context",n.Outlet="#-outlet",n.Portal="#-portal",n.Fragment="#-fragment",n.JsxFragment="#-jsx-fragment",n))(E||{}),ne=(n=>(n.State="#-state",n.Effect="#-effect",n.Memo="#-memo",n.Ref="#-ref",n.Context="#-context",n.Composable="#-composable",n))(ne||{}),H=(n=>(n.Mounted="#-mounted",n.Mounting="#-mounting",n.Unmounting="#-unmounting",n.Unmounted="#-unmounted",n))(H||{});const $r=Symbol.for("ruvy-component"),st=()=>null,ra=n=>n,oa=()=>null;var O=(n=>(n.RenderElement="render-element",n.RenderText="render-text",n.RenderInnerHTML="render-inner-html",n.ReorderElements="reorder-elements",n.ChangeElementPosition="change-element-position",n.RunEffectCleanup="run-cleanup",n.RunEffect="run-effect",n.UnmountComponent="unmount-component",n.UpdateProps="update-props",n.UpdateText="update-text",n.UnmountedComponent="unmounted-component",n.RemoveComponent="remove-component",n.UpdatePortalChildren="update-portal-children",n.SetComponentMounted="mounted-component",n.RefElement="ref-element",n.UnrefEelement="unref-element",n))(O||{});const aa=["unmount-component","render-element","render-text","unref-element","ref-element","render-inner-html","unmounted-component","remove-component","change-element-position","reorder-elements","update-portal-children","update-props","update-text","mounted-component","run-cleanup","run-effect"];class B extends Error{constructor(e){super(),this.message=`[Ruvy] : ${e}`}}let Vt=0,Xn=-1;const mn=()=>{let n="";const e=Date.now();e-Xn<10?Vt++:Vt=0,Xn=e;const t=Math.floor(Math.random()*10)+10,r=Math.floor(Math.random()*100)+100,o=Math.floor(Math.random()*10)+10;return n=`${e}-${Vt}-${t}-${r}-${o}`,n};function Qn(n,e,t){const r=[...n],o=r.splice(e,1)[0];return r.splice(t,0,o),r}const re=n=>({date:new Date,id:mn(),...n}),sa=n=>{const e=Wa(n.props);return re({component:n,execute:()=>{const r=Go(n.type,e),o=vn(n);if(!o.instance)throw new B("unable to find element hosting parent.");const{index:a}=Nt(n);Pt(r,o.instance,a),n.instance=r,n.status=H.Mounted},type:O.RenderElement})},Kn=(n,e)=>re({component:n,execute:()=>{const r=n.instance;if(!r)throw new B("unable to set innerHTML, component is not yet mounted.");r.innerHTML=e},type:O.RenderInnerHTML}),ia=(n,e)=>re({component:n,execute:()=>{const r=n.instance;if(!r)throw new B("unable to update element, component is not yet mounted.");for(const o of e){const{key:a,operation:i}=o,s=Mr(a);if(s){const{event:l}=s;i==="create"||i==="update"?Lr(a,l,o.value,r):Nr(a,l,r)}else i==="create"||i==="update"?an(a,o.value,r):qo(a,r)}},type:O.UpdateProps}),er=(n,e)=>re({execute:()=>{const r=n.instance;if(!r)throw new B("unable to set reference, component is not yet mounted.");e.value=r},component:n,type:O.RefElement}),la=(n,e)=>re({execute:()=>{e.value=void 0},component:n,type:O.UnrefEelement}),ua=n=>re({execute:()=>{n.status=H.Mounted},component:n,type:O.SetComponentMounted}),ca=(n,e)=>re({execute:()=>{if(Rt(n)&&!e.isHostParentUnmounting){const r=n.instance;if(!r)throw new B("unable to unmount node, component instance does not exist.");Xo(r)}n.status=H.Unmounted},component:n,type:O.UnmountComponent}),da=n=>re({execute:()=>{xn(n).forEach(r=>{const o=r.instance;if(!o)throw new B("unable to change element position, component instance does not exist.");const{index:a,found:i}=Nt(r);if(!i)throw new B("unable to compute node index in dom");if(!o.parentElement)throw new B("element does not have any parent");Vo(o,a)})},component:n,type:O.ReorderElements}),pa=n=>re({component:n,execute:()=>{const t=_r(n.text),r=n.domParent;if(!r.instance)throw new B("unable to find element hosting parent.");const{index:o,found:a}=Nt(n);if(!a)throw new B("unable to compute node index in dom");Pt(t,r.instance,o),n.instance=t},type:O.RenderText}),ha=(n,e)=>re({component:n,execute:()=>{const r=n.instance;if(!r)throw new B("unable to change element position, component instance does not exist.");r.data=e},type:O.UpdateText}),tr=(n,e)=>re({component:n,execute:()=>{const r=e.callback();typeof r=="function"&&(e.cleanup=r)},type:O.RunEffect}),zr=(n,e)=>re({component:n,execute:()=>{var r;(r=e.cleanup)==null||r.call(e),e.cleanup=void 0},type:O.RunEffectCleanup}),fa=n=>re({component:n,execute:()=>{const t=n.instance;if(!t)throw new B("unable to change portal, component instance does not exist.");xn(n).forEach(r=>{const o=r.instance;if(!o)throw new B("unable to move element to new portal, component instance does not exist.");Pt(o,t)})},type:O.UpdatePortalChildren}),ma=(n,e,...t)=>(t=t.flat(),{type:n,props:{...e,children:t},children:t,symbol:$r,key:(e==null?void 0:e.key)??void 0}),Hr=n=>n;window.createJsxElement=ma;window.createJsxFragmentElement=Hr;var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Jr(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var gn={exports:{}};gn.exports=function(n){return Wr(ga(n),n)};gn.exports.array=Wr;function Wr(n,e){var t=n.length,r=new Array(t),o={},a=t,i=ba(e),s=ya(n);for(e.forEach(function(c){if(!s.has(c[0])||!s.has(c[1]))throw new Error("Unknown node. There is an unknown node in the supplied edges.")});a--;)o[a]||l(n[a],a,new Set);return r;function l(c,h,f){if(f.has(c)){var m;try{m=", node was:"+JSON.stringify(c)}catch{m=""}throw new Error("Cyclic dependency"+m)}if(!s.has(c))throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: "+JSON.stringify(c));if(!o[h]){o[h]=!0;var y=i.get(c)||new Set;if(y=Array.from(y),h=y.length){f.add(c);do{var _=y[--h];l(_,s.get(_),f)}while(h);f.delete(c)}r[--t]=c}}}function ga(n){for(var e=new Set,t=0,r=n.length;t<r;t++){var o=n[t];e.add(o[0]),e.add(o[1])}return Array.from(e)}function ba(n){for(var e=new Map,t=0,r=n.length;t<r;t++){var o=n[t];e.has(o[0])||e.set(o[0],new Set),e.has(o[1])||e.set(o[1],new Set),e.get(o[0]).add(o[1])}return e}function ya(n){for(var e=new Map,t=0,r=n.length;t<r;t++)e.set(n[t],t);return e}var wa=gn.exports;const va=Jr(wa),ln={};let ie,bn;const Da=5;let ke="idle",nt=[],Ee=[],rt=!1,Ft=0;const rr=()=>{ke="idle",nt=[],Ee=[],rt=!1,Ft=0,ie=void 0,bn=void 0},Gr=(n,e)=>(n.forEach(t=>{e.includes(t)||(e.push(t),ye(t)&&Gr(t.subscribers,e))}),e),Tt=(n,e)=>n.tag===E.Root?!1:n.parent===e?!0:Tt(n.parent,e),xa=n=>{const e=[];n.forEach((a,i)=>{if(e.includes(a))return;if(ye(a)){e.push(a);return}let s=e.find(l=>ye(l)?!1:Tt(a,l));s??(s=n.slice(i).find(l=>ye(l)?!1:Tt(a,l))),s||e.push(a)});const t=e.reduce((a,i,s)=>{if(ye(i)){const l=[];i.subscribers.forEach(c=>{const h=e.indexOf(c);h!==-1&&l.push([h.toString(),s.toString()])}),a.push(...l)}return a},[]),o=va.array(e.map((a,i)=>i.toString()),t).map(a=>{const i=e[parseInt(a)];if(!i)throw new B("something went wrong while trying to optimize dependencies");return i}).reverse();if(!rt){const a=[],i=[];return o.forEach(l=>{ye(l)?a.push(l):i.push(l)}),[...a.sort((l,c)=>l.index-c.index),...i]}return o},Fa=()=>{if(ln.preventRequestsProcessing)return;if(Ft++,Ft>100)throw new B("infinite re-rendering detected: update depth exceeded 100.");ke!=="unmounting"&&(ke="processing");const n=Ee.some(s=>s.type==="route"),e=n?[]:Ee.filter(s=>s.type==="mount");if(rt&&e.length>0)throw new B("cannot mount application twice, try to unmount the current one first.");const t=Ee.some(s=>s.type==="unmount");if(t&&(ke="unmounting",!rt)){if(ln.skipThrowingWhenUnmountingNoApp){rr();return}throw new B("no application to be unmounted")}const r=Ee.filter(s=>s.type==="update"),o=Gr(r.map(s=>s.requester),[]),a=xa(o);Ee=[];const i=ue();if(a.forEach(s=>{const l=s;let c;if(ye(l))c=ds(l);else{const h=l.props,f=l.type,m=l.props.children,y=l.ctx.index,_=createJsxElement(f,h,...m),S=Ye(l.ctx);c=ot(_,l,l.ctx.parent,y,S).tasks}Ce(c,i)}),e.forEach(s=>{const{child:l,root:c}=s,h=c.children.length,f=c,m=ot(l,void 0,f,h,{contexts:{},dom:{parent:f},index:h,key:h,parent:f});c.children=[m.component],Ce(m.tasks,i),rt=!0}),n){const s=ot(bn,ie==null?void 0:ie.children[0],ie,0,{contexts:{},dom:{parent:ie},index:0,key:0,parent:ie});Ce(s.tasks,i)}if(t&&ie){const s=ie.children[0],l=Mt(s,{});Ce(l,i),Array.from(cs()).sort((c,h)=>h[1].index-c[1].index).forEach(([c])=>Ce(ps(c),i)),rr()}if(ka(i),ke="idle",nt.length===0){Ft=0;return}Ee=nt,nt=[],ut(Ee[0])},ut=n=>{if(ln.preventRequests===!0||ke==="unmounting")return;const e={date:new Date,fulfilled:!1,id:mn(),...n};if(ke==="processing"){nt.push(e);return}Ee.push(e),ke!=="batching"&&(ke="batching",setTimeout(()=>Fa(),Da))};Wo({events:{wrapper:(n,e)=>{try{e(n)}catch(t){console.error(t)}},syntax:{svelte:!1,vue:!1}}});const Ea=({app:n,host:e})=>{if(ie)throw new B("an app is already mounted");ie={children:[],instance:e,tag:E.Root},bn=n,ut({root:ie,child:n,type:"mount"})},ka=n=>{aa.forEach(e=>{n[e].forEach(t=>{try{t.execute()}catch(r){console.error(r)}})})},Aa=n=>{let e=location.pathname;return n&&e.startsWith(n)&&(e=e.replace(n,"")),e||(e="/"),e},Ca=n=>[{path:n},"",n],Ta=()=>{const n=location.search,e=new URLSearchParams(n);return Array.from(e.entries()).reduce((r,o)=>(r[o[0]]=o[1],r),{})},Sa={getPath:Aa,createHistoryArgs:Ca,getQueryParams:Ta},jr=n=>{const{protocol:e,hostname:t}=location,r=`${e}//${t}${n}`;return new URL(r)},Ra=n=>{let e=location.hash.substring(1);return n&&e.startsWith(n)&&(e=e.replace(n,"")),e||(e="/"),jr(e).pathname},Ba=()=>{const e=jr(location.hash.substring(1)).search,t=new URLSearchParams(e);return Array.from(t.entries()).reduce((o,a)=>(o[a[0]]=a[1],o),{})},_a=n=>{const e=`/#${n}`;return[{path:e},"",e]},Ia={getPath:Ra,createHistoryArgs:_a,getQueryParams:Ba},Pa=n=>!("path"in n),or=n=>"path"in n&&n.path==="",Ma=n=>"path"in n&&n.path==="*",Et=(n,e)=>n.endsWith("/")&&e.startsWith("/")?`${n}${e.substring(1)}`:!n.endsWith("/")&&!e.startsWith("/")?`${n}/${e}`:`${n}${e}`,un=(n,e="",t=[],r=[])=>n.reduce((o,a)=>{if(or(a))return o;if(Pa(a)){const f=[...t,a.element];if(a.children){const m=un(a.children,e,f,r);return{...o,...m}}return o}const i=Et(e,a.path);if(Ma(a)){const f={params:r,path:i,steps:[...t],title:a.title};return f.steps.push(a.element),o[i]=f,o}const s=a,l=[...t,s.element],h={params:[...r,...s.path.split("/").reduce((f,m)=>(m.startsWith(":")&&f.push(m.substring(1)),f),[])],path:i,steps:l,name:s.name,title:s.title};if(s.children){const f=un(s.children,h.path,[...h.steps],[...h.params]);o={...o,...f};const m=s.children.find(y=>or(y));m&&(h.steps.push(m.element),h.name=m.name??h.name,h.title=m.title??h.title)}return o[i]=h,o},{});var St;(function(n){n.Browser="browser",n.Hash="hash"})(St||(St={}));const La=(n,e)=>{const t=e[n],r=n.split("/");if(t){const l=r.reduce((c,h)=>{if(h.startsWith(":")){const f=h.substring(1);c[f]=h}return c},{});return{steps:t.steps,params:l,route:t}}let o="/",a,i=[];for(let l=0;l<r.length;l++){const c=Et(o,r[l]);if(e[c]){o=c,a=e[o],i=[...a.steps];continue}const f=Et(o,"/:"),m=Object.keys(e).filter(S=>S.startsWith(f)).sort()[0];if(m){o=m,a=e[o],i=[...a.steps];continue}const y=Et(o,"/*");if(e[y])o=y,a=e[o],i=[...a.steps];else{const S=e["/*"];i.push(S==null?void 0:S.steps.at(-1))}break}const s=o.split("/").reduce((l,c,h)=>{if(c.startsWith(":")){const f=c.substring(1),m=r[h];l[f]=m}return l},{});return{steps:i,params:s,route:a}},ar=(n,e,t)=>{const{name:r,params:o}=n,a=Object.keys(e).find(l=>e[l].name===r);if(!a)return;const i=e[a];if(!i)return;let s=i.path.split("/").map(l=>{if(l.startsWith(":")){const c=l.substring(1);return o?o[c]:void 0}return l}).join("/");if(n.query){const l=n.query,c=Object.keys(l).map(h=>`${h}=${l[h]}`).join("&");s=`${s}?${c}`}return n.hash&&(s=`${s}#${n.hash}`),t&&(s=`${t}${s}`),s};class sr extends Error{constructor(e){super(`[DOM Router]: ${e}`)}}class Na{constructor(e){Object.defineProperty(this,"routes",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"cache",{enumerable:!0,configurable:!0,writable:!0,value:{params:{},processed:{},steps:[],url:""}}),Object.defineProperty(this,"base",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"correctScrolling",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"type",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"onChanged",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"listener",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"transformTitle",{enumerable:!0,configurable:!0,writable:!0,value:void 0});const{onChanged:t,routes:r,base:o,correctScrolling:a,transformTitle:i,type:s}=e;if(typeof o=="string"){if(!o.startsWith("/"))throw new sr(`invalid base "${o}" : should start with "/"`);this.base=o}this.correctScrolling=a??!1,this.type=s??St.Browser,this.onChanged=t,this.transformTitle=i??(l=>l??""),this.routes=un(r),this.listener=()=>{this.processPath()&&this.onChanged()},window.addEventListener("popstate",this.listener),this.processPath()}get engine(){return this.type===St.Browser?Sa:Ia}unload(){window.removeEventListener("popstate",this.listener)}processPath(){var a,i,s;const e=location.href;if(e===this.cache.url)return!1;const t=this.engine.getPath(this.base),r=this.cache.processed[t],o=r??La(t,this.routes);return r||(this.cache.processed[t]=o),this.cache.params=Object.keys(o.params).reduce((l,c)=>(l[c]=decodeURI(o.params[c]),l),{}),this.cache.url=e,this.cache.steps=o.steps,(a=o.route)!=null&&a.title&&(document.title=((s=this.transformTitle)==null?void 0:s.call(this,(i=o.route)==null?void 0:i.title))??document.title),this.correctScrolling&&window.scrollTo({top:0}),!0}navigate(e,t){var o;if(typeof e=="number")history.go(e);else{let a;if(typeof e=="string")a=e;else{const s=ar(e,this.routes,this.base);if(typeof s!="string")throw new sr(`named path "${e.name}" is not found`);a=s}this.base&&!a.startsWith(this.base)&&(a=`${this.base}${a}`);const i=this.engine.createHistoryArgs(a);t!=null&&t.replace?history.replaceState(...i):history.pushState(...i)}this.processPath()&&((o=this.onChanged)==null||o.call(this))}getElementByDepth(e){return this.cache.steps.at(e)}getPath(){return this.engine.getPath(this.base)}getParams(){return this.cache.params}getSearchParams(){return this.engine.getQueryParams()}toHref(e){let t;if(typeof e=="string"?t=e:t=ar(e,this.routes,this.base),!!t)return this.base&&!t.startsWith(this.base)&&(t=`${this.base}${t}`),t}}const yn=n=>n.startsWith("/");let Se;const Zr=n=>{if(n.tagName.toLowerCase()==="a")return n;const e=n.parentElement;if(e){if(e.tagName.toLowerCase()==="a")return e;if(e.parentElement)return Zr(e.parentElement)}};document.addEventListener("click",n=>{if(!Se)return;const e=Zr(n.target);if(e){const t=e.getAttribute("href");t&&yn(t)&&(n.preventDefault(),$a(t))}});const Oa=n=>{if(Se)throw new B("another router was already mounted, please unmount it first");const e=()=>{ut({type:"route"})};Se=new Na({...n,onChanged:e})},wn=n=>{if(!Se)throw new B("a router is yet to be created");return n(Se)},Ua=n=>Se?Se.getElementByDepth(n):null,$a=(n,e={})=>{wn(t=>{t.navigate(n,e)})},Yr=n=>{if(!(ea(n)||Qo(n)))return typeof n=="string"&&(!Se||!yn(n))?n:wn(e=>e.toHref(n))},za=()=>wn(n=>n.getPath()),qr=["if","else","else-if","switch","case","case:default","innerHTML","tag","ns","children","key","ref"],ot=(n,e,t,r,o)=>{const a=Dn(n),i=Vr(n,r),s=Ka[a],l=s(n,e,t,i,o);if(!e){const c=ua(l.component);V(c,l.tasks)}return ct(l.component)&&is(l),l},Ha=(n,e,t,r,o)=>{const{type:a,props:i}=n;let s=n.children;const l=e??{children:[],key:r,parent:t,props:i,status:H.Mounting,tag:E.Element,type:a,domParent:o.dom.parent},c=ue(),h=i.innerHTML;if(e){if(typeof h=="string"&&h!==l.props.innerHTML){const S=Kn(l,h);V(S,c),s=[]}const m=Ja(l.props,i);if(m.length>0){const S=ia(l,m);V(S,c)}const y=e.props.ref,_=i.ref;if(_!==y){if(Xt(y)){const S=la(l,y);V(S,c)}if(Xt(_)){const S=er(l,_);V(S,c)}}l.props=i}else{const m=sa(l);if(V(m,c),typeof h=="string"){const _=Kn(l,h);s=[],V(_,c)}const y=i.ref;if(Xt(y)){const _=er(l,y);V(_,c)}}const f=Ye(o,m=>m.dom={parent:l});return{children:s,component:l,tasks:c,ctx:f}},Ja=(n,e)=>Object.keys({...n,...e}).reduce((t,r)=>(qr.includes(r)||(we(e,r)?we(n,r)?lt(n[r],e[r])||t.push({key:r,operation:"update",value:e[r]}):t.push({key:r,operation:"create",value:e[r]}):t.push({key:r,operation:"remove"})),t),[]),Wa=n=>Object.keys(n).reduce((e,t)=>([...qr,"tag"].includes(t)||(e[t]=n[t]),e),{}),Ga=(n,e,t,r,o)=>{const{props:a,type:i}=n,s=n.children,l=ue(),c=e??{children:[],key:r,parent:t,props:a,status:H.Mounting,tag:E.Context,type:i};e&&(c.props=a);const h=a.ctx.id,f=Ye(o,m=>m.contexts[h]=a.value);return{children:s,component:c,ctx:f,tasks:l}},ja=(n,e,t,r,o)=>{const{props:a,type:i}=n,s=n.children,l=ue(),c=e??{children:[],key:r,parent:t,type:i,props:a,status:H.Mounting,tag:E.Fragment};return e&&(c.props=a),{children:s,component:c,ctx:o,tasks:l}},Za=(n,e,t,r,o)=>{const{props:a,type:i}=n,s=n.children,l=ue(),c=e??{children:[],key:r,props:a,parent:t,type:i,status:H.Mounting,tag:E.JsxFragment};return{children:s,component:c,ctx:o,tasks:l}},Ya=(n,e,t,r,o)=>{const a=ue(),{props:i,type:s}=n,l=e??{children:[],hooks:[],key:r,parent:t,props:i,type:s,status:H.Mounting,tag:E.Function,ctx:Ye(o)};return e&&(l.props=i,l.ctx=o),{children:[Xr({component:l,tasks:a,ctx:o},()=>s(i))],component:l,ctx:o,tasks:a}},qa=(n,e,t,r,o)=>{const a=ue();return{component:e??{key:r,parent:t,status:H.Mounting,tag:E.Null},children:[],ctx:o,tasks:a}},Va=(n,e,t,r,o)=>{const a=ue(),{props:i,type:s}=n,l=(o.outletDepth??-1)+1,c=Ye(o,m=>{m.outletDepth=l}),h=e??{children:[],key:r,parent:t,props:i,status:H.Mounting,tag:E.Outlet,type:s,ctx:c};return e&&(h.props=i),{children:[Ua(l)],ctx:c,component:h,tasks:a}},Xa=(n,e,t,r,o)=>{const{type:a,props:i}=n,{children:s,container:l}=i,c=ue(),h=e??{children:[],key:r,parent:t,props:i,status:H.Mounting,tag:E.Portal,instance:l,type:a};if(e){const m=i.container,y=h.props.container;if(m!==y){h.instance=m;const _=fa(h);V(_,c)}h.props=i}const f={...o,dom:{...o.dom,parent:h}};return{component:h,children:s,ctx:f,tasks:c}},Qa=(n,e,t,r,o)=>{const a=`${n}`,i=ue(),s=e??{key:r,parent:t,status:H.Mounting,tag:E.Text,text:a,position:0,domParent:o.dom.parent};if(e){if(a!==s.text){s.text=a;const l=ha(s,a);V(l,i)}}else{const l=pa(s);V(l,i)}return{component:s,ctx:o,children:[],tasks:i}},Ka={[E.Element]:Ha,[E.Context]:Ga,[E.Fragment]:ja,[E.JsxFragment]:Za,[E.Function]:Ya,[E.Outlet]:Va,[E.Text]:Qa,[E.Null]:qa,[E.Portal]:Xa},ue=()=>({[O.SetComponentMounted]:[],[O.RemoveComponent]:[],[O.RenderElement]:[],[O.RenderInnerHTML]:[],[O.RenderText]:[],[O.ReorderElements]:[],[O.RunEffect]:[],[O.RunEffectCleanup]:[],[O.UnmountComponent]:[],[O.UpdatePortalChildren]:[],[O.UpdateProps]:[],[O.UpdateText]:[],[O.UnmountedComponent]:[],[O.RefElement]:[],[O.UnrefEelement]:[],[O.ChangeElementPosition]:[]}),es=n=>[E.Function,E.Element,E.Portal,E.Portal,E.Fragment,E.JsxFragment,E.Context,E.Outlet].includes(n.tag),ts=n=>!es(n)||!we(n.props,"switch")?!1:{value:n.props.switch},Rt=n=>[E.Element,E.Text].includes(n.tag),ns=n=>[E.Element,E.Portal,E.Root].includes(n.tag),vn=n=>{if(n.tag===E.Root)throw new B("unable to locate the parent node.");return ns(n.parent)?n.parent:vn(n.parent)},Xt=n=>we(n,"value"),V=(n,e)=>{e[n.type].push(n)},Ce=(n,e)=>{for(const t of Object.keys(n))e[t].push(...n[t])},Mt=(n,e)=>{const t=ue(),r={...e};if(n.status=H.Unmounting,(ye(n)||n.tag===E.Function)&&n.hooks.forEach(o=>{if(o.type===ne.Effect&&typeof o.cleanup=="function"){const a=zr(n,o);V(a,t)}else o.type===ne.Composable&&fs(o.name,n)}),"tag"in n){const o=ca(n,e);V(o,t),ct(n)&&n.children.forEach(a=>{const i=Mt(a,r);Ce(i,t)})}return t},Lt=n=>n!==null&&typeof n=="object"&&!Array.isArray(n)&&we(n,"type")&&we(n,"props")&&we(n,"children")&&we(n,"symbol")&&n.symbol===$r&&typeof n.props=="object"&&Array.isArray(n.children),Dn=n=>{if(Lt(n)){if(n.type===ra)return E.Portal;if(n.type===E.Context)return E.Context;if(n.type===st)return E.Outlet;if(n.type===oa)return E.Fragment;if(n.type===Hr)return E.JsxFragment;if(typeof n.type=="function")return E.Function;if(typeof n.type=="string")return E.Element}return[null,!1,void 0].includes(n)?E.Null:E.Text},ct=n=>[E.Fragment,E.JsxFragment,E.Element,E.Function,E.Context,E.Function,E.Portal,E.Outlet].includes(n.tag),Vr=(n,e)=>Lt(n)?n.key??e:e,Ze=(n,e)=>{if(!Lt(n))return!1;const{props:t}=n;return we(t,e)?{value:t[e]}:!1},rs=n=>ct(n)?n.children.reduce((e,t,r)=>{const o=t.key;return e[o]={component:t,index:r},t.status=H.Unmounting,e},{}):{},os=(n,e)=>{const t=[];typeof n.props.tag=="string"&&(n.type=n.props.tag);const r=Object.keys(n.props).reduce((o,a)=>{const i=n.props[a];if(Pr(a))t.push({key:a,value:i});else if(a==="href"&&n.type.toLowerCase()==="a"){const s=Ze(n,"href");s&&(o[a]=Yr(s.value))}else o[a]=i;return o},{});if(t.length>0){const o=Ir(t);r.class=o}r.ns=e.ns??r.ns??at.HTML,n.props=r},as=(n,e,t,r,o)=>{if(o)return!0;{const a=Ze(n,"case");if(a)return!(a.value===r);if(!(e===t-1))throw new B('missing "case" prop within a switch control component.');if(!Ze(n,"case:default"))throw new B('missing "case" or "case:default" prop in the last element of a switch control component.');return!1}},ss=(n,e,t)=>{const r=!!e;if(n==="if")return{nullify:!r,sequence:{fullfilled:r,last:"if"}};if(t===!1)throw new B('cannot use "else" or "else-if" directives outside a conditional sequence');if(n==="else-if"&&t.last==="else")throw new B('cannot use "else-if" directive after "else" directive');return t.fullfilled?{nullify:!0,sequence:{fullfilled:!0,last:n}}:n==="else-if"?{nullify:!r,sequence:{fullfilled:r,last:"else-if"}}:{nullify:!r,sequence:!1}},is=n=>{const e=n.component,t=ts(e);let r=t===!1,o=!1;const a=rs(e),i=new Set([]),s=n.children.length;for(let l=0;l<s;l++){const c=n.children[l];let h=!1;t&&(h=as(c,l,s,t.value,r),h||(r=!0));const f=Vr(c,l);if(i.has(f))throw new B(`duplicate key "${f}" detected. make sure to assign unique keys for each child. if key is not defined, the framework will use the component index as a key instead.`);i.add(f);let m=h?null:c;const y=Ze(c,"if"),_=Ze(c,"else-if"),S=Ze(c,"else");if(t&&_||t&&S)throw new B('cannot have an "else" or "else-if" directive within a "switch" control component');const P=(y?1:0)+(_?1:0)+(S?1:0);if(P>1)throw new B('cannot have more than one conditional directive : "if" | "else" | "else-if"');if(P===1){const g=y?"if":_?"else-if":"else",v=y?y.value:_?_.value:!0,F=ss(g,v,o);o=F.sequence,h=F.nullify}else o=!1;m=h?null:m,Dn(m)===E.Element&&os(m,n.ctx);let d;const p=Ye(n.ctx,g=>{g.index=l,g.key=f,g.parent=n.component}),b=a[f];if(!b||ls(m,b.component)){d=ot(m,void 0,e,l,p);const g=e.children.length;e.children.push(d.component),l!==g&&(e.children=Qn(e.children,g,l))}else{b.component.status=H.Mounted,d=ot(m,b.component,e,l,n.ctx);const g=e.children.indexOf(b.component);if(g===-1)throw new B("unable to determine component index");if(g!==l){e.children=Qn(e.children,g,l);const v=da(b.component);V(v,d.tasks)}}Ce(d.tasks,n.tasks)}e.children=e.children.filter(l=>{if(l.status===H.Unmounting){const c=Mt(l,{});return Ce(c,n.tasks),!1}return!0})},Ye=(n,e)=>{const t={...n,contexts:{...n.contexts},dom:{...n.dom}};return e==null||e(t),t},ls=(n,e)=>{if(Dn(n)!==e.tag)return!0;if(!Lt(n))return!1;const r=e;return n.type===r.type?r.tag===E.Element&&(n.props.ns??at.HTML)!==r.props.ns:!0},xn=n=>Rt(n)?[n]:ct(n)?n.children?n.children.reduce((e,t)=>(Rt(t)?e.push(t):e.push(...xn(t)),e),[]):[]:[],Nt=(n,e)=>{let t=0,r=!1;e??(e=vn(n));for(const o of e.children){if(r)break;if(o===n){r=!0;break}if(o.status!==H.Unmounting&&o.tag!==E.Portal){if(Rt(o)){t++;continue}if(ct(o)){const{found:a,index:i}=Nt(n,o);t+=i,a&&(r=!0)}}}return{index:t,found:r}};let he=-1,N;const Xr=(n,e)=>{N=n;const t=e();return N=void 0,he=-1,t},Re=n=>{if(!N)throw new B('cannot call "useState" outisde of a functional component body.');const e=N.component;he++;let t;if(N.component.status===H.Mounting){const r=typeof n=="function"?n():n;t={type:ne.State,value:r,getValue:()=>t.value,setValue:o=>{if(e.status===H.Unmounting||e.status===H.Unmounted)return;let a;typeof o=="function"?a=o(t.value):a=o,lt(t.value,a)||(t.value=a,ut({requester:e,type:"update"}))}},N.component.hooks.push(t)}else t=N.component.hooks[he];if(!t||t.type!==ne.State)throw new B("unexpected hook type : expected state but got something else.");return[t.value,t.setValue,t.getValue]},dt=(n,e)=>{if(!N)throw new B('cannot call "useEffect" outisde of a functional component body.');he++;let t;if(N.component.status===H.Mounting){t={callback:n,deps:e,type:ne.Effect},N.component.hooks.push(t);const r=tr(N.component,t);V(r,N.tasks)}else{if(t=N.component.hooks[he],!t||t.type!==ne.Effect)throw new B("unexpected hook type : expected effect but got something else.");if(!lt(e,t.deps)){if(typeof t.cleanup=="function"){const o=zr(N.component,t);V(o,N.tasks)}t.callback=n,t.deps=e;const r=tr(N.component,t);V(r,N.tasks)}}},fe=(n,e)=>{if(!N)throw new B('cannot call "useMemo" outisde of a functional component body.');he++;let t;if(N.component.status===H.Mounting){const r=n();t={type:ne.Memo,deps:e,value:r},N.component.hooks.push(t)}else{if(t=N.component.hooks[he],!t||t.type!==ne.Memo)throw new B("unexpected hook type : expected memo but got something else.");lt(t.deps,e)||(t.value=n(),t.deps=e)}return t.value},cn=(n,e)=>fe(()=>n,e),Qr=n=>{if(!N)throw new B('cannot call "useRef" outisde of a functional component body.');he++;let e;if(N.component.status===H.Mounting)e={type:ne.Ref,value:{value:n}},N.component.hooks.push(e);else if(e=N.component.hooks[he],!e||e.type!==ne.Ref)throw new B("unexpected hook type : expected ref but got something else.");return e.value},us=n=>{if(!N)throw new B('cannot call "useComposable" outisde of a functional component body.');he++;let e,t;if(N.component.status===H.Mounting)t=lr(n),e={type:ne.Composable,name:n},hs(n,N.component),N.component.hooks.push(e);else{if(e=N.component.hooks[he],!e||e.type!==ne.Composable)throw new B("unexpected hook type : expected composable but got something else.");t=lr(e.name)}return t};let ir=0;const it=new Map,cs=()=>it.entries(),Fn=(n,e)=>{if(N)throw new B("cannot create a composable inside a function component or another composable.");if(it.has(n))throw new B(`composable with name "${n}" is already created`);const t={hooks:[],id:mn(),name:n,subscribers:[],value:void 0,status:H.Mounting,index:ir,callback:e};return ir++,it.set(n,t),ut({requester:t,type:"update"}),()=>us(n)},Ot=n=>{const e=it.get(n);if(!e)throw new B("unable to retrieve composable value, entry not found.");return e},ye=n=>!we(n,"tag"),lr=n=>Ot(n).value,ds=n=>{const e={component:n,ctx:{},tasks:ue()};return Xr(e,()=>{const t=n.callback();return n.value=t,n.status!==H.Mounted&&(n.status=H.Mounted),t}),e.tasks},ps=n=>{const e=Ot(n),t=Mt(e,{});return it.delete(n),t},hs=(n,e)=>{const t=Ot(n);if(ye(e)){t.subscribers.includes(e)||t.subscribers.push(e);return}t.subscribers.find(o=>ye(o)?!1:Tt(e,o))||t.subscribers.push(e)},fs=(n,e)=>{const t=Ot(n);t.subscribers=t.subscribers.filter(r=>r!==e)},Kr=(...n)=>n.filter(t=>!qn(t)).map(t=>Ko(t)?t.filter(r=>!qn(r)).join(" "):t).join(" ").trim(),ms=()=>createJsxElement(st,null);/*! @license DOMPurify 3.0.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.3/LICENSE */const{entries:eo,setPrototypeOf:ur,isFrozen:gs,getPrototypeOf:bs,getOwnPropertyDescriptor:ys}=Object;let{freeze:Q,seal:me,create:ws}=Object,{apply:dn,construct:pn}=typeof Reflect<"u"&&Reflect;dn||(dn=function(e,t,r){return e.apply(t,r)});Q||(Q=function(e){return e});me||(me=function(e){return e});pn||(pn=function(e,t){return new e(...t)});const vs=le(Array.prototype.forEach),cr=le(Array.prototype.pop),et=le(Array.prototype.push),kt=le(String.prototype.toLowerCase),Qt=le(String.prototype.toString),Ds=le(String.prototype.match),ce=le(String.prototype.replace),xs=le(String.prototype.indexOf),Fs=le(String.prototype.trim),te=le(RegExp.prototype.test),tt=Es(TypeError);function le(n){return function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return dn(n,e,r)}}function Es(n){return function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return pn(n,t)}}function I(n,e,t){var r;t=(r=t)!==null&&r!==void 0?r:kt,ur&&ur(n,null);let o=e.length;for(;o--;){let a=e[o];if(typeof a=="string"){const i=t(a);i!==a&&(gs(e)||(e[o]=i),a=i)}n[a]=!0}return n}function je(n){const e=ws(null);for(const[t,r]of eo(n))e[t]=r;return e}function wt(n,e){for(;n!==null;){const r=ys(n,e);if(r){if(r.get)return le(r.get);if(typeof r.value=="function")return le(r.value)}n=bs(n)}function t(r){return console.warn("fallback value for",r),null}return t}const dr=Q(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Kt=Q(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),en=Q(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ks=Q(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),tn=Q(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),As=Q(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),pr=Q(["#text"]),hr=Q(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),nn=Q(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fr=Q(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),vt=Q(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cs=me(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ts=me(/<%[\w\W]*|[\w\W]*%>/gm),Ss=me(/\${[\w\W]*}/gm),Rs=me(/^data-[\-\w.\u00B7-\uFFFF]/),Bs=me(/^aria-[\-\w]+$/),to=me(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),_s=me(/^(?:\w+script|data):/i),Is=me(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),no=me(/^html$/i);var mr=Object.freeze({__proto__:null,MUSTACHE_EXPR:Cs,ERB_EXPR:Ts,TMPLIT_EXPR:Ss,DATA_ATTR:Rs,ARIA_ATTR:Bs,IS_ALLOWED_URI:to,IS_SCRIPT_OR_DATA:_s,ATTR_WHITESPACE:Is,DOCTYPE_NAME:no});const Ps=()=>typeof window>"u"?null:window,Ms=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let r=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(r=t.getAttribute(o));const a="dompurify"+(r?"#"+r:"");try{return e.createPolicy(a,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}};function ro(){let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ps();const e=k=>ro(k);if(e.version="3.0.3",e.removed=[],!n||!n.document||n.document.nodeType!==9)return e.isSupported=!1,e;const t=n.document,r=t.currentScript;let{document:o}=n;const{DocumentFragment:a,HTMLTemplateElement:i,Node:s,Element:l,NodeFilter:c,NamedNodeMap:h=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:f,DOMParser:m,trustedTypes:y}=n,_=l.prototype,S=wt(_,"cloneNode"),P=wt(_,"nextSibling"),R=wt(_,"childNodes"),d=wt(_,"parentNode");if(typeof i=="function"){const k=o.createElement("template");k.content&&k.content.ownerDocument&&(o=k.content.ownerDocument)}let p,b="";const{implementation:g,createNodeIterator:v,createDocumentFragment:F,getElementsByTagName:M}=o,{importNode:C}=t;let L={};e.isSupported=typeof eo=="function"&&typeof d=="function"&&g&&g.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:j,ERB_EXPR:oe,TMPLIT_EXPR:Ue,DATA_ATTR:pt,ARIA_ATTR:$t,IS_SCRIPT_OR_DATA:zt,ATTR_WHITESPACE:Ve}=mr;let{IS_ALLOWED_URI:Z}=mr,U=null;const ve=I({},[...dr,...Kt,...en,...tn,...pr]);let J=null;const K=I({},[...hr,...nn,...fr,...vt]);let W=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ee=null,De=null,Ie=!0,Ae=!0,$e=!1,Xe=!0,ge=!1,ae=!1,Qe=!1,Pe=!1,ze=!1,ht=!1,ft=!1,Cn=!0,Tn=!1;const Do="user-content-";let Ht=!0,Ke=!1,He={},Je=null;const Sn=I({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Rn=null;const Bn=I({},["audio","video","img","source","image","track"]);let Jt=null;const _n=I({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),mt="http://www.w3.org/1998/Math/MathML",gt="http://www.w3.org/2000/svg",xe="http://www.w3.org/1999/xhtml";let We=xe,Wt=!1,Gt=null;const xo=I({},[mt,gt,xe],Qt);let Me;const Fo=["application/xhtml+xml","text/html"],Eo="text/html";let Y,Ge=null;const ko=o.createElement("form"),In=function(u){return u instanceof RegExp||u instanceof Function},jt=function(u){if(!(Ge&&Ge===u)){if((!u||typeof u!="object")&&(u={}),u=je(u),Me=Fo.indexOf(u.PARSER_MEDIA_TYPE)===-1?Me=Eo:Me=u.PARSER_MEDIA_TYPE,Y=Me==="application/xhtml+xml"?Qt:kt,U="ALLOWED_TAGS"in u?I({},u.ALLOWED_TAGS,Y):ve,J="ALLOWED_ATTR"in u?I({},u.ALLOWED_ATTR,Y):K,Gt="ALLOWED_NAMESPACES"in u?I({},u.ALLOWED_NAMESPACES,Qt):xo,Jt="ADD_URI_SAFE_ATTR"in u?I(je(_n),u.ADD_URI_SAFE_ATTR,Y):_n,Rn="ADD_DATA_URI_TAGS"in u?I(je(Bn),u.ADD_DATA_URI_TAGS,Y):Bn,Je="FORBID_CONTENTS"in u?I({},u.FORBID_CONTENTS,Y):Sn,ee="FORBID_TAGS"in u?I({},u.FORBID_TAGS,Y):{},De="FORBID_ATTR"in u?I({},u.FORBID_ATTR,Y):{},He="USE_PROFILES"in u?u.USE_PROFILES:!1,Ie=u.ALLOW_ARIA_ATTR!==!1,Ae=u.ALLOW_DATA_ATTR!==!1,$e=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Xe=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ge=u.SAFE_FOR_TEMPLATES||!1,ae=u.WHOLE_DOCUMENT||!1,ze=u.RETURN_DOM||!1,ht=u.RETURN_DOM_FRAGMENT||!1,ft=u.RETURN_TRUSTED_TYPE||!1,Pe=u.FORCE_BODY||!1,Cn=u.SANITIZE_DOM!==!1,Tn=u.SANITIZE_NAMED_PROPS||!1,Ht=u.KEEP_CONTENT!==!1,Ke=u.IN_PLACE||!1,Z=u.ALLOWED_URI_REGEXP||to,We=u.NAMESPACE||xe,W=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&In(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(W.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&In(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(W.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(W.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ge&&(Ae=!1),ht&&(ze=!0),He&&(U=I({},[...pr]),J=[],He.html===!0&&(I(U,dr),I(J,hr)),He.svg===!0&&(I(U,Kt),I(J,nn),I(J,vt)),He.svgFilters===!0&&(I(U,en),I(J,nn),I(J,vt)),He.mathMl===!0&&(I(U,tn),I(J,fr),I(J,vt))),u.ADD_TAGS&&(U===ve&&(U=je(U)),I(U,u.ADD_TAGS,Y)),u.ADD_ATTR&&(J===K&&(J=je(J)),I(J,u.ADD_ATTR,Y)),u.ADD_URI_SAFE_ATTR&&I(Jt,u.ADD_URI_SAFE_ATTR,Y),u.FORBID_CONTENTS&&(Je===Sn&&(Je=je(Je)),I(Je,u.FORBID_CONTENTS,Y)),Ht&&(U["#text"]=!0),ae&&I(U,["html","head","body"]),U.table&&(I(U,["tbody"]),delete ee.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw tt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw tt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');p=u.TRUSTED_TYPES_POLICY,b=p.createHTML("")}else p===void 0&&(p=Ms(y,r)),p!==null&&typeof b=="string"&&(b=p.createHTML(""));Q&&Q(u),Ge=u}},Pn=I({},["mi","mo","mn","ms","mtext"]),Mn=I({},["foreignobject","desc","title","annotation-xml"]),Ao=I({},["title","style","font","a","script"]),bt=I({},Kt);I(bt,en),I(bt,ks);const Zt=I({},tn);I(Zt,As);const Co=function(u){let w=d(u);(!w||!w.tagName)&&(w={namespaceURI:We,tagName:"template"});const x=kt(u.tagName),z=kt(w.tagName);return Gt[u.namespaceURI]?u.namespaceURI===gt?w.namespaceURI===xe?x==="svg":w.namespaceURI===mt?x==="svg"&&(z==="annotation-xml"||Pn[z]):!!bt[x]:u.namespaceURI===mt?w.namespaceURI===xe?x==="math":w.namespaceURI===gt?x==="math"&&Mn[z]:!!Zt[x]:u.namespaceURI===xe?w.namespaceURI===gt&&!Mn[z]||w.namespaceURI===mt&&!Pn[z]?!1:!Zt[x]&&(Ao[x]||!bt[x]):!!(Me==="application/xhtml+xml"&&Gt[u.namespaceURI]):!1},Le=function(u){et(e.removed,{element:u});try{u.parentNode.removeChild(u)}catch{u.remove()}},Yt=function(u,w){try{et(e.removed,{attribute:w.getAttributeNode(u),from:w})}catch{et(e.removed,{attribute:null,from:w})}if(w.removeAttribute(u),u==="is"&&!J[u])if(ze||ht)try{Le(w)}catch{}else try{w.setAttribute(u,"")}catch{}},Ln=function(u){let w,x;if(Pe)u="<remove></remove>"+u;else{const se=Ds(u,/^[\r\n\t ]+/);x=se&&se[0]}Me==="application/xhtml+xml"&&We===xe&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");const z=p?p.createHTML(u):u;if(We===xe)try{w=new m().parseFromString(z,Me)}catch{}if(!w||!w.documentElement){w=g.createDocument(We,"template",null);try{w.documentElement.innerHTML=Wt?b:z}catch{}}const q=w.body||w.documentElement;return u&&x&&q.insertBefore(o.createTextNode(x),q.childNodes[0]||null),We===xe?M.call(w,ae?"html":"body")[0]:ae?w.documentElement:q},Nn=function(u){return v.call(u.ownerDocument||u,u,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT,null,!1)},To=function(u){return u instanceof f&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof h)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},yt=function(u){return typeof s=="object"?u instanceof s:u&&typeof u=="object"&&typeof u.nodeType=="number"&&typeof u.nodeName=="string"},Fe=function(u,w,x){L[u]&&vs(L[u],z=>{z.call(e,w,x,Ge)})},On=function(u){let w;if(Fe("beforeSanitizeElements",u,null),To(u))return Le(u),!0;const x=Y(u.nodeName);if(Fe("uponSanitizeElement",u,{tagName:x,allowedTags:U}),u.hasChildNodes()&&!yt(u.firstElementChild)&&(!yt(u.content)||!yt(u.content.firstElementChild))&&te(/<[/\w]/g,u.innerHTML)&&te(/<[/\w]/g,u.textContent))return Le(u),!0;if(!U[x]||ee[x]){if(!ee[x]&&$n(x)&&(W.tagNameCheck instanceof RegExp&&te(W.tagNameCheck,x)||W.tagNameCheck instanceof Function&&W.tagNameCheck(x)))return!1;if(Ht&&!Je[x]){const z=d(u)||u.parentNode,q=R(u)||u.childNodes;if(q&&z){const se=q.length;for(let G=se-1;G>=0;--G)z.insertBefore(S(q[G],!0),P(u))}}return Le(u),!0}return u instanceof l&&!Co(u)||(x==="noscript"||x==="noembed")&&te(/<\/no(script|embed)/i,u.innerHTML)?(Le(u),!0):(ge&&u.nodeType===3&&(w=u.textContent,w=ce(w,j," "),w=ce(w,oe," "),w=ce(w,Ue," "),u.textContent!==w&&(et(e.removed,{element:u.cloneNode()}),u.textContent=w)),Fe("afterSanitizeElements",u,null),!1)},Un=function(u,w,x){if(Cn&&(w==="id"||w==="name")&&(x in o||x in ko))return!1;if(!(Ae&&!De[w]&&te(pt,w))){if(!(Ie&&te($t,w))){if(!J[w]||De[w]){if(!($n(u)&&(W.tagNameCheck instanceof RegExp&&te(W.tagNameCheck,u)||W.tagNameCheck instanceof Function&&W.tagNameCheck(u))&&(W.attributeNameCheck instanceof RegExp&&te(W.attributeNameCheck,w)||W.attributeNameCheck instanceof Function&&W.attributeNameCheck(w))||w==="is"&&W.allowCustomizedBuiltInElements&&(W.tagNameCheck instanceof RegExp&&te(W.tagNameCheck,x)||W.tagNameCheck instanceof Function&&W.tagNameCheck(x))))return!1}else if(!Jt[w]){if(!te(Z,ce(x,Ve,""))){if(!((w==="src"||w==="xlink:href"||w==="href")&&u!=="script"&&xs(x,"data:")===0&&Rn[u])){if(!($e&&!te(zt,ce(x,Ve,"")))){if(x)return!1}}}}}}return!0},$n=function(u){return u.indexOf("-")>0},zn=function(u){let w,x,z,q;Fe("beforeSanitizeAttributes",u,null);const{attributes:se}=u;if(!se)return;const G={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:J};for(q=se.length;q--;){w=se[q];const{name:be,namespaceURI:qt}=w;if(x=be==="value"?w.value:Fs(w.value),z=Y(be),G.attrName=z,G.attrValue=x,G.keepAttr=!0,G.forceKeepAttr=void 0,Fe("uponSanitizeAttribute",u,G),x=G.attrValue,G.forceKeepAttr||(Yt(be,u),!G.keepAttr))continue;if(!Xe&&te(/\/>/i,x)){Yt(be,u);continue}ge&&(x=ce(x,j," "),x=ce(x,oe," "),x=ce(x,Ue," "));const Hn=Y(u.nodeName);if(Un(Hn,z,x)){if(Tn&&(z==="id"||z==="name")&&(Yt(be,u),x=Do+x),p&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!qt)switch(y.getAttributeType(Hn,z)){case"TrustedHTML":{x=p.createHTML(x);break}case"TrustedScriptURL":{x=p.createScriptURL(x);break}}try{qt?u.setAttributeNS(qt,be,x):u.setAttribute(be,x),cr(e.removed)}catch{}}}Fe("afterSanitizeAttributes",u,null)},So=function k(u){let w;const x=Nn(u);for(Fe("beforeSanitizeShadowDOM",u,null);w=x.nextNode();)Fe("uponSanitizeShadowNode",w,null),!On(w)&&(w.content instanceof a&&k(w.content),zn(w));Fe("afterSanitizeShadowDOM",u,null)};return e.sanitize=function(k){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},w,x,z,q;if(Wt=!k,Wt&&(k="<!-->"),typeof k!="string"&&!yt(k))if(typeof k.toString=="function"){if(k=k.toString(),typeof k!="string")throw tt("dirty is not a string, aborting")}else throw tt("toString is not a function");if(!e.isSupported)return k;if(Qe||jt(u),e.removed=[],typeof k=="string"&&(Ke=!1),Ke){if(k.nodeName){const be=Y(k.nodeName);if(!U[be]||ee[be])throw tt("root node is forbidden and cannot be sanitized in-place")}}else if(k instanceof s)w=Ln("<!---->"),x=w.ownerDocument.importNode(k,!0),x.nodeType===1&&x.nodeName==="BODY"||x.nodeName==="HTML"?w=x:w.appendChild(x);else{if(!ze&&!ge&&!ae&&k.indexOf("<")===-1)return p&&ft?p.createHTML(k):k;if(w=Ln(k),!w)return ze?null:ft?b:""}w&&Pe&&Le(w.firstChild);const se=Nn(Ke?k:w);for(;z=se.nextNode();)On(z)||(z.content instanceof a&&So(z.content),zn(z));if(Ke)return k;if(ze){if(ht)for(q=F.call(w.ownerDocument);w.firstChild;)q.appendChild(w.firstChild);else q=w;return(J.shadowroot||J.shadowrootmod)&&(q=C.call(t,q,!0)),q}let G=ae?w.outerHTML:w.innerHTML;return ae&&U["!doctype"]&&w.ownerDocument&&w.ownerDocument.doctype&&w.ownerDocument.doctype.name&&te(no,w.ownerDocument.doctype.name)&&(G="<!DOCTYPE "+w.ownerDocument.doctype.name+`>
`+G),ge&&(G=ce(G,j," "),G=ce(G,oe," "),G=ce(G,Ue," ")),p&&ft?p.createHTML(G):G},e.setConfig=function(k){jt(k),Qe=!0},e.clearConfig=function(){Ge=null,Qe=!1},e.isValidAttribute=function(k,u,w){Ge||jt({});const x=Y(k),z=Y(u);return Un(x,z,w)},e.addHook=function(k,u){typeof u=="function"&&(L[k]=L[k]||[],et(L[k],u))},e.removeHook=function(k){if(L[k])return cr(L[k])},e.removeHooks=function(k){L[k]&&(L[k]=[])},e.removeAllHooks=function(){L={}},e}var Ls=ro();function oo(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let Oe=oo();function Ns(n){Oe=n}const ao=/[&<>"']/,Os=new RegExp(ao.source,"g"),so=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Us=new RegExp(so.source,"g"),$s={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},gr=n=>$s[n];function X(n,e){if(e){if(ao.test(n))return n.replace(Os,gr)}else if(so.test(n))return n.replace(Us,gr);return n}const zs=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function io(n){return n.replace(zs,(e,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}const Hs=/(^|[^\[])\^/g;function $(n,e){n=typeof n=="string"?n:n.source,e=e||"";const t={replace:(r,o)=>(o=o.source||o,o=o.replace(Hs,"$1"),n=n.replace(r,o),t),getRegex:()=>new RegExp(n,e)};return t}const Js=/[^\w:]/g,Ws=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function br(n,e,t){if(n){let r;try{r=decodeURIComponent(io(t)).replace(Js,"").toLowerCase()}catch{return null}if(r.indexOf("javascript:")===0||r.indexOf("vbscript:")===0||r.indexOf("data:")===0)return null}e&&!Ws.test(t)&&(t=Ys(e,t));try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}const Dt={},Gs=/^[^:]+:\/*[^/]*$/,js=/^([^:]+:)[\s\S]*$/,Zs=/^([^:]+:\/*[^/]*)[\s\S]*$/;function Ys(n,e){Dt[" "+n]||(Gs.test(n)?Dt[" "+n]=n+"/":Dt[" "+n]=At(n,"/",!0)),n=Dt[" "+n];const t=n.indexOf(":")===-1;return e.substring(0,2)==="//"?t?e:n.replace(js,"$1")+e:e.charAt(0)==="/"?t?e:n.replace(Zs,"$1")+e:n+e}const Bt={exec:function(){}};function yr(n,e){const t=n.replace(/\|/g,(a,i,s)=>{let l=!1,c=i;for(;--c>=0&&s[c]==="\\";)l=!l;return l?"|":" |"}),r=t.split(/ \|/);let o=0;if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),r.length>e)r.splice(e);else for(;r.length<e;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(/\\\|/g,"|");return r}function At(n,e,t){const r=n.length;if(r===0)return"";let o=0;for(;o<r;){const a=n.charAt(r-o-1);if(a===e&&!t)o++;else if(a!==e&&t)o++;else break}return n.slice(0,r-o)}function qs(n,e){if(n.indexOf(e[1])===-1)return-1;const t=n.length;let r=0,o=0;for(;o<t;o++)if(n[o]==="\\")o++;else if(n[o]===e[0])r++;else if(n[o]===e[1]&&(r--,r<0))return o;return-1}function Vs(n,e){!n||n.silent||(e&&console.warn("marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async"),(n.sanitize||n.sanitizer)&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"),(n.highlight||n.langPrefix!=="language-")&&console.warn("marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight."),n.mangle&&console.warn("marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`."),n.baseUrl&&console.warn("marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url."),n.smartypants&&console.warn("marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants."),n.xhtml&&console.warn("marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml."),(n.headerIds||n.headerPrefix)&&console.warn("marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`."))}function wr(n,e,t,r){const o=e.href,a=e.title?X(e.title):null,i=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){r.state.inLink=!0;const s={type:"link",raw:t,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,s}return{type:"image",raw:t,href:o,title:a,text:X(i)}}function Xs(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const r=t[1];return e.split(`
`).map(o=>{const a=o.match(/^\s+/);if(a===null)return o;const[i]=a;return i.length>=r.length?o.slice(r.length):o}).join(`
`)}class En{constructor(e){this.options=e||Oe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const r=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:At(r,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const r=t[0],o=Xs(r,t[3]||"");return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:o}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(/#$/.test(r)){const o=At(r,"#");(this.options.pedantic||!o||/ $/.test(o))&&(r=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const r=t[0].replace(/^ *>[ \t]?/gm,""),o=this.lexer.state.top;this.lexer.state.top=!0;const a=this.lexer.blockTokens(r);return this.lexer.state.top=o,{type:"blockquote",raw:t[0],tokens:a,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r,o,a,i,s,l,c,h,f,m,y,_,S=t[1].trim();const P=S.length>1,R={type:"list",raw:"",ordered:P,start:P?+S.slice(0,-1):"",loose:!1,items:[]};S=P?`\\d{1,9}\\${S.slice(-1)}`:`\\${S}`,this.options.pedantic&&(S=P?S:"[*+-]");const d=new RegExp(`^( {0,3}${S})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;e&&(_=!1,!(!(t=d.exec(e))||this.rules.block.hr.test(e)));){if(r=t[0],e=e.substring(r.length),h=t[2].split(`
`,1)[0].replace(/^\t+/,b=>" ".repeat(3*b.length)),f=e.split(`
`,1)[0],this.options.pedantic?(i=2,y=h.trimLeft()):(i=t[2].search(/[^ ]/),i=i>4?1:i,y=h.slice(i),i+=t[1].length),l=!1,!h&&/^ *$/.test(f)&&(r+=f+`
`,e=e.substring(f.length+1),_=!0),!_){const b=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),g=new RegExp(`^ {0,${Math.min(3,i-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),v=new RegExp(`^ {0,${Math.min(3,i-1)}}(?:\`\`\`|~~~)`),F=new RegExp(`^ {0,${Math.min(3,i-1)}}#`);for(;e&&(m=e.split(`
`,1)[0],f=m,this.options.pedantic&&(f=f.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!(v.test(f)||F.test(f)||b.test(f)||g.test(e)));){if(f.search(/[^ ]/)>=i||!f.trim())y+=`
`+f.slice(i);else{if(l||h.search(/[^ ]/)>=4||v.test(h)||F.test(h)||g.test(h))break;y+=`
`+f}!l&&!f.trim()&&(l=!0),r+=m+`
`,e=e.substring(m.length+1),h=f.slice(i)}}R.loose||(c?R.loose=!0:/\n *\n *$/.test(r)&&(c=!0)),this.options.gfm&&(o=/^\[[ xX]\] /.exec(y),o&&(a=o[0]!=="[ ] ",y=y.replace(/^\[[ xX]\] +/,""))),R.items.push({type:"list_item",raw:r,task:!!o,checked:a,loose:!1,text:y}),R.raw+=r}R.items[R.items.length-1].raw=r.trimRight(),R.items[R.items.length-1].text=y.trimRight(),R.raw=R.raw.trimRight();const p=R.items.length;for(s=0;s<p;s++)if(this.lexer.state.top=!1,R.items[s].tokens=this.lexer.blockTokens(R.items[s].text,[]),!R.loose){const b=R.items[s].tokens.filter(v=>v.type==="space"),g=b.length>0&&b.some(v=>/\n.*\n/.test(v.raw));R.loose=g}if(R.loose)for(s=0;s<p;s++)R.items[s].loose=!0;return R}}html(e){const t=this.rules.block.html.exec(e);if(t){const r={type:"html",block:!0,raw:t[0],pre:!this.options.sanitizer&&(t[1]==="pre"||t[1]==="script"||t[1]==="style"),text:t[0]};if(this.options.sanitize){const o=this.options.sanitizer?this.options.sanitizer(t[0]):X(t[0]);r.type="paragraph",r.text=o,r.tokens=this.lexer.inline(o)}return r}}def(e){const t=this.rules.block.def.exec(e);if(t){const r=t[1].toLowerCase().replace(/\s+/g," "),o=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",a=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:o,title:a}}}table(e){const t=this.rules.block.table.exec(e);if(t){const r={type:"table",header:yr(t[1]).map(o=>({text:o})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(r.header.length===r.align.length){r.raw=t[0];let o=r.align.length,a,i,s,l;for(a=0;a<o;a++)/^ *-+: *$/.test(r.align[a])?r.align[a]="right":/^ *:-+: *$/.test(r.align[a])?r.align[a]="center":/^ *:-+ *$/.test(r.align[a])?r.align[a]="left":r.align[a]=null;for(o=r.rows.length,a=0;a<o;a++)r.rows[a]=yr(r.rows[a],r.header.length).map(c=>({text:c}));for(o=r.header.length,i=0;i<o;i++)r.header[i].tokens=this.lexer.inline(r.header[i].text);for(o=r.rows.length,i=0;i<o;i++)for(l=r.rows[i],s=0;s<l.length;s++)l[s].tokens=this.lexer.inline(l[s].text);return r}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:X(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):X(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const r=t[2].trim();if(!this.options.pedantic&&/^</.test(r)){if(!/>$/.test(r))return;const i=At(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{const i=qs(t[2],"()");if(i>-1){const l=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let o=t[2],a="";if(this.options.pedantic){const i=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);i&&(o=i[1],a=i[3])}else a=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(this.options.pedantic&&!/>$/.test(r)?o=o.slice(1):o=o.slice(1,-1)),wr(t,{href:o&&o.replace(this.rules.inline._escapes,"$1"),title:a&&a.replace(this.rules.inline._escapes,"$1")},t[0],this.lexer)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let o=(r[2]||r[1]).replace(/\s+/g," ");if(o=t[o.toLowerCase()],!o){const a=r[0].charAt(0);return{type:"text",raw:a,text:a}}return wr(r,o,r[0],this.lexer)}}emStrong(e,t,r=""){let o=this.rules.inline.emStrong.lDelim.exec(e);if(!o||o[3]&&r.match(/[\p{L}\p{N}]/u))return;const a=o[1]||o[2]||"";if(!a||a&&(r===""||this.rules.inline.punctuation.exec(r))){const i=o[0].length-1;let s,l,c=i,h=0;const f=o[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(f.lastIndex=0,t=t.slice(-1*e.length+i);(o=f.exec(t))!=null;){if(s=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!s)continue;if(l=s.length,o[3]||o[4]){c+=l;continue}else if((o[5]||o[6])&&i%3&&!((i+l)%3)){h+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+h);const m=e.slice(0,i+o.index+l+1);if(Math.min(i,l)%2){const _=m.slice(1,-1);return{type:"em",raw:m,text:_,tokens:this.lexer.inlineTokens(_)}}const y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(/\n/g," ");const o=/[^ ]/.test(r),a=/^ /.test(r)&&/ $/.test(r);return o&&a&&(r=r.substring(1,r.length-1)),r=X(r,!0),{type:"codespan",raw:t[0],text:r}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e,t){const r=this.rules.inline.autolink.exec(e);if(r){let o,a;return r[2]==="@"?(o=X(this.options.mangle?t(r[1]):r[1]),a="mailto:"+o):(o=X(r[1]),a=o),{type:"link",raw:r[0],text:o,href:a,tokens:[{type:"text",raw:o,text:o}]}}}url(e,t){let r;if(r=this.rules.inline.url.exec(e)){let o,a;if(r[2]==="@")o=X(this.options.mangle?t(r[0]):r[0]),a="mailto:"+o;else{let i;do i=r[0],r[0]=this.rules.inline._backpedal.exec(r[0])[0];while(i!==r[0]);o=X(r[0]),r[1]==="www."?a="http://"+r[0]:a=r[0]}return{type:"link",raw:r[0],text:o,href:a,tokens:[{type:"text",raw:o,text:o}]}}}inlineText(e,t){const r=this.rules.inline.text.exec(e);if(r){let o;return this.lexer.state.inRawBlock?o=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(r[0]):X(r[0]):r[0]:o=X(this.options.smartypants?t(r[0]):r[0]),{type:"text",raw:r[0],text:o}}}}const A={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Bt,lheading:/^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};A._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;A._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;A.def=$(A.def).replace("label",A._label).replace("title",A._title).getRegex();A.bullet=/(?:[*+-]|\d{1,9}[.)])/;A.listItemStart=$(/^( *)(bull) */).replace("bull",A.bullet).getRegex();A.list=$(A.list).replace(/bull/g,A.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+A.def.source+")").getRegex();A._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";A._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;A.html=$(A.html,"i").replace("comment",A._comment).replace("tag",A._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();A.lheading=$(A.lheading).replace(/bull/g,A.bullet).getRegex();A.paragraph=$(A._paragraph).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.blockquote=$(A.blockquote).replace("paragraph",A.paragraph).getRegex();A.normal={...A};A.gfm={...A.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"};A.gfm.table=$(A.gfm.table).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.gfm.paragraph=$(A._paragraph).replace("hr",A.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",A.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",A._tag).getRegex();A.pedantic={...A.normal,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",A._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Bt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(A.normal._paragraph).replace("hr",A.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",A.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const D={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Bt,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Bt,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};D._uc_punctuation="\\u00A1\\u00A7\\u00AB\\u00B6\\u00B7\\u00BB\\u00BF\\u037E\\u0387\\u055A-\\u055F\\u0589\\u058A\\u05BE\\u05C0\\u05C3\\u05C6\\u05F3\\u05F4\\u0609\\u060A\\u060C\\u060D\\u061B\\u061E\\u061F\\u066A-\\u066D\\u06D4\\u0700-\\u070D\\u07F7-\\u07F9\\u0830-\\u083E\\u085E\\u0964\\u0965\\u0970\\u0AF0\\u0DF4\\u0E4F\\u0E5A\\u0E5B\\u0F04-\\u0F12\\u0F14\\u0F3A-\\u0F3D\\u0F85\\u0FD0-\\u0FD4\\u0FD9\\u0FDA\\u104A-\\u104F\\u10FB\\u1360-\\u1368\\u1400\\u166D\\u166E\\u169B\\u169C\\u16EB-\\u16ED\\u1735\\u1736\\u17D4-\\u17D6\\u17D8-\\u17DA\\u1800-\\u180A\\u1944\\u1945\\u1A1E\\u1A1F\\u1AA0-\\u1AA6\\u1AA8-\\u1AAD\\u1B5A-\\u1B60\\u1BFC-\\u1BFF\\u1C3B-\\u1C3F\\u1C7E\\u1C7F\\u1CC0-\\u1CC7\\u1CD3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205E\\u207D\\u207E\\u208D\\u208E\\u2308-\\u230B\\u2329\\u232A\\u2768-\\u2775\\u27C5\\u27C6\\u27E6-\\u27EF\\u2983-\\u2998\\u29D8-\\u29DB\\u29FC\\u29FD\\u2CF9-\\u2CFC\\u2CFE\\u2CFF\\u2D70\\u2E00-\\u2E2E\\u2E30-\\u2E42\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301F\\u3030\\u303D\\u30A0\\u30FB\\uA4FE\\uA4FF\\uA60D-\\uA60F\\uA673\\uA67E\\uA6F2-\\uA6F7\\uA874-\\uA877\\uA8CE\\uA8CF\\uA8F8-\\uA8FA\\uA8FC\\uA92E\\uA92F\\uA95F\\uA9C1-\\uA9CD\\uA9DE\\uA9DF\\uAA5C-\\uAA5F\\uAADE\\uAADF\\uAAF0\\uAAF1\\uABEB\\uFD3E\\uFD3F\\uFE10-\\uFE19\\uFE30-\\uFE52\\uFE54-\\uFE61\\uFE63\\uFE68\\uFE6A\\uFE6B\\uFF01-\\uFF03\\uFF05-\\uFF0A\\uFF0C-\\uFF0F\\uFF1A\\uFF1B\\uFF1F\\uFF20\\uFF3B-\\uFF3D\\uFF3F\\uFF5B\\uFF5D\\uFF5F-\\uFF65";D._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~\\\\"+D._uc_punctuation;D.punctuation=$(D.punctuation).replace(/punctuation/g,D._punctuation).getRegex();D.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;D.escapedPunct=/\\[punct_*]/g;D._comment=$(A._comment).replace("(?:-->|$)","-->").getRegex();D.emStrong.lDelim=$(D.emStrong.lDelim).replace(/punct/g,D._punctuation).getRegex();D.emStrong.rDelimAst=$(D.emStrong.rDelimAst,"g").replace(/punct/g,D._punctuation).getRegex();D.emStrong.rDelimUnd=$(D.emStrong.rDelimUnd,"g").replace(/punct/g,D._punctuation).getRegex();D.escapedPunct=$(D.escapedPunct,"g").replace(/punct/g,D._punctuation).getRegex();D._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;D._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;D._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;D.autolink=$(D.autolink).replace("scheme",D._scheme).replace("email",D._email).getRegex();D._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;D.tag=$(D.tag).replace("comment",D._comment).replace("attribute",D._attribute).getRegex();D._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;D._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;D._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;D.link=$(D.link).replace("label",D._label).replace("href",D._href).replace("title",D._title).getRegex();D.reflink=$(D.reflink).replace("label",D._label).replace("ref",A._label).getRegex();D.nolink=$(D.nolink).replace("ref",A._label).getRegex();D.reflinkSearch=$(D.reflinkSearch,"g").replace("reflink",D.reflink).replace("nolink",D.nolink).getRegex();D.normal={...D};D.pedantic={...D.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",D._label).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",D._label).getRegex()};D.gfm={...D.normal,escape:$(D.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/};D.gfm.url=$(D.gfm.url,"i").replace("email",D.gfm._extended_email).getRegex();D.breaks={...D.gfm,br:$(D.br).replace("{2,}","*").getRegex(),text:$(D.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};function Qs(n){return n.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function vr(n){let e="",t,r;const o=n.length;for(t=0;t<o;t++)r=n.charCodeAt(t),Math.random()>.5&&(r="x"+r.toString(16)),e+="&#"+r+";";return e}class Be{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Oe,this.options.tokenizer=this.options.tokenizer||new En,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:A.normal,inline:D.normal};this.options.pedantic?(t.block=A.pedantic,t.inline=D.pedantic):this.options.gfm&&(t.block=A.gfm,this.options.breaks?t.inline=D.breaks:t.inline=D.gfm),this.tokenizer.rules=t}static get rules(){return{block:A,inline:D}}static lex(e,t){return new Be(t).lex(e)}static lexInline(e,t){return new Be(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);let t;for(;t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){this.options.pedantic?e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e=e.replace(/^( *)(\t+)/gm,(s,l,c)=>l+"    ".repeat(c.length));let r,o,a,i;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(s=>(r=s.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+r.raw,o.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),o=t[t.length-1],o&&(o.type==="paragraph"||o.type==="text")?(o.raw+=`
`+r.raw,o.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=o.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(a=e,this.options.extensions&&this.options.extensions.startBlock){let s=1/0;const l=e.slice(1);let c;this.options.extensions.startBlock.forEach(function(h){c=h.call({lexer:this},l),typeof c=="number"&&c>=0&&(s=Math.min(s,c))}),s<1/0&&s>=0&&(a=e.substring(0,s+1))}if(this.state.top&&(r=this.tokenizer.paragraph(a))){o=t[t.length-1],i&&o.type==="paragraph"?(o.raw+=`
`+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(r),i=a.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),o=t[t.length-1],o&&o.type==="text"?(o.raw+=`
`+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=o.text):t.push(r);continue}if(e){const s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let r,o,a,i=e,s,l,c;if(this.tokens.links){const h=Object.keys(this.tokens.links);if(h.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)h.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.escapedPunct.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.escapedPunct.lastIndex);for(;e;)if(l||(c=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(h=>(r=h.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))){if(r=this.tokenizer.escape(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.tag(e)){e=e.substring(r.raw.length),o=t[t.length-1],o&&r.type==="text"&&o.type==="text"?(o.raw+=r.raw,o.text+=r.text):t.push(r);continue}if(r=this.tokenizer.link(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(r.raw.length),o=t[t.length-1],o&&r.type==="text"&&o.type==="text"?(o.raw+=r.raw,o.text+=r.text):t.push(r);continue}if(r=this.tokenizer.emStrong(e,i,c)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.codespan(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.br(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.del(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.autolink(e,vr)){e=e.substring(r.raw.length),t.push(r);continue}if(!this.state.inLink&&(r=this.tokenizer.url(e,vr))){e=e.substring(r.raw.length),t.push(r);continue}if(a=e,this.options.extensions&&this.options.extensions.startInline){let h=1/0;const f=e.slice(1);let m;this.options.extensions.startInline.forEach(function(y){m=y.call({lexer:this},f),typeof m=="number"&&m>=0&&(h=Math.min(h,m))}),h<1/0&&h>=0&&(a=e.substring(0,h+1))}if(r=this.tokenizer.inlineText(a,Qs)){e=e.substring(r.raw.length),r.raw.slice(-1)!=="_"&&(c=r.raw.slice(-1)),l=!0,o=t[t.length-1],o&&o.type==="text"?(o.raw+=r.raw,o.text+=r.text):t.push(r);continue}if(e){const h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return t}}class kn{constructor(e){this.options=e||Oe}code(e,t,r){const o=(t||"").match(/\S*/)[0];if(this.options.highlight){const a=this.options.highlight(e,o);a!=null&&a!==e&&(r=!0,e=a)}return e=e.replace(/\n$/,"")+`
`,o?'<pre><code class="'+this.options.langPrefix+X(o)+'">'+(r?e:X(e,!0))+`</code></pre>
`:"<pre><code>"+(r?e:X(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
${e}</blockquote>
`}html(e,t){return e}heading(e,t,r,o){if(this.options.headerIds){const a=this.options.headerPrefix+o.slug(r);return`<h${t} id="${a}">${e}</h${t}>
`}return`<h${t}>${e}</h${t}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,t,r){const o=t?"ol":"ul",a=t&&r!==1?' start="'+r+'"':"";return"<"+o+a+`>
`+e+"</"+o+`>
`}listitem(e){return`<li>${e}</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return`<p>${e}</p>
`}table(e,t){return t&&(t=`<tbody>${t}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
${e}</tr>
`}tablecell(e,t){const r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return`<del>${e}</del>`}link(e,t,r){if(e=br(this.options.sanitize,this.options.baseUrl,e),e===null)return r;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+r+"</a>",o}image(e,t,r){if(e=br(this.options.sanitize,this.options.baseUrl,e),e===null)return r;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${t}"`),o+=this.options.xhtml?"/>":">",o}text(e){return e}}class lo{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,r){return""+r}image(e,t,r){return""+r}br(){return""}}class uo{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let r=e,o=0;if(this.seen.hasOwnProperty(r)){o=this.seen[e];do o++,r=e+"-"+o;while(this.seen.hasOwnProperty(r))}return t||(this.seen[e]=o,this.seen[r]=0),r}slug(e,t={}){const r=this.serialize(e);return this.getNextSafeSlug(r,t.dryrun)}}class _e{constructor(e){this.options=e||Oe,this.options.renderer=this.options.renderer||new kn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new lo,this.slugger=new uo}static parse(e,t){return new _e(t).parse(e)}static parseInline(e,t){return new _e(t).parseInline(e)}parse(e,t=!0){let r="",o,a,i,s,l,c,h,f,m,y,_,S,P,R,d,p,b,g,v;const F=e.length;for(o=0;o<F;o++){if(y=e[o],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[y.type]&&(v=this.options.extensions.renderers[y.type].call({parser:this},y),v!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(y.type))){r+=v||"";continue}switch(y.type){case"space":continue;case"hr":{r+=this.renderer.hr();continue}case"heading":{r+=this.renderer.heading(this.parseInline(y.tokens),y.depth,io(this.parseInline(y.tokens,this.textRenderer)),this.slugger);continue}case"code":{r+=this.renderer.code(y.text,y.lang,y.escaped);continue}case"table":{for(f="",h="",s=y.header.length,a=0;a<s;a++)h+=this.renderer.tablecell(this.parseInline(y.header[a].tokens),{header:!0,align:y.align[a]});for(f+=this.renderer.tablerow(h),m="",s=y.rows.length,a=0;a<s;a++){for(c=y.rows[a],h="",l=c.length,i=0;i<l;i++)h+=this.renderer.tablecell(this.parseInline(c[i].tokens),{header:!1,align:y.align[i]});m+=this.renderer.tablerow(h)}r+=this.renderer.table(f,m);continue}case"blockquote":{m=this.parse(y.tokens),r+=this.renderer.blockquote(m);continue}case"list":{for(_=y.ordered,S=y.start,P=y.loose,s=y.items.length,m="",a=0;a<s;a++)d=y.items[a],p=d.checked,b=d.task,R="",d.task&&(g=this.renderer.checkbox(p),P?d.tokens.length>0&&d.tokens[0].type==="paragraph"?(d.tokens[0].text=g+" "+d.tokens[0].text,d.tokens[0].tokens&&d.tokens[0].tokens.length>0&&d.tokens[0].tokens[0].type==="text"&&(d.tokens[0].tokens[0].text=g+" "+d.tokens[0].tokens[0].text)):d.tokens.unshift({type:"text",text:g}):R+=g),R+=this.parse(d.tokens,P),m+=this.renderer.listitem(R,b,p);r+=this.renderer.list(m,_,S);continue}case"html":{r+=this.renderer.html(y.text,y.block);continue}case"paragraph":{r+=this.renderer.paragraph(this.parseInline(y.tokens));continue}case"text":{for(m=y.tokens?this.parseInline(y.tokens):y.text;o+1<F&&e[o+1].type==="text";)y=e[++o],m+=`
`+(y.tokens?this.parseInline(y.tokens):y.text);r+=t?this.renderer.paragraph(m):m;continue}default:{const M='Token with "'+y.type+'" type was not found.';if(this.options.silent){console.error(M);return}else throw new Error(M)}}}return r}parseInline(e,t){t=t||this.renderer;let r="",o,a,i;const s=e.length;for(o=0;o<s;o++){if(a=e[o],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[a.type]&&(i=this.options.extensions.renderers[a.type].call({parser:this},a),i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type))){r+=i||"";continue}switch(a.type){case"escape":{r+=t.text(a.text);break}case"html":{r+=t.html(a.text);break}case"link":{r+=t.link(a.href,a.title,this.parseInline(a.tokens,t));break}case"image":{r+=t.image(a.href,a.title,a.text);break}case"strong":{r+=t.strong(this.parseInline(a.tokens,t));break}case"em":{r+=t.em(this.parseInline(a.tokens,t));break}case"codespan":{r+=t.codespan(a.text);break}case"br":{r+=t.br();break}case"del":{r+=t.del(this.parseInline(a.tokens,t));break}case"text":{r+=t.text(a.text);break}default:{const l='Token with "'+a.type+'" type was not found.';if(this.options.silent){console.error(l);return}else throw new Error(l)}}}return r}}class _t{constructor(e){this.options=e||Oe}preprocess(e){return e}postprocess(e){return e}}Jn(_t,"passThroughHooks",new Set(["preprocess","postprocess"]));function Ks(n,e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,n){const o="<p>An error occurred:</p><pre>"+X(r.message+"",!0)+"</pre>";if(e)return Promise.resolve(o);if(t){t(null,o);return}return o}if(e)return Promise.reject(r);if(t){t(r);return}throw r}}function co(n,e){return(t,r,o)=>{typeof r=="function"&&(o=r,r=null);const a={...r};r={...T.defaults,...a};const i=Ks(r.silent,r.async,o);if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(Vs(r,o),r.hooks&&(r.hooks.options=r),o){const s=r.highlight;let l;try{r.hooks&&(t=r.hooks.preprocess(t)),l=n(t,r)}catch(f){return i(f)}const c=function(f){let m;if(!f)try{r.walkTokens&&T.walkTokens(l,r.walkTokens),m=e(l,r),r.hooks&&(m=r.hooks.postprocess(m))}catch(y){f=y}return r.highlight=s,f?i(f):o(null,m)};if(!s||s.length<3||(delete r.highlight,!l.length))return c();let h=0;T.walkTokens(l,function(f){f.type==="code"&&(h++,setTimeout(()=>{s(f.text,f.lang,function(m,y){if(m)return c(m);y!=null&&y!==f.text&&(f.text=y,f.escaped=!0),h--,h===0&&c()})},0))}),h===0&&c();return}if(r.async)return Promise.resolve(r.hooks?r.hooks.preprocess(t):t).then(s=>n(s,r)).then(s=>r.walkTokens?Promise.all(T.walkTokens(s,r.walkTokens)).then(()=>s):s).then(s=>e(s,r)).then(s=>r.hooks?r.hooks.postprocess(s):s).catch(i);try{r.hooks&&(t=r.hooks.preprocess(t));const s=n(t,r);r.walkTokens&&T.walkTokens(s,r.walkTokens);let l=e(s,r);return r.hooks&&(l=r.hooks.postprocess(l)),l}catch(s){return i(s)}}}function T(n,e,t){return co(Be.lex,_e.parse)(n,e,t)}T.options=T.setOptions=function(n){return T.defaults={...T.defaults,...n},Ns(T.defaults),T};T.getDefaults=oo;T.defaults=Oe;T.use=function(...n){const e=T.defaults.extensions||{renderers:{},childTokens:{}};n.forEach(t=>{const r={...t};if(r.async=T.defaults.async||r.async||!1,t.extensions&&(t.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if(o.renderer){const a=e.renderers[o.name];a?e.renderers[o.name]=function(...i){let s=o.renderer.apply(this,i);return s===!1&&(s=a.apply(this,i)),s}:e.renderers[o.name]=o.renderer}if(o.tokenizer){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");e[o.level]?e[o.level].unshift(o.tokenizer):e[o.level]=[o.tokenizer],o.start&&(o.level==="block"?e.startBlock?e.startBlock.push(o.start):e.startBlock=[o.start]:o.level==="inline"&&(e.startInline?e.startInline.push(o.start):e.startInline=[o.start]))}o.childTokens&&(e.childTokens[o.name]=o.childTokens)}),r.extensions=e),t.renderer){const o=T.defaults.renderer||new kn;for(const a in t.renderer){const i=o[a];o[a]=(...s)=>{let l=t.renderer[a].apply(o,s);return l===!1&&(l=i.apply(o,s)),l}}r.renderer=o}if(t.tokenizer){const o=T.defaults.tokenizer||new En;for(const a in t.tokenizer){const i=o[a];o[a]=(...s)=>{let l=t.tokenizer[a].apply(o,s);return l===!1&&(l=i.apply(o,s)),l}}r.tokenizer=o}if(t.hooks){const o=T.defaults.hooks||new _t;for(const a in t.hooks){const i=o[a];_t.passThroughHooks.has(a)?o[a]=s=>{if(T.defaults.async)return Promise.resolve(t.hooks[a].call(o,s)).then(c=>i.call(o,c));const l=t.hooks[a].call(o,s);return i.call(o,l)}:o[a]=(...s)=>{let l=t.hooks[a].apply(o,s);return l===!1&&(l=i.apply(o,s)),l}}r.hooks=o}if(t.walkTokens){const o=T.defaults.walkTokens;r.walkTokens=function(a){let i=[];return i.push(t.walkTokens.call(this,a)),o&&(i=i.concat(o.call(this,a))),i}}T.setOptions(r)})};T.walkTokens=function(n,e){let t=[];for(const r of n)switch(t=t.concat(e.call(T,r)),r.type){case"table":{for(const o of r.header)t=t.concat(T.walkTokens(o.tokens,e));for(const o of r.rows)for(const a of o)t=t.concat(T.walkTokens(a.tokens,e));break}case"list":{t=t.concat(T.walkTokens(r.items,e));break}default:T.defaults.extensions&&T.defaults.extensions.childTokens&&T.defaults.extensions.childTokens[r.type]?T.defaults.extensions.childTokens[r.type].forEach(function(o){t=t.concat(T.walkTokens(r[o],e))}):r.tokens&&(t=t.concat(T.walkTokens(r.tokens,e)))}return t};T.parseInline=co(Be.lexInline,_e.parseInline);T.Parser=_e;T.parser=_e.parse;T.Renderer=kn;T.TextRenderer=lo;T.Lexer=Be;T.lexer=Be.lex;T.Tokenizer=En;T.Slugger=uo;T.Hooks=_t;T.parse=T;T.options;T.setOptions;T.use;T.walkTokens;T.parseInline;_e.parse;Be.lex;const ei=/[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g,ti=Object.hasOwnProperty;class ni{constructor(){this.occurrences,this.reset()}slug(e,t){const r=this;let o=ri(e,t===!0);const a=o;for(;ti.call(r.occurrences,o);)r.occurrences[a]++,o=a+"-"+r.occurrences[a];return r.occurrences[o]=0,o}reset(){this.occurrences=Object.create(null)}}function ri(n,e){return typeof n!="string"?"":(e||(n=n.toLowerCase()),n.replace(ei,"").replace(/ /g,"-"))}let Dr;function oi({prefix:n=""}={}){return{headerIds:!1,hooks:{preprocess(e){return Dr=new ni,e}},renderer:{heading(e,t,r){return r=r.toLowerCase().trim().replace(/<[!\/a-z].*?>/ig,""),`<h${t} id="${n}${Dr.slug(r)}">${e}</h${t}>
`}}}}function ai(){return{mangle:!1,walkTokens(n){if(n.type!=="link"||!n.href.startsWith("mailto:"))return;const e=n.href.substring(7),t=si(e);n.href=`mailto:${t}`,!(n.tokens.length!==1||n.tokens[0].type!=="text"||n.tokens[0].text!==e)&&(n.text=t,n.tokens[0].text=t)}}}function si(n){let e="",t,r;const o=n.length;for(t=0;t<o;t++)r=n.charCodeAt(t),Math.random()>.5&&(r="x"+r.toString(16)),e+="&#"+r+";";return e}var po={exports:{}};(function(n){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(r){var o=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,a=0,i={},s={manual:r.Prism&&r.Prism.manual,disableWorkerMessageHandler:r.Prism&&r.Prism.disableWorkerMessageHandler,util:{encode:function d(p){return p instanceof l?new l(p.type,d(p.content),p.alias):Array.isArray(p)?p.map(d):p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(d){return Object.prototype.toString.call(d).slice(8,-1)},objId:function(d){return d.__id||Object.defineProperty(d,"__id",{value:++a}),d.__id},clone:function d(p,b){b=b||{};var g,v;switch(s.util.type(p)){case"Object":if(v=s.util.objId(p),b[v])return b[v];g={},b[v]=g;for(var F in p)p.hasOwnProperty(F)&&(g[F]=d(p[F],b));return g;case"Array":return v=s.util.objId(p),b[v]?b[v]:(g=[],b[v]=g,p.forEach(function(M,C){g[C]=d(M,b)}),g);default:return p}},getLanguage:function(d){for(;d;){var p=o.exec(d.className);if(p)return p[1].toLowerCase();d=d.parentElement}return"none"},setLanguage:function(d,p){d.className=d.className.replace(RegExp(o,"gi"),""),d.classList.add("language-"+p)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(g){var d=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(d){var p=document.getElementsByTagName("script");for(var b in p)if(p[b].src==d)return p[b]}return null}},isActive:function(d,p,b){for(var g="no-"+p;d;){var v=d.classList;if(v.contains(p))return!0;if(v.contains(g))return!1;d=d.parentElement}return!!b}},languages:{plain:i,plaintext:i,text:i,txt:i,extend:function(d,p){var b=s.util.clone(s.languages[d]);for(var g in p)b[g]=p[g];return b},insertBefore:function(d,p,b,g){g=g||s.languages;var v=g[d],F={};for(var M in v)if(v.hasOwnProperty(M)){if(M==p)for(var C in b)b.hasOwnProperty(C)&&(F[C]=b[C]);b.hasOwnProperty(M)||(F[M]=v[M])}var L=g[d];return g[d]=F,s.languages.DFS(s.languages,function(j,oe){oe===L&&j!=d&&(this[j]=F)}),F},DFS:function d(p,b,g,v){v=v||{};var F=s.util.objId;for(var M in p)if(p.hasOwnProperty(M)){b.call(p,M,p[M],g||M);var C=p[M],L=s.util.type(C);L==="Object"&&!v[F(C)]?(v[F(C)]=!0,d(C,b,null,v)):L==="Array"&&!v[F(C)]&&(v[F(C)]=!0,d(C,b,M,v))}}},plugins:{},highlightAll:function(d,p){s.highlightAllUnder(document,d,p)},highlightAllUnder:function(d,p,b){var g={callback:b,container:d,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};s.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),s.hooks.run("before-all-elements-highlight",g);for(var v=0,F;F=g.elements[v++];)s.highlightElement(F,p===!0,g.callback)},highlightElement:function(d,p,b){var g=s.util.getLanguage(d),v=s.languages[g];s.util.setLanguage(d,g);var F=d.parentElement;F&&F.nodeName.toLowerCase()==="pre"&&s.util.setLanguage(F,g);var M=d.textContent,C={element:d,language:g,grammar:v,code:M};function L(oe){C.highlightedCode=oe,s.hooks.run("before-insert",C),C.element.innerHTML=C.highlightedCode,s.hooks.run("after-highlight",C),s.hooks.run("complete",C),b&&b.call(C.element)}if(s.hooks.run("before-sanity-check",C),F=C.element.parentElement,F&&F.nodeName.toLowerCase()==="pre"&&!F.hasAttribute("tabindex")&&F.setAttribute("tabindex","0"),!C.code){s.hooks.run("complete",C),b&&b.call(C.element);return}if(s.hooks.run("before-highlight",C),!C.grammar){L(s.util.encode(C.code));return}if(p&&r.Worker){var j=new Worker(s.filename);j.onmessage=function(oe){L(oe.data)},j.postMessage(JSON.stringify({language:C.language,code:C.code,immediateClose:!0}))}else L(s.highlight(C.code,C.grammar,C.language))},highlight:function(d,p,b){var g={code:d,grammar:p,language:b};if(s.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=s.tokenize(g.code,g.grammar),s.hooks.run("after-tokenize",g),l.stringify(s.util.encode(g.tokens),g.language)},tokenize:function(d,p){var b=p.rest;if(b){for(var g in b)p[g]=b[g];delete p.rest}var v=new f;return m(v,v.head,d),h(d,v,p,v.head,0),_(v)},hooks:{all:{},add:function(d,p){var b=s.hooks.all;b[d]=b[d]||[],b[d].push(p)},run:function(d,p){var b=s.hooks.all[d];if(!(!b||!b.length))for(var g=0,v;v=b[g++];)v(p)}},Token:l};r.Prism=s;function l(d,p,b,g){this.type=d,this.content=p,this.alias=b,this.length=(g||"").length|0}l.stringify=function d(p,b){if(typeof p=="string")return p;if(Array.isArray(p)){var g="";return p.forEach(function(L){g+=d(L,b)}),g}var v={type:p.type,content:d(p.content,b),tag:"span",classes:["token",p.type],attributes:{},language:b},F=p.alias;F&&(Array.isArray(F)?Array.prototype.push.apply(v.classes,F):v.classes.push(F)),s.hooks.run("wrap",v);var M="";for(var C in v.attributes)M+=" "+C+'="'+(v.attributes[C]||"").replace(/"/g,"&quot;")+'"';return"<"+v.tag+' class="'+v.classes.join(" ")+'"'+M+">"+v.content+"</"+v.tag+">"};function c(d,p,b,g){d.lastIndex=p;var v=d.exec(b);if(v&&g&&v[1]){var F=v[1].length;v.index+=F,v[0]=v[0].slice(F)}return v}function h(d,p,b,g,v,F){for(var M in b)if(!(!b.hasOwnProperty(M)||!b[M])){var C=b[M];C=Array.isArray(C)?C:[C];for(var L=0;L<C.length;++L){if(F&&F.cause==M+","+L)return;var j=C[L],oe=j.inside,Ue=!!j.lookbehind,pt=!!j.greedy,$t=j.alias;if(pt&&!j.pattern.global){var zt=j.pattern.toString().match(/[imsuy]*$/)[0];j.pattern=RegExp(j.pattern.source,zt+"g")}for(var Ve=j.pattern||j,Z=g.next,U=v;Z!==p.tail&&!(F&&U>=F.reach);U+=Z.value.length,Z=Z.next){var ve=Z.value;if(p.length>d.length)return;if(!(ve instanceof l)){var J=1,K;if(pt){if(K=c(Ve,U,d,Ue),!K||K.index>=d.length)break;var Ie=K.index,W=K.index+K[0].length,ee=U;for(ee+=Z.value.length;Ie>=ee;)Z=Z.next,ee+=Z.value.length;if(ee-=Z.value.length,U=ee,Z.value instanceof l)continue;for(var De=Z;De!==p.tail&&(ee<W||typeof De.value=="string");De=De.next)J++,ee+=De.value.length;J--,ve=d.slice(U,ee),K.index-=U}else if(K=c(Ve,0,ve,Ue),!K)continue;var Ie=K.index,Ae=K[0],$e=ve.slice(0,Ie),Xe=ve.slice(Ie+Ae.length),ge=U+ve.length;F&&ge>F.reach&&(F.reach=ge);var ae=Z.prev;$e&&(ae=m(p,ae,$e),U+=$e.length),y(p,ae,J);var Qe=new l(M,oe?s.tokenize(Ae,oe):Ae,$t,Ae);if(Z=m(p,ae,Qe),Xe&&m(p,Z,Xe),J>1){var Pe={cause:M+","+L,reach:ge};h(d,p,b,Z.prev,U,Pe),F&&Pe.reach>F.reach&&(F.reach=Pe.reach)}}}}}}function f(){var d={value:null,prev:null,next:null},p={value:null,prev:d,next:null};d.next=p,this.head=d,this.tail=p,this.length=0}function m(d,p,b){var g=p.next,v={value:b,prev:p,next:g};return p.next=v,g.prev=v,d.length++,v}function y(d,p,b){for(var g=p.next,v=0;v<b&&g!==d.tail;v++)g=g.next;p.next=g,g.prev=p,d.length-=v}function _(d){for(var p=[],b=d.head.next;b!==d.tail;)p.push(b.value),b=b.next;return p}if(!r.document)return r.addEventListener&&(s.disableWorkerMessageHandler||r.addEventListener("message",function(d){var p=JSON.parse(d.data),b=p.language,g=p.code,v=p.immediateClose;r.postMessage(s.highlight(g,s.languages[b],b)),v&&r.close()},!1)),s;var S=s.util.currentScript();S&&(s.filename=S.src,S.hasAttribute("data-manual")&&(s.manual=!0));function P(){s.manual||s.highlightAll()}if(!s.manual){var R=document.readyState;R==="loading"||R==="interactive"&&S&&S.defer?document.addEventListener("DOMContentLoaded",P):window.requestAnimationFrame?window.requestAnimationFrame(P):window.setTimeout(P,16)}return s}(e);n.exports&&(n.exports=t),typeof nr<"u"&&(nr.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(r){r.type==="entity"&&(r.attributes.title=r.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(o,a){var i={};i["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[a]},i.cdata=/^<!\[CDATA\[|\]\]>$/i;var s={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:i}};s["language-"+a]={pattern:/[\s\S]+/,inside:t.languages[a]};var l={};l[o]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return o}),"i"),lookbehind:!0,greedy:!0,inside:s},t.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(r,o){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+r+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[o,"language-"+o],inside:t.languages[o]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(r){var o=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;r.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+o.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+o.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+o.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+o.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:o,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},r.languages.css.atrule.inside.rest=r.languages.css;var a=r.languages.markup;a&&(a.tag.addInlined("style","css"),a.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var r="Loading…",o=function(S,P){return"✖ Error "+S+" while fetching file: "+P},a="✖ Error: File does not exist or is empty",i={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},s="data-src-status",l="loading",c="loaded",h="failed",f="pre[data-src]:not(["+s+'="'+c+'"]):not(['+s+'="'+l+'"])';function m(S,P,R){var d=new XMLHttpRequest;d.open("GET",S,!0),d.onreadystatechange=function(){d.readyState==4&&(d.status<400&&d.responseText?P(d.responseText):d.status>=400?R(o(d.status,d.statusText)):R(a))},d.send(null)}function y(S){var P=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S||"");if(P){var R=Number(P[1]),d=P[2],p=P[3];return d?p?[R,Number(p)]:[R,void 0]:[R,R]}}t.hooks.add("before-highlightall",function(S){S.selector+=", "+f}),t.hooks.add("before-sanity-check",function(S){var P=S.element;if(P.matches(f)){S.code="",P.setAttribute(s,l);var R=P.appendChild(document.createElement("CODE"));R.textContent=r;var d=P.getAttribute("data-src"),p=S.language;if(p==="none"){var b=(/\.(\w+)$/.exec(d)||[,"none"])[1];p=i[b]||b}t.util.setLanguage(R,p),t.util.setLanguage(P,p);var g=t.plugins.autoloader;g&&g.loadLanguages(p),m(d,function(v){P.setAttribute(s,c);var F=y(P.getAttribute("data-range"));if(F){var M=v.split(/\r\n?|\n/g),C=F[0],L=F[1]==null?M.length:F[1];C<0&&(C+=M.length),C=Math.max(0,Math.min(C-1,M.length)),L<0&&(L+=M.length),L=Math.max(0,Math.min(L,M.length)),v=M.slice(C,L).join(`
`),P.hasAttribute("data-start")||P.setAttribute("data-start",String(C+1))}R.textContent=v,t.highlightElement(R)},function(v){P.setAttribute(s,h),R.textContent=v})}}),t.plugins.fileHighlight={highlight:function(P){for(var R=(P||document).querySelectorAll(f),d=0,p;p=R[d++];)t.highlightElement(p)}};var _=!1;t.fileHighlight=function(){_||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),_=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(po);var ii=po.exports;const li=Jr(ii);(function(n){n.languages.typescript=n.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),n.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete n.languages.typescript.parameter,delete n.languages.typescript["literal-property"];var e=n.languages.extend("typescript",{});delete e["class-name"],n.languages.typescript["class-name"].inside=e,n.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e}}}}),n.languages.ts=n.languages.typescript})(Prism);T.use(oi());T.use(ai());const ui=Ls(window),qe=({content:n})=>{const e=Qr(),t=fe(()=>ui.sanitize(T.parse(n),{ADD_ATTR:["target","src","style","frameBorder"],ADD_TAGS:["iframe"]}),n);return dt(()=>{if(!e.value)return;li.highlightAll(),e.value.querySelectorAll(".markdown-container pre[class*='language-']").forEach(o=>{o.addEventListener("click",()=>{const a=o.textContent;a!==null&&navigator.clipboard.writeText(a).then(()=>{alert("Snippet copied !")}).catch(i=>{console.error("Failed to copy text to clipboard:",i)})})}),e.value.querySelectorAll("a").forEach(o=>{const a=o.getAttribute("href");a&&yn(a)&&o.setAttribute("href",Yr(a)??"")});const r=location.hash;r.trim()&&setTimeout(()=>{var a;const o=(a=e.value)==null?void 0:a.querySelector(r);o==null||o.scrollIntoView()},100)},n),createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:"markdown-container w-100%",ref:e,innerHTML:t}))},ho="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20132%20130.96'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:url(%23linear-gradient);}.cls-2{fill:url(%23linear-gradient-2);}.cls-3{fill:url(%23linear-gradient-3);}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='33.43'%20y1='18.71'%20x2='89.12'%20y2='18.71'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23e1e1e1'/%3e%3cstop%20offset='1'%20stop-color='%23818181'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='5.95'%20y1='6.91'%20x2='95.98'%20y2='147.81'%20xlink:href='%23linear-gradient'/%3e%3clinearGradient%20id='linear-gradient-3'%20x1='37.37'%20y1='-13.16'%20x2='127.4'%20y2='127.74'%20xlink:href='%23linear-gradient'/%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='OBJECTS'%3e%3cpath%20class='cls-1'%20d='M49.31,0H82.69a6.41,6.41,0,0,1,5,10.43L66,37.42l-21.68-27A6.41,6.41,0,0,1,49.31,0Z'/%3e%3cpath%20class='cls-2'%20d='M17.05,0,5.49,18A34.58,34.58,0,0,0,7.62,58.33L66,131l28.21-35.1L17.16,0Z'/%3e%3cpath%20class='cls-3'%20d='M115,0l11.55,18a34.58,34.58,0,0,1-2.13,40.35L66,131,37.79,95.86,114.84,0Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",fo="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20132%20130.96'%3e%3cdefs%3e%3cstyle%3e.cls-1{fill:url(%23linear-gradient);}.cls-2{fill:url(%23linear-gradient-2);}.cls-3{fill:url(%23linear-gradient-3);}%3c/style%3e%3clinearGradient%20id='linear-gradient'%20x1='33.43'%20y1='18.71'%20x2='89.12'%20y2='18.71'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%231e1e1e'/%3e%3cstop%20offset='1'%20stop-color='%237e7e7e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='5.95'%20y1='6.91'%20x2='95.98'%20y2='147.81'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%237e7e7e'/%3e%3cstop%20offset='1'%20stop-color='%231e1e1e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-3'%20x1='37.37'%20y1='-13.16'%20x2='127.4'%20y2='127.74'%20xlink:href='%23linear-gradient-2'/%3e%3c/defs%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='OBJECTS'%3e%3cpath%20class='cls-1'%20d='M49.31,0H82.69a6.41,6.41,0,0,1,5,10.43L66,37.42l-21.68-27A6.41,6.41,0,0,1,49.31,0Z'/%3e%3cpath%20class='cls-2'%20d='M17.05,0,5.49,18A34.58,34.58,0,0,0,7.62,58.33L66,131l28.21-35.1L17.16,0Z'/%3e%3cpath%20class='cls-3'%20d='M115,0l11.55,18a34.58,34.58,0,0,1-2.13,40.35L66,131,37.79,95.86,114.84,0Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",mo=()=>!!(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches),rn=n=>`@apply ${n.join(" ")}`,It=n=>za().substring(0,n.length)===n,ci=()=>mo()?ho:fo,Ct=n=>{const{children:e,type:t,class:r}=n,o=fe(()=>rn(t==="fill"?["border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]","bg-[color:var(--secondary)] hover:bg-[color:var(--secondary-hover)]"]:t==="outline"?["border border-solid border-[color:var(--border-low)] hover:border-[color:var(--border-strong)]","hover:bg-[color:var(--secondary)]","bg-transparent"]:["bg-transparent hover:bg-[color:var(--secondary)]","border-transparent","color-[var(--text-low)] hover:color-[var(--text)]"]),t);return createJsxElement("button",{...n,class:Kr("p-x-4 p-y-2 cursor-pointer rounded",o,r)},e)},go=()=>createJsxElement("div",{class:"text-center m-t-auto text-[var(--text-lowest)] text-[0.8em]"},createJsxElement("p",null,"Released under the MIT License."),createJsxElement("p",null,"Copyright © 2023-present Riadh Adrani"));var de=(n=>(n.Dark="dark",n.Light="light",n.Device="device",n))(de||{});const pe=["0.5.0","0.5.2"],di=(n,e)=>{const[t,r,o]=Re(localStorage.getItem(n)!==null?JSON.parse(localStorage.getItem(n)):e);return dt(()=>{localStorage.setItem(n,JSON.stringify(t))},[t]),[t,r,o]},pi=()=>{const[n,e]=Re({width:window.innerWidth,height:window.innerHeight});return dt(()=>{const t=()=>{const{innerHeight:r,innerWidth:o}=window;e({height:r,width:o})};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)}),n},bo=Fn("scroll",()=>{const[n,e]=Re([]),t=Qr(document.body.querySelector("#app")),r=pi();return dt(()=>{if(t.value){if(r.width>766){t.value.style.maxHeight="",t.value.style.overflowY="";return}t.value.style.maxHeight=n.length>0?"100vh":"",t.value.style.overflowY=n.length>0?"hidden":""}},[n,r]),[()=>e([...n,0]),()=>{e(n.slice(0,n.length-1))}]}),hi=Fn("markdown",()=>{const[n,e]=Re({});return{record:n,getEntry:r=>r in n?n[r]:(fetch(r).then(async o=>{const a=await o.text();e(i=>({...i,[r]:a}))}),"")}}),An=n=>{const{getEntry:e}=hi();return e(n)},Ut=Fn("app",()=>{const[n,e]=di("@riadh-adrani-ruvy-docs-theme",de.Device),[t,r]=Re(!1),[o,a]=Re(pe.at(-1)),[i,s]=bo(),l=fe(()=>n!==de.Device?n:mo()?de.Dark:de.Light,n);dt(()=>{var m;(m=document.querySelector(":root"))==null||m.setAttribute("data-theme",l);const f=document.querySelector("link[rel~='icon']");f&&(f.href=ci())},l);const c=cn(f=>{const m=f??l===de.Dark?de.Light:de.Dark;e(m)},n),h=cn(f=>{const m=ta(f)?f:!t;m?i():s(),r(m)},t);return{theme:n,computedTheme:l,version:o,setVersion:a,toggleNav:h,toggleTheme:c,isNavOpen:t}}),yo=()=>{const{computedTheme:n}=Ut();return fe(()=>n===de.Dark?ho:fo,n)},fi=()=>{const n=fe(()=>["```bash","npm install @riadh-adrani/ruvy","```"].join(`
`)),e=yo();return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:"col-center flex-1"},createJsxElement("div",{class:"col-center gap-5 flex-1 p-b-20"},createJsxElement("div",{class:"col-center"},createJsxElement("img",{src:e,class:"h-150px w-150px"}),createJsxElement("h1",{class:"text-72px text-center",style:{background:"linear-gradient(var(--text-lowest),var(--text))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}},"Ruvy")),createJsxElement("p",{class:"text-center m-b-5 color-[var(--text-low)]"},"Ruvy is a lightweight front-end framework inspired by the principles of React, designed specifically for learning purposes. It incorporates familiar concepts such as JSX, function components, and hooks, providing a simplified and synchronous approach to building web applications."),createJsxElement("div",{class:"row self-center gap-4 m-b-5"},createJsxElement("a",{href:"/learn"},createJsxElement(Ct,{type:"fill"},"Get Started")),createJsxElement("a",{href:"/docs"},createJsxElement(Ct,{type:"fill"},"Browse Docs")),createJsxElement("a",{href:"https://stackblitz.com/edit/ruvy?file=src%2Fmain.tsx",target:"_blank"},createJsxElement(Ct,{type:"fill"},"Try on StackBlitz"))),createJsxElement("div",{class:"cursor-pointer home-create-bash rounded self-center"},createJsxElement(qe,{content:n??""}))),createJsxElement(go,null)))},mi=`# Introduction

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
- Built-in router very similar to \`React Router DOM\`
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
`,xr=()=>createJsxElement(createJsxFragmentElement,null,createJsxElement(qe,{content:mi})),gi="data:text/markdown;base64,IyBBY2tub3dsZWRnbWVudAoKV2Ugd291bGQgbGlrZSB0byBleHByZXNzIG91ciBoZWFydGZlbHQgYXBwcmVjaWF0aW9uIHRvIHRoZSBSZWFjdCB0ZWFtIGZvciB0aGVpciBleGNlcHRpb25hbCB3b3JrIGFuZCB0aGUgaW5jcmVkaWJsZSBjb250cmlidXRpb25zIHRoZXkgaGF2ZSBtYWRlIHRvIHRoZSB3b3JsZCBvZiBmcm9udC1lbmQgZGV2ZWxvcG1lbnQuIFJlYWN0IGhhcyBiZWVuIGFuIGltbWVuc2Ugc291cmNlIG9mIGluc3BpcmF0aW9uIGZvciBvdXIgZnJhbWV3b3JrLCBhbmQgd2UgYWNrbm93bGVkZ2UgdGhlIHNpZ25pZmljYW50IGltcGFjdCBpdCBoYXMgaGFkIG9uIHNoYXBpbmcgdGhlIHdlYiBkZXZlbG9wbWVudCBsYW5kc2NhcGUuCgo8YnIvPgoKV2Ugd291bGQgYWxzbyBsaWtlIHRvIGV4dGVuZCBvdXIgZ3JhdGl0dWRlIHRvIENoYXQgR1BULCB0aGUgcG93ZXJmdWwgbGFuZ3VhZ2UgbW9kZWwgdGhhdCBoYXMgYmVlbiBhbiBpbnZhbHVhYmxlIGNvbXBhbmlvbiB0aHJvdWdob3V0IHRoZSBzZWFyY2ggcHJvY2VzcyBhbmQgdGhlIGNyZWF0aW9uIG9mIHRoaXMgZG9jdW1lbnRhdGlvbi4gSXRzIHJlbWFya2FibGUgY2FwYWJpbGl0aWVzIGhhdmUgZ3JlYXRseSBhc3Npc3RlZCB1cyBpbiBwcm92aWRpbmcgYWNjdXJhdGUgYW5kIGhlbHBmdWwgaW5mb3JtYXRpb24gdG8gb3VyIHVzZXJzLgoKPGJyLz4KCkZ1cnRoZXJtb3JlLCB3ZSB3b3VsZCBsaWtlIHRvIHRoYW5rIHRoZSBlbnRpcmUgd2ViIGNvbW11bml0eSBmb3IgdGhlaXIgY29udGludW91cyBkZWRpY2F0aW9uIHRvIGltcHJvdmluZyB0aGUgdG9vbHMgYW5kIHRlY2hub2xvZ2llcyB0aGF0IGRyaXZlIHRoZSB3ZWIgZm9yd2FyZC4gVGhlIGNvbGxlY3RpdmUgZWZmb3J0IGFuZCBwYXNzaW9uIHdpdGhpbiB0aGUgY29tbXVuaXR5IGhhdmUgZm9zdGVyZWQgYW4gZW52aXJvbm1lbnQgb2YgY29sbGFib3JhdGlvbiwgaW5ub3ZhdGlvbiwgYW5kIHRoZSBwdXJzdWl0IG9mIGV4Y2VsbGVuY2UuCgo8YnIvPgoKSXQgaXMgdGhyb3VnaCB0aGUgY29sbGFib3JhdGlvbiBhbmQgZGVkaWNhdGlvbiBvZiB0aGVzZSBpbmRpdmlkdWFscyBhbmQgdGVhbXMgdGhhdCB3ZSBoYXZlIGJlZW4gYWJsZSB0byBjcmVhdGUgb3VyIGZyYW1ld29yayBhbmQgcHJvdmlkZSBkZXZlbG9wZXJzIGxpa2UgeW91IHdpdGggYSBwb3dlcmZ1bCBhbmQgaW50dWl0aXZlIHRvb2xzZXQgZm9yIGJ1aWxkaW5nIGV4Y2VwdGlvbmFsIHdlYiBhcHBsaWNhdGlvbnMuIFdlIGFyZSBncmF0ZWZ1bCBmb3IgdGhlaXIgb25nb2luZyBjb250cmlidXRpb25zIGFuZCB0aGUgcG9zaXRpdmUgaW1wYWN0IHRoZXkgaGF2ZSBoYWQgb24gb3VyIGpvdXJuZXkuCgo8YnIvPgoKVGhhbmsgeW91IGFsbCBmb3IgeW91ciBpbnNwaXJpbmcgd29yaywgdW53YXZlcmluZyBzdXBwb3J0LCBhbmQgY29tbWl0bWVudCB0byBwdXNoaW5nIHRoZSBib3VuZGFyaWVzIG9mIHdoYXQgaXMgcG9zc2libGUgaW4gd2ViIGRldmVsb3BtZW50Lgo=",bi=()=>{const n=An(gi);return createJsxElement(createJsxFragmentElement,null,createJsxElement(qe,{content:n}))},yi="data:text/markdown;base64,IyBNYWRlIHdpdGggUnV2eQoKIyMjIGBVbmRlciBjb25zdHJ1Y3Rpb24uLi5gCg==",wi=()=>{const n=An(yi);return createJsxElement(createJsxFragmentElement,null,createJsxElement(qe,{content:n}))},vi="data:text/markdown;base64,IyBMZWFybgoKV2VsY29tZSB0byB0aGlzIHNlY3Rpb24gb2YgdGhlIGRvY3VtZW50YXRpb24hIFdlIHdpbGwgdHJ5IHRvIG1ha2UgeW91IGNvbWZvcnRhYmxlIHVzaW5nIGBSdXZ5YCwgd2Ugd2lsbCBiZSBlbXVsYXRpbmcgdGhlIG5ldyBgUmVhY3RgIGRvY3VtZW50YXRpb24sIGJlY2F1c2UgaXQgaXMgd2VsbCB3cml0dGVuLCBhbmQgd2UgaGF2ZSBhdCBsZWFzdCA4MCUgaW4gY29tbW9uLgoKPGJyLz4KCi0gW2BRdWljayBTdGFydGBdKC9sZWFybi9xdWljay1zdGFydCkKLSBbYFNldHVwYF0oL2xlYXJuL3NldHVwKQotIFtgVHV0b3JpYWw6IFRvZG9gXSgvbGVhcm4vdHV0b3JpYWwtdG9kbykKCjxici8+CgpZb3UgY2FuIGFsc28gZGl2ZSBkZWVwIGludG8gdGhlIFtgZG9jc2BdKC9kb2NzKS4K",Fr=()=>{const n=An(vi);return createJsxElement(createJsxFragmentElement,null,createJsxElement(qe,{content:n}))},Di=`# Types

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
`,xi=`# useEffect

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
`,Fi=`# useMemo

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
`,Ei=`# useCallback

\`useCallback\` is a hook that lets cache a function definition between re-renders.

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
`,ki=`# useContext

\`useContext\` is a hook that lets subscribe to context from your component, which removes the need of props drilling.

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
`,Ai=`# useId

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
`,Ci=`# createContext

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
`,Ti=`# getParams

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
`,Si=`# getPathname

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
`,Ri=`# getSearchParams

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
`,Bi=`# navigate

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
`,Er=`# replace

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
`,_i=`# Outlet

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
`,Ii=`# Portal

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
`,Pi=`# Fragment

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
`,kr=`# batch

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
`,Mi=`# createStore

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
`,Li=`# Beyond React: Exploring Additional Features and Differences

In this section, we go beyond the realm of \`React\` and delve into the unique features and differentiating factors of our framework. While our framework draws inspiration from \`React\`, it also brings its own set of innovative functionalities and approaches to front-end development. Here, you will discover additional features that enrich your development experience, allowing you to tackle complex challenges with ease. We also highlight the key differences between our framework and React, providing insights into how our approach may diverge or enhance certain aspects of application development. Join us on this exploration as we showcase the unique capabilities that set our framework apart and empower you to create exceptional web applications.

---

Here is the list of differences and additional features :

<br/>

- [\`class attribute\`](/docs/more/class-attribute)
- [\`joinClasses()\`](/docs/more/joinClasses)
- [\`if directives\`](/docs/more/if-directive)
- [\`switch directives\`](/docs/more/switch-directive)
`,Ni=`# Class attribute

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
`,Oi="# joinClasses\n\n`joinClasses` is a function that filters and join classes of different types.\n\n<hr/>\n\n### Type & Parameters\n\n```ts\nfunction joinClasses(...classes: Arrayable<string | undefined | null>): string;\n```\n\nAccepts `Arrayable` arguments of type `string`, `undefined` or `null`.\n\n<hr/>\n\n### Notes ⚠️\n\n- Eleminate `falsy` values like `undefined`, `null` or `false`.\n\n<hr/>\n\n### Example\n\n```ts\njoinClasses('join', 'classes'); // `join classes`\njoinClasses(['join'], 'classes'); // `join classes`\njoinClasses(['join'], undefined, 'classes', null); // `join classes`\n```\n",Ui=`# \`if\` directive

A structural directive that conditionally includes a component based on the value of an expression coerced to \`boolean\`. When the expression does not evaluates to \`false\`, \`Ruvy\` will render it, otherwise it will be hidden.

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

- Cannot use \`else\` or \`else-if\` directives before an \`if\` directive at the beginning, \`Ruvy\` will throw an error.
`,$i=`# \`switch\` directive

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

> ⚠️ If parent does not include a \`switch\` directive, this directive will be ignored.

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
`,zi=`# Event modifiers

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
`,Hi=`# createRouter

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
`,Wi=[{from:"0.5.0",to:"0.5.0",md:Hi},{from:"0.5.2",md:Ji}],Gi=`# mountApp

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
`,ji=`# mountApp

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
`,Zi=[{from:"0.5.0",to:"0.5.0",md:Gi},{from:"0.5.2",md:ji}],Yi=`# useState

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
`,qi=`# useState

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
`,Vi=[{from:"0.5.0",to:"0.5.0",md:Yi},{from:"0.5.2",md:qi}],Xi=`# API

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
`,Qi=`# API

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
`,Ki=[{from:"0.5.0",to:"0.5.0",md:Xi},{from:"0.5.2",md:Qi}],el=[{path:"/mountApp",versions:Zi,title:"mountApp"},{path:"/createRouter",versions:Wi,title:"createRouter"},{path:"/createStore",versions:[{from:"0.5.0",to:"0.5.0",md:Mi}],title:"createStore"},{path:"/useState",versions:Vi,title:"useState"},{path:"/useEffect",versions:[{from:"0.5.0",md:xi}],title:"useEffect"},{path:"/useMemo",versions:[{from:"0.5.0",md:Fi}],title:"useMemo"},{path:"/useCallback",versions:[{from:"0.5.0",md:Ei}],title:"useCallback"},{path:"/useContext",versions:[{from:"0.5.0",md:ki}],title:"useContext"},{path:"/useId",versions:[{from:"0.5.0",md:Ai}],title:"useId"},{path:"/createContext",versions:[{from:"0.5.0",md:Ci}],title:"createContext"},{path:"/getParams",versions:[{from:"0.5.0",md:Ti}],title:"getParams"},{path:"/getSearchParams",versions:[{from:"0.5.0",md:Ri}],title:"getSearchParams"},{path:"/getPathname",versions:[{from:"0.5.0",md:Si}],title:"getPathname"},{path:"/replace",versions:[{from:"0.5.0",to:"0.5.0",md:Er}],element:Er,title:"replace"},{path:"/navigate",versions:[{from:"0.5.0",md:Bi}],title:"navigate"},{path:"/batch",versions:[{from:"0.5.0",to:"0.5.0",md:kr}],element:kr,title:"batch"},{path:"/outlet",versions:[{from:"0.5.0",md:_i}],title:"<Outlet/>"},{path:"/fragment",versions:[{from:"0.5.0",md:Pi}],title:"<Fragment/>"},{path:"/portal",versions:[{from:"0.5.0",md:Ii}],title:"<Portal/>"}],tl=[{path:"/class-attribute",versions:[{from:"0.5.0",md:Ni}],title:"Class attribute"},{path:"/joinClasses",versions:[{from:"0.5.0",md:Oi}],title:"joinClasses"},{path:"/if-directive",versions:[{from:"0.5.0",md:Ui}],title:"if directives"},{path:"/switch-directive",versions:[{from:"0.5.0",md:$i}],title:"switch directives"},{path:"/event-modifiers",versions:[{from:"0.5.0",md:zi}],title:"Event modifiers"}],Ar=[{path:"/api",title:"API",children:el,versions:Ki},{path:"/more",title:"More",children:tl,versions:[{from:"0.5.0",md:Li}]},{path:"/types",title:"Types",children:[],versions:[{from:"0.5.0",md:Di}]}],nl=`# Quick Start

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
`,rl='# Setup a new Project\n\nUnlike `React`, `Ruvy` is a framework, so it is recommended to build your whole app using it, we suggest a few methods to create your project:\n\n---\n\n## `CLI`\n\nYou can create a new starter template using our cli <a target="_blank" href="https://github.com/RiadhAdrani/create-ruvy">`create-ruvy`</a>:\n\n<br/>\n\n`npm`\n\n```bash\nnpx @riadh-adrani/create-ruvy\n```\n\n`yarn`\n\n```bash\nyarn create @riadh-adrani/ruvy\n```\n\n---\n\n## `StackBlitz`\n\nIf you want to quickly try `Ruvy`, we offer a starter sandbox on `StackBlitz` that you can check out <a target="_blank" href="https://stackblitz.com/edit/ruvy?file=src%2Fmain.tsx">here</a>.\n',ol=`# Tutorial : Todo

Welcome to our comprehensive tutorial on building a simple \`Todo List App\` with \`Ruvy\`. In this tutorial, we will take you on a step-by-step journey to create a fully functional todo list, where you'll learn and apply the fundamental concepts of \`Ruvy\`. By the end of this tutorial, you'll have a solid understanding of Ruvy's \`component-based\` architecture, the power of \`hooks\` for managing, and how to efficiently \`create\`, \`rea\`d, and \`delete\` todo items. Whether you're a seasoned developer exploring a new framework or a beginner taking your first steps in web development, this tutorial will equip you with the skills to build dynamic web applications using Ruvy. Let's get started and bring your todo list to life with \`Ruvy\`!

<br/>

> ⚠️ We will be using \`TypeScript\` as it provides a better user experience and solid development flow.

> ✔️ You can find the final result <a href="https://stackblitz.com/edit/ruvy-ttodo-tutorial-done?file=src%2Fmain.tsx" target="_blank">\`here\`</a>.

<br/>

## \`Setup the project 1️⃣\`

For simplicity pursposes, we will be using the starter template in \`StackBlitz\`, which you can find <a href="https://stackblitz.com/edit/ruvy" target="_blank">\`here\`</a>.

<hr/>

## \`Starting with a blank slate 🏜️\`

Delete the content of the \`src.main.tsx\`, we are starting from zero 👌.

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
`,Cr=[{path:"/quick-start",versions:[{from:"0.5.0",md:nl}],title:"Quick Start"},{path:"/setup",versions:[{from:"0.5.0",md:rl}],title:"Setup"},{path:"/tutorial-todo",versions:[{from:"0.5.0",md:ol}],title:"Tutorial : Todo"}],Tr=n=>createJsxElement("label",{...n,class:"switch rounded scale-55 u-border"},createJsxElement("input",{checked:n.checked,type:"checkbox","class:switch-input":!0}),createJsxElement("span",{class:"switch-slider rounded before:rounded"})),Ne=n=>{const{children:e,class:t,isActive:r}=n,o=fe(()=>{let a="p-x-2 text-[0.9em]";return r?a+=" color-[var(--link)]":a+=" color-[var(--text-low)] hover:color-[var(--text-strong)]",Kr(a,t)},[t,r]);return createJsxElement("a",{...n,class:o},e)},al=()=>{const{computedTheme:n,toggleTheme:e,isNavOpen:t,toggleNav:r,version:o,setVersion:a}=Ut(),i=yo(),s=fe(()=>[{title:"Learn",href:"/learn"},{title:"Docs",href:"/docs"},{title:"Examples",href:"/examples"},{title:"Acknowledgment",href:"/acknowledgment"}]),l=fe(()=>[{title:"GitHub",href:"https://github.com/RiadhAdrani/ruvy"}]);return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:["row-center","w-100%","bg-[color:var(--primary)]","p-x-5","h-[var(--nav-bar-height)]","border-b border-b-1px border-b-solid border-[color:var(--border-low)]","fixed top-0px z-[var(--nav-bar-z)]"]},createJsxElement("div",{class:"row justify-between items-center max-w-1200px flex-1 z-2"},createJsxElement("div",{class:"row items-center gap-8"},createJsxElement("a",{href:{name:"Home"},class:"p-x-1 row-center gap-3"},createJsxElement("img",{src:i,class:"h-25px w-25px"}),createJsxElement("h2",{class:"hidden md:inline-block"},"Ruvy")),createJsxElement("div",{class:"row hidden md:flex gap-1"},s.map(c=>createJsxElement(Ne,{href:c.href,target:"_blank",isActive:It(c.href)},c.title)))),createJsxElement("div",{class:"row hidden gap-3 md:flex items-center"},createJsxElement("div",{class:"row gap-1"},l.map(c=>createJsxElement(Ne,{href:c.href,target:"_blank"},c.title))),createJsxElement("select",{onChange:c=>a(c.target.value),class:"p-1"},pe.map(c=>createJsxElement("option",{class:"p-y-1",key:c,selected:o===c,value:c},createJsxElement("div",null,"v",c)," ",createJsxElement("div",{class:"m-l-2",if:c===pe.at(-1)},"@latest")))),createJsxElement(Tr,{checked:n===de.Dark,onChange:()=>e()})),createJsxElement("div",{class:"col md:hidden"},createJsxElement(Ct,{type:"text",class:["nav-bar-mobile-btn col-center",t?"nav-bar-mobile-btn-expanded":""],onClick:()=>r()})))),createJsxElement("div",{class:["col md:hidden",t?"top-[var(--nav-bar-height)] opacity-100":"-top-100vh opacity-0","fixed left-0px right-0px","bg-[color:var(--primary)]","overflow-y-auto","duration-[var(--t-long)]","p-5","z-1"],style:{height:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:["col gap-3 p-y-5","border-b border-b-solid border-b-1px border-[color:var(--border-low)]"]},s.map(c=>createJsxElement(Ne,{href:c.href,class:"",target:"_blank",isActive:It(c.href),onClick:()=>r(!1)},c.title))),createJsxElement("div",{class:["col gap-3 p-y-5","border-b border-b-solid border-b-1px border-[color:var(--border-low)]"]},l.map(c=>createJsxElement(Ne,{href:c.href,target:"_blank"},c.title))),createJsxElement("div",{class:"row items-center justify-between p-t-5"},createJsxElement("p",{class:"p-x-2"},"Version"),createJsxElement("select",{onChange:c=>a(c.target.value),class:"p-1"},pe.map(c=>createJsxElement("option",{class:"p-y-1",key:c,selected:o===c,value:c},createJsxElement("div",null,"v",c)," ",createJsxElement("div",{class:"m-l-2",if:c===pe.at(-1)},"@latest"))))),createJsxElement("div",{class:"row items-center justify-between p-y-5 text-[var(--text-low)]"},createJsxElement("p",{class:"p-x-2"},"Theme"),createJsxElement(Tr,{checked:n===de.Dark,onChange:()=>e()})),createJsxElement(go,null)))},hn=n=>{var s;const{item:e,root:t,onClick:r}=n,[o,a]=Re(!1),i=cn(()=>a(!o),o);return createJsxElement(createJsxFragmentElement,null,e.children?createJsxElement("details",{open:o},createJsxElement("summary",{onClick:i},createJsxElement(Ne,{...n,href:`${t}${e.path}`,isActive:It(`${t}${e.path}`),onClick:r,class:"m-y-2"},e.title)),createJsxElement("div",{class:"m-l-2 col border-l-solid  border-l-1px border-l-[color:var(--border)]"},(s=e.children)==null?void 0:s.map(l=>createJsxElement(hn,{item:{...l,path:`${e.path}${l.path}`},root:t,onClick:r},l.title)))):createJsxElement(Ne,{...n,href:`${t}${e.path}`,isActive:It(`${t}${e.path}`),onClick:r,class:"m-l-18px m-y-1"},e.title))},sl=({items:n,root:e})=>{const[t,r]=Re(!1),[o,a]=bo(),i=()=>{const l=!t;r(l),l?o():a()},s=()=>{r(!1),a()};return createJsxElement(createJsxFragmentElement,null,createJsxElement("div",{class:["fixed top-[var(--nav-bar-height)]","w-[var(--side-bar-width)]","bg-[var(--primary)]","border-r border-r-solid border-r-[color:var(--border-low)]","overflow-hidden","hidden md:flex md:col"],style:{height:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:"col gap-2 overflow-auto p-y-10 w-[var(--side-bar-width)]",style:{height:"calc(100vh - var(--nav-bar-height))"}},n.map(l=>createJsxElement(hn,{item:l,root:e})))),createJsxElement("div",{class:"col md:hidden fixed right-0 left-0 top-[var(--nav-bar-height)] w-100%"},createJsxElement("p",{class:["text-[var(--text-low)] hover:text-[var(--text)]","p-y-1.5 w-100% cursor-pointer bg-[var(--primary)]","border-b p-x-6 border-b-solid border-b-[color:var(--border-low)]","h-[var(--side-bar-height)]"],onClick:()=>i()},"Menu"),createJsxElement("div",{class:["bg-[var(--primary)] fixed w-100% overflow-hidden",t?"bottom-0px opacity-100":"-bottom-100vh opacity-0"],style:{height:"calc(100vh - var(--nav-bar-height) - var(--side-bar-height))"}},createJsxElement("div",{class:"col gap-2 overflow-auto p-t-5 p-x-5",style:{height:"calc(100vh - var(--nav-bar-height) - var(--side-bar-height))"}},n.map(l=>createJsxElement(hn,{item:l,root:e,onClick:s}))))))},wo=(n,e)=>n.reduce((t,r)=>{const o=pe.indexOf(e);if(r.versions.some(i=>{if(i.from===e||i.to===e)return!0;const s=pe.indexOf(i.from);if(i.to){const l=pe.indexOf(i.to);if(s<=o&&o<=l)return!0}else if(s<=o)return!0;return!1})){const i=r.children?wo(r.children,e):void 0,s={...r,children:i};t.push(s)}return t},[]),Sr=({rootURL:n,sideBarItems:e})=>{const{version:t}=Ut(),r=fe(()=>wo(e,t),[e,t]);return createJsxElement(createJsxFragmentElement,null,createJsxElement(sl,{items:r,root:n}),createJsxElement("div",{class:["row overflow-x-none flex-1 justify-stretch self-stretch","m-l-0 md:m-l-[var(--side-bar-width)]","p-l-0 md:p-l-10"]},createJsxElement(st,null)))},vo=()=>createJsxElement("div",null,createJsxElement("h1",null,"Not found"),createJsxElement(Ne,{href:"/",class:"p-x-0!"},"Go back to Home page")),on=({versions:n})=>{const{version:e}=Ut(),t=fe(()=>{const r=pe.indexOf(e);if(r===-1)throw"invalid version";for(const o of n){if(o.from===e||o.to===e)return o.md;const a=pe.indexOf(o.from);if(o.to){const i=pe.indexOf(o.to);if(a<=r&&r<=i)return o.md}else if(a<=r)return o.md}},[e,n]);return t?createJsxElement(qe,{content:t}):createJsxElement(vo,null)},il=[{path:"/",element:createJsxElement(createJsxFragmentElement,null,createJsxElement(al,null),createJsxElement("div",{class:"w-100% overflow-x-hidden row-center p-x-6 m-t-[var(--nav-bar-height)]",style:{minHeight:"calc(100vh - var(--nav-bar-height))"}},createJsxElement("div",{class:"col max-w-1200px flex-1 self-stretch overflow-x-hidden p-y-12 md:p-y-10"},createJsxElement(st,null)))),children:[{path:"",title:"Home",element:createJsxElement(fi,null),name:"Home"},{path:"/docs",title:"Docs",element:createJsxElement(xr,null)},{path:"/learn",title:"Learn",element:createJsxElement(Fr,null),name:"Learn"},{path:"/acknowledgment",title:"Acknowledgment",element:createJsxElement(bi,null)},{path:"/examples",title:"Examples",element:createJsxElement(wi,null)},{path:"/*",element:createJsxElement(vo,null)},{path:"/learn",element:createJsxElement(Sr,{rootURL:"/learn",sideBarItems:Cr}),children:[{path:"",element:createJsxElement(Fr,null)},...Cr.map(n=>({path:n.path,element:createJsxElement(on,{versions:n.versions})}))]},{path:"/docs",element:createJsxElement(Sr,{rootURL:"/docs",sideBarItems:Ar}),children:[{path:"",element:createJsxElement(xr,null)},...Ar.map(n=>({path:n.path,element:createJsxElement(st,null),children:[{path:"",element:createJsxElement(on,{versions:n.versions})},...n.children.map(e=>({path:e.path,element:createJsxElement(on,{versions:e.versions})}))]}))]}]}];Oa({routes:il,base:"/ruvy",transformTitle:n=>`${n} - Ruvy`,correctScrolling:!0});Ea({app:createJsxElement(ms,null),host:document.querySelector("#app")});
