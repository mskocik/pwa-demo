"use strict";

function wrap(el) {
  setInterval(() => {
    el.style.backgroundColor = list[Math.round(Math.random() * 1000) % 23];
  }, 3000);
}

const list = ['#000000',
'#000080',
'#00008B',
'#0000CD',
'#0000FF',
'#006400',
'#008000',
'#008080',
'#008B8B',
'#00BFFF',
'#00CED1',
'#00FA9A',
'#00FF00',
'#00FF7F',
'#00FFFF',
'#00FFFF',
'#191970',
'#1E90FF',
'#20B2AA',
'#228B22',
'#2E8B57',
'#2F4F4F',
'#2F4F4F',
'#32CD32',
'#3CB371',
'#40E0D0'];