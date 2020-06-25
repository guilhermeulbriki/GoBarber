"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mail = _interopRequireDefault(require("../../../../../config/mail"));

var _tsyringe = require("tsyringe");

var _mailgunJs = _interopRequireDefault(require("mailgun-js"));

var _IMailTemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailTemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.default === "undefined" ? Object : _IMailTemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class SESMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;
  }

  async sendMail({
    to,
    subject,
    from,
    templateData
  }) {
    const mailGun = (0, _mailgunJs.default)({
      apiKey: 'e9472d11b3e74ebc880d57bf1971d6f8-3e51f8d2-120fc70d',
      domain: 'sandboxd95e41dc795b43518dd80e8f0094186a.mailgun.org'
    });
    const {
      name,
      email
    } = _mail.default.default.from;
    const dataMail = {
      from: `${(from === null || from === void 0 ? void 0 : from.name) || name} <${(from === null || from === void 0 ? void 0 : from.email) || email}>`,
      to: `${to.name}, ${to.email}`,
      subject,
      text: await this.mailTemplateProvider.parse(templateData)
    };
    mailGun.messages().send(dataMail);
  }

}, _temp)) || _class) || _class) || _class) || _class);
exports.default = SESMailProvider;