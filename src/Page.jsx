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

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.page = React.createRef();

    // Repeaters
    this.loadedPageTriggers = undefined;
    this.leavedPageTriggers = undefined;
    this.setTimeouts = [];
  }

  /**
   * Allows to add a function into the array of settimeout functions
   * that will be executed for instance of page.
   *
   * @param {Function} callback The function that will be executed
   * @param {int}   milliseconds The number of milliseconds to wait before executing the code.
   */
  addSetTimeout = (callback, milliseconds) => {
    this.setTimeouts.push(setTimeout(callback, milliseconds));
  }

  /**
   * Clear all settimeout functions for the instance page
   */
  clearSetTimeouts = () => {
    for (let i = this.setTimeouts.length - 1; i >= 0; i -= 1) {
      clearTimeout(this.setTimeouts[i]);
      this.setTimeouts.pop();
    }
  }

  /**
   * componentDidMount method
   *
   * Executes the loadedPageTriggers functions when the component is mounted.
   */
  componentDidMount() {
    this.page.current.addEventListener(animEndEventNames[Modernizr.prefixed('animation')], (event) => {
      if (event.target !== this.page.current) return;

      if (this.props.isCurrentPage) {
        if (this.loadedPageTriggers) {
          this.loadedPageTriggers.forEach((trigger) => {
            trigger.f(this, this.page.current);
          });
        } else if (this.props.loadedPageTriggers) {
          this.loadedPageTriggers = [];

          this.props.loadedPageTriggers.forEach((trigger) => {
            trigger.f(this, this.page.current);

            if (trigger.r) {
              this.loadedPageTriggers.push(trigger);
            }
          });
        }
      }

      this.props.onAnimationEnd(this.props.isCurrentPage, this.props.isPrevPage);
    });
  }

  /**
   * componentWillUnmount method
   *
   * Executes the leavedPageTriggers functions when the component is unmounted
   * and clear the registred setTimeouts.
   */
  componentWillUnmount() {
    if (this.leavedPageTriggers) {
      this.leavedPageTriggers.forEach((trigger) => {
        trigger.f(this, this.page.current);
      });
    } else if (this.props.leavedPageTriggers) {
      this.leavedPageTriggers = [];

      this.props.leavedPageTriggers.forEach((trigger) => {
        trigger.f(this, this.page.current);

        if (trigger.r) {
          this.leavedPageTriggers.push(trigger);
        }
      });
    }

    this.clearSetTimeouts();
  }

  /**
   * Render method.
   */
  render() {
    let style = Object.assign({}, styles.page, this.props.style || {});
    let className = classNames(this.props.className);

    if (this.props.isCurrentPage || this.props.isPrevPage) {
      style = Object.assign(style, styles.currentPage);

      if (this.props.isCurrentPage) {
        className = classNames(className, animations.classes[this.props.animcursor].inClass);
      }

      if (this.props.isPrevPage) {
        className = classNames(className, animations.classes[this.props.animcursor].outClass);
      }
    }

    return (
      <div id={this.props.id} ref={this.page} className={className} style={style}>
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
