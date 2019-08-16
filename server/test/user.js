import chai from 'chai';
import server from '../server';
import chaiHttp from 'chai-http';
import { users } from './credentials';

const { expect } = chai;
chai.use(chaiHttp);

export default function() {

  describe('#USER-SIGNUP', () => {

    // User can signup
    context('signup with right data', () => {
      it('returns an object of signed up Admin-User infos', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(users.admin)
          .end((req, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(201);
            done();
          });
      })
      it('returns an object of signed up Client-User infos', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(users.client)
          .end((req, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(201);
            done();
          });
      })
    })
    // signup with string formatted data
    context('signup with string data', () => {
      it('returns error', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send('signing up with wrong data')
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
    })
    // signup with empty data
    context('signup with empty data', () => {
      it('returns error', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({})
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
    })
    // signup with existing email
    context('signup with an email of an existing user', () => {
      it('returns error', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(users.client)
          .end((req, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(403);
            done();
          })
      })
    })
    // signup with invalid data
    context('signup with invalid data format', () => {
      // firstname (applies on lastname) as integer
      it('returns error with firstname or lastname as int', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 1233,
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfarer.it',
            password: '11325543',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // firstname (applies on lastname) as one string character
      it('returns error if first-or-lastname is 1 character length', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'I',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfarer.it',
            password: '11325543',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // firstname (applies on lastname) as empty space
      it('returns error if first-or-lastname is empty', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: '',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfarer.it',
            password: '11325543',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // gender as other than male, female or custom
      it('returns error if gender not of [male, female, custom]', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'malee',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfarer.it',
            password: '11325543',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // short password value
      it('returns error if password less than 4 characters', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfarer.it',
            password: '11$',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // signup with data missing a key pair
      it('returns error if any data key-pair value is missing', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            // password: 'Mukamanata3', 
            email: 'nuru@wayfarer.it',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // Bas formatted date
      it('returns error with invalid date of birth', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-066-19',
            email: 'nuru@wayfarer.it',
            password: '11$u',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // invalid email
      it('returns error with invalid email', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfare.it',
            password: '11$f',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // date out of range
      it('returns error with date of birth out of accepted range', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '2005-01-01',
            email: 'nuru@wayfarer.it',
            password: '11$e',
            is_admin: true
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
      // is_admin as not a boolean
      it('returns error if is_admin key has non boolean value', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstname: 'Ibrahim',
            lastname: 'Babu',
            gender: 'male',
            dateOfB: '1999-06-19',
            email: 'nuru@wayfarer.it',
            password: '11$k',
            is_admin: 'true'
          })
          .end((req, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(400);
            done();
          })
      })
    })
  });

  describe('#USER-SIGNIN', () => {

    // user can sign in with right inputs and credentials
    context('user signs in with right credentials', () => {
      it('returns Client-user infos and a token', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signin')
          .send({
            email: users.client.email,
            password: users.client.password
          }).end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
      it('returns Admin-user infos and a token', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signin')
          .send({
            email: users.admin.email,
            password: users.admin.password
          }).end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
    });
    // signin with unexisting or wrong credentials
    context('user signs in with wrong credentials', () => {
      it('returns error with unexisting credentials', (done) => {
        chai.request(server)
          .post('/api/v1/auth/signin')
          .send({
            email: 'nuru@wayfarer.it',
            password: 'users.client.password'
          }).end((req, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(401);
            done();
          });
      });
    });
  });
};
