import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home, Orcamento, Manipulado, Arquivo } from '../../components';

const MainContent = () => (
    <div>
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/orcamento" exact component={Orcamento} />
            <Route path="/manipulado" exact component={Manipulado} />
            <Route path="/arquivo" exact component={Arquivo} />
        </Router>
    </div>
);

export default MainContent;
