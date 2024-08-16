import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { getAllCodesService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableManageUser from './TableManageUser';
import { Buffer } from 'buffer';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            // Link URL ảo (BLOB) => VD: blob:http://localhost:3000/c2e2d1df-5090-41cf-9026-a10aa4007a06
            isOpen: false,

            // create
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            // edit
            action: '',
            userEditId: '',
        }
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        console.log(this.props.genderRedux);

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // GENDER
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '' // Option ban đầu cho select gender
            })
        }
        // POSITION
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '' // Option ban đầu cho select position
            })
        }
        // ROLE
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '' // Option ban đầu cho select role
            })
        }
        // user: create successfully => refresh input
        if (prevProps.listUsers !== this.props.listUsers) { // Reset Form Create User => Mới fetch user xong
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }


    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) {
            return;
        }
        this.setState({
            isOpen: true
        })
        // console.log(this.state.previewImgURL);
    }
    // Button Create/Edit => 2 trong 1 ở button ni
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                positionId: this.state.position,
                roleId: this.state.role,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.updateAUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                positionId: this.state.position,
                roleId: this.state.role,
                avatar: this.state.avatar
            })
        }

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) { // Input một trong các field trên trống
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, field) => { // field: field input nào change
        let copyState = { ...this.state };
        copyState[field] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''; 
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');// convert ảnh sang base64
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        // Note: Có 3 biến Gender luôn
        // 1. Redux -> genderRedux
        // 2. State class component -> genderArr
        // 3. Trong render() => Dùng cho map() -> genders
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isGetGenders = this.props.isLoadingGender; // Loading Gender tương tự khóa Redux học ở trước => Chỉ làm mẫu cái Gender ni thôi, Position + Role bỏ qua

        let language = this.props.language;

        let { email, password, firstName, lastName, phonenumber, address, gender, role, position, avatar } = this.state;

        console.log(position);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux hoi dan it
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add'></FormattedMessage></div>

                            <div className='col-12'>
                                {isGetGenders ? 'Loading Genders' : ''}
                            </div>

                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.email'></FormattedMessage></label>
                                <input
                                    type="email"
                                    className='form-control'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.password'></FormattedMessage></label>
                                <input
                                    type="password"
                                    className='form-control'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.first_name'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.last_name'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.phone_number'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    value={phonenumber}
                                    onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                                />
                            </div>
                            <div className='form-group col-9'>
                                <label><FormattedMessage id='manage-user.address'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender'></FormattedMessage></label>
                                <select
                                    className='form-control'
                                    value={gender} // value select ni trùng với value của option nào ở dưới thì option đó đang được chọn
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'></FormattedMessage></label>
                                <select
                                    className='form-control'
                                    value={position}
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => { 
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role'></FormattedMessage></label>
                                <select
                                    className='form-control'
                                    value={role}
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image'></FormattedMessage></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg'
                                        type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>
                                        Tải ảnh
                                        <i className='fas fa-upload'></i>
                                    </label>
                                    <div
                                        className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? <FormattedMessage id='manage-user.edit'></FormattedMessage>
                                            : <FormattedMessage id='manage-user.save'></FormattedMessage>
                                    }
                                </button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser 
                                    handleEditUserFromParent={this.handleEditUserFromParent} 
                                        //props truyền xuống là Function => Gọi ở Child Component (TableManageUser) => Thực thi Function ni
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {  // Hiển thị toàn màn hình Preview Image => Tự động hiện lên màn hình che hết mấy cấy khác như Modal => Cài đặt sẵn rồi cưng
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}  // base64
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }



            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        updateAUser: (user) => dispatch(actions.updateAUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
