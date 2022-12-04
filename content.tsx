import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

const LEVEL = 6

export const GLOBAL_STORE = "GLOBAL_STORE"

export const defaultGlobalStores = {
  opened: false
}

export const storage = new Storage()

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
    console.log(e)
  }
}

storage.watch({
  [GLOBAL_STORE]: (newStore) => {
    console.log(newStore.newValue)
    if (newStore.newValue.opened) {
      run()
    } else {
      window.location.reload()
    }
  }
})
;(async () => {
  const res = (await storage.get(GLOBAL_STORE)) as any
  res.opened && run()
})()
