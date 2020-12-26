import React, {useState, useEffect} from 'react'
import {Box, Typography, Button} from '@material-ui/core'

import {ORGANIZATIONS_TABLE_COLUMNS} from '../../consts'
import {OrganizationsService} from '../../services'
import {OrganizationsTable} from './OrganizationsTable'
import {OrganizationDeleteModal} from './OrganizationDeleteModal'
import {OrganizationAddEditModal} from './OrganizationAddEditModal'

const OrganizationsView = () => {
    const [organizations, setOrganizations] = useState([])
    const [areOrganizationsLoading, setAreOrganizationsLoading] = useState(false)

    const [organizationDeleteModalOpened, setOrganizationDeleteModalOpened] = useState(false)
    const [organizationToDelete, setOrganizationToDelete] = useState({})

    const [organizationUpdateModalOpened, setOrganizationUpdateModalOpened] = useState(false)
    const [organizationToUpdate, setOrganizationToUpdate] = useState({})

    const [organizationAddModalOpened, setOrganizationAddModalOpened] = useState(false)

    const getOrganizationsList = async () => {
        try {
            setAreOrganizationsLoading(true)
            const {data: listOfOrganizations} = await OrganizationsService.getOrganizations()
            setOrganizations(listOfOrganizations)
            setAreOrganizationsLoading(false)
        } catch (err) {
            console.error(`Error occurred when fetching list of organizations ${err}`)
            setAreOrganizationsLoading(false)
        }
    }

    useEffect(() => getOrganizationsList(), [])

    const openDeleteOrganizationModal = (organization) => {
        setOrganizationToDelete(organization)
        setOrganizationDeleteModalOpened(true)
    }

    const closeOrganizationDeleteModal = () => {
        setOrganizationToDelete({})
        setOrganizationDeleteModalOpened(false)
    }

    const onDeleteOrganization = async (organization) => {
        try {
            setOrganizationToDelete({})
            setOrganizationDeleteModalOpened(false)

            await OrganizationsService.deleteOrganization(organization._id)
            await getOrganizationsList()
        } catch (err) {
            console.error(`Error occurred when deleting organization ${err}`)
        }
    }

    const openEditOrganizationModal = (organization) => {
        setOrganizationToUpdate(organization)
        setOrganizationUpdateModalOpened(true)
    }

    const closeEditOrganizationModal = () => {
        setOrganizationToUpdate({})
        setOrganizationUpdateModalOpened(false)
    }

    const onUpdateOrganization = async (organization) => {
        try {
            setOrganizationToUpdate({})
            setOrganizationUpdateModalOpened(false)

            await OrganizationsService.updateOrganization(organization._id, organization)
            await getOrganizationsList()
        } catch (err) {
            console.error(`Error occurred when updating organization ${err}`)
        }
    }

    const openAddOrganizationModal = () => {
        setOrganizationAddModalOpened(true)
    }

    const closeAddOrganizationModal = () => {
        setOrganizationAddModalOpened(false)
    }

    const onAddOrganization = async (organizationData) => {
        try {
            setOrganizationAddModalOpened(false)
            await OrganizationsService.createOrganization(organizationData)
            await getOrganizationsList()
        } catch (err) {
            console.error(`Error occurred when adding new organization ${err}`)
        }
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography>Organizations</Typography>
                <Button onClick={openAddOrganizationModal}>Add organization</Button>
            </Box>
            {
                organizationDeleteModalOpened && (
                    <OrganizationDeleteModal
                        organization={organizationToDelete}
                        isOpen={true}
                        onDelete={onDeleteOrganization}
                        onClose={closeOrganizationDeleteModal}
                    />
                )
            }
            {
                organizationUpdateModalOpened && (
                    <OrganizationAddEditModal
                        organization={organizationToUpdate}
                        isOpen={true}
                        onSave={onUpdateOrganization}
                        onClose={closeEditOrganizationModal}
                    />
                )
            }
            {
                organizationAddModalOpened && (
                    <OrganizationAddEditModal
                        isOpen={true}
                        onClose={closeAddOrganizationModal}
                        onSave={onAddOrganization}
                    />
                )
            }
            <OrganizationsTable
                columns={ORGANIZATIONS_TABLE_COLUMNS}
                organizations={organizations}
                isLoading={areOrganizationsLoading}
                onDeleteOrganization={openDeleteOrganizationModal}
                onEditOrganization={openEditOrganizationModal}
            />
        </>
    )
}

export default OrganizationsView