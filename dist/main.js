(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n){for(var a=0;a<n.length;a++){var i=n[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(void 0,s=function(t,n){if("object"!==e(t)||null===t)return t;var a=t[Symbol.toPrimitive];if(void 0!==a){var i=a.call(t,"string");if("object"!==e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(i.key),"symbol"===e(s)?s:String(s)),i)}var s}var n=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init()}var n,a;return n=e,(a=[{key:"init",value:function(){null===localStorage.getItem("tasksList")&&(console.log("Storage empty, key created"),localStorage.setItem("tasksList","[]"),localStorage.setItem("lastId","-1")),null===localStorage.getItem("dark-mode")&&localStorage.setItem("dark-mode","init")}},{key:"getAll",value:function(){var e=localStorage.getItem("tasksList");return JSON.parse(e)}},{key:"updateAll",value:function(e){var t=[];e.forEach((function(e,n){var a={name:e.name,isDone:e.isDone,id:n};t.push(a)})),localStorage.setItem("lastId",t.length-1),localStorage.setItem("tasksList",JSON.stringify(t))}},{key:"set",value:function(e,t){var n={name:e,isDone:t},a=this.getAll(),i=Number(localStorage.getItem("lastId"));return n.id=i+1,a.push(n),localStorage.setItem("tasksList",JSON.stringify(a)),localStorage.setItem("lastId",n.id),n.id}},{key:"updateText",value:function(e,t){var n=this.getAll(),a=[];n.forEach((function(n){e==n.id&&(n.name=t),a.push(n)})),localStorage.setItem("tasksList",JSON.stringify(a))}},{key:"complete",value:function(e){var t=this.getAll(),n=[];t.forEach((function(t){e==t.id&&(t.isDone=!t.isDone),n.push(t)})),localStorage.setItem("tasksList",JSON.stringify(n))}},{key:"delete",value:function(e){var t=this.getAll(),n=[];t.forEach((function(t){e!=t.id&&n.push(t)})),localStorage.setItem("tasksList",JSON.stringify(n)),0===n.length&&localStorage.setItem("lastId",-1)}},{key:"setDarkMode",value:function(e){localStorage.setItem("dark-mode",e)}},{key:"getDarkMode",value:function(){return localStorage.getItem("dark-mode")}}])&&t(n.prototype,a),Object.defineProperty(n,"prototype",{writable:!1}),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,s=function(e,t){if("object"!==a(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==a(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===a(s)?s:String(s)),i)}var s}function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==s(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!==s(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===s(i)?i:String(i)),a)}var i}function o(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var c=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"create",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.options=t,this.build(e),this.addContent(),this.addAttributes(),this.element}},{key:"build",value:function(e){this.element=document.createElement(e)}},{key:"addContent",value:function(){this.element.textContent=this.options.content}},{key:"addAttributes",value:function(){var e,t=this;null===(e=this.options.attributes)||void 0===e||e.forEach((function(e){t.element.setAttribute(e.name,e.value)}))}}],n&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()),u=new n,d=function(){function e(){r(this,e),this.items=[],this.elements=[],this.componentFrame=document.querySelector("#component"),this.frame=c.create("div",{attributes:[{name:"id",value:"frame"}]}),this.ctrls={},this.buildPage(),this.initEvents()}return o(e,[{key:"buildPage",value:function(){this.buildTemplate(),this.buildHeader(),this.buildMain(),"true"===u.getDarkMode()?document.body.classList.add("dark-mode"):"init"===u.getDarkMode()&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?(document.body.classList.add("dark-mode"),u.setDarkMode(!0)):u.setDarkMode(!1))}},{key:"buildHeader",value:function(){var e=c.create("h2",{content:"To do :"});this.ctrls.darkSwitch=c.create("button",{attributes:[{name:"class",value:"btn-dark"}]}),this.ctrls.searchBar=c.create("input",{attributes:[{name:"class",value:"search-bar"},{name:"type",value:"text"}]}),this.ctrls.searchReset=c.create("button",{content:"X",attributes:[{name:"class",value:"btn-sb-reset"}]});var t=c.create("div");t.append(this.ctrls.searchBar,this.ctrls.searchReset,this.ctrls.darkSwitch);var n=c.create("header");n.append(e,t),this.frame.appendChild(n),this.componentFrame.appendChild(this.frame)}},{key:"buildMain",value:function(){var e=c.create("div",{attributes:[{name:"class",value:"controlsDiv"}]}),t=c.create("div",{attributes:[{name:"class",value:"controlsBar"}]});this.ctrls.filters=c.create("div",{attributes:[{name:"class",value:"filters"}]}),this.filtAll=c.create("button",{attributes:[{name:"class",value:"filter active"},{name:"value",value:"all"}],content:"All"}),this.filtAct=c.create("button",{attributes:[{name:"class",value:"filter"},{name:"value",value:"act"}],content:"Active"}),this.filtDone=c.create("button",{attributes:[{name:"class",value:"filter"},{name:"value",value:"done"}],content:"Completed"}),this.currentFilter=this.filtAll,this.ctrls.filters.append(this.filtAll,this.filtAct,this.filtDone),e.appendChild(this.ctrls.filters);var n=c.create("span",{content:"Add a new task"}),a=c.create("span",{content:"Clear completed"});this.ctrls.btnAdd=c.create("button",{attributes:[{name:"class",value:"ctrl-add"}]}),this.ctrls.btnAdd.appendChild(n),this.ctrls.btnClr=c.create("button",{attributes:[{name:"class",value:"ctrl-clr"}]}),this.ctrls.btnClr.appendChild(a),t.append(this.ctrls.btnAdd,this.ctrls.btnClr),e.appendChild(t);var i=c.create("main");i.appendChild(e),this.frame.appendChild(i),this.tasksContainer=c.create("div",{attributes:[{name:"id",value:"tasks-container"}]}),i.appendChild(this.tasksContainer)}},{key:"buildTemplate",value:function(){this.template=c.create("template",{attributes:[{name:"id",value:"taskTemplate"}]});var e=c.create("div"),t=c.create("p",{attributes:[{name:"contentEditable",value:"true"},{name:"spellCheck",value:!1}]}),n=c.create("div");n.append(e,t);var a=c.create("button",{attributes:[{name:"class",value:"btn-done"}]}),i=c.create("button",{attributes:[{name:"class",value:"btn-del"}]}),s=c.create("div",{attributes:[{name:"class",value:"btns-div"}]});s.append(a,i);var r=c.create("div",{attributes:[{name:"class",value:"task-bar"}]});r.append(n,s),this.template.appendChild(r),document.body.appendChild(this.template)}},{key:"initEvents",value:function(){var e=this;this.ctrls.btnAdd.addEventListener("click",(function(){e.addTask()})),this.ctrls.btnClr.addEventListener("click",(function(){e.elements.forEach((function(e){e.isComplete&&e.delete()}))})),this.ctrls.darkSwitch.addEventListener("click",(function(){document.body.classList.toggle("dark-mode"),document.body.classList.contains("dark-mode")?u.setDarkMode(!0):u.setDarkMode(!1)})),this.ctrls.searchBar.addEventListener("input",(function(t){e.search(t.target.value)})),this.ctrls.searchReset.addEventListener("click",(function(){e.ctrls.searchBar.value="",e.search()})),this.ctrls.filters.addEventListener("click",(function(t){e.currentFilter.classList.remove("active"),t.target.classList.add("active"),e.currentFilter=t.target,e.applyFilters()}))}},{key:"getAll",value:function(){this.items=u.getAll()}},{key:"buildAllItems",value:function(){var e=this;this.items.forEach((function(t){e.elements[t.id]=new m(t)}))}},{key:"addTask",value:function(){var e=new m({name:arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ",isDone:!1}),t=e.addToLS();e.id=t,this.elements[t]=e,this.getAll(),e.text.focus()}},{key:"move",value:function(e,t,n){var a=this,i=[];this.items.forEach((function(s){s.id===t?n?(i.push(a.items[e]),i.push(s)):(i.push(s),i.push(a.items[e])):s.id!=e&&i.push(s)})),u.updateAll(i),this.getAll(),this.tasksContainer.replaceChildren(),this.buildAllItems(),this.applyFilters()}},{key:"applyFilters",value:function(){var e=this;this.elements.forEach((function(t){switch(e.currentFilter.value){case"all":t.element.classList.remove("hide");break;case"act":t.isComplete?t.element.classList.add("hide"):t.element.classList.remove("hide");break;case"done":t.isComplete?t.element.classList.remove("hide"):t.element.classList.add("hide")}})),this.ctrls.searchBar.value&&this.search(this.ctrls.searchBar.value)}},{key:"search",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=t.toLowerCase();t?(this.ctrls.searchBar.classList.add("hasText"),this.ctrls.searchReset.classList.add("active")):(this.ctrls.searchBar.classList.remove("hasText"),this.ctrls.searchReset.classList.remove("active")),this.elements.forEach((function(t){t.element.textContent.toLowerCase().includes(n)?("all"===e.currentFilter.value||t.isComplete&&"done"===e.currentFilter.value||!t.isComplete&&"act"===e.currentFilter.value)&&t.element.classList.remove("hide"):t.element.classList.add("hide")}))}}]),e}(),m=function(){function e(t){r(this,e),this.name=t.name,this.isComplete=t.isDone,this.id=t.id,"content"in document.createElement("template")?this.build(t.name):this.buildNoTemplate(t.name),this.initEvents()}return o(e,[{key:"build",value:function(e){this.element=document.importNode(document.querySelector("template").firstChild,!0),this.text=this.element.querySelector("p"),this.text.textContent=e,this.container.appendChild(this.element),this.isComplete&&this.element.classList.add("done"),this.btnDel=this.element.querySelector(".btn-del"),this.btnDone=this.element.querySelector(".btn-done"),this.grabHandle=this.element.querySelector(".task-bar > div:first-child > div:first-child")}},{key:"buildNoTemplate",value:function(e){this.grabHandle=c.create("div"),this.text=c.create("p",{attributes:[{name:"contentEditable",value:"true"},{name:"spellCheck",value:!1}],content:e});var t=c.create("div");t.append(this.grabHandle,this.text),this.btnDone=c.create("button",{attributes:[{name:"class",value:"btn-done"}]}),this.btnDel=c.create("button",{attributes:[{name:"class",value:"btn-del"}]});var n=c.create("div",{attributes:[{name:"class",value:"btns-div"}]});n.append(this.btnDone,this.btnDel),this.element=c.create("div",{attributes:[{name:"class",value:"task-bar"}]}),this.element.append(t,n),this.container.appendChild(this.element)}},{key:"addToLS",value:function(){return this.id=u.set(this.name,this.isComplete),this.id}},{key:"initEvents",value:function(){var e=this;this.btnDone.addEventListener("click",(function(){e.complete(),h.applyFilters()})),this.btnDel.addEventListener("click",(function(){e.delete()})),this.text.addEventListener("focusout",(function(){e.putText(e.text.textContent),h.getAll()})),this.text.addEventListener("keypress",(function(e){"Enter"===e.key&&(e.preventDefault(),e.target.blur())})),this.grabHandle.addEventListener("mouseenter",(function(){e.element.draggable=!0})),this.grabHandle.addEventListener("mouseleave",(function(){e.element.draggable=!1})),this.element.addEventListener("dragstart",(function(t){e.element.classList.add("move"),sessionStorage.setItem("dragId",e.id),t.dataTransfer.effectAllowed="move",e.text.contentEditable="false"})),this.element.addEventListener("dragend",(function(){e.element.classList.remove("move"),e.text.contentEditable="true"})),this.element.addEventListener("dragover",(function(t){t.preventDefault();var n=Number(sessionStorage.getItem("dragId"));if(e.id!=n){var a=e.isTopHalf(t);a&&e.id==n+1||!a&&e.id+1==n||(t.dataTransfer.dropEffect="move",e.element.classList.add(a?"moveOver":"moveUnder")),e.element.classList.remove(a?"moveUnder":"moveOver")}})),this.element.addEventListener("dragenter",(function(){e.element.firstChild.classList.add("noEvents")})),this.element.addEventListener("dragleave",(function(){e.element.classList.remove("moveUnder"),e.element.classList.remove("moveOver"),e.element.firstChild.classList.remove("noEvents")})),this.element.addEventListener("drop",(function(t){t.preventDefault(),e.element.classList.remove("moveUnder"),e.element.classList.remove("moveOver");var n=Number(sessionStorage.getItem("dragId")),a=e.isTopHalf(t);e.id==n||a&&e.id==n+1||!a&&e.id+1==n||h.move(n,e.id,a)}))}},{key:"isTopHalf",value:function(e){var t=e.target.getBoundingClientRect();return 2*(e.clientY-t.top)<t.height}},{key:"putText",value:function(e){u.updateText(this.id,e)}},{key:"complete",value:function(){this.isComplete=!this.isComplete,this.element.classList.toggle("done"),u.complete(this.id),h.getAll(),h.applyFilters()}},{key:"delete",value:function(){this.element.remove(),u.delete(this.id),h.getAll()}}]),e}(),h=new d;m.prototype.container=document.querySelector("#tasks-container"),h.getAll(),h.buildAllItems()})();