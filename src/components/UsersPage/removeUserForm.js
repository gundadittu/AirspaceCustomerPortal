import React from 'react';
import { Modal } from 'antd';

class RemoveUserForm extends React.Component {

    render() {
        const {
            visible, onCancel, onCreate, selectedUser
        } = this.props;
        const userObj = selectedUser || {};
        return (
            <Modal
                title="Danger Zone!"
                visible={visible}
                onOk={onCreate}
                onCancel={onCancel}
                okText="Yes"
                cancelText="Never mind"
            >   <p>This action will remove {userObj.firstName} {userObj.lastName} from this office.</p>
                <p>You can always add the same user back by using the same email ({userObj.email}).</p>
            </Modal>
        );
    }
}

export default RemoveUserForm; 