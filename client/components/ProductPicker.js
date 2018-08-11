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
                const targetProducts = products.map(({ id, title }) => ({ id, title }));
                this.props.addSelectedProducts({ products: targetProducts });
            }}
        />
    }
}

export default ProductPicker;
