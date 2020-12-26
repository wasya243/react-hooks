// import DB from '../lib/database'
//
// class UsersService {
//     constructor(db) {
//         this._db = db
//     }
//
//     getUsers() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(this._db.getUsers())
//             }, 100)
//         })
//     }
//
//     deleteUser(id) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(this._db.deleteUser(id))
//             }, 100)
//         })
//     }
//
//     updateUser(id, userData) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(this._db.updateUser(id, userData))
//             }, 100)
//         })
//     }
// }
//
// const usersService = new UsersService(DB)

import axios from '../utils/axios'

class UsersService {
    constructor(httpClient) {
        this._httpClient = httpClient
    }

    getUsers() {
        return this._httpClient.get(`/users`)
    }

    deleteUser(id) {
        return this._httpClient.delete(`/users/${id}`)
    }

    updateUser(id, userData) {
        return this._httpClient.put(`/users/${id}`, userData)
    }

    createUser(userData) {
        return this._httpClient.post('/users', userData)
    }
}


const usersService = new UsersService(axios)

export default usersService