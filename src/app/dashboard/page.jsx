"use client";
import React, { useState } from "react";

export default function page() {
  const [value, setValue] = useState("");
  
  const onBtnClick = () => {
    // The ID of the extension we want to talk to.
    var editorExtensionId = "imdkedocinphibhlgmfabcfbpihcopid";
    chrome.runtime.sendMessage(
      editorExtensionId,
      { message: value },
      function (response) {
        console.log(response);
      }
    );
  };

  return (
    <div className="flex w-full justify-center items-center">
      Information at here.
    </div>
  );
}
