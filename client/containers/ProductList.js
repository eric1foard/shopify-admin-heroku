import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EmptyState } from '@shopify/polaris';

class ProductList extends Component {
  render() {
    console.log('props!!!!', this.props);
    return <EmptyState
      heading="Add products for viewing in augmented reality"
      action={{ content: 'Add products' }}
      secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Track and receive your incoming inventory from suppliers.</p>
    </EmptyState>
  }
}

const mapStateToProps = products => {
  console.log('mapStateToProps!!!', products)
  return products;
};

export default connect(mapStateToProps)(ProductList);
