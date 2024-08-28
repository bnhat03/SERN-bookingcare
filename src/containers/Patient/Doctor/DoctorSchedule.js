import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi'; // Date => Mặc định là vietnam
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [], // 7 ngày trong Select => VN/EN => Mỗi ngày là một object có {label, value}
            allAvailableTime: [], // List các object KTG của bác sĩ trong ngày đó

            // Modal => props truyền xuống Modal
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},

        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrayDays = (language) => { // Thay đổi option của select => Hiện VN/EN
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) { // i = 0 => Xử lý trường hợp -> Hôm nay
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                }
                else {
                    // Viết hoa chữ cái đầu của thứ
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi);
                }

            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                }
                else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM'); // Mặc định là vn -> Phải chuyển sang en bằng .locale()
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(obj);
        }
        return allDays;
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

    // Modal
    handldeClickScheduleTime = (time) => { // Click button KTG
        console.log(">>> check dataScheduleTimeModal", time)
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false,

        })
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrayDays(language);
        this.setState({
            allDays: allDays,
        })

        // Hiển thị list btns ngay khi mở một Detail Specialty/Clinic
        if (this.props.doctorIdFromParent ) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.DT ? res.DT : []
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrayDays(this.props.language);
            this.setState({
                allDays: allDays,
            })
        }
        // Mới ấn vô => Hiển thị luôn (Select option = Hôm nay) và (list buttons KTG của hôm nay)
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {  // Nằm trong component cha => Nhận props từ component cha 
            // => Cái ni để xử lý trường hợp props ni cũng ảnh hưởng bởi  state của cha => props thay đổi theo state => re-render lại component con ni
            let allDays = this.getArrayDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value); // Lấy lại list buttons KTG 
            this.setState({
                allAvailableTime: res.DT ? res.DT : []
            })
        }
    }


    render() {
        let { language } = this.props;
        let { allDays, allAvailableTime, dataScheduleTimeModal } = this.state;

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
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.schedule" />
                                    </span>
                                </i>
                            </div>
                            <div className='time-content'>
                                {
                                    (allAvailableTime && allAvailableTime.length > 0)
                                        ? // Hiển thị list button KTG Vi/En
                                        <>
                                            <div className='time-content-btns'>
                                                {
                                                    allAvailableTime.map((item, index) => {
                                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                        return (
                                                            <button
                                                                key={index}
                                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                                onClick={() => this.handldeClickScheduleTime(item)}
                                                            >
                                                                {timeDisplay}
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className='book-free'>
                                                <span>
                                                    <FormattedMessage id="patient.detail-doctor.choose" />
                                                    <i className='far fa-hand-point-up'></i>
                                                    <FormattedMessage id="patient.detail-doctor.book-free" />
                                                </span>
                                            </div>
                                        </>
                                        :  // KTG ngày ni của bác sĩ ko có trong DB
                                        <div className='no-schedule'>
                                            <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                        </div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <BookingModal
                    isOpenModal={this.state.isOpenModalBooking}
                    closeBookingClose={this.closeBookingClose}
                    dataTime={this.state.dataScheduleTimeModal}
                />
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
