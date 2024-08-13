
import { useEffect, useRef } from 'react';
import styles from '@/components/common/header/components/deskToggle/styles.module.scss';
import useWikiNavigation from '@/hooks/useCode/useCode';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

type MenuProps = {
  handleMenuClose: () => void;
};

const DeskMenu = ({ handleMenuClose }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const { handleNavigationWiki } = useWikiNavigation();
  const router = useRouter();

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleMenuClose]);

  return (
    <div className={styles['container']} ref={menuRef}>
      <button
        className={styles['menu-list']}
        onClick={() => {
          router.push('/mypage');
          handleMenuClose();
        }}
      >
        계정 설정
      </button>
      <button
        className={styles['menu-list']}
        onClick={() => {
          handleNavigationWiki();
          handleMenuClose();
        }}
      >
        내 위키
      </button>
      <button className={styles['menu-list']} onClick={handleLogoutClick}>
        로그아웃
      </button>
    </div>
  );
};

export default DeskMenu;
