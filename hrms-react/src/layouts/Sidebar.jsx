import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function Sidebar() {
    return (
        <div>
            <Menu pointing secondary vertical>
                <Menu.Item active
                name ='title' content='HRMS'
                />
                <Menu.Item 
                    name='jobAdvertisements' content='Job Advertisements'
                />
                <Menu.Item
                    name='employers' content="Employers"
                />
                <Menu.Item
                    name='unemployeds' content="Unemployeds"
                />
                <Menu.Item
                    name = "jobPositions" content="Positions"
                />
            </Menu>
        </div>
    )
}
