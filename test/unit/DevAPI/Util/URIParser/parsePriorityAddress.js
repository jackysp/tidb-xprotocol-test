'use strict';

/* eslint-env node, mocha */

const parsePriorityAddress = require('@mysql/xdevapi/lib/DevAPI/Util/URIParser/parsePriorityAddress');
const expect = require('chai').expect;

describe('parsePriorityAddress', () => {
    it('should parse a valid address tuple containing an explicit priority', () => {
        expect(parsePriorityAddress('(address=127.0.0.1:33060, priority=90)')).to.deep.equal({ host: '127.0.0.1', port: 33060, priority: 90, socket: undefined });
    });

    it('should throw an error if the tuple does not contain a valid priority', () => {
        ['()', '(address=127.0.0.1,)', '(address=[::1]:33060, 90)', '(address=localhost, foo=90)', '(address=[::], foo)'].forEach(invalid => {
            expect(() => parsePriorityAddress(invalid)).to.throw('You must either assign no priority to any of the routers or give a priority for every router');
        });
    });

    it('should throw an error if the priority is out of bounds', () => {
        ['(address=[::1]:33060, priority=-1)', '(address=[::], priority=101)'].forEach(invalid => {
            expect(() => parsePriorityAddress(invalid)).to.throw('The priorities must be between 0 and 100');
        });
    });
});
