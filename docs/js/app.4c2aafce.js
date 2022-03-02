(function(){"use strict";var n={6943:function(n,t,e){var r=e(9242),a=e(3396);const i={class:"flex flex-wrap h-full"},o=(0,a._)("div",null,null,-1),u={class:"h-5/6 lg:w-1/2 mx-auto"},c={class:"h-5/6 lg:w-1/2 text-center mx-auto"};function s(n,t,e,r,s,l){const f=(0,a.up)("NavigationBar"),v=(0,a.up)("QuestionArea"),p=(0,a.up)("CameraArea");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(f),(0,a._)("main",i,[o,(0,a._)("div",u,[(0,a.Wm)(v)]),(0,a._)("div",c,[(0,a.Wm)(p)])])],64)}const l={class:"w-full camera m-auto text-center"},f={ref:"video",id:"camera",class:"lg:w-3/5 h-full text-center mx-auto object-fill",playsinline:"",autoplay:""},v=(0,a._)("button",{type:"button",class:"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"},"Snap! (or just push Q)",-1);function p(n,t,e,r,i,o){return(0,a.wg)(),(0,a.iD)("div",l,[(0,a._)("video",f,null,512),v])}var d=e(4870),g=(0,a.aZ)({name:"CameraArea",setup(){const n=(0,d.iH)();return(0,a.bv)((()=>{const t="environment";navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:t,width:{min:1080},height:{min:1620,ideal:1620}},audio:!1}).then((t=>{n.value&&null!==n.value&&(n.value.srcObject=t,n.value.play())}))})),{video:n}}}),m=e(89);const h=(0,m.Z)(g,[["render",p]]);var b=h,w=e(6949);const x={class:"navbar bg-gray-100 mb-2 h-10 shadow"},y=(0,a.uE)('<div class="navbar-start"></div><div class="navbar-center"><a href="#" class="h-12"><img src="'+w+'" class="h-full object-contain mx-auto" alt="Logo"></a></div><div class="navbar-end"><span class="font-title mr-2">config</span></div>',3),O=[y];function j(n,t,e,r,i,o){return(0,a.wg)(),(0,a.iD)("div",x,O)}var _=(0,a.aZ)({name:"NavigationBar",setup(){}});const k=(0,m.Z)(_,[["render",j]]);var A=k,D=e(5148);const Z={class:"h-full w-full text-center"},C=(0,a._)("img",{class:"w-5/6 text-center object-contain mx-auto",src:D,alt:""},null,-1),Q=[C];function M(n,t,e,r,i,o){return(0,a.wg)(),(0,a.iD)("div",Z,Q)}var B=(0,a.aZ)({name:"QuestionArea",setup(){}});const N=(0,m.Z)(B,[["render",M]]);var W=N,E={name:"App",components:{CameraArea:b,NavigationBar:A,QuestionArea:W}};const H=(0,m.Z)(E,[["render",s]]);var P=H;(0,r.ri)(P).mount("#app")},6949:function(n,t,e){n.exports=e.p+"img/logo.dbb7ac88.png"},5148:function(n,t,e){n.exports=e.p+"img/sampleQuestion.88b841c3.png"}},t={};function e(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return n[r](i,i.exports,e),i.exports}e.m=n,function(){var n=[];e.O=function(t,r,a,i){if(!r){var o=1/0;for(l=0;l<n.length;l++){r=n[l][0],a=n[l][1],i=n[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&i||o>=i)&&Object.keys(e.O).every((function(n){return e.O[n](r[c])}))?r.splice(c--,1):(u=!1,i<o&&(o=i));if(u){n.splice(l--,1);var s=a();void 0!==s&&(t=s)}}return t}i=i||0;for(var l=n.length;l>0&&n[l-1][2]>i;l--)n[l]=n[l-1];n[l]=[r,a,i]}}(),function(){e.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return e.d(t,{a:t}),t}}(),function(){e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)}}(),function(){e.p=""}(),function(){var n={143:0};e.O.j=function(t){return 0===n[t]};var t=function(t,r){var a,i,o=r[0],u=r[1],c=r[2],s=0;if(o.some((function(t){return 0!==n[t]}))){for(a in u)e.o(u,a)&&(e.m[a]=u[a]);if(c)var l=c(e)}for(t&&t(r);s<o.length;s++)i=o[s],e.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return e.O(l)},r=self["webpackChunkclient"]=self["webpackChunkclient"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(6943)}));r=e.O(r)})();
//# sourceMappingURL=app.4c2aafce.js.map