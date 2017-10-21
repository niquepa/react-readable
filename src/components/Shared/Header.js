import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Drawer, DrawerHeader, DrawerHeaderContent, DrawerContent, Navigation, Icon, Tabbar, Tab } from 'react-mdc-web/lib';
import MenuIcon from 'mdi-react/MenuIcon';

class Header extends Component {
  state = {
    activeCat: null,
  }

  render() {
    const { categories } = this.props;

    return (
      <Toolbar fixed>
        <ToolbarRow>
          <ToolbarSection align="start">
            <ToolbarTitle>Readable - a react project</ToolbarTitle>
          </ToolbarSection>
          <Tabbar align="start">
            { categories && categories.map(category => (
              <Tab
                active={this.state.activeCat === category.path}
                onClick={() => { this.setState({ activeCat: category.path }); }}
              >
                {category.name}
              </Tab>
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

export default connect(mapStateToProps)(Header);
