
//SignUp
export interface SignUpFormValues {
    email: string;
    name: string;
    password: string;
  }
  
  export interface SignUpErrorMessages {
    email?: string;
    password?: string;
  }
  
  export interface SignUpResponse {
    message: string;
  }
  
  export type SignUpProps = Record<string, unknown>;

  //Login
  export interface LoginFormValues {
    email: string;
    password: string;
  }
  
  export interface LoginErrorMessages {
    email?: string;
    password?: string;
  }
  
  export interface LoginResponse {
    message: string;
  }
  
  export type LoginProps = Record<string, unknown>;

  //Verify Email
export interface VerifyEmailMessages {
    success?: string;
    four04?: string;
  }
  export type VerifyEmailProps = Record<string, unknown>;