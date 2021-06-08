import React, { useEffect, useState } from 'react'
import { Table,Header } from 'semantic-ui-react'
import PositionService from '../services/PositionService'

export default function PositionList() {
    const [positions, setPositions] = useState([])
    useEffect(() => {
        let positionService = new PositionService();
        positionService.getPositions().then(result => setPositions(result.data.data))
    }, [])
    return (
        <div>
            <Header floated='left' color='grey'>
                <Header.Content>Position List</Header.Content>
            </Header>
            <Table color="yellow" celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Position Name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        positions.map(position => (
                            <Table.Row key={position.positionId}>
                                <Table.Cell>{position.positionName}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}
