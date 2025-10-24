
export enum Role {
  Supervisor = 'Supervisor',
  Docente = 'Docente',
  Publico = 'Público',
}

export interface User {
  id: string;
  name: string;
  role: Role;
  avatarUrl: string;
}

export interface Post {
  id: string;

  author: User;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  imageUrl?: string;
  attachments?: { name: string; url: string; type: 'pdf' | 'video' | 'link' }[];
  likes: number;
  comments: { user: User; text: string; createdAt: string }[];
}

export type Page = 'home' | 'ai_assistant' | 'dashboard' | 'new_post';
