import type { Dispatch, KeyboardEvent, ReactNode } from 'react';

export type TStatus = 'Alive' | 'Dead' | 'unknown';
export type TGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
export type TSpecies =
  | 'Human'
  | 'Alien'
  | 'Humanoid'
  | 'Animal'
  | 'Robot'
  | 'Cronenberg'
  | 'Disease'
  | 'unknown';
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
  // eslint-disable-next-line no-unused-vars
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export type TServerCharacter = {
  id: number;
  name: string;
  status: TStatus;
  species: string;
  type?: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
