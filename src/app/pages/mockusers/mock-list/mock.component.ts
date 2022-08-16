import { MockService } from './../../../services/mock.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css'],
})
export class MockComponent implements OnInit {
  users: Array<User> = [];

  constructor(private mockService: MockService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.mockService.mockGetUsers().subscribe(response => {
      this.users = response;
    }, (err) => {
      console.log('ERRO AO EXECUTAR', err.status);
    })
  }

  deleteUser(id: number): void {
    this.mockService.mockDeleteUser(id).subscribe(response => {
      console.log('Usuario Excluido');
    }, (err) => {
      console.log(err)
    }, () => {
      this.getUsers();
    })
  }

}