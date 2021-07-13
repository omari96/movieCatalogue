import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from './loading/loading.component';
import { LoadingSpinnerComponent } from './loading/loading-spinner/loading-spinner.component';
import { MustMatchDirective } from './directives/must-match.directive';



@NgModule({
  declarations: [
    LoadingComponent,
    LoadingSpinnerComponent,
    MustMatchDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TranslateModule,
    LoadingComponent,
    LoadingSpinnerComponent,
    MustMatchDirective
  ]
})
export class SharedModule { }
