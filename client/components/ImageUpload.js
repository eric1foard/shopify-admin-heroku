import React, { Component } from 'react';
import {Banner, Caption, DropZone, List, Stack, Thumbnail} from '@shopify/polaris';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      rejectedFiles: [],
      hasError: false,
    };
  }

  render() {
    const {files, hasError, rejectedFiles} = this.state;

    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = files.length > 0 && (
      <Stack vertical>
        {files.map((file) => (
          <Stack alignment="center">
            <Thumbnail
              size="small"
              alt={file.name}
              source={window.URL.createObjectURL(file)}
            />
            <div>
              {file.name} <Caption>{file.size} bytes</Caption>
            </div>
          </Stack>
        ))}
      </Stack>
    );

    const errorMessage = hasError && (
      <Banner
        title="The following images couldn’t be uploaded:"
        status="critical"
      >
        <List type="bullets">
          {rejectedFiles.map((file) => (
            <List.Item>
              {`"${
                file.name
              }" is not supported. File type must be .gif, .jpg, .png or .svg.`}
            </List.Item>
          ))}
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
            this.setState({
              files: [...this.state.files, ...acceptedFiles],
              rejectedFiles: rejectedFiles,
              hasError: rejectedFiles.length > 0,
            });
          }}
        >
          {uploadedFiles}
          {fileUpload}
        </DropZone>
      </Stack>
    );
  }
}

export default ImageUpload;