import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from '../../core';
import { StorageFactoryService } from '../storage-factory/storage-factory.service';

@Controller('storage')
@UseGuards(AuthGuard)
export class StorageController {
  private readonly logger = new Logger(StorageController.name);

  constructor(
    /** Dynamic cloud-service instance, passed from storage factory module providers */
    private readonly storageFactory: StorageFactoryService,
  ) {}

  // Retrive files list
  @Get('/list')
  async getFileList() {
    // TODO: add pagination
    return this.storageFactory.listAllFiles();
  }

  // Download single file
  @Get('/download/:fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ) {
    this.logger.log(`Download file : ${fileName}`);
    if (!fileName || fileName === '') {
      throw new BadRequestException(null, `param 'fileName' is missing`);
    }
    const file = await this.storageFactory.downloadFile(encodeURI(fileName));
    response.setHeader('Content-Type', 'application/octet-stream');
    response.send(file);
  }

  // Get pre signed URL for a file
  @Get('/signed/:fileName')
  async getPreSignedURL(@Param('fileName') fileName: string) {
    if (!fileName || fileName === '') {
      throw new BadRequestException(null, `param 'fileName' is missing`);
    }
    const url = await this.storageFactory.getPreSignedUrl(encodeURI(fileName));
    return {
      url,
    };
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
    if (!file) {
      throw new BadRequestException(
        null,
        `field 'file' is required as form-data`,
      );
    }
    const fileUploadedAtUrl = await this.storageFactory.uploadFile(
      file.buffer,
      encodeURI(file.originalname),
    );
    return {
      url: fileUploadedAtUrl,
    };
  }
}
