import { IsNumber, IsString, Min,Max, IsLatitude, IsLongitude, isNumber } from "class-validator";

export class CreateReportDto{
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(0)
    @Max(10000000) 
    price: number;

    @IsNumber()
    @Min(2010)
    @Max(new Date().getFullYear())
    year: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
}