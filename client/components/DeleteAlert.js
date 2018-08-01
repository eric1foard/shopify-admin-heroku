import { Alert } from '@shopify/polaris/embedded';
import React, { Component } from 'react';

class DeleteAlert extends Component {
  render() {
    return <Alert
      title="Delete product?"
      open={this.props.isDeleteAlertOpen}
      destructive
      confirmContent="Keep"
      onConfirm={() => this.props.setDeleteAlertOpen(false)}
      cancelContent="Delete"
      onClose={() => this.props.setDeleteAlertOpen(false)}
    >
      This will remove selected product from AR.
</Alert>
  }
}

export default DeleteAlert;