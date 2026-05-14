import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    @IsPositive()
    readonly limit:number

    @IsOptional()
    @IsInt()
    @IsPositive()
    readonly skip:number
}
