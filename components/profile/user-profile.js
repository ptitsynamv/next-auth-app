import ProfileForm from './profile-form';
import { useSession } from 'next-auth/react';
import classes from './user-profile.module.css';

function UserProfile() {
  // const { data: session, status } = useSession();

  // if (status === 'loading') {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (!session) {
  //   window.location.href = '/auth';
  //   return;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
