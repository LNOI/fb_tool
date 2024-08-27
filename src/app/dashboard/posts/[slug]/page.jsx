import React from 'react'
import Image from 'next/image'

export default function page({ params }) {
    

    return (
    <div className="w-full h-[calc(100vh-5rem)] bg-slate-300 flex flex-col space-y-4">
    <div className="w-full m-w-[465px] bg-red-300 flex flex-col items-center justify-center">
        <Image src="/avatar/user.png" className="rounded-full" width={75} height={75}></Image>
        <div className="flex flex-col ml-2">
            <p className="text-white font-bold text-lg">Nguyễn Văn A</p>
        </div>  
        <div>Cần tìm  người mua nhà</div>
        <div>Số tương tác: </div>
    </div>    
    <div className="flex-1"></div>
    </div>

)
}


