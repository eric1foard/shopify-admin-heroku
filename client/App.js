import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProductPickerOpen, addSelectedProducts } from './actions/index';
import { bindActionCreators } from 'redux';
import { Page, AppProvider } from '@shopify/polaris';
import ProductList from './components/ProductList';
import ProductPicker from './components/ProductPicker';


class App extends Component {
  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page
          title='Augmented Reality Client'
          primaryAction={{ content: 'Add Products', onAction: () => this.props.setProductPickerOpen(true) }}
        >
          <ProductList
            products={this.props.products}
            setProductPickerOpen={this.props.setProductPickerOpen}
          />
          <ProductPicker
            setProductPickerOpen={this.props.setProductPickerOpen}
            productPickerModalOpen={this.props.productPickerModalOpen}
            addSelectedProducts={this.props.addSelectedProducts}
          />
        </Page>
      </AppProvider>
    );
  }
}

const mapStateToProps = ({ productPickerModalOpen, products }) => {
  return { productPickerModalOpen, products };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    setProductPickerOpen,
    addSelectedProducts
  };
  return bindActionCreators(actionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
