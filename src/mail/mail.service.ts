import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import registrationTemplate from './template/registration.template';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string); 
  }

  async sendRegistrationEmail(toEmail: string, name: string) {
    console.log('SENDGRID MAIL CALLED');

    await sgMail.send({
      to: toEmail,
      from: process.env.MAIL_FROM || 'bhavanavinoj12@gmail.com', 
      subject: 'Registration Successful',
      text: `Hello ${name}, your account is ready.`, 
      html: registrationTemplate(name),
    });
  }
}