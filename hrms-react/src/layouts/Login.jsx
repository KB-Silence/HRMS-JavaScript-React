import React from 'react'
import { Button } from 'semantic-ui-react'

export default function Login() {
    return (
        <div>
            <Button.Group compact inverted size="small">
                <Button positive>Register</Button>
                <Button.Or text="&" />
                <Button color="teal" >Employer Login</Button>
                <Button.Or text="&"/>
                <Button color="teal">Unemployed Login</Button>
            </Button.Group>
        </div>
    )
}
