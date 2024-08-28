import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageClinic.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    };

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewSpeicalty = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error(res.EM);
        }
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>
                        Quản lý phòng khám
                    </div>
                    <div className='add-new-specialy row'>
                        <div className='col-6 form-group'>
                            <label>
                                Tên phòng khám
                            </label>
                            <input
                                className='form-control'
                                type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                Ảnh phòng khám
                            </label>
                            <input
                                className='form-control-file'
                                type='file'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                Địa chỉ phòng khám
                            </label>
                            <input
                                className='form-control'
                                type='text'
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn-save-specialty'
                                onClick={() => this.handleSaveNewSpeicalty()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
