import styles from '@/components/header/components/userProfile/styles.module.scss';
import Image from 'next/image';
import alarm from '@/assets/icons/ic_alarm_32.svg';
import profile from '@/assets/icons/ic_profile.svg';
import menu from '@/assets/icons/ic_menu.svg';
import { useEffect, useState } from 'react';
import EditNotification from '@/components/modal/components/editNotification';

type UserProfileProps = {
  mobileMenu: () => void;
  deskMenu: () => void;
};

const UserProfile = ({ mobileMenu, deskMenu }: UserProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'small' | 'large'>('small');

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setModalSize('large');
    } else {
      setModalSize('small');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles['container']}>
      <button className={styles['alarm']} onClick={toggleModal}>
        <Image src={alarm} alt="알림" width={32} height={32} />
      </button>
      <button className={styles['profile']} onClick={deskMenu}>
        <Image src={profile} alt="프로필" width={32} height={32} />
      </button>
      <button className={styles['menu']} onClick={mobileMenu}>
        <Image src={menu} alt="메뉴" width={24} height={24} />
      </button>
      {isModalOpen && (
        <EditNotification size={modalSize} onClose={toggleModal} />
      )}
    </div>
  );
};

export default UserProfile;
