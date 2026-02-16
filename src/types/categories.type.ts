export interface CategoryEntity {
  id: string;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  status: string;
}