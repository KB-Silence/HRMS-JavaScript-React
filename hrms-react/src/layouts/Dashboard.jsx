import React from 'react'
import { Route } from 'react-router-dom'
import MainSection from '../pages/MainSections/MainSection'
import ServiceSection from '../pages/MainSections/ServiceSection'
import TeamSection from '../pages/MainSections/TeamSection'
import ContactSection from '../pages/MainSections/ContactSection'
import EmployerRegister from '../pages/LoginAndRegister/EmployerRegister'
import UnemployedRegister from '../pages/LoginAndRegister/UnemployedRegister'
import EmployerAdvertisements from '../pages/EmployerAdvertisements'
import AddAdvertisement from '../pages/AddAdvertisement'
import JobAdvertisementList from '../pages/JobAdvertisementList'
import Login from '../pages/LoginAndRegister/Login'
import { ToastContainer, Zoom } from 'react-toastify'
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail'
import JobAdvertisementFavorite from '../pages/JobAdvertisementFavorite'


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
            <Route exact path="/getAllAdvertisements" />

            <Route exact path="/employerAdvertisements" component={EmployerAdvertisements} />
            <Route exact path="/addAdvertisement" component={AddAdvertisement} />
            <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
            <Route exact path="/jobAdvertisements/:advertId" component={JobAdvertisementDetail} />
            <Route exact path="/jobAdvertisementFavorites" component={JobAdvertisementFavorite} />
        </div>
    )
}
