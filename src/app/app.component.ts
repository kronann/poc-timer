import {Component} from '@angular/core';
import {IntervalService} from './interval.service';
import {JobLevel, ScheduledJob} from './job';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public intervalService: IntervalService) {
    this.process();
  }

  process() {
    this.intervalService.process();
  }

  restartTimer(){
    // this.intervalService.display();
    let jobLoulou = null;
    for (let job of Array.from(this.intervalService.scheduleJobs.keys())){
      if(job.name === 'LOULOU'){
        jobLoulou = job;
        break;
      }
    }

    console.log("restart ", jobLoulou);
    this.intervalService.restartFrom(jobLoulou, JobLevel.ALERT);
  }


  cancelTimer() {
    let jobLoulou = null;
    for (let job of Array.from(this.intervalService.scheduleJobs.keys())){
      if(job.name === 'LOULOU'){
        jobLoulou = job;
        break;
      }
    }

    this.intervalService.stopJobTimer(jobLoulou);
  }
}
