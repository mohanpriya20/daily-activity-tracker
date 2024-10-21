import { Component } from '@angular/core';
import { Activity } from '../models/activity';
import { OnInit } from '@angular/core';
import { Time } from '@angular/common';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit{

  newActivityTitle: string = ""
  newActivityDate: Date = new Date()
  newActivityTime: string = ""

  activities: Activity[] = []

  ngOnInit(): void {
    let savedActivities = localStorage.getItem("activities")
    this.activities = savedActivities? JSON.parse(savedActivities): []
  }

  addActivity(){
    if(this.newActivityTitle.trim().length && this.newActivityDate && this.newActivityTime){
      let newActivity: Activity = {
        id: Date.now(),
        title: this.newActivityTitle,
        date: this.newActivityDate,
        time: this.newActivityTime
      }

      this.activities.push(newActivity)
      this.newActivityTitle = ""
      this.newActivityDate = new Date()
      this.newActivityTime = ""

      localStorage.setItem("activities", JSON.stringify(this.activities))
    }
  }

  deleteActivity(index: number){
    this.activities.splice(index, 1)
    localStorage.setItem("activities", JSON.stringify(this.activities))
  }
}
