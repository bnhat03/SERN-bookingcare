import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),


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
        })
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));  // Lấy ngày hôm qua => Cho vô DatePicker 


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
                            <tr>
                                <th>Name</th>
                                <th colSpan='2'>Telephone</th>
                            </tr>
                            <tr>
                                <td>Hehe</td>
                                <td>fbdfg</td>
                                <td>232234</td>
                            </tr>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
