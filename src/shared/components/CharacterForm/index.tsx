import { type Dispatch, memo, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { CheckIcon, CrossIcon } from '@/assets/icons';
import { FormTextInput, Indicator, Selector } from '@/shared/components';
import { LAST_VIEWED_CHARACTER_STORAGE_KEY } from '@/shared/constants';
import { classNames, statusOptions } from '@/shared/helpers';
import type { TCharacter, TStatus } from '@/shared/types';

import styles from './CharacterForm.module.scss';

type TOptionStatusComponentProps = {
  option: TStatus;
};

const OptionStatusComponent = memo(
  ({ option }: TOptionStatusComponentProps) => {
    return (
      <>
        {option}
        <Indicator status={option} />
      </>
    );
  }
);

const characterEditSchema = zod.object({
  name: zod
    .string()
    .min(1, 'Name is required')
    .max(40, 'Name is too long')
    .trim(),
  location: zod
    .string()
    .min(1, 'Location is required')
    .max(50, 'Location is too long')
    .trim(),
  status: zod
    .union([zod.literal('alive'), zod.literal('dead'), zod.literal('unknown')])
    .catch('unknown')
});

type TCharacterEditFormData = zod.infer<typeof characterEditSchema>;

type CharacterFormProps = {
  data: TCharacter;
  setIsEditing: Dispatch<boolean>;
  isEditing: boolean;
  onUpdateCharacter: (_character: TCharacter) => void;
};

const CharacterForm = memo(
  ({
    data: {
      id,
      name: initialName,
      location: initialLocation,
      status: initialStatus,
      gender,
      species,
      image,
      origin
    },
    setIsEditing,
    isEditing,
    onUpdateCharacter
  }: CharacterFormProps) => {
    const {
      control,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
      reset,
      trigger
    } = useForm<TCharacterEditFormData>({
      resolver: zodResolver(characterEditSchema),
      defaultValues: {
        name: initialName,
        location: initialLocation,
        status: initialStatus
      },
      mode: 'onChange'
    });

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

    const statusValue = watch('status');

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
              value={watch('name')}
              variant='underlined'
              placeholder='Enter name'
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
        {errors.name && (
          <span className={styles.characterForm__nameError}>
            {errors.name?.message}
          </span>
        )}
        <div className={styles.characterForm__field}>
          <span className={styles.characterForm__fieldTitle}>Gender</span>
          <span className={styles.characterForm__fieldValue}>{gender}</span>
        </div>
        <div className={styles.characterForm__field}>
          <span className={styles.characterForm__fieldTitle}>Species</span>
          <span className={styles.characterForm__fieldValue}>{species}</span>
        </div>
        <div
          className={classNames(styles.characterForm__field, {
            [styles.characterForm__field_editing]: Boolean(isEditing)
          })}
        >
          <span
            className={classNames(styles.characterForm__fieldTitle, {
              [styles.characterForm__fieldTitle_error]: Boolean(errors.location)
            })}
          >
            {errors.location ? errors.location.message : 'Location'}
          </span>
          {isEditing ? (
            <FormTextInput
              control={control}
              name='location'
              value={watch('location')}
              variant='underlined'
              placeholder='Enter location'
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
          <span className={styles.characterForm__fieldTitle}>Status</span>
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
              {initialStatus}
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
              onClick={handleSubmit(handleAcceptChanges)}
              className={styles.characterForm__acceptChanges}
            >
              <CheckIcon />
            </button>
          </div>
        )}
      </form>
    );
  }
);

export default CharacterForm;
