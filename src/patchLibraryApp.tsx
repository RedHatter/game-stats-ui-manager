import { routerHook } from "@decky/api"
import { afterPatch } from "@decky/ui"
import type { ReactElement } from "react"
import AppID from "./AppID"
import PlayerCount from "./PlayerCount"
import { hasProp, patchSequence } from "./helpers"
import { store, validIDs } from "./store"

const patchLibraryApp = () => {
  const unpatch: { value: null | (() => void) } = { value: null }

  const fn = (props: { path: string; children: ReactElement }) => {
    patchSequence(
      props.children.props,
      (ret) => ret.props.children,
      (ret) => ret.props.children?.[1]?.props.children.props.children.find(hasProp("children")).props.children,
      (ret) => ret.props.children.find(hasProp("overview")),
      (ret) => ret,
      (ret) => ret.props.children[0],
      (ret) => ret.props.children[0],
      (ret) => ret.props.children.find(hasProp("overview")),
      (ret) => {
        routerHook.removePatch("/library/app/:appid", fn)

        const patch = afterPatch(
          ret.props.children.find(hasProp("className")).props.children[0].type.prototype,
          "render",
          (_: unknown, ret: ReactElement) => {
            ret.props.children = store.state.entries.map((data) =>
              data.hidden ? (
                false
              ) : data.id === "#in_game" ? (
                <PlayerCount key="#in_game" />
              ) : data.id === "#appid" ? (
                <AppID key="#appid" />
              ) : (
                ret.props.children[validIDs.indexOf(data.id)]
              ),
            )

            return ret
          },
        )

        unpatch.value = patch.unpatch
      },
    )

    return props
  }

  routerHook.addPatch("/library/app/:appid", fn)

  return () => unpatch.value?.()
}

export default patchLibraryApp
