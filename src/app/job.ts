import {timer} from 'rxjs/observable/timer';
import {first, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

type toto = 'COOL' | 'ALERT';

enum JobLevelName {
  COOL,
  ALERT,
  WARN,
  CHASE,
  NOLIMIT
}

export class JobLevel {

  static levels = [
    {name: JobLevelName.COOL, counter: 0, period: 1000},
    {name: JobLevelName.ALERT, counter: 1, period: 2000},
    {name: JobLevelName.WARN, counter: 2, period: 4000},
    {name: JobLevelName.CHASE, counter: 3, period: 5000},
    {name: JobLevelName.NOLIMIT, counter: 4, period: 10000}
  ];

  static COOL = JobLevel.levels[0];
  static ALERT = JobLevel.levels[1];
  static WARN = JobLevel.levels[2];
  static CHASE = JobLevel.levels[3];
  static NOLIMIT = JobLevel.levels[4];

  static getNextLevelFrom(jobLevelName) {
    console.log('LEVEL EN COURS ', jobLevelName)
    let result = JobLevel.levels[JobLevel.levels.length - 1]
    let index = JobLevel.levels.findIndex(job => job.name === jobLevelName);
    if (index !== -1 && index < JobLevel.levels.length) {
      result = JobLevel.levels[index+1];
    }

    if(jobLevelName === JobLevelName.NOLIMIT){
      result = JobLevel.levels[JobLevel.levels.length - 1]
      result.counter += 1;
    }
    console.log("NEXT LEVEL ", result.name);
    return result;
  }
}
;

export class ScheduledJob {
  private timer$: Observable<any>;
  onError = true;
  currentLevel = JobLevel.COOL;

  constructor(public name: string, level?) {
    this.currentLevel = level;
  }

  start() {
    this.timer$ = timer(this.currentLevel.period).pipe(first(), tap(() => {
      this.updateLevel();

    }));
    return this.timer$;
  }

  private updateLevel() {
    if (this.currentLevel.counter == 3) {
      this.onError = false;
    }
    this.currentLevel = JobLevel.getNextLevelFrom(this.currentLevel.name);
    console.log("In update --- ", this.name, this.currentLevel.counter, this.onError);
    console.log("New level --- ", this.currentLevel.name);

  }

  stop() {
    // subscription !!
  }

  restartFrom(level: JobLevel) {
    switch (level) {
      case JobLevel.COOL:
        this.currentLevel = JobLevel.COOL;
        console.log('LEVEL ', level, this.currentLevel);
        break;
      case JobLevel.ALERT:
        this.currentLevel = JobLevel.ALERT;
        console.log('LEVEL ', level, this.currentLevel);
        break;
      case JobLevel.WARN:
        this.currentLevel = JobLevel.WARN;
        console.log('LEVEL ', level, this.currentLevel);
        break;
      case JobLevel.CHASE:
        this.currentLevel = JobLevel.CHASE;
        console.log('LEVEL ', level, this.currentLevel);
        break;
      default:
        this.currentLevel=  JobLevel.getNextLevelFrom(this.currentLevel.name);
        console.log('MAX LEVEL ', level, this.currentLevel);
        break;

    }
    this.timer$ = timer(this.currentLevel.period).pipe(first(), tap(() => {
      this.updateLevel();
    }));

    return this.timer$;
  }

}
