<template>
  <AppBar />
  <v-sheet :class="appTheme.current.value.dark ? 'bg-grey-darken-4' : 'bg-grey-lighten-3'">
    <v-container class="pt-16 pb-16 mb-4">
      <v-layout class="d-flex flex-column align-center">
        <v-img
          class="align-center"
          :src="icon"
          width="200"
        />
        <h1>
          {{ env.VITE_DPH_TITLE }}
        </h1>
        <p>
          {{ env.VITE_DPH_SUBTITLE }}
        </p>
      </v-layout>
    </v-container>
  </v-sheet>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>
        生成命令
      </v-card-title>
      <v-container>
        <p class="mb-4">
          输入镜像名称，我来为你生成手动拉取命令：
        </p>
        <Converter />
      </v-container>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>
        Docker 使用指南
      </v-card-title>
      <v-container>
        <p class="mb-4">
          编辑 <span>/etc/docker/daemon.json</span>（若没有则创建），将以下内容写入该文件内。
        </p>
        <DockerConf />
      </v-container>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>
        Podman/containerd 使用指南
      </v-card-title>
      <v-container>
        <p class="mb-4">
          编辑 <span>/etc/containers/registries.conf</span>（若没有则创建），将以下内容写入该文件最底部。
        </p>
        <PodmanConf />
      </v-container>
    </v-card>

    <v-card class="mb-4">
      <v-card-title>
        镜像替换指南
      </v-card-title>
      <v-container>
        <v-table>
          <thead>
            <tr>
              <th>源站</th>
              <th>替换为</th>
              <th>平台</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(registry, index) in registryMap"
              :key="index"
            >
              <td>{{ registry.source }}</td>
              <td>{{ registry.replace }}</td>
              <td>{{ registry.name }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';

import icon from '@/assets/icon.png'
import { registryMap } from '@/converter';
import AppBar from '@/components/AppBar.vue';
import Converter from '@/components/Converter.vue';
import DockerConf from '@/components/DockerConf.vue';
import PodmanConf from '@/components/PodmanConf.vue';

const env = import.meta.env
const appTheme = useTheme()

document.title = env.VITE_DPH_TITLE
</script>
