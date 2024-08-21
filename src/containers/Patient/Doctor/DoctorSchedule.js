import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi'; // Date => Mặc định là vietnam

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [], // 7 ngày trong Select 
            allAvailableTime: [], // List các object KTG của bác sĩ trong ngày đó
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrDays = (language) => { // Thay đổi option của select => Hiện VN/EN
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                // Viết hoa chữ cái đầu của thứ
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                obj.label = this.capitalizeFirstLetter(labelVi);
            }
            else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM'); // Mặc định là vn -> Phải chuyển sang en bằng .locale()
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(obj);
        }
        this.setState({
            allDays: arrDays
        })
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.EC === 0) {
                this.setState({
                    allAvailableTime: res.DT ? res.DT : []
                })
            }
        }
    };

    async componentDidMount() {
        let { language } = this.props;
        this.setArrDays(language);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays(this.props.language);
        }
    }


    render() {
        let { language } = this.props;
        let { allDays, allAvailableTime } = this.state;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        {/* Các KTG có sẵn trong ngày của Doctor */}
                        <div className='all-available-time'>
                            <div className='text-calendar'>
                                <i className='fas fa-calendar-alt'>
                                    <span>Lịch khám</span>
                                </i>
                            </div>
                            <div className='time-content'>
                                {
                                    (allAvailableTime && allAvailableTime.length > 0)
                                        ? // Hiển thị list button KTG Vi/En
                                        allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button key={index}>{timeDisplay}</button>
                                            )
                                        })
                                        :  // KTG ngày ni của bác sĩ ko có trong DB
                                        <div>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>

                                }
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
