import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { StorageFactoryService } from '../storage-factory/storage-factory.service';

@Controller('storage')
export class StorageController {
  private readonly logger = new Logger(StorageController.name);

  constructor(
    /** Dynamic cloud-service instance, passed from storage factory module providers */
    private readonly storageFactory: StorageFactoryService,
  ) {}

  // Retrive files list
  @Get()
  async getFileList() {
    // TODO: add pagination
    return this.storageFactory.listAllFiles();
  }

  // Download single file
  @Get('/:fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ) {
    const file = await this.storageFactory.downloadFile(fileName);
    console.log(file);
    response.setHeader('Content-Type', 'application/octet-stream');
    response.send(file);
  }

  // Get pre signed URL for a file
  @Get('/signed/:fileName')
  async getPreSignedURL(@Param('fileName') fileName: string) {
    return this.storageFactory.getPreSignedUrl(fileName);
  }

  @Post('upload')
  @UseInterceptors(
    // Pass the file in form-data field called "file" from API. As it's specified below.
    FileInterceptor('file', {
      limits: {
        files: 1,
        fields: 0,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.storageFactory.uploadFile(file.buffer, file.originalname);
  }
}
