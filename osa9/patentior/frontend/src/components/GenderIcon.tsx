import { Male, Female, Transgender } from '@mui/icons-material';

const GenderIcon = ({ gender }: { gender: 'male' | 'female' | 'other' }) => {
  let IconComponent;
  switch (gender) {
    case 'male':
      IconComponent = Male;
      break;
    case 'female':
      IconComponent = Female;
      break;
    case 'other':
      IconComponent = Transgender;
      break;
  }
  return <IconComponent />;
};
export default GenderIcon;
