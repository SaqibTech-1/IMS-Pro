import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { environment } from 'src/app/environment';
import { User } from '../../Interfaces/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = [];
  currentPage = 1;
  pageSize = 10;

  constructor(
    private userService: UserService,
    // private toastr: ToastrService,
    // private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // this.loader.show();
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data.map((user: any, index: number) => ({
          ...user,
          imageUrl: user.imageUrl ? `${environment.imageBaseUrl}${user.imageUrl}` : null,
          roleName: this.mapRoleName(user.roleId)
        }));
        // this.loader.hide();
      },
      error: () => {
        // this.toastr.error('Failed to load users');
        // this.loader.hide();
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    // this.loader.show();
    this.userService.deleteUser(id).subscribe({
      next: () => {
        // this.toastr.success('User deleted successfully');
        this.loadUsers();
      },
      error: () => {
        // this.toastr.error('Delete failed');
        // this.loader.hide();
      }
    });
  }

  mapRoleName(roleId: number): string {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Manager';
      case 3: return 'Cashier';
      default: return 'User';
    }
  }


  get totalPages(): number[] {
    const pageCount = Math.ceil(this.users.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

}
