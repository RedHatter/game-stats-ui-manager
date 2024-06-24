import { definePlugin, ServerAPI, staticClasses } from 'decky-frontend-lib'
import { IoIosStats } from 'react-icons/io'
import patchLibraryApp from './patchLibraryApp'
import QuickAccessContent from './QuickAccessContent'
import setupStyle from './style'

export default definePlugin((serverAPI: ServerAPI) => {
  const unpatch = patchLibraryApp(serverAPI)
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
