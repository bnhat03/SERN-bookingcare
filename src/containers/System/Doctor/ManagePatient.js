import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal'
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner'


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,

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

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        }, async () => {
            await this.getDataPatient();
        })
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res && res.EC === 0) {
            this.setState({
                dataPatient: res.DT
            })
        }
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => { // props truyền xuống Modal (child component)
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.EC === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success(res.EM);
            this.closeRemedyModal();
            await this.getDataPatient();
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error(res.EM);
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;

        return (
            <>
                {this.state.isShowLoading && (
                    <div className="overlay-loading">
                        <Oval
                            height={100}
                            width={100}
                            color="#4fa94d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    </div>
                )}
                {/* {this.state.isShowLoading && (
                    <div className="overlay-loading">
                        <Circles
                            height={100}
                            width={100}
                            color="#00BFFF"
                            ariaLabel="loading"
                        />
                    </div>
                )} */}

                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                        {/* <FormattedMessage id='manage-patient.title'></FormattedMessage> */}
                    </div>

                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>
                                Chọn ngày khám
                                {/* <FormattedMessage id='manage-patient.choose-date'></FormattedMessage> */}
                            </label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Thời gian</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataPatient && dataPatient.length > 0
                                            ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeTypeDataPatient.valueVi}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.patientData.genderData.valueVi}</td>
                                                        <td>
                                                            <button
                                                                className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan='6' style={{ textAlign: 'center' }}>No Data</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
