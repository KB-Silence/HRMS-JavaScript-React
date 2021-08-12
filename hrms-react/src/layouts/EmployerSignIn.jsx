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
    let message = `Hoş geldin ${authInitial[0].user.name}`
    return (
        <Menu secondary stackable size="large" position='left'>
            <Menu.Item>
                <Dropdown className="employerSignDropdown" pointing text={message} icon="hand point down" >
                    <Dropdown.Menu>
                        <Dropdown.Item className="employerSignDropdownContent" content='İlan Ekle'
                            as={Link} to="/addAdvertisement" />
                        <Dropdown.Item className="employerSignDropdownContent" content='Bütün İlanları Gör' as={Link} to="/allJobAdvertisements" />
                        <Dropdown.Item className="employerSignDropdownContent" content='Profil' as={Link} to={`/employer/${authInitial[0].user.id}`} />
                        <Dropdown.Item className="employerSignDropdownContent" content='Çıkış Yap' onClick={() => handleLogout(authInitial[0].user)} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}
