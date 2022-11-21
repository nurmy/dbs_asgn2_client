import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createDisease,
    readDiseases,
    updateDisease,
    deleteDisease,
} from '../api/diseaseAPI'

export const fetchDiseases = createAsyncThunk(
    'disease/fetchDiseases',
    async (arg, thunkAPI) => {
        try {
            const data = await readDiseases()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerDisease = createAsyncThunk(
    'disease/registerDisease',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createDisease(attributes)
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

export const editDisease = createAsyncThunk(
    'disease/editDisease',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateDisease(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeDisease = createAsyncThunk(
    'disease/removeDisease',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteDisease(attributes)
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
    name: 'disease',
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
        [fetchDiseases.pending]: (state) => {
            state.isLoading = true
        },
        [fetchDiseases.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchDiseases.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerDisease.pending]: (state) => {
            state.regging = true
        },
        [registerDisease.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerDisease.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editDisease.pending]: (state) => {
            state.editing = true
        },
        [editDisease.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (
                    elm.disease_code.toString() ===
                    action.payload.disease_code.toString()
                ) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editDisease.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeDisease.pending]: (state) => {
            state.deleting = true
        },
        [removeDisease.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return elm.disease_code !== action.payload.disease_code
            })
            state.deleted = true
        },
        [removeDisease.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
