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
import { ConvertHummanDateTime } from "@/lib/utils/datetime";
import { FaAnglesDown } from "react-icons/fa6";

export default function table({ onRefresh, onGetPosts }) {
  const router = useRouter();
  const groups = useAppSelector((state) => state.groups);
  const posts = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [currentGroupID, setCurrentGroupID] = React.useState(null);

  const onRefereshDataPost = () => {
    var editorExtensionId = "imdkedocinphibhlgmfabcfbpihcopid";

    chrome.runtime.sendMessage(
      editorExtensionId,
      {
        type: "posts",
        link_group: groups.data.filter((gp) => gp.id === currentGroupID)[0]
          .link,
        MAX_POSTS: 1,
        MAX_COMMENTS: 10,
        user_id: user.user_id,
        group_id: currentGroupID,
      },
      function (response) {
        console.log(response);
      }
    );
  };
  return (
    <div className="w-full flex h-[calc(100vh-10rem)]">
      {/* Table left */}
      <div className="rounded-lg border border-gray-200 w-full md:w-2/4 h-full">
        <div className="overflow-auto max-h-[100%] rounded-t-lg">
          <table className="divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left sticky top-0 z-40 inset-x-0 bg-gray shadow-sm saturate-100 backdrop-blur-[10px]">
              <tr>
                <th className="whitespace-nowrap text-lg font-bold uppercase   px-4 py-2  text-gray-900">
                  Groups
                  <FiRefreshCcw
                    className="absolute top-1 right-3 z-50 size-6"
                    onClick={() => {}}
                  ></FiRefreshCcw>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 ">
              {groups.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 hover:bg-blue-400 ${
                        item.id === currentGroupID && "bg-blue-400"
                      }`}
                      onClick={() => {
                        setCurrentGroupID(item.id);
                        onGetPosts(item.id);
                      }}
                    >
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row">
                          <p className="flex-1 font-bold text-wrap">
                            {item.name}
                          </p>
                          <p
                            className={`w-20 text-center p-1 rounded-sm text-white font-bold ${
                              item.privacy === "Private"
                                ? "bg-red-400"
                                : "bg-blue-400"
                            }`}
                          >
                            {item.privacy}
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <div className="flex-1 space-x-2">
                            <span className="bg-yellow-500 text-center w-12 p-1 rounded-sm text-white">
                              {item.members}
                            </span>
                            <span className="bg-green-600 text-center text-white rounded-sm p-1">
                              {item.post_per_day}
                            </span>
                          </div>
                          <span className="text-gray-600 text-sm">
                            {ConvertHummanDateTime(item.last_sync)}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center">
              <div
                onClick={() => dispatch(setNextPage())}
                className="inline-flex size-8 w-64 items-center justify-center  text-gray-900 rtl:rotate-180 cursor-pointer hover:text-red-500"
              >
                More <FaAnglesDown></FaAnglesDown>
              </div>
        </div>
      </div>

      {/* Table right */}
      <div className="rounded-lg border border-gray-200 w-full md:w-2/4 h-full">
        <div className="overflow-y-scroll max-h-[100%] rounded-t-lg">
          {currentGroupID && (
            <FiRefreshCcw onClick={onRefereshDataPost}></FiRefreshCcw>
          )}
          <table className="divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left  sticky top-0 z-50 inset-x-0 bg-gray shadow-sm saturate-100 backdrop-blur-[10px]">
              <tr>
                <th className="whitespace-nowrap  text-lg uppercase sticky top-0 px-4 py-2 font-bold text-gray-900">
                  Posts
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 ">
              {posts.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-wrap px-4 py-2 font-medium text-gray-900">
                      <div className="flex flex-col">
                        <div className="flex flex-row">
                          <div className="flex flex-col flex-1">
                            <p className="flex-1">
                              Người đăng: <span>{item.owner_name}</span>{" "}
                            </p>
                            <p>
                              <span className="decoration-black ">
                                Tiêu đề:
                              </span>{" "}
                              {item.title}
                            </p>
                          </div>
                          <p className="w-20 text-center p-1 rounded-sm text-gray-500">
                            {ConvertHummanDateTime(item.post_date)}
                          </p>
                        </div>
                        <div className="flex flex-row space-x-1">
                          <Link
                            href={item.link_post}
                            target="_blank"
                            className="p-1"
                          >
                            Mở bài viết
                          </Link>
                          <p className="p-1 text-center">
                            Số tương tác {item.reaction}
                          </p>
                          <Link
                            href={`/dashboard/posts?group_id=${currentGroupID}&post_id=${item.id}`}
                            className="text-center p-1 bg-rose-400 text-white"
                          >
                            Bình luận
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <div>Chưa có bài viết</div> */}
        </div>
        {currentGroupID && posts.data.length >0 &&<div className="flex justify-center items-center">
              <div
                onClick={() => dispatch(setNextPage())}
                className="inline-flex size-8 w-64 items-center justify-center  text-gray-900 rtl:rotate-180 cursor-pointer hover:text-red-500"
              >
                More <FaAnglesDown></FaAnglesDown>
              </div>
        </div>}
        {
          currentGroupID && posts.data.length === 0 && <div className="h-full flex items-center justify-center">
          <div className=" px-2 py-1 border border-gray-200 rounded-sm">Chưa có bài viết nào</div>
          </div>
        }
      

      </div>
    </div>
  );
}
