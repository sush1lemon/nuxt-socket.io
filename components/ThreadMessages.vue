<script lang="ts" setup>
import {Button} from "~/components/ui/button";
import {HamburgerMenuIcon} from '@radix-icons/vue'
import {Avatar, AvatarImage, AvatarFallback} from "~/components/ui/avatar";
import {Input} from "~/components/ui/input";
import {useNewMessage} from "~/composables/useNewMessage";
import type {Socket} from "socket.io-client";
import SocketClient from "~/plugins/socket.client";
import { vInfiniteScroll } from '@vueuse/components'
import {useScroll} from "@vueuse/core";
import useWindowRefScroll from "~/composables/useWindowRefScroll";
import crypto from "crypto";

const { $io } : { $io: Socket} = useNuxtApp();
const me = useCookie('ncs-user', {
    default: () => ({id: crypto.randomUUID(), name: crypto.randomUUID()})
});
const route = useRoute()
let messages = ref([]);
let messageContent = ref('');
let messageCount = ref(0);
let messagePage = 1;

const messagesEL = ref<HTMLElement | null>(null)
let currentThread = ref('')

watch(() => route.path, () => {
    if (route.name == "t-id") {
        if (currentThread.value) {
            $io.emit("leaveRoom", currentThread.value, me.value)
        }
        currentThread.value = <string>route.params.id;
        fetchMessages()
    }
})

const onLoadMore = async () => {
    if (messageCount.value >= 10) {
        messagePage += 1;
        await fetchMessages(messagePage)
        messagesEL.value.scrollTop = messagesEL.value.scrollTop + 20
    }
}

useWindowRefScroll(messagesEL, onLoadMore, 1);

const toBottom = () => {
    if (messagesEL.value) {
        messagesEL.value.scrollTop = messagesEL.value.scrollHeight
    }
}
const fetchMessages = async (page = 1) => {
    const {data, pending, error, refresh} = await useFetch(`/api/messages`, {
        query: { thread: route.params.id, page }
    })

    console.log("fetching messages")

    const { messages: fetched } = data.value
    messageCount.value = fetched.length
    if (page === 1) {
        messages.value = fetched.reverse();
        messagePage = page;
        joinRoom()
        nextTick(() => {
            toBottom();
        })
    } else {
        messages.value = [...fetched.reverse(), ...messages.value]
    }
}
const joinRoom = () => {
    if (currentThread.value && $io) {
        $io.emit("joinRoom", currentThread.value, me.value)
    }
}

const sendMessage = async () => {
    if (route.name == "t-id" && messageContent.value) {
        const message = {
            content: messageContent.value,
            from_id: me.value.id,
            from_name: me.value.id
        }
        $io.emit("message", currentThread.value, message)
    }
    messageContent.value = "";
}

if (route.name == "t-id") {
    currentThread.value = <string>route.params.id;
    fetchMessages()
}

onMounted(() => {
    if ($io) {
        $io.on("message",  (msg) => {
            messages.value.push(msg);
            if (msg.from_id === me.value.id) {
                toBottom();
            }
        });
        $io.on("join",  (msg) => {
            messages.value.push(msg)
            console.log("join", msg)
            if (msg.from_id == me.value.id) {
                nextTick(() => {
                    toBottom();
                })
            }
        })
        $io.on("leave",  (msg) => {
            messages.value.push(msg)
        })
    }
})
</script>
<template>
    <div class="col-span-12 lg:col-span-9 flex flex-col bg-secondary overflow-y-auto" ref="messagesEL">
        <div class="lg:hidden bg-background border-b p-2 sticky flex top-0">
            <Button class="px-3 py-2 ml-auto" variant="outline">
                <HamburgerMenuIcon class="w-6 h-6"/>
            </Button>
        </div>
        <div class="grow py-3 px-4 flex flex-col justify-end gap-4">
            <template v-for="(message, key) in messages" :key="key">
                <div v-if="message.system">
                    <h3 class="text-center text-secondary-foreground/60 text-sm">{{ message.content }}</h3>
                </div>
                <template v-else>
                    <div class="flex justify-end gap-2" v-if="message.from_id == me.id">
                        <div class="relative">
                            <p class="mt-2 bg-yellow-100/90 p-2 rounded text-primary">
                                {{ message.content }}
                            </p>
                        </div>
                        <Avatar>
                            <AvatarFallback>s</AvatarFallback>
                            <AvatarImage
                                :src="`https://api.dicebear.com/7.x/lorelei/svg?backgroundType=solid&backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${message.from_id}&flip=true`"></AvatarImage>
                        </Avatar>
                    </div>
                    <div class="flex gap-2 relative max-w-[64%]" v-else>
                        <h3 class="text-xs absolute left-12 top-[-10px]">{{ message.from_name }}</h3>
                        <Avatar>
                            <AvatarFallback>s</AvatarFallback>
                            <AvatarImage
                                :src="`https://api.dicebear.com/7.x/lorelei/svg?backgroundType=solid&backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${message.from_id}&flip=true`"></AvatarImage>
                        </Avatar>
                        <p class="mt-2 bg-yellow-100/90 p-2 rounded rounded-tl-none text-primary">
                            {{ message.content }}
                        </p>
                    </div>
                </template>
            </template>
        </div>
        <form @submit.prevent="sendMessage" class="flex justify-between mt-auto sticky bottom-0">
            <Input v-model="messageContent" class="bg-background rounded-none border-l-0 h-full"></Input>
            <Button type="submit" class="rounded-l-none" size="lg">Send</Button>
        </form>
    </div>
</template>
