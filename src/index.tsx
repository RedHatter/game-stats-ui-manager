import { definePlugin, staticClasses } from "@decky/ui"
import { IoIosStats } from "react-icons/io"
import QuickAccessContent from "./QuickAccessContent"
import patchLibraryApp from "./patchLibraryApp"
import setupStyle from "./style"

export default definePlugin(() => {
  const unpatch = patchLibraryApp()
  const removeStyle = setupStyle()

  return {
    title: <div className={staticClasses.Title}>Game Stats UI Manager</div>,
    icon: <IoIosStats />,
    content: <QuickAccessContent />,
    onDismount: () => {
      unpatch()
      removeStyle()
    },
  }
})
