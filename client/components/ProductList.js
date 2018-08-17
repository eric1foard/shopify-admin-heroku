import React, { Component } from 'react';
import {
  EmptyState,
  ResourceList,
  Thumbnail,
  Card,
  TextStyle,
  Badge,
  FilterType,
  Stack,
  Pagination,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';
import ResourceListFooter from './ResourceListFooter';
import { hasValidDimensions } from '../../utils/image';
import {
  EMPTY_IMAGE,
  IMAGE_NEEDED_FILTER,
  DIMENSIONS_NEEDED_FILTER,
  FILTER_OPTS
} from '../../utils/constants';


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

const renderShortcutActions = (setDeleteAlertOpen, changePage, { id, title }) => ([
  {
    content: 'Edit',
    onAction: changePage
  },
  {
    content: 'Delete',
    onAction: () => setDeleteAlertOpen({ isOpen: true, id, title })
  }
]);

const filterOptions = () => {
  const options = [FILTER_OPTS.NEEDED, FILTER_OPTS.PRESENT];
  return [{
    key: IMAGE_NEEDED_FILTER,
    label: 'Image',
    operatorText: 'is',
    type: FilterType.Select,
    options
  },
  {
    key: DIMENSIONS_NEEDED_FILTER,
    label: 'Dimensions',
    operatorText: 'are',
    type: FilterType.Select,
    options
  }]
};

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    const { products, search, appliedFilters } = this.props;
    if (this.props.isLoading) {
      return this.renderProductList([1, 1, 1], this.renderSkeletonItem);
    }
    if (!products.length &&
      !(search.value || appliedFilters.length)) {
      return this.renderEmptyState();
    }
    return this.renderProductList(products, this.renderItem);
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

  renderPagination() {
    const {
      pagination: { pageNum, pageSize, hasNextPage },
      products,
      handlePagination,
      search,
      appliedFilters
    } = this.props;

    return products.length > 0 ? (
      <ResourceListFooter>
        <Pagination
          hasPrevious={pageNum > 0}
          hasNext={hasNextPage}
          onPrevious={() => handlePagination('prev', pageNum, pageSize, search.value, appliedFilters)}
          onNext={() => handlePagination('next', pageNum, pageSize, search.value, appliedFilters)}
        />
      </ResourceListFooter>
    ) : null;
  }

  renderProductList(items, renderItem) {
    return <Card>
      <ResourceList
        showHeader
        resourceName={{ singular: 'product', plural: 'products' }}
        items={items}
        renderItem={renderItem}
        filterControl={this.renderFilterControl()}
      />
      {this.renderPagination()}
    </Card>;
  }

  renderFilterControl() {
    const {
      appliedFilters,
      handleFilterChange,
      search,
      updateSearchField,
      clearTypingTimeout,
      setTypingTimeout,
      searchProducts,
      pagination: { pageSize }
    } = this.props;

    return <ResourceList.FilterControl
      filters={filterOptions()}
      appliedFilters={appliedFilters}
      onFiltersChange={filters => handleFilterChange(filters, search.value, pageSize)}
      searchValue={search.value}
      onSearchChange={(searchValue) => {
        updateSearchField(searchValue);
        if (search.typingTimeout) {
          clearTypingTimeout();
        }
        setTypingTimeout(() => {
          searchProducts(searchValue, pageSize, appliedFilters);
        }, 500);
      }}
    />
  }

  renderSkeletonItem() {
    return <ResourceList.Item
      media={<Thumbnail source='' />}
    >
      <SkeletonBodyText />
    </ResourceList.Item>;
  }

  renderItem(item) {
    const { id, title, height, width, image } = item;
    const media = image ?
      <Thumbnail source={image} alt={`Photo of ${title}`} /> :
      <Thumbnail source={EMPTY_IMAGE} alt="no product image" />;

    return <ResourceList.Item
      persistActions
      id={id}
      media={media}
      accessibilityLabel={`View details for ${title}`}
      shortcutActions={
        renderShortcutActions(
        this.props.setDeleteAlertOpen,
        () => this.props.changePage({ id, title }, this.props.history),
        item)
      }
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
