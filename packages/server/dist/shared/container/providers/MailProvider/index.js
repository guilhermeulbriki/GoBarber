"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _MailGunProvider = _interopRequireDefault(require("./implementations/MailGunProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  mailgun: _tsyringe.container.resolve(_MailGunProvider.default)
};

_tsyringe.container.registerInstance('MailProvider', providers[_mail.default.driver]);