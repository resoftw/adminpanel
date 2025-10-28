import { browser } from '$app/environment';

class LayoutStore {
  sidebarCollapsed = $state(false);
  darkMode = $state(false);
  sidebarOpen = $state(false);

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (browser) {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleMobileSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  initTheme() {
    if (browser) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}

export const layoutStore = new LayoutStore();