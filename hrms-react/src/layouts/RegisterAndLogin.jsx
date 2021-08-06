import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from 'semantic-ui-react'

export default function RegisterAndLogin() {
    return (
        <ButtonGroup>
            <Button
                className="registerButton"
                content="Register"
                as={Link} to="/unemployedRegister" />
            <Button
                className="loginButton"
                content="Login"
                as={Link} to="/login" />
        </ButtonGroup>
    )
}