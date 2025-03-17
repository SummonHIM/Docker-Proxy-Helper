<template>
  <v-textarea
    v-model="form"
    :append-inner-icon="copyIcon(copySuccess)"
    label="/etc/docker/daemon.json"
    variant="solo"
    rows="3"
    readonly
    @click:append-inner="copy(form)"
  />
</template>

<script lang="ts" setup>
import { copyIcon } from '@/copy';
import { ref, type Ref } from 'vue';

const env = import.meta.env
const form: Ref<string> = ref(`{
    "registry-mirrors": [ "${env.VITE_DPH_DOCKER_HUB}" ]
}`)
const copySuccess: Ref<'none' | 'true' | 'false'> = ref("none")

/**
 * 复制文本
 * @param text 文本
 */
 async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copySuccess.value = "true"
    setTimeout(() => copySuccess.value = "none", 2000)
  } catch (error) {
    console.error(error)
    copySuccess.value = "false"
    setTimeout(() => copySuccess.value = "none", 2000)
  }
}
</script>