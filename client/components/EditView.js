import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { Form, FormLayout, Layout, Card, TextField, Button } from '@shopify/polaris';
import ImageUpload from './ImageUpload';

const METAFIELD_NS = 'AUG-REALITY-CLIENT';

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
)

class EditView extends Component {
  render() {
    return (
      <Form onSubmit={() => this.props.handleSubmit()}>
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
  renderImageCardContent(ARImage, title) {
    // if (ARImage.src) {
    //   //TODO: provide alt based on product name
    //   return <img src={ARImage.src} alt={title} />;
    // }
    return <ImageUpload />;
  }
}

const resolveMetafield = (metafields, key, defaultVal) => {
  const targetMetafield = metafields.find(m => m.namepace === METAFIELD_NS && m.key === key);
  return targetMetafield ? targetMetafield.value : defaultVal;
};

const mapStateToProps = (state, ownProps) => {
  const metafields = ownProps.product.metafields;
  return {
    initialValues: {
      height: resolveMetafield(metafields, 'height', 0),
      width: resolveMetafield(metafields, 'height', 0)
    }
  }
};

EditView = reduxForm({ form: 'product-edit' })(EditView);
EditView  = connect(mapStateToProps)(EditView);
export default EditView;
