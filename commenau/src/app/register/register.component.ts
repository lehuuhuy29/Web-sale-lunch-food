import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../Services/user.service';

export function checkExistPhone(phones: any = []){
  return (c : AbstractControl) =>{
    return (phones.includes(c.value)) ?{
      invalidphone : true
    } : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(private formBuilder :FormBuilder, private serviceUser : UserService,private router: Router,private route: ActivatedRoute) { 

    this.formRegister = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10), checkExistPhone(this.serviceUser.getListPhone())]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      re_password: new FormControl('', Validators.required)
    },
    {
      validators : this.MustMatch('password', 're_password')
     }
    )
  }



  ngOnInit(): void {
    
  }

  MustMatch(controlName: string, matchingControlName: string){
    return(formGroup : FormGroup) =>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.MustMatch){
        return
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({MustMatch: true});
      }else{
        matchingControl.setErrors(null);
      }
    }
  }
  onSubmit(){
    this.serviceUser.getUser().subscribe(data =>{
      const user = new User();
      user.id = data.length + 1 + '';
      user.name =  this.formRegister.controls.name.value;
      user.email = this.formRegister.controls.email.value;
      user.phone = this.formRegister.controls.phone.value;
      user.password = this.formRegister.controls.password.value;
      user.address = '';
      this.serviceUser.addUser(user).subscribe(data =>{
      console.log(data);
      });
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dangnhap';
      this.router.navigateByUrl(returnUrl);
    }
    ) ;
    
    

  }
  
  

}
