<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import { Input } from "~/components/ui/input"
import crypto from "crypto";
import useUser from "~/composables/useUser";

let opened = ref(false);
let username = ref('');

const { user } = useUser()

onMounted(() => {
    if (!user.value.name) {
        opened.value = true;
    }
})

const save = () => {
    console.log("saving username", user.value, username.value)
    const trimmed = username.value.substring(0, 50);
    user.value.name = trimmed
    opened.value = false;
}

</script>
<template>
    <Dialog v-bind:open="opened">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Welcome</DialogTitle>
                <DialogDescription>
                    Enter a username that everyone will call you.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        Username
                    </Label>
                    <Input id="username" v-model="username" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" v-on:click="save">
                    Save
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
