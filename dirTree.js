let fs = require('fs');
let path = require('path');
let target = path.join(__dirname, './');

function loadTree(target, deep) {
  let prev = new Array(deep).join(' | ');
  let dirInfo = fs.readdirSync(target);
  let files = [];
  let dirs = [];
  for (var i = 0; i < dirInfo.length; i++) {
    let state = fs.statSync(path.join(target, dirInfo[i]));
    if (state.isFile()) {
      files.push(dirInfo[i]);
    } else {
      dirs.push(dirInfo[i]);
    }
  }
  for (let i = 0; i < dirs.length; i++) {
    console.log(`${prev}├─ ${dirs[i]}`);
    let nestPath = path.join(target, dirs[i]);
    let nextDeep = deep + 1;
    loadTree(nestPath, nextDeep);
  }
  for (let i = 0; i < files.length; i++) {
    if (i === files.length - 1) {
      console.log(`${prev}└─ ${files[i]}`);
    } else {
      console.log(`${prev}├─ ${files[i]}`);
    }
  }
}

loadTree(target, 1);
