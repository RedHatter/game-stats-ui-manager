import { wrapReactType, wrapReactClass, afterPatch } from 'decky-frontend-lib'
import { ReactElement } from 'react'
import { hasProp } from './helpers'
import PlayerCount from './PlayerCount'

const patchInfoSection = (section: any) => {
  if (!section.props.children.find((child: any) => child.type === PlayerCount)) {
    section.props.children.push(<PlayerCount />)
  }
}

const libraryAppPatch = (props: { path: string; children: ReactElement }) => {
  afterPatch(props.children.props, 'renderFunc', (_: unknown, ret1: ReactElement) => {
    wrapReactType(ret1.props.children)
    afterPatch(ret1.props.children.type, 'type', (_: unknown, ret2: ReactElement) => {
      const appDetails = ret2.props.children?.[1]?.props.children.props.children.find(hasProp('children'))
      wrapReactClass(appDetails.props.children)
      afterPatch(appDetails.props.children.type.prototype, 'render', (_: unknown, ret3: ReactElement) => {
        afterPatch(ret3.props.children.find(hasProp('overview')), 'type', (_: unknown, ret4: ReactElement) => {
          afterPatch(ret4, 'type', (_: unknown, ret5: ReactElement) => {
            afterPatch(ret5.props.children[0].type, 'render', (_: unknown, ret6: ReactElement) => {
              afterPatch(ret6.props.children[0].type, 'render', (_: unknown, ret7: ReactElement) => {
                const infoPanel = ret7.props.children.find(hasProp('overview'))
                wrapReactClass(infoPanel)
                afterPatch(infoPanel.type.prototype, 'render', (_: unknown, ret8: ReactElement) => {
                  const infoItems = ret8.props.children.find(hasProp('className')).props.children[0]
                  wrapReactClass(infoItems)
                  afterPatch(infoItems.type.prototype, 'render', (_: unknown, ret9: ReactElement) => {
                    patchInfoSection(ret9)
                    return ret9
                  })
                  return ret8
                })
                return ret7
              })
              return ret6
            })
            return ret5
          })
          return ret4
        })
        return ret3
      })
      return ret2
    })
    return ret1
  })
  return props
}

export default libraryAppPatch
