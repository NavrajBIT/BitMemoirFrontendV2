import certImage from "@/public/assets/cert.png";
import Image from "next/image";
const FullViewTemplate = () => {
    return(
        <div style={{
            width:"60%" ,
            height:"100vh",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            padding:"8rem",

        }}>
            
            <div>
                <Image src={certImage} alt={"Certificate"} style={{
                    width:"80%",
                    height:"auto",
                }}/>
            </div>

            <div>
                <button style={{
                    color:"white",
                    backgroundColor:"#0094B2",
                    padding:"1rem",
                    borderRadius:"0.5rem",
                    border:"none",
                    marginTop:"3rem",
                    marginLeft:"28rem"
                }}>{"Edit >"}</button>
            </div>
            
        </div>
            
)};

export default FullViewTemplate;