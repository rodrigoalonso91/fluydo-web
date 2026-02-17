export interface CategoryEntity {
  id: string;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  name: string;
  slug: string;
  badge_text: string | null;
  parent: string | null;
  menu_label: string | null;
  menu_group: string | null;
  children: CategoryEntity[] | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  badgeText: string | null;
  menuLabel: string | null;
  menuGroup: string | null;
  parent: string | null;
}