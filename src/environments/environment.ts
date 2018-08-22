import { isDevMode } from '@angular/core';

export const server_url: string = isDevMode() ? 'http://localhost:3000/api' : 'http://151.236.34.11:3000/api';
