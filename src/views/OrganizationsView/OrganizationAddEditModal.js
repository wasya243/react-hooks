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


export const OrganizationAddEditModal = ({isOpen, onClose, onSave, organization = {}}) => {
    const isNew = Boolean(organization._id)

    const onSubmit = (orgData) => {
        onSave(Object.assign(organization, orgData))
    }

    const initialValues = {
        name: organization.name ? organization.name : ''
    }

    const organizationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Org name should be more than 1 symbol')
            .max(50, 'Org name should not be more than 50 symbols')
    })

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={organizationSchema}
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
                                {isNew ? 'Add organization' : 'Update organization'}
                            </DialogTitle>
                            <DialogContent>
                                <Box>
                                    <TextField
                                        type="text"
                                        name="name"
                                        label="Organization name"
                                        variant='outlined'
                                        fullWidth
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={touched.name && errors.name}
                                        error={Boolean(touched.name && errors.name)}
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