import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { Http, HttpParams as CapacitorHttpParams, HttpHeaders as CapacitorHttpHeaders } from '@capacitor-community/http';
import { Platform } from '@ionic/angular';

import { catchError, defer, map, Observable, throwError } from 'rxjs';

@Injectable()
export class CapacitorHttpInterceptor implements HttpInterceptor {

  constructor(private platform: Platform) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.platform.is('capacitor')) {
      return this.interceptNativeRequest(req, next);
    }
    return this.interceptWebRequest(req, next);
  }

  private interceptNativeRequest(req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
    const { method, body, url, headers, params } = req;
    /**
     * Transforms the type signature of Angular http headers
     * to Capacitor's type signature for http headers.
     *
     * Sanitizes invalid header values from the output.
     */
    const sanitizeHeaders = (headers: HttpHeaders) => {
      const res: CapacitorHttpHeaders = {};
      for (const key of headers.keys()) {
        res[key] = decodeURIComponent(params.get(key) || '');
      }
      return res;
    }
    /**
     * Transforms the type signature of Angular http params
     * to Capacitor's type signature for http params.
     *
     * Sanitizes invalid param values from the output.
     */
    const sanitizeParams = (params: HttpParams) => {
      const res: CapacitorHttpParams = {};
      for (const key of params.keys()) {
        res[key] = decodeURIComponent(params.get(key) || '');
      }
      return res;
    };

    return defer(() => Http.request({
      url,
      method,
      data: body || {},
      headers: {
        ...sanitizeHeaders(headers),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      params: sanitizeParams(params)
    })).pipe(
      catchError(e => throwError(() => this.handleRequestError(e))),
      map(res => {
        if (res.status >= 400) {
          let errorResponse = new HttpErrorResponse({
            error: res.data,
            headers: new HttpHeaders(res.headers),
            url: res.url,
            status: res.status,
          })
          throw this.handleRequestError(errorResponse);
        }
        return new HttpResponse({ body: res.data });
      })
    )
  }

  private interceptWebRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

  private handleRequestError(error: HttpErrorResponse) {
    return error;
  }

}
