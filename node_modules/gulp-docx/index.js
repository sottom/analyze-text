'use strict';
const DocxGen = require('docxtemplater');
const through2 = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

module.exports = () => {
  return through2.obj((file, enc, cb) => {
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new PluginError('[gulp-docx]: ', 'Stream is not supported'));
    file.contents = new Buffer(new DocxGen(file.contents).getFullText());
    cb(null, file);
  });
};
