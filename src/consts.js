export const COLUMN_TYPES = {
    text: 'text',
    action: 'action'
}

export const COLUMN_ACTION_VARIATIONS = {
    delete: 'delete',
    edit: 'edit'
}

export const USERS_TABLE_COLUMNS = [
    {
        label: 'Email',
        value: 'email',
        columnType: COLUMN_TYPES.text
    },
    {
        label: 'First name',
        value: 'firstName',
        columnType: COLUMN_TYPES.text
    },
    {
        label: 'Last name',
        value: 'lastName',
        columnType: COLUMN_TYPES.text
    },
    {
        label: '',
        value: COLUMN_ACTION_VARIATIONS.edit,
        columnType: COLUMN_TYPES.action,
        variation: COLUMN_ACTION_VARIATIONS.edit
    },
    {
        label: '',
        value: COLUMN_ACTION_VARIATIONS.delete,
        columnType: COLUMN_TYPES.action,
        variation: COLUMN_ACTION_VARIATIONS.delete
    }
]

export const ORGANIZATIONS_TABLE_COLUMNS = [
    {
        label: 'Name',
        value: 'name',
        columnType: COLUMN_TYPES.text
    },
    {
        label: '',
        value: COLUMN_ACTION_VARIATIONS.edit,
        columnType: COLUMN_TYPES.action,
        variation: COLUMN_ACTION_VARIATIONS.edit
    },
    {
        label: '',
        value: COLUMN_ACTION_VARIATIONS.delete,
        columnType: COLUMN_TYPES.action,
        variation: COLUMN_ACTION_VARIATIONS.delete
    }
]