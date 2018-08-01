import React, { Component } from 'react';
import { Modal } from '@shopify/polaris/embedded';
import ProductEditForm from './ProductEditForm';

class EditModal extends Component {
    render() {
        return <Modal
            // src="https://my-app.com/upgrade-to-retail-package"
            open={this.props.isEditModalOpen}
            title="Upgrade your Shopify POS with the Retail Package"
            primaryAction={{
                content: 'Add Retail Package',
                onAction: () => this.props.setEditModalOpen(false),
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: () => this.props.setEditModalOpen(false),
                },
            ]}
            onClose={() => this.props.setEditModalOpen(false)}
        >
            <ProductEditForm onSubmit={() => console.log('submitting form!!!')} />
        </Modal>
    }
}

export default EditModal;