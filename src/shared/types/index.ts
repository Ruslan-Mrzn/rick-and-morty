import type { Dispatch, KeyboardEvent, ReactNode } from 'react';

export type TStatus = 'alive' | 'dead' | 'unknown';
export type TGender = 'female' | 'male' | 'genderless' | 'unknown';
export type TSpecies =
  | 'human'
  | 'alien'
  | 'humanoid'
  | 'animal'
  | 'robot'
  | 'cronenberg'
  | 'disease'
  | 'unknown';
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
export type TGetCharactersProps = {
  page?: number;
  name?: string;
  status?: Lowercase<TStatus>;
  gender?: Lowercase<TGender>;
  species?: Lowercase<TSpecies>;
  signal?: AbortSignal;
};
