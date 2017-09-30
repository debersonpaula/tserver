# TServer

This component uses compilation logic TBB (TypeScript + Browserify + Buildify).
More details on https://github.com/debersonpaula/example-tbb

## Installing dependencies:
`npm install`

## To compile:
`node build.js`

## To run the application compiled:
`node index.js`

## To compile and run:
 - It will run node build.js && node index.js:
 `npm start`


## Directory/File Package Details
 - index.js = initial NodeJS file to run the compiled application
 - build.js = script to run all compilation tasks
 - server.json = configuration of TServer object
 - src = directory with all sources of project
    - server.ts = script with the server application
    - client.ts = script with the client application (will be compilied and distributed thru public folder)
 - public = for static route and serve files to the public usage
 - bin = folder with compiled files for the server and client application


## Working on

 I'm still working on this component, some features are still unavailable.
 
## Frameworks used on

 - body-parser
 - browserify
 - buildify
 - express
 - mongoose
 - react
 - react-dom
 - typescript