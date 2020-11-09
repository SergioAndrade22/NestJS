import { Body, Controller, Get, Post } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from '../dto/create-cat.dto';
import { Cat } from '../interfaces/cat.interface';


@Controller('cats')
export class CatsController {

    constructor(private readonly _catsService: CatsService ){}

    @Post()
    async create(@Body() createCatDto: CreateCatDto){
        this._catsService.create(createCatDto);
        return createCatDto;
    }

    @Get()
    async findAll(): Promise<Cat[]>{
        return this._catsService.findAll();
    }
}
