export interface IQs {
  stringify(obj: object): FormData
}

export const qs: IQs = {
  stringify(obj: object) {
    const formData = new FormData()
    for (const key in obj) {
      // @ts-ignore
      formData.append(key, obj[key] as string)
    }
    return formData
  },
}
