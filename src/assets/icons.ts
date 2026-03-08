import { memo } from 'react';

import LeftArrowIcon from '@/assets/icons/arrow-left-icon.svg?react';
import CheckIcon from '@/assets/icons/check-icon.svg?react';
import CrossIcon from '@/assets/icons/cross-icon.svg?react';
import EditIcon from '@/assets/icons/edit-icon.svg?react';
import LightThemeIcon from '@/assets/icons/light-theme-icon.svg?react';
import LogoIcon from '@/assets/icons/logo-icon.svg?react';
import SearchIcon from '@/assets/icons/search-icon.svg?react';
import SelectorArrowIcon from '@/assets/icons/selector-arrow-icon.svg?react';

export const MemoizedLogoIcon = memo(LogoIcon);
export const MemoizedLightThemeIcon = memo(LightThemeIcon);
export const MemoizedLeftArrowIcon = memo(LeftArrowIcon);
export const MemoizedSelectorArrowIcon = memo(SelectorArrowIcon);
export const MemoizedSearchIcon = memo(SearchIcon);
export const MemoizedEditIcon = memo(EditIcon);
export const MemoizedCrossIcon = memo(CrossIcon);
export const MemoizedCheckIcon = memo(CheckIcon);

export {
  LogoIcon,
  LightThemeIcon,
  LeftArrowIcon,
  SelectorArrowIcon,
  SearchIcon,
  EditIcon,
  CrossIcon,
  CheckIcon
};
