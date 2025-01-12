import { useCallback, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/Ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/Ui/Select";
import { TInput } from "./types";
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
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productEdit, setProductEdit] = useState<IProduct>(defaultProduct);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
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
    setProduct(defaultProduct);
  }
  function closeEditModal() {
    setIsModalEditOpen(false);
    setProductEdit(defaultProduct);
  }
  const openEditModal = useCallback(() => {
    setIsModalEditOpen(true);
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  const openConfirmModal = useCallback(() => {
    setProductEdit(product);
    setIsOpenConfirmModal(true);
  }, []);

  function closeConfirmModal() {
    setIsOpenConfirmModal(false);
    setProductEdit(defaultProduct);
  }

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    },
    []
  );

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProductEdit((prevProduct) => ({
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
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prevProducts,
    ]);
    setProduct(defaultProduct);
    setTempColors([]);
    closeModal();
  }
  function editProductHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { title, description, imageURL, price } = productEdit;
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
    const updatedProducts = products.map((product) => {
      if (product.id === productEdit?.id) {
        return {
          ...product,
          title,
          description,
          imageURL,
          price,
          colors: tempColors.concat(productEdit.colors),
          category: selectedCategory,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setProductEdit(defaultProduct);
    setTempColors([]);
    closeEditModal();
  }
  function removeProductHandler() {
    const updatedProducts = products.filter(
      (product) => product.id !== productEdit?.id
    );
    setProducts(updatedProducts);
    closeConfirmModal();
  }
  /* ------- RENDER -------  */
  const renderProductsList = products?.map((product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setProductEdit={setProductEdit}
        openEditModal={openEditModal}
        openConfirmModal={openConfirmModal}
      />
    );
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
          }
          if (productEdit.colors.includes(color)) {
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

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TInput
  ) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productEdit[name]}
          onChange={handleEditChange}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto max-w-screen-xl">
      <Button onClick={openModal} className="bg-blue-500">
        Add New Product
      </Button>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4  m-5 place-items-center">
        {renderProductsList}
      </div>
      {/* Start Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeEditModal} title="Edit Product">
        <form className="space-y-3" onSubmit={addProductHandler}>
          <div className="flex flex-col space-y-3">
            {inputsRender}
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
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
      {/* ----------------------------- */}
      {/* Start Edit Product Modal */}
      <Modal
        isOpen={isModalEditOpen}
        closeModal={closeEditModal}
        title="Add A New Product"
      >
        <form className="space-y-3" onSubmit={editProductHandler}>
          <div className="flex flex-col space-y-3">
            {renderProductEditWithErrorMsg("title", "Product Title", "title")}
            {renderProductEditWithErrorMsg(
              "description",
              "Product Description",
              "description"
            )}
            {renderProductEditWithErrorMsg(
              "imageURL",
              "Product Image URL",
              "imageURL"
            )}
            {renderProductEditWithErrorMsg("price", "Product Price", "price")}
            <div className="flex flex-col space-y-3">
              <Select
                selected={productEdit.category}
                setSelected={(value) =>
                  setProductEdit({ ...productEdit, category: value })
                }
              />
            </div>
            <div className="flex space-x-1 items-center flex-wrap">
              {tempColors.concat(productEdit?.colors)?.map((color) => {
                return (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
                  >
                    {color}
                  </span>
                );
              })}
              <div className="flex space-x-1 items-center flex-wrap">
                {colorRender}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Edit
              </Button>
              <Button
                className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
                onClick={closeEditModal}
              >
                Close
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      {/* End  Edit Product Modal */}
      {/* Start Delete Product Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      {/* End Delete Product Modal */}
    </main>
  );
}

export default App;
