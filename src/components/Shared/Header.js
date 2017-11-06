import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Tabbar, Tab, Snackbar } from 'react-mdc-web/lib';
import { removeSnack } from '../../actions/index';

class Header extends Component {
  render() {
    const { categories, snack } = this.props;
    const openSnack = !!(snack && snack.length > 0);

    return (
      <div>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle><Link to="/" className="header-link">Readable - a react project</Link></ToolbarTitle>
            </ToolbarSection>
            <Tabbar align="start">
              { categories && categories.map(category => (
                <Route
                  key={category.path}
                  path={`/${category.path}`}
                  children={({ match }) => (
                    <Tab active={!!match} key={category.path} component="span">
                      <Link to={`/${category.path}`} className="header-link">{category.name}</Link>
                    </Tab>
                )}
                />
              ))}
              <span className="mdc-tab-bar__indicator" />
            </Tabbar>
          </ToolbarRow>
        </Toolbar>
        <Snackbar
          onTimeout={() => { this.props.removeSnack(); }}
          open={openSnack}
        >
          {snack}
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
  snack: global.snack,
});

const mapDispatchToProps = dispatch => ({
  removeSnack: (postId, body) => dispatch(removeSnack()),
});

Header.propTypes = {
  categories: PropTypes.array,
  snack: PropTypes.string,
  removeSnack: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
