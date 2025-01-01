interface IErrors {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}
export function productValidation(product: IErrors) {
  const validURl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
  const errors: IErrors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  if (
    product.title.length < 10 ||
    product.title.length > 80 ||
    !product.title.trim()
  ) {
    errors.title = "Title must be between 10 and 80 characters";
  }

  if (
    product.description.length < 20 ||
    product.description.length > 900 ||
    !product.description.trim()
  ) {
    errors.description = "Description must be between 20 and 900 characters";
  }
  if (!validURl || !product.imageURL.trim()) {
    errors.imageURL = "Invalid URL";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Invalid price";
  }

  return errors;
}
