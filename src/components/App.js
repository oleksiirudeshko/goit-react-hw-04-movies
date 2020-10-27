import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../components/views/Home";

import Section from "./Section";
import routes from "../routes/routes";
import Navigation from "./Navigation/Navigation";

const AsyncMovies = lazy(() => import("../components/views/Movies"));
const AsyncMovieDetails = lazy(() => import("./MovieDetails/MovieDetails"));

export default function App() {
  return (
    <Section>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.movies} exact component={AsyncMovies} />
          <Route
            path={routes.searchMovieDetails}
            component={AsyncMovieDetails}
          />
          <Route path={routes.homeMovieDetails} component={AsyncMovieDetails} />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </Section>
  );
}
