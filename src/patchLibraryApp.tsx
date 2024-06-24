import { ReactElement } from 'react'
import { hasProp, patchSequence } from './helpers'
import PlayerCount from './PlayerCount'
import { ServerAPI, afterPatch, findModuleChild } from 'decky-frontend-lib'

const patchLibraryApp = (serverAPI: ServerAPI) => {
  let unpatch: { value: null | (() => void) } = { value: null }

  const fn = (props: { path: string; children: ReactElement }) => {
    patchSequence(
      props.children.props,
      (ret) => ret.props.children,
      (ret) => ret.props.children?.[1]?.props.children.props.children.find(hasProp('children')).props.children,
      (ret) => ret.props.children.find(hasProp('overview')),
      (ret) => ret,
      (ret) => ret.props.children[0],
      (ret) => ret.props.children[0],
      (ret) => ret.props.children.find(hasProp('overview')),
      (ret) => {
        serverAPI.routerHook.removePatch('/library/app/:appid', fn)

        const patch = afterPatch(
          ret.props.children.find(hasProp('className')).props.children[0].type.prototype,
          'render',
          (_: unknown, ret: ReactElement) => {
            if (!ret.props.children.find((child: any) => child.type === PlayerCount)) {
              ret.props.children.push(<PlayerCount />)
            }
            return ret
          },
        )

        unpatch.value = patch.unpatch
      },
    )

    return props
  }

  serverAPI.routerHook.addPatch('/library/app/:appid', fn)

  return () => unpatch.value?.()
}

export default patchLibraryApp
