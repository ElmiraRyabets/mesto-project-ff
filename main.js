(()=>{"use strict";function e(e){e.remove()}function t(e,t){t?e.classList.add("card__like-button_is-active"):e.classList.remove("card__like-button_is-active")}function n(e,t,n){n.textContent=e}function r(e,t){var n=!1,r=e.likes;return null!=e.likes&&r.forEach((function(e){e._id===t&&(n=!0)})),n}function o(e){e.classList.remove("popup_is-opened"),e.removeEventListener("mousedown",u),document.removeEventListener("keydown",a)}function c(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",u),document.addEventListener("keydown",a)}function u(e){e.target===e.currentTarget&&o(e.target)}function a(e){"Escape"==e.key&&o(document.querySelector(".popup_is-opened"))}var i=function(e,t,n,r){e.classList.remove(t),n.textContent="",n.classList.remove(r)},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))};function s(e,t){var n=t.inputSelector,r=t.submitButtonSelector,o=t.inactiveButtonClass,c=t.inputErrorClass,u=t.errorClass,a=Array.from(e.querySelectorAll(n)),s=e.querySelector(r);a.forEach((function(t){var n=e.querySelector(".".concat(t.id,"-error"));i(t,c,n,u)})),l(a,s,o)}var d={baseUrl:"https://nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"218cd896-e761-498d-89f7-9c5fe951097b","Content-Type":"application/json"}};function p(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function f(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{headers:d.headers,method:"DELETE"}).then((function(e){return p(e)}))}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,y=document.querySelector(".popup_type_image"),v=y.querySelector(".popup__image"),h=y.querySelector(".popup__caption"),S=document.querySelector(".places__list"),b=document.querySelector("#card-template").content;function q(e,t){e.textContent=t?"Сохранение...":"Сохранить"}function g(e,r,o,c){var u=function(e){return!!e.classList.contains("card__like-button_is-active")}(r);u?function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{headers:d.headers,method:"DELETE"}).then((function(e){return p(e)}))}(e).then((function(e){t(r,!1),n(e.likes.length,0,c)})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{headers:d.headers,method:"PUT"}).then((function(e){return p(e)}))}(e).then((function(e){t(r,!0),n(e.likes.length,0,c)})).catch((function(e){console.log(e)}))}function E(r,o,c,u,a,i,l){var s=function(e,r,o,c,u,a,i,l,s,d,p,f){var _,m=c.querySelector(".card").cloneNode(!0),y=m.querySelector(".card__like-button"),v=m.querySelector(".card__like-button-counter");t(y,d),n(a,0,v),_=p===f;var h=m.querySelector(".card__image"),S=m.querySelector(".card__title");h.src=e,S.textContent=r;var b=m.querySelector(".card__delete-button");return b.addEventListener("click",(function(){i(l).then((function(){o(m)})).catch((function(e){console.log(e)}))})),y.addEventListener("click",(function(){return s(l,y,m,v)})),h.addEventListener("click",(function(){return u(e,r)})),_&&b.classList.add("active_card_delete-button"),m}(o,r,e,b,R,u,f,i,g,l,a,m);c?S.prepend(s):S.append(s)}var L=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),C=document.querySelector(".popup__input_type_update-avatar"),A=document.querySelector(".profile__image"),w=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function x(e,t,n){w.textContent=e,T.textContent=t,A.style.backgroundImage="url(".concat(n,")")}var P=document.querySelector(".profile__edit-button"),I=document.querySelector(".popup_type_edit");P.addEventListener("click",(function(e){L.value=w.innerHTML,k.value=T.innerHTML,s(I.querySelector(".popup__form"),U),c(I),e.stopImmediatePropagation()}));var j=document.querySelector(".profile__add-button"),O=document.querySelector(".popup_type_new-card");j.addEventListener("click",(function(e){s(O.querySelector(".popup__form"),U),c(O),e.stopImmediatePropagation()}));var B=document.querySelector(".profile__image-button"),M=document.querySelector(".popup_type_update-avatar");B.addEventListener("click",(function(e){s(M.querySelector(".popup__form"),U),c(M),e.stopImmediatePropagation()}));var D=document.forms["update-avatar"],H=D.querySelector(".popup__button");function N(e){o(e.target.closest(".popup"))}D.addEventListener("submit",(function(e){q(H,!0),e.preventDefault(),function(e){return fetch("".concat(d.baseUrl,"/users/me/avatar"),{headers:d.headers,method:"PATCH",body:JSON.stringify({avatar:e})}).then((function(e){return p(e)}))}(C.value).then((function(){A.style.backgroundImage="url(".concat(C.value,")")})).then((function(){o(M)})).catch((function(e){console.log(e)})).finally((function(){q(H,!0)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",N)}));var J=document.forms["edit-profile"],V=J.querySelector(".popup__button");J.addEventListener("submit",(function(e){var t,n;q(V,!0),e.preventDefault(),(t=L.value,n=k.value,fetch("".concat(d.baseUrl,"/users/me"),{headers:d.headers,method:"PATCH",body:JSON.stringify({name:t,about:n})}).then((function(e){return p(e)}))).then((function(e){x(e.name,e.about,e.avatar)})).then((function(){o(I)})).catch((function(e){console.log(e)})).finally((function(){q(V,!1)}))}));var z,$,F=document.forms["new-place"],G=document.querySelector(".popup__input_type_card-name"),K=document.querySelector(".popup__input_type_url"),Q=F.querySelector(".popup__button");function R(e,t){c(y),v.src=e,v.alt=t,h.textContent=t}F.addEventListener("submit",(function(e){var t,n;q(Q,!0),e.preventDefault(),(t=G.value,n=K.value,fetch("".concat(d.baseUrl,"/cards"),{headers:d.headers,method:"POST",body:JSON.stringify({name:t,link:n})}).then((function(e){return p(e)}))).then((function(e){E(e.name,e.link,!0,e.likes.length,e.owner._id,e._id,r(e,m)),o(O),F.reset()})).catch((function(e){console.log(e)})).finally((function(){q(Q,!1)}))})),Promise.all([fetch("".concat(d.baseUrl,"/users/me "),{headers:d.headers}).then((function(e){return p(e)})),fetch("".concat(d.baseUrl,"/cards"),{headers:d.headers}).then((function(e){return p(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];x(c.name,c.about,c.avatar),m=c._id,u.forEach((function(e){E(e.name,e.link,!1,e.likes.length,e.owner._id,e._id,r(e,m))}))})).catch((function(e){console.log(e)})),$=(z=U).formSelector,Array.from(document.querySelectorAll($)).forEach((function(e){!function(e,t){var n=t.inputSelector,r=t.submitButtonSelector,o=t.inactiveButtonClass,c=t.inputErrorClass,u=t.errorClass,a=Array.from(e.querySelectorAll(n)),s=e.querySelector(r);l(a,s,o),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity("");var o=n.querySelector(".".concat(e.id,"-error"));e.validity.valid?i(e,t,o,r):function(e,t,n,r,o){r.textContent=t,e.classList.add(n),r.classList.add(o)}(e,e.validationMessage,t,o,r)}(t,c,e,u),l(a,s,o)}))}))}(e,z)}))})();