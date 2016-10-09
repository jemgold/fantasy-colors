import React from 'react';
import classNames from 'classnames';
import { compose, not, test } from 'ramda';

// isHeading :: string -> bool
const isHeading = test(/^h/);

// isNotHeading :: string -> bool
const isNotHeading = compose(not, isHeading);

const Text = ({
  tag = 'p',
  bold,
  center,
  size,
  subheadline,
  headline,
  children,
}) => {
  const cx = classNames('sans-serif', 'mid-gray', 'mt0', {
    [`f${size}`]: size,
    'f-subheadline-ns': subheadline,
    'f-headline-ns': headline,
    b: bold,
    'lh-title': isHeading(tag) && !headline && !subheadline,
    'lh-copy': isNotHeading(tag),
    'lh-solid': (size === 1),
    'tc': center,
  });
  const Tag = tag;
  return <Tag className={cx}>{ children }</Tag>
}

export const Heading = ({ level = 1, center, subheadline, headline, children }) => {
  const props = {
    tag: `h${level}`,
    size: level,
    bold: true,
    center, subheadline, headline,
  }

  return <Text {...props}>
    { children }
  </Text>
}

export const Paragraph = ({ children }) => (
  <Text>{ children }</Text>
)

