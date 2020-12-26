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

const OrganizationsTableHead = ({columns}) => {
    const tableColumns = columns.map(column => <TableCell key={column.value}>{column.label}</TableCell>)

    return (
        <TableHead>
            <TableRow>{tableColumns}</TableRow>
        </TableHead>
    )
}

const OrganizationsTableBody = ({organizations, columns, onDeleteOrganization, onEditOrganization}) => {
    const tableBodyRows = organizations.map(organization => {
        const cells = columns.map(column => {
            let cell = null

            if(column.columnType === COLUMN_TYPES.text) {
                cell = <TableCell key={column.value}>{organization[column.value]}</TableCell>
            } else if (column.columnType === COLUMN_TYPES.action) {
                if(column.variation === COLUMN_ACTION_VARIATIONS.delete) {
                    cell = <TableCell key={column.value}><TrashIcon onClick={() => onDeleteOrganization(organization)}/></TableCell>
                } else if(column.variation === COLUMN_ACTION_VARIATIONS.edit) {
                    cell = <TableCell key={column.value}><EditIcon onClick={() => onEditOrganization(organization)}/></TableCell>
                }
            }

            return cell
        })

        return <TableRow key={organization._id}>{cells}</TableRow>
    })

    return <TableBody>{tableBodyRows}</TableBody>
}

export const OrganizationsTable = ({
                               organizations,
                               columns,
                               isLoading,
                               onDeleteOrganization,
                               onEditOrganization
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
                            <OrganizationsTableHead columns={columns}/>
                            <OrganizationsTableBody
                                organizations={organizations}
                                columns={columns}
                                onDeleteOrganization={onDeleteOrganization}
                                onEditOrganization={onEditOrganization}
                            />
                        </Table>
                    </TableContainer>
                )
            }
        </>
    )
}