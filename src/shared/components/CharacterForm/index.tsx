import { type Dispatch, memo, useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import {
  MemoizedCheckIcon as CheckIcon,
  MemoizedCrossIcon as CrossIcon
} from '@/assets/icons';
import { FormTextInput, Selector } from '@/shared/components';
import { Indicator } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { statusOptions } from '@/shared/helpers/mocks';
import type { TCharacter, TStatus } from '@/shared/types';

import styles from './CharacterForm.module.scss';

const OptionStatusComponent = memo(({ option }: { option: TStatus }) => {
  return (
    <>
      {option}
      <Indicator status={option} />
    </>
  );
});

const characterEditSchema = zod.object({
  name: zod
    .string()
    .min(1, 'Name is required')
    .max(25, 'Name is too long')
    .trim(),
  location: zod
    .string()
    .min(1, 'Location is required')
    .max(30, 'Location is too long')
    .trim(),
  status: zod
    .union([zod.literal('alive'), zod.literal('dead'), zod.literal('unknown')])
    .catch('unknown')
});

type TCharacterEditFormData = zod.infer<typeof characterEditSchema>;

type CharacterFormProps = {
  data: TCharacter;
  changeImgAlt: Dispatch<string>;
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
    changeImgAlt,
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

        changeImgAlt(fullCharacterData.name);
        onUpdateCharacter(fullCharacterData);
        setIsEditing(false);
      }
    };

    const handleDiscardChanges = useCallback(() => {
      resetFormToInitialValues();
      setIsEditing(false);
    }, [resetFormToInitialValues, setIsEditing]);

    return (
      <form
        id={`character-form-${id}`}
        className={styles.characterForm}
        onSubmit={handleSubmit(handleAcceptChanges)}
      >
        <div className={styles.characterForm__nameContainer}>
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
        <div className={styles.characterForm__field}>
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
        <div className={styles.characterForm__field}>
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
