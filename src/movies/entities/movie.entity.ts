// entities에 데이터베이스 모델을 만들어야 함
// 일단 DB가 없으므로 Object로 간단한 모델 구현
export class Movie {
    id: number;
    title: string;
    year: number;
    genres: string[];
}
