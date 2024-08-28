import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _, { times } from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import { LANGUAGES, } from '../../../../utils';
import Select from 'react-select'
import { toast } from 'react-toastify'
import { postPatientBookAppointment } from '../../../../services/userService'
import moment from 'moment';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: {},
            doctorId: '',
            genders: '', // list genders in DB
            timeType: '',
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.languagel;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result;
    }

    handleOnChangeInput = (event, field) => { // field: field input nào change
        let copyState = { ...this.state };
        copyState[field] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleChangeSelect = async (selectedOption) => { // Thay đổi select => Auto fill input nếu có trong table Mardkdown ở DB
        this.setState({ selectedGender: selectedOption });
    };



    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0],
        })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log(">>> check hihi", dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI
                ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') // unix timestamp => date (Thứ + ngày/tháng/năm)
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY')
            return `${time}  - ${date}`;
        }
        return '';
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI
                ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return '';
    }


    handleConfirmBooking = async (dataTime) => { // dataTime: Ko lấy được this.props.dateTime => Vì DidUpate ko thực hiện được if (prev vs this) đã nói
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(dataTime);
        let doctorName = this.buildDoctorName(dataTime);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: dataTime.doctorId,
            timeType: dataTime.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName

        })
        if (res && res.EC === 0) {
            toast.success(res.EM);
            this.props.closeBookingClose();
        }
        else {
            toast.error(res.EM);
        }
    }

    componentDidMount() {
        this.props.getGenders();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        // Tại răng console.log chộ dataTime thay đổi mà vẫn ko chạy vô if ni hè
        // Dưới render vẫn render props dataTime ni bình thường mà
        // => Phải dùng cách thủ công là truyền params trong render chơ ko dùng được State
        if (prevProps.dateTime !== this.props.dateTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                })
            }
        }

        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
    }

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        console.log(">>> check dataTime", this.props.dataTime);

        let doctorId = '', timeType = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
            timeType = dataTime.timeType;
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className='booking-modal-container'
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id='patient.booking-modal.title' />
                        </span>
                        <span
                            className='right'
                            onClick={closeBookingClose}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={false}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.fullName' />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.phoneNumber' />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.email' />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.address' />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.reason' />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.birthday' />
                                </label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.gender' />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                    placeholder={<FormattedMessage id='patient.booking-modal.select-gender' />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button
                            className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking(dataTime)}
                        >
                            <FormattedMessage id='patient.booking-modal.btnConfirm' />
                        </button>
                        <button
                            className='btn-booking-cancel'
                            onClick={closeBookingClose}
                        >
                            <FormattedMessage id='patient.booking-modal.btnCancel' />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
