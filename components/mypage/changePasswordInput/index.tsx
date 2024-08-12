import Button from '@/components/common/button';
import Input from '@/components/common/input';
import styles from '@/components/mypage/changePasswordInput/styles.module.scss';
import { ChangePasswordRequest } from '@/types/user';
import { useState, ChangeEvent, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce/useDebounce';
import { SignupInputId, getErrorMessage } from '@/types/authUtils';

interface FormState {
  currentPassword: string;
  newPassword: string;
  verifyNewPassword: string;
}

interface ErrorState {
  currentPassword?: string;
  newPassword?: string;
  verifyNewPassword?: string;
}

interface ChangePasswordInputProps {
  onChangePassword: (requestData: ChangePasswordRequest) => void;
}

const ChangePasswordInput = ({
  onChangePassword,
}: ChangePasswordInputProps) => {
  const [formState, setFormState] = useState<FormState>({
    currentPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const debouncedNewPassword = useDebounce(formState.newPassword, 500);
  const debouncedverifyNewPassword = useDebounce(
    formState.verifyNewPassword,
    500,
  );

  useEffect(() => {
    // 새 비밀번호 필드의 유효성 검사
    if (debouncedNewPassword) {
      const newPasswordError = getErrorMessage(
        'password',
        debouncedNewPassword,
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: newPasswordError,
      }));
    }

    // 새 비밀번호 확인 필드의 유효성 검사
    if (debouncedverifyNewPassword) {
      const verifyNewPasswordError = getErrorMessage(
        'passwordConfirmation',
        debouncedverifyNewPassword,
        debouncedNewPassword,
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        verifyNewPassword: verifyNewPasswordError,
      }));
    }
  }, [debouncedNewPassword, debouncedverifyNewPassword]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requestData: ChangePasswordRequest = {
      currentPassword: formState.currentPassword,
      password: formState.newPassword,
      passwordConfirmation: formState.verifyNewPassword,
    };

    onChangePassword(requestData);
  };

  return (
    <form className={styles['container']} onSubmit={handleSubmit}>
      <label htmlFor="password" className={styles['label']}>
        비밀번호 변경
      </label>
      <Input
        id="currentPassword"
        name="currentPassword"
        placeholder="기존 비밀번호"
        value={formState.currentPassword}
        onChange={handleChange}
        type="password"
        fullWidth
        errorMessage={errors.currentPassword}
      />
      <Input
        id="newPassword"
        name="newPassword"
        value={formState.newPassword}
        placeholder="새 비밀번호"
        onChange={handleChange}
        type="password"
        fullWidth
        errorMessage={errors.newPassword}
      />
      <Input
        id="verifyNewPassword"
        name="verifyNewPassword"
        value={formState.verifyNewPassword}
        placeholder="새 비밀번호 확인"
        onChange={handleChange}
        type="password"
        fullWidth
        errorMessage={errors.verifyNewPassword}
      />
      <Button color="primary" size="small" alignEnd defaultPadding>
        변경하기
      </Button>
    </form>
  );
};

export default ChangePasswordInput;
