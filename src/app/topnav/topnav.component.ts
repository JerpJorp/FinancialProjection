import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";
import { RestService } from "../rest.service";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(public stateService: StateService, private restService: RestService ) { }

  localIdStatus: string;
  localLabelClass: string;
  localIdMessage: string;

  ngOnInit() {
      this.localIdStatus = "unknown";
      this.localLabelClass = "label-default"
      this.CheckIfBudgetExists();
  }

  UserIdChange() {    
    this.SetState("unknown");

  }

  private SetState(newState: string)
  {
      switch (newState) {
        case "exists":
          this.localIdStatus = newState;
          this.localLabelClass = "label-danger"   
          this.localIdMessage = "Database already exists! retrieve it.";
          break;
        case "new":
          this.localIdStatus = newState;
          this.localLabelClass = "label-warning"          
          this.localIdMessage = "not in database.  save whenever you want.";
          break;
        case "saved":
          this.localIdStatus = newState;
          this.localLabelClass = "label-success";
          this.localIdMessage = "Currently synced with database. Save after you make any changes.";
          break;
        case "unknown":        
        default:
          this.localIdStatus = "unknown";
          this.localLabelClass = "label-default";
          this.localIdMessage = "Check the status before getting too far.";
      }
  }

  CheckIfBudgetExists()
  {
      this.restService.getBudget(this.stateService.budget.userId).subscribe(
        x => {
            if (x == null)
            {
              this.SetState("new");
            }
            else 
            {
              this.SetState("exists");
            }
        }
      );
  }
  
  RetrieveBudget() 
  {
    this.stateService.retrieve();
    this.SetState("saved");
  }

  CreateBudget()
  {
    this.stateService.upsert();
    this.SetState("saved");
  }

  SaveBudget()
  {
    this.stateService.upsert();
    this.SetState("saved");
  }

}
