import { Injectable, Next } from '@nestjs/common';
import { Product } from '../models/product.model';
import { createConnection, Connection, Repository} from 'typeorm';
import { from } from "rxjs";

@Injectable()
export class ProductsService {
    connection: Connection;
    repo: Repository<Product>

    constructor(){
        from(createConnection({
            type: 'sqlite',
            database: 'myangularapp',
            synchronize: true,
            entities: [
              Product
            ],
          })).subscribe( conn => {
              this.connection = conn;
              this.repo = this.connection.getRepository(Product);
            });
    }

    findAll(): Promise<Product[]>{
        return this.repo.find();
    }

    find(id: number): Promise<Product>{
        return this.repo.findOne(id);
    }

    create(product: Product){
        this.repo.save(product);
    }

    update(id: number, product: Product){
        from(this.repo.findOne(id)).subscribe(p => {
            p.name = product.name;
            p.sku = product.sku;
            p.description = product.description;
            p.price = product.price;
            p.stock = product.stock;
            this.repo.save(p);
        });
    }

    delete(id:number){
        this.repo.delete(id);
    }
}
