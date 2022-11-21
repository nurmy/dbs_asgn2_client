import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createCountry,
    readCountries,
    updateCountry,
    deleteCountry,
} from '../api/countryAPI'

export const fetchCountries = createAsyncThunk(
    'country/fetchCountries',
    async (arg, thunkAPI) => {
        try {
            const data = await readCountries()
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const registerCountry = createAsyncThunk(
    'country/registerCountry',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await createCountry(attributes)
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

export const editCountry = createAsyncThunk(
    'country/editCountry',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await updateCountry(attributes)
            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            }
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to authenticate')
        }
    }
)

export const removeCountry = createAsyncThunk(
    'country/removeCountry',
    async ({ attributes }, thunkAPI) => {
        try {
            const data = await deleteCountry(attributes)
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
    name: 'country',
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
        [fetchCountries.pending]: (state) => {
            state.isLoading = true
        },
        [fetchCountries.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.loaded = true
        },
        [fetchCountries.rejected]: (state) => {
            state.isLoading = false
            state.hasError = true
        },
        [registerCountry.pending]: (state) => {
            state.regging = true
        },
        [registerCountry.fulfilled]: (state, action) => {
            state.regging = false
            state.data.push(action.payload)
            state.regged = true
        },
        [registerCountry.rejected]: (state) => {
            state.regging = false
            state.hasError = true
        },
        [editCountry.pending]: (state) => {
            state.editing = true
        },
        [editCountry.fulfilled]: (state, action) => {
            state.editing = false
            state.data = state.data.map((elm) => {
                if (elm.cname.toString() === action.payload.cname.toString()) {
                    return action.payload
                }
                return elm
            })
            state.edited = true
        },
        [editCountry.rejected]: (state) => {
            state.editing = false
            state.hasError = true
        },
        [removeCountry.pending]: (state) => {
            state.deleting = true
        },
        [removeCountry.fulfilled]: (state, action) => {
            state.deleting = false
            state.data = state.data.filter((elm) => {
                return elm.cname !== action.payload.cname
            })
            state.deleted = true
        },
        [removeCountry.rejected]: (state) => {
            state.deleting = false
            state.hasError = true
        },
    },
})

export const { resetReg, resetEdit, resetDelete } = slice.actions

export default slice.reducer
