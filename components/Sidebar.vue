<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

const {data} = await useFetch("/api/threads")
const threads = data.value?.data
let open = ref(false)
const route = useRoute()
watch(() => route.path, () => {
    open.value = false
})
import {HamburgerMenuIcon} from "@radix-icons/vue";
</script>

<template>
    <Sheet v-bind:open="open">
        <SheetTrigger as-child>
            <Button aria-label="sidebar-button" class="px-2 py-2" variant="outline"  v-on:click="() => open = true">
                <HamburgerMenuIcon class="w-6 h-6"/>
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Threads</SheetTitle>
            </SheetHeader>
            <div class="flex flex-col mt-10">
                <template v-for="(thread, key) of threads" :key="key">
                    <NuxtLink :href="`/t/${thread.id}`" active-class="bg-primary text-primary-foreground font-medium"
                              class="py-4 px-8 cursor-pointer border-b ">
                        {{ thread.name }}
                    </NuxtLink>
                </template>
            </div>
        </SheetContent>
    </Sheet>
</template>
