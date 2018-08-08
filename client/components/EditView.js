import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Form, FormLayout, Layout, Card, TextField, Button } from '@shopify/polaris';
import ImageUpload from './ImageUpload';
import { resolveMetafield } from '../../utils/metafields';
import { ACCEPTED_FILETYPES } from '../../utils/constants';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
);

const validate = values => {
  const { height, width, image } = values,
  errors = {},
  ZERO = '0';

  if (height === ZERO) {
    errors.height = 'Height cannot be 0'
  } else if (!height) {
    errors.height = 'Height is required';
  }
  if (width === ZERO) {
    errors.width = 'Width cannot be 0'
  } else if (!width) {
    errors.width = 'Width is required';
  }
  
  // TODO: eventually, I should validate image dimension here
  if (image) {
    const { name } = image;
    const dotPos = name.lastIndexOf('.');
    if (dotPos < 0) error.image = true;
    const ftype = name.slice(dotPos, name.length).toLowerCase();
    if (!ACCEPTED_FILETYPES.includes(ftype)) {
      errors.image = true;
    }
    
  }
  return errors;
};

class EditView extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Layout.AnnotatedSection
          title="Product image"
          // TODO: description of how to upload a good photo with no borders
          description="This is the image your customers will see when the view this product in AR."
        >
          <Card sectioned>
            {this.renderImageCardContent()}
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Product dimensions"
          description="Provide the dimensions of the product in inches."
        >
          <Card sectioned>
            <FormLayout>
              <Field name="height" label="Height" component={renderTextField} type="number" />
              <Field name="width" label="Width" component={renderTextField} type="number" />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        {/*TODO: better placement of this button*/}
        <Button submit>Save</Button>
      </Form>
    );
  }

  // TODO: show image if it is available
  renderImageCardContent() {
    // if (ARImage.src) {
    //   //TODO: provide alt based on product name
    //   return <img src={ARImage.src} alt={title} />;
    // }
    return <Field name="image" label="Image" component={ImageUpload} type="file" />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const metafields = ownProps.product.metafields;
  return {
    initialValues: {
      height: resolveMetafield(metafields, 'height', '').value,
      width: resolveMetafield(metafields, 'width', '').value,
      image: resolveMetafield(metafields, 'image', null).value
    }
  }
};

EditView = reduxForm({
  form: 'product-edit',
  validate
})(EditView);
EditView  = connect(mapStateToProps)(EditView);
export default EditView;
