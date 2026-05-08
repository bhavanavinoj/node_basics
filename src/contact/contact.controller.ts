import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { MailService } from '../mail/mail.service';

import { CreateContactDto } from './dto/createContact.dto';

@Controller('contact')
export class ContactController {

  constructor(
    private readonly mailService: MailService,
  ) {}

  @Post()
  async sendMessage(
    @Body() body: CreateContactDto,
  ) {

    await this.mailService.sendContactMailToAdmin(
      body.name,
      body.email,
      body.phone,
      body.subject,
      body.message,
    );

    return {
      success: true,
      message: 'Message sent successfully',
    };
  }
}