(self.webpackChunkofiryaron_com=self.webpackChunkofiryaron_com||[]).push([[250],{9536:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var r=t(2791),a=t(1523),i=t(9251),o=t(885),s=t(8029),c=t.n(s),l=t(9565),d=t(3415),u=t(184),m=function(){return(0,u.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"#88d1ef",children:[(0,u.jsx)("path",{d:"M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"}),(0,u.jsx)("path",{d:"M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"})]})},f=function(){return(0,u.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"#88d1ef",children:[(0,u.jsx)("path",{d:"M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"}),(0,u.jsx)("path",{d:"M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"})]})},h=function(e){var n=e.children,t=e.language,a=(0,r.useState)(!1),i=(0,o.Z)(a,2),s=i[0],h=i[1];return(0,r.useEffect)((function(){var e=setTimeout((function(){h(!1)}),1e3);return function(){return clearTimeout(e)}}),[s]),(0,u.jsxs)("div",{className:"code",children:[(0,u.jsx)(c(),{text:n,onCopy:function(){return h(!0)},children:(0,u.jsx)("button",{className:"icon copy-icon",children:s?(0,u.jsx)(f,{}):(0,u.jsx)(m,{})})}),(0,u.jsx)(l.Z,{language:t,style:d.Z,children:n})]})},p=function(e){var n=e.post;return(0,u.jsxs)("article",{className:"post markdown",id:"post".concat(n.date),children:[(0,u.jsx)("header",{children:(0,u.jsxs)("div",{className:"title",children:[(0,u.jsx)("h2",{"data-testid":"heading",children:(0,u.jsx)(a.rU,{to:"/post/".concat(n.permalink),children:n.title})}),(0,u.jsxs)("p",{children:["(in about ",n.wordcount," words)"]}),(0,u.jsxs)("p",{children:["posted on ",n.date," By Ofir Yaron"]})]})}),(0,u.jsx)("div",{className:"container",children:(0,u.jsx)("div",{className:"post-wrapper",children:(0,u.jsx)(i.Z,{options:{overrides:{code:{component:h}}},children:n.markdown})})})]})}},3099:function(e,n,t){"use strict";t.r(n);n.default=[{filename:"blog-roadmap.md"},{filename:"tampermonkey-functions.md"},{filename:"terraform-modules.md"},{filename:"bash-commands.md"},{filename:"mac-installations.md"},{filename:"efs-creation-bash.md"},{filename:"aliases-and-commands.md"},{filename:"docker-lifecycle.md"}]},8250:function(e,n,t){"use strict";t.r(n);var r=t(1413),a=t(2982),i=t(885),o=t(2791),s=t(3717),c=t(7187),l=t(9536),d=t(3099),u=t(184),m=function(e){var n=e.split("/").map((function(e){return parseInt(e,10)})),t=(0,i.Z)(n,3),r=t[0],a=t[1],o=t[2];return new Date(o,a-1,r)},f=function(e,n){return m(e.date)-m(n.date)};n.default=function(e){var n=e.children,m=(0,o.useState)([]),h=(0,i.Z)(m,2),p=h[0],x=h[1];return(0,o.useEffect)((function(){d.default.map((function(e){return t(7248)("./"+e.filename).then((function(n){fetch(n.default).then((function(e){return e.text()})).then((function(n){x((function(t){return[].concat((0,a.Z)(t),[(0,r.Z)((0,r.Z)({},(0,s.Z)(n)),{},{permalink:e.filename.replace(".md","")})]).sort(f)}))}))})),!0}))}),[n]),(0,u.jsx)(c.Z,{title:"Blog",description:"Software Development, Cloud Architecture and 3D Printing Articles",children:p.map((function(e){return(0,u.jsx)(l.Z,{post:e},e.date)}))})}},3717:function(e,n,t){"use strict";var r=t(4942),a=t(1413),i=t(2982),o=t(9235);n.Z=function(e){var n=e.split(/\s+/).map((function(e){return e.replace(/\W/g,"")})).filter((function(e){return e.length})).length,t=(0,o.Z)(/\[_metadata_:((\w)*)(\]:\x2D\s")([\w\s\d/'+\-,]*)(")/g,{field:1,value:4}),s=(0,i.Z)(e.matchAll(t)).reduce((function(e,n){return(0,a.Z)((0,a.Z)({},e),{},(0,r.Z)({},n[1],n[4]))}),{});return(0,a.Z)((0,a.Z)({},s),{},{wordcount:n,markdown:e.replace(t,"")})}},7248:function(e,n,t){var r={"./aliases-and-commands.md":[5966,1,966],"./bash-commands.md":[5543,1,543],"./blog":[3099,9],"./blog-roadmap.md":[1012,1,12],"./blog.js":[3099,9],"./docker-lifecycle.md":[3236,1,236],"./efs-creation-bash.md":[1677,1,677],"./mac-installations.md":[1831,1,831],"./react-gh-pages.md":[5880,1,880],"./tampermonkey-functions.md":[2299,1,299],"./terraform-modules.md":[8961,1,961]};function a(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],a=n[0];return Promise.all(n.slice(2).map(t.e)).then((function(){return t.t(a,16|n[1])}))}a.keys=function(){return Object.keys(r)},a.id=7248,e.exports=a}}]);
//# sourceMappingURL=250.61731067.chunk.js.map