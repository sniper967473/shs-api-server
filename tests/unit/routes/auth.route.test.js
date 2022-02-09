const { expect } = require('chai');
var request = require('supertest');
const createServer = require('../../../src/server');


describe('api/auth/accounts:signUp', function () {
    let app = createServer();
    // Called once before any of the tests in this block begin.
    before(function (done) {
        const server = app.listen(function (err) {
            if (err) { return done(err); }
            done();
        });
        after((done) => {
            server.close(function (err) {
                if (err) { return done(err); }
                done();
            });
        });
    });

    it('It should not accept short passwords', (done) => {
        const userRegistrationData = {
            username: 'testing',
            password: 'short',
            displayName: 'I\'m Test',
        }
        request(app)
            .post('/api/auth/accounts:signUp')
            .send(userRegistrationData)
            .expect('Content-Type', /json/)
            .expect(400);
        done();
    });

    it('It should not accept very long passwords', (done) => {
        const userRegistrationData = {
            username: 'testing',
            password: 'veryveryverylongpassword',
            displayName: 'I\'m Test',
        }
        request(app)
            .post('/api/auth/accounts:signUp')
            .send(userRegistrationData)
            .expect('Content-Type', /json/)
            .expect(204);
        done();
    });

    it("It Should register a user", (done) => {
        const userRegistrationData = {
            username: 'testing',
            password: 'testtest',
            displayName: 'I\'m Test',
        }
        request(app)
            .post('/api/auth/accounts:signUp')
            .send(userRegistrationData)
            .expect('Content-Type', /json/)
            .expect(201, function (err, res) {
                if (err) { return done(err); }
                const body = res.body;
                expect(body.idToken).to.be.a('string');
                expect(body.refreshToken).to.be.a('string');
                expect(body.localId).to.be.a('number');
                expect(body.expiresIn).to.be.a('number');
                expect(body.username).to.be.a('string');
                done();
            });
    });
});