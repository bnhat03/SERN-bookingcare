import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import { NumericFormat } from 'react-number-format';
import _ from 'lodash'
import moment from 'moment';


class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.EC === 0) {
                result = res.DT;
            }
        }
        return result;
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props.language;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI
                ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') // unix timestamp => date (Thứ + ngày/tháng/năm)
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.priceBooking' /></div>
                </>
            )
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.doctorId !== this.props.doctorId) {
            // let data = await this.getInforDoctor(this.props.doctorId);
            // this.setState({
            //     dataProfile: data
            // })
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        // isShowDescriptionDoctor: Chọn hiển thị thông tin chi tiết Doctor hoặc TG booking
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`
                            }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {
                                    isShowDescriptionDoctor === true
                                        ?
                                        <>
                                            {/* Thông tin chi tiết bác sĩ */}
                                            {
                                                dataProfile && dataProfile.Markdown
                                                && dataProfile.Markdown.description
                                                &&
                                                <span>
                                                    {dataProfile.Markdown.description}
                                                </span>
                                            }
                                        </>
                                        :
                                        <>
                                            {/* Hoặc KTG + ngày đặt lịch */}
                                            {this.renderTimeBooking(dataTime)}
                                        </>

                                }

                            </div>
                        </div>

                    </div>
                    <div className='price'>
                        <FormattedMessage id='patient.booking-modal.price' />
                        { // Giá khám => VN
                            dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI &&
                            <NumericFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                thousandSeparator={true}
                                displayType={'text'}
                                suffix={" VNĐ"}
                            />
                        }
                        { // Giá khám => EN
                            dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN &&
                            <NumericFormat
                                className='currency'
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                thousandSeparator={true}
                                displayType={'text'}
                                suffix={" $"}
                            />
                        }
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
