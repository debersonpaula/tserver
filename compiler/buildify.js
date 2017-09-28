var buildify = require('buildify');

module.exports = function(src,dst){
    buildify()
        .load(src)
        .uglify()
        .save(dst);
}