import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

import registrationTemplate from './template/registration.template';
import contactAdminTemplate from './template/contactAdmin.template';
import contactUserReplyTemplate from './template/contactUserReply.template';

@Injectable()
export class MailService {

  constructor() {
    sgMail.setApiKey(
      process.env.SENDGRID_API_KEY as string,
    );
  }

  // Registration Mail
  async sendRegistrationEmail(
    toEmail: string,
    name: string,
  ) {

    console.log('SENDGRID REGISTRATION MAIL');

    await sgMail.send({
      to: toEmail,

      from:
        process.env.MAIL_FROM ||
        'bhavanavinoj12@gmail.com',

      subject: 'Registration Successful',

      text: `Hello ${name}, your account is ready.`,

      html: registrationTemplate(name),
    });
  }

  // Contact Mail To Admin + Auto Reply To User
  async sendContactMailToAdmin(
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
  ) {

    console.log('SENDGRID CONTACT MAIL');

    // MAIL TO ADMIN
    await sgMail.send({

      to:
        process.env.ADMIN_EMAIL ||
        'bhavanavinoj12@gmail.com',

      from:
        process.env.MAIL_FROM ||
        'bhavanavinoj12@gmail.com',

      replyTo: email,

      subject: `New Contact Enquiry from ${name}`,

      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,

      html: contactAdminTemplate(
        name,
        email,
        phone,
        subject,
        message,
      ),
    });

    // AUTO REPLY TO USER
    await sgMail.send({

      to: email,

      from:
        process.env.MAIL_FROM ||
        'bhavanavinoj12@gmail.com',

      subject: 'We Received Your Query',

      html: contactUserReplyTemplate(name),
    });
  }
}