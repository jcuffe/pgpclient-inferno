import { render } from 'inferno';
import { BrowserRouter, Route } from 'inferno-router';
import App from './components/app';

const root = (
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
);

render(root, document.getElementById('root'));
