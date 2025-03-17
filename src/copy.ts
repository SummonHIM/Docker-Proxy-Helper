/**
 * 生成复制图标
 * @param stat 状态
 * @returns 图标
 */
export function copyIcon(stat: 'none' | 'true' | 'false') {
  switch (stat) {
    case 'none': return "mdi-content-copy"
    case 'true': return "mdi-check"
    case 'false': return "mdi-alert-circle"
  }
}