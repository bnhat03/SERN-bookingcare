import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ProfileDoctor.scss'
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import { NumericFormat } from 'react-number-format';

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
        console.log(">>> check: hehe")
        return result;
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        console.log(">>> check: data", this.props.data);
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
        let { language } = this.props;
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
                                    dataProfile && dataProfile.Markdown
                                    && dataProfile.Markdown.description
                                    &&
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='price'>
                        Giá khám:
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
