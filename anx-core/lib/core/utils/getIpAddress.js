"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIpAddress = void 0;

var os = require('os');

var getIpAddress = function getIpAddress() {
  var interfaces = os.networkInterfaces();

  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

exports.getIpAddress = getIpAddress;