export interface Review {
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
  id: string;
}

export interface Group {
  name: string;
  reviews: Review[];
  date: string;
  generalScore: number;
  id: string;
}

export interface GroupResponse {
  result: {
    groups: Group[];
    percentagePositiveReview: number;
  };
  errorMessage: string | null;
  timeGenerated: string;
}
