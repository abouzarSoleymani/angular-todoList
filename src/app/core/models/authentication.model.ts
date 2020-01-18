export interface LoginRequestModel {
    username: string;
    password: string;
}

export interface LoginResponseModel {
    access_token: string;
    token_type: string;
    scope: string;
}
