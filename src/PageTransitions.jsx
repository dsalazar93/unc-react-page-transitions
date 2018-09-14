import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import Modernizr from 'modernizr';
/* eslint-enable import/no-extraneous-dependencies */

import classNames from 'classnames';

import './assets/animations.css';

const styles = {
  perspective: {
    height: '100%',
    perspective: '1200px',
    position: 'relative',
    width: '100%'
  }
};

class PageTransitions extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: this.props.currentPage || 0,
      prevPage: undefined,
      isAnimating: false
    };

    // Without state
    this.animcursor = 0;
    this.endCurrPage = false;
    this.endPrevPage = false;
    this.support = Modernizr.cssanimations;
  }

  /**
   * Return the next cursor of the animation
   *
   * @return {int} Cursor of the animation
   * @see ./assets/animations.js
   */
  animcursorCheck = () => {
    if (this.animcursor >= 67) {
      this.animcursor = 0;
    } else if (this.animcursor < 0) {
      this.animcursor = 67;
    }

    this.animcursor += 1;
    return this.animcursor;
  }

  /**
   * Fired function when the page css animation is ended.
   * This function is passed to the <Page/> component.
   *
   * @param  {boolean} endCurrPage Indicates if the current page was the one
   *                               that ended the animation.
   * @param  {boolean} endPrevPage Indicate if the previous page was the one
   *                               that ended the animation.
   */
  onAnimationEnd = (endCurrPage, endPrevPage) => {
    let animEnd = false;

    if (endCurrPage) {
      this.endCurrPage = endCurrPage;

      if (this.endPrevPage) {
        animEnd = true;
      }
    }

    if (endPrevPage) {
      this.endPrevPage = endPrevPage;

      if (this.endCurrPage) {
        animEnd = true;
      }
    }

    if (animEnd) {
      this.endCurrPage = false;
      this.endPrevPage = false;

      this.setState({
        isAnimating: false,
        prevPage: undefined
      });
    }
  }

  /**
   * Fires the transition of pages.
   * @param  {Object} opts This object contains 2 params:
   *                       (animation) => cursor for animation according animations.js file.
   *                       (page) => index of the next page to show
   *
   * @return {string}      Id of the next page.
   */
  nextPage = (options = {}) => {
    let opts = {};

    if (Number(options)) {
      opts.page = Number(options);
    } else if (typeof options === 'object' && Number(options.page)) {
      opts = options;
      opts.page = Number(opts.page);
    } else {
      opts.page = undefined;
    }

    if (this.state.isAnimating || opts.page === this.state.currentPage) {
      return this.state.currentPage;
    }

    this.animcursor = opts.animation
        || this.props.defaultNextPageAnimation
        || this.animcursorCheck();

    let nextPage = opts.page;

    if (opts.page === undefined) {
      if ((this.state.currentPage + 1) < this.props.children.length) {
        nextPage = this.state.currentPage + 1;
      } else {
        nextPage = 0;
      }
    }

    this.setState({
      isAnimating: true,
      currentPage: nextPage,
      prevPage: this.state.currentPage
    });

    return nextPage;
  }

  /**
   * Fires a transition to the previous page.
   *
   * @return {string}      Id of the previous page.
   */
  backPage = (animation) => {
    if (this.state.isAnimating) {
      return this.state.currentPage;
    }

    this.animcursor = animation
        || this.props.defaultBackPageAnimation
        || this.animcursorCheck();

    const nextPage = (this.state.currentPage - 1 >= 0)
      ? (this.state.currentPage - 1) : this.props.children.length - 1;

    this.setState({
      isAnimating: true,
      currentPage: nextPage,
      prevPage: this.state.currentPage
    });

    return nextPage;
  }

  /**
   * Render method.
   */
  render() {
    const children = Array.isArray(this.props.children)
      ? this.props.children : [this.props.children];

    return (
      <div className="pt-perspective" style={styles.perspective}>
        {children.map((child, idx) => (
          React.cloneElement(child, {
            key: `${this.props.idPrefix}-${idx}`,
            id: `${this.props.idPrefix}-${idx}`,
            idx,
            className: classNames(this.props.idPrefix, child.props.className),
            isCurrentPage: (idx === this.state.currentPage),
            isPrevPage: (idx === this.state.prevPage),
            onAnimationEnd: this.onAnimationEnd,
            animcursor: (idx === this.state.currentPage
                || idx === this.state.prevPage) && this.animcursor
          })
        ))}
      </div>
    );
  }
}

PageTransitions.defaultProps = {
  idPrefix: 'pt-page'
};

export default PageTransitions;
