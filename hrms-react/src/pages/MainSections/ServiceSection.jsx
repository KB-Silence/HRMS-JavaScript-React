import React from 'react'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'

export default function ServiceSection() {
    return (
        <div id="services" className="section serviceSection">
            <Container className="serviceContainer">
                <Grid stackable textAlign='center'>
                    <Grid.Row className="serviceMainGridRow">
                        <Grid.Column mobile='16' tablet='12' computer='11' largeScreen="13" >
                            <Header className="serviceHeader" dividing as='h2'>HRMS Nedir?</Header>
                            <Header.Content className='serviceMainContent'>“HRMS“ İnsan Kaynakları Yönetim Sistemi anlamına gelir. Kuruluşların şirket içi İK faaliyetlerini yönetmek için kullandıkları bir yazılım ürün setini ifade eder. İK Yönetim Sistemi yazılımı, İK uzmanlarının çalışan verilerinin yönetiminden bordro, işe alım, yan haklar, eğitim, yetenek yönetimi, çalışan etkileşimi ve çalışan katılımına kadar modern iş gücünü yönetmesine yardımcı olur. İnsan kaynakları bilgi sistemi (HRIS) olarak da adlandırılan İK Yönetim Sistemi sistemleri, bir şirketin en değerli varlıkları hakkındaki bilgileri, bu bilgilere ihtiyacı olan kişilerin önüne getirir.
                            </Header.Content>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ marginTop: "15px" }}>
                        <Grid.Column>
                            <Grid verticalAlign="middle" columns="2" stackable divided container>
                                <Grid.Row className="serviceGridColumn" >
                                    <Grid.Column mobile="8" tablet="4" computer="2" largeScreen="3">
                                        <Icon className="serviceGridIcon" circular color="blue" inverted name="street view" />
                                    </Grid.Column>
                                    <Grid.Column mobile="8" tablet="12" computer="14" largeScreen="13">
                                        <Header.Content className='serviceSubContent'> Firman için iş ilanları verebilirsin. Kriterlerini belirle ve aradığın nitelikle insanları işe al. </Header.Content>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className="serviceGridColumn" >
                                    <Grid.Column mobile="8" tablet="4" computer="2" largeScreen="3">
                                        <Icon className="serviceGridIcon" circular color="blue" inverted name="building outline" />
                                    </Grid.Column>
                                    <Grid.Column mobile="8" tablet="12" computer="14" largeScreen="13">
                                        <Header.Content className='serviceSubContent'> İş ilanlarına ve detaylarına göz atabilirsin. Bir CV oluşturabilir ve istediğin işe başvurabilirsin. Hayalindeki işte mutlu ve huzurlu bir şekilde çalışabilirsin. </Header.Content>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row className="serviceGridColumn" >
                                    <Grid.Column mobile="8" tablet="4" computer="2" largeScreen="3">
                                        <Icon className="serviceGridIcon" circular color="blue" inverted name="code branch" />
                                    </Grid.Column>
                                    <Grid.Column mobile="8" tablet="12" computer="14" largeScreen="13">
                                        <Header.Content className='serviceSubContent'> Gönüllü olarak sistemimizin bir personeli olabilirsin. Projeyi geliştirmemizde bize yardım ederek daha fazla insana ulaşmamızı sağlayabilirsin. </Header.Content>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    )
}
