import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from 'semantic-ui-react'

export default function RegisterAndLogin() {
    return (
        <ButtonGroup>
            <Button
                className="registerButton"
                content="Kayıt Ol"
                as={Link} to="/unemployedRegister" />
            <Button
                className="loginButton"
                content="Giriş Yap"
                as={Link} to="/login" />
        </ButtonGroup>
    )
}