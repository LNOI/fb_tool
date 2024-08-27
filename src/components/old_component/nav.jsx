<div className="flex">
        <div className={`bg-slate-900 ${ open?"w-56":"w-24"} duration-300  text-white h-screen relative pl-2`}>
            <FaAngleLeft className={`absolute top-4 ${!open&& "rotate-180"} -right-4 bg-white cursor-pointer border-black border text-black text-3xl rounded-full`} onClick={()=>setOpen(!open)}/>
            <div className="inline-block">
                <Image src="/logo/logo_facebook.png" width={100} height={100} className={`bg-transparent rounded-md ${open&& "rotate-[360deg]"} duration-300`} alt="image"/>
            </div>  

            <ul className="pt-4">
                {
                    Menu.map((item, index)=>
                        MenuItems(item, index,open)
                    )
                }
            </ul>

            <div className="absolute bottom-0 left-0">
                <div className="flex items-center mx-2 my-4">
                <FcButtingIn className={`text-4xl ${open&&"mr-2"}`}/>
                <span className={`${!open&&"scale-0"} duration-0 origin-left`}>thanhloidev</span>
                </div>
                
            </div>
        </div>
        <div className="w-full">{children}</div>
      </div>