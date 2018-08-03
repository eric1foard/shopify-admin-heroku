import React, { Component } from 'react';
import { ResourcePicker } from '@shopify/polaris/embedded';


class ProductPicker extends Component {
    render() {
        return <ResourcePicker
            products
            allowMultiple
            open={this.props.productPickerModalOpen}
            onCancel={() => this.props.setProductPickerOpen(false)}
            onSelection={({ products }) => {
                console.log('Selected products: ', products);
                // TODO: pass minimal payload to server to avoid slow call
                this.props.addSelectedProducts({ products });
            }}
        />
    }
}

export default ProductPicker;
