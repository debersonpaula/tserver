var buildify = require('buildify');
module.exports = function(src,dst){
    buildify('',{quiet:true})
        .load(src)
        .uglify()
        .save(dst);
}