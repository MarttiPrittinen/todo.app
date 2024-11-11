import {expect} from 'chai';

var base_url= 'http://localhost:3001/';

import { insertTestUser, getToken, initializeTestDb } from './helper/test.js';
import e from 'express';

describe('Get Tasks', () => {
    before(() => {
        initializeTestDb()
})

    it('should get all tasks',async() => {
        const response = await fetch(base_url);
        const data = await response.json();
    
        expect(response.status).to.equal(200)
        expect(data).to.be.a('array').that.is.not.empty
        expect(data[0]).to.include.all.keys('id','description')
    })
})
describe('POST task', () => {
   const email = 'login@foo.com'
    const password ='login123'
    insertTestUser(email,password)
    const token = getToken(email)
    it('should post a task',async() => {
        const response = await fetch(base_url + 'create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description':'Task from unit test'})
        })
        const data = await response.json()
    
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })
    it ('should not post a task without description',async () => {
        const response = await fetch(base_url + 'create',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description':null})
        });
        const data = await response.json();
    
        expect(response.status).to.equal(500);
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('DELETE task', () => { 
        const email = 'register@foo.com'
    const password ='register1234'
    insertTestUser(email,password)
    const token = getToken(email)
    it('should delete a task',async() => {
        const response = await fetch(base_url + 'delete/1',{
            headers: {
            Authorization: token
            },
            method:'delete'
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id')
    })
    it('should not delete a task that does not exist',async() => {
        const response = await fetch(base_url + 'delete/id=0 or id > 0',{
            method:'delete',
            headers: {
            Authorization: token
            }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('POST register', () => {
    const email = 'logiin@foo.com'
    const password ='login1238'
    it('should register with valid email and password',async() => {
        const response = await fetch(base_url + 'user/register',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':email,'password':password})
        })
        const data = await response.json()
    
        expect(response.status).to.equal(500,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id','email')
    })
})

describe('POST login', () => {
  const email = 'login@foo.com'
    const password ='login1234'
    insertTestUser(email,password)
    it ('should login with valid credintials',async() => {
        const response = await fetch(base_url + 'user/login',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':email,'password':password})
        })
        const data = await response.json()
    
        expect(response.status).to.equal(200, data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('id','email','token')
    })
})

describe('POST task', () => {
    const email = 'post@foo.com'
    const password ='post123'
    insertTestUser(email,password)
    const token = getToken(email)
    it ('should post a task ',async() => {
        const response = await fetch(base_url + 'create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description':'Task from unit test'})
        })
        const data = await response.json()
        expect(response.status).to.equal(200,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
    it ('should not post a task with zero length description',async() => {
        const response = await fetch(base_url + 'create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
            },
            body: JSON.stringify({'description':null})
        })
        const data = await response.json()
        expect(response.status).to.equal(500,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
} )
