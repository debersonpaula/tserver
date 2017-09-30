const sass = require('./compiler/sass')

//compile client.scss file
process.stdout.write('\nStart compile sass...');
sass('./src/sass/client.scss','./public/client.css',function(){
    process.stdout.write('compiled!\n');
});

console.log('Compiliation finished \n=================================');