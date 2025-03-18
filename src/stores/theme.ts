import { defineStore } from "pinia"

interface ThemeState {
    theme: "auto" | "light" | "dark"
}

/** 主题存储 */
export const useThemeStore = defineStore('theme', {
    state: (): ThemeState => ({
        theme: "auto"
    }),
    persist: true
})