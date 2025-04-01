import { findClass, findSP } from "@decky/ui"
import { type Store, useStore } from "./store"

const updateStyle = (styleType: Store["playButtonSize"]) => {
  const doc = findSP().document

  let style = doc.getElementById("game-stats-ui-manager-style")

  if (!style) {
    style = doc.createElement("style")
    style.id = "game-stats-ui-manager-style"
    doc.head.append(style)
  }

  style.textContent =
    styleType === "normal"
      ? ""
      : `
      ${styleType === "smallest" || styleType === "iconOnly" ? `.${findClass("PlayButtonContainer")},` : ""}
      .${findClass("PlayButtonContainer")} > div {
        min-width: initial !important;
      }

      ${
        styleType === "iconOnly"
          ? `
          .${findClass("PlayButtonContainer")} svg {
            margin-right: 0 !important;
          }

          .${findClass("PlayButtonContainer")} svg + div {
            display: none !important;
          }
          `
          : ""
      }
      `
}

useStore.subscribe((state, prevState) => {
  if (state.playButtonSize !== prevState.playButtonSize) {
    updateStyle(state.playButtonSize)
  }
})

const setupStyle = () => {
  updateStyle(useStore.getState().playButtonSize)
  return () => findSP().document.getElementById("game-stats-ui-manager-style")?.remove()
}

export default setupStyle
