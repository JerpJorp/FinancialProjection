import { Injectable } from '@angular/core';
import * as Model from './models/Budget';
import { RestService } from './rest.service';
@Injectable()
export class StateService {

  budget: Model.Budget;

  isRetrieving: boolean

  constructor(private restService: RestService) {

    this.isRetrieving = false;

    this.budget = {
      userId: 'new user',
      lastUpdated: new Date(),
      budgetItems: [],
      accounts: [{ name: "Checking", currentBalance: 0, accountType: Model.AccountTypes.PRIMARY }]
    };
  }

  retrieve() {
    this.isRetrieving = true;

    var existing = this.restService.getBudget(this.budget.userId).subscribe(
      data => {
        console.log(`retrieved ${this.budget.userId} to database.`);
        if (data == null) {
          console.log("No existing budget for the user id " + this.budget.userId);
        }
        else {
          this.budget = data;
        }
      },
      error => console.log(`ERROR: retrieving ${this.budget.userId} to database: ${error}`),
      () => { console.log("retrieve complete"); this.isRetrieving = false }
    );
  }

  upsert() {
    console.log("upserting budget.");

    var existing = this.restService.getBudget(this.budget.userId).subscribe(x => {
      if (x == null) {
        console.log("upserting->add.");
        this.restService.addBudget(this.budget).subscribe(
          data => console.log(`Added ${this.budget.userId} to database.`),
          error => console.log(`ERROR: adding ${this.budget.userId} to database: ${error}`),
          () => console.log("upsert: add complete")
        );
      }
      else {
        console.log("upserting->update.");
        this.restService.updateBudget(this.budget).subscribe(
          data => console.log(`updated ${this.budget.userId} to database.`),
          error => console.log(`ERROR: updating ${this.budget.userId} to database: ${error}`),
          () => console.log("upsert: update complete")
        );
      }
    });

  }
}
