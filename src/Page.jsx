import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

/* eslint-disable import/no-extraneous-dependencies */
import Modernizr from 'modernizr';
/* eslint-enable import/no-extraneous-dependencies */

import animations from './assets/animations';

const styles = {
  page: {
    backfaceVisibility: 'hidden',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transform: 'translate3d(0,0,0)',
    transformStyle: 'preserve-3d',
    visibility: 'hidden',
    width: '100%'
  },
  currentPage: {
    visibility: 'visible',
    zIndex: 1
  }
};

const animEndEventNames = {
  WebkitAnimation: 'webkitAnimationEnd',
  OAnimation: 'oAnimationEnd',
  msAnimation: 'MSAnimationEnd',
  animation: 'animationend'
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.isCurrentPage = props.isCurrentPage;
    this.isPrevPage = props.isPrevPage;

    this.loadedPageTriggers = undefined;
    this.leavedPageTriggers = undefined;
    this.setTimeouts = [];

    this.addSetTimeout = this.addSetTimeout.bind(this);
    this.clearSetTimeouts = this.clearSetTimeouts.bind(this);
  }

  /**
   * Allows to add a function into the array of settimeout functions
   * that will be executed for instance of page.
   *
   * @param {Function} callback The function that will be executed
   * @param {int}   milliseconds The number of milliseconds to wait before executing the code.
   */
  addSetTimeout(callback, milliseconds) {
    this.setTimeouts.push(setTimeout(callback, milliseconds));
  }

  /**
   * Clear all settimeout functions for the instance page
   */
  clearSetTimeouts() {
    for (let i = this.setTimeouts.length - 1; i >= 0; i -= 1) {
      clearTimeout(this.setTimeouts[i]);
      this.setTimeouts.pop();
    }
  }

  /**
   * componentDidMount method
   *
   * Fired el onAnimatedEnd event and executes the loadedPageTrigger or leavedPageTriggers functions
   * according to the case.
   */
  componentDidMount() {
    const tthis = this;

    this.refs.page.addEventListener(animEndEventNames[Modernizr.prefixed('animation')], () => {
      tthis.props.onAnimationEnd(tthis.isCurrentPage, tthis.isPrevPage);

      if (tthis.isCurrentPage) {
        if (tthis.loadedPageTriggers) {
          tthis.loadedPageTriggers.forEach((trigger) => {
            trigger.f(tthis);
          });
        } else if (tthis.props.loadedPageTriggers) {
          tthis.loadedPageTriggers = [];

          tthis.props.loadedPageTriggers.forEach((trigger) => {
            trigger.f(tthis);

            if (trigger.r) {
              tthis.loadedPageTriggers.push(trigger);
            }
          });
        }
      }

      if (tthis.isPrevPage) {
        if (tthis.leavedPageTriggers) {
          tthis.leavedPageTriggers.forEach((trigger) => {
            trigger.f(tthis);
          });
        } else if (tthis.props.leavedPageTriggers) {
          tthis.leavedPageTriggers = [];

          tthis.props.leavedPageTriggers.forEach((trigger) => {
            trigger.f(tthis);

            if (trigger.r) {
              tthis.leavedPageTriggers.push(trigger);
            }
          });
        }
      }
    });
  }

  /**
   * componentWillReceiveProps method
   */
  componentWillReceiveProps(nextProps) {
    this.isCurrentPage = nextProps.isCurrentPage;
    this.isPrevPage = nextProps.isPrevPage;
  }

  /**
   * Render method
   */
  render() {
    let style = Object.assign({}, styles.page, this.props.style || {});
    let className = classNames('ptr-page', this.props.className);

    if (this.props.isCurrentPage || this.props.isPrevPage) {
      style = Object.assign(style, styles.currentPage);

      if (this.props.isAnimating && this.props.isCurrentPage) {
        className = classNames(className, animations.classes[this.props.animcursor].inClass);
      }

      if (this.props.isAnimating && this.props.isPrevPage) {
        className = classNames(className, animations.classes[this.props.animcursor].outClass);
      }
    }

    return (
      <div ref="page" className={className} style={style}>
        { this.props.children }
      </div>
    );
  }
}

Page.propTypes = {
  loadedPageTriggers: PropTypes.array,
  leavedPageTriggers: PropTypes.array
};

export default Page;
