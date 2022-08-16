import { User } from '../../../models/user';
import { MockService } from '../../../services/mock.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = "";

  constructor(private fb: FormBuilder,
    private mockService: MockService,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.userForm = this.fb.group({
      id: "",
      name: '',
      username: '',
      email: '',
      website: '',
    })
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log(this.userId);
      if(this.userId !== null || undefined) {
        this.mockService.mockGetUser(this.userId).subscribe(result => {
          this.userForm.patchValue({
            id: result[0].id,
            name: result[0].name,
            username: result[0].username,
            email: result[0].email,
            website: result[0].website,
          })
        })
      }
    })

    this.getUsers();
  }

  getUsers() {
    this.mockService.mockGetUsers().subscribe(response => {
      this.users = response;
    })
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.users.length + 1);
    this.mockService.mockPostUser(this.userForm.value).subscribe(result => {
      console.log(`Usuario ${result.nome} ${result.sobrenome} foi cadastrado com sucesso !`)
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }

  updateUser() {
    this.mockService.mockUpdateUser(this.userId, this.userForm.value).subscribe(result => {
      console.log('usuario atualizado', result);
    }, (err) => {

    }, () => {
      this.router.navigate(['/']);
    })
  }

  actionButton() {
    if(this.userId !== null) {
      this.updateUser()
    }else {
      this.createUser()
    }
  }
}
