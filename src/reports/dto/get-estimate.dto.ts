import { Transform } from "class-transformer";
import { IsNumber, IsString, Min,Max, IsLatitude, IsLongitude, isNumber } from "class-validator";

export class GetEstimateDto{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({value})=>parseInt(value))
    @IsNumber()
    @Min(2010)
    @Max(new Date().getFullYear())
    year: number;

    @Transform(({value})=>parseInt(value))
    @IsLatitude()
    lat: number;

    @Transform(({value})=>parseInt(value))
    @IsLongitude()
    lng: number;

    @Transform(({value})=>parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
}