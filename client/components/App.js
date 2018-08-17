import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formActions from 'redux-form/es/actions';
import { Page, AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductPicker from './ProductPicker';
import DeleteAlert from './DeleteAlert';
import EditView from './EditView';
import StatusBanner from './StatusBanner';
import * as Actions from '../actions/index';
import { EDIT_FORM_NAME, MAIN_PAGE_NAME } from '../../utils/constants';


class App extends Component {
  constructor(props) {
    super(props);
    this.renderProductList = this.renderProductList.bind(this);
  }

  componentWillMount() {
    this.props.getProducts('', this.props.pagination.pageSize, this.props.appliedFilters);
  }

  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider
        shopOrigin={shopOrigin}
        apiKey={apiKey}
      >
        <Page
          title={this.props.page.title}
          primaryAction={this.renderPrimaryAction()}
          breadcrumbs={this.props.page.breadcrumbs}
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
            pagination={this.props.pagination}
            search={this.props.search}
            filters={this.props.appliedFilters}
          />
          <DeleteAlert
            isDeleteAlertOpen={this.props.isDeleteAlertOpen}
            setDeleteAlertOpen={this.props.setDeleteAlertOpen}
            deleteProductOpts={this.props.deleteProductOpts}
            deleteProductAndCloseModal={this.props.deleteProductAndCloseModal}
            pagination={this.props.pagination}
            search={this.props.search}
            filters={this.props.appliedFilters}
          />
          <Router>
            <div>
              <Route exact path="/" render={(props) => this.renderProductList(props)} />
              <Route path="/products/:productId" render={({ match }) => this.renderEditView(match.params.productId)} />
            </div>
          </Router>
        </Page>
      </AppProvider>
    );
  }

  renderPrimaryAction() {
    if (this.props.page.title === MAIN_PAGE_NAME) { // main page view
      return {
        content: 'Add Products',
        onAction: () => this.props.setProductPickerOpen(true)
      }
    } // otherwise we're in the edit screen
    return {
      content: 'Save',
      onAction: () => this.props.submit(EDIT_FORM_NAME),
      disabled: this.props.form.pristine
    }
  }

  renderProductList(routerProps) {
    return <ProductList
    {...routerProps}
    products={this.props.products}
    setProductPickerOpen={this.props.setProductPickerOpen}
    appliedFilters={this.props.appliedFilters}
    handleFilterChange={this.props.handleFilterChange}
    setDeleteAlertOpen={this.props.setDeleteAlertOpen}
    pagination={this.props.pagination}
    handlePagination={this.props.handlePagination}
    search={this.props.search}
    searchProducts={this.props.searchProducts}
    updateSearchField={this.props.updateSearchField}
    clearTypingTimeout={this.props.clearTypingTimeout}
    setTypingTimeout={this.props.setTypingTimeout}
    isLoading={this.props.isLoading}
    changePage={this.props.changePage}
  />
  }

  // TODO: make products an object instead of array
  renderEditView(productId) {
    return <EditView
      onSubmit={values => this.props.saveEditForm(productId, values)}
      product={this.props.products.find(p => p.id == productId)}
    />
  }
}

const mapStateToProps = (state) => ({...state});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...Actions, submit: formActions.submit}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
