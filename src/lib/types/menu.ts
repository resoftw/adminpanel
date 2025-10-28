export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: {
    text: string;
    variant: 'primary' | 'success' | 'warning' | 'danger';
  };
  children?: MenuItem[];
}

export interface MenuGroup {
  id: string;
  label: string;
  items: MenuItem[];
}