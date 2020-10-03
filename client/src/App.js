import React from 'react';

import { Navigator, Authentication, MainContent, Footer } from './components';

const App = () => (
    <div>
        <Navigator />
        <Authentication />
        <MainContent />
        <Footer />
    </div>
);

export default App;
