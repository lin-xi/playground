性能优化：
1. 使用babel-plugin-import-fix, 只导入element中被用到的组件
2. 升级webpack3
3. webpack code spliting

优化前：
0.js        1.34mb
1.js        1.34mb
2.js        1.33mb
3.js        19.4kb
4.js        13kb
5.js        12.1kb
6.js        9.14kb
7.js        8.4kb
8.js        4.62kb
main.js     182kb
preview.js  1.33mb
vendor.js   214kb

1. 使用babel-plugin-import-fix之后
0.js        960kb
1.js        961kb
2.js        953kb  
3.js        19.4kb
4.js        13kb
5.js        12.1kb
6.js        9.14kb
7.js        8.4kb
8.js        4.62kb
main.js     182kb
preview.js  949kb
vendor.js   214kb

2. 重新设置verdor
vendor: ['vue', 'pixi.js', 'qrious', 'fastclick']
