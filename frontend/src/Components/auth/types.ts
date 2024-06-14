
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
  
  export interface SignUpProps {
    // Add any props specific to SignUp component here
  }

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
  
  export interface LoginProps {
    // Add any props specific to Login component here
  }

  //Verify Email
export interface VerifyEmailMessages {
    success?: string;
    four04?: string;
  }
  export interface VerifyEmailProps {
    // Add any props specific to VerifyEmail component here
  }