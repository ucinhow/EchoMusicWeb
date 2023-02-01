import { IconType } from "react-icons";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
// import { Button } from "flowbite-react";

const cls =
  "rounded-full flex justify-center items-center w-8 h-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

const createArrow = (Icon: IconType) => () =>
  (
    <button className={cls}>
      <Icon className="w-4 h-4" />
    </button>
  );

export const Left = createArrow(BiLeftArrow);
export const Right = createArrow(BiRightArrow);
