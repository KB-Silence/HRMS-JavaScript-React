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

    let message = `Hoşgeldin ${authInitial[0].user.name}`
    return (
        <Menu secondary stackable size="large" position='left'>
            <Menu.Item className="unemployedMenu">
                <Image
                    avatar
                    className="unemployedAvatar"
                    src={photoUrl.photoUrl} />
                <Dropdown className="signDropdown" pointing text={message} icon="hand point down" >
                    <Dropdown.Menu>
                        <Dropdown.Item className="signDropdownContent" content="Favori İlanlar"
                            as={Link} to="/jobAdvertisementFavorites" />
                        <Dropdown.Item className="signDropdownContent" content='Bütün İlanları Gör' as={Link} to="/allJobAdvertisements" />
                        <Dropdown.Item className="signDropdownContent" content='Profil' as={Link} to={`/unemployed/${authInitial[0].user.id}`} />
                        <Dropdown.Item className="signDropdownContent" content='Çıkış Yap' onClick={() => handleLogout(authInitial[0].user)} />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Menu>
    )
}
