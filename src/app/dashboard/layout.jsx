'use client'
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { BsClipboardDataFill } from "react-icons/bs";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaAlignLeft } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
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

const getReactions = (str) =>{
    const regex = /Tất cả cảm xúc:\s*(\d+)/;

    const match = str.match(regex);

    if (match) {
        return  parseInt(match[1], 10),        
    } else {
        return 0;
    }
}

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(0);
    const [menuMobile, setMenuMobile] = useState(false);
    return (
      <div className="flex h-screen overflow-hidden">
        <aside className={`text-bodydark absolute left-0 top-0 z-50 flex h-screen w-72 bg-black flex-col overflow-y-hidden duration-300 ease-linear dark:bg-black lg:static lg:translate-x-0 -translate-x-full ${menuMobile && "translate-x-0"}`}>
                <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-7">
                    <Link href="/dashboard"  className="m-auto font-bold " >MARKETING TOOL</Link>
                    <FaChevronLeft className="block lg:hidden" onClick={()=> setMenuMobile(false)}></FaChevronLeft>
                </div>
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                        <div>
                            <h3 class="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>
                            <ul className="mb-6 flex flex-col gap-2 px-4 space-y-2"> 
                                {
                                    Menu.map((item, index)=>{
                                        return <li key={index}>
                                            <div className={`py-2 flex flex-row rounded-sm px-3 justify-center ${index===currentMenu && "bg-gray-700 "}`} onClick={()=>setCurrentMenu(index)}>
                                                <Link href={item.href} className="flex flex-row gap-2 justify-start items-center flex-1">                                                
                                                        {item.icon}
                                                        <span>{item.title}</span>
                                                </Link>
                                                { item.subMenu && <div onClick={()=>setOpenMenu(!openMenu)}>{openMenu ? <FaAngleUp></FaAngleUp>:<FaAngleDown/> }</div>}
                                            </div>
                                            {
                                                item.subMenu && currentMenu === index && openMenu && <ul className="flex flex-col gap-1 px-6">
                                                    {
                                                        item.subMenuItems.map((subItem, subIndex)=>{
                                                            return <li key={subIndex}>
                                                                <Link href={subItem.href} className="flex flex-row gap-2 justify-start items-center">                                                
                                                                    {subItem.icon}
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
        </aside>
        <div className="w-full flex flex-col">
            <div className="w-full h-12  flex flex-row items-center justify-center space-x-2 px-2">
                <FaAlignLeft className="block lg:hidden" onClick={()=> setMenuMobile(true)}></FaAlignLeft>     
                <div className="flex-1">
                    <div className="flex flex-row relative w-full px-4">
                        <CiSearch className="absolute left-5 top-1"/>
                        <input type="text" className="w-full pl-6 rounded-xl" placeholder="Search history"/>
                    </div>
                </div>
            </div>
            <div className="w-full flex-1">             
                {children}
            </div>
        </div>
      </div>
    )
  }