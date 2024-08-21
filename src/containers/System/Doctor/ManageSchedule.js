import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageSchedule.scss'
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify'
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],  // list option {label, value} của select
            selectedDoctor: {}, // option của select đang chọn
            currentDate: '', // Ngày đang chọn để thêm các list timeType
            rangeTime: [], //TIME trong AllCode => list button để chọn giờ => Mỗi button là một object

        }
    }


    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => { // Thay đổi select => Auto fill input nếu có trong table Mardkdown ở DB
        this.setState({ selectedDoctor: selectedOption });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        })
    }
    handleClickButtonTime = (time) => { // Nhấn vào các nút chọn giờ
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item, index) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            this.setState({
                rangeTime: rangeTime,
            })
        }
    }

    handleSaveSchedule = async () => { // Button lưu thông tin
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = []; // list để lưu vô DB table 
        if (!currentDate) {
            toast.error("Invalid date!")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) { // Chưa chọn option doctor nào
            toast.error("Invalid selected doctor!")
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER); // constant: DD/MM/YYYY
        let formatedDate = new Date(currentDate).getTime();



        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true); // Danh sách các button đang chọn => background: orange
            if (selectedTime && selectedTime.length > 0) {
                selectedTime = selectedTime.map((schedule, index) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            }
            else {
                toast.error("Invalid selected time!") // Ko chọn giờ mô
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({  // Đáng lẹ phải dùng Redux => Đây gọi service call API luôn mẹ
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })

    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            // Thêm 1 cặp key:value cho mỗi element object trong array rangeTime => Nhấn/Tắt button các timeType khác nhau
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => {
                    return {
                        ...item,
                        isSelected: false,
                    }
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }


    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        console.log(">>> range time", rangeTime);
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title'></FormattedMessage>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id='manage-schedule.choose-doctor'></FormattedMessage>
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id='manage-schedule.choose-date'></FormattedMessage>
                            </label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {
                                rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn-schedule active' : 'btn-schedule'} // Nhấn/Tắt => Hiển thị background???
                                            key={index}
                                            onClick={() => this.handleClickButtonTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })

                            }
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id='manage-schedule.save'></FormattedMessage>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime, // TIME trong Allcode
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
