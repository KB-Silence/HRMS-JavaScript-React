import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import RegisterAndLogin from './RegisterAndLogin'
import EmployerSignIn from './EmployerSignIn'

export default function Navi({ isAuthenticated, userType, signOut }) {
    const [activeItem, setActiveItem] = useState('home')

    function handleItemClick(e, { name }) {
      setActiveItem(name)
    }

    return (
        <div>
            <Container>
                <Menu className='navbar' inverted secondary pointing fixed='top' size='large'>
                    <Menu.Item />
                    <Menu.Item className='naviLogo' name="home" onClick={handleItemClick} as={Link} to="/" active content='HRMS.com' />
                    <Menu.Item style={{ margin: "0px", padding: "0px", paddingLeft: "15px" }}>
                        {isAuthenticated && userType==="employer" ? <EmployerSignIn signOut={signOut} /> : <RegisterAndLogin setActiveItem={handleItemClick} />}
                    </Menu.Item>

                    <Menu.Menu className="naviSecondaryMenu" position='right'>
                        <Menu.Item name="home" active={(activeItem === 'home') ? true : false} onClick={handleItemClick}
                            as={Link} to="/" content='Home' />
                        <Menu.Item name="services" active={(activeItem === 'services') ? true : false} onClick={handleItemClick}
                            as={Link} to="/services" content='Services' />
                        <Menu.Item name="team" active={(activeItem === 'team') ? true : false} onClick={handleItemClick}
                            as={Link} to="/team" content='Team' />
                        <Menu.Item name="contact" active={(activeItem === 'contact') ? true : false} onClick={handleItemClick}
                            as={Link} to="/contact" content='Contact' />
                    </Menu.Menu>

                </Menu>
            </Container>
        </div>
    )
}
