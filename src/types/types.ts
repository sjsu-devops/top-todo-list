export type State = {
  tasks: Task[];
  projects: Project[];
  notes: Note[];
};

export type TaskData = {
  title?: string | undefined;
  details?: string | undefined;
  priority: string;
  projectName?: string | null | undefined;
  projectID?: string | undefined;
  status: string;
  date?: string | undefined;
};

export type Task = TaskData & { id: string };

export type ProjectData = {
  title?: string | undefined;
};

export type Project = ProjectData & { id: string };

export type NoteData = {
  title?: string | undefined;
  details?: string | undefined;
};

export type Note = NoteData & { id: string };
