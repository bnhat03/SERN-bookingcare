import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';

import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById, getAllCodesService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });
            if (res && res.EC === 0) {
                let data = res.DT;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailSpecialty: res.DT,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            console.log('>>> check detail specialty', res.DT);
            let resProvince = await getAllCodesService('PROVINCE');
            if (res && res.EC === 0 && resProvince && resProvince.EC === 0) {
                let data = res.DT;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.DT;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({ // Thêm đầu Array
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.DT,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []

                })
            }
        }
    }


    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />
                    <div className='detail-specialty-body'>
                        <div className='description-specialty'>
                            {
                                dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>

                                </div>
                            }
                        </div>

                        <div className='search-sp-doctor'>
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {
                                    listProvince && listProvince.length > 0
                                    &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {
                            (arrDoctorId && arrDoctorId.length > 0)
                            &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor'
                                        key={index}
                                    // onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div className='dt-content-left'>
                                            <div className='profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={true}
                                                />
                                            </div>
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule doctorIdFromParent={item} />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor doctorIdFromParent={item} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
