import { type Dispatch, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { CheckIcon, CrossIcon } from '@/assets/icons';
import { FormTextInput, Selector } from '@/shared/components';
import { Indicator } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { statusOptions } from '@/shared/helpers/mocks';
import type { TCharacter, TStatus } from '@/shared/types';

import styles from './CharacterForm.module.scss';

const OptionStatusComponent = ({ option }: { option: TStatus }) => {
  return (
    <>
      {option}
      <Indicator status={option} />
    </>
  );
};

const characterEditSchema = zod.object({
  name: zod
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name is too long')
    .trim(),
  location: zod
    .string()
    .min(1, 'Location is required')
    .max(20, 'Location is too long')
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
};

const CharacterForm = ({
  data,
  changeImgAlt,
  setIsEditing,
  isEditing
}: CharacterFormProps) => {
  const [character, setCharacter] = useState({ ...data });

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
      name: character.name,
      location: character.location,
      status: character.status
    },
    mode: 'onChange'
  });

  const statusValue = watch('status');

  const handleStatusChange = (value: TStatus) => {
    setValue('status', value);
  };

  const handleAcceptChanges = async (formData: TCharacterEditFormData) => {
    const isValid = await trigger();

    if (isValid) {
      const fullCharacterData = {
        ...character,
        ...formData
      };

      setCharacter((prev) => {
        return { ...prev, ...fullCharacterData };
      });
      changeImgAlt(fullCharacterData.name);
      setIsEditing(false);
    }
  };

  const handleDiscardChanges = () => {
    reset({
      name: character.name,
      location: character.location,
      status: character.status
    });
    setIsEditing(false);
  };

  return (
    <>
      <form
        id={`character-form-${character.id}`}
        className={styles.characterForm}
        onSubmit={handleSubmit(handleAcceptChanges)}
      >
        <div className={styles.characterForm__nameContainer}>
          {isEditing ? (
            <FormTextInput
              control={control}
              name='name'
              value={character.name}
              variant='underlined'
              placeholder='Enter name'
            />
          ) : (
            <Link
              className={styles.characterForm__name}
              to={`/character/${character.id}`}
            >
              {character.name}
            </Link>
          )}
          {errors.name && (
            <span className={styles.characterForm__nameError}>
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className={styles.characterForm__field}>
          <span className={styles.characterForm__fieldTitle}>Gender</span>
          <span className={styles.characterForm__fieldValue}>
            {character.gender}
          </span>
        </div>
        <div className={styles.characterForm__field}>
          <span className={styles.characterForm__fieldTitle}>Species</span>
          <span className={styles.characterForm__fieldValue}>
            {character.species}
          </span>
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
              value={character.name}
              variant='underlined'
              placeholder='Enter location'
            />
          ) : (
            <span className={styles.characterForm__fieldValue}>
              {character.location}
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
              {character.status}
              <Indicator status={character.status} />
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
    </>
  );
};

export default CharacterForm;
