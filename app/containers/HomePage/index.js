/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import NavBar from 'components/NavBar';
import FormTerminacionLaboral from '../FormTerminacionLaboral';

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <FormTerminacionLaboral />
    </div>
  );
}
