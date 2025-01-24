export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Tasks {
  [key: string]: Task[];
}
