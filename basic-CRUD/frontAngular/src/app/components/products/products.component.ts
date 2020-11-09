import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [`
    .products {
      padding: 2rem;
    }
    
    label, input {
      display: block;
    }
    
    label {
      margin-bottom: 1rem;
    }
    
    .loading {
      position: absolute;
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
    }
  `]
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'sku', 'description', 'price', 'stock', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  selectedProduct: Product = new Product();
  loading = false;

  constructor(public productService: ProductsService) {
  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.productService.getProducts();
    this.dataSource.data = data;
    this.loading = false;
  }

  async updateProduct() {
    if (this.selectedProduct.id !== undefined) {
      await this.productService.updateProduct(this.selectedProduct);
    } else {
      await this.productService.createProduct(this.selectedProduct);
    }
    this.selectedProduct = new Product();
    await this.refresh();
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
  }

  clearProduct() {
    this.selectedProduct = new Product();
  }

  async deleteProduct(product: Product) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${product.name}. This cannot be undone.`)) {
      this.productService.deleteProduct(product.id);
    }
    await this.refresh();
  }
}