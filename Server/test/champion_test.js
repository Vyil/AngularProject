const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Champion = require('../models/champion');
const Assert = require('assert');

chai.should();
chai.use(chaiHttp);

let authToken = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDU0ODMxNTMsImlhdCI6MTU0NDYxOTE1Mywic3ViIjoiNWMwN2QyY2I4NTMwNTQwNDQ0NTZhMTY1In0.Uj4ypCFpCGBgbnE2f8FcviaqjrcduzaVa6hLvx9X0Ic';

describe('Champion tests', function () {
    this.timeout(5000);

    let testChamp;
    beforeEach((done) => {
        Champion.findOne({
                name: 'testChampion'
            })
            .then(result => {
                if (!result) {
                    testChamp = new Champion({
                        name: 'testChampion',
                        level: 1,
                        quality: 'Bronze',
                        owner: '5c07f008986a2836d4bf7f2c'
                    })
                    newChamp.save(() => {
                        done();
                    })
                    done();
                }
            })
            .catch(done())
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

});