'use strict';

var net = require('net');

function TCPProtocol(addr, handleReceiveData) {
  this.addr = addr;
  this.handleReceiveData = handleReceiveData;
  this.serial = null;
  this.try = 0;
  this.closed = false;
  this.connected = false;

  this.connect();
};

TCPProtocol.prototype.connect = function() {
  if(!this.closed) {
    var self = this;

    this.try += 1;

    console.log("Try #" + this.try);
    this.serial = new net.Socket();
    this.serial.on('error', function(error) {
      console.log('failed to open: ' + error);
    });
    this.serial.on('close', function() {
      console.log('close');
      self.connected = false;
      setTimeout(function() {self.connect()}, 1000);
    });
    this.serial.on('data', function(data) {
      self.receiveData(data);
    });

    var data = this.addr.split(':');

    this.serial.connect(data[1], data[0], function() {
        console.log('open');
        self.try = 0;
        self.serial.setNoDelay(true);
        self.serial.write("USART1\n");
        self.connected = true;
    });
  }
};

TCPProtocol.prototype.send = function(data) {
  if(this.connected) {
  console.log("SEND: " + data);
    this.serial.write(data + "\n", function() {});
  }
};

TCPProtocol.prototype.receiveData = function(buffer) {
  if(this.handleReceiveData != null) {
    this.handleReceiveData(buffer);
  }
};

TCPProtocol.prototype.close = function() {
  if(this.serial != null) {
    this.connected = false;
    this.serial.destroy();
    this.serial = null;
    this.closed = true;
  }
}

var create = function(addr, handleReceiveData) {
  return new TCPProtocol(addr, handleReceiveData);
};

exports.create = create;
