import { Category } from "./category.model";

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}
// Los Partial en Typescript tienen como función
// tomar los atributos de un tipo y los pone todos
// como opcionales.
export interface UpdateProductDTO extends Partial<CreateProductDTO> {

}
