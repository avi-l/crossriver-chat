import { useMsal, useAccount } from '@azure/msal-react';
import { AuthButton } from '../components/AuthButton';

export const Profile = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  console.log('instance', instance);
  console.log('accounts', accounts);
  if (!account)
    return (
      <>
        <p>Please login.</p>
      </>
    );

  return (
    <div>
      <h2 className='text-xl font-bold'>
        Welcome, {account.name || account.username}
      </h2>
      <p>Email: {account.username}</p>
    </div>
  );
};
