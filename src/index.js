import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// as Router diyerek bu bileşeni daha sonra kullanmak istediğimde Router ismiyle çağıracağımı belirtiyorum.
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
  <App />
</Router>
);