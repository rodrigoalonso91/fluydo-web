export interface PurchaseConditionEntity {
  id: string;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  title: string;
  description: string;
}

export interface PurchaseCondition {
  id: string;
  title: string;
  description: string;
}