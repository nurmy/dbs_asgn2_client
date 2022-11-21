import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createPublicServant,
    readPublicServants,
    updatePublicServant,
    deletePublicServant,
} from '../api/publicServantAPI'

export const fetchPublicServants = createAsyncThunk(
    'publicservant/fetchPublicServants',
    async (arg, thunkAPI) => {
        try {
            const data = await readPublicServants()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerPublicServant = createAsyncThunk(
    'publicservant/registerPublicServant',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createPublicServant(attributes)
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

export const editPublicServant = createAsyncThunk(
    'publicservant/editPublicServant',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updatePublicServant(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removePublicServant = createAsyncThunk(
    'publicservant/removePublicServant',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deletePublicServant(attributes)
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
    name: 'publicservant',
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
        [fetchPublicServants.pending]: (state) => {
            state.isLoading = true
        },
        [fetchPublicServants.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchPublicServants.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerPublicServant.pending]: (state) => {
            state.regging = true
        },
        [registerPublicServant.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerPublicServant.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editPublicServant.pending]: (state) => {
            state.editing = true
        },
        [editPublicServant.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (elm.email === action.payload.email) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editPublicServant.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removePublicServant.pending]: (state) => {
            state.deleting = true
        },
        [removePublicServant.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return elm.email !== action.payload.email
            })
            state.deleted = true
        },
        [removePublicServant.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
