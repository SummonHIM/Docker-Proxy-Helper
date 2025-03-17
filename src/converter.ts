const env = import.meta.env

export interface RegistryMap {
    source: string
    replace: string
    name: string
}

// 替换列表
export const registryMap: RegistryMap[] = [
    { source: "docker.io", replace: env.VITE_DPH_DOCKER_HUB, name: "Docker Hub" },
    { source: "gcr.io", replace: env.VITE_DPH_GCR, name: "Google Container Registry" },
    { source: "ghcr.io", replace: env.VITE_DPH_GHCR, name: "GitHub Container Registry" },
    { source: "k8s.gcr.io", replace: env.VITE_DPH_K8S_GCR, name: "Kubernetes Container Registry" },
    { source: "registry.k8s.io", replace: env.VITE_DPH_K8S, name: "Kubernetes's Container Image Registry" },
    { source: "quay.io", replace: env.VITE_DPH_QUAY, name: "Quay Container Registry" },
    { source: "mcr.microsoft.com", replace: env.VITE_DPH_MCR, name: "Microsoft Container Registry" },
    { source: "docker.elastic.co", replace: env.VITE_DPH_ELASTIC, name: "Elastic Stack" },
    { source: "nvcr.io", replace: env.VITE_DPH_NVCR, name: "NVIDIA Container Registry" },
]