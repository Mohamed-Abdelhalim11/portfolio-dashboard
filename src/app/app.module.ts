import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,          // Include FormsModule for template-driven forms
    ReactiveFormsModule, // Include ReactiveFormsModule for reactive forms
    AppRoutingModule
  ],
  providers: [provideHttpClient()], // Add provideHttpClient here
  bootstrap: [AppComponent] // Ensure this line has no trailing comma or syntax issues
})
export class AppModule { }
