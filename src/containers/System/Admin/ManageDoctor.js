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
            // list Price trong AllCode table
            listPayment: [],
            listProvince: [],
            selectedPrice: {},
            // Có 2 key
            // value:  keyMap (ở AllCode table)
            // label: valueEn/valueVi (ở AllCode table)
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

        })
    }
    handleChangeSelect = async (selectedOption) => { // Thay đổi Select riêng cho Doctor 
        // => Auto fill input/select nếu có trong table Mardkdown, Doctor Infor ở DB 
        // select: PRICE, PAYMENT, PROVINCE
        // input: introduce, nameClinic, addressClinic, note, markdown
        this.setState({ selectedOption }); // selectedOption: Doctor
        let { listPayment, listPrice, listProvince } = this.state;

        let res = await getDetailInforDoctorService(selectedOption.value); // doctorId
        if (res && res.EC === 0 && res.DT && res.DT.Markdown) { // Doctor đã có infor trong db Markdown => Edit
            // Phaỉ sửa thêm doctor-infor
            let markdown = res.DT.Markdown;

            let selectedPrice = {},
                selectedPayment = {},
                selectedProvince = {},
                paymentId = '',
                priceId = '',
                provinceId = '',
                nameClinic = '',
                addressClinic = '',
                note = '';
            if (res.DT.Doctor_Infor) {
                addressClinic = res.DT.Doctor_Infor.addressClinic;
                nameClinic = res.DT.Doctor_Infor.nameClinic;
                note = res.DT.Doctor_Infor.note;
                priceId = res.DT.Doctor_Infor.priceId; // keyMap
                paymentId = res.DT.Doctor_Infor.paymentId; // keyMap
                provinceId = res.DT.Doctor_Infor.provinceId; // keyMap

                selectedPrice = listPrice.find(item => { // Tìm option (object) đang chọn của select Price
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => { // Tìm option (object) đang chọn của select Payment
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => { // Tìm option (object) đang chọn của select Province
                    return item && item.value === provinceId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,

            })
        }
        else { //Doctor chưa có infor trong db Markdown => Hiện thông tin rỗng 
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedPrice: {},
                selectedPayment: {},
                selectedProvince: {},
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
            if (type === 'USERS') { // Doctor
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.id; // Doctor cũng là USERS => value = id
                    result.push(obj);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap; // value của PRICE phải liên kết với AllCode (FK - PK) => value = keyMap
                    result.push(obj);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap; // tương tự PRICE
                    result.push(obj);
                })
            }
        }
        return result;
    }

    handleChangeSelectDoctorInfor = async (selectedOption, name) => { // onChange chung của 3 React Select: PRICE, PAYMWENT, PROVINCE => Doctor có trên rồi
        let stateName = name.name; // Onchange của React Select có param thứ 2 là name => name.name: Lấy được string name đã khai báo ở 3 React Select dưới (PRICE, PAYMWENT, PROVINCE)
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption; // object
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeText = (event, id) => { // onChange của các input: 
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value; // object
        this.setState({
            ...stateCopy
        })
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getAllRequiredDoctorInfor(); // Lấy tất cả select cho: Price, Payment, Province
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) { // Thay đổi option select của Doctor
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) { // Thay đổi option select của 3 cái: PRICE, PAYMENT, PROVINCE 
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            // console.log(">>> check resPrice" , resPrice);
            // console.log(">>> check resPayment" , resPayment);
            // console.log(">>> check resProvince" , resProvince);
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        if (prevProps.language !== this.props.language) { // Thay đổi option select của 4 cái 
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(this.props.resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(this.props.resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(this.props.resProvince, 'PROVINCE');

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
                                placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}
                            />
                        </div>
                        <div className='content-right form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                            <textarea className='form-control'
                                onChange={(event) => this.handleOnChangeDesc(event, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                            <Select
                                value={this.state.selectedPrice} // Option nào giống cái ni => Option được chọn
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                                name='selectedPrice'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.payment' /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                                name='selectedPayment'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                                name='selectedProvince'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.nameClinic' /></label>
                            <input
                                className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.addressClinic' /></label>
                            <input
                                className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                            <input
                                className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'note')}
                                value={this.state.note}
                            />
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
