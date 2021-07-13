import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/service/loading.service';
import { SinginForm } from '../models/auth.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private loadingService: LoadingService
  ) { }



  signIn({ email, password }: SinginForm) {
    if (!email || !password) {
      return;
    }
    this.loadingService.start();

    from(this.auth.signIn({ email, password }))
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => {
        this.router.navigate(['catalogue']);
      });
  }
  ngOnInit(): void {
  }

}
