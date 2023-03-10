import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// Controller() 안의 url를 넣을 경우, Entry Point(엔트리 포인트)를 컨트롤함
@Controller('movies')
export class MoviesController {
    // 서비스 요청 (초기화)
    constructor(private readonly moviesService: MoviesService) {}
    // Home 경로 (전체 영화 목록)
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }
    // 영화 제목 검색, @Query 데코레이터로 query parameter 가져오기
    @Get('search')
    search(@Query('year') searchingYear: string) {
        return `We are searching for a movie made after ${searchingYear}`;
    }
    // 단일 영화 정보, @Param 데코레이터로 url parameter 가져오기
    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie {
        return this.moviesService.getOne(movieId);
    }
    // 영화 생성, @Body 데코레이터로 body 데이터 가져오기
    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }
    // 영화 삭제
    @Delete('/:id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }
    // 영화 정보 수정 (Put: 전체 수정, Patch: 일부 수정)
    @Patch('/:id')
    patch(@Param('id') moviedId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(moviedId, updateData);
    }
}
