import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    // 테스트앱을 사전에 한 번만 만들어 놓기 위해 beforeAll로 변경 (DB 유지 등을 위함)
    // beforeEach(async () => {
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        // 실제환경과 테스팅 환경이 동일하도록 main.ts와 같은 상태로 app 환경 처리
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );
        await app.init();
    });

    // API request와 같은 형태로 테스트 (supertest 라이브러리의 request 이용)
    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Welcome to Ongs Movie API!!!');
    });

    // GET /movies 테스트
    it('/movies (GET)', () => {
        return request(app.getHttpServer()) // 이 부분은 http://localhost:3000 같은 도메인 안 쓰기 위해 사용
            .get('/movies')
            .expect(200)
            .expect([]);
    });

    // 동일 경로 GET, POST 테스트할 경우 더 좋은 구조
    describe('/movies', () => {
        // GET 테스트
        it('GET', () => {
            return request(app.getHttpServer()) // 이 부분은 http://localhost:3000 같은 도메인 안 쓰기 위해 사용
                .get('/movies')
                .expect(200)
                .expect([]);
        });
        // POST 테스트
        it('POST 201', () => {
            return request(app.getHttpServer())
                .post('/movies')
                .send({
                    title: 'TEST',
                    year: 2023,
                    genres: ['Test'],
                })
                .expect(201);
        });
        // POST 에러 테스트 (잘못된 데이터로 생성 시)
        it('POST 400', () => {
            return request(app.getHttpServer())
                .post('/movies')
                .send({
                    title: 'TEST',
                    year: 2023,
                    genres: ['Test'],
                    other: 'test',
                })
                .expect(400);
        });
        // Delete 테스트 (에러 작동 유무 확인)
        it('DELETE', () => {
            return request(app.getHttpServer()).delete('/movies').expect(404);
        });
    });

    describe('/movies/:id', () => {
        // 테스트 앱이 유지되기 때문에 앞선 테스트에서 만든 movie에 접근 가능!!
        // 실제 구동 환경에서는 transform이 적용되므로 테스팅 환경도 동일하게 설정 필수!
        // 조회 API 테스트
        it('GET 200', () => {
            return request(app.getHttpServer()).get('/movies/1').expect(200);
        });
        // 조회 API 에러 테스트
        it('GET 404', () => {
            return request(app.getHttpServer()).get('/movies/999').expect(404);
        });
        // 수정 API 테스트
        it('PATCH 200', () => {
            return request(app.getHttpServer())
                .patch('/movies/1')
                .send({ title: 'Updated Test' })
                .expect(200);
        });
        // 삭제 API 테스트
        it('DELETE 200', () => {
            return request(app.getHttpServer()).delete('/movies/1').expect(200);
        });
    });
});
