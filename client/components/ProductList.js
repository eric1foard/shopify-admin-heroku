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
import { resolveMetafield } from '../../utils/metafields';


const formatDimensions = (height, width) =>
  hasValidDimensions(height, width) ?
    <TextStyle variation="subdued">{width}" x {height}"</TextStyle> :
    null;

const lowResolutionBadge = image =>
  isLowResolution(image) ?
    <Badge status="attention">Low Resolution</Badge> :
    null;

const dimensionsNeededBadge = (height, width) =>
  !hasValidDimensions(height, width) ?
    <Badge status="attention">Dimensions needed</Badge> :
    null;

const renderShortcutActions = (setDeleteAlertOpen, history, {id, title}) => ([
  {
    content: 'Edit',
    onAction: () => history.push(`/products/${id}`)
  },
  {
    content: 'Delete',
    onAction: () => setDeleteAlertOpen({isOpen: true, id, title })
  }
]);

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

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
      secondaryAction={{ content: 'Learn more', to: '/foo' }}
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
        filterControl={this.renderFilterControl}
      />
    </Card>;
  }

  renderFilterControl() {
    return <ResourceList.FilterControl
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

  renderItem(item) {
    const { id, title, image, metafields } = item;
    const height = resolveMetafield(metafields, 'height', '');
    const width = resolveMetafield(metafields, 'width', '');
    const media = <Avatar size="medium" url={image && image.src || ''} />;

    return <ResourceList.Item
      id={id}
      media={media}
      accessibilityLabel={`View details for ${title}`}
      shortcutActions={renderShortcutActions(this.props.setDeleteAlertOpen, this.props.history, item)}
      persistActions
    >
      <TextStyle variation="strong">{title}</TextStyle>
      <div>{formatDimensions(height, width)}</div>
      <div>{lowResolutionBadge(image)}</div>
      <div>{dimensionsNeededBadge(height, width)}</div>
    </ResourceList.Item>;
  }
}

export default ProductList;
