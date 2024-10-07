/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";


export const photoAtom = atom({page: 1, count: 50, results: [], total: 0, query: ''} as {page: number, count: number, results: any[], total: number, query: string});
export const videoAtom = atom({page: 1, count: 50, results: [], total: 0, query: ''} as {page: number, count: number, results: any[], total: number, query: string});
