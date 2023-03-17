import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MoviesService],
        }).compile();
        // MovieService에 접근 가능하게 함
        service = module.get<MoviesService>(MoviesService);
    });

    // 모든 테스트 실행 후, 데이터베이스를 깨끗하게 정리하는 함수 실행
    // afterAll(() => {

    // })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // 유닛테스트 예제 만들기
    // it('should be 4', () => {
    //     expect(2 + 3).toEqual(5);
    // });

    // getAll() 테스트
    describe('getAll', () => {
        // getAll 실행 시, 배열 인스턴스가 리턴되는지 테스트
        it('should return an array', () => {
            const result = service.getAll();

            expect(result).toBeInstanceOf(Array);
        });
    });

    // getOne() 테스트
    describe('getOne', () => {
        // movie 객체를 정상적으로 받아오고 id를 정상적으로 받는지 테스트
        it('should return a movie', () => {
            // getOne 실행 시, Movie가 create 되어 있지 않으면 문제가 될 수 있으므로 테스트를 위한 movie 생성
            service.create({
                title: 'Test Movie',
                genres: ['test'],
                year: 2023,
            });
            const movie = service.getOne(1);

            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });

        // NotFoundException이 정상 작동하는지 테스트
        it('should throw 404 error', () => {
            try {
                service.getOne(999);
            } catch (e) {
                // 발생 에러가 NotFoundException인지 확인
                expect(e).toBeInstanceOf(NotFoundException);
                // 해당 에러 메시지 동일한지 확인
                expect(e.message).toEqual(`Movie with ID 999 not found...`);
            }
        });
    });

    // deleteOne() 테스트
    describe('deleteOne', () => {
        // delete 기능 정상 확인 테스트
        it('delete a movie', () => {
            service.create({
                title: 'Test Movie',
                genres: ['test'],
                year: 2023,
            });
            const beforeDelete = service.getAll().length;
            service.deleteOne(1);
            const afterDelete = service.getAll().length;

            // 삭제 전과 삭제 후의 배열 길이 비교 확인
            expect(afterDelete).toBeLessThan(beforeDelete);
        });
        // 잘못된 id로 호출 시, 에러 처리 정상 확인 테스트
        it('should return a 404 error', () => {
            try {
                service.deleteOne(999);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });

    // create() 테스트
    describe('create', () => {
        it('should create a movie', () => {
            const beforeCreate = service.getAll().length;
            service.create({
                title: 'Test Movie',
                genres: ['test'],
                year: 2023,
            });
            const afterCreate = service.getAll().length;
            console.log(beforeCreate, afterCreate);
            // create 전과 후의 배열 길이 비교
            expect(afterCreate).toBeGreaterThan(beforeCreate);
        });
    });

    // update() 테스트
    describe('update', () => {
        // update 정상 작동 확인 테스트
        it('should update a movie', () => {
            service.create({
                title: 'Test Movie',
                genres: ['test'],
                year: 2023,
            });

            service.update(1, { title: 'Updated Test' });
            const movie = service.getOne(1);
            // update 후 title 비교 확인
            expect(movie.title).toEqual('Updated Test');
        });

        // 잘못된 id로 호출 시, 에러 처리 정상 확인 테스트
        it('should throw a NotFoundException', () => {
            try {
                service.update(999, {});
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });
});
