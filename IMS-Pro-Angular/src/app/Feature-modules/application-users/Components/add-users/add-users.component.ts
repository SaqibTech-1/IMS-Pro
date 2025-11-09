import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { environment } from 'src/app/environment';
import { Role, User } from '../../Interfaces/user';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {
  userForm!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  roles: Role[] = [];
  isEditMode = false;
  editingId?: number;
  editingGlobalId?: string;
  errorMessage = '';
  formSubmitted = false;
  fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'userName', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.editingId = +id;
      this.loadUser(this.editingId);
    }
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roleId: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }

  private loadRoles(): void {
    this.userService.getRoles().subscribe(res => {
      this.roles = res.data;
    });
  }

  private loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: res => {
        const user = res.data as User;
        this.editingGlobalId = user.globalId;
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
          roleId: user.roleId
        });

        this.userForm.get('photo')?.clearValidators();
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('photo')?.updateValueAndValidity();
        this.userForm.get('password')?.updateValueAndValidity();

        this.previewUrl = user.imageUrl
          ? `${environment.imageBaseUrl}${user.imageUrl}`
          : null;

      },
      error: () => {

      }
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.userForm.patchValue({ photo: file });

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Only PNG, JPEG, GIF allowed.';
        this.userForm.get('photo')?.setErrors({ invalidType: true });
        this.previewUrl = null;
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Max file size 5MB.';
        this.userForm.get('photo')?.setErrors({ tooLarge: true });
        this.previewUrl = null;
        return;
      }

      this.errorMessage = '';
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    this.formSubmitted = true;

    if (this.userForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.userForm.value).forEach(([key, value]) => {
      const formattedKey = this.capitalize(key);
      if (value instanceof File) {
        formData.append(formattedKey, value);
      } else if (value != null) {
        formData.append(formattedKey, String(value));
      }
    });

    const photo = this.userForm.value.photo;
    if (photo) {
      formData.append('Image', photo);
    }

    if (this.isEditMode && this.editingGlobalId) {
      formData.append('GlobalId', this.editingGlobalId);
    }

    const req$ = this.isEditMode
      ? this.userService.updateUser(this.editingId!, formData)
      : this.userService.createUser(formData);

    req$.subscribe({
      next: () => {
        this.router.navigate(['/users/list']);
      },
      error: () => {

      }
    });
  }

  getErrorTip(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (!control || (!control.touched && !this.formSubmitted)) return '';

    if (control.errors?.['required']) return 'Required';
    if (control.errors?.['email']) return 'Invalid email format';
    if (control.errors?.['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors?.['invalidType']) return 'Invalid file type';
    if (control.errors?.['tooLarge']) return 'File too large';
    return '';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



}
