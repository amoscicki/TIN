import { writable } from 'svelte/store';

export const userStore = writable(null);

export const resolveCurrentUser = async () => {
  const promise = fetch('/api/auth/verify').then((res) => res.json());
  const user = await promise;
  const unsubscribe = userStore.subscribe((value) => {
    if (value && value === user) return;
    userStore.set(user);
  });
  unsubscribe();
};
