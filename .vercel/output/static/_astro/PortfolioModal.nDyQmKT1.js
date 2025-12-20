import{B as ie,c as xe,I as q,m as ye}from"./IconMap.DvTVk0cR.js";import{u as i}from"./jsxRuntime.module.Dm63aad0.js";import{d as $,A as we,y as Ae}from"./hooks.module.iAQCKk53.js";import{c as k}from"./createLucideIcon.BNGgQrEB.js";import{B as Se,T as ke,x as z}from"./lit-html.CsmJBYta.js";import{k as Ee}from"./preact.module.B0PSOmE1.js";import"./compat.module.CZVIRGQO.js";/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=k("arrow-up-right",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=k("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=k("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=k("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=k("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-preact v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=k("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Me=({data:r})=>i("div",{className:"space-y-6",children:i("div",{className:"grid gap-4",children:r.map((e,t)=>i("a",{href:e.link||"#",target:e.link?"_blank":void 0,rel:e.link?"noopener noreferrer":void 0,className:"group relative block p-5 rounded-xl bg-background-tertiary border border-border overflow-hidden transition-all duration-300 hover:shadow-xl",children:[i("div",{className:"absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out will-change-transform origin-left"}),i("div",{className:"relative z-10",children:[i("div",{className:"flex justify-between items-center mb-2",children:[i("h4",{className:"font-bold text-lg group-hover:text-white transition-colors duration-300",children:e.title}),i("span",{className:"text-xs px-2 py-1 rounded-full bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white transition-colors duration-300",children:e.category})]}),i("p",{className:"text-sm text-foreground-secondary mb-3 group-hover:text-white/90 transition-colors duration-300",children:e.description}),i("div",{className:"flex gap-2 text-xs text-foreground-tertiary group-hover:text-white/80 transition-colors duration-300",children:e.tech.map((s,a)=>i("span",{children:[s," ",a<e.tech.length-1?"•":""]},a))})]})]},t))})}),_e=({data:r})=>i("div",{className:"space-y-8",children:r.categories.map((e,t)=>i("div",{className:"space-y-4",children:[i("h3",{className:"text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",children:e.name}),i("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:e.items.map((s,a)=>{const l=`https://cdn.simpleicons.org/${s.slug||s.name.toLowerCase()}`;return i("div",{className:"flex flex-col items-center justify-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group",children:[i("div",{className:"w-12 h-12 mb-3 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110",children:i("img",{src:l,alt:s.name,loading:"lazy",className:"w-full h-full object-contain",onError:n=>{n.target.style.display="none",n.target.parentElement.classList.remove("grayscale"),n.target.parentElement.innerHTML='<span class="text-2xl font-bold">?</span>'}})}),i("span",{className:"text-sm font-medium text-foreground-secondary group-hover:text-primary transition-colors",children:s.name})]},a)})})]},t))}),Ue=({data:r})=>i("div",{className:"space-y-6",children:[r.title&&i("h2",{className:"text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",children:r.title}),i("div",{className:"prose prose-invert max-w-none text-foreground-secondary",children:r.bioHtml?i("div",{dangerouslySetInnerHTML:{__html:r.bioHtml}}):r.bio&&r.bio.map((e,t)=>i("p",{className:"mb-4 leading-relaxed",children:e},t))}),r.philosophy&&i("div",{className:"p-4 bg-background-tertiary rounded-xl border-l-4 border-primary",children:[i("h3",{className:"text-lg font-semibold text-foreground mb-2",children:"Philosophy"}),i("p",{className:"italic text-foreground-secondary",children:['"',r.philosophy,'"']})]}),r.social&&i("div",{className:"flex flex-wrap gap-4 mt-8",children:r.social.map((e,t)=>i(ie,{href:e.url,variant:"outline",size:"sm",className:`border-${e.color}/30 text-${e.color} hover:bg-${e.color}/10`,children:e.label},t))})]}),Re=({data:r})=>{const[e,t]=$("projects"),s=r.some(n=>n.category==="templates"),a=r.some(n=>n.category==="projects"),o=s&&a,l=o?r.filter(n=>n.category===e):r;return i("div",{className:"space-y-6",children:[o&&i("div",{className:"flex p-1 bg-background-tertiary rounded-lg border border-border w-fit mb-4",children:[i("button",{onClick:()=>t("projects"),className:`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${e==="projects"?"bg-primary text-white shadow-sm":"text-foreground-secondary hover:text-foreground"}`,children:"Projects"}),i("button",{onClick:()=>t("templates"),className:`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${e==="templates"?"bg-primary text-white shadow-sm":"text-foreground-secondary hover:text-foreground"}`,children:"Templates"})]}),i("div",{className:"grid gap-4",children:l.map((n,c)=>i("div",{className:"block p-5 rounded-xl bg-background-tertiary border border-border hover:border-accent hover:shadow-md transition-all group relative overflow-hidden",children:[i("div",{className:"flex flex-col gap-1",children:[i("h4",{className:"font-bold text-lg text-foreground group-hover:text-primary transition-colors",children:n.organization}),i("span",{className:"text-xs font-semibold text-accent uppercase tracking-wider",children:n.role})]}),i("p",{className:"text-sm text-foreground-secondary mt-3 mb-4 leading-relaxed",children:n.description}),i("div",{className:"flex gap-3",children:[n.demoUrl&&i("a",{href:n.demoUrl,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors",children:["Live Demo",i(Q,{className:"w-3 h-3"})]}),n.repoUrl&&i("a",{href:n.repoUrl,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1 text-xs font-bold text-foreground border border-border px-3 py-1.5 rounded-lg hover:border-accent hover:text-accent transition-colors",children:"GitHub Repo"}),!n.demoUrl&&!n.repoUrl&&n.link&&i("a",{href:n.link,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1 text-xs font-bold text-background bg-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors",children:["View Project",i(Q,{className:"w-3 h-3"})]})]})]},c))})]})},je=({data:r})=>i("div",{className:"space-y-4",children:[i("h3",{className:"text-2xl font-bold font-heading mb-4",children:"Latest Insights"}),i("div",{className:"space-y-3",children:r&&r.length>0?r.map((e,t)=>i("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent hover:bg-background-tertiary transition-all group",children:[i("div",{children:[i("div",{className:"font-bold text-lg mb-1",children:e.title}),i("div",{className:"text-sm text-foreground-secondary",children:e.description})]}),i("span",{className:"text-accent group-hover:translate-x-1 transition-transform text-xl",children:"→"})]},t)):i("p",{className:"text-foreground-secondary",children:"No articles available at the moment."})})]});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,B=P.ShadowRoot&&(P.ShadyCSS===void 0||P.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),H=new WeakMap;let Oe=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(B&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=H.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&H.set(t,e))}return e}toString(){return this.cssText}};const De=r=>new Oe(typeof r=="string"?r:r+"",void 0,oe),Te=(r,e)=>{if(B)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const s=document.createElement("style"),a=P.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,r.appendChild(s)}},G=B?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return De(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Be,defineProperty:Le,getOwnPropertyDescriptor:Ie,getOwnPropertyNames:Fe,getOwnPropertySymbols:Ve,getPrototypeOf:qe}=Object,M=globalThis,J=M.trustedTypes,Qe=J?J.emptyScript:"",He=M.reactiveElementPolyfillSupport,E=(r,e)=>r,O={toAttribute(r,e){switch(e){case Boolean:r=r?Qe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ae=(r,e)=>!Be(r,e),K={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??=Symbol("metadata"),M.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=K){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Le(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){const{get:a,set:o}=Ie(this.prototype,e)??{get(){return this[t]},set(l){this[t]=l}};return{get:a,set(l){const n=a?.call(this);o?.call(this,l),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??K}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=qe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,s=[...Fe(t),...Ve(t)];for(const a of s)this.createProperty(a,t[a])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,a]of t)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const a=this._$Eu(t,s);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)t.unshift(G(a))}else e!==void 0&&t.push(G(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:O).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const o=s.getPropertyOptions(a),l=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:O;this._$Em=a;const n=l.fromAttribute(t,o.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,s){if(e!==void 0){const a=this.constructor,o=this[e];if(s??=a.getPropertyOptions(e),!((s.hasChanged??ae)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:o},l){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,l??t??this[e]),o!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,o]of this._$Ep)this[a]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[a,o]of s){const{wrapped:l}=o,n=this[a];l!==!0||this._$AL.has(a)||n===void 0||this.C(a,void 0,o,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[E("elementProperties")]=new Map,A[E("finalized")]=new Map,He?.({ReactiveElement:A}),(M.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis;let S=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ke}};S._$litElement$=!0,S.finalized=!0,L.litElementHydrateSupport?.({LitElement:S});const Ge=L.litElementPolyfillSupport;Ge?.({LitElement:S});(L.litElementVersions??=[]).push("4.2.1");class Je extends S{static properties={variant:{type:String},size:{type:String},fullWidth:{type:Boolean},disabled:{type:Boolean},href:{type:String},type:{type:String}};constructor(){super(),this.variant="primary",this.size="md",this.fullWidth=!1,this.disabled=!1,this.href="",this.type="button"}createRenderRoot(){return this}get variantClasses(){const e={primary:"bg-primary text-primary-contrast hover:bg-primary/90 shadow-sm",secondary:"bg-secondary text-white hover:bg-secondary/90 shadow-sm",accent:"bg-accent text-accent-contrast hover:bg-accent/90 shadow-sm",ghost:"bg-transparent hover:bg-foreground/5 text-foreground",outline:"bg-transparent border-2 border-border hover:bg-foreground/5 text-foreground"};return e[this.variant]||e.primary}get sizeClasses(){const e={sm:"px-3 py-1.5 text-sm",md:"px-4 py-2 text-base",lg:"px-6 py-3 text-lg",icon:"p-2"};return e[this.size]||e.md}render(){const e=xe(this.variantClasses,this.sizeClasses,this.fullWidth&&"w-full",this.disabled?"opacity-50 cursor-not-allowed":"cursor-pointer","rounded-lg font-medium transition-all duration-200","focus:outline-none focus:ring-2 focus:ring-primary/50","active:scale-[0.98]","flex items-center justify-center",this.className);return this.href?z`
        <a href=${this.href} class=${e} ?disabled=${this.disabled}>
          <slot></slot>
        </a>
      `:z`
      <button type=${this.type} class=${e} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `}}customElements.define("ui-button",Je);class Ke extends S{createRenderRoot(){return this}render(){return z`
      <div class="p-4 space-y-10">
        <!-- Header Section -->
        <div class="text-center space-y-3 mb-8">
          <h3
            class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary font-heading"
          >
            Web Components System
          </h3>
          <p class="text-foreground-secondary max-w-xl mx-auto text-lg">
            A framework-agnostic UI library built with Lit.
            <span class="block text-sm opacity-80 mt-2">
              Just drop in the script and use custom elements anywhere.
            </span>
          </p>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- UI Components Panel -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden relative group hover:border-accent/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-accent uppercase tracking-widest"
              >
                UI Components
              </h4>
              <span
                class="text-xs font-mono text-foreground-tertiary bg-background/50 px-2 py-1 rounded"
              >
                .ts
              </span>
            </div>

            <div class="space-y-4">
              <!-- Visual Preview -->
              <div
                class="flex flex-wrap gap-3 items-center p-4 bg-background/50 rounded-xl border border-border/50"
              >
                <ui-button variant="primary" size="sm" class="rounded-full">
                  Primary
                </ui-button>
                <ui-button variant="outline" size="sm" class="rounded-full">
                  Outline
                </ui-button>
                <div
                  class="relative w-10 h-6 bg-success rounded-full flex items-center px-1 cursor-pointer"
                >
                  <div
                    class="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm"
                  ></div>
                </div>
              </div>

              <!-- Code Snippet -->
              <div
                class="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner overflow-x-auto"
              >
                <div class="text-blue-400">
                  &lt;ui-button <span class="text-purple-400">variant</span>=
                  <span class="text-green-400">"primary"</span>&gt;
                </div>
                <div class="pl-4">Click Me</div>
                <div class="text-blue-400">&lt;/ui-button&gt;</div>
                <div class="mt-2 text-blue-400">
                  &lt;ui-toggle <span class="text-purple-400">checked</span>{"
                  "} /&gt;
                </div>
              </div>
            </div>
          </div>

          <!-- Animations Attributes Panel -->
          <div
            class="space-y-5 p-6 rounded-3xl bg-background-tertiary border border-border overflow-hidden relative group hover:border-primary/40 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <h4
                class="text-sm font-bold text-primary uppercase tracking-widest"
              >
                Animations
              </h4>
              <span
                class="text-xs font-mono text-foreground-tertiary bg-background/50 px-2 py-1 rounded"
              >
                attribute-based
              </span>
            </div>

            <div class="space-y-4">
              <!-- Visual Preview - Animated Boxes (Simulated) -->
              <div
                class="h-20 flex items-center justify-center gap-6 p-4 bg-background/50 rounded-xl border border-border/50 overflow-hidden"
              >
                <div
                  class="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg shadow-lg animate-pulse"
                  title="intro='fade-in'"
                ></div>
                <div
                  class="w-12 h-12 bg-gradient-to-br from-accent to-orange-500 rounded-lg shadow-lg"
                  style="animation: bounce 2s infinite"
                  title="hover='bounce'"
                ></div>
              </div>

              <!-- Code Snippet -->
              <div
                class="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner overflow-x-auto"
              >
                <div class="text-gray-500">
                  &lt;!-- Declarative Animations --&gt;
                </div>
                <div>
                  <span class="text-blue-400">&lt;div</span>
                  <span class="text-yellow-400"> enter</span>=
                  <span class="text-green-400">"slide-left"</span>
                </div>
                <div class="pl-9">
                  <span class="text-yellow-400">hover</span>=
                  <span class="text-green-400">"scale-up"</span>
                  <span class="text-blue-400">&gt;</span>
                </div>
                <div class="pl-4">...content</div>
                <div class="text-blue-400">&lt;/div&gt;</div>
              </div>
            </div>
          </div>

          <!-- Icon System Panel - Full Width -->
          <div
            class="md:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-background-secondary to-background border border-border relative overflow-hidden group"
          >
            <!-- Decorative background glow -->
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            ></div>

            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-3 mb-2">
                  <div class="p-2 bg-foreground/5 rounded-lg">
                    <svg
                      class="w-6 h-6 text-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold font-heading">
                    Smart Icon System
                  </h3>
                </div>
                <p class="text-sm text-foreground-secondary leading-relaxed">
                  A dedicated Web Component for icons that handles SVG loading,
                  caching, and coloring automatically. No more inline SVGs
                  cluttering your markup.
                </p>

                <div
                  class="font-mono text-xs p-4 bg-[#1e1e1e] text-gray-300 rounded-xl border border-border/50 shadow-inner"
                >
                  <div>
                    <span class="text-blue-400">&lt;ui-icon</span>
                    <span class="text-purple-400"> name</span>=
                    <span class="text-green-400">"github"</span>
                    <span class="text-purple-400"> size</span>=
                    <span class="text-green-400">"lg"</span>
                    <span class="text-blue-400"> /&gt;</span>
                  </div>
                </div>
              </div>

              <!-- Icon Grid Preview -->
              <div class="flex-1 w-full grid grid-cols-4 gap-3">
                ${[1,2,3,4,5,6,7,8].map(e=>z`
                    <div
                      class="aspect-square rounded-xl bg-background border border-border/50 flex items-center justify-center hover:bg-accent/10 hover:border-accent/50 transition-all cursor-crosshair group/icon"
                    >
                      <div
                        class="w-6 h-6 rounded-md bg-foreground/20 group-hover/icon:bg-accent group-hover/icon:scale-110 transition-all duration-300"
                      ></div>
                    </div>
                  `)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `}}customElements.define("mock-ui-kit",Ke);const Ye=({data:r})=>i("div",{className:"space-y-6",children:i("div",{className:"grid gap-4 md:grid-cols-2",children:r.map((e,t)=>i("div",{className:"p-5 rounded-xl bg-background-tertiary border border-border group hover:border-primary/30 transition-colors",children:[i("div",{className:`w-8 h-8 rounded-lg bg-gradient-to-br ${e.gradient} mb-3 opacity-80 group-hover:opacity-100 transition-opacity`}),i("h4",{className:"font-bold text-lg mb-2",children:e.text}),i("p",{className:"text-sm text-foreground-secondary",children:e.details})]},t))})});var Y=["x","y","z"],g=function(r){Object.assign(this,{uniforms:{},geometry:{vertices:[{x:0,y:0,z:0}]},mode:0,modifiers:{},attributes:[],multiplier:1,buffers:[]}),Object.assign(this,r),this.prepareProgram(),this.prepareUniforms(),this.prepareAttributes()};g.prototype.compileShader=function(r,e){var t=this.gl.createShader(r);return this.gl.shaderSource(t,e),this.gl.compileShader(t),t},g.prototype.prepareProgram=function(){var r=this.gl,e=this.vertex,t=this.fragment,s=r.createProgram();r.attachShader(s,this.compileShader(35633,e)),r.attachShader(s,this.compileShader(35632,t)),r.linkProgram(s),r.useProgram(s),this.program=s},g.prototype.prepareUniforms=function(){for(var r=Object.keys(this.uniforms),e=0;e<r.length;e+=1){var t=this.gl.getUniformLocation(this.program,r[e]);this.uniforms[r[e]].location=t}},g.prototype.prepareAttributes=function(){this.geometry.vertices!==void 0&&this.attributes.push({name:"aPosition",size:3}),this.geometry.normal!==void 0&&this.attributes.push({name:"aNormal",size:3}),this.attributeKeys=[];for(var r=0;r<this.attributes.length;r+=1)this.attributeKeys.push(this.attributes[r].name),this.prepareAttribute(this.attributes[r])},g.prototype.prepareAttribute=function(r){for(var e=this.geometry,t=this.multiplier,s=e.vertices,a=e.normal,o=new Float32Array(t*s.length*r.size),l=0;l<t;l+=1)for(var n=r.data&&r.data(l,t),c=l*s.length*r.size,d=0;d<s.length;d+=1)for(var h=0;h<r.size;h+=1){var f=this.modifiers[r.name];o[c]=f!==void 0?f(n,d,h,this):r.name==="aPosition"?s[d][Y[h]]:r.name==="aNormal"?a[d][Y[h]]:n[h],c+=1}this.attributes[this.attributeKeys.indexOf(r.name)].data=o,this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(r.name)])},g.prototype.prepareBuffer=function(r){var e=r.data,t=r.name,s=r.size,a=this.gl.createBuffer();this.gl.bindBuffer(34962,a),this.gl.bufferData(34962,e,35044);var o=this.gl.getAttribLocation(this.program,t);this.gl.enableVertexAttribArray(o),this.gl.vertexAttribPointer(o,s,5126,!1,0,0),this.buffers[this.attributeKeys.indexOf(r.name)]={buffer:a,location:o,size:s}},g.prototype.render=function(r){var e=this,t=this.uniforms,s=this.multiplier,a=this.gl;a.useProgram(this.program);for(var o=0;o<this.buffers.length;o+=1){var l=this.buffers[o],n=l.location,c=l.buffer,d=l.size;a.enableVertexAttribArray(n),a.bindBuffer(34962,c),a.vertexAttribPointer(n,d,5126,!1,0,0)}Object.keys(r).forEach(function(h){t[h].value=r[h].value}),Object.keys(t).forEach(function(h){var f=t[h];e.uniformMap[f.type](f.location,f.value)}),a.drawArrays(this.mode,0,s*this.geometry.vertices.length),this.onRender&&this.onRender(this)},g.prototype.destroy=function(){for(var r=0;r<this.buffers.length;r+=1)this.gl.deleteBuffer(this.buffers[r].buffer);this.gl.deleteProgram(this.program),this.gl=null};var x=function(r){var e=this,t=r||{},s=t.canvas;s===void 0&&(s=document.querySelector("canvas"));var a=t.context;a===void 0&&(a={});var o=t.contextType;o===void 0&&(o="experimental-webgl");var l=t.settings;l===void 0&&(l={});var n=s.getContext(o,Object.assign({alpha:!1,antialias:!1},a));Object.assign(this,{gl:n,canvas:s,uniforms:{},instances:new Map,shouldRender:!0}),Object.assign(this,{devicePixelRatio:1,clearColor:[1,1,1,1],position:{x:0,y:0,z:2},clip:[.001,100]}),Object.assign(this,l),this.uniformMap={float:function(c,d){return n.uniform1f(c,d)},vec2:function(c,d){return n.uniform2fv(c,d)},vec3:function(c,d){return n.uniform3fv(c,d)},vec4:function(c,d){return n.uniform4fv(c,d)},mat2:function(c,d){return n.uniformMatrix2fv(c,!1,d)},mat3:function(c,d){return n.uniformMatrix3fv(c,!1,d)},mat4:function(c,d){return n.uniformMatrix4fv(c,!1,d)}},n.enable(n.DEPTH_TEST),n.depthFunc(n.LEQUAL),n.getContextAttributes().alpha===!1&&(n.clearColor.apply(n,this.clearColor),n.clearDepth(1)),this.onSetup&&this.onSetup(n),window.addEventListener("resize",function(){return e.resize()}),this.resize(),this.render()};x.prototype.resize=function(){var r=this.gl,e=this.canvas,t=this.devicePixelRatio,s=this.position;e.width=e.clientWidth*t,e.height=e.clientHeight*t;var a=r.drawingBufferWidth,o=r.drawingBufferHeight,l=a/o;r.viewport(0,0,a,o);var n=Math.tan(Math.PI/180*22.5),c=[1,0,0,0,0,1,0,0,0,0,1,0,s.x,s.y,(l<1?1:l)*-s.z,1];this.uniforms.uProjectionMatrix={type:"mat4",value:[.5/n,0,0,0,0,l/n*.5,0,0,0,0,-(this.clip[1]+this.clip[0])/(this.clip[1]-this.clip[0]),-1,0,0,-2*this.clip[1]*(this.clip[0]/(this.clip[1]-this.clip[0])),0]},this.uniforms.uViewMatrix={type:"mat4",value:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},this.uniforms.uModelMatrix={type:"mat4",value:c}},x.prototype.toggle=function(r){r!==this.shouldRender&&(this.shouldRender=r!==void 0?r:!this.shouldRender,this.shouldRender&&this.render())},x.prototype.render=function(){var r=this;this.gl.clear(16640),this.instances.forEach(function(e){e.render(r.uniforms)}),this.onRender&&this.onRender(this),this.shouldRender&&requestAnimationFrame(function(){return r.render()})},x.prototype.add=function(r,e){e===void 0&&(e={uniforms:{}}),e.uniforms===void 0&&(e.uniforms={}),Object.assign(e.uniforms,JSON.parse(JSON.stringify(this.uniforms))),Object.assign(e,{gl:this.gl,uniformMap:this.uniformMap});var t=new g(e);return this.instances.set(r,t),t},x.prototype.remove=function(r){var e=this.instances.get(r);e!==void 0&&(e.destroy(),this.instances.delete(r))},x.prototype.destroy=function(){var r=this;this.instances.forEach(function(e,t){e.destroy(),r.instances.delete(t)}),this.toggle(!1)};var ne="phi",le="theta",y="mapSamples",ce="mapBrightness",de="baseColor",he="markerColor",ue="glowColor",v="markers",pe="diffuse",X="devicePixelRatio",fe="dark",me="offset",ge="scale",be="opacity",ve="mapBaseBrightness",W={[ne]:"z",[le]:"A",[y]:"k",[ce]:"D",[de]:"S",[he]:"T",[ue]:"y",[pe]:"E",[fe]:"F",[me]:"x",[ge]:"B",[be]:"U",[ve]:"G"},{PI:N,sin:D,cos:T,sqrt:Z,atan2:Xe,floor:w,max:We,pow:Ze,log2:et}=Math,ee=2.23606797749979,te=1.618033988749895,tt=.7202100452062783,U=6.283185307179586,re=3.8832220774509327,R=.618033988749895,rt=(r,e)=>{let t=[r[0],r[2],r[1]],s=1/e,a=We(2,w(et(ee*e*N*(1-t[2]*t[2]))*tt)),o=Ze(te,a)/ee,l=[w(o+.5),w(o*te+.5)],n=[(l[0]+1)*R%1*U-re,(l[1]+1)*R%1*U-re],c=[-2*l[0],-2*l[1]],d=[Xe(t[1],t[0]),t[2]-1],h=n[0]*c[1]-c[0]*n[1],f=[w((c[1]*d[0]-n[1]*(d[1]*e+1))/h),w((-c[0]*d[0]+n[0]*(d[1]*e+1))/h)],p=N,u=[0,0,0];for(let m=0;m<4;m++){let b=l[0]*(f[0]+m%2)+l[1]*(f[1]+w(m*.5));if(b>e)continue;let I=b*R%1*U,_=1-2*b*s,F=Z(1-_*_),C=[T(I)*F,D(I)*F,_],V=Z((t[0]-C[0])**2+(t[1]-C[1])**2+(t[2]-C[2])**2);V<p&&(p=V,u=C)}return[u[0],u[2],u[1]]},j=(r,e)=>[].concat(...r.map(t=>{let[s,a]=t.location;s=s*N/180,a=a*N/180-N;let o=T(s),l=[-o*T(a),D(s),o*D(a)];return[...rt(l,e),t.size,...t.color?[...t.color,1]:[0,0,0,0]]}),[0,0,0,0,0,0,0,0]),st=(r,e)=>{let t=(o,l,n)=>({type:o,value:typeof e[l]>"u"?n:e[l]}),s=r.getContext("webgl2")?"webgl2":r.getContext("webgl")?"webgl":"experimental-webgl",a=new x({canvas:r,contextType:s,context:{alpha:!0,stencil:!1,antialias:!0,depth:!1,preserveDrawingBuffer:!1,...e.context},settings:{[X]:e[X]||1,onSetup:o=>{let l=o.RGB,n=o.UNSIGNED_BYTE,c=o.TEXTURE_2D,d=o.createTexture();o.bindTexture(c,d),o.texImage2D(c,0,l,1,1,0,l,n,new Uint8Array([0,0,0,0]));let h=new Image;h.onload=()=>{o.bindTexture(c,d),o.texImage2D(c,0,l,l,n,h),o.generateMipmap(c);let f=o.getParameter(o.CURRENT_PROGRAM),p=o.getUniformLocation(f,"H");o.texParameteri(c,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(c,o.TEXTURE_MAG_FILTER,o.NEAREST),o.uniform1i(p,0)},h.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg=="}}});return a.add("",{vertex:"attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}",fragment:"precision highp float;uniform vec2 w,x;uniform vec3 S,T,y;uniform vec4 u[64*2];uniform float z,A,k,B,C,D,E,F,U,G;uniform sampler2D H;float I=1./k;mat3 J(float a,float b){float c=cos(a),d=cos(b),e=sin(a),f=sin(b);return mat3(d,f*e,-f*c,0.,c,e,f,d*-e,d*c);}vec3 K(vec3 c,out float v){c=c.xzy;float p=max(2.,floor(log2(2.236068*k*3.141593*(1.-c.z*c.z))*.72021));vec2 g=floor(pow(1.618034,p)/2.236068*vec2(1,1.618034)+.5),d=fract((g+1.)*.618034)*6.283185-3.883222,e=-2.*g,f=vec2(atan(c.y,c.x),c.z-1.),q=floor(vec2(e.y*f.x-d.y*(f.y*k+1.),-e.x*f.x+d.x*(f.y*k+1.))/(d.x*e.y-e.x*d.y));float n=3.141593;vec3 r;for(float h=0.;h<4.;h+=1.){vec2 s=vec2(mod(h,2.),floor(h*.5));float j=dot(g,q+s);if(j>k)continue;float a=j,b=0.;if(a>=524288.)a-=524288.,b+=.803894;if(a>=262144.)a-=262144.,b+=.901947;if(a>=131072.)a-=131072.,b+=.950973;if(a>=65536.)a-=65536.,b+=.475487;if(a>=32768.)a-=32768.,b+=.737743;if(a>=16384.)a-=16384.,b+=.868872;if(a>=8192.)a-=8192.,b+=.934436;if(a>=4096.)a-=4096.,b+=.467218;if(a>=2048.)a-=2048.,b+=.733609;if(a>=1024.)a-=1024.,b+=.866804;if(a>=512.)a-=512.,b+=.433402;if(a>=256.)a-=256.,b+=.216701;if(a>=128.)a-=128.,b+=.108351;if(a>=64.)a-=64.,b+=.554175;if(a>=32.)a-=32.,b+=.777088;if(a>=16.)a-=16.,b+=.888544;if(a>=8.)a-=8.,b+=.944272;if(a>=4.)a-=4.,b+=.472136;if(a>=2.)a-=2.,b+=.236068;if(a>=1.)a-=1.,b+=.618034;float l=fract(b)*6.283185,i=1.-2.*j*I,m=sqrt(1.-i*i);vec3 o=vec3(cos(l)*m,sin(l)*m,i);float t=length(c-o);if(t<n)n=t,r=o;}v=n;return r.xzy;}void main(){vec2 f=1./w,a=(gl_FragCoord.xy*f*2.-1.)/B-x*vec2(1,-1)*f;a.x*=w.x*f.y;float c=dot(a,a);vec4 t=vec4(0);float j=0.;int V=int(C);if(c<=.64){float b;vec4 e=vec4(0);vec3 v=vec3(0,0,1),l=normalize(vec3(a,sqrt(.64-c)));mat3 L=J(A,z);float g=dot(l,v);vec3 m=l*L,h=K(m,b);float n=asin(h.y),i=acos(-h.x/cos(n));i=h.z<0.?-i:i;float M=max(texture2D(H,vec2(i*.5/3.141593,-(n/3.141593+.5))).x,G),N=smoothstep(8e-3,0.,b),o=pow(g,E)*D,p=M*N*o,W=mix((1.-p)*pow(g,.4),p,F)+.1;e+=vec4(S*W,1.);float X=0.;for(int d=0;d<128;d+=2){if(d>=V)break;vec4 q=u[d],O=u[d+1];vec3 P=q.xyz;float r=q.w;vec3 Y=P-m;b=length(Y);if(b<r){float Q=r*.5,s=smoothstep(Q,0.,b);X+=s,e.xyz=O.w>.5?mix(e.xyz,O.xyz,s*o):mix(e.xyz,T,s*o);}}e.xyz+=pow(1.-g,4.)*y,t+=e*(1.+U)*.5,j=pow(dot(normalize(vec3(-a,sqrt(1.-c))),vec3(0,0,1)),4.)*smoothstep(0.,1.,.2/(c-.64));}else{float R=sqrt(.2/(c-.64));j=smoothstep(.5,1.,R/(R+1.));}gl_FragColor=t+vec4(j*y,j);}",uniforms:{w:{type:"vec2",value:[e.width,e.height]},z:t("float",ne),A:t("float",le),k:t("float",y),D:t("float",ce),G:t("float",ve),S:t("vec3",de),T:t("vec3",he),E:t("float",pe),y:t("vec3",ue),F:t("float",fe),u:{type:"vec4",value:j(e[v],e[y])},C:{type:"float",value:e[v].length*2},x:t("vec2",me,[0,0]),B:t("float",ge,1),U:t("float",be,1)},mode:4,geometry:{vertices:[{x:-100,y:100,z:0},{x:-100,y:-100,z:0},{x:100,y:100,z:0},{x:100,y:-100,z:0},{x:-100,y:-100,z:0},{x:100,y:100,z:0}]},onRender:({uniforms:o})=>{let l={};if(e.onRender){l=e.onRender(l)||l;for(let n in W)l[n]!==void 0&&(o[W[n]].value=l[n]);if(l[v]!==void 0){let n=l[y]!==void 0?l[y]:o.k.value;o.u.value=j(l[v],n),o.C.value=l[v].length}l.width&&l.height&&(o.w.value=[l.width,l.height]),l[y]!==void 0&&(o.u.value=j(l[v]||e[v],l[y]))}}}),a};const it=Pe,ot=$e,at=Ce,nt=Ne,lt=({items:r,data:e})=>{const t=we(null),[s,a]=$({name:"",email:"",message:""}),[o,l]=$("idle"),[n,c]=$(""),d=r||e?.content||[];Ae(()=>{let p=0;if(!t.current)return;const u=()=>t.current&&t.current.offsetWidth;window.addEventListener("resize",u),u();const m=st(t.current,{devicePixelRatio:2,width:600*2,height:600*2,phi:0,theta:0,dark:1,diffuse:1.2,mapSamples:16e3,mapBrightness:6,baseColor:[.3,.3,.3],markerColor:[.1,.8,1],glowColor:[1,1,1],opacity:.8,markers:[],onRender:b=>{b.phi=p,p+=.005}});return()=>{m.destroy(),window.removeEventListener("resize",u)}},[]);const h=p=>{const{name:u,value:m}=p.target;a(b=>({...b,[u]:m}))},f=async p=>{p.preventDefault(),l("loading"),c("");try{const u=await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),m=await u.json();if(!u.ok)throw new Error(m.error||"Failed to send message");l("success"),a({name:"",email:"",message:""})}catch(u){console.error(u),l("error"),c(u.message||"Something went wrong.")}};return i("div",{className:"flex flex-col md:flex-row gap-8 min-h-[500px] w-full bg-black/40 rounded-xl overflow-hidden border border-white/10 p-6 relative",children:[i("div",{className:"absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] pointer-events-none"}),i("div",{className:"flex-1 relative flex flex-col items-center justify-center min-h-[300px] order-2 md:order-1",children:[i("div",{className:"absolute inset-0 flex items-center justify-center overflow-hidden",children:i("canvas",{ref:t,style:{width:600,height:600,maxWidth:"100%",aspectRatio:1},className:"opacity-90 grayscale hover:grayscale-0 transition-all duration-1000"})}),i("div",{className:"z-10 mt-auto flex flex-wrap justify-center gap-4 p-4",children:d.map((p,u)=>{const m=q[p.icon]||q.github;return i("a",{href:p.url,target:"_blank",rel:"noreferrer",className:"group p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 hover:border-white/30 transition-all duration-300",title:p.label,children:i("div",{className:`text-${p.color} text-white group-hover:text-primary transition-colors`,children:i(m,{className:"w-5 h-5"})})},u)})})]}),i("div",{className:"flex-1 w-full max-w-md mx-auto z-10 flex flex-col justify-center order-1 md:order-2",children:[i("div",{className:"mb-6",children:[i("h3",{className:"text-2xl font-bold text-white mb-2",children:"Contact Me"}),i("p",{className:"text-white/60 text-sm",children:"Have a question or want to work together? Send me a message!"})]}),i("form",{onSubmit:f,className:"space-y-4",children:[i("div",{className:"space-y-1",children:[i("label",{className:"text-xs font-medium text-white/50 uppercase tracking-wider ml-1",children:"Name"}),i("input",{type:"text",name:"name",required:!0,value:s.name,onInput:h,className:"w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all",placeholder:"John Doe"})]}),i("div",{className:"space-y-1",children:[i("label",{className:"text-xs font-medium text-white/50 uppercase tracking-wider ml-1",children:"Email"}),i("input",{type:"email",name:"email",required:!0,value:s.email,onInput:h,className:"w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all",placeholder:"john@example.com"})]}),i("div",{className:"space-y-1",children:[i("label",{className:"text-xs font-medium text-white/50 uppercase tracking-wider ml-1",children:"Message"}),i("textarea",{name:"message",required:!0,value:s.message,onInput:h,rows:4,className:"w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none",placeholder:"Tell me about your project..."})]}),i("button",{type:"submit",disabled:o==="loading"||o==="success",className:`
                    w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-all duration-300
                    ${o==="success"?"bg-green-500/20 text-green-400 border border-green-500/50 cursor-default":"bg-white text-black hover:bg-primary hover:text-white border border-transparent"}
                    ${o==="loading"?"opacity-70 cursor-wait":""}
                `,children:[o==="loading"&&i(ot,{className:"w-5 h-5 animate-spin"}),o==="success"&&i(at,{className:"w-5 h-5"}),o==="error"&&"Try Again",o==="idle"&&i(Ee,{children:["Send Message",i(it,{className:"w-4 h-4"})]}),o==="success"&&"Message Sent!"]}),o==="error"&&i("div",{className:"flex items-center gap-2 text-red-400 text-sm mt-2 bg-red-400/10 p-3 rounded-lg border border-red-400/20",children:[i(nt,{className:"w-4 h-4 shrink-0"}),i("span",{children:n})]})]})]})]})},se=ye.div;function xt({item:r,onClose:e}){const t=()=>{if(r.type==="social")return i(lt,{items:r.content});if(!r.details&&r.type!=="design")return i("p",{children:"No specific details available."});switch(r.type){case"projects":return i(Me,{data:r.details});case"stack":return i(_e,{data:r.details});case"about":return i(Ue,{data:r.details});case"community":return i(Re,{data:r.details});case"articles":return i(je,{data:r.details});case"design":return i("mock-ui-kit",{});case"services":return i(Ye,{data:r.details});default:return typeof r.details=="string"?i("div",{dangerouslySetInnerHTML:{__html:r.details}}):null}};return i(se,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm",onClick:e,children:i(se,{layoutId:r.id,className:"w-full max-w-3xl bg-background rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col max-h-[90vh]",onClick:s=>s.stopPropagation(),children:i("div",{className:"p-8 overflow-y-auto custom-scrollbar",children:[i("div",{className:"flex justify-between items-start mb-6 sticky top-0 bg-background z-10 pb-4 border-b border-transparent",children:[i("h2",{className:"text-4xl font-bold text-foreground font-heading",children:r.title}),i(ie,{onClick:e,variant:"ghost",size:"icon",className:"rounded-full hover:bg-foreground/10 shrink-0","aria-label":"Close modal",children:i(ze,{className:"w-6 h-6 text-foreground"})})]}),i("p",{className:"text-lg text-foreground-secondary mb-8",children:r.description}),i("div",{className:"text-foreground-secondary",children:t()})]})})})}export{xt as default};
