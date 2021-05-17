'use strict';


const server = require('../src/server');

const superTest = require('supertest');
const serverRequest = superTest(server.app);


describe('Server Module', ()=> {
    it('404 on a bad route', async ()=> {

        let response = await serverRequest.get('/not-found-any-route');
        expect(response.status).toEqual(404);

    });
    it('404 on a bad method', async ()=> {

        let response = await serverRequest.post('/person');
        expect(response.status).toEqual(404);

    });

    it('500 if no name ', async ()=> {
        let response = await serverRequest.get('/person?name= ');
        
        expect(response.status).toEqual(500);
        
    });


    it('200 if the name is string', async ()=> {

        let response = await serverRequest.get('/person?name=o');

    
        expect(response.status).toEqual(200);

    });

    it('response object is correct', async ()=> {

        let response = await serverRequest.get('/person?name=e');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            name: "e"

        });
    });
});