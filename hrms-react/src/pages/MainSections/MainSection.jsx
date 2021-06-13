import React from 'react'
import { Container, Header, Image } from 'semantic-ui-react'
import mainBackground from './homeImages/hrmsbg.jpg'

export default function MainSection() {
    return (
        <div id="home" className="mainSection">
            <Container className='mainContainer'>
                <Image className="mainSectionImage" size="big" avatar src={mainBackground} style={{marginTop:"15px"}} />
                <Header className="mainSectionHeader" dividing inverted>
                    <span>H</span>uman
                    <span> R</span>esource
                    <span> M</span>anagement
                    <span> S</span>ystems !</Header>
                <Header className="mainSectionContent" as='p' inverted content="Life's too short for the wrong job." />
            </Container>
        </div>
    )
}
