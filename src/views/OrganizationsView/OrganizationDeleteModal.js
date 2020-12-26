import React from 'react'
import {DeleteModal} from '../../components'

export const OrganizationDeleteModal = ({isOpen, onClose, onDelete, organization}) => {
    return (
        <DeleteModal
            onDelete={onDelete}
            onClose={onClose}
            data={organization}
            isOpen={isOpen}
            title={'Are you sure to delete this organization?'}
            content={'Press yes to delete organization, press no to close modal'}
            />
    )
}