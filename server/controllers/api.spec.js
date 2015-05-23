'use strict';
var request = require('supertest');
var app = require('../server_listen');
var Todo = require('../models/todo');

describe('ApiController', function() {
  var exampleTodo = {title: 'First task', complete: false};

  it('should list todos', function(done) {
    var result = [exampleTodo];
    var findStub = {exec: function() {return result;}};
    this.sinon.stub(Todo, 'find').returns(findStub);

    request(app)
      .get('/api/todos')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.eql(result);
        expect(Todo.find).to.have.been.called;

        done(err);
      });
  });

  it('should create todo', function(done) {
    this.sinon.stub(Todo, 'create').returns(exampleTodo);

    request(app)
      .post('/api/todos')
      .send({title: 'First task'})
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.eql(exampleTodo);
        expect(Todo.create).to.have.been.calledWith({title: 'First task'});

        done(err);
      });
  });

  it('should update todo', function(done) {
    var findStub = {exec: function() {return exampleTodo;}};
    this.sinon.stub(Todo, 'findOneAndUpdate').returns(findStub);

    request(app)
      .put('/api/todos/1')
      .send({title: 'First task'})
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.eql(exampleTodo);
        expect(Todo.findOneAndUpdate).to.have.been.calledWith({_id: '1'}, {title: 'First task'});

        done(err);
      });
  });

  it('should delete todo', function(done) {
    var findStub = {exec: function() {return exampleTodo;}};
    this.sinon.stub(Todo, 'findOneAndRemove').returns(findStub);

    request(app)
      .delete('/api/todos/1')
      .expect(200)
      .end(function(err, res){
        expect(res.body).to.eql(exampleTodo);
        expect(Todo.findOneAndRemove).to.have.been.calledWith({_id: '1'});

        done(err);
      });
  });
});