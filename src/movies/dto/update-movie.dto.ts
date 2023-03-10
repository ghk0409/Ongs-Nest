import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// update의 경우, 변경할 값의 옵션 처리를 위한 partial-types
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
