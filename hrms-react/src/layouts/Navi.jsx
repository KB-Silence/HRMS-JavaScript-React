import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import RegisterAndLogin from './RegisterAndLogin'
import { useSelector } from 'react-redux'
import EmployerSignIn from './EmployerSignIn'
import UnemployedSignIn from './UnemployedSignIn'

export default function Navi() {

    const [activeItem, setActiveItem] = useState('home')

    function handleItemClick(e, { name }) {
        setActiveItem(name)
    }

    const { authInitial } = useSelector(state => state.auth)

    return (
        <Container>
            <Menu className='navbar' inverted secondary pointing fixed='top' size='large'>
                <Menu.Item />
                <Menu.Item className='naviLogo' name="home" onClick={handleItemClick} as={Link} to="/" active content='HRMS.com' />
                <Menu.Item style={{ margin: "0px", padding: "0px", paddingLeft: "15px" }}>
                    {authInitial[0].login && authInitial[0].user.userType === 2 &&
                        <EmployerSignIn />}
                    {authInitial[0].login && authInitial[0].user.userType === 1 &&
                        <UnemployedSignIn />}
                    {authInitial[0].login ? null : <RegisterAndLogin />}
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
    )
}
