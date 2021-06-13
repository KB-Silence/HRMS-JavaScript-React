import React from 'react'
import { Container, Menu, Button } from 'semantic-ui-react'

export default function Navi({ activeItem, setActiveItem }) {
    return (
        <div>
            <Container>
                <Menu className='navbar' inverted secondary pointing fixed='top' size='large'>
                    <Menu.Item />
                    <Menu.Item className='naviLogo' name="home" onClick={setActiveItem} href="#home" active content='HRMS.com' />
                    <Menu.Item>
                        <Button.Group className='naviButtonGroup' compact size='medium' >
                            <Button className="naviRegisterButton" content='Register' />
                            <Button.Or text='&' />
                            <Button className="naviLoginButton" content='Employer Login' />
                            <Button.Or text='&' />
                            <Button className="naviLoginButton" content='Unemployed Login' />
                        </Button.Group>
                    </Menu.Item>


                    <Menu.Menu className="naviSecondaryMenu" position='right'>
                        <Menu.Item name="home" active={activeItem === 'home'} onClick={setActiveItem} href="#home" content='Home' />
                        <Menu.Item name="services" active={activeItem === 'services'} onClick={setActiveItem}href="#services" content='Services' />
                        <Menu.Item name="team" active={activeItem === 'team'} onClick={setActiveItem} href="#team"  content='Team' />
                        <Menu.Item name="contact" active={activeItem === 'contact'} onClick={setActiveItem} href="#contact" content='Contact' />
                    </Menu.Menu>

                </Menu>
            </Container>
        </div>
    )
}
