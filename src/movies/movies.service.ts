import { Injectable, NotFoundException } from '@nestjs/common';
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
        const movie = this.movies.find((movie) => movie.id === +id); // parseInt(id) == +id
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found...`);
        }
        return movie;
    }
    // 영화 삭제 서비스
    deleteOne(id: string) {
        // fake db 사용 때문에 로직 구현 처리상 아래처럼.. 이후 실제 DB 연동 시, 변경!
        this.getOne(id);
        this.movies = this.movies.filter((movie) => movie.id !== +id);
    }
    // 영화 생성
    create(movieData: any) {
        // TODO: create할 경우 createData 유효성 검사
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    // 영화 수정
    update(id: string, movieData: any) {
        // fake db 사용 때문에 로직 구현 처리상 아래처럼.. 이후 실제 DB 연동 시, 변경!
        // TODO: updata할 경우 updataData 유효성 검사
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...movieData });
    }
}
