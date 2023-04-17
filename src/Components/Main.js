import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            cityData: [],
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

            this.setState({ cityData: cityData.data[0], error: false });
        } catch (error) {
            this.setState({ error: true, errorMessage: error.message });
        }
    };

render() {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Explore Cities</h2>
                    <Form onSubmit={this.getCityData}>
                        <Form.Group>
                            <Form.Label>Type a City Name</Form.Label>
                            <Form.Control type="text" onChange={this.handleCityInput} />
                        </Form.Group>
                        <Button type='submit'>Explore!</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {this.state.error ? (
                        <p>{this.state.errorMessage}</p>
                    ) : (
                        <Card>
                            <Card.Body>
                                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                                <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
                                <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
}

export default Main;