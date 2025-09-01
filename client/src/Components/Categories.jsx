import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slices/categorieSlice";
import { TbMoodKid } from "react-icons/tb";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { MdSportsBasketball } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { TbDeviceTvOld } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { TbWashMachine } from "react-icons/tb";

export default function Categories() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.data);


  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const elems = [
    {
      item: items[0]?.name,
      logo: <MdOutlinePhoneAndroid style={{ fontSize: "20px" }} />,
    },
    {
      item: items[1]?.name,
      logo: <FaComputer style={{ fontSize: "20px" }} />,
    },
    {
      item: items[2]?.name,
      logo: <AiOutlineHome style={{ fontSize: "20px" }} />,
    },
    {
      item: items[3]?.name,
      logo: <MdSportsBasketball style={{ fontSize: "20px" }} />,
    },
    {
      item: items[4]?.name,
      logo: <TbMoodKid style={{ fontSize: "20px" }} />,
    },
    {
      item: items[5]?.name,
      logo: <GiConsoleController style={{ fontSize: "20px" }} />,
    },
    {
      item: items[6]?.name,
      logo: <TbDeviceTvOld style={{ fontSize: "20px" }} />,
    },
    {
      item: items[7]?.name,
      logo: <GiClothes style={{ fontSize: "20px" }} />,
    },
    {
      item: items[8]?.name,
      logo: <MdOutlinePhoneAndroid style={{ fontSize: "20px" }} />,
    },
        {
      item: items[9]?.name,
      logo: <TbWashMachine style={{ fontSize: "20px" }} />,
    },
  ];

  return (
    <>
      <div>
        {elems.map((item, index) => (
          <div key={index} className="flex justif-left text-[12px] hover:text-orange-500 transition-colors text-gray-700 p-2 cursor-pointer">
            {item.logo}
            <div className="ml-1 mt-[2px]" key={index}>
              {item.item}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
