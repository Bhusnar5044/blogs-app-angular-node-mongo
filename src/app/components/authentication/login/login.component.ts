import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginComponent', { static: false }) element: ElementRef;
  loginForm: FormGroup;
  marginTop: number;
  constructor(private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(40)])
    });
  }

  ngAfterViewInit() {
    this.marginTop = (window.innerHeight - 32)  / 2 - this.element.nativeElement.offsetHeight / 2 - window.innerHeight * 0.05 - 20;
    this.renderer.setStyle(this.element.nativeElement, 'margin-top', `${this.marginTop}px`);
  }

  loginHandler() {
    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify(this.loginForm.value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then((response) => {
      console.log(response);
      this.loginForm.reset();
      if (response.status === 200) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
