import { isDevMode } from '@angular/core';

export const server_url: string = isDevMode() ? 'http://localhost:3000/api' : 'http://contest.watog.org/api';
