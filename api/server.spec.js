const db = require('../data/dbConfig');
// const { request } = require('./server.js');
const server = require('./server.js')
const request = require('supertest')
// const {testing}  = require('../knexfile')


beforeAll(async () =>{
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=>{
    await  db('hobbits').truncate();
})


afterAll(async () =>{
    await db.destroy();
})

describe('server.js', () =>{

    test('we are in the env', () =>{
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('GET /', ()=>{
            let res;
            

            beforeEach(async () =>{
                res = await request(server).get('/')
            })
            test('returns 200 0K', () =>{
                return request(server).get('/').then(res =>{expect(res.status).toBe(200);}) 
            })

            test('return 200 OK async ', async() =>{
                expect(res.status).toBe(200);
            })

            test('returns json type', async () =>{
                expect(res.type).toBe('application/json')
            })

            test('returns {api:"up"}', async() =>{
                // const res = await request(server).get('/');
                expect(res.body).toEqual({api:"up"});
            });


    });
})