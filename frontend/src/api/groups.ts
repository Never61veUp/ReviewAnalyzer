import {
  Review,
  ReviewRequest,
  ReviewResponse,
  Group,
  GroupsResponse,
  FileUploadResponse
} from "../api/api";

const BASE_URL = "https://api.reviewanalyzer.mixdev.me/api";

export async function fetchGroups(): Promise<GroupsResponse> {
  const res = await fetch(`${BASE_URL}/Group`);
  if (!res.ok) throw new Error("Ошибка при получении групп");
  return await res.json();
}

export async function uploadText(text: string): Promise<ReviewResponse> {
  const res = await fetch(`${BASE_URL}/Review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ review: text }),
  });

  if (!res.ok) throw new Error("Ошибка анализа текста");
  return await res.json();
}

export async function fetchReview(id: string): Promise<ReviewResponse> {
  const res = await fetch(`${BASE_URL}/Review/${id}`);
  if (!res.ok) throw new Error("Ошибка при получении отзыва");
  return await res.json();
}

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${BASE_URL}/Group`, {
    method: "POST",
    body: fd
  });

  if (!res.ok) throw new Error("Ошибка загрузки файла");
  return await res.json();
}

export async function createGroup(name: string, text: string): Promise<Group> {
  const res = await fetch(`${BASE_URL}/Group/postGroup?groupName=${encodeURIComponent(name)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(text)
  });

  if (!res.ok) throw new Error("Ошибка создания группы");
  return await res.json();
}
