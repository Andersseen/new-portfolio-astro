import { options, h as h$1, Fragment, Component } from 'preact';
import _renderer1 from '@astrojs/lit/server.js';

var r="diffed",o="__c",i="__s",a="__c",c="__k",s="__d",u="__s",l=/[\s\n\\/='"\0<>]/,f=/^(xlink|xmlns|xml)([A-Z])/,p=/^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/,h=/^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/,d=new Set(["draggable","spellcheck"]);function v(e){ void 0!==e.__g?e.__g|=8:e[s]=true;}function m(e){ void 0!==e.__g?e.__g&=-9:e[s]=false;}function _(e){return void 0!==e.__g?!!(8&e.__g):true===e[s]}var y=/["&<]/;function g(e){if(0===e.length||false===y.test(e))return e;for(var t=0,n=0,r="",o="";n<e.length;n++){switch(e.charCodeAt(n)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 60:o="&lt;";break;default:continue}n!==t&&(r+=e.slice(t,n)),r+=o,t=n+1;}return n!==t&&(r+=e.slice(t,n)),r}var b={},x=new Set(["animation-iteration-count","border-image-outset","border-image-slice","border-image-width","box-flex","box-flex-group","box-ordinal-group","column-count","fill-opacity","flex","flex-grow","flex-negative","flex-order","flex-positive","flex-shrink","flood-opacity","font-weight","grid-column","grid-row","line-clamp","line-height","opacity","order","orphans","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","widows","z-index","zoom"]),k=/[A-Z]/g;function w(e){var t="";for(var n in e){var r=e[n];if(null!=r&&""!==r){var o="-"==n[0]?n:b[n]||(b[n]=n.replace(k,"-$&").toLowerCase()),i=";";"number"!=typeof r||o.startsWith("--")||x.has(o)||(i="px;"),t=t+o+":"+r+i;}}return t||void 0}function C(){this.__d=true;}function A(e,t){return {__v:e,context:t,props:e.props,setState:C,forceUpdate:C,__d:true,__h:new Array(0)}}function S(e,t,n){if(!e.s){if(n instanceof L){if(!n.s)return void(n.o=S.bind(null,e,t));1&t&&(t=n.s),n=n.v;}if(n&&n.then)return void n.then(S.bind(null,e,t),S.bind(null,e,2));e.s=t,e.v=n;const r=e.o;r&&r(e);}}var L=/*#__PURE__*/function(){function e(){}return e.prototype.then=function(t,n){var r=new e,o=this.s;if(o){var i=1&o?t:n;if(i){try{S(r,1,i(this.v));}catch(e){S(r,2,e);}return r}return this}return this.o=function(e){try{var o=e.v;1&e.s?S(r,1,t?t(o):o):n?S(r,1,n(o)):S(r,2,o);}catch(e){S(r,2,e);}},r},e}();function E(e){return e instanceof L&&1&e.s}function j(e,t,n){for(var r;;){var o=e();if(E(o)&&(o=o.v),!o)return i;if(o.then){r=0;break}var i=n();if(i&&i.then){if(!E(i)){r=1;break}i=i.s;}var a; }var c=new L,s=S.bind(null,c,2);return (0===r?o.then(l):1===r?i.then(u):a.then(f)).then(void 0,s),c;function u(r){i=r;do{if(!(o=e())||E(o)&&!o.v)return void S(c,1,i);if(o.then)return void o.then(l).then(void 0,s);E(i=n())&&(i=i.v);}while(!i||!i.then);i.then(u).then(void 0,s);}function l(e){e?(i=n())&&i.then?i.then(u).then(void 0,s):u(i):S(c,1,i);}function f(){(o=e())?o.then?o.then(l).then(void 0,s):l(o):S(c,1,i);}}function T(e,t){try{var n=e();}catch(e){return t(true,e)}return n&&n.then?n.then(t.bind(null,false),t.bind(null,true)):t(false,n)}var D,P,$,U,Z=function(a,s){try{var u=options[i];options[i]=!0,D=options.__b,P=options[r],$=options.__r,U=options.unmount;var l=h$1(Fragment,null);return l[c]=[a],Promise.resolve(T(function(){return Promise.resolve(O(a,s||F,!1,void 0,l,!0,void 0)).then(function(e){var t,n=function(){if(W(e)){var n=function(){var e=o.join(H);return t=1,e},r=0,o=e,i=j(function(){return !!o.some(function(e){return e&&"function"==typeof e.then})&&r++<25},void 0,function(){return Promise.resolve(Promise.all(o)).then(function(e){o=e.flat();})});return i&&i.then?i.then(n):n()}}();return n&&n.then?n.then(function(n){return t?n:e}):t?n:e})},function(t,n){if(options[o]&&options[o](a,M),options[i]=u,M.length=0,t)throw n;return n}))}catch(e){return Promise.reject(e)}},F={},M=[],W=Array.isArray,z=Object.assign,H="",N="\x3c!--$s--\x3e",q="\x3c!--/$s--\x3e";function I(e,t){var n,r=e.type,o=true;return e[a]?(o=false,(n=e[a]).state=n[u]):n=new r(e.props,t),e[a]=n,n.__v=e,n.props=e.props,n.context=t,v(n),null==n.state&&(n.state=F),null==n[u]&&(n[u]=n.state),r.getDerivedStateFromProps?n.state=z({},n.state,r.getDerivedStateFromProps(n.props,n.state)):o&&n.componentWillMount?(n.componentWillMount(),n.state=n[u]!==n.state?n[u]:n.state):!o&&n.componentWillUpdate&&n.componentWillUpdate(),$&&$(e),n.render(n.props,n.state,t)}function O(t,r,o,i,s,y,b){if(null==t||true===t||false===t||t===H)return H;var x=typeof t;if("object"!=x)return "function"==x?H:"string"==x?g(t):t+H;if(W(t)){var k,C=H;s[c]=t;for(var S=t.length,L=0;L<S;L++){var E=t[L];if(null!=E&&"boolean"!=typeof E){var j,T=O(E,r,o,i,s,y,b);"string"==typeof T?C+=T:(k||(k=new Array(S)),C&&k.push(C),C=H,W(T)?(j=k).push.apply(j,T):k.push(T));}}return k?(C&&k.push(C),k):C}if(void 0!==t.constructor)return H;t.__=s,D&&D(t);var Z=t.type,M=t.props;if("function"==typeof Z){var B,V,K,J=r;if(Z===Fragment){if("tpl"in M){for(var Q=H,X=0;X<M.tpl.length;X++)if(Q+=M.tpl[X],M.exprs&&X<M.exprs.length){var Y=M.exprs[X];if(null==Y)continue;"object"!=typeof Y||void 0!==Y.constructor&&!W(Y)?Q+=Y:Q+=O(Y,r,o,i,t,y,b);}return Q}if("UNSTABLE_comment"in M)return "\x3c!--"+g(M.UNSTABLE_comment)+"--\x3e";V=M.children;}else {if(null!=(B=Z.contextType)){var ee=r[B.__c];J=ee?ee.props.value:B.__;}var te=Z.prototype&&"function"==typeof Z.prototype.render;if(te)V=/**#__NOINLINE__**/I(t,J),K=t[a];else {t[a]=K=/**#__NOINLINE__**/A(t,J);for(var ne=0;_(K)&&ne++<25;){m(K),$&&$(t);try{V=Z.call(K,M,J);}catch(e){throw (t._suspended=true),e}}v(K);}if(null!=K.getChildContext&&(r=z({},r,K.getChildContext())),te&&options.errorBoundaries&&(Z.getDerivedStateFromError||K.componentDidCatch)){V=null!=V&&V.type===Fragment&&null==V.key&&null==V.props.tpl?V.props.children:V;try{return O(V,r,o,i,t,y,!1)}catch(e){return Z.getDerivedStateFromError&&(K[u]=Z.getDerivedStateFromError(e)),K.componentDidCatch&&K.componentDidCatch(e,F),_(K)?(V=I(t,r),null!=(K=t[a]).getChildContext&&(r=z({},r,K.getChildContext())),O(V=null!=V&&V.type===Fragment&&null==V.key&&null==V.props.tpl?V.props.children:V,r,o,i,t,y,b)):H}finally{P&&P(t),U&&U(t);}}}V=null!=V&&V.type===Fragment&&null==V.key&&null==V.props.tpl?V.props.children:V;try{var re=O(V,r,o,i,t,y,b);return P&&P(t),options.unmount&&options.unmount(t),t._suspended?"string"==typeof re?N+re+q:W(re)?(re.unshift(N),re.push(q),re):re.then(function(e){return N+e+q}):re}catch(n){if(!n||"function"!=typeof n.then)throw n;return n.then(function e(){try{var n=O(V,r,o,i,t,y,b);return t._suspended?N+n+q:n}catch(t){if(!t||"function"!=typeof t.then)throw t;return t.then(e)}})}}var ae,ce="<"+Z,se=H;for(var ue in M){var le=M[ue];if("function"!=typeof(le=G(le)?le.value:le)||"class"===ue||"className"===ue){switch(ue){case "children":ae=le;continue;case "key":case "ref":case "__self":case "__source":continue;case "htmlFor":if("for"in M)continue;ue="for";break;case "className":if("class"in M)continue;ue="class";break;case "defaultChecked":ue="checked";break;case "defaultSelected":ue="selected";break;case "defaultValue":case "value":switch(ue="value",Z){case "textarea":ae=le;continue;case "select":i=le;continue;case "option":i!=le||"selected"in M||(ce+=" selected");}break;case "dangerouslySetInnerHTML":se=le&&le.__html;continue;case "style":"object"==typeof le&&(le=w(le));break;case "acceptCharset":ue="accept-charset";break;case "httpEquiv":ue="http-equiv";break;default:if(f.test(ue))ue=ue.replace(f,"$1:$2").toLowerCase();else {if(l.test(ue))continue;"-"!==ue[4]&&!d.has(ue)||null==le?o?h.test(ue)&&(ue="panose1"===ue?"panose-1":ue.replace(/([A-Z])/g,"-$1").toLowerCase()):p.test(ue)&&(ue=ue.toLowerCase()):le+=H;}}null!=le&&false!==le&&(ce=true===le||le===H?ce+" "+ue:ce+" "+ue+'="'+("string"==typeof le?g(le):le+H)+'"');}}if(l.test(Z))throw new Error(Z+" is not a valid HTML tag name in "+ce+">");if(se||("string"==typeof ae?se=g(ae):null!=ae&&false!==ae&&true!==ae&&(se=O(ae,r,"svg"===Z||"foreignObject"!==Z&&o,i,t,y,b))),P&&P(t),U&&U(t),!se&&R.has(Z))return ce+"/>";var fe="</"+Z+">",pe=ce+">";return W(se)?[pe].concat(se,[fe]):"string"!=typeof se?[pe,se,fe]:pe+se+fe}var R=new Set(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]);function G(e){return null!==e&&"object"==typeof e&&"function"==typeof e.peek&&"value"in e}

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "p" + this.c.toString();
    },
    signals: /* @__PURE__ */ new Map(),
    propsToSignals: /* @__PURE__ */ new Map()
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

function isSignal(x) {
  return x != null && typeof x === "object" && typeof x.peek === "function" && "value" in x;
}
function restoreSignalsOnProps(ctx, props) {
  let propMap;
  if (ctx.propsToSignals.has(props)) {
    propMap = ctx.propsToSignals.get(props);
  } else {
    propMap = /* @__PURE__ */ new Map();
    ctx.propsToSignals.set(props, propMap);
  }
  for (const [key, signal] of propMap) {
    props[key] = signal;
  }
  return propMap;
}
function serializeSignals(ctx, props, attrs, map) {
  const signals = {};
  for (const [key, value] of Object.entries(props)) {
    const isPropArray = Array.isArray(value);
    const isPropObject = !isSignal(value) && typeof props[key] === "object" && props[key] !== null && !isPropArray;
    if (isPropObject || isPropArray) {
      const values = isPropObject ? Object.keys(props[key]) : value;
      values.forEach((valueKey, valueIndex) => {
        const signal = isPropObject ? props[key][valueKey] : valueKey;
        if (isSignal(signal)) {
          const keyOrIndex = isPropObject ? valueKey.toString() : valueIndex;
          props[key] = isPropObject ? Object.assign({}, props[key], { [keyOrIndex]: signal.peek() }) : props[key].map(
            (v, i) => i === valueIndex ? [signal.peek(), i] : v
          );
          const currentMap = map.get(key) || [];
          map.set(key, [...currentMap, [signal, keyOrIndex]]);
          const currentSignals = signals[key] || [];
          signals[key] = [...currentSignals, [getSignalId(ctx, signal), keyOrIndex]];
        }
      });
    } else if (isSignal(value)) {
      props[key] = value.peek();
      map.set(key, value);
      signals[key] = getSignalId(ctx, value);
    }
  }
  if (Object.keys(signals).length) {
    attrs["data-preact-signals"] = JSON.stringify(signals);
  }
}
function getSignalId(ctx, item) {
  let id = ctx.signals.get(item);
  if (!id) {
    id = incrementId(ctx);
    ctx.signals.set(item, id);
  }
  return id;
}

const StaticHtml = ({ value, name, hydrate = true }) => {
  if (!value) return null;
  const tagName = hydrate ? "astro-slot" : "astro-static-slot";
  return h$1(tagName, { name, dangerouslySetInnerHTML: { __html: value } });
};
StaticHtml.shouldComponentUpdate = () => false;
var static_html_default = StaticHtml;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
let originalConsoleError;
let consoleFilterRefs = 0;
async function check(Component$1, props, children) {
  if (typeof Component$1 !== "function") return false;
  if (Component$1.name === "QwikComponent") return false;
  if (Component$1.prototype != null && typeof Component$1.prototype.render === "function") {
    return Component.isPrototypeOf(Component$1);
  }
  useConsoleFilter();
  try {
    const { html } = await renderToStaticMarkup.call(this, Component$1, props, children, void 0);
    if (typeof html !== "string") {
      return false;
    }
    return html == "" ? false : !html.includes("<undefined>");
  } catch {
    return false;
  } finally {
    finishUsingConsoleFilter();
  }
}
function shouldHydrate(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  const ctx = getContext(this.result);
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = h$1(static_html_default, {
      hydrate: shouldHydrate(metadata),
      value,
      name
    });
  }
  let propsMap = restoreSignalsOnProps(ctx, props);
  const newProps = { ...props, ...slots };
  const attrs = {};
  serializeSignals(ctx, props, attrs, propsMap);
  const vNode = h$1(
    Component,
    newProps,
    children != null ? h$1(static_html_default, {
      hydrate: shouldHydrate(metadata),
      value: children
    }) : children
  );
  const html = await Z(vNode);
  return { attrs, html };
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError) return;
  }
  originalConsoleError(msg, ...rest);
}
const renderer = {
  name: "@astrojs/preact",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/preact","clientEntrypoint":"@astrojs/preact/client.js","serverEntrypoint":"@astrojs/preact/server.js"}, { ssr: server_default }),Object.assign({"name":"@astrojs/lit","serverEntrypoint":"@astrojs/lit/server.js","clientEntrypoint":"@astrojs/lit/dist/client.js"}, { ssr: _renderer1 }),];

export { renderers };
