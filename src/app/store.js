import { configureStore } from '@reduxjs/toolkit'

import diseaseTypesReducer from './../features/diseaseTypesSlice'
import countryReducer from './../features/countrySlice'
import diseaseReducer from './../features/diseaseSlice'
import discoverReducer from './../features/discoverSlice'
import usersReducer from './../features/usersSlice'
import publicServantReducer from './../features/publicServantSlice'
import doctorReducer from './../features/doctorSlice'
import specializeReducer from './../features/specializeSlice'
import recordReducer from './../features/recordSlice'

const store = configureStore({
    reducer: {
        diseasetype: diseaseTypesReducer,
        country: countryReducer,
        disease: diseaseReducer,
        discover: discoverReducer,
        users: usersReducer,
        publicservant: publicServantReducer,
        doctor: doctorReducer,
        specialize: specializeReducer,
        record: recordReducer,
    },
})

export default store
