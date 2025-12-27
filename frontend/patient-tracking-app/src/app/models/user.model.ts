// User related models
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    message: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    createdDate: Date;
}
