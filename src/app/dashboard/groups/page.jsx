"use client";
import React, { useState ,useEffect} from "react";
import TableFacebook from "@/components/table";
import { Button } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setLoadGroups } from "@/lib/features/groups/groupsSlice";
import { setLoadPosts } from "@/lib/features/posts/postsSlice";
import { CiSearch } from "react-icons/ci";
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
        { type: "groups", keyword: value, MAX_GROUPS: 10, user_id: user.user_id },
        function (response) {
            console.log(response);
        }
        );
    };
    const refreshData = () => { 
      // alert('refresh');  
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

    const onGetPosts = (id) => {
        get(`/user/${user.user_id}/groups/${id}/posts/`,{
            s:0,
            limit:20
        }).then((res)=>{
            dispatch(setLoadPosts({data:res, refresh:true}));
        });
        
    }

    useEffect(() => {
        if(user.user_id){
            if(groups.data.slice(groups.start, groups.start + groups.limit).length === 0) {
                onFetchData();
            }
        }
    }, [
      groups.start
    ]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-w-2xl flex flex-col py-4 relative px-4">
        <input
          name="search post"
          id="search_post"
          className="border border-black rounded-md py-2 px-2"
          placeholder="Tìm kiếm nhóm trên facebook"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        {/* <input className="p-2 border border-gray-200 rounded-md" type="number" placeholder="Thời gian khởi động trước khi vào page cào dữ liêu 1000~1s" /> */}
        <Button onClick={onBtnClick} className="absolute top-5 right-5"><CiSearch className="cursor-pointer w-8 h-8" /></Button>
        
      </div>
      <div className="w-full">
        <TableFacebook onRefresh={refreshData} onGetPosts={onGetPosts}/>
      </div>
    </div>
  );
}
