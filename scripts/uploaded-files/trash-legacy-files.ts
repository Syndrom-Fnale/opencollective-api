#!/usr/bin/env ./node_modules/.bin/babel-node

/**
 * This script assumes that all files still being used have been recorded to the `UploadedFile` table (using `scripts/uploaded-files/record-existing-files.ts`).
 * It will move all files that are in S3 but not in the database to a trash folder by prepending `trash/` to the key.
 */

import '../../server/env';

import config from 'config';

import { listFilesInS3 } from '../../server/lib/awsS3';
import logger from '../../server/lib/logger';

const main = async () => {
  // Fetch all files in S3
  await listFilesInS3(config.aws.s3.bucket);
  logger.info('Done');
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
