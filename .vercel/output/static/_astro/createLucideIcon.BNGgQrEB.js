import{a as c,H as p}from"./preact.module.B0PSOmE1.js";/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,r)=>r?r.toUpperCase():o.toLowerCase()),i=e=>{const t=w(e);return t.charAt(0).toUpperCase()+t.slice(1)},h=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:r,children:s,iconNode:a,class:n="",...u})=>c("svg",{...m,width:String(t),height:t,stroke:e,"stroke-width":r?Number(o)*24/Number(t):o,class:["lucide",n].join(" "),...u},[...a.map(([C,d])=>c(C,d)),...p(s)]);/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(e,t)=>{const o=({class:r="",className:s="",children:a,...n})=>c(g,{...n,iconNode:t,class:h(`lucide-${l(i(e))}`,`lucide-${l(e)}`,r,s)},a);return o.displayName=i(e),o};export{f as c};
