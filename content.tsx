import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

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
    console.log(level, element, styles.filter)
    if (styles.filter && /grayscale/.test(styles.filter)) {
      element.setAttribute("style", "filter: grayscale(0) !important;")
      element.setAttribute("style", "-webkit-filter: grayscale(0) !important;")
    }
    loop(element.children, level)
  })
}

try {
  loop(document.children)
} catch {}
