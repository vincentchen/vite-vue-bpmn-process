/* 空函数 */
export function noop() {}

/**
 * 校验非空
 * @param {*} val
 * @return boolean
 */
export function notEmpty(val) {
  if (!notNull(val)) {
    return false
  }
  if (getRawType(val) === 'array') {
    return val.length
  }
  if (getRawType(val) === 'object') {
    return Reflect.ownKeys(val).length
  }
  return true
}
export function notNull(val) {
  return val !== undefined && val !== null
}

/**
 * 返回数据原始类型
 * @param value
 * @return { 'string' | 'array' | 'boolean' | 'number' | 'object' | 'function' } type
 */
export function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let last = 0
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

export function generateId(prefix = 'element') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function cloneDeep<T>(obj: T): T {
  if (obj === null || getRawType(obj) !== 'object') return obj
  const cloned = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as any)[key]
      cloned[key] = getRawType(value) === 'object' ? cloneDeep(value) : value
    }
  }
  return cloned as T
}

export function isEqual(a: any, b: any): boolean {
  const typeA = getRawType(a)
  const typeB = getRawType(b)
  if (typeA !== typeB) return false
  if (typeA === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => isEqual(a[key], b[key]))
  }
  if (typeA === 'array') {
    if (a.length !== b.length) return false
    return a.every((item: any, index: number) => isEqual(item, b[index]))
  }
  return a === b
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return keys.reduce((result, key) => {
    if (key in obj) result[key] = obj[key]
    return result
  }, {} as Pick<T, K>)
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result as Omit<T, K>
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals)
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
