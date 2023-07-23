<script setup lang="ts">
const { data } = await useFetch("/api/session")
const session = useSession(data.value || "")
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
