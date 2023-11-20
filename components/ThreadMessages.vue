<script lang="ts" setup>
import {Button} from "~/components/ui/button";
import {HamburgerMenuIcon} from '@radix-icons/vue'
import {Avatar, AvatarImage, AvatarFallback} from "~/components/ui/avatar";
import {Input} from "~/components/ui/input";
import type {Socket} from "socket.io-client";
import useWindowRefScroll from "~/composables/useWindowRefScroll";
import crypto from "crypto";
import useMobileCheck from "~/composables/useMobileCheck";
import useUser from "~/composables/useUser";

const { $io } : { $io: Socket} = useNuxtApp();
const {user} = useUser()
const route = useRoute()
let messages = ref([]);
let messageContent = ref('');
let messageCount = ref(0);
let messagePage = 1;

const messagesEL = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLElement | null>(null)

let currentThread = ref('')

watch(() => route.path, () => {
    if (route.name == "t-id") {
        if (currentThread.value) {
            $io.emit("leaveRoom", currentThread.value, user.value)
        }
        currentThread.value = <string>route.params.id;
        fetchMessages()
    } else {
        messages.value = [];
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

    const { messages: fetched } = data.value
    messageCount.value = fetched.length
    if (page === 1) {
        messages.value = fetched.reverse();
        messagePage = page;
        joinRoom()
        await nextTick(() => {
            toBottom();
        })
    } else {
        messages.value = [...fetched.reverse(), ...messages.value]
    }
}
const joinRoom = () => {
    if (currentThread.value && $io) {
        $io.emit("joinRoom", currentThread.value, user.value)
    }
}

const sendMessage = async () => {
    if (route.name == "t-id" && messageContent.value) {
        const message = {
            content: messageContent.value,
            from_id: user.value.id,
            from_name: user.value?.name ?? user.value.id,
        }
        $io.emit("message", currentThread.value, message)
    }
    messageContent.value = "";
    if (useMobileCheck()) {
        if (document.activeElement instanceof HTMLElement)
            document.activeElement.blur();
    }
}

if (route.name == "t-id") {
    currentThread.value = <string>route.params.id;
    fetchMessages()
}

onMounted(() => {
    if ($io) {
        $io.on("message",  (msg) => {
            messages.value.push(msg);
            if (msg.from_id === user.value.id) {
                nextTick(() => {
                    toBottom();
                })
            }
        });
        $io.on("join",  async (msg) => {
            messages.value.push(msg)
            if (msg.from_id == user.value.id) {
                await nextTick(() => {
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
        <div class="lg:hidden bg-background border-b p-2 sticky flex top-0 z-10">
<!--            <Button aria-label="sidebar-button" class="px-3 py-2" variant="outline">-->
<!--                <HamburgerMenuIcon class="w-6 h-6"/>-->
<!--            </Button>-->
            <Sidebar/>
        </div>
        <div class="grow py-3 px-4 flex flex-col justify-end gap-4">
            <template v-for="(message, key) in messages" :key="key">
                <div v-if="message.system">
                    <h3 class="text-center text-secondary-foreground/60 text-sm">{{ message.content }}</h3>
                </div>
                <template v-else>
                    <div class="flex justify-end gap-2" v-if="message.from_id == user.id">
                        <div class="relative">
                            <p class="mt-2 bg-yellow-100/90 p-2 rounded text-primary">
                                {{ message.content }}
                            </p>
                        </div>
                        <Avatar>
                            <AvatarFallback>s</AvatarFallback>
                            <AvatarImage
                                alt="user-image"
                                :src="`https://api.dicebear.com/7.x/lorelei/svg?backgroundType=solid&backgroundColor=b6e3f4,c0aede,d1d4f9&seed=${message.from_id}&flip=true`"></AvatarImage>
                        </Avatar>
                    </div>
                    <div class="flex gap-2 relative lg:max-w-[64%]" v-else>
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
            <Input ref="inputEl" aria-label="message-content" v-model="messageContent" class="bg-background rounded-none border-l-0 h-full"></Input>
            <Button type="submit" class="rounded-l-none" size="lg">Send</Button>
        </form>
    </div>
</template>
