import { definePlugin, ServerAPI, staticClasses } from 'decky-frontend-lib'
import { FaPeopleGroup } from 'react-icons/fa6'
import { addPatch } from './helpers'
import libraryAppPatch from './libraryAppPatch'

export default definePlugin((serverAPI: ServerAPI) => {
  const removePatch = addPatch(serverAPI, '/library/app/:appid', libraryAppPatch)

  return {
    title: <div className={staticClasses.Title}>Players in game</div>,
    icon: <FaPeopleGroup />,
    onDismount: removePatch,
  }
})
