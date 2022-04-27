export interface UserSignin {
    userName: string;
    password: string;
}

export interface UserSignup {
    userName: string;
    name: string;
    mail: string;
    birthDate: Date;
    password: string;
    role: string[];
    category: string[];
}
