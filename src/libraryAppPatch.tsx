import { ReactElement } from 'react'
import { hasProp, isShortcut, patch } from './helpers'
import PlayerCount from './PlayerCount'

const libraryAppPatch = (props: { path: string; children: ReactElement }) => {
  patch(
    props.children.props,
    (ret) => (isShortcut(ret.props.children.props.overview) ? undefined : ret.props.children),
    (ret) => ret.props.children?.[1]?.props.children.props.children.find(hasProp('children')).props.children,
    (ret) => ret.props.children.find(hasProp('overview')),
    (ret) => ret,
    (ret) => ret.props.children[0],
    (ret) => ret.props.children[0],
    (ret) => ret.props.children.find(hasProp('overview')),
    (ret) => ret.props.children.find(hasProp('className')).props.children[0],
    (ret) => {
      if (!ret.props.children.find((child: any) => child.type === PlayerCount)) {
        ret.props.children.push(<PlayerCount />)
      }
    },
  )

  return props
}

export default libraryAppPatch
