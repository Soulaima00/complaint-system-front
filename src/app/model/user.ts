export class User {
  id: number = 0;
  lastName: string = '';
  firstName: string = '';
    phone: string = '';
    email: string = '';
    isAdmin: Boolean = false;
    password: string = '';
    country: string = '';
    birth: Date = new Date();
    gender: string = '';
  
    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
  }
  