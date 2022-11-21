import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createRecord,
    readRecords,
    updateRecord,
    deleteRecord,
} from '../api/recordAPI'

export const fetchRecords = createAsyncThunk(
    'record/fetchRecords',
    async (arg, thunkAPI) => {
        try {
            const data = await readRecords()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerRecord = createAsyncThunk(
    'record/registerRecord',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createRecord(attributes)
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

export const editRecord = createAsyncThunk(
    'record/editRecord',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateRecord(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeRecord = createAsyncThunk(
    'record/removeRecord',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteRecord(attributes)
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
    name: 'record',
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
        [fetchRecords.pending]: (state) => {
            state.isLoading = true
        },
        [fetchRecords.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchRecords.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerRecord.pending]: (state) => {
            state.regging = true
        },
        [registerRecord.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerRecord.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editRecord.pending]: (state) => {
            state.editing = true
        },
        [editRecord.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (
                    elm.email === action.payload.email &&
                    elm.cname === action.payload.cname &&
                    elm.disease_code === action.payload.disease_code
                ) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editRecord.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeRecord.pending]: (state) => {
            state.deleting = true
        },
        [removeRecord.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return (
                    elm.email !== action.payload.email ||
                    elm.cname !== action.payload.cname ||
                    elm.disease_code !== action.payload.disease_code
                )
            })
            state.deleted = true
        },
        [removeRecord.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
