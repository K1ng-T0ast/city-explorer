import React from "react";
import { Carousel } from 'react-bootstrap';

class CityPhoto extends React.Component {
    render() {
        const { ...rest } = this.props;
        return (
            <div>
            <Carousel.Item {...rest}>
                <img
                    className='d-block w-100 rounded-img'
                    src={this.props.pic.src}
                    alt={this.props.pic.alt}
                />
                <Carousel.Caption>
                    <h3 style={{ backgroundColor: '#5085A5', borderRadius: '5px', width: 'max-content', margin: 'auto', marginTop: '5em', padding: '5px' }}>Photographer: {this.props.pic.username}</h3>
                </Carousel.Caption>
            </Carousel.Item>
            </div>
        )
    }
}

export default CityPhoto;
