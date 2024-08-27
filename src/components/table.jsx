'use client'
import React from "react";
import Link from "next/link";
import { Button } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setNextPage, setPreviousPage } from "@/lib/features/groups/groupsSlice";
import { useRouter } from 'next/navigation'
import { setProcess } from "@/lib/features/common/commonSlice";

export default function table() {
  const router = useRouter();
  const groups = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();
  const onCrawlPost = (id) => {
    dispatch(setProcess({process:true}));
    router.push(`/dashboard/groups/${id}`);
  };
  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="px-4 py-2">
                <label for="SelectAll" className="sr-only">
                  Select All
                </label>
                <input
                  type="checkbox"
                  id="SelectAll"
                  className="size-5 rounded border-gray-300"
                />
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name Group
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Privacry
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Members
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Post per day
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                LastUpdated
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {groups.data?.map((item, index) => {
              return (
                <tr key={index}>
                  {/* <td className="px-4 py-2">
                    <label className="sr-only" for="Row1">
                      Row {index}
                    </label>
                    <input
                      className="size-5 rounded border-gray-300"
                      type="checkbox"
                      id={`Row${index}`}
                    />
                  </td> */}
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {/* <Link  href={`/dashboard/groups/${item.id}`}>Crawl posts</Link> */}
                    <Button onClick={()=>onCrawlPost(item.id)}>crawl post</Button>
                </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <Link target="_blank" href={`${item.link}`}>{item.name}</Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.privacy}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.members}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.post_per_day}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.last_sync}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-center  items-center gap-1 text-xs font-medium">
          <li>
            <div 
                onClick={() => dispatch(setNextPage())}
                className="inline-flex size-8 w-64 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
              <span className="">More groups</span>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
