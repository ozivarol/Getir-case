const request = require('supertest');
const app = require('../src/app');
  
  describe('Test the invalid requests', () => {
    test('Invalid endpoint it should response 404', done => {
      request(app)
        .get('/invalidEndPoint')
        .then(response => {
          expect(response.statusCode).toBe(404);
          done();
        });
    });
  
    test('Invalid params it should response 400', done => {
      request(app)
        .post('/api/filter')
        .send({ foo: 'bar' })
        .then(response => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });
  
    test('Invalid params it should response 400', done => {
      request(app)
        .post('/api/filter')
        .send({
          startDate: '20-06-1900',
          endDate: 0,
          minCount: 'Hello',
          maxCount: ''
        })
        .then(response => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    test('MinCount > maxcount it should response 400', done => {
      request(app)
        .post('/api/filter')
        .send({
          startDate: '20-06-1900',
          endDate: "20-06-1991",
          minCount: 300,
          maxCount: 200,
        })
        .then(response => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });


    test('If min count or max count is less than zero it should response 400', done => {
      request(app)
        .post('/api/filter')
        .send({
          startDate: '20-06-1900',
          endDate: "20-06-1991",
          minCount: -1,
          maxCount: 200,
        })
        .then(response => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });


    test('If startDate is greater than endDate it should response 400', done => {
      request(app)
        .post('/api/filter')
        .send({
          startDate: '20-06-2010',
          endDate: "20-06-1991",
          minCount: 100,
          maxCount: 5000,
        })
        .then(response => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });



  });




  
  
  describe('Test main endpoint', () => {
    test('It should response with Success', done => {
      request(app)
        .post('/api/filter')
        .send({
          startDate: '2016-01-26',
          endDate: '2017-02-02',
          minCount: 1000,
          maxCount: 3000
        })
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.code).toBe(0);
          expect(response.body.msg).toBe('Success');
          done();
        });
    });
  });