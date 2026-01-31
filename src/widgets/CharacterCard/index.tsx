import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CheckIcon, CrossIcon, EditIcon } from '@/assets/icons';
import { FormTextInput, Selector } from '@/shared/components';
import { Indicator } from '@/shared/components';
import { classNames } from '@/shared/helpers';
import { statusOptions } from '@/shared/helpers/mocks';
import type { TCharacter, TStatus } from '@/shared/types';

import styles from './CharacterCard.module.scss';

const OptionStatusComponent = ({ option }: { option: TStatus }) => {
  return (
    <>
      {option}
      <Indicator status={option} />
    </>
  );
};

const characterEditSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name is too long')
    .trim(),
  location: z
    .string()
    .min(1, 'location is required')
    .max(20, 'location is too long')
    .trim(),
  status: z
    .union([z.literal('alive'), z.literal('dead'), z.literal('unknown')])
    .catch('unknown')
});

type CharacterEditFormData = z.infer<typeof characterEditSchema>;

const CharacterCard = ({
  name = 'Not Found',
  status = 'unknown',
  species = '',
  image = '',
  gender = '',
  location = '',
  id = 0
}: TCharacter) => {
  const [character, setCharacter] = useState({
    name,
    status,
    species,
    image,
    gender,
    location
  });
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger
  } = useForm<CharacterEditFormData>({
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

  const handleAcceptChanges = async (formData: CharacterEditFormData) => {
    const isValid = await trigger();

    if (isValid) {
      const fullCharacterData = {
        ...formData,
        id,
        image,
        gender,
        species
      };

      setCharacter((prev) => {
        return { ...prev, ...fullCharacterData };
      });
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
    <div className={styles.characterCard}>
      <div className={styles.characterCard__imgContainer}>
        <img
          className={styles.characterCard__img}
          src={image}
          alt={name}
        />
      </div>
      <form
        className={styles.characterCard__form}
        onSubmit={handleSubmit(handleAcceptChanges)}
      >
        <div className={styles.characterCard__nameContainer}>
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
              className={styles.characterCard__name}
              to={`/character/${id}`}
            >
              {character.name}
            </Link>
          )}
          {errors.name && (
            <span className={styles.characterCard__nameError}>
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className={styles.characterCard__field}>
          <span className={styles.characterCard__fieldTitle}>Gender</span>
          <span className={styles.characterCard__fieldValue}>
            {character.gender}
          </span>
        </div>
        <div className={styles.characterCard__field}>
          <span className={styles.characterCard__fieldTitle}>Species</span>
          <span className={styles.characterCard__fieldValue}>
            {character.species}
          </span>
        </div>
        <div className={styles.characterCard__field}>
          <span
            className={classNames(styles.characterCard__fieldTitle, {
              [styles.characterCard__fieldTitle_error]: Boolean(errors.location)
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
            <span className={styles.characterCard__fieldValue}>
              {character.location}
            </span>
          )}
        </div>
        <div className={styles.characterCard__field}>
          <span className={styles.characterCard__fieldTitle}>Status</span>
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
                styles.characterCard__fieldValue,
                styles.characterCard__status
              )}
            >
              {character.status}
              <Indicator status={character.status} />
            </div>
          )}
        </div>
      </form>

      {!isEditing && (
        <div
          className={styles.characterCard__edit}
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </div>
      )}

      {isEditing && (
        <div className={styles.characterCard__controls}>
          <div className={styles.characterCard__discardChanges}>
            <CrossIcon onClick={handleDiscardChanges} />
          </div>
          <button
            type='submit'
            onClick={handleSubmit(handleAcceptChanges)}
            className={styles.characterCard__acceptChanges}
          >
            <CheckIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
