import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Tabbar, Tab, Snackbar } from 'react-mdc-web/lib';
import { removeSnack } from '../../actions/index';

class Header extends PureComponent {
  render() {
    const { categories, snack } = this.props;
    const openSnack = !!(snack && snack.length > 0);

    return (
      <div>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle><Link to="/" className="header-link">Readable</Link></ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection align="end">
              <Tabbar>
                { categories && categories.map(category => (
                  <Route
                    key={category.path}
                    path={`/${category.path}`}
  // eslint-disable-next-line react/no-children-prop
                    children={({ match }) => (
                      <Tab active={!!match} key={category.path} component="span">
                        <Link to={`/${category.path}`} className="header-link">{category.name}</Link>
                      </Tab>
                  )}
                  />
                ))}
                <span className="mdc-tab-bar__indicator" />
              </Tabbar>
            </ToolbarSection>
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
  removeSnack: () => dispatch(removeSnack()),
});

Header.propTypes = {
  categories: PropTypes.array,
  snack: PropTypes.string,
  removeSnack: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
