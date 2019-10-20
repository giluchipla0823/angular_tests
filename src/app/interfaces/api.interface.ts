interface Api {
    jsonApi: ApiVersion;
    code: number;
    status: number;
    message: string;
    data?: any;
    errors: any;
}