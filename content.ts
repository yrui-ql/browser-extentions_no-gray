import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}


export const GLOBAL_STORE = "GLOBAL_STORE"

export const defaultGlobalStores = {
  opened: false
}

export const storage = new Storage()

/**
 * 最多遍历6层
 * 多了基本没用
 */
const LEVEL = 6

/**
 * 去掉css filter: grayScale
 */
const loop = (nodes: HTMLCollection, level = 1) => {
  if (level > LEVEL || !nodes.length) {
    return
  }

  level++

  Array.from(nodes).forEach((element) => {
    const styles = getComputedStyle(element)
    if (styles.filter && /grayscale/.test(styles.filter)) {
      element.setAttribute("style", "filter: grayscale(0) !important;")
      element.setAttribute("style", "-webkit-filter: grayscale(0) !important;")
    }
    loop(element.children, level)
  })
}

const run = () => {
  try {
    loop(document.children)
  } catch (e) {
    console.log('%c [ e ]-47-「content」', 'font-size:13px; background:#DCDFE4; color:#56B6C2;', e);
  }
}

storage.watch({
  [GLOBAL_STORE]: (newStore) => {
    if (newStore.newValue.opened) {
      run()
    } else {
      window.location.reload()
    }
  }
});

(async () => {
  const res = (await storage.get(GLOBAL_STORE)) as any
  if (res.opened) {
    run()
  }
})()
