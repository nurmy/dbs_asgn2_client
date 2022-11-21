import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createDoctor,
    readDoctors,
    updateDoctor,
    deleteDoctor,
} from '../api/doctorAPI'

export const fetchDoctors = createAsyncThunk(
    'doctor/fetchDoctors',
    async (arg, thunkAPI) => {
        try {
            const data = await readDoctors()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerDoctor = createAsyncThunk(
    'doctor/registerDoctor',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createDoctor(attributes)
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

export const editDoctor = createAsyncThunk(
    'doctor/editDoctor',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateDoctor(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeDoctor = createAsyncThunk(
    'doctor/removeDoctor',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteDoctor(attributes)
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
    name: 'doctor',
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
        [fetchDoctors.pending]: (state) => {
            state.isLoading = true
        },
        [fetchDoctors.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchDoctors.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerDoctor.pending]: (state) => {
            state.regging = true
        },
        [registerDoctor.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerDoctor.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editDoctor.pending]: (state) => {
            state.editing = true
        },
        [editDoctor.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (elm.email === action.payload.email) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editDoctor.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeDoctor.pending]: (state) => {
            state.deleting = true
        },
        [removeDoctor.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return elm.email !== action.payload.email
            })
            state.deleted = true
        },
        [removeDoctor.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
