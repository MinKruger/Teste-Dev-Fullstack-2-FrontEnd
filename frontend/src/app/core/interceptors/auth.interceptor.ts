import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone da requisição para adicionar headers
    const clonedReq = req.clone({
      setHeaders: {
        // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Header de autorização (comentei por enquanto)
        'Content-Type': 'application/json', // Tipo de conteúdo
      },
    });

    return next.handle(clonedReq).pipe(
      // Capturar erros da API
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirecionar para a página de login (comentado por enquanto)
          // this.router.navigate(['/login']);
        } else if (error.status === 403) {
          // Redirecionar para página de acesso negado
          // this.router.navigate(['/acesso-negado']);
        } else if (error.status >= 500) {
          // Redirecionar para página de erro do servidor
          this.router.navigate(['/erro-servidor']);
        }
        return throwError(() => error); // Propagar o erro para tratamento posterior
      })
    );
  }
}
