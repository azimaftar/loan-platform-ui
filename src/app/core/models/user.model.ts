export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  profileInfo: string;
  active: boolean;
  createdAt: string;
}

export interface UpdateUserRequest {
  username?: string;
  profileInfo?: string;
}