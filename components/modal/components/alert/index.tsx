import Image from 'next/image';
import closeIcon from '@/assets/icons/ic_close.svg';
import styles from '@/components/modal/components/alert/styles.module.scss';
import Button from '@/components/button';
import clsx from 'clsx';
import Modal from '../..';

interface AlertProps {
  title: string;
  description: string;
  content: string;
  size?: 'middle' | 'large';
}

const Alert = ({
  title,
  description,
  content,
  size = 'large',
}: AlertProps): JSX.Element => {
  const buttonColor =
    title === '저장하지 않고 나가시겠어요?' ? 'alert' : 'primary';

  return (
    <Modal size={size}>
      <div className={clsx(styles['contents-wrapper'], styles[size])}>
        <strong className={clsx(styles['title'], styles[size])}>{title}</strong>
        <p className={clsx(styles['description'], styles[size])}>
          {description}
        </p>
      </div>
      <Button color={buttonColor} size="small" defaultPadding alignEnd>
        {content}
      </Button>
    </Modal>
  );
};

export default Alert;
