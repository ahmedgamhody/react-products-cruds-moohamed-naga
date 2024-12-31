import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { colors, formInputsList, productList } from "./data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
function App() {
  const defaultProduct: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageURL: "" },
  };
  /* ------- STATE -------  */
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  /* ------- HANDLER -------  */
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }
  function onCancelAddProduct() {
    setProduct(defaultProduct);
    setIsOpen(() => false);
  }
  function addProductHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMes =
      Object.values(errors).some((error) => error === "") &&
      Object.values(errors).every((error) => error === "");
    if (!hasErrorMes) {
      setErrors(errors);
      return;
    }
    setProducts((prevProducts) => [
      { ...product, id: uuid(), colors: tempColors },
      ...prevProducts,
    ]);
    setProduct(defaultProduct);
    setTempColors([]);
    closeModal();
  }
  /* ------- RENDER -------  */
  const renderProductsList = products?.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  const inputsRender = formInputsList?.map((input) => {
    return (
      <div key={input.id} className="flex flex-col my-3">
        <label
          className=" text-sm font-medium text-gray-700 mb-2"
          htmlFor={input.id}
        >
          {input.label}
        </label>
        <Input
          type="text"
          id={input.id}
          name={input.name}
          onChange={handleInputChange}
          value={product[input.name]}
        />
        <ErrorMessage msg={errors[input.name]} />
      </div>
    );
  });

  const colorRender = colors?.map((color) => {
    return (
      <CircleColor
        key={color}
        color={color}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColors((prevColors) =>
              prevColors.filter((item) => item !== color)
            );
          } else {
            setTempColors((prevColors) => [...prevColors, color]);
          }
        }}
      />
    );
  });
  const tempColorsRender = tempColors?.map((color) => {
    return (
      <span
        key={color}
        style={{ backgroundColor: color }}
        className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
      >
        {color}
      </span>
    );
  });
  return (
    <main className="container mx-auto max-w-screen-xl">
      <Button onClick={openModal} className="bg-blue-500">
        Add New Product
      </Button>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4  m-5 place-items-center">
        {renderProductsList}
      </div>
      {/* Start Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="space-y-3" onSubmit={addProductHandler}>
          <div className="flex flex-col space-y-3">
            {inputsRender}
            <div className="flex space-x-1 items-center flex-wrap">
              {tempColorsRender}
            </div>
            <div className="flex space-x-1 items-center flex-wrap">
              {colorRender}
            </div>
            <div className="flex space-x-2 items-center">
              <Button className="bg-indigo-700 hover:bg-indigo-800">Add</Button>
              <Button
                className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
                onClick={onCancelAddProduct}
              >
                Close
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      {/* End Add Product Modal */}
    </main>
  );
}

export default App;
