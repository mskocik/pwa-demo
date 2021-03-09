"use strict";

wrap(document.getElementById('title'));

function setStatus() {
  document.getElementById('value').innerText = navigator.onLine ? 'Online' : 'Offline';
}

window.addEventListener('online', setStatus);
window.addEventListener('offline', setStatus);

setStatus();
// demo
console.log('demo');
// init
const d = new Date();
const el = document.createElement('span');
document.body.appendChild(el);
el.innerHTML = d.toString(); 
 