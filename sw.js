if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const a=e=>n(e,o),d={module:{uri:o},exports:c,require:a};i[o]=Promise.all(s.map((e=>d[e]||a(e)))).then((e=>(r(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/android-chrome-192x192-CUjrgrKr.png",revision:null},{url:"assets/index-BgihJjXM.css",revision:null},{url:"assets/index-DkUsAIdg.js",revision:null},{url:"assets/nn-4ShFjRio.ico",revision:null},{url:"favicon.ico",revision:"1059ef90d889c0e83b37a3a344cd4a2e"},{url:"icons/android-chrome-192x192.png",revision:"f23201a788018326fd170288942b4760"},{url:"icons/android-chrome-512x512.png",revision:"30ea3aa716c61b9b4e61555d56079ca0"},{url:"icons/apple-touch-icon.png",revision:"819c29eecc7f357491e6b946d29c522c"},{url:"icons/favicon-16x16.png",revision:"b9fb316f83de0661517d359e913f48cf"},{url:"icons/favicon-32x32.png",revision:"952b4f9b7de1a45d50f25e788f2f803c"},{url:"icons/mstile-150x150.png",revision:"becaf243a5aa3f6136ec3823a5f11a7e"},{url:"icons/safari-pinned-tab.svg",revision:"ca5584c30f53d4f809ccbd8ca5a870c4"},{url:"index.html",revision:"1d1cef199b2d53756690a93e02815ae1"},{url:"icons/android-chrome-192x192.png",revision:"f23201a788018326fd170288942b4760"},{url:"icons/android-chrome-512x512.png",revision:"30ea3aa716c61b9b4e61555d56079ca0"},{url:"manifest.webmanifest",revision:"33a2e68ea339233af28a7093de54ad0d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));