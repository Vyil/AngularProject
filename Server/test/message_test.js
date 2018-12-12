const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Message = require('../models/message');
const User = require('../models/user');
const Assert = require('assert');

chai.should();
chai.use(chaiHttp);

let authToken = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDU0ODMxNTMsImlhdCI6MTU0NDYxOTE1Mywic3ViIjoiNWMwN2QyY2I4NTMwNTQwNDQ0NTZhMTY1In0.Uj4ypCFpCGBgbnE2f8FcviaqjrcduzaVa6hLvx9X0Ic';

describe('Message tests', function () {
    this.timeout(5000);

    let testMessage;
    let user;
    before((done) => {
        User.findOne({
                userName: 'Vyil'
            })
            .then(rslt => {
                Message.findOne({
                        content: 'testcontent123'
                    })
                    .then(result => {
                        testMessage = new Message({
                            author: rslt,
                            authorName: rslt.userName,
                            recipient: rslt,
                            content: 'testcontent123'
                        })
                        testMessage.save();
                        done();

                    })
            })
    });

    it('can get user messages', (done) => {
        Message.findOne({
                content: 'testcontent123'
            })
            .then(result => {
                chai.request(server)
                    .get('/api/message/')
                    .set('Authorization', authToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            })
    });

    it('can delete a message', (done) => {
        Message.findOne({
                content: 'testcontent123'
            })
            .then(result => {
                chai.request(server)
                    .delete('/api/message/' + result._id)
                    .set('Authorization', authToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            })
    });

});