(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t.n(o),a=t(14),r=t.n(a),u=t(15),i=t(4),s=t(0),l=function(e){var n=e.handleFilter;return Object(s.jsxs)("div",{children:["filter shown with: ",Object(s.jsx)("input",{onChange:n})]})},d=function(e){var n=e.handleSubmit,t=e.handleInput,o=e.handleNumber;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{onChange:t})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{onChange:o})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},h=t(3),b=t.n(h),j="/api",f=function(e){return b.a.post("".concat(j,"/new"),e)},m=function(){return b.a.get("".concat(j,"/persons"))},O=function(e){return console.log("".concat(j,"/delete/").concat(e)),b.a.delete("".concat(j,"/delete/").concat(e)).then((function(e){return e.data}))},g=function(e,n){return b.a.put("".concat(j,"/").concat(e),n)},w=function(e){return e.shownPersons.map((function(n){return Object(s.jsxs)("p",{children:[n.name," ",n.number,"  ",Object(s.jsx)("button",{onClick:function(){return function(n){window.confirm("Are you sure you want to delete ".concat(n.name))&&O(n.id).then((function(){return m().then((function(n){return e.setShownPersons(n.data)}))})).catch((function(n){e.setSuccess("Something went wrong"),console.log(n)}))}(n)},children:"Delete"})," "]},n.name)}))},p=function(){var e=Object(o.useState)(m().response),n=Object(i.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(null),r=Object(i.a)(a,2),h=r[0],b=r[1];Object(o.useEffect)((function(){console.log("effect"),m().then((function(e){console.log("promise fulfilled"),c(e.data),v(e.data)}))}),[]);var j=Object(o.useState)([{name:"Arto Hellas",number:123456789}]),O=Object(i.a)(j,2),p=O[0],v=O[1],x=Object(o.useState)(""),S=Object(i.a)(x,2),k=S[0],C=S[1],y=Object(o.useState)(0),I=Object(i.a)(y,2),P=I[0],A=I[1];return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(l,{handleFilter:function(e){var n=e.target.value,o=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));v(o),console.log(e.target.value),C(e.target.value)}}),Object(s.jsx)("p",{children:h}),Object(s.jsx)("h3",{children:"Add a new"}),Object(s.jsx)(d,{handleInput:function(e){console.log(e.target.value),C(e.target.value)},handleNumber:function(e){console.log(e.target.value),A(e.target.value)},handleSubmit:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===k}));if(0===n.length){t.map((function(e){return Object(u.a)({},e)}));var o={name:k,number:P};f(o).then((function(e){m().then((function(e){console.log("Response data is",e.data),b("It worked, ".concat(o.name," has been added")),setTimeout((function(){b(null)}),5e3),v(e.data),c(e.data)})).catch((function(e){b("Something went wrong"),console.log(e)}))}))}else if(window.confirm(k+"is already added to the phone book.  Replace old number with new number?")){var a={name:k,number:P};g(n[0].id,a).then((function(e){m().then((function(e){b("It worked, ".concat(a.name," has been added with a new number")),setTimeout((function(){b(null)}),5e3),v(e.data),c(e.data)})).catch((function(e){b("Something went wrong"),console.log(e)}))}))}}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(w,{shownPersons:p,setShownPersons:v,setSuccess:b})]})};r.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(p,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.70a30f03.chunk.js.map