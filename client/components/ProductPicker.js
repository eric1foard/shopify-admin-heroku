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
                this.props.addSelectedProducts(products);
                this.props.setProductPickerOpen(false);
            }}
        />
    }
}

export default ProductPicker;
