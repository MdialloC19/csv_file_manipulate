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
    
    it('Should add a row on the spread ',async  ()=>{
        const data = {
        firstName: 'John',
        secondName: 'Doe',
        nationalIdentityNumber: 123456789,
        voterNumber: 987654321,
        dateOfBirth: '1990-01-01',
        placeOfBrith: 'City',
        votingPlace: 'Polling Station'
    };
       await request(app)
            .post('/api/spread')
            .send(data)
            .expect(201);
    });

    it('Should be a function', ()=>{
        expect(typeof request(app).put)
            .toBe('function');
    });

    it('Should update a row on the spread', async ()=>{
        const data = {
            firstName: 'testput1',
            secondName: 'testput2',
            nationalIdentityNumber: 123456789,
            voterNumber: 987654321,
            dateOfBirth: '1990-01-01',
            placeOfBrith: 'City',
            votingPlace: 'Polling Station Dakar'
        };
        const spreadId='65a914958cd12150a1aaa50a';
        await request(app)
            .put(`/api/spread/${spreadId}`)
            .send(data)
            .expect(200);
    });

    it('Should be a function', async ()=>{
        expect(typeof request(app).put)
            .toBe('function');
    });

    it('Should delete a row in spread',async ()=>{
        const spreadId='65a950374de713e6f844b8ac';
        await request(app)
            .delete(`/api/spread/${spreadId}`)
            .expect(200);
    })
    
});
