import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as Model from './models/Budget';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });


  constructor(private http: Http) { }

  getAllBudgets(): Observable<Model.Budget[]> {
    return this.http.get('/budgets').map(res => res.json());
  }

  getBudget(userId: string): Observable<Model.Budget> {
    var url: string = `/budgets/${userId}`;
    console.log(`RestService: http.get ${url} `);
    return this.http.get(url).map(res => res.json());
  }

  addBudget(budget: Model.Budget): Observable<Model.Budget> {
    var url: string = `/budgets`;
    console.log(`RestService: http.post ${url} `);
    return this.http.post(url, JSON.stringify(budget), this.options).map(res => res.json());
  }

  updateBudget(budget: Model.Budget): Observable<Model.Budget> {
    var url: string = `/budgets/${budget.userId}`;
    console.log(`RestService: http.put ${url} `);
    return this.http.put(url, JSON.stringify(budget), this.options).map(res => res.json());
  }

  deleteBudget(budget: Model.Budget): Observable<Model.Budget> {
    var url: string = `/budgets/${budget.userId}`;
    console.log(`RestService: http.put ${url} `);
    return this.http.delete(url, this.options).map(res => res.json());
  }

}
