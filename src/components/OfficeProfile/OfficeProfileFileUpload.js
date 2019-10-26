import React from 'react';
import { Upload, Icon, message, Modal } from 'antd';
import { connect } from 'react-redux';

class OfficeProfileFileUpload extends React.Component {

    state = { 
        isUploadingFile: false
    }

    render() {
        // Uploads file into Google Bucket and stores url in a mapping in state
        let uploadRequestServiceFile = ({ onSuccess, onError, file }) => {
            const firebase = this.props.firebase;
            const storageRef = firebase.storage.ref();
            const fileRef = storageRef.child(this.props.initialFilePath+ "/" + file.name);

            return fileRef.put(file)
                .then((snapshot) => {
                    return snapshot.ref.getDownloadURL()
                })
                .then((downloadURL) => {
                    const currMapping = this.state.urlMapping;
                    let newMapping = {
                        ...currMapping,
                    }
                    newMapping[file.name] = downloadURL.toString()
                    this.setState({ urlMapping: newMapping })
                    onSuccess(null, file)
                    return
                })
                .catch(e => {
                    onError(e, null)
                    return
                })
        }
        uploadRequestServiceFile = uploadRequestServiceFile.bind(this)

        // Recieves Callbacks Triggered in uploadRequestServiceFile and shows alerts 
        let onUploadStatusChange = (info) => {
            const { status } = info.file
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                this.setState({isUploadingFile: false})
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                this.setState({isUploadingFile: false})
            } else if (status === 'uploading') {
                message.loading(`Uploading ${info.file.name}...`)
                this.setState({isUploadingFile: true})
            }
        }
        onUploadStatusChange = onUploadStatusChange.bind(this)

        const onCancel = this.props.onCancel || null;
        const visible = this.props.visible || false;
        return (
            <Modal
                visible={visible}
                okText="Done"
                onCancel={() => onCancel(false)}
                onOk={() => onCancel(false)}
                confirmLoading={this.state.isUploadingFile}
                width="40%"
            >
                <div>
                    <h1>Upload Files</h1>
                    <Upload.Dragger name="files" onChange={onUploadStatusChange} multiple={true} customRequest={uploadRequestServiceFile}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </div>
            </Modal>
        )
    }
}


const mapStateToProps = state => {
    return {
        firebase: state.firebase.firebase
    }
};

export default connect(mapStateToProps, null)(OfficeProfileFileUpload); 