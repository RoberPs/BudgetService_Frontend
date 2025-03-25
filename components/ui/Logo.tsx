
import Image from "next/image"


const Logo = () => {
  return (
       <div className="flex items-center gap-2" >
        <Image 
            priority
            src="/logo2.png" 
            alt="logo"
            width={80}
            height={80}
            >

        </Image>
        <h1 className="text-white text-3xl">Budget <span className="text-[#efb509] font-black">Services</span></h1>
       </div>
  )
}

export default Logo