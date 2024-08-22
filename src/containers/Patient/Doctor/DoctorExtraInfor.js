import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format' // Format integer => VND

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {} // Doctor_Infor
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.EC === 0) {
                this.setState({
                    extraInfor: res.DT
                })
            }
        }
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'><FormattedMessage id='patient.extra-infor-doctor.text-address' /></div>
                        <div className='name-clinic'>
                            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                        </div>
                        <div className='detail-address'>
                            {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                        </div>
                    </div>
                    <div className='content-down'>
                        {
                            isShowDetailInfor === false
                                ?
                                <>
                                    <div className='short-infor'>
                                        <FormattedMessage id='patient.extra-infor-doctor.price' />
                                        { // Giá khám => VN
                                            extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueVi}
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                suffix={" VNĐ"}
                                            />
                                        }
                                        { // Giá khám => EN
                                            extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumericFormat
                                                className='currency'
                                                value={extraInfor.priceTypeData.valueEn}
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                suffix={" $"}
                                            />
                                        }
                                        <span onClick={() => this.showHideDetailInfor(true)} className='detail'>
                                            <FormattedMessage id='patient.extra-infor-doctor.detail' />
                                        </span>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='detail-infor'>
                                        <div className='price'>
                                            <span className='left'>
                                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                                            </span>
                                            <span className='right'>
                                                { // Giá khám => VN
                                                    extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                                    <NumericFormat
                                                        className='currency'
                                                        value={extraInfor.priceTypeData.valueVi}
                                                        thousandSeparator={true}
                                                        displayType={'text'}
                                                        suffix={" VNĐ"}
                                                    />
                                                }
                                                { // Giá khám => EN
                                                    extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                                    <NumericFormat
                                                        className='currency'
                                                        value={extraInfor.priceTypeData.valueEn}
                                                        thousandSeparator={true}
                                                        displayType={'text'}
                                                        suffix={" $"}
                                                    />
                                                }
                                            </span>
                                        </div>
                                        <div className='note'>
                                            {
                                                extraInfor && extraInfor.note ? extraInfor.note : ''
                                            }
                                        </div>
                                    </div>
                                    <div className='payment'>
                                        <FormattedMessage id='patient.extra-infor-doctor.payment' />
                                        {
                                            extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                                ? extraInfor.paymentTypeData.valueVi
                                                : ''
                                        }
                                        {
                                            extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                                ? extraInfor.paymentTypeData.valueEn
                                                : ''
                                        }
                                    </div>
                                    <div className='hide-price'>
                                        <span onClick={() => this.showHideDetailInfor(false)}>
                                            <FormattedMessage id='patient.extra-infor-doctor.hide-price' />
                                        </span>
                                    </div>
                                </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
