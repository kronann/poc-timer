import {Injectable} from '@angular/core';
import {JobLevel, ScheduledJob} from './job';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class IntervalService {

  scheduleJobs: Map<ScheduledJob, Subscription> = new Map();

  constructor() {
    this.scheduleJobs.set(new ScheduledJob("RIRI", JobLevel.CHASE), null);
    this.scheduleJobs.set(new ScheduledJob("FIFI", JobLevel.ALERT), null);
    this.scheduleJobs.set(new ScheduledJob("LOULOU", JobLevel.COOL), null);
  }

  process() {

    for (let entry of Array.from(this.scheduleJobs.entries())) {
      if (entry[0].onError) {
        this.startJobTimer(entry[0]);
        console.log("ENTRY ", entry)
      }
    }

  }

  private updateProcess(entry) {
    this.scheduleJobs.set(entry, entry.start()
      .subscribe((el) => console.log(`${entry.name} has UPDATED`), err => err,
        () => {
          if (entry.onError) {
            this.updateProcess(entry);
          }
        }));
  }

  public startJobTimer(entry: ScheduledJob) {
    this.scheduleJobs.set(entry, entry.start()
      .subscribe((el) => {
          console.log(`${entry.name} has STARTED, ${el}`)
        }, err => err,
        () => {
          if (entry.onError) {
            this.updateProcess(entry);
          }
        }));
  }

  public stopJobTimer(entry: ScheduledJob) {
    this.scheduleJobs.get(entry).unsubscribe();
    console.log('IS STOP ====== ', entry.name)
  }

  public restartFrom(entry: ScheduledJob, level: JobLevel) {
      this.scheduleJobs.set(entry, entry.restartFrom(level).subscribe((el) => {
          console.log(`${entry.name} has STARTED, ${el}`)
        }, err => err,
        () => {
          if (entry.onError) {
            this.updateProcess(entry);
          }
        }));
  }

  display() {
    for (let entry of Array.from(this.scheduleJobs.entries())) {

      console.log("ENTRY ", entry)

    }

  }
}
