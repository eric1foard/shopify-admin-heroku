import React, { Component } from 'react';
import { Page, AppProvider, Button } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/polaris/embedded';

class App extends Component {
  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page
          title="My application"
          breadcrumbs={[{ content: 'Home', url: '/foo' }]}
          primaryAction={{ content: 'Add something' }}
        >
          <h1>boom!</h1>

          <ResourcePicker
            products
            allowMultiple
            open={true}
            onSelection={(resources) => {
              console.log('Selected products: ', resources.products);
              // this.setState({ open: false });
            }}
            // onCancel={() => this.setState({ open: false })}
          />
          
        </Page>
        <Button primary>Cool button!</Button>
      </AppProvider>
    );
  }
}

export default App;
