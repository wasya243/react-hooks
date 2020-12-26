import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    TextField
} from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

export const UserAddEditModal = ({isOpen, onClose, onSave, user = {}}) => {
    const isNew = Boolean(user._id)

    const initialValues = {
        firstName: user.firstName ? user.firstName : '',
        lastName: user.lastName ? user.lastName : '',
        email: user.email ? user.email : ''
    }

    const editUserSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First name is required')
            .min(2, 'First name should be more than 1 symbol')
            .max(50, 'First should not be more than 50 symbols'),
        lastName: Yup.string()
            .required('Last name is required')
            .min(2, 'Last name should be more than 1 symbol')
            .max(50, 'Last name should not be more than 50 symbols'),
        email: Yup.string()
            .email()
            .required('Email is required')

    })

    const onSubmit = (userData) => {
        onSave(Object.assign({...user}, userData))
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={editUserSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    const {
                        values,
                        handleChange,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty
                    } = formik
                    return (
                        <Form>
                            <DialogTitle>
                                {isNew ? 'Add user' : 'Update user'}
                            </DialogTitle>
                            <DialogContent>
                                <Box>
                                    <TextField
                                        type="text"
                                        name="firstName"
                                        label="First name"
                                        variant='outlined'
                                        fullWidth
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.firstName && errors.firstName}
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        type="text"
                                        name="lastName"
                                        label="Last name"
                                        variant='outlined'
                                        fullWidth
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.lastName && errors.lastName}
                                        error={Boolean(touched.lastName && errors.lastName)}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        type="email"
                                        name="email"
                                        label="Email"
                                        variant='outlined'
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.email && errors.email}
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="submit"
                                    disabled={!(dirty && isValid)}
                                >Save</Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </DialogActions>
                        </Form>
                    )
                }}
            </Formik>
        </Dialog>
    )
}