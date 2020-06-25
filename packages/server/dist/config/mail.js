"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVEL || 'ethereal',
  default: {
    from: {
      // configurações do dominio
      email: 'equipe@gobarber.com',
      name: 'Equipe GoBarber'
    }
  }
};
exports.default = _default;