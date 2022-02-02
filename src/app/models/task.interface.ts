export type State = "created" | "in progress" | "completed";
export type Course = "" | "ongoing" | "paused";

export interface Task {
    id: string;
    title: string;
    description: string;
    state: State;
    course: Course;
    observations: string;
    userId?: string;
    created_at: string;
}

