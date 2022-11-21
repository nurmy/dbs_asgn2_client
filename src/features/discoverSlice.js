import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createDiscover,
    readDiscovers,
    updateDiscover,
    deleteDiscover,
} from '../api/discoverAPI'

export const fetchDiscovers = createAsyncThunk(
    'discover/fetchDiscovers',
    async (arg, thunkAPI) => {
        try {
            const data = await readDiscovers()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerDiscover = createAsyncThunk(
    'discover/registerDiscover',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createDiscover(attributes)
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

export const editDiscover = createAsyncThunk(
    'discover/editDiscover',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateDiscover(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeDiscover = createAsyncThunk(
    'discover/removeDiscover',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteDiscover(attributes)
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
    name: 'discover',
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
        [fetchDiscovers.pending]: (state) => {
            state.isLoading = true
        },
        [fetchDiscovers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchDiscovers.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerDiscover.pending]: (state) => {
            state.regging = true
        },
        [registerDiscover.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerDiscover.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editDiscover.pending]: (state) => {
            state.editing = true
        },
        [editDiscover.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (
                    elm.cname === action.payload.cname &&
                    elm.disease_code === action.payload.disease_code
                ) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editDiscover.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeDiscover.pending]: (state) => {
            state.deleting = true
        },
        [removeDiscover.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return (
                    elm.cname !== action.payload.cname ||
                    elm.disease_code !== action.payload.disease_code
                )
            })
            state.deleted = true
        },
        [removeDiscover.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
