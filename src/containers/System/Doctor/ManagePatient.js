import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []

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
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formatedDate);
        })
    }

    getDataPatient = async (user, formatedDate) => {
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
    handleBtnConfirm = () => {

    }
    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { dataPatient } = this.state;
        let { language } = this.props;

        return (
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
                                                            onClick={() => this.handleBtnConfirm()}
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>no data</tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
