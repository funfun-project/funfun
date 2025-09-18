export interface Group {
  id: string;
  title: string;
  local: string;
  category: string;
  eventURL: string;
  time: string;
  date: string[];
  age: string;
  tickets: string[];
}

export type GroupMember = {
  id: string;
  memberProfileURL: string;
  name: string;
  text: string;
  category: string[];
  follow: boolean;
};
