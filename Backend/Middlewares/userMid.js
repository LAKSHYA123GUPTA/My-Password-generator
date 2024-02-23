import User from "../DB/dbindex.js";

export default async function siginMidlleware(req,res,next){
    const username=req.body.username;
    const deviceID=req.body.deviceId;
    const remember=req.body.remember;
    const password=req.body.pass;
    try {
        const response=await User.findOne({username:username,password:password})
        if(response){
            req.user_id={id:response._id.toString()};
            
            let arr=response.deviceInfoArray;
            let dec=false;
            if(arr!==null){
                dec=arr.find(element=>(element===deviceID));
                
            }
            if(arr===null)
            arr=[];
            

            if(dec===false && remember===true){
                await User.updateOne({_id:response._id},{  $set: {
                    deviceInfoArray: [...arr,deviceID]    
                }
              })
              
            }
        
            next();
        }
        
        else
       return res.status(411).json({msg:"Invalid credentials, check your credentials or try signup first "});
    } catch (error) {
       return res.status(500).json({msg:"Oops! server down can't fetch your data"});
    }
}