import React from 'react';
import WeatherDay from './WeatherDay';

class CityWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { forecasts } = this.props;
        return (
            <div>
                <h3>7 Day Forecast</h3>
                {forecasts.map((forecast, index) => (
                    <WeatherDay
                        key={index}
                        index={index}
                        forecast={forecast}
                        toggleDetails={() =>
                            this.setState((prevState) => ({
                                [index]: !prevState[index],
                            }))
                        }
                        showDetails={this.state[index]}
                    />
                ))}
            </div>
        );
    }
}

export default CityWeather;
