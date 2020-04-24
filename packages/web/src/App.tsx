import React from 'react';

import GlobalStyle from './styles/global';
import SigIn from './pages/Signin';
// import SignUp from './pages/Signup';

const App: React.FC = () => (
  <>
    <SigIn />
    <GlobalStyle />
  </>
);

export default App;
