import React from 'react'
import { Container, Button, Header, Image } from 'semantic-ui-react'
import mainBackground from './homeImages/hrmsbg.jpg'

export default function MainSection({setActiveItem}) {
    return (
        <div id="home" className="mainSection">
            <Container className='mainContainer'>
                <Image className="mainSectionImage" size="big" avatar centered src={mainBackground} />
                <Header className="mainSectionHeader" dividing inverted>
                    <span>H</span>uman
                    <span> R</span>esource
                    <span> M</span>anagement
                    <span> S</span>ystems !</Header>
                <Header className="mainSectionContent" as='p' inverted content="Engin Demirog's Developer Training Camp - HRMS Project (Frontend) " />
                <Button 
                className="letsButton" name="services" onClick={setActiveItem} inverted size='big' labelPosition='right' icon='coffee' content="Let's start" />
            </Container>
        </div>
    )
}
