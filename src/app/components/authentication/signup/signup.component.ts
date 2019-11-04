import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('signupComponent', { static: false }) element: ElementRef;
  signupForm: FormGroup;
  marginTop: number;
  date = new Date().toJSON().slice(0, 10);

  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      gender: new FormControl('male', Validators.required),
      dob: new FormControl(this.date, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40)])
    });
  }

  ngAfterViewInit() {
    this.marginTop = (window.innerHeight - 32)  / 2 - this.element.nativeElement.offsetHeight / 2 - window.innerHeight * 0.05 - 20;
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', `${this.marginTop}px`);
  }

  signupHandler() {
    fetch('/users/register', {
      method: 'POST',
      body: JSON.stringify(this.signupForm.value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      if (response.status === 200) {
        this.router.navigate(['auth/login']);
      }
    });
  }
}
