var sass = require('node-sass');
var fs = require('fs');
module.exports = function(src,dst,callback){
    sass.render({
        file: src,
        outputStyle: 'compressed'
        //outFile: dst
    },function(err, result){
        if (err)
            throw err
        else
            fs.writeFile(dst, result.css, function(err){
                if(!err){
                    callback && callback();
                }
            });
    });
}