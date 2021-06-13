import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import LoginButtonGroup from './LoginButtonGroup'

export default function Navi({ activeItem, setActiveItem }) {
    return (
        <div>
            <Container>
                <Menu className='navbar' inverted secondary pointing fixed='top' size='large'>
                    <Menu.Item />
                    <Menu.Item className='naviLogo' name="home" onClick={setActiveItem} as={Link} to="/" active content='HRMS.com' />
                    <Menu.Item>
                        <LoginButtonGroup setActiveItem={setActiveItem} />
                    </Menu.Item>


                    <Menu.Menu className="naviSecondaryMenu" position='right'>
                        <Menu.Item name="home" active={(activeItem === 'home') ? true : false} onClick={setActiveItem} 
                        as={Link} to="/" content='Home' />
                        <Menu.Item name="services" active={(activeItem === 'services') ? true : false} onClick={setActiveItem} 
                        as={Link} to="/services" content='Services' />
                        <Menu.Item name="team" active={(activeItem === 'team') ? true : false} onClick={setActiveItem} 
                        as={Link} to="/team" content='Team' />
                        <Menu.Item name="contact" active={(activeItem === 'contact') ? true : false} onClick={setActiveItem} 
                        as={Link} to="/contact" content='Contact' />
                    </Menu.Menu>

                </Menu>
            </Container>
        </div>
    )
}
