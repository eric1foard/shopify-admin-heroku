import React, { Component } from 'react';
import { EmptyState } from '@shopify/polaris';

class ProductList extends Component {
  render() {
    if (!this.props.products.length) {
      return this.renderEmptyState();
    }

    console.log('products!!!!', this.props.products);
  }

  renderEmptyState() {
    return <EmptyState
      heading="Add products for viewing in augmented reality"
      action={{ content: 'Add products', onAction: () => this.props.setProductPickerOpen(true) }}
      secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Manage which products are visible to your customers in the augmented reality client.</p>
    </EmptyState>
  }
}

export default ProductList;
