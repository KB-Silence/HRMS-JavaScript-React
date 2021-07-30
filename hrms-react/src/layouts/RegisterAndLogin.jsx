import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from 'semantic-ui-react'

export default function RegisterAndLogin({ setActiveItem }) {
    return (
        <div>
            <ButtonGroup>
                <Button className="registerButton" content="Register"
                    as={Link} to="/unemployedRegister"
                    onClick={setActiveItem} />
                <Button className="loginButton" content="Login"
                    as={Link} to="/login"
                    onClick={setActiveItem} />
            </ButtonGroup>
        </div>
    )
}