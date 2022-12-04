import { Switch } from "antd"
import type { PlasmoContentScript } from "plasmo"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { GLOBAL_STORE, defaultGlobalStores } from "~content"

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
}

function Popup() {
  const [globalStore = defaultGlobalStores, setGlobalStore] =
    useStorage(GLOBAL_STORE)

  return (
    <Switch
      checkedChildren="开启"
      unCheckedChildren="关闭"
      checked={!!globalStore?.opened}
      onChange={(checked) => {
        setGlobalStore({ ...globalStore, opened: checked })
      }}
    />
  )
}

export default Popup
