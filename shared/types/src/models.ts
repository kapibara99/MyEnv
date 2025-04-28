// packages/shared-types/src/index.ts
export interface User {
	id: string;
	name: string;
	email: string;
}

export type Role = 'admin' | 'user' | 'guest';

export enum Status {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
}

// APIレスポンスの共通型なども定義できる
export interface ApiResponse<T> {
	success: boolean;
	data: T | null;
	message?: string;
}

console.log('test');
