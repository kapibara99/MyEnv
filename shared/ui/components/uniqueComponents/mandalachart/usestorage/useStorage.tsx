import { useState, useEffect } from 'react';
import type { CellZahyou, MandalaCellProps } from '../chart';

export default function useLocalStorage(
	key: string,
	initialValue?: MandalaCellProps[],
): {
	storedValue: MandalaCellProps[] | undefined;
	setStoredValue: React.Dispatch<React.SetStateAction<MandalaCellProps[] | undefined>>;
	localSetter: (inputValue: string, zahyou: CellZahyou) => void;
} {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as MandalaCellProps[]) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	// stateの値が変更された時にlocalStorageに値を保存
	useEffect(() => {
		if (!storedValue) return;
		try {
			const serializedValue = JSON.stringify(storedValue);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error(error);
		}
	}, [key, storedValue]);

	const localSetter = (inputValue: string, zahyou: CellZahyou) => {
		const current = storedValue?.slice();
		if (!current) return;
		const index = zahyou[0] * 9 + zahyou[1];
		current[index].value = inputValue;
		setStoredValue(current);
	};

	return { storedValue, setStoredValue, localSetter };
}
