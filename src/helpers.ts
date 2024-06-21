import { RoutePatch, ServerAPI } from 'decky-frontend-lib'

export const addPatch = (serverAPI: ServerAPI, route: string, patch: RoutePatch) => {
  const routePatch = serverAPI.routerHook.addPatch(route, patch)
  return () => serverAPI.routerHook.removePatch(route, routePatch)
}

export const hasProp = (prop: string) => (child: any) => prop in child.props
