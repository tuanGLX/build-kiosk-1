export type ConcessionType = {
  id: string;
  name: string;
  description: string;
  itemId: number;
  imageUrl: string;
  price: number;
  maxQuantity: number;
  headOfficeItemCode: string;
  type: string;
};

export interface OrderConcessionType extends ConcessionType {
  quanty: number;
}
