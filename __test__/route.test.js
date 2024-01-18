const request=require('supertest');
const app=require('../app');


describe('API routes testing', () => {

    it('Should be a function', ()=>{
        expect(typeof request(app).get).toBe('function');
        
    });

    it('Should return a json object', async ()=>{
             await  request(app)
                    .get('/api/spread')
                    .expect(200);
    });

    it('Should be a function', ()=>{
        expect(typeof request(app).post).toBe('function');
      
    });
    

    it('Should add a row on the spread ',  ()=>{
        const data = {
        firstName: 'John',
        secondName: 'Doe',
        nationalIdentityNumber: 123456789,
        voterNumber: 987654321,
        dateOfBirth: '1990-01-01',
        placeOfBrith: 'City',
        votingPlace: 'Polling Station'
    };
       request(app)
                .post('/api/spread')
                .send(data)
                .expect(201);
    });
    
});
