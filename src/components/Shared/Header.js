import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Tabbar, Tab } from 'react-mdc-web/lib';

class Header extends Component {
  state = {
    // activeCat: null,
  }

  render() {
    const { categories } = this.props;

    return (
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
                    <Link to={category.path} className="header-link">{category.name}</Link>
                  </Tab>
              )}
              />
            ))}
            <span className="mdc-tab-bar__indicator" />
          </Tabbar>
        </ToolbarRow>
      </Toolbar>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
});

export default withRouter(connect(mapStateToProps)(Header));
