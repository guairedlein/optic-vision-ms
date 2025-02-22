export interface JwtPayload {
    sub: number;
    email: string;
  }
  
  export interface AuthResponse {
    user: {
      id: number;
      name: string;
      email: string;
      createdAt: Date;
    };
    accessToken: string;
  }