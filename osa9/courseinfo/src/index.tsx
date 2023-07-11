import ReactDOM from 'react-dom/client';
import App from './App';

/*interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Hello, {props.name}</h1>;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Welcome name="Sarah" />
);*/
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
