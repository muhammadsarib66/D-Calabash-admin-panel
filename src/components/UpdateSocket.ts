import { io } from "socket.io-client";
import { baseUrl } from "../feature/slicer/Slicer";


export const socket = io(baseUrl);


export const socketFire = () => {
    socket.emit('product-updates');
    console.log('hello iam socket')
}

export const socketUserUpdate = (id:any)=>{
    socket.emit('user-updated',id);
    console.log('hello iam updated user ===>', id)
}
export const socketRiderUpdate = (id:any)=>{
    socket.emit('rider-updated',id);

}
  

