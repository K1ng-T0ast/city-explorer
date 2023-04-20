import React from 'react';
import { Card, Button } from 'react-bootstrap'


class WeatherDay extends React.Component {
    render() {
        const { forecast, index, toggleDetails, showDetails } = this.props;
        return (
            <>
                <Card key={index} style={{ marginBottom: '1rem' }}>
                    <Card.Header className='card-header'>
                        {forecast.date}
                        <Button
                            variant='link'
                            onClick={toggleDetails}
                            style={{ textDecoration: 'none', color: '#F7F9FB' }}
                        >
                            Show Weather Forecast
                        </Button>
                    </Card.Header>
                    {showDetails && (
                        <Card.Body>
                            <Card.Text>
                                Description: {forecast.description}
                            </Card.Text>
                            <Card.Text>
                                High Temperature: {forecast.maxTemp} °F
                            </Card.Text>
                            <Card.Text>
                                Low Temperature: {forecast.minTemp} °F
                            </Card.Text>
                        </Card.Body>
                    )}
                </Card>
            </>
        )
    }
}

export default WeatherDay;