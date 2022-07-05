export function getStorge(name: NonNullable<string>): string | null {
  return sessionStorage.getItem(name)
}

export function setStorge(name: string, token: string): void {
  sessionStorage.setItem(name, token)
}

export function removeStorge(name: string): void {
  return sessionStorage.removeItem(name)
}

export function removeAllStorge(): void {
  return sessionStorage.clear()
}
