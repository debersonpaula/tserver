var fs = require('fs');
var browserify = require('browserify');

module.exports = function(src,dst,callback){
    
        callback = callback || function(){};
    
        // Create a write stream for the pipe to output to
        var bundleFs = fs.createWriteStream(dst);
    
        var b = browserify({standalone: 'nodeModules'});
        b.add(src);
        b.bundle().pipe(bundleFs);
    
        //now listen out for the finish event to know when things have finished 
        bundleFs.on('finish', function () {
            return callback();
        });
    };