const PouchDB = require('pouchdb-node');

module.exports.users = new PouchDB('users');
module.exports.rooms = new PouchDB('rooms');
module.exports.devices = new PouchDB('devices');