import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import { userLogout } from '../store/Actions/authActions'
import { setActive } from '../store/Actions/naviActions'

export default function EmployeeSignIn() {

    const { authInitial } = useSelector(state => state.auth)
    const dispath = useDispatch()
    const history = useHistory()
    const handleLogout = (user) => {
        dispath(userLogout(user))
        history.push("/")
        dispath(setActive("home"))
    }
    let message = `Hoşgeldin ${authInitial[0].user.name}`
    return (
        <Menu secondary stackable size="large" position='left'>
            <Menu.Item>
                <Dropdown className="signDropdown" pointing text={message} icon="hand point down" >
                    <Dropdown.Menu>
                        <Dropdown.Item className="signDropdownContent" content='Yönetim Paneli'
                            as={Link} to={`/employee/${authInitial[0].user.id}`} />
                        <Dropdown.Item className="signDropdownContent" content='Çıkış Yap' onClick={() => handleLogout(authInitial[0].user)} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}
