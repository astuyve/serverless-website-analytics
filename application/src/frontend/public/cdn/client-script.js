"use strict";let t=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+=(e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_"),"");var e;!function(e){const i={LOCAL:{USER_ID:"swa-userId"}},n="/api-ingest/v1/page/view",r="/api-ingest/v1/event/track";let a,o,s,c=!1,u=!1,l={inBrowser:!1,site:"",apiUrl:"",debug:!1};function g(t,e){navigator.sendBeacon(t,e)}function m(t){const e=["utm_source","utm_medium","utm_campaign","utm_term","utm_content"],i=[];for(let n of Object.keys(t))e.includes(n)||i.push(n+"="+t[n]);if(0!=i.length)return i.join(",")}e.analyticsPageInit=function(e){if(l={inBrowser:e.inBrowser,site:e.site,apiUrl:e.apiUrl,debug:!!e.debug},l.inBrowser){if(a)throw new Error("Analytics has already been initialized, `analyticsPageInit` must only be called once");a=t(),o=localStorage.getItem(i.LOCAL.USER_ID)||void 0,o||(o=t(),localStorage.setItem(i.LOCAL.USER_ID,o)),c||(l.debug&&console.log("pageTimeIncrementStarted"),c=!0,setInterval((()=>{"visible"===document.visibilityState&&(s&&s.time_on_page++,l.debug&&s&&console.log(s.page_url,s.time_on_page))}),1e3)),u||(u=!0,document.addEventListener("visibilitychange",(()=>{"visible"===document.visibilityState&&l.debug&&console.log("VISIBLE",new Date),"hidden"===document.visibilityState&&(l.debug&&console.log("HIDDEN",new Date),s&&g(l.apiUrl+n,JSON.stringify(s)))})))}},e.analyticsPageChange=function(e){if(!l.inBrowser)return;if(!a||!o)throw new Error("Analytics have not been initialized");s&&(l.debug&&console.log("Sending previous analytic"),g(l.apiUrl+n,JSON.stringify(s)));const i=t(),r=(new Date).toISOString(),c=new URLSearchParams(window.location.search),u=Object.fromEntries(c.entries());s={site:l.site,user_id:o,session_id:a,page_id:i,page_url:e,page_opened_at:r,time_on_page:0,utm_source:u.utm_source,utm_medium:u.utm_medium,utm_campaign:u.utm_campaign,utm_term:u.utm_term,utm_content:u.utm_content,referrer:document.referrer,querystring:m(u)},l.debug&&console.log("Sending new analytic"),g(l.apiUrl+n,JSON.stringify(s))},e.analyticsTrack=function(t,e,i){if(!l.inBrowser)return;if(!a||!o)throw new Error("Analytics have not been initialized");const n=(new Date).toISOString(),s=new URLSearchParams(window.location.search),c=Object.fromEntries(s.entries()),u={site:l.site,user_id:o,session_id:a,category:i,event:t,data:e,tracked_at:n,utm_source:c.utm_source,utm_medium:c.utm_medium,utm_campaign:c.utm_campaign,utm_term:c.utm_term,utm_content:c.utm_content,referrer:document.referrer,querystring:m(c)};g(l.apiUrl+r,JSON.stringify(u))}}(e||(e={}));var i=Object.freeze({__proto__:null,get v1(){return e}});(()=>{const t=document.currentScript||document.querySelector("script[serverless-website-analytics]");if(!t)throw new Error("Could not find script tag with attribute 'serverless-website-analytics' on the script tag.");const n=t.getAttribute("site");if(!n)throw new Error("Could not find attribute 'site' on the script tag.");let r="";try{r=new URL(t.src).origin}catch(t){console.error("Could not parse URL from script tag",t)}let a=t.getAttribute("api-url");if(!r&&!a)throw new Error("Could not auto-detect script origin, specify the 'api-url' attribute on the script tag.");a||(a=r);const o=t.getAttribute("routing");if(o&&"path"!==o&&"hash"!==o)throw new Error("Attribute 'routing' must be either 'path' or 'hash'");function s(){return"path"===o?window.location.pathname:"hash"===o?window.location.hash?window.location.hash:"/":window.location.pathname+(window.location.hash?"#"+window.location.hash:"")}window.swa=i,e.analyticsPageInit({inBrowser:!0,site:n,apiUrl:a});let c=location.href;setInterval((function(){c!=location.href&&(c=location.href,e.analyticsPageChange(s()))}),500),e.analyticsPageChange(s());const u=t.getAttribute("attr-tracking");u&&"false"!=u&&document.querySelectorAll("button, a").forEach((function(t){t.addEventListener("click",(t=>{if(!t.target)return;const i=t.target,n=i.getAttribute("swa-event");if(n){const t=i.getAttribute("swa-event-category")||void 0,r=i.getAttribute("swa-event-data")||void 0,a=r?Number(r):void 0;e.analyticsTrack(n,a,t)}}))}))})();
//# sourceMappingURL=client-script.js.map