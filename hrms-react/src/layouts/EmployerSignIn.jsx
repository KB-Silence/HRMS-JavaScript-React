import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'
import { userLogout } from '../store/Actions/authActions'
import { setActive } from '../store/Actions/naviActions'

export default function EmployerSignIn() {

    const { authInitial } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = (user) => {
        dispatch(userLogout(user))
        history.push("/")
        dispatch(setActive("home"))
    }
    let message = `Welcome ${authInitial[0].user.name}`
    return (
        <Menu secondary stackable size="large" position='left'>
            <Menu.Item>
                <Dropdown className="employerSignDropdown" pointing text={message} icon="hand point down" >
                    <Dropdown.Menu>
                        <Dropdown.Item className="employerSignDropdownContent" content='Add Advert.'
                            as={Link} to="/addAdvertisement" />
                        <Dropdown.Item className="employerSignDropdownContent" content='See All Adverts' as={Link} to="/allJobAdvertisements" />
                        <Dropdown.Item className="employerSignDropdownContent" content='Profile' as={Link} to={`/employer/${authInitial[0].user.id}`} />
                        <Dropdown.Item className="employerSignDropdownContent" content='Sign Out' onClick={() => handleLogout(authInitial[0].user)} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}
