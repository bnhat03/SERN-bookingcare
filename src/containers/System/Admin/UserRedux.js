import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { getAllCodesService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
                // Link URL ảo (BLOB) => VD: blob:http://localhost:3000/c2e2d1df-5090-41cf-9026-a10aa4007a06
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // GENDER
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        // POSITION
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        // ROLE
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
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
        console.log(this.state.previewImgURL);
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
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.password'></FormattedMessage></label>
                                <input
                                    type="password"
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.first_name'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.last_name'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group col-3'>
                                <label><FormattedMessage id='manage-user.phone_number'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className='form-group col-9'>
                                <label><FormattedMessage id='manage-user.address'></FormattedMessage></label>
                                <input
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender'></FormattedMessage></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position'></FormattedMessage></label>
                                <select className='form-control'>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role'></FormattedMessage></label>
                                <select className='form-control'>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index}>
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
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.save'></FormattedMessage></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
