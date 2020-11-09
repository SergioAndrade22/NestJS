import { Body, Controller, Param, Get, Post, Delete, UseGuards } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { CreateProductDTO } from '../models/dto/create-product-dto';
import { OktaGuard } from '../auth/okta.guard';


@Controller('products')
@UseGuards(OktaGuard)
export class ProductsController {
    
    constructor(private _productsService: ProductsService){}

    @Get()
    async findAll(): Promise<Product[]>{
        try{
            return this._productsService.findAll();
        } catch{
            return []
        }
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<Product>{
        try{
            return this._productsService.find(id);
        } catch{
            return undefined
        }
    } 

    @Post()
    async create(@Body() createProductDTO: CreateProductDTO){
        try{
            this._productsService.create(createProductDTO);
        } catch{
            return 'Error: Failed to create product with given data.'
        }
    }

    @Post(':id')
    async update(@Param('id') id: number,@Body() createProductDTO: CreateProductDTO){
        try{
            this._productsService.update(id, createProductDTO);
        } catch{
            return 'Error: Failed to update selected prodcut.'
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        try{
            this._productsService.delete(id);
        } catch{
            return 'Error: Failed to delete selected product.'
        }
    }

}
