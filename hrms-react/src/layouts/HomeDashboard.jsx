import React from 'react'
import TeamSection from './HomeSections/TeamSection'
import MainSection from './HomeSections/MainSection'
import ServiceSection from './HomeSections/ServiceSection'
import ContactSection from './HomeSections/ContactSection'
import Footer from './Footer'

export default function HomeDashboard({setActiveItem}) {
    return (
        <div>
            <MainSection />
            <ServiceSection />
            <TeamSection />
            <ContactSection />
            <Footer />
        </div>
    )
}
