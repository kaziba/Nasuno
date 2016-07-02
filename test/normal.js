'use strict';

const assert = require('assert');
const Index = require('../');

describe('normal', () => {

  it('1 + 1 === 2', () => {
    assert(1 + 1 === 2);
  });

  it('exec', (done) => {
    Index.getExpensiveItemList().then( _ => {
      done();
    });
  });
});
