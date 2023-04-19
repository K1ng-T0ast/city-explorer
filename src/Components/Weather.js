import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

class CityWeather extends React.Component {
    render() {
        const forecasts = this.props.forecasts.map((forecast, index) => (
            <Card key={index}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                        {forecast.date}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>{forecast.description}</Card.Body>
                </Accordion.Collapse>
            </Card>
        ));

        return (
            <div>
                <h2>Weather Forecast</h2>
                <Accordion>{forecasts}</Accordion>
            </div>
        );
    }
}

export default CityWeather;
