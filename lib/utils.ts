import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*()_+=";
export function generateRandom(length: number) : string {
  let result = '';
  const charactersLength = letterBytes.length;
  let counter = 0;
  while (counter < length) {
    result += letterBytes.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
import { io } from 'socket.io-client';

export const useSocket = () => {
  return io();
};
