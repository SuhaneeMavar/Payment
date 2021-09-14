import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    focus2;

    user: User = new User()
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() { }

    onSubmit() {
        this.user.role = 2
        this.userService.registerUser(this.user).subscribe(data => {
            alert('Registered Successfully..')
            this.router.navigate(['/login'])
        }, error => {
            console.log(error)
            this.router.navigate(['/error'])
        })
    }
}
