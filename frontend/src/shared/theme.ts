import { ref, watchEffect } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>(
  (localStorage.getItem('theme') as Theme) || 'light'
)

watchEffect(() => {
  const html = document.documentElement

  html.classList.remove('light', 'dark')
  html.classList.add(theme.value)

  localStorage.setItem('theme', theme.value)
})

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme
  }
}
