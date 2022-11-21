import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import DiseaseTypes from '../pages/DiseaseTypes/DiseaseTypes'
import Country from '../pages/Country/Country'
import Disease from '../pages/Disease/Disease'
import Discover from '../pages/Discover/Discover'
import Users from '../pages/Users/Users'
import PublicServant from '../pages/PublicServant/PublicServant'
import Doctor from '../pages/Doctor/Doctor'
import Specialize from '../pages/Specialize/Specialize'
import Record from '../pages/Record/Record'
import SidebarLayout from '../components/SidebarLayout/SidebarLayout'
import Renavigate from '../components/Renavigate'

function App() {
    return (
        <Routes>
            <Route path="/" element={<SidebarLayout />}>
                <Route
                    index
                    element={<Renavigate source="/diseasetype" />}
                ></Route>

                <Route path="diseasetype" element={<DiseaseTypes />}></Route>
                <Route path="country" element={<Country />}></Route>
                <Route path="disease" element={<Disease />}></Route>
                <Route path="discover" element={<Discover />}></Route>
                <Route path="users" element={<Users />}></Route>
                <Route path="doctor" element={<Doctor />}></Route>
                <Route path="publicservant" element={<PublicServant />}></Route>
                <Route path="specialize" element={<Specialize />}></Route>
                <Route path="record" element={<Record />}></Route>
            </Route>
        </Routes>
    )
}

export default App
