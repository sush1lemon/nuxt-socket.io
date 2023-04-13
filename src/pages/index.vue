<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold">
      Nuxt 3 + Socket.io Hack |
      <NuxtLink href="/about" class="font-semibold text-xl">About</NuxtLink>
    </h1>
    <div class="flex mt-10">
      <form @submit.prevent="sendMessage">
        <label for="hs-trailing-button-add-on" class="sr-only">Label</label>
        <div class="flex rounded-md shadow-sm">
          <input
            id="hs-trailing-button-add-on"
            v-model="message"
            type="text"
            name="hs-trailing-button-add-on"
            class="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          />
          <button
            type="submit"
            class="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
    <div class="flex-col">
      <div v-for="message in messages">
        {{ message.sender }}: {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();
const message = ref();
const messages = ref([]);

if ($io) {
  $io.on("message", function (msg) {
    messages.value.push(msg);
  });
}
const sendMessage = () => {
  if (message.value != "") {
    console.log(message.value);
    $io.emit("message", {
      message: message.value,
      sender: $io.id,
    });
    message.value = "";
  }
};
</script>

<style scoped></style>
