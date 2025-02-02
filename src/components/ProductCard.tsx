import { memo } from "react";
import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./Ui/Button";

interface IProductCardProps {
  product: IProduct;
  setProductEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openConfirmModal: () => void;
}
function ProductCard({
  product,
  setProductEdit,
  openEditModal,
  openConfirmModal,
}: IProductCardProps) {
  const { title, description, imageURL, price, colors, category } = product;
  function onEditHandler() {
    setProductEdit(product);
    openEditModal();
  }

  function onDestroyHandler() {
    openConfirmModal();
    setProductEdit(product);
  }
  return (
    <div className="border rounded-md p-2 flex flex-col max-w-sm md:max-w-lg">
      <Image imageURL={imageURL} alt={title} style="rounded-md mb-2" />

      <h1>{title}</h1>
      <p>{textSlicer(description)}</p>

      <div className="flex items-center space-x-2 my-4">
        {colors?.map((color) => (
          <CircleColor key={color} color={color} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span>${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          style="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex space-x-2 items-center justify-between my-4">
        <Button className=" bg-slate-700" onClick={onEditHandler}>
          Edit
        </Button>

        <Button className=" bg-orange-500" onClick={onDestroyHandler}>
          Destroy
        </Button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
