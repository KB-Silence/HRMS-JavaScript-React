import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { userLogout } from '../store/Actions/authActions'

export default function UnemployedSignIn() {

    const { authInitial } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = (user) => {
        dispatch(userLogout(user))
        history.push("/")
    }
    
    let message = `Welcome ${authInitial[0].user.name}`
    return (
        <Menu secondary stackable size="large" position='left'>
            <Menu.Item>
                <Image>
                    {/* Buraya iş arayan resmi gelecek. */}
                </Image>
            </Menu.Item>
            <Menu.Item>
                <Dropdown className="signDropdown" pointing text={message} icon="hand point down" >
                    <Dropdown.Menu>
                        <Dropdown.Item className="signDropdownContent" content="Favorite Adverts"
                            as={Link} to="/jobAdvertisementFavorites" />
                        <Dropdown.Item className="signDropdownContent" content='See All Adverts' as={Link} to="jobAdvertisements" />
                        <Dropdown.Item className="signDropdownContent" content='Profile' />
                        <Dropdown.Item className="signDropdownContent" content='Sign Out' onClick={() => handleLogout(authInitial[0].user)} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}
