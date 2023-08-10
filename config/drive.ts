/* eslint-disable prettier/prettier */
/**
 * Config source: https://git.io/JBt3o
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import { driveConfig } from '@adonisjs/core/build/config'

/*
|--------------------------------------------------------------------------
| Drive Config
|--------------------------------------------------------------------------
|
| The `DriveConfig` relies on the `DisksList` interface which is
| defined inside the `contracts` directory.
|
*/
export default driveConfig({
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk to use for managing file uploads. The value is driven by
  | the `DRIVE_DISK` environment variable.
  |
  */
  disk: Env.get('DRIVE_DISK'),

  disks: {
   
    local: {
      driver: 'local',
      visibility: 'public',

      root: Application.tmpPath('uploads'),

      basePath: '/uploads',
    },

    s3: {
      driver: "s3",
      visibility: "public",
      key: Env.get("S3_KEY"),
      secret: Env.get("S3_SECRET"),
      region: Env.get("S3_REGION"),
      bucket: Env.get("S3_BUCKET"),
      endpoint: Env.get("S3_ENDPOINT"),
    },
  },
})
