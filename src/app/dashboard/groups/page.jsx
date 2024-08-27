"use client";
import React, { useState ,useEffect} from "react";
import TableFacebook from "@/components/table";
import { Button } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setLoadGroups } from "@/lib/features/groups/groupsSlice";
import {get} from "@/lib/api";
export default function page() {
  const [value, setValue] = useState("");
    const dispatch = useAppDispatch();
    const user = useAppSelector((state)=>state.user);
    const groups = useAppSelector((state)=>state.groups);   
    const onBtnClick = () => {
        // The ID of the extension we want to talk to.
        var editorExtensionId = "imdkedocinphibhlgmfabcfbpihcopid";
        chrome.runtime.sendMessage(
        editorExtensionId,
        { type: "groups", keyword: value },
        function (response) {
            console.log(response);
        }
        );
    };
    const refreshData = () => { 
        get(`/user/${user.user_id}/groups/`,{
            s:0,
            limit:groups.limit
        }).then((res)=>{
            dispatch(setLoadGroups({data:res, refresh:true}));
        });
    };

    const onFetchData = () => {
        get(`/user/${user.user_id}/groups/`,{
            s:groups.start,
            limit:groups.limit
        }).then((res)=>{
            dispatch(setLoadGroups({data:res, start:groups.start}));
        });
    };
    useEffect(() => {
        console.log(groups.start);
        if(user.user_id){
            if(groups.data.slice(groups.start, groups.start + groups.limit).length === 0) {
                onFetchData();
            }
        }
    }, [
      groups.start
    ]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col px-10 py-4">
        <label htmlFor="search_post">Search posts</label>
        <textarea
          name="search post"
          id="search_post"
          className="border border-black rounded-md"
          placeholder="Tìm kiếm group"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <Button
          onClick={onBtnClick}
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Find Groups
        </Button>
      </div>

      <div className="w-full">
        <Button onClick={()=>refreshData()}>Refresh</Button>
        <TableFacebook />
      </div>
    </div>
  );
}
