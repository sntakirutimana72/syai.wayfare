import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const { expect } = chai;
chai.use(chaiHttp);

const users = {
  admin: {
    firstname: 'Ntakirutimana',
    lastname: 'Steven',
    email: 'sntakirutimana72@wayfarer.it',
    gender: 'male',
    dateOfB: '1993-01-01',
    password: 'Mukamanata3',
    is_admin: true
  }, client: {
    firstname: 'Uwimana',
    lastname: 'Yves Rocher',
    email: 'yvesrocher@wayfarer.it',
    gender: 'male',
    dateOfB: '1994-01-01',
    password: 'Mukamanata3',
    is_admin: false
  }
};

describe('User can sign up', () => {

  // User can signup
  context('signup with right data', () => {
    it('expect admin-user to signup', (done) => {
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
    it('expect client-user to signup', (done) => {
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
    it('expect user to not signup', (done) => {
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
    it('expect user to not signup', (done) => {
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
    it('expect user to not signup', (done) => {
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
    it('expect to not signup with firstname as int', (done) => {
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
    it('expect to not signup with firstname as 1 character', (done) => {
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
    it('expect to not signup with firstname as empty string', (done) => {
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
    it('expect to not signup with gender not of [male, female, custom]', (done) => {
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
    it('expect to not signup with short password', (done) => {
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
    it('expect to not signup with data missing key pair', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Ibrahim',
          lastname: 'Babu',
          gender: 'male',
          dateOfB: '1999-06-19',
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
    it('expect to not signup with bad formatted date', (done) => {
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
    it('expect to not signup with invalid email', (done) => {
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
    it('expect to not signup with date out of accepted range', (done) => {
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
    it('expect to not signup with is_admin not a boolean value', (done) => {
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

describe('User can sign in', () => {

  // user can sign in with right inputs and credentials
  context('user signs in with right credentials', () => {
    it('expect client-user to sign in', (done) => {
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
    it('expect admin-user to sign in', (done) => {
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
    it('expect user to not signin with unexisting credentials', (done) => {
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
    it('expect user to not signin with invalid credential data', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'example@gmail.com',
          password: 'helloThere'
        }).end((req, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(401);
          done();
        });
    });
  });
});
