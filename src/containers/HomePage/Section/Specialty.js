import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <Slider {...settings}>
                        <div className='img-customize'>
                            <h2>1</h2>
                        </div>
                        <div className='img-customize'>
                            <h2>2</h2>
                        </div>
                        <div className='img-customize'>
                            <h2>3</h2>
                        </div>
                        <div className='img-customize'>
                            <h2>4</h2>
                        </div>
                        <div className='img-customize'>
                            <h2>5</h2>
                        </div>
                        <div className='img-customize'>
                            <h2>6</h2>
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
