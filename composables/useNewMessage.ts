import SocketClient from "~/plugins/socket.client";
import {Socket} from "socket.io-client";


export const useNewMessage = (thread: string, message: string) => {
    const iam = useCookie('ncs-user');
    // const { $io } : { $io: Socket } = useNuxtApp();

    if (iam) {
        const { id } = iam.value;
        console.log("here", id)
        return useFetch('/api/new-message', {
            body: { thread, message, from_id: id, from_name: id},
            method: "post",
        })
    }
}
