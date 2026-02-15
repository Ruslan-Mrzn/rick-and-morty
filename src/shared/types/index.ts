import type { Dispatch, KeyboardEvent, ReactNode } from 'react';

export type TStatus = Lowercase<'Alive' | 'Dead' | 'unknown'>;
export type TGender = Lowercase<'Female' | 'Male' | 'Genderless' | 'unknown'>;
export type TSpecies = Lowercase<
  | 'Human'
  | 'Alien'
  | 'Humanoid'
  | 'Animal'
  | 'Robot'
  | 'Cronenberg'
  | 'Disease'
  | 'unknown'
>;
export type TInputTextVariant = 'bordered' | 'underlined';
export type TCharacter = {
  id: number;
  name: string;
  status: TStatus;
  species: TSpecies;
  image: string;
  gender: TGender;
  location: string;
};

export type TextInputProps = {
  variant: TInputTextVariant;
  placeholder: string;
  name: string;
  icon?: ReactNode;
  value?: string;
  onChange?: Dispatch<string>;
  onKeyDown?: (_e: KeyboardEvent<HTMLInputElement>) => void;
};

export type TServerCharacter = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
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
