import React, { Component } from 'react';
import { Page, AppProvider, Card } from '@shopify/polaris';

import ApiConsole from './components/ApiConsole'

class App extends Component {
  render() {
    // const { apiKey, shopOrigin } = window;
    const apiKey = '1266a4cd165d4601d944a9760f2747ba',
    shopOrigin = 'https://ericfteststore.myshopify.com';
    console.log('api key: ', apiKey);
    console.log('shopOrigin', shopOrigin);

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page title="Example application">
        <Card sectioned>
          Insert the rest of your app here, including those components detailed
          below, which can now communicate with the Embedded App SDK.
        </Card>
      </Page>
      </AppProvider>
    );
  }
}

export default App;
