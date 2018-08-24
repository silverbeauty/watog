import { isDevMode } from '@angular/core';

export const server_url: string = isDevMode() ? 'http://192.168.0.79:3000/api' : 'http://151.236.34.11:3000/api';


//export const server_url: string = 'http://192.168.0.79:3000/api';
