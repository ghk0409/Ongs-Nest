import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    // 리스트 내 각 값 검사 (each 옵션)
    @IsString({ each: true })
    readonly genres: string[];
}
