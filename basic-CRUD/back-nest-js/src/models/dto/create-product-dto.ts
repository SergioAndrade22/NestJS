export class CreateProductDTO{
  readonly id?: number;

  readonly name: string;

  readonly sku: string;

  readonly description: string;

  readonly price: number;

  readonly stock: number;
}