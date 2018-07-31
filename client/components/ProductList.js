import React, { Component } from 'react';
import {
  EmptyState,
  ResourceList,
  Avatar,
  Card,
  TextStyle,
  Badge,
  FilterType
} from '@shopify/polaris';
import { hasValidDimensions, isLowResolution } from '../../utils/image';

const formatDimensions = dim =>
  hasValidDimensions(dim) ?
    <TextStyle variation="subdued">{dim.width}" x {dim.height}"</TextStyle> :
    null;

const lowResolutionBadge = image =>
  isLowResolution(image) ?
    <Badge status="attention">Low Resolution</Badge> :
    null;

const dimensionsNeededBadge = item =>
  !hasValidDimensions(item.dimensions) ?
    <Badge status="attention">Dimensions needed</Badge> :
    null;

class ProductList extends Component {
  render() {
    if (!this.props.products.length) {
      return this.renderEmptyState();
    }
    return this.renderProductList();
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

  renderProductList() {
    return <Card>
      <ResourceList
        showHeader
        resourceName={{ singular: 'product', plural: 'products' }}
        items={this.props.products}
        renderItem={this.renderItem}
        filterControl={
          <ResourceList.FilterControl
            filters={[
              {
                key: 'productStatusFilter',
                label: 'Product status',
                operatorText: 'is',
                type: FilterType.Select,
                options: ['Dimensions needed', 'Low resolution', 'Complete'],
              },
            ]}
            appliedFilters={this.props.appliedFilters}
            onFiltersChange={this.props.onFiltersChange}
            searchValue="USA"
            onSearchChange={(searchValue) => {
              console.log(
                `Search value changed to ${searchValue}.`,
                'Todo: use setState to apply this change.',
              );
            }}
          />
        }
      />
    </Card>;
  }

  renderItem(item) {
    const { id, title, image, dimensions } = item;
    const media = <Avatar size="medium" url={image.url} />;
    return <ResourceList.Item
      id={id}
      media={media}
      accessibilityLabel={`View details for ${title}`}
    >
      <TextStyle variation="strong">{title}</TextStyle>
      <div>{formatDimensions(dimensions)}</div>
      <div>{lowResolutionBadge(image)}</div>
      <div>{dimensionsNeededBadge(item)}</div>
    </ResourceList.Item>;
  }
}

export default ProductList;
