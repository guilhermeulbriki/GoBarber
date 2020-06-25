"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeStorageprovider {
  constructor() {
    this.storage = [];
  }

  async saveFile(file) {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const findIndex = this.storage.findIndex(storageFile => storageFile === file);
    this.storage.splice(findIndex, 1);
  }

}

var _default = FakeStorageprovider;
exports.default = _default;