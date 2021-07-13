import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from, } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/service/loading.service';
import { SingupForm } from '../models/auth.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private loadingService: LoadingService
  ) { }

  signUP(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value
    if (!email || !password) {
      return;
    }
    this.loadingService.start();
    from(this.auth.signUp({ email, password }))
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => this.router.navigate(['catalogue']));
  }

  ngOnInit(): void {
  }

}
