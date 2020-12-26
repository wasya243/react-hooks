import React, {useState, useEffect} from 'react'
import {TextField, Box, Button} from '@material-ui/core'

import {USERS_TABLE_COLUMNS} from '../../consts'
import {UsersService} from '../../services'
import {UserDeleteModal} from './UserDeleteModal'
import {UsersTable} from './UsersTable'
import {UserAddEditModal} from './UserAddEditModal'

const UsersView = () => {
    const [users, setUsers] = useState([])
    const [areUsersLoading, setAreUsersLoading] = useState(false)

    const [userDeleteModalOpened, setUserDeleteModalOpened] = useState(false)
    const [userToDelete, setUserToDelete] = useState({})

    const [userUpdateModalOpened, setUserUpdateModalOpened] = useState(false)
    const [userToUpdate, setUserToUpdate] = useState({})

    const [userAddModalOpened, setUserAddModalOpened] = useState(false)

    const [searchToken, setSearchToken] = useState('')

    const getUsersList = async () => {
        try {
            setAreUsersLoading(true)
            const {data: listOfUsers} = await UsersService.getUsers()
            setUsers(listOfUsers)
            setAreUsersLoading(false)
        } catch (err) {
            console.error(`Error occurred when fetching list of users ${err}`)
            setAreUsersLoading(false)
        }
    }

    useEffect(() => getUsersList(), [])

    const openDeleteUserModal = (user) => {
        setUserDeleteModalOpened(true)
        setUserToDelete(user)
    }

    const onDeleteUser = async (user) => {
        try {
            setUserToDelete({})
            setUserDeleteModalOpened(false)

            await UsersService.deleteUser(user._id)
            await getUsersList()
        } catch (err) {
            console.error(`Error occurred when deleting user ${err}`)
        }
    }

    const closeDeleteUserModal = () => {
        setUserToDelete({})
        setUserDeleteModalOpened(false)
    }

    const onSaveUpdatedUser = async (user) => {
        try {
            setUserToUpdate({})
            setUserUpdateModalOpened(false)

            await UsersService.updateUser(user._id, user)
            await getUsersList()
        } catch (err) {
            console.error(`Error occurred when editing user ${err}`)
        }
    }

    const closeUpdateUserModal = () => {
        setUserToUpdate({})
        setUserUpdateModalOpened(false)
    }

    const openUpdateUserModal = (user) => {
        setUserUpdateModalOpened(true)
        setUserToUpdate(user)
    }

    const openAddUserModal = () => {
        setUserAddModalOpened(true)
    }

    const closeAddUserModal = () => {
        setUserAddModalOpened(false)
    }

    const onAddUser = async (userData) => {
        try {
            setUserAddModalOpened(false)
            await UsersService.createUser(userData)
            await getUsersList()
        } catch (err) {
            console.error(`Error occurred when adding new user ${err}`)
        }
    }

    const handleSearchChange = (event) => {
        const value = event.target.value
        setSearchToken(value)
        UsersService.getUsersBySearchString(value)
        const usersBySearchString = users.filter(user => user.firstName.includes(value))
        setUsers(usersBySearchString)
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <TextField
                    value={searchToken}
                    onChange={handleSearchChange}
                    placeholder={'Type to search by user name'}
                />
                <Button onClick={openAddUserModal}>Add new user</Button>
            </Box>
            {
                userDeleteModalOpened && (
                    <UserDeleteModal
                        isOpen={true}
                        onClose={closeDeleteUserModal}
                        onDelete={onDeleteUser}
                        user={userToDelete}
                    />
                )
            }
            {
                userUpdateModalOpened && (
                    <UserAddEditModal
                        isOpen={true}
                        onClose={closeUpdateUserModal}
                        onSave={onSaveUpdatedUser}
                        user={userToUpdate}
                    />
                )
            }
            {
                userAddModalOpened && (
                    <UserAddEditModal
                        isOpen={true}
                        onClose={closeAddUserModal}
                        onSave={onAddUser}
                    />
                )
            }
            <UsersTable
                columns={USERS_TABLE_COLUMNS}
                users={users}
                isLoading={areUsersLoading}
                onDeleteUser={openDeleteUserModal}
                onEditUser={openUpdateUserModal}
            />
        </>
    )
}

export default UsersView;
