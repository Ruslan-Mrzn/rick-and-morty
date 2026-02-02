import type { Dispatch, ReactNode } from 'react';

export type TStatus = 'alive' | 'dead' | 'unknown';
export type TInputTextVariant = 'bordered' | 'underlined';
export type TCharacter = {
  id: number;
  name: string;
  status: TStatus;
  species: string;
  image: string;
  gender: string;
  location: string;
};

export type TextInputProps = {
  variant: TInputTextVariant;
  placeholder: string;
  name: string;
  icon?: ReactNode;
  value?: string;
  onChange?: Dispatch<string>;
};
