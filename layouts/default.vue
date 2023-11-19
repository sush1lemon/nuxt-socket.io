<script lang="ts" setup>
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import ThreadMessages from "~/components/ThreadMessages.vue";

const route = useRoute()

const isActive = (link: Array<string>): 'default' | 'outline' => {
    return link.includes(<string>route.name) ? 'default' : 'outline';
}
</script>
<template>
    <main class="bg-background min-h-screen flex justify-center p-2">
        <div class="flex flex-col max-w-6xl w-full gap-2 mt-20">

            <div class="flex justify-start gap-2">
                <NuxtLink href="/">
                    <Button :variant="isActive(['index', 't-id'])">Threads</Button>
                </NuxtLink>
                <NuxtLink href="/random">
                    <Button :variant="isActive(['random'])">
                        Random
                    </Button>
                </NuxtLink>
            </div>
            <Card class="min-h-100">
                <CardHeader>
                    <CardTitle>Nuxt3 Socket.io Chat</CardTitle>
                    <!--          <CardDescription>Deploy your new project in one-click.</CardDescription>-->
                </CardHeader>
                <CardContent class="bg-background">
                    <div class="relative grid grid-cols-12 h-[40rem] border rounded">
                        <ThreadList/>
                        <ThreadMessages/>
                    </div>
                </CardContent>
                <!--        <CardFooter class="flex justify-between px-6 pb-6">-->
                <!--          <Button variant="outline">-->
                <!--            Cancel-->
                <!--          </Button>-->
                <!--          <Input></Input>-->
                <!--          <Button>Send</Button>-->
                <!--        </CardFooter>-->
            </Card>
            <slot></slot>
        </div>
    </main>
</template>
