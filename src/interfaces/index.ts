import { TInput } from "../types";

export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IFormInputsList {
  id: string;
  name: TInput;
  label: string;
  type: string;
}
