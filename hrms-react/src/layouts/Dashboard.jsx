import React from 'react'
import { Route } from 'react-router-dom'
import MainSection from '../pages/MainSections/MainSection'
import ServiceSection from '../pages/MainSections/ServiceSection'
import TeamSection from '../pages/MainSections/TeamSection'
import ContactSection from '../pages/MainSections/ContactSection'
import EmployerRegister from '../pages/LoginAndRegister/EmployerRegister'
import UnemployedRegister from '../pages/LoginAndRegister/UnemployedRegister'
import EmployerLogin from '../pages/LoginAndRegister/EmployerLogin'
import UnemployedLogin from '../pages/LoginAndRegister/UnemployedLogin'
import EmployerAdvertisements from '../pages/EmployerAdvertisements'
import AddAdvertisement from '../pages/AddAdvertisement'
import JobAdvertisementList from '../pages/JobAdvertisementList'


export default function Dashboard({isAuthenticated, userType}) {
    return (
        <div>
            <Route exact path="/" component={MainSection} />
            <Route exact path="/services" component={ServiceSection} />
            <Route exact path="/team" component={TeamSection} />
            <Route exact path="/contact" component={ContactSection} />

            <Route exact path="/employerRegister" component={EmployerRegister} />
            <Route exact path="/unemployedRegister" component={UnemployedRegister} />
            
            <Route exact path="/employerLogin" render={()=>(
                <React.Fragment>
                    <EmployerLogin signIn={isAuthenticated} userType={userType} />
                </React.Fragment>
            )} />
            <Route exact path="/unemployedLogin" component={UnemployedLogin} />
            <Route exact path="/getAllAdvertisements" />

            <Route exact path="/employerAdvertisements" component={EmployerAdvertisements} />
            <Route exact path="/addAdvertisement" component={AddAdvertisement} />
            <Route exact path="/allJobAdvertisements" component={JobAdvertisementList} />
        </div>
    )
}
