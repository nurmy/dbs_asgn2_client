import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createUser, readUsers, updateUser, deleteUser } from '../api/usersAPI'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (arg, thunkAPI) => {
        try {
            const data = await readUsers()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createUser(attributes)
            console.log(data)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const editUser = createAsyncThunk(
    'users/editUser',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateUser(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeUser = createAsyncThunk(
    'users/removeUser',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteUser(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

const slice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        hasError: false,
        data: [],
        loaded: false,
        regging: false,
        regged: false,
        deleting: false,
        deleted: false,
        editing: false,
        edited: false,
    },
    reducers: {
        resetReg: (state) => {
            state.regged = false
            state.hasError = false
        },
        resetEdit: (state) => {
            state.edited = false
            state.hasError = false
        },
        resetDelete: (state) => {
            state.deleted = false
            state.hasError = false
        },
    },
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.isLoading = true
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchUsers.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerUser.pending]: (state) => {
            state.regging = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerUser.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editUser.pending]: (state) => {
            state.editing = true
        },
        [editUser.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (elm.email === action.payload.email) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editUser.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeUser.pending]: (state) => {
            state.deleting = true
        },
        [removeUser.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return elm.email !== action.payload.email
            })
            state.deleted = true
        },
        [removeUser.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
