"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import {
  setNextPage,
  setPreviousPage,
} from "@/lib/features/groups/groupsSlice";
import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";
import { setProcess } from "@/lib/features/common/commonSlice";

export default function table({ onRefresh }) {
  const router = useRouter();
  const groups = useAppSelector((state) => state.groups);
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [currentGroupID, setCurrentGroupID] = React.useState({});
  
  const onCrawlPost = (id) => {
    setCurrentGroupID(id);
    // Call api to get posts
    // set to post data
    // 

  };
  return (
    <div className="flex h-[calc(100vh-10rem)]">
      {/* Table left */}
      <div className="rounded-lg border border-gray-200 md:w-1/3 h-full">
        <div className="overflow-auto max-h-[100%] rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left sticky top-0 z-50 inset-x-0 bg-gray shadow-sm saturate-100 backdrop-blur-[1px]">
              <tr>
                <th className="whitespace-nowrap  px-4 py-2 font-medium text-gray-900">
                  Groups
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 ">
              {groups.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 hover:bg-blue-400 ${item.id===currentGroupID && "bg-blue-400"}`} onClick={()=>{setCurrentGroupID(item.id)}}>
                      {/* <Link target="_blank" href={`${item.link}`}> */}
                        {/* {item.name} */}
                      {/* </Link> */}
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row">
                        <p className="flex-1 font-bold">{item.name}</p>  
                        <p className={`w-20 text-center p-1 rounded-sm text-white font-bold ${item.privacy==="Private"? "bg-red-400": "bg-blue-400"}`}>{item.privacy}</p>  
                        </div> 
                        <div className="flex flex-row">
                          <div className="flex-1 space-x-2">
                          <span className="bg-yellow-500 text-center w-12 p-1 rounded-sm text-white">{item.members}</span>
                          <span className="bg-green-600 text-center text-white rounded-sm p-1">{item.post_per_day} posts/day</span>
                          </div>
                          <span className="text-gray-600 text-sm">{item.last_sync}</span>
                         
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-center items-center gap-1 text-xs font-medium">
            <li>
              <div
                onClick={() => dispatch(setNextPage())}
                className="inline-flex size-8 w-64 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="">More</span>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Table right */}
      <div className="md:w-2/3  ">
        <div className="overflow-auto max-h-[95%] rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left  sticky top-0 z-50 inset-x-0 bg-gray shadow-sm saturate-100 backdrop-blur-[1px]">
              <tr>
                <th className="whitespace-nowrap sticky top-0 px-4 py-2 font-medium text-gray-900">
                  Posts
                </th>
              </tr>
            </thead>
            
            
            <tbody className="divide-y divide-gray-200 ">
              {posts.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {/* <Link target="_blank" href={`${item.link}`}> */}
                    
                        {/* {item.content} */}
                      {/* </Link> */}
                      <div className="flex flex-col">
                          <div className="flex flex-row">
                            <div className="flex flex-col flex-1">
                            <p className="flex-1">Người đăng: <span>{item.owner_name}</span> </p>
                            <p><span className="decoration-black ">Tiêu đề:</span>  {item.content}</p>

                            </div>
                            <p className="w-20 text-center p-1 rounded-sm text-gray-500">{item.date}</p>
                          </div>
                          <div className="flex flex-row space-x-1">
                            <Link href ={item.link} target="_blank" className="p-1">Open post</Link>  
                            <p className="p-1 text-center">Số tương tác {item.reaction}</p>
                            <Link href={`/dashboard/groups/${item.id}`} className="text-center p-1 bg-rose-400 text-white">Comments</Link>
                          </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
          <ol className="flex justify-center items-center gap-1 text-xs font-medium">
            <li>
              <div
                onClick={() => dispatch(setNextPage())}
                className="inline-flex size-8 w-64 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
              >
                <span className="">More</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
