import React, { useEffect } from 'react'
import { useState } from 'react'
import LanguageService from '../../services/LanguageService'
import { Accordion, Button, Dropdown, Form, Grid, Table } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Formik } from 'formik';

export default function UpdateLanguage({ unemployedId, handleSubModalClick, activeSubModal, updateCv }) {

    const [isUpdate, setIsUpdate] = useState(false)
    const [languages, setLanguages] = useState([])
    const [languageId, setLanguageId] = useState([])
    const [languageName, setLanguageName] = useState([])
    const [languageLevel, setLanguageLevel] = useState([])

    let languageService = new LanguageService()

    const levels = [1, 2, 3, 4, 5]
    const levelOption = levels.map((level) => ({
        key: level,
        text: level,
        value: level
    }))

    const languagesList = ["'Are'are dili", "Abazaca", "Abhazca", "Acarca", "Açece", "Açice", "Adigece", "Afrikaans", "Ahtnaca", "Eynuca", "Aivilik İnuitçesi", "Akanca", "Akatekçe", "Alabamaca", "Algonkince", "Almanca", "Altayca", "Amharca", "Anişininice", "Apsalokece", "Aragonca", "Aramice", "Aranca", "Arapahoca", "Arapça", "Arbereşçe", "Arikaraca", "Arnavutça", "Arviligjuaq İnuitçesi", "Asturyasça", "Aşağı Tananaca", "Atikamekçe", "Atsinaca", "Auvergnat dili", "Avakatekçe", "Avarca", "Aymara dili", "Aynu dili", "Azerice", "Baskça", "Bataklık Kricesi", "Batı Apaçicesi", "Batı Kanada İnuitçesi", "Bengalce", "Bretonca", "Beyaz Rusça", "Boşnakça", "Bulgarca", "Burgonyaca", "Buryatça", "Cavaca", "Champenois", "Çalçitekçe", "Çeçence", "Çekçe", "Çerokice", "Çilkotince", "Çince", "Çingenece", "Çortice", "Çuhça", "Çukçice", "Çupikçe", "Çulımca", "Çuvaşça", "Dakotaca", "Dakelce", "Danca", "Danezaca", "Dargince", "Dauphinois", "Değinakça", "Denağinaca", "Denesulinece", "Denetaca", "Doğu Kanada İnuitçesi", "Donşianca", "Dzongka", "Endonezyaca", "Ermenice", "Eski İngilizce", "Eski Nors dili", "Estonca", "Evenki dili", "Eyakça", "Farsça", "Faroe dili", "Felemenkçe", "Filipince", "Frizce", "Fince", "Fransızca", "Gagavuzca", "Galce", "Galiçyaca", "Gaskonca", "Gilanice", "Goranice", "Grönlandca", "Guaranice", "Guçince", "Güney Pikence", "Güney Tuçoncası", "Gürcüce", "Hakaltekçe", "Hakasça", "Hakka", "Halaçça", "Halkomelemce", "Hanca (Atabask)", "Hantıca", "Hausa", "Haydaca", "Hereroca", "Hırvatça", "Hidatsaca", "Hikarilaca", "Hintçe", "Hoçankça", "Holikaçukça", "Hupaca", "İbranice", "İngilizce", "İrlandaca", "İnguşça", "İnnuca", "İnuinnaq İnuitçesi", "İnyupikçe", "İskoç dili", "İspanyolca", "İsveççe", "İşilce", "İtalyanca", "İtzaca", "İzlandaca", "Japonca", "Kabardeyce", "Kakçikelce", "Kalabriyaca", "Kalmıkça", "Kangiryuarmiut İnuitçesi", "Kanhobalca", "Kannada dili", "Kantonca", "Kanuri dili", "Karaayakça", "Karakalpakça", "Karankavaca", "Kaskaca", "Kaşgayca", "Katalanca", "Kazakça", "Kazan Tatarcası", "Keçuva dili", "Kekçice", "Kernevekçe", "Khmerce", "Kırgızca", "Kırım Tatarcası", "Kırımçakça", "Kiçece", "Kivalliq İnuitçesi", "Komoksça", "Komorca", "Kongoca", "Korece", "Korsikaca", "Koryakça", "Koyukonca", "Krice", "Krikçe", "Kuzey Tuçoncası", "Kürtçe", "Kwalhioqua–Tlatskanai dili", "Ladino", "Lakça", "Lakotaca", "Latince", "Laponca", "Lazca", "Lehçe", "Letonyaca", "Leonca", "Lezgice", "Limburgca", "Limousin dili", "Lipanca", "Litvanyaca", "Lombardça", "Lorrain dili", "Lorraine Frankçası", "Lüksemburgça", "Macarca", "Malay dili", "Maltaca", "Makedonca", "Mamca", "Manca", "Mançuca", "Mandanca", "Mandarin", "Mansice", "Maorice", "Mapudungun", "Marathi", "Mari dili", "Mayaca", "Megrelce", "Meskalero-Çirikavaca", "Meskvakice", "Mikasukice", "Miranda dili", "Moğolca", "Moldovca", "Mopanca", "Nadoten-Vetsuvetence", "Nakodaca", "Nakotaca", "Napolice", "Naskapice", "Natsilik İnuitçesi", "Nattilik İnuitçesi", "Naukan Yupikçesi", "Navahoca", "Nikolaca", "Nissart dili", "Nlakapamukça", "Normanca", "Norveççe", "Nuhalkça", "Nunatsiavut İnuitçesi", "Nunavik İnuitçesi", "Nunivak Çupikçesi", "Oksitanca", "Orman Kricesi", "Osetçe", "Ova Apaçicesi", "Ova Kricesi", "Özbekçe", "Pali dili", "Papiamento", "Pavnice", "Peçenekçe", "Pencapça", "Peştuca", "Pikartça", "Pirahã dili", "Pokomamca", "Pokomçice", "Portekizce", "Potavatomice", "Provensal", "Qikiqtaaluk İnuitçesi", "Romanşça", "Rumence", "Rusça", "Saho", "Sahtuca", "Sakapultekçe", "Salarca", "Sanskritçe", "Sekanice", "Sırpça", "Sibirya Yupikçesi", "Sicilyaca", "Siglit İnuitçesi", "Sipakapaca", "Sirenik Yupikçesi", "Siyuca", "Slovakça", "Slovence", "Sorb dili", "Sorani", "Supikçe", "Svahili", "Svanca", "Süryanice", "Sivandi", "Şavnice", "Şayence", "Şorca", "Tacikçe", "Tagalogca", "Tagişçe", "Tahltanca", "Tamilce", "Tanakrosça", "Tatarca", "Tatça", "Tayca", "Tayvanca", "Tektitekçe", "Telugu", "Tibetçe", "Tlınçonca", "Tlingitçe", "Tsetsautça", "Tsutinaca", "Tswana", "Tupi", "Tuvaca", "Türkçe", "Türkmence", "Tzutuhilce", "Udmurtça", "Ukrayna dili", "Ulahça", "Urduc", "Uspantekçe", "Utkuhiksalik İnuitçesi", "Uygurca", "Valensiyaca", "Vapoca", "Venedikç", "Vietnamca", "Yakutça", "Yidiş", "Batı Yugurca", "Yukarı Kuskokvimce", "Yukarı Tananaca", "Yukatek Mayacası", "Yukice", "Yunanca", "Yupikçe", "Zazaca", "Zhuangca", "Zuluc", "Zunice"]

    const languageOption = languagesList.map((language) => ({
        key: language,
        text: language,
        value: language
    }))

    useEffect(() => {
        languageService.getByUnemployedId(unemployedId).then((result) => {
            setLanguages(result.data.data)
        })
    }, [unemployedId])

    const initialValues = {
        languageName: "",
        languageLevel: ""
    }

    const onSubmit = (values) => {
        values.unemployedId = unemployedId
        languageService.addLanguage(values).then((result) => {
            toast.success(result.data.message)
            languageService.getByUnemployedId(unemployedId).then((result) => setLanguages(result.data.data))
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    const langValues = {
        languageName: languageName,
        languageLevel: languageLevel
    }

    function updateLanguage() {
        languageService.updateLanguage(langValues, languageId).then((result) => {
            toast.success(result.data.message)
            languageService.getByUnemployedId(unemployedId).then((result) => setLanguages(result.data.data))
            updateCv()
            setIsUpdate(false)
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    function deleteLanguage() {
        languageService.deleteLanguage(languageId).then((result) => {
            toast.success(result.data.message)
            languageService.getByUnemployedId(unemployedId).then((result) => setLanguages(result.data.data))
            updateCv()
        }).catch((result) => {
            toast(result.response.data.message)
        })
    }

    return (
        <Accordion>
            <Accordion.Title
                style={{ fontSize: "15px", letterSpacing: "1px" }}
                icon={false}
                content="Dil Bilgisi Ekle"
                name="addLanguage"
                active={activeSubModal === "addLanguage"}
                onClick={handleSubModalClick} />
            <Accordion.Content
                active={activeSubModal === "addLanguage"}>
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    {({ values, handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid stackable padded centered>
                                <Grid.Row textAlign="center">
                                    <Grid.Column width="10">
                                        <Dropdown fluid
                                            placeholder="Dil Adı"
                                            clearable selection
                                            onChange={(e, data) => setFieldValue("languageName", data.value)}
                                            value={values.languageName}
                                            options={languageOption} />
                                    </Grid.Column>
                                    <Grid.Column width="6">
                                        <Dropdown fluid
                                            placeholder="Dil Seviyesi"
                                            clearable selection
                                            onChange={(e, data) => setFieldValue("languageLevel", data.value)}
                                            value={values.languageLevel}
                                            options={levelOption} />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column textAlign="center" width="7">
                                        <Button
                                            circular fluid
                                            style={{ letterSpacing: "2px" }}
                                            type="submit"
                                            color="google plus"
                                            content="Ekle" />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Accordion.Content>
            <Accordion.Title
                style={{ fontSize: "15px", letterSpacing: "1px" }}
                icon={false}
                content="Dil Bilgisi Güncelle"
                name="updateLanguage"
                active={activeSubModal === "updateLanguage"}
                onClick={handleSubModalClick} />
            <Accordion.Content
                style={{ paddingLeft: "4em", paddingRight: "4em" }}
                active={activeSubModal === "updateLanguage"}>
                <Grid stackable padded >
                    <Grid.Row textAlign="center" verticalAlign="middle">
                        <Table className="unemployedTable">
                            {isUpdate ?
                                <Table.Row textAlign="center">
                                    <Table.HeaderCell content="Dil Adı" />
                                    <Table.HeaderCell content="Dil Seviyesi" />
                                    <Table.HeaderCell />
                                </Table.Row> :
                                <Table.Row textAlign="center">
                                    <Table.HeaderCell content="Güncelle" />
                                    <Table.HeaderCell content="Dil Adı" />
                                    <Table.HeaderCell content="Dil Seviyesi" />
                                    <Table.HeaderCell content="Sil" />
                                </Table.Row>}
                            <Table.Body>
                                {isUpdate ?
                                    <Table.Row textAlign="center">
                                        <Table.Cell width="7">
                                            <Dropdown fluid
                                                placeholder="Dil Adı"
                                                clearable selection
                                                onChange={(e, data) => setLanguageName(data.value)}
                                                options={languageOption} />
                                        </Table.Cell>
                                        <Table.Cell width="4">
                                            <Dropdown fluid
                                                placeholder="Dil Seviyesi"
                                                clearable selection
                                                onChange={(e, data) => setLanguageLevel(data.value)}
                                                options={levelOption} />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                style={{ letterSpacing: "2px" }}
                                                compact circular
                                                content="Güncelle"
                                                color="green" type="button"
                                                onClick={() => updateLanguage()} />
                                            <Button
                                                style={{ letterSpacing: "2px" }}
                                                compact circular
                                                content="Vazgeç"
                                                color="youtube" type="button"
                                                onClick={() => setIsUpdate(false)} />
                                        </Table.Cell>
                                    </Table.Row> :
                                    languages.map(language => (
                                        <Table.Row textAlign="center" key={language.languageId}>
                                            <Table.Cell width="2">
                                                <Button
                                                    style={{ letterSpacing: "2px" }}
                                                    fluid compact circular
                                                    content="Güncelle"
                                                    color="green" type="button"
                                                    onClick={() => {
                                                        setLanguageId(language.languageId)
                                                        setIsUpdate(true)
                                                    }} />
                                            </Table.Cell>
                                            <Table.Cell width="6"
                                                content={language.languageName} />
                                            <Table.Cell>
                                                {language.languageLevel}
                                            </Table.Cell>
                                            <Table.Cell >
                                                <Button
                                                    circular compact negative
                                                    icon="x" type="button"
                                                    onClick={() => deleteLanguage()} />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </Accordion.Content>
        </Accordion>
    )
}