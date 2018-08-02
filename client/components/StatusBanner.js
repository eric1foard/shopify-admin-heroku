import { Banner } from '@shopify/polaris';
import React, { Component } from 'react';

class StatusBanner extends Component {
  render() {
    if (!this.props.visible) return null;
    return <Banner
      status={this.props.status}
      title={this.props.title}
      onDismiss={this.props.hideBanner}
    >
      <p>{this.props.message}</p>
    </Banner>
  }
}

export default StatusBanner;