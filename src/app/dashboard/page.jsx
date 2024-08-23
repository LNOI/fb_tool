'use client'
import React, {useState} from 'react'

export default function page() {
    const [value, setValue] = useState("")

    const onBtnClick = () => {
        // The ID of the extension we want to talk to.
        var editorExtensionId = "ifhljddokgkocoaopebgkmochjepneik";

        // Make a simple request:
        chrome.runtime.sendMessage(editorExtensionId, {message: value},
            function(response) {
                if (!response.success) {
                    console.log("error");
                    return;
                }
                    console.log(response);
            });
        }

    return (
    <div className="flex w-full justify-center items-center">
        <input type="text" className="text-black" value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button className="bg-orange-600" onClick={onBtnClick}>Search to www3</button>
    </div>

)
}
