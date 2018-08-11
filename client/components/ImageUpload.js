import React from 'react';
import { Banner, Caption, DropZone, List, Stack } from '@shopify/polaris';

const renderCaption = (name, size) => {
  if (name && size) {
    return <div>
      {name} <Caption>{size} bytes</Caption>
    </div>
  }
  return null;
}

const ImageUpload = (props) => {
  const { meta: { error }, input: { onChange, value = '' } } = props;
  const file = value;
  const fileUpload = !file && <DropZone.FileUpload />;
  // TODO: need to revokeObjectURL to avoid mem leak?
  const imgSrc = typeof file === 'string' ? file : window.URL.createObjectURL(file);
  const uploadedFiles = file && (
    <Stack vertical>
      <Stack alignment="center">
        <img
          alt={file.name || 'product image'}
          src={imgSrc}
        />
        <div>
          {renderCaption(file.name, file.size)}
        </div>
      </Stack>
    </Stack>
  );

  const errorMessage = error && (
    <Banner
      title="Image couldn’t be uploaded"
      status="critical"
    >
      <List type="bullets">
        <List.Item>
          {`"${
            file.name
            }" is not supported. File type must be .gif, .jpg, .png or .svg.`}
        </List.Item>
      </List>
    </Banner>
  );

  // TODO: need to adjust below what kind of images are accepted?
  return (
    <Stack vertical>
      {errorMessage}
      <DropZone
        accept="image/*"
        type="image"
        onDrop={(files, acceptedFiles, rejectedFiles) => {
          return onChange(files[0]);
        }}
      >
      {uploadedFiles}
      {fileUpload}
      </DropZone>
    </Stack>
  );
};

export default ImageUpload;