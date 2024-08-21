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
            allDays: [], // List các object KTG của bác sĩ trong ngày đó

        }
    }

    setArrDays = (language) => { // Thay đổi option của select => Hiện VN/EN
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
        let { allDays } = this.state;

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
                        <div className='all-available-time'>

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
