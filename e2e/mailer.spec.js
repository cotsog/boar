'use strict';
var MailerPage = require('./mailer.po');

describe('MailerPage', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = new MailerPage();
  });

  it('should have header filled out', function() {
    expect(page.header.getText()).to.eventually.eql('Mailer');
  });
});