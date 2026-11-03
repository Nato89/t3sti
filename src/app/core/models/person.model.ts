export interface PersonDto {
  id: number;
  name: string;
  email: string;
  phone?: string;
  [key: string]: any;
}

export interface CreatePersonCommand {
  name: string;
  email: string;
  phone?: string;
  [key: string]: any;
}

export interface UpdatePersonCommand {
  id: number;
  name: string;
  email: string;
  phone?: string;
  [key: string]: any;
}

export interface DeletePersonCommand {
  id: number;
}
