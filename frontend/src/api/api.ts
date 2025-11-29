export interface Review {
  id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
}

export interface Group {
  id: string;
  name: string;
  date: string;
  reviews: Review[];
  generalScore: number; 
}

export type GroupsResponse = Group[];

export interface ReviewRequest {
  review: string;
}

export interface ReviewResponse {
  id: string;
  text: string;
  label: "positive" | "neutral" | "negative";
  confidence: number;
  groupId: string;
}

export interface FileUploadResponse {
  id: string;
  name: string;
  date: string;
}
