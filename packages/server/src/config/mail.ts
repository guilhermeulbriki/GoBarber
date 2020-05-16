interface IMailConfig {
  driver: 'ethereal' | 'mailgun';

  default: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVEL || 'ethereal',

  default: {
    from: {
      // configurações do dominio
      email: 'equipe@gobarber.com',
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
