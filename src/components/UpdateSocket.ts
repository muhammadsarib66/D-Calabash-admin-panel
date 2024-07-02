import { io } from "socket.io-client";
import { baseUrl } from "../feature/slicer/Slicer";


const socket = io(baseUrl);


export const socketFire = () => {
    socket.emit('product-updates');
    console.log('hello iam socket')
}
