const request=require('supertest');
const app=require('../app');

describe('Testing methods API', () => {
        const perso={
            "firstName": "Anta",
            "secondName": "Gueye",
            // "nationalIdentityNumber": 159777777,
            "voterNumber": 98769,
            "dateOfBirth": "2002-10-12T00:00:00.000Z",
            "placeOfBirth": "Louga",
            "votingPlace": "Louga"
        }

    it('Should return json object with length equal to 9', async () => {
        const response=await request(app)
                                    .get('/api/spread')
                                    .expect(200);
        const response1=await request(app)
                                    .get('/api/spread/65a916e18cd12150a1aaa50d');
        // console.log((response.body.message[0]).length());
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toBeInstanceOf(Object);
        expect(Object.keys(response.body.message[0]).length).toEqual(9);
        expect(response.body.succeed).toEqual(true);

        // For the second response
        expect(response1.headers['content-type']).toContain('application/json');
        expect(response1.body).toBeInstanceOf(Object);
        expect(Object.keys(response1.body.message[0]).length).toEqual(9);
        expect(response1.body.succeed).toEqual(true);
        
    });

    it('Should handle some error : required field',async  ()=>{

        const response = await request(app)
                                .post('/api/spread')
                                .send(perso)
                                .expect(400)
        
        expect(response.body.succeed).toBe(false);
        expect(response.body.error).toBe('Bad Request');
        expect(response.body.message).toBe('Certaines données requises sont manquantes.');
        expect(response.body.missingFields).toBeInstanceOf(Array);

    });

    it('should return a 400 Bad Request if a required field is invalid', async () => {
        const invalidPerso = { ...perso ,nationalIdentityNumber:123457, voterNumber: 'invalid' };
        const response = await request(app)
                        .post('/api/spread')
                        .send(invalidPerso)
                        .expect(400);

    
        expect(response.body.succeed).toBe(false);
        expect(response.body.error).toBe('Validation error.'); 
        expect(typeof response.body.validationErrors).toBe('object');
    });
    
});
