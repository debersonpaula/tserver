const tsc = require('./compiler/tsc');
const browserify = require('./compiler/browserify');
const buildify = require('./compiler/buildify');

//compile TypeScript and place compiled files in bin folder
process.stdout.write('Start compile on tsc...');
tsc('tsconfig.json');
process.stdout.write('compiled!');

//browserify the client.js script and place in public folder
process.stdout.write('\nStart compile on browserify...');
browserify('./bin/client.js','./public/client.js',function(){
    process.stdout.write('compiled!');
    //minify the client.js file
    process.stdout.write('\nStart compile on buildify...');
    buildify('./public/client.js','./public/client.js')
    process.stdout.write('compiled!\n');
    console.log('Compiliation finished \n=================================');
});