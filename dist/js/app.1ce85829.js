(function(t){function e(e){for(var a,l,s=e[0],i=e[1],u=e[2],p=0,f=[];p<s.length;p++)l=s[p],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&f.push(n[l][0]),n[l]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);c&&c(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],a=!0,s=1;s<r.length;s++){var i=r[s];0!==n[i]&&(a=!1)}a&&(o.splice(e--,1),t=l(l.s=r[0]))}return t}var a={},n={app:0},o=[];function l(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.m=t,l.c=a,l.d=function(t,e,r){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(r,a,function(e){return t[e]}.bind(null,a));return r},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var c=i;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("cd49")},"034f":function(t,e,r){"use strict";var a=r("85ec"),n=r.n(a);n.a},"85ec":function(t,e,r){},cd49:function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[t._m(0),r("router-view")],1)},o=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"jumbotron bg-primary"},[r("h1",[t._v("Jensns Youtube Downloader")])])}],l=(r("034f"),r("2877")),s={},i=Object(l["a"])(s,n,o,!1,null,null,null),u=i.exports,c=r("8c4f"),p=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row"},[r("div",{staticClass:"btn-group mr-2 mb-3",attrs:{role:"group","aria-label":"First group"}},[r("button",{staticClass:"btn",class:{"btn-primary":!t.playlist,"btn-secondary":t.playlist},attrs:{type:"button"},on:{click:t.setSingle}},[t._v("Einzeln")]),r("button",{staticClass:"btn",class:{"btn-primary":t.playlist,"btn-secondary":!t.playlist},attrs:{type:"button"},on:{click:t.setPlaylist}},[t._v("Playlist")])]),r("choose-format",{model:{value:t.format,callback:function(e){t.format=e},expression:"format"}}),r("div",{staticClass:"input-group mb-3"},[t._m(0),r("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],staticClass:"form-control",attrs:{id:"url",placeholder:"https://www.youtube.com/watch?v=6Lrmy8-p3BM"},domProps:{value:t.url},on:{input:function(e){e.target.composing||(t.url=e.target.value)}}})]),t.playlist?t._e():r("div",{staticClass:"input-group mb-3"},[t._m(1),r("input",{directives:[{name:"model",rawName:"v-model",value:t.fileName,expression:"fileName"}],staticClass:"form-control",attrs:{id:"fileName"},domProps:{value:t.fileName},on:{input:function(e){e.target.composing||(t.fileName=e.target.value)}}})]),r("div",{staticClass:"input-group mb-3"},[t._m(2),r("input",{directives:[{name:"model",rawName:"v-model",value:t.folder,expression:"folder"}],staticClass:"form-control",attrs:{id:"folder"},domProps:{value:t.folder},on:{input:function(e){e.target.composing||(t.folder=e.target.value)}}})]),r("button",{staticClass:"btn btn-primary",on:{click:t.download}},[t._v("Download")])],1)])},f=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-group-prepend"},[r("label",{staticClass:"input-group-text",attrs:{for:"url"}},[t._v("URL")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-group-prepend"},[r("label",{staticClass:"input-group-text",attrs:{for:"fileName"}},[t._v("Name ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-group-prepend"},[r("label",{staticClass:"input-group-text",attrs:{for:"folder"}},[t._v("Ordner ")])])}],m=(r("4de4"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-group mb-3"},[t._m(0),r("select",{ref:"format",staticClass:"custom-select",attrs:{id:"inputGroupSelect01"},domProps:{value:t.format},on:{input:t.updateFormat}},[r("option",{attrs:{selected:"",value:"mp3"}},[t._v("Mp3(Audio)")]),r("option",{attrs:{value:"mp4"}},[t._v("Mp4(Video)")])])])}),d=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input-group-prepend"},[r("label",{staticClass:"input-group-text",attrs:{for:"inputGroupSelect01"}},[t._v("Format")])])}],v=a["a"].extend({name:"SelectChooseFormat",props:{format:{required:!1,default:function(){return"mp3"}}},methods:{updateFormat:function(){this.$emit("input",this.$refs.format.value)}}}),b=v,h=Object(l["a"])(b,m,d,!1,null,null,null),y=h.exports,g={name:"Home",components:{"choose-format":y},computed:{filter:function(){return"mp3"===this.format?"audioonly":""}},data:function(){return{format:"mp3",url:"",fileName:"",playlist:!1,folder:""}},methods:{setSingle:function(){this.playlist=!1},setPlaylist:function(){this.playlist=!0},download:function(){this.$http.post("http://localhost:4000/save",{url:this.url,fileName:this.fileName,filter:this.filter,folder:this.folder,playlist:this.playlist,format:this.format})}}},_=g,w=Object(l["a"])(_,p,f,!1,null,null,null),C=w.exports;a["a"].use(c["a"]);var x=[{path:"/",name:"Home",component:C}],O=new c["a"]({mode:"history",base:"/",routes:x}),P=O,j=r("2f62");a["a"].use(j["a"]);var N=new j["a"].Store({state:{},mutations:{},actions:{},modules:{}}),$=r("bc3a"),S=r.n($);r("4989"),r("ab8b");a["a"].config.productionTip=!1,a["a"].prototype.$http=S.a,new a["a"]({router:P,store:N,render:function(t){return t(u)}}).$mount("#app")}});
//# sourceMappingURL=app.1ce85829.js.map