import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
    intercept(request:HttpRequest<any>, next:HttpHandler){
        const modifiedRequest=request.clone({headers:request.headers.append('Auth','xyz')});
        //Append new headers to existing request
        console.log(modifiedRequest);
        return next.handle(modifiedRequest);//Continue the request 
    }
}