import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createSpecialize,
    readSpecializes,
    updateSpecialize,
    deleteSpecialize,
} from '../api/specializeAPI'

export const fetchSpecializes = createAsyncThunk(
    'specialize/fetchSpecializes',
    async (arg, thunkAPI) => {
        try {
            const data = await readSpecializes()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerSpecialize = createAsyncThunk(
    'specialize/registerSpecialize',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createSpecialize(attributes)
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

export const editSpecialize = createAsyncThunk(
    'specialize/editSpecialize',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateSpecialize(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeSpecialize = createAsyncThunk(
    'specialize/removeSpecialize',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteSpecialize(attributes)
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
    name: 'specialize',
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
        [fetchSpecializes.pending]: (state) => {
            state.isLoading = true
        },
        [fetchSpecializes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchSpecializes.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerSpecialize.pending]: (state) => {
            state.regging = true
        },
        [registerSpecialize.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerSpecialize.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editSpecialize.pending]: (state) => {
            state.editing = true
        },
        [editSpecialize.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (
                    elm.id === action.payload.id &&
                    elm.email === action.payload.email
                ) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editSpecialize.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeSpecialize.pending]: (state) => {
            state.deleting = true
        },
        [removeSpecialize.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return (
                    elm.id !== action.payload.id ||
                    elm.email !== action.payload.email
                )
            })
            state.deleted = true
        },
        [removeSpecialize.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
