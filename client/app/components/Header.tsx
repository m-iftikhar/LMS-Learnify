import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "@/utils/NavItems";
import { ThemeSwitcher } from "@/utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header = ({ activeItem, setOpen, open }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [active, setActive] = useState(false);

   

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

   const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
     <div className="w-full relative">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 z-80 h-20 w-full border-b border-neutral-200 bg-white/95 shadow-xl backdrop-blur-sm transition duration-500 dark:border-white/15 dark:bg-black"
            : "z-80 h-20 w-full border-b border-neutral-200 bg-white transition duration-500 dark:border-white/15 dark:bg-black"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-20 flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-poppins font-medium text-black dark:text-white"
              >
                Elearning
              </Link>
            </div>
             <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
               <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
             
                <HiOutlineUserCircle
                  size={25}
                  className="hidden md:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              
              </div>
             
          </div>
        </div>
         {/* mobile sidebar */}
            {openSidebar && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-99999 dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-999999999 h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                  <NavItems activeItem={activeItem} isMobile={true} />
                 
                    <HiOutlineUserCircle
                      size={25}
                      className=" hidden md:block cursor-pointer dark:text-white text-black"
                      onClick={() => setOpen(true)}
                    />
                  
                  <br />
                  <br />
                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                    Copyright © 2023 ELearning
                  </p>
                </div>
              </div>
            )}
          {/* </div> */}
      </div>
    </div>
  );
};

export default Header;