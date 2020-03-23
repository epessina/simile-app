import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

import { LangService } from "../lang.service";


export class LngInterceptorService implements HttpInterceptor {

    constructor(private i18n: TranslateService, private langService: LangService) {}

    /**
     * Intercepts an http request and add the headers to it.
     *
     * @param {HttpRequest<any>} req - The request object.
     * @param {HttpHandler} next - The handler that forwards the request.
     * @return {Observable<HttpEvent<any>>} The modified request.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let newReq = null;

        if (this.i18n.currentLang)
            newReq = req.clone({
                headers: req.headers.append("Accept-Language", this.langService.currLanguage)
            });

        return next.handle(newReq || req);

    }

}
