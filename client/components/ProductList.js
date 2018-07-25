import React, { Component } from 'react';
import { EmptyState, ResourceList, Avatar, Card, TextStyle } from '@shopify/polaris';

class ProductList extends Component {
  render() {
    if (!this.props.products.length) {
      return this.renderEmptyState();
    }
    return this.renderProductList();
  }

  renderProductList() {
    return <Card>
      <ResourceList
        resourceName={{ singular: 'product', plural: 'products' }}
        items={this.props.products}
        showHeader
        renderItem={(item) => {
          const { id, title, product_type } = item;
          const media = <Avatar customer size="medium" name={title} />;

          return (
            <ResourceList.Item
              id={id}
              url={'https://help.shopify.com'}
              media={media}
              accessibilityLabel={`View details for ${title}`}
            >
              <h3>
                <TextStyle variation="strong">{title}</TextStyle>
              </h3>
              <div>{product_type}</div>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
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
