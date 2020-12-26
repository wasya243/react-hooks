// import DB from '../lib/database'
//
// class OrganizationsService {
//     constructor(db) {
//         this._db = db
//     }
//
//     getOrganizations() {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(this._db.getOrganizations())
//             }, 100)
//         })
//     }
//
//     deleteOrganization(id) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(this._db.deleteOrganization(id))
//             }, 100)
//         })
//     }
//
//     updateOrganization(id, organizationData) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(this._db.updateOrganization(id, organizationData))
//             }, 100)
//         })
//     }
// }
//
// const organizationsService = new OrganizationsService(DB)

import axios from '../utils/axios'

class OrganizationsService {
    constructor(httpClient) {
        this._httpClient = httpClient
    }

    getOrganizations() {
        return this._httpClient.get(`/organizations`)
    }

    deleteOrganization(id) {
        return this._httpClient.delete(`/organizations/${id}`)
    }

    updateOrganization(id, organizationData) {
        return this._httpClient.put(`/organizations/${id}`, organizationData)
    }

    createOrganization(organizationData) {
        return this._httpClient.post('/organizations', organizationData)
    }
}

const organizationsService = new OrganizationsService(axios)

export default organizationsService