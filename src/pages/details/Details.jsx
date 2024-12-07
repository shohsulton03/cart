import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api";
import { useStateValue } from "../../context";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(0);
  const { setWishlist, wishlist, setCart, cart } = useStateValue();

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => setData(res.data))
      .catch((error) => setError(error));
  }, []);
  console.log(id);

  const handleLike = (product) => {
    const index = wishlist.findIndex((item) => item.id === product.id);
    if (index < 0) {
      setWishlist((prev) => [...prev, product]);
    } else {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const handleAddToCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index < 0) {
      setCart((prev) => [...prev, { ...product, amount: 1 }]);
    } else {
      setCart((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const handleImg = (inx) => {
    setImg(inx);
  };

  return (
    <section>
      <div className="container">
        <div className="flex items-start mt-[47px] gap-8">
          <div>
            <div className="w-[540px] h-[433px]">
              <img
                className="w-full h-full object-cover"
                src={data?.images[img]}
                alt=""
              />
            </div>
            <div className="flex gap-2 mt-8">
              {data?.images?.map((url, inx) => (
                <img
                  className={`w-20 ${
                    img === inx ? "opacity-100" : "opacity-60"
                  }`}
                  onClick={() => handleImg(inx)}
                  src={url}
                  key={inx}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="max-w-[540px]">
            <h2 className="text-[26px] leading-[56px] font-medium text-[#272727]">
              {data?.title}
            </h2>
            <p className="max-w-[450px]">{data?.description}</p>
            <p className="text-[26px] leading-[56px] font-semibold mt-4">
              <span className="text-[#56B280]">${data?.price}</span>
            </p>
            <div className="flex items-center gap-12 mt-4">
              <button onClick={() => handleLike(data)} className="text-xl">
                {wishlist?.some((item) => item?.id === data?.id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <button
                onClick={() => handleAddToCart(data)}
                className="flex items-center gap-2 bg-[#56B280] py-[8px] px-[44px] text-white"
              >
                {cart?.some((item) => item.id === data?.id) ? (
                  <IoCartSharp />
                ) : (
                  <IoCartOutline />
                )}
                <span>+Add to cart</span>
              </button>
            </div>
            <div className="mt-[40px] border p-[22px]">
                <p className="text-[#839A8E]"><span className="text-[#1D252C] font-medium">Wax:</span> Top grade Soy wax that delivers a smoke less,  consistent burn</p>
                <p className="text-[#839A8E]"><span className="text-[#1D252C] font-medium">Fragrance:</span> Premium quality ingredients with natural essential oils </p>
                <p className="text-[#839A8E]"><span className="text-[#1D252C] font-medium whitespace-nowrap">Burning Time:</span> 70-75 hours</p>
                <p className="text-[#839A8E]"><span className="text-[#1D252C] font-medium whitespace-nowrap">Demension:</span> {data?.dimensions?.width}x{data?.dimensions?.height}</p>
                <p className="text-[#839A8E]"><span className="text-[#1D252C] font-medium whitespace-nowrap">Burning Time:</span> 70-75 hours</p>
                <p className="text-[#839A8E]"><span className="text-[#1D252C] font-medium whitespace-nowrap">Weight:</span> {data?.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
