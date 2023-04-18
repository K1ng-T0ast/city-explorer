import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';

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
                        <Form className='city-form' onSubmit={this.getCityData}>
                            <Form.Group className='city-form-label'>
                                <Form.Label>Type a City Name</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" onChange={this.handleCityInput} />
                            </Form.Group>
                            <Form.Group>
                                <Button className='city-button' type='submit'>Explore!</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.error ? (
                            <p>{this.state.errorMessage}</p>
                        ) : (
                            <Card className='city-display'>
                                <Card.Body>
                                    <Card.Title>{this.state.cityData.display_name}</Card.Title>
                                    <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
                                    <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
                                </Card.Body>
                            </Card>
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