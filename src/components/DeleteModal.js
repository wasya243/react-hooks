import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';

export const DeleteModal = ({
                                isOpen,
                                onClose,
                                onDelete,
                                data,
                                title,
                                content
                            }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onDelete(data)}>Yes</Button>
                <Button onClick={onClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
}