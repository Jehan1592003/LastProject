export interface User {
    id:number;
    username:string;
    password:string;
    role: 'admin' | 'staff';
    name:string;
    email:string;
}