import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

const LEVEL = 4

/**
 * 去掉css filter: grayScale
 */
const loop = (nodes: HTMLCollection, level = 1) => {
  if (!nodes.length || level > LEVEL) {
    return
  }
  Array.from(nodes).forEach((element) => {
    const styles = getComputedStyle(element)
    if (styles.filter) {
      element.setAttribute("style", "filter: none !important;")
      element.setAttribute("style", "-webkit-filter: none !important;")
    }
  })
}

try {
  console.log(document.children)

  loop(document.children)
} catch {}
