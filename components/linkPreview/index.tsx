import clsx from 'clsx';
import styles from '@/components/linkPreview/styles.module.scss';
import Image from 'next/image';
import link from '@/assets/icons/ic_link.svg';
import Link from 'next/link';

interface LinkPreviewProps {
  url: string;
  iconSize?: 'small' | 'large';
  height?: '26px' | '30px';
  className?: string;
}

const LinkPreview = ({
  url,
  iconSize = 'large',
  height = '30px',
  className,
}: LinkPreviewProps) => {
  const iconDimensions = iconSize === 'small' ? 16 : 20;
  const heightSize =
    height === '26px' ? styles['height-small'] : styles['height-large'];

  return (
    <div className={clsx(styles['container'], heightSize, className)}>
      <div className={styles['icon']}>
        <Image
          src={link}
          alt="링크"
          width={iconDimensions}
          height={iconDimensions}
        />
      </div>
      <Link
        className={styles['url-wrapper']}
        href={url}
        passHref
        target="_blank"
      >
        <span className={styles['url']}>{url}</span>
      </Link>
    </div>
  );
};

export default LinkPreview;
