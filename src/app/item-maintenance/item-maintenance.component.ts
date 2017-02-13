import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";
import * as Model from "../models/Budget";

import {SelectItem, MenuItem, Message} from 'primeng/primeng';

@Component({
  selector: 'app-item-maintenance',
  templateUrl: './item-maintenance.component.html',
  styleUrls: ['./item-maintenance.component.css']
})
export class ItemMaintenanceComponent implements OnInit {

  msgs: Message[] = [];

  accountTypes: SelectItem[] = [];
  categories: SelectItem[] = [];
  periods: SelectItem[] = [];

  constructor(private stateService: StateService ) 
  { 
    Model.ConstantsValues.AccountTypes.forEach( x => this.accountTypes.push({label: x, value:x }) );
    Model.ConstantsValues.Categories.forEach( x => this.categories.push({label: x, value:x }) );
    Model.ConstantsValues.Periods.forEach( x => this.periods.push({label: x, value:x }) );
    console.log(JSON.stringify(this.categories));
  }

  ngOnInit() { }

  AddNewAccount()
  {
    this.stateService.budget.accounts.push(
      {name: "Enter name", currentBalance: 0, accountType: Model.AccountTypes.SECONDARY }
    );
  }

  DeleteAccount(account: Model.Account)
  {
    let index = -1;
    for(let i = 0; i < this.stateService.budget.accounts.length; i++) {
        if(this.stateService.budget.accounts[i].name == account.name) {
            index = i;
            break;
        }
    }
    this.stateService.budget.accounts.splice(index, 1);
    this.msgs.push( {detail: account.name, severity: "info", summary: "Account " + account.name + " deleted"} );
  }

  DeleteBudgetItem(item: Model.BudgetItem)
  {
    let index = -1;
    for(let i = 0; i < this.stateService.budget.budgetItems.length; i++) {
        if(this.stateService.budget.budgetItems[i].name == item.name) {
            index = i;
            break;
        }
    }
    this.stateService.budget.budgetItems.splice(index, 1);
    this.msgs.push( {detail: item.name, severity: "info", summary: "Item " + item.name + " deleted"} );
  }

  AddNewItem()
  {
    this.stateService.budget.budgetItems.push(
      {name: "enter name", amount: 0, category: Model.Categories.EXPENSE, frequency: 1, period: Model.Periods.MONTH, initialDate:  new Date(), instances: [] }

    );
  }
}
 