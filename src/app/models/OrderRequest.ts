import { ProductInfo } from './ProductInfo';

export class OrderRequest {

    constructor(
        public products: ProductInfo[]
    ) {}

}