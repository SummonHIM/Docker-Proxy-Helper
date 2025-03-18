<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { useThemeStore } from '@/stores/theme'

const appTheme = useTheme()
const themeStore = useThemeStore()

// 在应用挂载时初始化主题
onMounted(async () => {
  if (themeStore.theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    appTheme.global.name.value = prefersDark ? 'dark' : 'light'
  } else {
    appTheme.global.name.value = themeStore.theme
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (themeStore.theme === 'auto') {
      appTheme.global.name.value = e.matches ? 'dark' : 'light'
    }
  })
})
</script>
