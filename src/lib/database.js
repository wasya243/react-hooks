import LocalStorage from './localStorage'

const USERS = [
    {
        id: 0,
        firstName: 'Vasyl',
        lastName: 'Kharchenko',
        email: 'v.kharchenko@mozidev.com'
    },
    {
        id: 1,
        firstName: 'Dmytro',
        lastName: 'Gorstka',
        email: 'd.gorstka@mozidev.com'
    },
    {
        id: 2,
        firstName: 'Stas',
        lastName: 'Molidevich',
        email: 's.molidevich@mozidev.com'
    },
    {
        id: 3,
        firstName: 'Vlad',
        lastName: 'Romanko',
        email: 'v.romanko@mozidev.com'
    }
]

const ORGANIZATIONS = [
    {
        id: 0,
        name: 'Org1',
    },
    {
        id: 1,
        name: 'Org2',
    },
    {
        id: 2,
        name: 'Org3',
    },
    {
        id: 3,
        name: 'Org4',
    },
    {
        id: 4,
        name: 'Org5',
    }
]

class Database {
    constructor(localStorage) {
        this._localStorage = localStorage
    }

    init() {
        const users = this._localStorage.getItem('users')
        const organizations = this._localStorage.getItem('organizations')

        if(!users || (users && users.length === 0)) {
            this._localStorage.setItem('users', USERS)
        }

        if(!organizations || (organizations && organizations.length === 0)) {
            this._localStorage.setItem('organizations', ORGANIZATIONS)
        }
    }

    getUsers() {
        return this._localStorage.getItem('users')
    }

    getUsersBySearchString() {

    }

    deleteUser(id) {
        const users = this._localStorage.getItem('users')
        const filteredUsers = users.filter(user => user.id !== id)

        return this._localStorage.setItem('users', filteredUsers)
    }

    updateUser(id, userData) {
        const users = this._localStorage.getItem('users')
        const updatedUsers = users.map(user => user.id === id ? Object.assign(user, userData) : user)

        return this._localStorage.setItem('users', updatedUsers)
    }

    getOrganizations() {
        return this._localStorage.getItem('organizations')
    }

    getOrganizationsBySearchString() {

    }

    deleteOrganization(id) {
        const organizations = this._localStorage.getItem('organizations')
        const filteredOrganizations = organizations.map(organization => organization.id !== id)

        return this._localStorage.setItem('organizations', filteredOrganizations)
    }

    updateOrganization(id, organizationData) {
        const organizations = this._localStorage.getItem('organizations')
        const updatedOrganizations = organizations.map(organization => organization.id === id ? Object.assign(organization, organizationData) : organization)

        return this._localStorage.setItem('organizations', updatedOrganizations)
    }
}

const db = new Database(new LocalStorage())

export default db