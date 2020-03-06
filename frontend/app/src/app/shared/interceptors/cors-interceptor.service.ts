import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


/** Intercepts any http request and adds to it the cors headers. */
export class CorsInterceptorService implements HttpInterceptor {

  constructor() {}


  /**
   * Intercepts an http request and add the headers to it.
   *
   * @param {HttpRequest<any>} req - The request object.
   * @param {HttpHandler} next - The handler that forwards the request.
   * @return Observable<HttpEvent<any>>
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: req.headers
          .append("Access-Control-Allow-Origin", "*")
          .append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
          .append( "Access-Control-Allow-Headers", "origin, x-requested-with")
    });

    console.log(newReq);

    return next.handle(newReq);

  }

}
