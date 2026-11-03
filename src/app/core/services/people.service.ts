import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonDto, CreatePersonCommand, UpdatePersonCommand } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private readonly apiUrl = '/api/people';

  constructor(private http: HttpClient) {}

  /**
   * Obtener una persona por Id
   * @param id Id del registro a buscar
   * @returns Retorna el registro de la persona solicitada
   */
  findAsync(id: number): Observable<PersonDto> {
    return this.http.get<PersonDto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene los datos de todas las personas
   * @returns Lista de personas
   */
  getAsync(): Observable<PersonDto[]> {
    return this.http.get<PersonDto[]>(this.apiUrl);
  }

  /**
   * Crea un nuevo registro de persona
   * @param person Datos de la persona a crear
   * @returns Observable de la respuesta del servidor
   */
  createAsync(person: CreatePersonCommand): Observable<any> {
    return this.http.post(this.apiUrl, person);
  }

  /**
   * Actualiza los datos de una persona
   * @param person Los datos de la persona a actualizar
   * @returns Observable de la respuesta del servidor
   */
  updateAsync(person: UpdatePersonCommand): Observable<any> {
    return this.http.put(this.apiUrl, person);
  }

  /**
   * Elimina una persona por Id
   * @param id Id del registro a eliminar
   * @returns Observable de la respuesta del servidor
   */
  deleteAsync(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
