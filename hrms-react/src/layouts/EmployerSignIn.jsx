import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Image, Dropdown, Button } from 'semantic-ui-react'

export default function EmployerSignIn({signOut}) {
    return (
        <div>
            <Menu.Menu position='left'>
                <Menu.Item style={{ margin: "0px", padding: "0px", paddingTop: "5px" }}>
                    <Image avatar size="mini" centered src="https://st3.depositphotos.com/15648834/17930/v/1600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                </Menu.Item>
                <Menu.Item>
                    <Dropdown className="employerSignDropdown" pointing text="Welcome Berkcan" icon="hand point down" >
                        <Dropdown.Menu>
                            <Dropdown.Item className="employerSignDropdownContent" content="Your Advertisements" icon="unordered list"
                                as={Link} to="/employerAdvertisements" />
                            <Dropdown.Item className="employerSignDropdownContent" content='Add Advert.' icon='add circle'
                            as={Link} to="addAdvertisement" />
                            <Dropdown.Item className="employerSignDropdownContent" content='Profile' icon='user circle' />
                            <Dropdown.Item className="employerSignDropdownContent" content='Sign Out' icon='sign-out' onClick={signOut} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item className="employerSignAllAdverts">
                    <Button className="employerSignAllButton" as={Link} to="getAllAdvertisements" > See all Adverts </Button>
                </Menu.Item>
            </Menu.Menu>
        </div>
    )
}
