import React from 'react';
import { Banner, Caption, DropZone, List, Stack, Thumbnail } from '@shopify/polaris';

const ImageUpload = (props) => {
  console.log('ImageUpload props ', props);
  const { meta: { error }, input: { onChange, value = null } } = props;
  const file = value;

  const fileUpload = !file && <DropZone.FileUpload />;

  const uploadedFiles = file && (
    <Stack vertical>
      <Stack alignment="center">
        <img
          alt={file.name}
          src={window.URL.createObjectURL(file)} // TODO: need to revokeObjectURL to avoid mem leak?
        />
        <div>
          {file.name} <Caption>{file.size} bytes</Caption>
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