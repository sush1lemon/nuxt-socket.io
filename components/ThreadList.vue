<script lang="ts" setup>
const {data} = await useFetch("/api/threads")
const threads = data.value?.data
import {PlusIcon} from '@radix-icons/vue'
import {Button} from "~/components/ui/button";

</script>
<template>
    <div
        class="col-span-3 hidden lg:flex flex-col overflow-y-auto bg-background absolute h-full z-10 lg:relative border-r">
        <div class="h-14 justify-between px-4 flex items-center border-b sticky top-0 bg-background">
            <h3 class="font-bold">New Chat</h3>
            <Button name="new-thread-button" class="px-2.5" variant="outline">
                <PlusIcon class="w-4 h-4"/>
            </Button>
        </div>
        <template v-for="(thread, key) of threads" :key="key">
            <NuxtLink :href="`/t/${thread.id}`" class="py-4 px-8 cursor-pointer border-b " active-class="bg-primary text-primary-foreground font-medium">
                {{ thread.name }}
            </NuxtLink>
        </template>
    </div>
</template>
