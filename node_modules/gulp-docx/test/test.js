'use strict';
const should = require('should');
const path = require('path');
const runSeq = require('run-sequence');
const fs = require('fs');
const CWD = process.cwd();
const testPath = path.join(CWD, 'test');
const docx = require('../index');
const es = require('event-stream');
const File = require('vinyl');

function runTest(testCase) {
  let casePath = path.join(testPath, testCase.name);
  return new Promise(resolve => {
    process.chdir(casePath);
    let gulpInst = require(path.join(casePath, 'gulpfile'));
    runSeq.use(gulpInst)('default', () => {
      process.chdir(CWD);
      resolve();
    });
  });
}

const Cases = [{
  desc: 'convert successfully',
  name: 'docx'
}];

let chain = Promise.resolve();

Cases.forEach(testCase => chain = chain.then(() => runTest(testCase)));

chain.then(() => {
  describe('gulp-docx', () => {
    Cases.map(function(testCase) {
      it(testCase.desc, function() {
        fs.readFileSync(path.join(testPath, testCase.name, 'build', 'test.txt'), 'UTF-8').should.eql('Hello World!');
      });
    });
    it('Do nothing if file is null', (done) => {
      let myDocx = docx();
      myDocx.write(new File({
        contents: null
      }));
      myDocx.once('data', rst => {
        should(rst.contents).be.null;
        done();
      });
    });
    it('Throw PluginError if file is stream', () => {
      (() => {
        let myDocx = docx();
        myDocx.write(new File({
          contents: es.readArray(['some', 'array'])
        }));
      }).should.throw(Error);
    });
  });
  run();
}).catch(function(e) {
  throw e;
});
