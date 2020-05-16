import mailConfig from '@config/mail';
import { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import mailgun from 'mailgun-js';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const mailGun = mailgun({
      apiKey: 'e9472d11b3e74ebc880d57bf1971d6f8-3e51f8d2-120fc70d',
      domain: 'sandboxd95e41dc795b43518dd80e8f0094186a.mailgun.org',
    });

    const { name, email } = mailConfig.default.from;

    const dataMail = {
      from: `${from?.name || name} <${from?.email || email}>`,
      to: `${to.name}, ${to.email}`,
      subject,
      text: await this.mailTemplateProvider.parse(templateData),
    };

    mailGun.messages().send(dataMail);
  }
}
