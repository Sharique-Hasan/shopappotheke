import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('A list of the most popular repositories, sorted by number of stars', () => {
        return request(app.getHttpServer())
            .get('/api/vcs/search/repositories')
            .expect(200)
            .then(res => {
                expect(res.body.page).toBe(1)
                expect(res.body.per_page).toBe(10)
            })
    });

    it('An option to be able to view the top 10, 50, 100 repositories should be available', () => {
        return request(app.getHttpServer())
            .get('/api/vcs/search/repositories')
            .query({top: '50'})
            .expect(200)
            .then(res => {
                expect(res.body.page).toBe(1)
                expect(res.body.per_page).toBe(50)
            })
    });

    it('Given a date, the most popular repositories created from this date onwards should be returned', () => {
        return request(app.getHttpServer())
            .get('/api/vcs/search/repositories')
            .query({top: '10', created: '2022-07-01'})
            .expect(200)
            .then(res => {
                expect(res.body.page).toBe(1)
                expect(res.body.per_page).toBe(10)
                expect(
                    new Date(res.body.items[0].created_at).getTime()
                ).toBeGreaterThan(new Date('June 30, 2022 23:59:59').getTime())
            })
    });

    it('A filter for the programming language would be a great addition to have', () => {
        return request(app.getHttpServer())
            .get('/api/vcs/search/repositories')
            .query({top: '10', created: '2022-07-01', language: 'javascript'})
            .expect(200)
            .then(res => {
                expect(res.body.page).toBe(1)
                expect(res.body.per_page).toBe(10)
                expect(
                    new Date(res.body.items[0].created_at).getTime()
                ).toBeGreaterThan(new Date('June 30, 2022 23:59:59').getTime())
                expect(res.body.items[0].language.toLowerCase()).toBe('javascript')
            })
    });
});
