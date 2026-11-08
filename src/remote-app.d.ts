declare module 'remote_app/FavoriteCharacters' {
  import type { ComponentType, ReactNode } from 'react';

  export type TRemoteFavoriteCharacter = {
    id: number;
    name: string;
  };

  export type TRemoteFavoriteCharactersLabels = {
    open: string;
    close: string;
    title: string;
    remove: string;
    empty: string;
  };

  export type TRemoteLinkComponentProps = {
    to: string;
    className?: string;
    onClick?: () => void;
    children: ReactNode;
  };

  export type TRemoteFavoriteCharactersProps = {
    favorites: TRemoteFavoriteCharacter[];
    onRemove: (id: number) => void;
    labels: TRemoteFavoriteCharactersLabels;
    linkComponent?: ComponentType<TRemoteLinkComponentProps>;
  };

  const FavoriteCharacters: ComponentType<TRemoteFavoriteCharactersProps>;

  export default FavoriteCharacters;
}
