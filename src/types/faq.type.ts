export interface FaqEntity {
	id: string;
	status: string;
	sort: number | null;
	user_created: string | null;
	date_created: string | null;
	user_updated: string | null;
	date_updated: string | null;
	question: string;
	answer: string;
}

export interface FrequentlyAskedQuestion {
	id: string;
	question: string;
	answer: string;
}
