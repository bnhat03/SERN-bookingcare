import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { getAllCodesService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    componentDidMount() {
        this.props.getGenderStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }

    render() {
        // Note: Có 3 biến Gender luôn
            // 1. Redux -> genderRedux
            // 2. State class component -> genderArr
            // 3. Trong render() => Dùng cho map() -> genders
        let genders = this.state.genderArr;
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
                                    <option selected>Choose ...</option>
                                    <option>/////</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role'></FormattedMessage></label>
                                <select className='form-control'>
                                    <option selected>Choose ...</option>
                                    <option>/////</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image'></FormattedMessage></label>
                                <input
                                    type="file"
                                    className='form-control'
                                />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'><FormattedMessage id='manage-user.save'></FormattedMessage></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
