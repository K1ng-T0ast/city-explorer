import React from 'react';
import axios from 'axios';
import CityForm from './Form';
import CityAlert from './Alert';
import CityCard from './Card';
import { Container, Row, Col, Image } from 'react-bootstrap';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            cityData: [],
            mapUrl: '',
            error: false,
            errorMessage: ''
        }
    }

    handleCityInput = (event) => {
        this.setState({
            city: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let url = `${process.env.REACT_APP_SERVER}/` //weather?city=${this.state.city}`;

            let data = await axios.get(url);

        } catch (error) {
            
        }
    }

    getCityData = async (event) => {
        event.preventDefault();
        try {
            let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`

            let cityData = await axios.get(url);

            let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12&size=600x400&format=png`

            this.setState({ cityData: cityData.data[0], mapUrl: mapUrl, error: false });
        } catch (error) {
            this.setState({ error: true, errorMessage: error.message });
        }
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className='city-header'>Travel Around The Globe From Home</h2>
                        <CityForm onFormSubmit={this.getCityData} onCityInputChange={this.handleCityInput} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.error ? (
                            <CityAlert errorMessage={this.state.errorMessage} />
                        ) : (
                            <CityCard cityData={this.state.cityData} />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className='city-map'>
                        {this.state.mapUrl && (
                            <Image src={this.state.mapUrl} alt='Map of the city' />
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Main;