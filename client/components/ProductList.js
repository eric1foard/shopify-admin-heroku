import React, { Component } from 'react';
import {
  EmptyState,
  ResourceList,
  Thumbnail,
  Card,
  TextStyle,
  Badge,
  FilterType,
  Stack
} from '@shopify/polaris';
import { hasValidDimensions, isLowResolution } from '../../utils/image';
import { resolveMetafield } from '../../utils/metafields';
import { EMPTY_IMAGE } from '../../utils/constants';


const formatDimensions = (height, width) =>
  hasValidDimensions(height, width) ?
    <TextStyle variation="subdued">{width}" x {height}"</TextStyle> :
    null;

const imageNeededBadge = image =>
  image ? null : <Badge status="attention">Image needed</Badge>;

const dimensionsNeededBadge = (height, width) =>
  !hasValidDimensions(height, width) ?
    <Badge status="attention">Dimensions needed</Badge> :
    null;

const renderShortcutActions = (setDeleteAlertOpen, history, { id, title }) => ([
  {
    content: 'Edit',
    onAction: () => history.push(`/products/${id}`)
  },
  {
    content: 'Delete',
    onAction: () => setDeleteAlertOpen({ isOpen: true, id, title })
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
    const { id, title, metafields } = item;
    const height = resolveMetafield(metafields, 'height', '').value;
    const width = resolveMetafield(metafields, 'width', '').value;
    const image = resolveMetafield(metafields, 'image', '').value;
    const media = image ?
      <Thumbnail source={image} alt={`Photo of ${title}`} /> :
      <Thumbnail source={EMPTY_IMAGE} alt="no product image" />;

    return <ResourceList.Item
      id={id}
      media={media}
      accessibilityLabel={`View details for ${title}`}
      shortcutActions={renderShortcutActions(this.props.setDeleteAlertOpen, this.props.history, item)}
      persistActions
    >
      <Stack spacing="tight" distribution="leading">
        <TextStyle variation="strong">{title}</TextStyle>
        <div>{formatDimensions(height, width)}</div>
        <div>{imageNeededBadge(image)}</div>
        <div>{dimensionsNeededBadge(height, width)}</div>
      </Stack>
    </ResourceList.Item>;
  }
}

export default ProductList;
