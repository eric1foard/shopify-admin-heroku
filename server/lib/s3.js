const { promisify } = require('util');
const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('config');
const BUCKET_NAME = config.get('productImageBucket');
const AWS_REGION = config.get('AWSRegion');
const S3_OBJ_ACL = config.get('s3ObjACL');

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const s3 = new AWS.S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const readFile = promisify(fs.readFile);

const s3PutObject = (key, file) =>
  readFile(file.path)
  .then(data =>
    s3.putObject({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: data,
      ACL: S3_OBJ_ACL,
      ContentType: 'image/jpeg' // TODO: set image type conditionally
    })
    .promise()
  );

module.exports = {
  s3PutObject
};