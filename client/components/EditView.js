import { FormLayout, TextField } from '@shopify/polaris';
import React, { Component } from 'react';

class EditView extends Component {
  render() {
    return <FormLayout>
    <TextField label="Store name" onChange={() => {}} />
    <TextField type="email" label="Account email" onChange={() => {}} />
  </FormLayout>
  }
}

export default EditView;