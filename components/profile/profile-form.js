import { useRef } from 'react';
import classes from './profile-form.module.css';
import { useRouter } from 'next/router';

function ProfileForm() {
  const newPasswordInputRef = useRef();
  const oldPasswordInputRef = useRef();
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const oldPassword = oldPasswordInputRef.current.value;

    const result = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ newPassword, oldPassword }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await result.json();
    console.log({ data });

    if (result.ok) {
      router.push('/');
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
