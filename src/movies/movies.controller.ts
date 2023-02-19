import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
} from '@nestjs/common';

// Controller() 안의 url를 넣을 경우, Entry Point(엔트리 포인트)를 컨트롤함
@Controller('movies')
export class MoviesController {
    // Home 경로 (전체 영화 목록)
    @Get()
    getAll() {
        return 'This will return all Movies!!!';
    }
    // 단일 영화 정보
    @Get('/:id')
    getOne(@Param('id') movieId: string) {
        return `This will return one movie with the id: ${movieId}`;
    }
    // 영화 생성
    @Post()
    create() {
        return 'This will create a movie!!';
    }
    // 영화 삭제
    @Delete('/:id')
    remove(@Param('id') movieId: string) {
        return `This will delete a movie with the id: ${movieId}`;
    }
    // 영화 정보 수정 (Put: 전체 수정, Patch: 일부 수정)
    @Patch('/:id')
    patch(@Param('id') moviedId: string) {
        return `This will patch a movie with the id: ${moviedId}`;
    }
}
