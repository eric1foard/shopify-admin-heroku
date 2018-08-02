import { Alert } from '@shopify/polaris/embedded';
import React, { Component } from 'react';

class DeleteAlert extends Component {
  render() {
    return <Alert
      title="Delete product from AR?"
      open={this.props.isDeleteAlertOpen}
      destructive
      confirmContent="Delete"
      onConfirm={() => this.props.deleteProductAndCloseModal(this.props.deleteProductOpts.id)}
      cancelContent="Cancel"
      onClose={() => this.props.setDeleteAlertOpen({ isOpen: false, id: 0, title: '' })}
    >
      This will remove "{this.props.deleteProductOpts.title}" from AR.
</Alert>
  }
}

export default DeleteAlert;