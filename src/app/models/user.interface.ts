export type Roles = "admin" | "user" | "";

export interface User {
    id: string;
    username: string;
    password: string;
    fullname: string;
    phone: string;
    address: string;
    province: string;
    city: string;
    zipcode: string;
    nnss: string;
    role: Roles;
    tasks: string[];
}