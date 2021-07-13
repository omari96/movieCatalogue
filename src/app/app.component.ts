import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'move-catalague';


  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {

  }
  ngOnInit() {
    this.loading$ = this.loadingService.loading$;
  }
}
