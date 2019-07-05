export function assert(condition: any, msg: string) {
  if (!condition) throw new Error(`[vasjs]:${msg}`)
}

export const isType = (type: string) => (target: any) =>
  Object.prototype.toString.call(target) === `[object ${type}]`
