import { client, admin } from './credentials';
import chaiHttp from 'chai-http';
import server from '../server';
import chai from 'chai';

const { expect } = chai;
chai.use(chaiHttp);

export default function() {
  describe('#User can delete all active trips', () => {

    it('returns an object of all cancelled trips', (done) => {
      chai.request(server)
        .delete('/api/v1/trip')
        .set({ token: admin })
        .end((req, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status').eql(200);
          done();
        });
    });
    it('returns error if none found or already in cancelled state', (done) => {
      chai.request(server)
        .delete('/api/v1/trip')
        .set({ token: admin })
        .end((req, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(404);
          done();
        });
    });
  });

  describe('#User can view all bookings after deletion', () => {

    it('returns all bookings for Admin', (done) => {
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
    it('returns error cause all are cancelled', (done) => {
      chai.request(server)
        .get('/api/v1/booking')
        .set({token: client})
        .end((req, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status').eql(404);
          done();
        });
    });
  });
};
