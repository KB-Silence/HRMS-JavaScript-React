import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Divider } from 'semantic-ui-react'

export default function SignAndLogin({ setActiveItem }) {
    return (
        <div>
            <Dropdown className="registerDropdown" compact button text="Register">
                <Dropdown.Menu className="registerDropMenu">
                    <Dropdown.Item as={Link} to="/employerRegister" text="Employer Register" />
                    <Divider />
                    <Dropdown.Item as={Link} to="/unemployedRegister" text="Unemployed Register" />
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="loginDropdown" compact button text="Login">
                <Dropdown.Menu className="loginDropMenu">
                    <Dropdown.Item as={Link} to="/employerLogin" text="Employer Login" />
                    <Divider />
                    <Dropdown.Item as={Link} to="unemployedLogin" text="Unemployed Login" />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}


{/* <Button.Group className='naviButtonGroup' compact size='medium' style={{marginBottom:"8px"}} >
                <Button className="naviRegisterButton" onClick={setActiveItem} name="register" content='Register' as={Link} to="/register" />
                <Button.Or text='&' />
                <Button className="naviLoginButton" onClick={setActiveItem} name="login" content='Employer Login' as={Link} to="/employerLogin" />
                <Button.Or text='&' />
                <Button className="naviLoginButton" onClick={setActiveItem} name="login" content='Unemployed Login' as={Link} to="/unemployedLogin" />
            </Button.Group> */}