export function assert(condition: any, msg: string) {
  if (!condition) throw new Error(`[vasjs]:${msg}`)
}
