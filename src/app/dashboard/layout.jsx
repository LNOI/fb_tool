'use client'
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { FcButtingIn } from "react-icons/fc";
import { FaHistory } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";
import { BsClipboardDataFill } from "react-icons/bs";
import { MdOutlineGroups } from "react-icons/md"; 
import { GiPostStamp } from "react-icons/gi";
import { FaCommentAlt } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Menu = [
    {
        title : "Dữ liệu",
        href : "/dashboard/groups",
        icon : <BsClipboardDataFill/>,  
    },
    {
        title : "Tự động",
        href : "/dashboard/groups",
        icon : <FaRobot/>,
        subMenu : true,
        subMenuItems : [
            {
                title : "Đăng bài",
                href : "/dashboard/groups",
            },
            {
                title : "Bình luận",
                href : "/dashboard/groups",
            },
            {
                title : "Gửi tin nhắn",
                href : "/dashboard/groups",
            }
        ]
    }

]

const UserMock = {
    name : "thanhloidev",
    avatar : "/avatar/user.png"
}

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(0);


    return (
      <div className="w-full flex flex-row justify-start">
        <div className={`${ openMenu ? "flex flex-col" : "hidden" } text-gray-300 bg-gray-950 duration-0  lg:flex lg:flex-col lg:w-64 h-screen `}>
            <div className="w-full h-14 relative overflow-hidden">
                <Image src="/logo/marketing_tool.png" width={120} height={0} className="mx-auto -mt-8 overflow-hidden"  alt="image"/>
                {
                   openMenu && <span className="block lg:hidden absolute -right-4 top-0 " onClick={()=>setOpenMenu(false)}>X</span>
                }
            </div>
            <div className="w-full flex-1 flex flex-col pt-4 px-4  lg:pt-8">
                <div className="flex-1 flex flex-col space-y-2">
                    <ul className="space-y-2 lg:space-y-4">
                    {
                        Menu.map((item, index)=>
                            <li key={index} className="rounded-md">
                                <Link href={item.href || "/"} className={`flex flex-row space-x-2 items-center justify-start ${index===currentMenu && "bg-gray-800"} hover:bg-gray-800 focus:bg-gray-800 px-2 py-2 rounded-md`} onClick={()=>setCurrentMenu(index)}>
                                    <span >{item.icon}</span>
                                    <span >{item.title}</span>
                                </Link>
                                <ul className="pl-4">
                                {
                                    item.subMenu && <>
                                        {
                                            item.subMenuItems.map((subItem, subIndex)=> 
                                                <li key={subIndex} className="pl-4 mt-2">
                                                    <Link href={subItem.href || "/"} className="flex flex-row items-center justify-start hover:text-red-600">
                                                        <span className="">{subItem.icon}</span>
                                                        <span className="">{subItem.title}</span>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </>
                                }
                                </ul>
                            </li>
                            )
                    }
                    </ul>
                    
                </div>
                <div className="h-10">
                    <div className="flex items-center justify-center">
                        <Image src={UserMock.avatar} width={30} height={30} className="bg-transparent rounded-md" alt="image"/>
                        <span className="">{UserMock.name}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full flex flex-col">
            {/* <div className="w-full h-12  flex flex-row items-center justify-center">
                {
                    !openMenu && <RiMenu2Fill className="block lg:hidden" onClick={()=> setOpenMenu(true)}></RiMenu2Fill>                 
                }
                <div className="flex-1">
                    <div className="flex flex-row relative w-full px-4">
                        <FaSearch className="absolute left-5 top-1"/>
                        <input type="text" className="w-full pl-6 rounded-xl" placeholder="Search history"/>
                    </div>
                </div>
            </div> */}
            <div className="w-full flex-1">             
                {children}
            </div>
        </div>
      </div>
    )
  }