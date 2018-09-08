import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import Modernizr from 'modernizr';
/* eslint-enable import/no-extraneous-dependencies */

import './assets/animations.css';

const styles = {
  perspective: {
    height: '100%',
    perspective: '1200px',
    position: 'relative',
    width: '100%'
  }
};

const animations = {
  max: 67
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
    if (this.animcursor > animations.max - 1) {
      this.animcursor = 0;
    } else if (this.animcursor < 0) {
      this.animcursor = animations.max;
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

    opts.animation = options.animation;

    if (typeof options === 'number') {
      opts.page = options;
    } else if (typeof options === 'string') {
      opts.page = parseInt(options.split('-')[2], 10);
    } else if (typeof options === 'object' && typeof options.page === 'string') {
      opts.page = parseInt(options.page.split('-')[2], 10);
    } else {
      opts = options;
    }

    if (this.state.isAnimating || opts.page === this.state.currentPage) {
      return `${this.props.idPrefix}-${this.state.currentPage}`;
    }

    if (opts.animation) {
      this.animcursor = opts.animation;
    } else if (this.props.defaultNextPageAnimation) {
      this.animcursor = this.props.defaultNextPageAnimation;
    } else {
      this.animcursorCheck();
    }

    const nextPage = opts.page || (((this.state.currentPage + 1)
        < this.props.children.length) ? (this.state.currentPage + 1) : 0);

    this.setState({
      isAnimating: true,
      currentPage: nextPage,
      prevPage: this.state.currentPage
    });

    return `${this.props.idPrefix}-${nextPage}`;
  }

  /**
   * Fires a transition to the previous page.
   *
   * @return {string}      Id of the previous page.
   */
  backPage = (animation) => {
    if (this.state.isAnimating) {
      return `${this.props.idPrefix}-${this.state.currentPage}`;
    }

    this.animcursor = animation || this.props.defaultBackPageAnimation || 0;

    const nextPage = (this.state.currentPage - 1 >= 0)
      ? (this.state.currentPage - 1) : this.props.children.length - 1;

    this.setState({
      isAnimating: true,
      currentPage: nextPage,
      prevPage: this.state.currentPage
    });

    return `${this.props.idPrefix}-${nextPage}`;
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
            className: this.props.idPrefix,
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
