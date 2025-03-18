<template>
  <v-text-field
    v-model="form.image"
    label="镜像名称"
    variant="solo"
    class="droid-sans-mono"
  />
  <v-card>
    <v-tabs
      v-model="form.commandTab"
    >
      <v-tab value="docker">
        Docker
      </v-tab>
      <v-tab value="podman">
        Podman
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="form.commandTab">
        <v-tabs-window-item value="docker">
          <v-textarea
            v-model="form.commandDocker"
            :append-inner-icon="copyIcon(form.copySuccess)"
            label="手动拉取命令"
            variant="solo"
            rows="3"
            readonly
            class="droid-sans-mono"
            @click:append-inner="copy(form.commandDocker)"
          />
        </v-tabs-window-item>

        <v-tabs-window-item value="podman">
          <v-textarea
            v-model="form.commandPodman"
            :append-inner-icon="copyIcon(form.copySuccess)"
            label="手动拉取命令"
            variant="solo"
            rows="3"
            readonly
            class="droid-sans-mono"
            @click:append-inner="copy(form.commandPodman)"
          />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import '@/styles/monofont.scss'
import { copyIcon } from '@/copy';
import { registryMap } from '@/converter';
import { ref, watch, type Ref } from 'vue'

interface Form {
  image: string
  commandDocker: string
  commandPodman: string,
  commandTab: 'docker' | 'podman'
  copySuccess: 'none' | 'true' | 'false'
}

const env = import.meta.env
// 输入框
const form: Ref<Form> = ref({
  image: "",
  commandDocker: "请输入镜像名称…",
  commandPodman: "请输入镜像名称…",
  commandTab: "docker",
  copySuccess: "none"
})

/**
 * 检查镜像格式是否正确
 * @param image 镜像
 */
function validateFormat(image: string): boolean {
  // 镜像格式应该包含 "/" 和 ":"，例如：`nginx:latest` 或 `library/nginx:latest`
  // Regex: https://stackoverflow.com/a/39672069
  const regex = /^(?:(?=[^:\/]{1,253})(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(?:\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*(?::[0-9]{1,5})?\/)?((?![._-])(?:[a-z0-9._-]*)(?<![._-])(?:\/(?![._-])[a-z0-9._-]*(?<![._-]))*)(?::(?![.-])[a-zA-Z0-9_.-]{1,128})?$/
  return regex.test(image)
}

/**
 * 转换镜像
 * @param image 原始镜像
 */
function genImage(image: string): string {
  // 判断是否为简写（如 stilleshan/frpc:latest 或 nginx:latest），补全为 docker.io
  if (!image.includes("/")) {
    image = `${env.VITE_DPH_DEFAULT_REGISTRY}/library/${image}`
  } else if (!image.includes(".") || image.split("/")[0] === image.split("/")[1]) {
    image = `${env.VITE_DPH_DEFAULT_REGISTRY}/${image}`
  }

  for (const registry of registryMap) {
    if (image.startsWith(`${registry.source}/`)) {
      return image.replace(`${registry.source}/`, `${registry.replace}/`)
    }
  }

  throw new Error("不支持的镜像！")
}

/**
 * 复制文本
 * @param text 文本
 */
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    form.value.copySuccess = "true"
    setTimeout(() => form.value.copySuccess = "none", 2000)
  } catch (error) {
    console.error(error)
    form.value.copySuccess = "false"
    setTimeout(() => form.value.copySuccess = "none", 2000)
  }
}

/**
 * 监听镜像名称输入框变化
 */
watch(() => form.value.image, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    try {
      if (!newValue) throw new Error("请输入镜像名称…") // 空值 返回
      if (newValue.startsWith("docker pull ")) newValue = newValue.replace("docker pull ", "").trim() // 开头有 docker pull 清除
      if (newValue.startsWith("podman pull ")) newValue = newValue.replace("podman pull ", "").trim() // 开头有 podman pull 清除
      if (!validateFormat(newValue)) throw new Error("不支持的镜像！") // 检查格式

      const image = genImage(newValue)

      form.value.commandDocker = `docker pull ${image}\t\t# 拉取经过代理的镜像
docker tag ${image} ${newValue}\t\t# 将镜像复制为正常的镜像名称
docker rmi ${image}\t\t# 删除经过代理的镜像`
      form.value.commandPodman = `podman pull ${image}\t\t# 拉取经过代理的镜像
podman tag ${image} ${newValue}\t\t# 将镜像复制为正常的镜像名称
podman rmi ${image}\t\t# 删除经过代理的镜像`
    } catch (error) {
      form.value.commandDocker = (error as Error).message || "不支持的镜像！"
      form.value.commandPodman = (error as Error).message || "不支持的镜像！"
    }
  }
})
</script>