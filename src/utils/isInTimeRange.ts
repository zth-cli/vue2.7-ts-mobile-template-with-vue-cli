// 判断是否在时间区间内
export function isInTimeRange(startTime: string, endTime: string, nowTime: string): boolean {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  const now = new Date(nowTime).getTime()
  return now >= start && now <= end
}

// 判断时间是否在当天内
export function isInToday(time: string): boolean {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const now = new Date(`${year}-${month}-${day}`).getTime()
  const target = new Date(time).getTime()

  return now <= target && target <= now + 24 * 60 * 60 * 1000
}
