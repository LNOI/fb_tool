"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setProcess } from "@/lib/features/common/commonSlice";
export default function group({ params }) {
  const groups = useAppSelector((state) => state.groups);
  const common = useAppSelector((state) => state.common);
  const [loading, setLoading] = useState(false);

  const initialized = useRef(false);
  const onLoadingPosts = () => {
    if (!initialized.current) {
      initialized.current = true;
      setLoading(true);
      if (params.slug) {
        const group = groups.data.filter((gp) => gp.id === params.slug)[0];
        var editorExtensionId = "imdkedocinphibhlgmfabcfbpihcopid";
        if (group) {
            
          chrome.runtime.sendMessage(
            editorExtensionId,
            { type: "posts", link_group: group.link },
            function (response) {
              console.log(response);
            }
          );
        }
        setProcess({ process: false });
      }
    }
  };
  useEffect(() => {
    onLoadingPosts();
  }, []);

  return <div>In group</div>;
}
