import React from "react"
import { Switch } from "antd"
import type { PlasmoCSConfig } from "plasmo"

import { useStorage } from "@plasmohq/storage/hook"

import { GLOBAL_STORE, defaultGlobalStores } from "~content"

export const config: PlasmoCSConfig = {
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
