import { Dispatch, SetStateAction } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type StateSetter<T> = Dispatch<SetStateAction<T>>;
