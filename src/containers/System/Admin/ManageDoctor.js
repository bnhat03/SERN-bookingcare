import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getDetailInforDoctorService } from '../../../services/userService';
// video 76: Markdown Editor
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// React Select
import Select from 'react-select';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: {}, // object{value, label} đang chọn
            description: '',
            listDoctors: [], // data select: array of list object {label, value}
            hasOldData: false, // Create/Update infor markdown doctor => true: update

            // save to Doctor_Infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: {},
            selectedPayment: {},
            selectedProvince: {},
            nameClinic: '',
            addressClinic: '',
            note: '',

        }
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };


    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }
    handleChangeSelect = async (selectedOption) => { // Thay đổi select => Auto fill input nếu có trong table Mardkdown ở DB
        this.setState({ selectedOption });
        let res = await getDetailInforDoctorService(selectedOption.value);
        if (res && res.EC === 0 && res.DT && res.DT.Markdown) { // Doctor đã có infor trong db Markdown => Edit
            let markdown = res.DT.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        }
        else { //Doctor chưa có infor trong db Markdown => Create
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            })
        }
    };
    handleOnChangeDesc = (event) => { // textarea description
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputData, type) => { // build data cho các select: Doctor, Price, Payment, Province
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : `${item.valueVi}`; // Doctor / 3 cái nớ
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : `${item.valueEn}`;
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            })
        }
        return result;
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getAllRequiredDoctorInfor(); // Lấy tất cả select cho: Price, Payment, Province
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(this.props.resPrice);
            let dataSelectPayment = this.buildDataInputSelect(this.props.resPayment);
            let dataSelectProvince = this.buildDataInputSelect(this.props.resProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,

            })
        }
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='admin.manage-doctor.title' />
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea className='form-control'
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá: </label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                                placeholder={'Chọn giá'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán: </label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                                placeholder={'Chọn phương thức thanh toán'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành: </label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                                placeholder={'Chọn tỉnh thành'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám: </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám: </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Ghi chú: </label>
                            <input className='form-control' />
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} // value default bên trái của Md Editor
                        />
                    </div>
                    <button
                        className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        <span>
                            {
                                hasOldData === true 
                                ? <FormattedMessage id='admin.manage-doctor.save' /> 
                                : <FormattedMessage id='admin.manage-doctor.add' />
                            }
                        </span>
                    </button>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
