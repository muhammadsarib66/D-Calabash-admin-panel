import { io } from "socket.io-client";
import { baseUrl } from "./feature/slicer/Slicer";
import { useMemo } from "react";

export const socket = useMemo(() => io(baseUrl), []);
