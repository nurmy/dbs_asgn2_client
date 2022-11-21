import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createDiseaseType,
    readDiseaseTypes,
    updateDiseaseType,
    deleteDiseaseType,
} from '../api/diseaseTypesAPI'

export const fetchDiseaseTypes = createAsyncThunk(
    'diseasetype/fetchDiseaseTypes',
    async (arg, thunkAPI) => {
        try {
            const data = await readDiseaseTypes()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerDiseaseType = createAsyncThunk(
    'diseasetype/registerDiseaseType',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createDiseaseType(attributes)
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

export const editDiseaseType = createAsyncThunk(
    'diseasetype/editDiseaseType',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateDiseaseType(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeDiseaseType = createAsyncThunk(
    'diseasetype/removeDiseaseType',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteDiseaseType(attributes)
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
    name: 'diseasetype',
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
        [fetchDiseaseTypes.pending]: (state) => {
            state.isLoading = true
        },
        [fetchDiseaseTypes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchDiseaseTypes.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerDiseaseType.pending]: (state) => {
            state.regging = true
        },
        [registerDiseaseType.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerDiseaseType.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editDiseaseType.pending]: (state) => {
            state.editing = true
        },
        [editDiseaseType.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (elm.id.toString() === action.payload.id.toString()) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editDiseaseType.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeDiseaseType.pending]: (state) => {
            state.deleting = true
        },
        [removeDiseaseType.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return elm.id !== action.payload.id
            })
            state.deleted = true
        },
        [removeDiseaseType.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
