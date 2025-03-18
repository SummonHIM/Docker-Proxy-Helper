<template>
  <v-app-bar>
    <v-container class="d-flex">
      <v-btn to="/">
        主页
      </v-btn>
      <v-btn
        :href="env.VITE_DPH_CACHE_SITE"
        append-icon="mdi-open-in-new"
        target="_blank"
      >
        缓存状态
      </v-btn>
      <v-spacer />
      <v-btn append-icon="mdi-triangle-small-down">
        主题
        <v-menu activator="parent">
          <v-list>
            <v-list-item @click="setTheme('auto')">
              自动
              <v-icon
                :class="themeStore.theme !== 'auto' ? 'd-none' : ''"
                icon="mdi-check"
              />
            </v-list-item>
            <v-list-item @click="setTheme('light')">
              浅色
              <v-icon
                :class="themeStore.theme !== 'light' ? 'd-none' : ''"
                icon="mdi-check"
              />
            </v-list-item>
            <v-list-item @click="setTheme('dark')">
              深色
              <v-icon
                :class="themeStore.theme !== 'dark' ? 'd-none' : ''"
                icon="mdi-check"
              />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { useThemeStore } from '@/stores/theme'

const env = import.meta.env
const appTheme = useTheme()
const themeStore = useThemeStore()

/**
 * 设置主题
 * @param theme 主题
 */
 function setTheme(theme: "auto" | "light" | "dark") {
  themeStore.theme = theme

  if (themeStore.theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    appTheme.global.name.value = prefersDark ? 'dark' : 'light'
  } else {
    appTheme.global.name.value = themeStore.theme
  }
}
</script>