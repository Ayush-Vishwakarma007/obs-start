//************ Imports from Angular/core *************
import { Component,
  OnDestroy,
  OnInit
} from '@angular/core';

//************ Imports from rxjs *************
import {
  interval,
  Observable,
  Observer,
  Subscription
} from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription : Subscription
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    //custom obsevable
    const customIntervalObs = new Observable((observer : Observer<any>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);// next
        if(count === 5){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error (`Count is greater than 3!!`));//Error
        }
        count++;
      },1000)
    });

    this.firstObsSubscription =  customIntervalObs.pipe(map( (data: number) => { return 'Round: '+ (data + 1) })).subscribe(
      data => {
        console.log(data);//printing data in the console
      }, error => {
        console.log(error);//printing error in the console
        alert(error.message);//alert for the error message
      }, () => {
        console.log(`Completed !`);// priting the message for task complete
      });
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }

}
