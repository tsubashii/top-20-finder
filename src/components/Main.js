import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movie from './Movie';
import Tvshow from './Tvshow';
import People from './People';
import Home from './Home';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/movie' component={Movie}/>
            <Route path='/tvshow' component={Tvshow}/>
            <Route path='/people' component={People}/>
        </Switch>
    </main>
)

export default Main;