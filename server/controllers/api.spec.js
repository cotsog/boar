'use strict';
var request = require('supertest');
var sinon = require('sinon');
var app = require('../server_listen');
var Todo = require('../models/todo');

describe('ApiController', function() {
  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function() {
    this.sinon.restore();
  });

  it('should work', function(done) {
    var result = [{title: 'First'}];
    var findStub = {exec: function() {return result;}};
    this.sinon.stub(Todo, 'find').returns(findStub);

    request(app)
      .get('/api/todos')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.eql(result);

        done(err);
      });
  });
});