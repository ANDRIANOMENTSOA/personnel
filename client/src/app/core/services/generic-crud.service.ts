import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { Filter, FilterBuilder } from '@loopback/filter';
import { AnyModel, AnyObject } from '../interfaces/AnyObject';
import { ApiFilter, Where } from '../interfaces/ApiFilter';
import { environment } from 'src/environments/environment';
export abstract class GenericCrudService<M extends AnyModel> {
  abstract readonly rootPath: string;
  protected abstract http: HttpClient;

  constructor() {}

  protected get<T extends unknown>(
    url: string,
    filter?: ApiFilter<M>
  ): Observable<T> {
    const options: AnyObject = {};
    if (filter) {
      options['params'] = { filter: JSON.stringify(filter) };
    }
    return this.http.get<T>(url, options);
  }

  protected transformResult = map(this.transformer);

  private transformer<T extends M | M[]>(r: T): T {
    if (Array.isArray(r)) {
      //@ts-ignore
      return r.map((m) => new this.model(m));
    } else {
      //@ts-ignore
      return new this.model(r);
    }
  }

  count(filter?: Where<M>): Observable<number> {
    const options: AnyObject = {};
    if (filter) {
      options['params'] = { filter: JSON.stringify(filter) };
    }
    return this.http
      .get<{ count: number }>(this.rootPath + 'count', options)
      .pipe(map((result) => result.count));
  }

  findById(id: M['id'], filter?: ApiFilter<M>): Observable<M> {
    const options: AnyObject = {};
    if (filter) {
      options['params'] = { filter: JSON.stringify(filter) };
    }
    return this.http.get<M>(this.rootPath + id, options);
  }

  findOne(filter: ApiFilter<M> = {}): Observable<M> {
    filter.limit = 1;
    return this.find(filter).pipe(map((result) => result[0]));
  }

  find(filter?: ApiFilter<M>): Observable<M[]> {
    const options: AnyObject = {};
    if (filter) {
      options['params'] = { filter: JSON.stringify(filter) };
    }
    return this.http.get<M[]>(this.rootPath, options);
  }

  create(elem: Partial<M>) {
    if (elem['toApiEntity']) {
      elem = elem['toApiEntity']();
    }
    return this.http.post<M>(this.rootPath, elem);
  }

  update(elem: Partial<M>): Observable<void> {
    if (elem['toApiEntity']) {
      elem = elem['toApiEntity']();
    }
    return this.http.patch<void>(this.rootPath + elem.id, elem);
  }

  updateById(id: M['id'], elem: Partial<M>): Observable<void> {
    if (elem['toApiEntity']) {
      elem = elem['toApiEntity']();
    }
    return this.http.patch<void>(this.rootPath + id, elem);
  }

  delete(elem: M): Observable<void> {
    return this.http.delete<void>(this.rootPath + elem.id);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(this.rootPath + id);
  }

  constrainFilter<T extends object>(
    originalFilter: ApiFilter<T> | undefined,
    constraint: ApiFilter<T> | Where<T>
  ): ApiFilter<T> {
    const filter = cloneDeep(originalFilter);
    const builder = new FilterBuilder<T>(filter as Filter<T>);
    return builder.impose(constraint as Filter<T>).build() as ApiFilter<T>;
  }
}
