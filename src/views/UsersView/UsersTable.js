import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Trash as TrashIcon,
} from 'react-feather'

import {COLUMN_TYPES, COLUMN_ACTION_VARIATIONS} from '../../consts';

const UsersTableHead = ({columns}) => {
    const tableColumns = columns.map(column => <TableCell key={column.value}>{column.label}</TableCell>)

    return (
        <TableHead>
            <TableRow>{tableColumns}</TableRow>
        </TableHead>
    )
}

const UsersTableBody = ({users, columns, onDeleteUser, onEditUser}) => {
    const tableBodyRows = users.map(user => {
        const cells = columns.map(column => {
            let cell = null

            if(column.columnType === COLUMN_TYPES.text) {
                cell = <TableCell key={column.value}>{user[column.value]}</TableCell>
            } else if (column.columnType === COLUMN_TYPES.action) {
                if(column.variation === COLUMN_ACTION_VARIATIONS.delete) {
                    cell = <TableCell key={column.value}><TrashIcon onClick={() => onDeleteUser(user)}/></TableCell>
                } else if(column.variation === COLUMN_ACTION_VARIATIONS.edit) {
                    cell = <TableCell key={column.value}><EditIcon onClick={() => onEditUser(user)}/></TableCell>
                }
            }

            return cell
        })

        return <TableRow key={user._id}>{cells}</TableRow>
    })

    return <TableBody>{tableBodyRows}</TableBody>
}

export const UsersTable = ({
                               users,
                               columns,
                               isLoading,
                               onDeleteUser,
                               onEditUser
}) => {
    return (
        <>
            {
                isLoading && <CircularProgress/>
            }
            {
                !isLoading && (
                    <TableContainer>
                        <Table>
                            <UsersTableHead columns={columns}/>
                            <UsersTableBody users={users} columns={columns} onDeleteUser={onDeleteUser} onEditUser={onEditUser}/>
                        </Table>
                    </TableContainer>
                )
            }
        </>
    )
}