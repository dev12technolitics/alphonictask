import { Link } from "@mui/material";
import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

export default function Acoordions() {
  const [subShow, setSubShow] = useState(false);
  return (
    <div className="">
      <div
        onClick={() => setSubShow(!subShow)}
        className="text-[#3E79F7] ml-auto text-base font-bold py-3 px-5 flex items-center justify-between "
      >
        <FaUserCircle className="mr-8" size="22px" /> Friends
        <span
          className={`${
            subShow === true ? "rotate-90 transition-all ml-8" : "ml-8"
          }`}
        >
          <BiChevronRight className="text-[#455560]" size="22px" />
        </span>
      </div>

      {subShow ? (
        <div>
          <Link href="/friends">
            <div
              className="text-[#3e4152] text-[15px] font-bold no-underline py-3 px-5 flex items-center justify-between "
              style={{
                paddingLeft: "75px",
              }}
            >
              Friends List
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
