import React, { Component } from 'react';
import { compose, map, objOf, prop } from 'ramda';
import { Paragraph, Heading } from './components/Typography';
import { getJSON } from './http';
import { RemoteData } from './types';
import { pantones } from './color';

// API_ROOT :: string
const API_ROOT = 'http://reqres.in/api';

// loadColors :: () -> Task [Color]
const loadColors = getJSON(`${API_ROOT}/colors?delay=1`)
  .map(prop('data'));

// Message :: { children: string } -> ReactElement
const Message = ({ children }) => (
  <div className="flex flex-auto flex-column items-center justify-center">
    <Heading level={5} center>{children}</Heading>
  </div>
);

// EmptyState :: () -> ReactElement
const EmptyState = () => (
  <Message>Gotta ask for some colors first bud</Message>
);

// Loading :: () -> ReactElement
const Loading = () => (
  <Message>Loading from server</Message>
);

// Error :: { message: string } -> ReactElement
const Error = ({ message }) => <Message>{ message }</Message>;

// List :: { children: any } -> ReactElement
const List = ({ children }) => (
  <ul className="list flex flex-wrap pa2 ma0">{children}</ul>
)

const Chip = ({ color }) =>
  <div className="h4" style={{backgroundColor: color}}></div>

const RowBetween = ({ children }) =>
  <div className="flex flex-row justify-between items-center pt3 ph3">
    { children }
  </div>

// Color :: colorT -> ReactElement
const Color = color => (
  <li className="w-100 w-auto-ns flex-auto ma2 br2 overflow-hidden bg-white">
    <Chip color={pantones[color.name.replace(' ', '-')]} />
    <RowBetween>
      <Heading level={3}>{ color.name }</Heading>
      <Paragraph>{ color.year }</Paragraph>
    </RowBetween>
  </li>
)

// childrenify :: a -> { children: a }
const childrenify = objOf('children');

// FIXME: I'm not sure if this type is right
// mapC :: Functor f => (a -> b) -> f a -> { children:  f b }
const mapC = fn => compose(
  childrenify,
  map(fn),
);

// renderItems :: [Color] -> ReactElement
const renderItems = compose(List, mapC(i => <Color key={i.id} {...i} />));

// Button :: { onClick: f, children: string } -> ReactElement
const Button = ({ onClick, children }) =>
  <a className="f6 sans-serif link dim br-pill ba ph3 pv2 mb2 mr2 dib black grow" href="#" onClick={onClick}>{children}</a>

// Button :: { children: any } -> ReactElement
const Header = ({ children }) =>
  <header className="bg-white pb2 pb3-m pb4-l ph4 pt4">
    <Heading subheadline>Pantone of the&nbsp;Year</Heading>
    { children }
  </header>


class App extends Component {
  constructor() {
    super();
    this.state = {
      items: RemoteData.NotAsked,
    };
  }

  loadItems = () => {
    this.setState({ items: RemoteData.Loading });

    loadColors.fork(e => {
      this.setState({ items: RemoteData.Failure(e.message) });
    }, items => {
      this.setState({ items: RemoteData.Success(items) });
    });
  }

  resetState = () => {
    this.setState({ items: RemoteData.NotAsked });
  }

  makeError = () => {
    this.setState({ items: RemoteData.Failure('Something went wrong :(') });
  }

  render() {
    return (
      <div className="flex flex-column h-100">
        <Header>
          <Button onClick={this.loadItems}>Load Items</Button>
          <Button onClick={this.resetState}>Reset</Button>
          <Button onClick={this.makeError}>Make an error</Button>
        </Header>
        { this.state.items.cata({
            NotAsked: () => <EmptyState />,
            Loading: () => <Loading />,
            Failure: e => <Error message={e} />,
            Success: renderItems,
        }) }
      </div>
    );
  }
}

export default App;
