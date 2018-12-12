const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Champion = require('../models/champion');
const User = require('../models/user');
const Assert = require('assert');

chai.should();
chai.use(chaiHttp);

let authToken = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDU0ODMxNTMsImlhdCI6MTU0NDYxOTE1Mywic3ViIjoiNWMwN2QyY2I4NTMwNTQwNDQ0NTZhMTY1In0.Uj4ypCFpCGBgbnE2f8FcviaqjrcduzaVa6hLvx9X0Ic';

describe('Champion tests', function () {
    this.timeout(5000);

    let testChamp;
    let user;
    before((done) => {
        User.findOne({
                userName: 'Vyil'
            })
            .then(rslt => {
                Champion.findOne({
                        name: 'testChampion'
                    })
                    .then(result => {
                        testChamp = new Champion({
                            name: 'testChampion',
                            level: 1,
                            quality: 'Bronze',
                            owner: rslt
                        })
                        testChamp.save();
                        done();

                    })
            })
    });

    it('can get a specific champion', (done) => {
        Champion.findOne({
                name: 'testChampion'
            })
            .then(result => {
                chai.request(server)
                    .get('/api/champion/' + result._id)
                    .set('Authorization', authToken)
                    .end((err, res) => {
                        res.body.should.have.property('level');
                        res.body.should.have.property('quality');
                        res.body.should.have.property('name');
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            })

    });

    it('can get all champions', (done) => {
        chai.request(server)
            .get('/api/champion/')
            .set('Authorization', authToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('can delete a champion', (done) => {
        Champion.findOne({
                name: 'testChampion'
            })
            .then(result => {
                chai.request(server)
                    .delete('/api/champion/' + result._id)
                    .set('Authorization', authToken)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            })
    });

});