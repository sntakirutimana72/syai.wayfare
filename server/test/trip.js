import chai from 'chai';
import server from '../server';
import chaiHttp from 'chai-http';
import { admin, client } from './credentials';

const { expect } = chai;
chai.use(chaiHttp);

const trip = {
  origin: 'Kinyinya',
  destination: 'Kibagabaga',
  fare: 242,
  status: 'active',
  seating_capacity: 29,
  trip_date: '2019-08-14',
  bus_licence_number: 'RAD509P'
};

const update = {
  seating_capacity: 20,
  bus_licence_number: 'RAD668M'
};

export default function() {
  describe('#HEADER token required for any attempt on trip API', () => {

    it('returns error for bad Header Token', (done) => {
      chai.request(server)
        .post('/api/v1/trip')
        .set({token: ''})
        .end((req, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(401);
          done();
        });
    });
  });

  describe('Admin can access more than view fnclty of trip-API', () => {
    it('returns error for client attempt', (done) => {
      chai.request(server)
        .post('/api/v1/trip')
        .set({ token: client })
        .send(trip)
        .end((req, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(403);
          done();
        });
    });
  });

  describe('#CREATE A TRIP', () => {

    it('returns an object of a new created trip', (done) => {
      chai.request(server)
        .post('/api/v1/trip')
        .set({token: admin})
        .send(trip)
        .end((req, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(201);
          done();
        });
    });
    it('returns error for bad formatted data', (done) => {
      chai.request(server)
        .post('/api/v1/trip')
        .set({token: admin})
        .send({})
        .end((req, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(401);
          done();
        });
    });
  });

  describe('#VIEW TRIPS', () => {

    context('Admin can view all sort of trips', () => {
      it('returns array of all available trips', (done) => {
        chai.request(server)
          .get('/api/v1/trip')
          .set({token: admin})
          .end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
    });

    context('Client can view only active trips', () => {
      it('returns array of all active trips', (done) => {
        chai.request(server)
          .get('/api/v1/trip')
          .set({token: client})
          .end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
    });

    context('User can view trip by id', () => {
      it('returns an object of trip', (done) => {
        chai.request(server)
          .get('/api/v1/trip/4')
          .set({token: admin})
          .end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
      it('returns error for cancelled trip when requested by client', (done) => {
        chai.request(server)
          .get('/api/v1/trip/4')
          .set({token: client})
          .end((req, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(404);
            done();
          });
      });
      it('returns error when no trip found', (done) => {
        chai.request(server)
          .get('/api/v1/trip/8')
          .set({token: admin})
          .end((req, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(404);
            done();
          });
      });
    });
  });

  describe('#UPDATE TRIP', () => {

    it('returns an object of trip updated', (done) => {
      chai.request(server)
        .patch('/api/v1/trip/1')
        .set({token: admin})
        .send(update)
        .end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(200);
          done();
        });
    });
    it('returns error with bad formatted data', (done) => {
      chai.request(server)
        .patch('/api/v1/trip/1')
        .set({token: admin})
        .send({})
        .end((req, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(401);
          done();
        });
    });
  });

  describe('#DELETE OR CANCEL TRIP', () => {

    it('returns an object of cancelled trip', (done) => {
      chai.request(server)
      .delete('/api/v1/trip/1')
      .set({token: admin})
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status').eql(200);
        done();
      });
    });
    it('returns error if trip was not found', (done) => {
      chai.request(server)
      .delete('/api/v1/trip/19')
      .set({token: admin})
      .end((req, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status').eql(404);
        done();
      });
    });
    it('returns error if trip already in cancelled state', (done) => {
      chai.request(server)
      .delete('/api/v1/trip/4')
      .set({token: admin})
      .end((req, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('status').eql(400);
        done();
      });
    });
  });

};
