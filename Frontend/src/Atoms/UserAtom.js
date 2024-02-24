import { atom } from "recoil";

 const user=atom({
    key:"user",
    default:""
 })
 const pass=atom({
    key:"pass",
    default:""
 })
 const uname=atom({
   key:"uname",
   default:""
 })
 const firstCount=atom({
   key:"firstCount",
   default:0
 })
 const genAvail=atom({
   key:"genAvail",
   default:0
 })
 const isOpen=atom({
   key:"isOpen",
   default:false
 })
 const addOpen=atom({
   key:"addOpen",
   default:false
 })
 const hover=atom({
   key:"hover",
   default:false
 })
 const Click=atom({
   key:"Click",
   default:false
 })
 const add=atom({
   key:"add",
   default:false
 })
 const permit=atom({
   key:"permit",
   default:0
 })
 const browserPermit=atom({
   key:"browserPermit",
   default:false
 })
 const browserPermitstore=atom({
   key:"browserPermitstore",
   default:undefined
 })
 const tabArray=atom({
   key:"tabArray",
   default:[]
 })
 const message=atom({
   key:"message",
   default:""
 })
 const storePass=atom({
   key:"storePass",
   default:""
 })
 const tokenData=atom({
   key:"tokenData",
   default:undefined
 })
 const tempToken=atom({
   key:"tempToken",
   default:undefined
 })
 const salt=atom({
   key:"salt",
   default:undefined
 })
 const remember=atom({
   key:"remember",
   default:false
 })
 const firstTimer=atom({
   key:"firstTimer",
   default:false
 })
 
 

export  {firstTimer,tempToken,salt,user,pass,uname,firstCount,genAvail,isOpen,addOpen,hover,tabArray,message,Click,add,storePass,tokenData,permit,browserPermit, browserPermitstore,remember};