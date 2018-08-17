import React, { Component } from 'react';
import reduxForm from 'redux-form/es/reduxForm';
import Field from 'redux-form/es/Field';
import { connect } from 'react-redux';
import { Form, FormLayout, Layout, Card, TextField, Button } from '@shopify/polaris';
import ImageUpload from './ImageUpload';
import { ACCEPTED_FILETYPES, EDIT_FORM_NAME } from '../../utils/constants';

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
  let { height, width, image } = values;
  const errors = {};
  height = parseInt(height);
  width = parseInt(width);
  
  if (typeof height !== 'number' || isNaN(height)) {
    errors.height = 'Height must be a numbers'
  }
  else if (height <= 0) {
    errors.height = 'Height must be greater than zero'
  } else if (!height) {
    errors.height = 'Height is required';
  }
  if (typeof width !== 'number' || isNaN(width)) {
    errors.width = 'Width must be a numbers'
  }
  if (width <= 0) {
    errors.width = 'Width must be greater than zero'
  } else if (!width) {
    errors.width = 'Width is required';
  }
  
  // TODO: eventually, I should validate image dimension here
  // if type is string, then image was uploaded previously so
  // validation not needed
  if (image && typeof image !== 'string') {
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
        {/* <Button submit>Save</Button> */}
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
  const { height, width, image } = ownProps.product;
  return {
    initialValues: {
      height,
      width,
      image
    }
  }
};

EditView = reduxForm({
  form: EDIT_FORM_NAME,
  validate
})(EditView);
EditView  = connect(mapStateToProps)(EditView);
export default EditView;
