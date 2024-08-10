import React, { useState } from 'react';
import clsx from 'clsx';
import styles from '@/pages/wiki/[code]/components/wikiAside/styles.module.scss';

interface UserAttributeProps {
  attributeName: string;
  value: string;
  name: string;
  isEditable: boolean;
  onChange?: (name: string, value: string) => void;
  className?: string;
}

const UserAttribute = ({
  attributeName,
  value,
  name,
  isEditable = false,
  onChange,
  className,
}: UserAttributeProps) => {
  const [attributeValue, setAttributeValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAttributeValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  return (
    <div className={clsx(styles['user-attribute'], className)}>
      <span className={styles['attribute-name']}>{attributeName}</span>
      {isEditable ? (
        <input
          className={clsx(styles['attribute-value'], {
            [styles['non-editable']]: !isEditable,
          })}
          value={attributeValue}
          onChange={handleChange}
        />
      ) : (
        <span className={styles['attribute-value']}>{value}</span>
      )}
    </div>
  );
};

export default UserAttribute;
