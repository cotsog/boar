### BOAR Stack
[![Dependency Status](https://david-dm.org/blacksonic/boar.svg)](https://david-dm.org/blacksonic/boar)
[![Build Status](https://api.travis-ci.org/blacksonic/boar.svg?branch=master)](https://travis-ci.org/blacksonic/boar)

BOAR Stack is a boilerplate that provides a nice starting point for full-stack ES6 JavaScript web development with [Koa](http://koajs.com/), [AngularJS](http://angularjs.org/), and [io.js](http://www.iojs.org/) along with [MongoDB](https://www.mongodb.org/). A summary of tech stack:
* **Client**: AngularJS and Twitter Bootstrap with Jade partials put together with Browserify and Babel.
* **Server**: Koa for RESTful API on top of io.js.
* Gulp tasks are used to facilitate development and testing.
* MongoDB for persistence accessed with Mongoose.

## Live Example
Not yet available.

## Getting Started
Make sure that you have io.js and MongoDB (running on the default port 27017) installed on your computer. To get started with BOAR Stack, do following:

```bash
git clone --depth 1 https://github.com/blacksonic/boar.git
cd koan
npm install
npm start
```

Your application should run on the 9100 port so in your browser just go to [http://localhost:9100](http://localhost:9100). If you want to run tests, simply type:

```bash
npm test
```

## Testing
You can run all the tests with `npm test`. Tests are run with:
* Client: Mocha + Chai + Karma
* E2E: Mocha + Chai + Protractor
* Server: Mocha + Chai + SuperTest

Server tests utilize [co](https://github.com/tj/co) so you can use `*`/`yield` expressions while writing tests.

## Credits
Client side is based on the official: [Angular TodoMVC](http://todomvc.com/examples/angularjs/). Server side simply utilizes generally accepted Koa middleware and Node.js best practices.