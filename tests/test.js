
function run(name) {
  require('child_process')
  .execSync(`./index.js start tests/examples/.${name}`, { stdio:[0] });
}

const chai = require('chai');
let { assert, expect } = chai;

describe('mertrc-error', function () {
  this.timeout(20000);
  it('should throw an error', function () {
    expect(() => {
      run('mertrc-error');
    }).to.throw(Error);
  });
});


const examples = [
  'mertrc-base',
  'mertrc-tabs',
  'mertrc-windows-and-tabs',
  'mertrc-launch-strategy-tab',
  'mertrc-launch-strategy-in_place',
  'mertrc-profile',
];

examples.forEach((example) => {
  describe(example, function () {
    this.timeout(20000);
    it('should not throw an error', function (done) {
      expect(() => {
        run(example);
        done();
      }).to.not.throw(Error);
    });
  });
});
