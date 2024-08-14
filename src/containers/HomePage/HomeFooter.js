import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'

class HomeFooter extends Component {
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2024 Biện Văn Nhật, please visit my youtube channel!
                    <a href='https://www.youtube.com/watch?v=s7BYsMkRpjM'>
                         &#8594; Click here &#8592;
                    </a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
