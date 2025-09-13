// export interface Role {
//   id: number;
//   name: string;
// }

// export interface User {
//   id: number;
//   globalId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   IsActive:boolean;
//   userName: string;
//   roleId: number;
//   imageUrl: string;
// }

export interface User {
  id: number;
  globalId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  roleId: number;
  roleName?:string;
  imageUrl?: string;
  isActive: boolean;
}

export interface Role {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
