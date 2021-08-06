import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { userLogout } from '../store/Actions/authActions'
import { setActive } from '../store/Actions/naviActions'
import PhotoUploadService from '../services/PhotoUploadService'
import { useEffect } from 'react'

export default function UnemployedSignIn() {

    const { authInitial } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = (user) => {
        dispatch(userLogout(user))
        history.push("/")
        dispatch(setActive("home"))
    }

    let photoService = new PhotoUploadService()
    const [photoUrl, setPhotoUrl] = useState([])
    useEffect(() => {
        photoService.getByUnemployedId(authInitial[0].user.id).then((result) => setPhotoUrl(result.data.data))
    }, [])
    
    let message = `Welcome ${authInitial[0].user.name}`
    return (
        <Menu secondary stackable size="large" position='left'>
            <Menu.Item className="menuAvatarItem">
                <Image 
                avatar
                className="unemployedAvatar"
                src={photoUrl.photoUrl}/>
            </Menu.Item>
            <Menu.Item>
                <Dropdown className="signDropdown" pointing text={message} icon="hand point down" >
                    <Dropdown.Menu>
                        <Dropdown.Item className="signDropdownContent" content="Favorite Adverts"
                            as={Link} to="/jobAdvertisementFavorites" />
                        <Dropdown.Item className="signDropdownContent" content='See All Adverts' as={Link} to="/allJobAdvertisements" />
                        <Dropdown.Item className="signDropdownContent" content='Profile' />
                        <Dropdown.Item className="signDropdownContent" content='Sign Out' onClick={() => handleLogout(authInitial[0].user)} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}
