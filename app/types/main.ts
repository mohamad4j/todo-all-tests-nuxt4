export type Theme = "dark" | "light";
export interface Task {
  id?: number
  title: string
  text: string
  done: boolean
  create_at?: string
}
export type TaskInsert = Omit<Task, 'id' | 'create_at'>
export type TaskUpdate = Required<Pick<Task, 'id' | 'done'>>
export type TaskRemove = Required<Pick<Task, 'id'>>
