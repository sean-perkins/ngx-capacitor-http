import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { CapacitorHttpInterceptor } from './capacitor-http.interceptor';

export const CapacitorHttpProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CapacitorHttpInterceptor,
  multi: true
};
