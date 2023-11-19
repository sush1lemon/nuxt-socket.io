<script setup lang="ts">
import crypto from "crypto";
const user = useCookie('ncs-user', {
    default: () => ({id: crypto.randomUUID()})
})
</script>
<template>
    <NuxtLayout>
        <NuxtLoadingIndicator/>
        <NuxtPage/>
    </NuxtLayout>
</template>
