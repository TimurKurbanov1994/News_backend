import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

class FileService {
  bucketConfig: AWS.S3.ClientConfiguration = {
    accessKeyId: process.env.S3_ID,
    region: process.env.S3_REGION,
    secretAccessKey: process.env.S3_KEY,
    endpoint: process.env.S3_ENDPOINT,
  };
  public async configS3() {
    return new S3(this.bucketConfig);
  }
  public async uploadImage(image: Buffer, titleNews: string) {
    const fileName = titleNews + '.jpg';
    return await this.configS3()
      .then((s3) =>
        s3
          .upload({ Bucket: process.env.S3_BUCKET, Key: fileName, Body: image })
          .promise(),
      )
      .then(() => {
        return { status_image: 'Successfully loaded to AWS S3' };
      })
      .catch(() => {
        return { status_image: 'Failed loaded to AWS S3' };
      });
  }

  public async deleteImage(titleNews: string) {
    return await this.configS3().then((data) => {
      const fileName = titleNews + '.jpg';
      return data
        .deleteObject({ Bucket: process.env.S3_BUCKET, Key: fileName })
        .promise()
        .then(() => {
          return { status_image: 'Successfully deleted to AWS S3' };
        })
        .catch(() => {
          return { status_image: 'Failed deleted to AWS S3' };
        });
    });
  }

  public async changeName(oldName, newTitle) {
    return await this.configS3().then((data) => {
      const fileName = newTitle + '.jpg';
      return data
        .copyObject({
          Bucket: process.env.S3_BUCKET,
          CopySource: `${process.env.S3_BUCKET}/${oldName + '.jpg'}`,
          Key: fileName,
        })
        .promise()
        .then(() => {
          return { status_image: 'Successfully replaced to AWS S3' };
        })
        .catch((e) => {
          return { status_image: 'Failed replaced to AWS S3', error: e };
        });
    });
  }
}

export default FileService;
