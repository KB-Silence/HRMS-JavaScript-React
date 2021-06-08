import React from 'react'
import { Grid } from "semantic-ui-react";
import EmployerList from '../pages/EmployerList';
import JobAdvertisementList from '../pages/JobAdvertisementList';
import PositionList from '../pages/PositionList';
import UnemployedList from '../pages/UnemployedList';

export default function Section() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <UnemployedList />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <EmployerList />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <JobAdvertisementList />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <PositionList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
