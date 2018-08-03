import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Page, AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductList from './ProductList';
import ProductPicker from './ProductPicker';
import DeleteAlert from './DeleteAlert';
import EditView from './EditView';
import StatusBanner from './StatusBanner';
import {
  setProductPickerOpen,
  addSelectedProducts,
  onFiltersChange,
  getProducts,
  setDeleteAlertOpen,
  deleteProductAndCloseModal,
  showBanner,
  hideBanner
} from '../actions/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.renderProductList = this.renderProductList.bind(this);
  }

  componentWillMount() {
    this.props.getProducts();
  }

  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider
        shopOrigin={shopOrigin}
        apiKey={apiKey}
      >
        <Page
          title='Augmented Reality Client'
          primaryAction={{ content: 'Add Products', onAction: () => this.props.setProductPickerOpen(true) }}
        >
          <StatusBanner
            visible={this.props.banner.visible}
            status={this.props.banner.status}
            title={this.props.banner.title}
            message={this.props.banner.message}
            hideBanner={this.props.hideBanner}
          />
          <ProductPicker
            setProductPickerOpen={this.props.setProductPickerOpen}
            productPickerModalOpen={this.props.productPickerModalOpen}
            addSelectedProducts={this.props.addSelectedProducts}
          />
          <DeleteAlert
            isDeleteAlertOpen={this.props.isDeleteAlertOpen}
            setDeleteAlertOpen={this.props.setDeleteAlertOpen}
            deleteProductOpts={this.props.deleteProductOpts}
            deleteProductAndCloseModal={this.props.deleteProductAndCloseModal}
          />
          <Router>
            <div>
              <Route exact path="/" render={(props) => this.renderProductList(props)} />
              <Route path="/products/:productId" component={EditView} />
              <Route path="/foo" component={EditView} />
            </div>
          </Router>
        </Page>
      </AppProvider>
    );
  }

  renderProductList(routerProps) {
    return <ProductList
    {...routerProps}
    products={this.props.products}
    setProductPickerOpen={this.props.setProductPickerOpen}
    appliedFilters={this.props.appliedFilters}
    onFiltersChange={this.props.onFiltersChange}
    setDeleteAlertOpen={this.props.setDeleteAlertOpen}
  />
  }
}

const mapStateToProps = (
  { productPickerModalOpen,
    products,
    appliedFilters,
    isDeleteAlertOpen,
    deleteProductOpts,
    banner
  }
) => {
  return {
    productPickerModalOpen,
    products,
    appliedFilters,
    isDeleteAlertOpen,
    deleteProductOpts,
    banner
  };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    setProductPickerOpen,
    addSelectedProducts,
    onFiltersChange,
    getProducts,
    setDeleteAlertOpen,
    deleteProductAndCloseModal,
    showBanner,
    hideBanner
  };
  return bindActionCreators(actionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
