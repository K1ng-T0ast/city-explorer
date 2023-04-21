import React from 'react';
import axios from 'axios';
import CityForm from './Form';
import CityAlert from './Alert';
import CityCard from './Card';
import CityWeather from './Weather';
import CityMovies from './Movie';
import CityPhoto from './Photo';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            cityData: [],
            lat: null,
            lon: null,
            mapUrl: '',
            error: false,
            errorMessage: '',
            forecasts: [],
            showWeather: false,
            movies: [],
            showMovie: false,
            photos: [],
            showPhoto: false
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
            let lat = cityData.data[0].lat;
            let lon = cityData.data[0].lon;

            this.setState({ cityData: cityData.data[0], lat, lon, error: false });

            let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${lat},${lon}&zoom=12&size=600x400&format=png`

            this.setState({ mapUrl: mapUrl })

            this.getWeatherData(lat, lon);
            this.getMovieData();
            this.getPhotoData();


        } catch (error) {
            this.setState({ error: true, errorMessage: error.message });
        }
    };

    getWeatherData = async (lat, lon) => {
        let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.city}`;

        let weatherData = await axios.get(weatherUrl);
        console.log('Raw weather data:', weatherData);


        this.setState({ forecasts: weatherData.data, showWeather: true, error: false });
        console.log("Forecasts state updated:", this.state.forecasts);


    };

    getMovieData = async () => {
        let movieUrl = `${process.env.REACT_APP_SERVER}/movies?city=${this.state.city}`;

        let movieData = await axios.get(movieUrl);

        this.setState({ movies: movieData.data, showMovie: true, error: false });

    };

    getPhotoData = async () => {
        let photoUrl = `${process.env.REACT_APP_SERVER}/photos?city=${this.state.city}`;

        let photoData = await axios.get(photoUrl);

        this.setState({ photos: photoData.data, showPhoto: true, error: false });
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
                <h3>City Name & Latitude/Longitude</h3>
                <Row>
                    <Col>
                        {this.state.error ? (
                            <CityAlert errorMessage={this.state.errorMessage} />
                        ) : (
                            <CityCard cityData={this.state.cityData} />
                        )}
                    </Col>
                </Row>
                <h3>Map of the city</h3>
                <Row>
                    <Col className='city-map'>
                        {this.state.mapUrl && (
                            <Image src={this.state.mapUrl} alt='Map of the city' className='image-border' />
                        )}
                    </Col>
                </Row>
                {this.state.showWeather && (
                    <Row>
                        <Col>
                            {console.log('Forecasts in Main:', this.state.forecasts)}
                            <CityWeather forecasts={this.state.forecasts} />
                        </Col>
                    </Row>
                )}
                {this.state.movies.length > 0 && (
                    <Row>
                        <Col>
                            <CityMovies movies={this.state.movies} />
                        </Col>
                    </Row>
                )}
                {this.state.photos.length > 0 && (
                    <Row>
                        <Col>
                            <Carousel>
                                {this.state.photos.map((photo, index) => (
                                    <CityPhoto
                                        key={index}
                                        pic={{
                                            src: photo.src,
                                            alt: photo.alt,
                                            username: photo.username,
                                        }}
                                    />
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                )}
            </Container>
        )
    }
}

export default Main;