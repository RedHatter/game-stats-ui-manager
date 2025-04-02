import { findClassByName, findSP } from "@decky/ui"
import { type PlayButtonSizes, store } from "./store"

const updateStyle = (styleType: PlayButtonSizes) => {
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
      ${styleType === "smallest" || styleType === "iconOnly" ? `.${findClassByName("PlayButtonContainer")},` : ""}
      .${findClassByName("PlayButtonContainer")} > div {
        min-width: initial !important;
      }

      ${
        styleType === "iconOnly"
          ? `
          .${findClassByName("PlayButtonContainer")} svg {
            margin-right: 0 !important;
          }

          .${findClassByName("PlayButtonContainer")} svg + div {
            display: none !important;
          }
          `
          : ""
      }
      `
}

store.subscribe(({ prevVal, currentVal }) => {
  if (currentVal.playButtonSize !== prevVal.playButtonSize) {
    updateStyle(currentVal.playButtonSize)
  }
})

const setupStyle = () => {
  updateStyle(store.state.playButtonSize)
  return () => findSP().document.getElementById("game-stats-ui-manager-style")?.remove()
}

export default setupStyle
