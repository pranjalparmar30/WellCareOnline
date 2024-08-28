import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../navbar/navbar.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailFormatPipe } from 'src/app/pipes/email-format.pipe';


@NgModule({
  declarations: [
    RegistrationComponent,
    EmailFormatPipe
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmailFormatPipe
  ]
})
export class RegistrationModule { }
