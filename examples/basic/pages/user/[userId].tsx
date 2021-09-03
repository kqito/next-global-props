import type { NextPage } from 'next';
import { Title } from '../../components/Title';

const UserProfile: NextPage = () => {
  return <Title title="/user/[userId]" />;
};

export default UserProfile;
