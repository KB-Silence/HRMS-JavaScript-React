import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HandleActiveMenuItem from '../utils/HandleActiveMenuItem'
import EmployerService from '../services/EmployerService'
import { Button, Card, Grid, Image, Icon, Table } from 'semantic-ui-react'
import JobAdvertisementService from '../services/JobAdvertisementService'

export default function EmployerProfile() {

    HandleActiveMenuItem()
    const { employerId } = useParams()

    const [employer, setEmployer] = useState([])
    const [jobAdvertisement, setJobAdvertisement] = useState([])

    useEffect(() => {
        let employerService = new EmployerService()
        let jobAdvertisementService = new JobAdvertisementService()
        employerService.getByUserId(employerId).then((result) => setEmployer(result.data.data))
        console.log(employer)
        jobAdvertisementService.get
    }, [employerId])

    return (
        <div className="pages">
            <Grid stackable padded verticalAlign="middle"
                style={{ paddingLeft: "5em", paddingRight: "5em" }}>
                <Grid.Row>
                    <Grid.Column
                        mobile="16" tablet="8" computer="4">
                        <Card fluid>
                            <Image
                                style={{ minHeight: "350px", marginBottom: "1em" }}
                                src={"https://www.incimages.com/uploaded_files/image/1920x1080/GettyImages-475636790_165141.jpg"} />
                            <Card.Header
                                content={employer.companyName} />
                            <Card.Meta
                                content={employer.email} />
                            <Card.Meta >
                                {employer.phoneNumber}
                            </Card.Meta>
                            <Card.Meta extra>
                                {employer.webSite}
                            </Card.Meta>
                            <Card.Content>
                                <Button
                                    style={{ letterSpacing: "1px" }}
                                    color="google plus"
                                    content="Update Information"
                                    fluid compact circular />
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column
                        mobile="16" tablet="8" computer="12">
                        <Card fluid color={"black"}>
                            <Card.Content header="Bu Şirkete Ait İş İlanları" />
                            <Card.Content>
                                <Table color={"black"}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                                            <Table.HeaderCell>Şehir</Table.HeaderCell>
                                            <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
                                            <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                            <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                            <Table.HeaderCell>Detaylar</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {/* burası maplenecek */}
                                        <Table.Row>
                                            <Table.Cell>position</Table.Cell>
                                            <Table.Cell>cities</Table.Cell>
                                            <Table.Cell>quoat</Table.Cell>
                                            <Table.Cell>employment type</Table.Cell>
                                            <Table.Cell>employment time</Table.Cell>
                                            <Table.Cell>

                                                {/* İş ilanı detaylarına gidecek buton */}
                                                <Button animated>
                                                    <Button.Content visible>Detayları Gör</Button.Content>
                                                    <Button.Content hidden>
                                                        <Icon name="arrow right" />
                                                    </Button.Content>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name="list" />
                                {/* {jobAds?.length} Adet İş ilanı mevcut */}
                                İş ilanı sayacı.
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
