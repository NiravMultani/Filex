import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
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
    return this.storageFactory.listAllFiles();
  }

  // Download single file
  @Get('/:fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ) {
    const file = await this.storageFactory.downloadFile(fileName);
    response.download(file);
  }

  // Get pre signed URL for a file
  @Get('/:fileName')
  async getPreSignedURL(@Param('fileName') fileName: string) {
    return this.storageFactory.getPreSignedUrl(fileName);
  }

  // TODO: Upload file
}
