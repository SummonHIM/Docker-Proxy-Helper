<template>
  <v-app-bar>
    <v-container class="d-flex">
      <v-btn to="/">
        主页
      </v-btn>
      <v-spacer />
      <v-btn
        :href="env.VITE_DPH_CACHE_SITE"
        append-icon="mdi-open-in-new"
        target="_blank"
      >
        缓存状态
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
const env = import.meta.env
</script>