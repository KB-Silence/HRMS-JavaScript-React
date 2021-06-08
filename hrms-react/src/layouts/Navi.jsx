import React from 'react'
import { Container, Menu} from 'semantic-ui-react'
import Login from './Login'

export default function Navi() {
    return (
        <div>
            <Menu inverted borderless fixed="top" color="orange" >
                <Container>
                    <Menu.Item name='logo'> --Logo will be added.--  </Menu.Item>
                    <Menu.Item> Home Page </Menu.Item>
                    <Menu.Item name="loginArea" position="right"><Login/></Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}
