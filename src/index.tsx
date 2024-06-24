import { definePlugin, ServerAPI, staticClasses } from 'decky-frontend-lib'
import { FaPeopleGroup } from 'react-icons/fa6'
import patchLibraryApp from './patchLibraryApp'

export default definePlugin((serverAPI: ServerAPI) => {
  const unpatch = patchLibraryApp(serverAPI)

  return {
    title: <div className={staticClasses.Title}>Players in game</div>,
    icon: <FaPeopleGroup />,
    onDismount: unpatch,
  }
})
