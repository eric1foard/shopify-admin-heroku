import React, { Component } from 'react';
import { ResourcePicker } from '@shopify/polaris/embedded';


class ProductPicker extends Component {
    render() {
        return <ResourcePicker
            products
            allowMultiple
            open={this.props.productPickerModalOpen}
            onCancel={() => this.props.setProductPickerOpen(false)}
            onSelection={(resources) => {
                console.log('Selected products: ', resources.products);
                // this.setState({ open: false });
            }}
        />
    }
}

export default ProductPicker;
