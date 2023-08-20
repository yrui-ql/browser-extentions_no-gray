# yql-chrome-extensions_no-gray

>一个可以帮你在特殊时期恢复页面本色的简单拓展


### 如何使用
 - 在右侧的Releases，下载最新的zip包，
 - 然后在你的浏览器设置中找到拓展程序项，
 - 点开，把下载的包拖到这个界面上，并开启这个拓展，
 
一般来说， 这样成功了！

---

### 不想安装来路不明的拓展
哈哈，我理解， 因为我有这样的想法，所以

如果你使用的油猴或者Automa之类的脚本平台，那么
直接复制下面的这部分代码
```js
/**
 * 最多遍历6层
 * 多了基本没用
 */
const LEVEL = 6;

/**
 * 去掉css filter: grayScale
 */
const loop = (nodes: HTMLCollection, level = 1) => {
  if (level > LEVEL || !nodes.length) {
    return;
  }

  level++;

  Array.from(nodes).forEach((element) => {
    const styles = getComputedStyle(element);
    if (styles.filter && /grayscale/.test(styles.filter)) {
      element.setAttribute('style', 'filter: grayscale(0) !important;');
      element.setAttribute('style', '-webkit-filter: grayscale(0) !important;');
    }
    loop(element.children, level);
  });
};

const run = () => {
  try {
    loop(document.children);
  } catch (e) {
  }
};

```
