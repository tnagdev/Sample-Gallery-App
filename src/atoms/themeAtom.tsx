/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";


export const themeAtom = atom(localStorage.getItem('theme') || 'light' as ('dark' | 'light'));
