const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/user');
const Assert = require('assert');

chai.should();
chai.use(chaiHttp);

let authToken = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDU0ODMxNTMsImlhdCI6MTU0NDYxOTE1Mywic3ViIjoiNWMwN2QyY2I4NTMwNTQwNDQ0NTZhMTY1In0.Uj4ypCFpCGBgbnE2f8FcviaqjrcduzaVa6hLvx9X0Ic';

describe('User tests', function () {
    this.timeout(5000);

    let user;
    before((done) => {
        let user = new User({
            firstName: 'testGuy',
            lastName: 'The tester',
            userName: 'TestUser',
            password: 'password'
        });
        user.save()
            .then(done())
    });

    it('can log in a user', (done) => {

        chai.request(server)
            .post('/api/login/')
            .send({
                userName:'TestUser',
                password:"password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });

    it('can delete a user',(done)=>{
        User.findOne({userName:'TestUser'})
        .then(result=>{
            chai.request(server)
            .delete('/api/user/'+result._id)
            .set('Authorization', authToken)
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            })
        })
    })
});