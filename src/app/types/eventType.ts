export interface Event {
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

export interface EventItem {
  id: string;
  eventItemURL: string;
  title: string;
  start: string;
  category: string;
}
