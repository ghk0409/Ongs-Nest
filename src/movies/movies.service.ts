import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    // entity에 구축된 모델 타입 설정
    private movies: Movie[] = [];

    // 전체 영화 목록 서비스
    getAll(): Movie[] {
        return this.movies; // 실제로는 쿼리문으로 데이터 가져올듯
    }
    // 단일 영화 정보 서비스
    getOne(id: string): Movie {
        return this.movies.find((movie) => movie.id === +id); // parseInt(id) == +id
    }
    // 영화 삭제 서비스
    deleteOne(id: string): boolean {
        this.movies.filter((movie) => movie.id !== +id);
        return true;
    }
    // 영화 생성
    create(movieData: any) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }
}
