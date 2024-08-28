"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { get } from "@/lib/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setCurrentPost } from "@/lib/features/posts/postsSlice";
import { Button } from "@headlessui/react";
export default function page() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const group_id = searchParams.get("group_id");
  const post_id = searchParams.get("post_id");

  const onGetDetailPost = () => {
    get(`/user/${user.user_id}/groups/${group_id}/posts/${post_id}/`).then(
      (res) => {
        console.log(res);
        dispatch(setCurrentPost({ data: res }));
      }
    );
  };

  useEffect(() => {
    if (group_id && post_id) onGetDetailPost();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col space-y-4">
      <div className="w-full m-w-[465px] h-56 flex flex-row divide-x-2 divide-gray-200 ">
        <div className="flex flex-col h-full flex-1">
        <Image
          src="/avatar/user.png"
          className="rounded-full"
          width={75}
          height={75}
          alt="oke"
        ></Image>
        <div className="flex flex-col ml-2">
          <p className="text-white font-bold text-lg">
            {currentPost?.post?.owner_name}
          </p>
        </div>
        <div>{currentPost?.post?.title}</div>
        </div>
        <div className="flex flex-col h-full lg:w-64 pl-2">
        <div>Số tương tác:{currentPost?.post?.reaction}</div>
        <div>Số bình luận:{currentPost?.comments?.length}</div>
        <div>Số chia sẻ: {currentPost?.post?.share}</div>
        </div>
        
      </div>
      <div className="h-[calc(100vh-14rem-5rem)] overflow-scroll">
        <div className="overflow-auto  rounded-t-lg">
          <table className="min-w-full divide-y-2 bg-white text-sm">
            <thead className="text-left sticky top-0 z-50 inset-x-0 bg-gray shadow-sm saturate-100 backdrop-blur-[1px]">
              <tr>
                <th className="whitespace-nowrap px-1 py-2 font-medium w-8">
                  Người gửi
                </th>
                <th className="whitespace-nowrap  px-4 py-2 font-medium  text-gray-900">
                  Bình Luận
                </th>
                <th className="whitespace-nowrap  px-4 py-2 font-medium w-8 text-gray-900">
                  Phân loại
                </th>
                <th className="whitespace-nowrap  px-4 py-2 font-medium w-8 text-gray-900">
                  Mẫu tin nhắn
                </th>
                <th className="whitespace-nowrap  px-4 py-2 font-medium w-8 text-gray-900">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPost?.comments?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-1 py-2 font-medium w-8 flex flex-row  items-center">
                      <Image
                        src="/avatar/user.png"
                        className="rounded-full"
                        width={25}
                        height={25}
                        alt="oke"
                      ></Image>
                      <Link href={item.sender_link}> {item.sender_name}</Link>
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900`}>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row">
                          <p className="flex-1 font-bold text-wrap">{item.owner_name}</p>
                        </div>
                        <div>{item.content}</div>
                      </div>
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900`}>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row">
                          <p className="flex-1 font-bold text-wrap">Người bán</p>
                        </div>
                      </div>
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900`}>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row">
                          <p className="flex-1 font-bold text-wrap">Template</p>
                        </div>
                      </div>
                    </td>
                    <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900`}>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-row">
                          <Button className="bg-green-500 text-white p-2 rounded-sm">Gửi tin nhắn</Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
