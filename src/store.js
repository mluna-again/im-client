import { writable } from 'svelte/store';

export const user = writable(null);

export const messagesChannel = writable(null);

export const requestsChannel = writable(null);
