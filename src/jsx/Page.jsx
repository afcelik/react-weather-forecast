import React, { useEffect, useState, } from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTint, faSun, faSearch } from '@fortawesome/free-solid-svg-icons';
import clearSkyImage from '../img/clear-sky.png'

function Page() {

    const province = [
        "Adana",
        "Adıyaman",
        "Afyonkarahisar",
        "Ağrı",
        "Amasya",
        "Ankara",
        "Antalya",
        "Artvin",
        "Aydın",
        "Balıkesir",
        "Bilecik",
        "Bingöl",
        "Bitlis",
        "Bolu",
        "Burdur",
        "Bursa",
        "Çanakkale",
        "Çankırı",
        "Çorum",
        "Denizli",
        "Diyarbakır",
        "Edirne",
        "Elazığ",
        "Erzincan",
        "Erzurum",
        "Eskişehir",
        "Gaziantep",
        "Giresun",
        "Gümüşhane",
        "Hakkâri",
        "Hatay",
        "Isparta",
        "Mersin",
        "İstanbul",
        "İzmir",
        "Kars",
        "Kastamonu",
        "Kayseri",
        "Kırklareli",
        "Kırşehir",
        "Kocaeli",
        "Konya",
        "Kütahya",
        "Malatya",
        "Manisa",
        "Kahramanmaraş",
        "Mardin",
        "Muğla",
        "Muş",
        "Nevşehir",
        "Niğde",
        "Ordu",
        "Rize",
        "Sakarya",
        "Samsun",
        "Siirt",
        "Sinop",
        "Sivas",
        "Tekirdağ",
        "Tokat",
        "Trabzon",
        "Tunceli",
        "Şanlıurfa",
        "Uşak",
        "Van",
        "Yozgat",
        "Zonguldak",
        "Aksaray",
        "Bayburt",
        "Karaman",
        "Kırıkkale",
        "Batman",
        "Şırnak",
        "Bartın",
        "Ardahan",
        "Iğdır",
        "Yalova",
        "Karabük",
        "Kilis",
        "Osmaniye",
        "Düzce"
    ];


    const [cities, setCities] = useState([...province])

    const [town, setTown] = useState("");
    const [time, setTime] = useState(null);
    const [heat, setHeat] = useState("");
    const [weatherDescription, setWeatherDescription] = useState("")
    const [windSpeed, setWindSpeed] = useState("")
    const [humidity, setHumidity] = useState("")
    const [imageUrl, setImageUrl] = useState("")


    useEffect(() => {
        getWeather();
    }, []);

    const getWeather = (city) => {
        if (city == null) {
            city = "İstanbul";
        }
        axios.get("https://api.weatherbit.io/v2.0/current?city="+ city +"&country=TR&key=00dd9b92e7594ce6a0c4c493a198a9c6").then(res => {
                let cityName = res.data.data[0].city_name;
                let time = res.data.data[0].datetime.toString();
                let clock = time.slice(-5);
                let heat = res.data.data[0].app_temp;
                let weatherDescription = res.data.data[0].weather.description;
                let windSpeed = (res.data.data[0].wind_spd)*10;
                let humidity = res.data.data[0].rh;
                setHeat(heat);
                setTown(cityName);
                setTime(clock);
                setWeatherDescription(weatherDescription);
                setWindSpeed(windSpeed);
                setHumidity(humidity);
                switch (weatherDescription) {
                    case "Clear sky":
                        setImageUrl(clearSkyImage);
                        break;
                
                    default:
                        break;
                }
            })
            .catch((err) => {
                console.error("Veri getirilemedi", err);
            })
    }

    const search = (value) => {
        let filteredCities = province.filter(x => x.toLowerCase().includes(value.toLowerCase()));
        setCities([...filteredCities])
    }


    return (
        <>
            <Container className='mt-5'>
                <Row>
                    <h1 className='text-center'>Weather Forecast</h1>
                </Row>
                <Row className='justify-content-center mt-5'>
                    <Col sm={5}>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 rounded-pill"
                                aria-label="Search"
                                onChange={(e) => search(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faSearch} size='lg' className='mt-2 mx-2' />
                        </Form>

                    </Col>
                </Row>
            </Container>
            <Container className='mt-5'>
                <Row>
                    <Col className='col-md-3 text-center'>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>Cities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cities && cities.map(item => {
                                        return (
                                            <tr onClick={() => getWeather(item)}>
                                                <td><a href="#" style={{ textDecoration: 'none', color: 'black' }}>{item}</a></td>
                                            </tr>
                                        );

                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col className='col-md-9'>
                        <Container className="py-5 h-100" style={{ position: 'fixed' }}>
                            <Row className="d-flex justify-content-center align-items-start h-100">
                                <Col md={8} lg={6} xl={4}>
                                    <div className="card" style={{ color: '#4B515D', borderRadius: '35px', position: 'sticky' }}>
                                        <div className="card-body p-4">
                                            <div className="d-flex">
                                                <h6 className="flex-grow-1">{town}</h6>
                                                <h6>{time}</h6>
                                            </div>
                                            <div className="d-flex flex-column text-center mt-5 mb-4">
                                                <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}> {heat}°C </h6>
                                                <span className="small" style={{ color: '#868B94' }}>{weatherDescription}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                                    <div><FontAwesomeIcon icon={faWind} style={{ color: '#868B94' }} /> <span className="ms-1"> {windSpeed} km/h </span></div>
                                                    <div><FontAwesomeIcon icon={faTint} style={{ color: '#868B94' }} /> <span className="ms-1"> {humidity}% </span></div>
                                                </div>
                                                <div>
                                                    <Image src={imageUrl} fluid width="100px" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Page