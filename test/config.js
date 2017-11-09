"use strict";

global.chai = require("chai");
chai.config.includeStack = true;
const chaiAsPromised = require("chai-as-promised"),
    spies = require('chai-spies');

chai.use(chaiAsPromised);
chai.use(spies);

global.mysqlx = require('@mysql/xdevapi');
global.Client = require('@mysql/xdevapi/lib/Protocol/Client');
global.Server = require('@mysql/xdevapi/lib/Protocol/Server');
global.Encoding = require('@mysql/xdevapi/lib/Protocol/Encoding');
global.Messages = require('@mysql/xdevapi/lib/Protocol/Messages');

global.nullStream = {
    on: function () {},
    write: function () {}
};

global.NullStreamFactory = {
    createSocket: function () {
        return new Promise(function (resolve) {
            resolve(nullStream);
        });
    }
};

var NullAuth = require('@mysql/xdevapi/lib/Authentication/NullAuth');

global.mysqlxtest = {
    getNullSession: function (done) {
        return mysqlx.getSession({
            authMethod: "NULL",
            socketFactory: NullStreamFactory
        }).catch(function (err) {
            done(err);
        });
    }
};
