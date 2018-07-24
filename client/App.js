import React, { Component } from 'react';
import { Page, AppProvider } from '@shopify/polaris';
import ProductList from './containers/ProductList';


class App extends Component {
  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page
          title='Augmented Reality Client'
          primaryAction={{ content: 'Add Products' }}
        >
          <ProductList />
        </Page>
      </AppProvider>
    );
  }
}

export default App;
