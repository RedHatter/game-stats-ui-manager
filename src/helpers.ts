import { afterPatch, findModuleChild, wrapReactClass, wrapReactType } from 'decky-frontend-lib'
import { ReactElement } from 'react'

export const hasProp = (prop: string) => (child: any) => prop in child.props

type Resolver = {
  lock?: boolean
  (ret: ReactElement): ReactElement | void
}

export const patchSequence = (object: any, ...resolvers: Array<Resolver>) => {
  const handler = (_: unknown, ret: ReactElement) => {
    const [fn, ...rest] = resolvers

    if (fn.lock) {
      return ret
    }

    const obj = fn(ret)
    fn.lock = true

    if (!rest.length) {
      return obj ?? ret
    }

    if (obj) {
      patchSequence(obj, ...rest)
    }

    return ret
  }

  if (object.renderFunc) {
    afterPatch(object, 'renderFunc', handler, { singleShot: true })
  } else if (object.type.render) {
    afterPatch(object.type, 'render', handler, { singleShot: true })
  } else if (object.type.type) {
    wrapReactType(object)
    afterPatch(object.type, 'type', handler, { singleShot: true })
  } else if (object.type.prototype?.render) {
    wrapReactClass(object)
    afterPatch(object.type.prototype, 'render', handler, { singleShot: true })
  } else {
    afterPatch(object, 'type', handler, { singleShot: true })
  }
}

export const localize = findModuleChild(
  (m) =>
    typeof m === 'object' &&
    Object.values(m).find((p) => typeof p === 'function' && /function.*LocalizeString.*return void/.test(p.toString())),
)

export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never
