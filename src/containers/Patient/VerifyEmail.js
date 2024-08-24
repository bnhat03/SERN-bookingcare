import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader'
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false, // Nhấn link trong email chưa? (Loading/Xác nhận)
            errCode: 0 // 0: Đã nhấn thành công
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookingAppointment({
                token, doctorId
            })
            if (res && res.EC === 0) { // Client nhấn vào link => Xác nhận thành công từ BE
                this.setState({
                    statusVerify: true,
                    errCode: 0
                })
            }
            else {
                this.setState({ // Đã xác nhận trước đó / BE trả về kết quả khác (Ko tồn tại link)
                    statusVerify: true,
                    errCode: res && res.EC ? res.EC : -1
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {
                        statusVerify === false
                            ?
                            <div>
                                Loading data ...
                            </div>
                            :
                            <div>
                                {
                                    +errCode === 0
                                        ? <div className='infor-booking'>Xác nhận lịch hẹn thành công!</div>
                                        : <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận trước đó!</div>
                                }
                            </div>
                    }
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
