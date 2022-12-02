const { type } = require('express/lib/response');
const gate = require('../model/gate');
const User = require('../model/user');
const moment = require('moment');

class Gate {
  static getGateDetails = async (data) => {
    try {
      let gates = await gate.find();
      if (gates) {
        return gates;
      } else {
        console.log('No Records found ');
        return false;
      }
    } catch (err) {
      console.log(err);
      console.log('Some unexpected error occured while Getting Gate Details');
    }
  };
}
module.exports.Gate = Gate;
