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
//     dispatch(setProcess({ process: true }));
    // router.push(`/dashboard/groups/${id}`);
    
  };
  return (
    <div className="flex h-auto">
      {/* Table left */}
      <div className="rounded-lg border border-gray-200 md:w-1/3">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Groups
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {groups.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 hover:bg-blue-400 ${item.id===currentGroupID && "bg-blue-400"}`} onClick={()=>{setCurrentGroupID(item.id)}}>
                      <Link target="_blank" href={`${item.link}`}>
                        {item.name}
                      </Link>
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
      <div className="md:w-2/3 h-full">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Posts
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 max-h-[100vh]">
              {posts.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <Link target="_blank" href={`${item.link}`}>
                        {item.content}
                      </Link>
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
