import { Link } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import RegisterAndLogin from './RegisterAndLogin'
import { useDispatch, useSelector } from 'react-redux'
import EmployerSignIn from './EmployerSignIn'
import UnemployedSignIn from './UnemployedSignIn'
import { setActive } from '../store/Actions/naviActions'

export default function Navi() {

    const { authInitial } = useSelector(state => state.auth)
    const { naviInitials } = useSelector(state => state.navi)

    const dispatch = useDispatch()
    function handleItemActive(e, { name }) {
        dispatch(setActive(name))
    }

    return (
        <Container>
            <Menu className='navbar' inverted secondary pointing fixed='top' size='large'>
                <Menu.Item />
                <Menu.Item
                    onClick={handleItemActive}
                    className='naviLogo' name="home" as={Link} to="/" active content='HRMS.com' />
                <Menu.Item style={{ margin: "0px", padding: "0px", paddingLeft: "15px" }}>
                    {authInitial[0].login && authInitial[0].user.userType === 2 &&
                        <EmployerSignIn />}
                    {authInitial[0].login && authInitial[0].user.userType === 1 &&
                        <UnemployedSignIn />}
                    {authInitial[0].login ? null : <RegisterAndLogin />}
                </Menu.Item>

                <Menu.Menu className="naviSecondaryMenu" position='right'>
                    <Menu.Item name="home"
                        onClick={handleItemActive}
                        active={(naviInitials.itemName === "home") ? true : false}
                        as={Link} to="/" content='Home' />
                    <Menu.Item name="services"
                        onClick={handleItemActive}
                        active={(naviInitials.itemName === "services") ? true : false}
                        as={Link} to="/services" content='Services' />
                    <Menu.Item name="team"
                        onClick={handleItemActive}
                        active={(naviInitials.itemName === "team") ? true : false}
                        as={Link} to="/team" content='Team' />
                    <Menu.Item name="contact"
                        onClick={handleItemActive}
                        active={(naviInitials.itemName === "contact") ? true : false}
                        as={Link} to="/contact" content='Contact' />
                </Menu.Menu>

            </Menu>
        </Container>
    )
}
