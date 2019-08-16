import chai from 'chai';
import server from '../server';
import chaiHttp from 'chai-http';
import { admin, client } from './credentials';

const { expect } = chai;
chai.use(chaiHttp);

const booking = {
  trip_id: 3
};

export default function() {
  describe('#HEADER token required for any attempt on booking API', () => {

    it('returns error for bad Header Token', (done) => {
      chai.request(server)
        .get('/api/v1/booking')
        .set({token: ''})
        .end((req, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(401);
          done();
        });
    });
  });

  describe('Only Client user can access more than view fnclty of booking-API', () => {
    it('returns error for Admin attempt', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({ token: admin })
        .send(booking)
        .end((req, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(403);
          done();
        });
    });
  });

  describe('#BOOK A SEAT', () => {

    it('returns an object of a booked seat info', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({token: client})
        .send({trip_id: 2})
        .end((req, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(201);
          done();
        });
    });
    it('returns error if attempting to book a taken seat', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({token: client})
        .send({trip_id: 2, seat_number: 1})
        .end((req, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(400);
          done();
        });
    });
    it('returns an object of a booked seat info', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({token: client})
        .send({trip_id: 2, seat_number: 2})
        .end((req, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(201);
          done();
        });
    });
    it('returns an object of a booked seat info', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({token: client})
        .send(booking)
        .end((req, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(201);
          done();
        });
    });
    it('returns error if attempting to book on a full trip', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({token: client})
        .send({trip_id: 2})
        .end((req, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(401);
          done();
        });
    });
    it('returns error attempting to book on unexisting or cancelled trip', (done) => {
      chai.request(server)
        .post('/api/v1/booking')
        .set({token: client})
        .send({trip_id: 4})
        .end((req, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(404);
          done();
        });
    });
  });

  describe('#VIEW ALL BOOKINGS', () => {

    it('returns all sorts of bookings for Admin', (done) => {
      chai.request(server)
        .get('/api/v1/booking')
        .set({token: admin})
        .end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(200);
          done();
        });
    });
    it('returns all his or her active bookings', (done) => {
      chai.request(server)
        .get('/api/v1/booking')
        .set({token: client})
        .end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('#UPDATE BOOKING', () => {
    it('returns an object of a booking updated', (done) => {
      chai.request(server)
        .patch('/api/v1/booking/3')
        .set({token: client})
        .send({seat_number: 9})
        .end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(200);
          done();
        });
    });
    it('returns error when attempting to update with same state', (done) => {
      chai.request(server)
        .patch('/api/v1/booking/3')
        .set({token: client})
        .send({seat_number: 9})
        .end((req, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(400);
          done();
        });
    });
  });

  describe('#DELETE A BOOKING', () => {

    context('user can delete his or her active booking by ID', () => {
      it('returns an object of a cancelled booking', (done) => {
        chai.request(server)
          .delete('/api/v1/booking/1')
          .set({token: client})
          .end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
    });

    context('user can delete all his or her active bookings', () => {
      it('returns an array object of found and cancelled bookings', (done) => {
        chai.request(server)
          .delete('/api/v1/booking')
          .set({token: client})
          .end((req, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('status').eql(200);
            done();
          });
      });
      it('returns error if no booking found to be cancelled', (done) => {
        chai.request(server)
          .delete('/api/v1/booking')
          .set({token: client})
          .end((req, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('status').eql(404);
            done();
          });
      });
    });
  });

};
