import { type Dispatch, useCallback, useEffect, useMemo } from 'react';

import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';

import { CheckIcon, CrossIcon } from '@/assets/icons';
import {
  FormTextInput,
  Indicator,
  Selector,
  StatusOptionLabel
} from '@/shared/components';
import { LAST_VIEWED_CHARACTER_STORAGE_KEY } from '@/shared/constants';
import { classNames, speciesOptions, statusOptions } from '@/shared/helpers';
import type { TCharacter, TStatus } from '@/shared/types';

import {
  createCharacterEditSchema,
  type TCharacterEditFormData
} from './characterEditSchema';
import styles from './CharacterForm.module.scss';

type TOptionStatusComponentProps = {
  option: TStatus;
};

const OptionStatusComponent = ({ option }: TOptionStatusComponentProps) => {
  return (
    <>
      <StatusOptionLabel option={option} />
      <Indicator status={option} />
    </>
  );
};

type CharacterFormProps = {
  data: TCharacter;
  setIsEditing: Dispatch<boolean>;
  isEditing: boolean;
  onUpdateCharacter: (_character: TCharacter) => void;
};

const CharacterForm = ({
  data: {
    id,
    name: initialName,
    location: initialLocation,
    status: initialStatus,
    gender,
    species,
    speciesLabel,
    image,
    origin
  },
  setIsEditing,
  isEditing,
  onUpdateCharacter
}: CharacterFormProps) => {
  const { t, i18n } = useTranslation();
  const characterEditSchema = useMemo(() => createCharacterEditSchema(t), [t]);
  const resolver = useMemo(
    () => zodResolver(characterEditSchema),
    [characterEditSchema]
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    trigger
  } = useForm<TCharacterEditFormData>({
    resolver,
    defaultValues: {
      name: initialName,
      location: initialLocation,
      status: initialStatus
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (!isEditing) {
      return;
    }

    void trigger();
  }, [i18n.language, isEditing, trigger]);

  const resetFormToInitialValues = useCallback(() => {
    reset({
      name: initialName,
      location: initialLocation,
      status: initialStatus
    });
  }, [initialName, initialLocation, initialStatus, reset]);

  useEffect(() => {
    resetFormToInitialValues();
  }, [resetFormToInitialValues]);

  const statusValue = useWatch({
    control,
    name: 'status'
  });

  const handleStatusChange = useCallback(
    (value: TStatus) => {
      setValue('status', value);
    },
    [setValue]
  );

  const handleAcceptChanges = async (formData: TCharacterEditFormData) => {
    const isValid = await trigger();

    if (isValid) {
      const fullCharacterData = {
        id,
        name: formData.name,
        location: formData.location,
        status: formData.status,
        gender,
        species,
        speciesLabel,
        image,
        origin
      };

      onUpdateCharacter(fullCharacterData);
      setIsEditing(false);
    }
  };

  const handleDiscardChanges = useCallback(() => {
    resetFormToInitialValues();
    setIsEditing(false);
  }, [resetFormToInitialValues, setIsEditing]);

  const handleOpenCharacterPage = useCallback(() => {
    sessionStorage.setItem(LAST_VIEWED_CHARACTER_STORAGE_KEY, String(id));
  }, [id]);

  return (
    <form
      id={`character-form-${id}`}
      className={styles.characterForm}
      onSubmit={handleSubmit(handleAcceptChanges)}
    >
      <div
        className={classNames(styles.characterForm__nameContainer, {
          [styles.characterForm__nameContainer_editing]: Boolean(isEditing)
        })}
      >
        {isEditing ? (
          <FormTextInput
            control={control}
            name='name'
            variant='underlined'
            placeholder={t('characterForm.namePlaceholder')}
          />
        ) : (
          <Link
            className={styles.characterForm__name}
            to={`/character/${id}`}
            onClick={handleOpenCharacterPage}
          >
            {initialName}
          </Link>
        )}
      </div>
      {isEditing && errors.name && (
        <span className={styles.characterForm__nameError}>
          {errors.name?.message}
        </span>
      )}
      <div className={styles.characterForm__field}>
        <span className={styles.characterForm__fieldTitle}>
          {t('characterForm.gender')}
        </span>
        <span className={styles.characterForm__fieldValue}>
          {t(`genders.${gender}`)}
        </span>
      </div>
      <div className={styles.characterForm__field}>
        <span className={styles.characterForm__fieldTitle}>
          {t('characterForm.species')}
        </span>
        <span className={styles.characterForm__fieldValue}>
          {speciesOptions.includes(species)
            ? t(`species.${species}`)
            : speciesLabel}
        </span>
      </div>
      <div
        className={classNames(styles.characterForm__field, {
          [styles.characterForm__field_editing]: Boolean(isEditing)
        })}
      >
        <span
          className={classNames(styles.characterForm__fieldTitle, {
            [styles.characterForm__fieldTitle_error]: Boolean(
              isEditing && errors.location
            )
          })}
        >
          {isEditing && errors.location
            ? errors.location.message
            : t('characterForm.location')}
        </span>
        {isEditing ? (
          <FormTextInput
            control={control}
            name='location'
            variant='underlined'
            placeholder={t('characterForm.locationPlaceholder')}
          />
        ) : (
          <span className={styles.characterForm__fieldValue}>
            {initialLocation}
          </span>
        )}
      </div>
      <div
        className={classNames(styles.characterForm__field, {
          [styles.characterForm__field_editing]: Boolean(isEditing)
        })}
      >
        <span className={styles.characterForm__fieldTitle}>
          {t('characterForm.status')}
        </span>
        {isEditing ? (
          <Selector
            size='small'
            options={statusOptions}
            value={statusValue}
            OptionComponent={OptionStatusComponent}
            onChange={handleStatusChange}
          />
        ) : (
          <div
            className={classNames(
              styles.characterForm__fieldValue,
              styles.characterForm__status
            )}
          >
            {t(`statuses.${initialStatus}`)}
            <Indicator status={initialStatus} />
          </div>
        )}
      </div>
      {isEditing && (
        <div className={styles.characterForm__controls}>
          <div className={styles.characterForm__discardChanges}>
            <CrossIcon onClick={handleDiscardChanges} />
          </div>
          <button
            type='submit'
            className={styles.characterForm__acceptChanges}
          >
            <CheckIcon />
          </button>
        </div>
      )}
    </form>
  );
};

export default CharacterForm;
