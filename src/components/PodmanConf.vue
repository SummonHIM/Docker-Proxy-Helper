<template>
  <v-textarea
    v-model="form"
    :append-inner-icon="copyIcon(copySuccess)"
    label="/etc/containers/registries.conf"
    variant="solo"
    rows="45"
    readonly
    class="droid-sans-mono"
    @click:append-inner="copy(form)"
  />
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';

import '@/styles/monofont.scss'
import { copyIcon } from '@/copy';
import { registryMap, type RegistryMap } from '@/converter';

const generateRegistryText = (registryMap: RegistryMap[]) => {
  return registryMap
    .map(
      (registry) => `[[registry]]
location = "${registry.source}"
[[registry.mirror]]
location = "${registry.replace}"
`
    )
    .join("\n");
};
const form: Ref<string> = ref(generateRegistryText(registryMap))
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