import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      titleHome: ['', Validators.required],
      cvLink: ['', [Validators.required, Validators.pattern('https?://.+')]],
      aboutMe: ['', Validators.required],
      softSkill: [''],
      techSkill: [''],
      projects: this.fb.array([]) 
    });
  }


  get projects() {
    return this.userForm.get('projects') as FormArray;
  }

  addProject() {
    this.projects.push(this.fb.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectLink: ['', Validators.required],
    }));
  }

  removeProject(index: number) {
    this.projects.removeAt(index);
  }

  async onSubmit() {
    if (this.userForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const formData = this.userForm.value;
    formData.softSkill = formData.softSkill.split(',').map((skill: string) => skill.trim());
    formData.techSkill = formData.techSkill.split(',').map((skill: string) => skill.trim());

    const token = localStorage.getItem('authToken'); // Retrieve the token

    if (!token) {
      alert('Please log in to continue.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the header
    });

    try {
      const response = await this.http.post('http://localhost:3000/api/user', formData, { headers }).toPromise();
      alert('Data successfully submitted!');
      console.log('Response data:', response);
      this.router.navigate(['/success']); // Redirect to a different page upon success
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  }
}
