import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Divider } from 'semantic-ui-react'

export default function RegisterAndLogin({ setActiveItem }) {
    return (
        <div>
            <Dropdown className="registerDropdown" compact button text="Register">
                <Dropdown.Menu className="registerDropMenu">
                    <Dropdown.Item as={Link} to="/employerRegister" onClick={setActiveItem} text="Employer Register" />
                    <Divider />
                    <Dropdown.Item as={Link} to="/unemployedRegister" onClick={setActiveItem} text="Unemployed Register" />
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="loginDropdown" compact button text="Login">
                <Dropdown.Menu className="loginDropMenu">
                    <Dropdown.Item as={Link} to="/employerLogin" onClick={setActiveItem} text="Employer Login" />
                    <Divider />
                    <Dropdown.Item as={Link} to="unemployedLogin" onClick={setActiveItem} text="Unemployed Login" />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}