"use client";
import { ConcessionType, OrderConcessionType } from "@/types/concession";
import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AppHelper } from "@/utils/helpers";
import { Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
export interface IConcessionsProps {
  data: ConcessionType[];
}

const ListMenu = [
  { id: 1, title: "Combo", imgs: require("@/assets/burger.png") },
  { id: 2, title: "Bắp", imgs: require("@/assets/cashew.png") },
  { id: 3, title: "Nước", imgs: require("@/assets/coke.png") },
  { id: 4, title: "Snacker", imgs: require("@/assets/fast-food.png") },
];

export default function Concessions(props: IConcessionsProps) {
  const { data } = props;
  const [selectedMenu, setSelectedMenu] = React.useState(1);
  const [titleSelected, setTitleSelected] = React.useState(ListMenu[0].title);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<OrderConcessionType>({
    id: "",
    name: "string",
    description: "string",
    itemId: 0,
    imageUrl: "",
    price: 0,
    maxQuantity: 0,
    headOfficeItemCode: "",
    type: "",
    quanty: 1,
  });
  const [order, setOrder] = React.useState<OrderConcessionType>({
    id: "",
    name: "string",
    description: "string",
    itemId: 0,
    imageUrl: "",
    price: 0,
    maxQuantity: 0,
    headOfficeItemCode: "",
    type: "",
    quanty: 1,
  });

  const handleMenu = (menu: any) => {
    setSelectedMenu(menu?.id);
    setTitleSelected(menu?.title);
  };
  const handleItem = (item: ConcessionType) => {
    setIsOpen(true);
    setProduct({ ...item, quanty: 1 });
  };

  const handleApply = () => {
    setIsOpen(false);
    setOrder({ ...product });
  };
  return (
    <div className="flex flex-col mt-8 container mx-auto relative">
      <nav className="menu mx-20 m-10">
        <ul className="grid grid-cols-2 auto-cols-min gap-6 w-[300px]">
          {ListMenu.map((menu) => (
            <motion.li
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              key={menu.id}
              className={`flex relative items-center justify-center text-center rounded-2xl w-32 h-32 cursor-pointer  ${
                selectedMenu === menu.id
                  ? "text-white"
                  : "bg-secondary-100 text-black"
              }`}
              onClick={() => handleMenu(menu)}
            >
              <p>
                <Image
                  src={menu.imgs}
                  width={40}
                  height={40}
                  alt={menu.title}
                  className="inline"
                />
                <span className="block">{menu.title}</span>
              </p>
              {menu.id === selectedMenu && (
                <motion.div className="underline" layoutId="underline" />
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className="products mx-20 mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={titleSelected ? titleSelected : ""}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-10 text-xl font-bold not-italic">
              {titleSelected && titleSelected}
            </h3>
            {data && data?.length > 0 && (
              <ul className="grid grid-cols-3 auto-cols-min gap-8 w-[500px]">
                {data.map((item) => (
                  <motion.li
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    key={item.id}
                    className={`flex relative  items-center justify-center text-center rounded-2xl w-36 h-36 cursor-pointer bg-secondary-100`}
                    onClick={() => handleItem(item)}
                  >
                    <p>
                      <Image
                        src={item.imageUrl}
                        width={40}
                        height={40}
                        alt={item.name}
                        className="inline"
                      />
                      <span className="block">{item.name}</span>
                      <span className="block">
                        {AppHelper.fomartCurrencyVND(item.price)}
                      </span>
                    </p>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
        <h3>{}</h3>
      </main>
      <div className="flex flex-col justify-between absolute right-0 top-0 w-[400px] rounded-xl h-full bg-secondary-100 py-6">
        <h3 className="mb-10 text-xl font-bold not-italic px-6 flex-none w-14">
          My Order
        </h3>
        <div className="list__order border-t border-b grow">
          <div className="order__detail flex justify-center flex-col items-center mt-3">
            <Image
              src={order.imageUrl ?? ""}
              width={80}
              height={80}
              alt={order.name ?? ""}
              className="block"
            />
            <p className="mt-5 text-lg font-bold">{order.name}</p>
            <p className="mt-1 text-sm font-bold text-primary-500">
              {AppHelper.fomartCurrencyVND(order.price)}
            </p>
            <div className="py-1 px-2 focus-within:shadow-qty-focus rounded">
              <button
                className="px-2"
                onClick={() => {
                  setProduct({
                    ...product,
                    quanty: product.quanty >= 1 ? product.quanty - 1 : 0,
                  });
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button className="inline-block px-2 mx-1">
                {product.quanty}
              </button>
              <button
                className="px-2"
                onClick={() => {
                  setProduct({ ...product, quanty: product.quanty + 1 });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>
        <div className="order__total px-6 flex-none">
          <h3>Tổng</h3>
          <p> {AppHelper.fomartCurrencyVND(10000)}</p>
          <button className="w-[140px] bg-[#F58020] h-10 rounded font-bold text-[14px] text-white shadow-[3px_2px_5px_0px_rgba(0,0,0,0.56)]">
            Thanh Toán
          </button>
        </div>
      </div>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        key="bottom"
        height={600}
        style={{ borderTopLeftRadius: "60px", borderTopRightRadius: "60px" }}
      >
        <div className="flex justify-between flex-col items-center h-full">
          <div className="iconClose flex-none">
            <button className="text-lg" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="grow flex justify-start flex-col items-center">
            <Image
              src={product.imageUrl ?? ""}
              width={180}
              height={180}
              alt={product.name ?? ""}
              className="block"
            />
            <p className="mt-5 text-2xl font-bold">{product.name}</p>
            <p className="mt-1 text-base font-normal">{product.description}</p>
            <p className="mt-1 text-2xl font-bold text-primary-500">
              {AppHelper.fomartCurrencyVND(product.price)}
            </p>
            <div className="flex bg-white border-md rounded shadow-qty">
              <div className="py-1 px-2 focus-within:shadow-qty-focus rounded">
                <button
                  className="px-2"
                  onClick={() => {
                    setProduct({
                      ...product,
                      quanty: product.quanty >= 1 ? product.quanty - 1 : 0,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button className="inline-block px-2 mx-1">
                  {product.quanty}
                </button>
                <button
                  className="px-2"
                  onClick={() => {
                    setProduct({ ...product, quanty: product.quanty + 1 });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="flex-none w-[140px] bg-[#F58020] h-10 rounded font-bold text-[14px] text-white"
            onClick={handleApply}
          >
            Apply
          </motion.button>
        </div>
      </Drawer>
    </div>
  );
}
