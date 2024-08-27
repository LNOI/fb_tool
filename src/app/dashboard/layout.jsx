'use client'
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { FcButtingIn } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
const Menu = [
    {
        title : "Crawl Data Facebook",
        path : "/dashboard/groups",
        icon : <FaSquareFacebook/>,  
    },
    
]
const MenuItems = (item, index,open) => {
    const [openSubMenu, setOpenSubMenu] = useState(false);
    return(
        <li key={index} className="mt-4">
            <Link href={item.path}>
            <div className="flex items-center rounded-md px-2 py-2 mx-2 hover:bg-slate-200 hover:text-black text-sm">
                <span className="mr-2">{item.icon}</span>
                <span className={`flex-1 ${!open && "hidden"}`}>{item.title}</span>  
                {item.subMenu&&<FaAngleDown className={`${!open && "hidden"} text-xl duration-100 ${openSubMenu && "rotate-180"}`} onClick={()=> setOpenSubMenu(!openSubMenu)}/>}
            </div></Link>
          
            {item.subMenu && openSubMenu &&<ul className="pt-2 pl-5 duration-150 gap-2">
                {
                    item.subMenuItems.map((subItem, subIndex)=>
                        <li key={subIndex} className="flex items-center gap-2">
                            <span>{subItem.title}</span>
                        </li>
                    )
                }
            </ul>
            }
        </li>
    )
}

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex">
        <div className={`bg-slate-900 ${ open?"w-56":"w-24"} duration-300  text-white h-screen relative pl-2`}>
            <FaAngleLeft className={`absolute top-4 ${!open&& "rotate-180"} -right-4 bg-white cursor-pointer border-black border text-black text-3xl rounded-full`} onClick={()=>setOpen(!open)}/>
            <div className="inline-block">
                <Image src="/logo/logo_facebook.png" width={100} height={100} className={`bg-transparent rounded-md ${open&& "rotate-[360deg]"} duration-300`} alt="image"/>
            </div>  

            <ul className="pt-4">
                {
                    Menu.map((item, index)=>
                        MenuItems(item, index,open)
                    )
                }
            </ul>

            <div className="absolute bottom-0 left-0">
                <div className="flex items-center mx-2 my-4">
                <FcButtingIn className={`text-4xl ${open&&"mr-2"}`}/>
                <span className={`${!open&&"scale-0"} duration-0 origin-left`}>thanhloidev</span>
                </div>
                
            </div>
        </div>
        <div className="w-full">{children}</div>
       
      </div>
    )
  }