import { RoutePatch, ServerAPI, afterPatch, wrapReactClass, wrapReactType } from 'decky-frontend-lib'
import { ReactElement } from 'react'

export const addPatch = (serverAPI: ServerAPI, route: string, patch: RoutePatch) => {
  const routePatch = serverAPI.routerHook.addPatch(route, patch)
  return () => serverAPI.routerHook.removePatch(route, routePatch)
}

export const hasProp = (prop: string) => (child: any) => prop in child.props

export const patch = (object: any, ...resolvers: Array<(ret: ReactElement) => ReactElement | void>) => {
  const handler = (_: unknown, ret: ReactElement) => {
    const [fn, ...rest] = resolvers

    const obj = fn(ret)

    if (!rest.length) {
      return obj ?? ret
    }

    if (obj) {
      patch(obj, ...rest)
    }

    return ret
  }

  if (object.renderFunc) {
    afterPatch(object, 'renderFunc', handler)
  } else if (object.type.render) {
    afterPatch(object.type, 'render', handler)
  } else if (object.type.type) {
    wrapReactType(object)
    afterPatch(object.type, 'type', handler)
  } else if (object.type.prototype?.render) {
    wrapReactClass(object)
    afterPatch(object.type.prototype, 'render', handler)
  } else {
    afterPatch(object, 'type', handler)
  }
}
