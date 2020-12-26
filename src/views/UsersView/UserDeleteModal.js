import React from 'react'

import {DeleteModal} from '../../components';

export const UserDeleteModal = ({isOpen, onClose, onDelete, user}) => {
    return (
        <DeleteModal
            isOpen={isOpen}
            onClose={onClose}
            onDelete={onDelete}
            data={user}
            title={'Are you sure to delete this user?'}
            content={'Press yes to delete user, press no to close modal'}
        />
    )
}