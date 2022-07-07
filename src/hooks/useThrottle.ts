// 节流
export function useThrottle(cb: Function, duration = 100) {
  let start = +new Date()
  return  (...args: any) => {
    const now = +new Date()
    if (now - start >= duration) {
      //@ts-ignore
      cb.apply(this, args)
      start = now
    }
  }
}
