import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export default function LoginButtonGroup({setActiveItem}) {
    return (
        <div>
            <Button.Group className='naviButtonGroup' compact size='medium' >
                <Button className="naviRegisterButton" onClick={setActiveItem} name="register" content='Register' as={Link} to="/register" />
                <Button.Or text='&' />
                <Button className="naviLoginButton" onClick={setActiveItem} name="login" content='Employer Login' as={Link} to="/employerLogin" />
                <Button.Or text='&' />
                <Button className="naviLoginButton" onClick={setActiveItem} name="login" content='Unemployed Login' as={Link} to="/unemployedLogin" />
            </Button.Group>
        </div>
    )
}
