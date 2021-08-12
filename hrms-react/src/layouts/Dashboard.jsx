import React from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer, Zoom } from 'react-toastify'
import Login from '../pages/LoginAndRegister/Login'
import MainSection from '../pages/MainSections/MainSection'
import ServiceSection from '../pages/MainSections/ServiceSection'
import TeamSection from '../pages/MainSections/TeamSection'
import ContactSection from '../pages/MainSections/ContactSection'
import EmployerRegister from '../pages/LoginAndRegister/EmployerRegister'
import UnemployedRegister from '../pages/LoginAndRegister/UnemployedRegister'
import AddAdvertisement from '../pages/JobAdvertisements/AddAdvertisement'
import JobAdvertisementList from '../pages/JobAdvertisements/JobAdvertisementList'
import JobAdvertisementDetail from '../pages/JobAdvertisements/JobAdvertisementDetail'
import JobAdvertisementFavorite from '../pages/JobAdvertisements/JobAdvertisementFavorite'
import UnemployedProfile from '../pages/UnemployedProfile'
import EmployerProfile from '../pages/EmployerProfile'
import EmployeeProfile from '../pages/EmployeeProfile'


export default function Dashboard() {
    return (
        <div>
            <ToastContainer className="toastContainer"
                style={{ marginTop: "5em" }}
                position="top-right"
                autoClose={2500}
                transition={Zoom}
                closeOnClick />

            <Route exact path="/" component={MainSection} />
            <Route exact path="/services" component={ServiceSection} />
            <Route exact path="/team" component={TeamSection} />
            <Route exact path="/contact" component={ContactSection} />

            <Route exact path="/employerRegister" component={EmployerRegister} />
            <Route exact path="/unemployedRegister" component={UnemployedRegister} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/employee/:employeeId" component={EmployeeProfile} />
            <Route exact path="/employer/:employerId" component={EmployerProfile} />
            <Route exact path="/unemployed/:unemployedId" component={UnemployedProfile} />

            <Route exact path="/addAdvertisement" component={AddAdvertisement} />
            <Route exact path="/allJobAdvertisements" component={JobAdvertisementList} />
            <Route exact path="/jobAdvertisement/:advertId" component={JobAdvertisementDetail} />
            <Route exact path="/jobAdvertisementFavorites" component={JobAdvertisementFavorite} />
        </div>
    )
}
