import React from 'react'
import { Route } from 'react-router-dom'
import Register from '../pages/LoginAndRegister/Register'
import MainSection from '../pages/MainSections/MainSection'
import ServiceSection from '../pages/MainSections/ServiceSection'
import TeamSection from '../pages/MainSections/TeamSection'
import ContactSection from '../pages/MainSections/ContactSection'
import EmployerRegister from '../pages/LoginAndRegister/EmployerRegister'
import UnemployedRegister from '../pages/LoginAndRegister/UnemployedRegister'
import EmployerLogin from '../pages/LoginAndRegister/EmployerLogin'
import UnemployedLogin from '../pages/LoginAndRegister/UnemployedLogin'


export default function Dashboard() {
    return (
        <div>
            <Route exact path="/" component={MainSection} />
            <Route exact path="/services" component={ServiceSection} />
            <Route exact path="/team" component={TeamSection} />
            <Route exact path="/contact" component={ContactSection} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/employerRegister" component={EmployerRegister} />
            <Route exact path="/unemployedRegister" component={UnemployedRegister} />
            
            <Route exact path="/employerLogin" component={EmployerLogin} />
            <Route exact path="/unemployedLogin" component={UnemployedLogin} />
        </div>
    )
}
