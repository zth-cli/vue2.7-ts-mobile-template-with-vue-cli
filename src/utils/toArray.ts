export function toArray(likeArray: Array<any> | any) {
  return Array.isArray(likeArray) ? likeArray : [likeArray]
}
