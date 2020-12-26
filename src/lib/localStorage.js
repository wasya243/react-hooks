export default class LocalStorage {
    constructor() {
        this._prefix = 'my_app_'
    }

    _key(key) {
        return `${this._prefix}${key}`
    }

    setItem(key, value) {
        const path = this._key(key)
        const shouldStringify = typeof value === 'object'

        return localStorage.setItem(path, shouldStringify ? JSON.stringify(value) : value)
    }

    getItem(key, parseJson = true) {
        const path = this._key(key)
        const item = localStorage.getItem(path)

        return parseJson ? JSON.parse(item) : item
    }
}