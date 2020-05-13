import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailCOntact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailCOntact;
  from?: IMailCOntact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
