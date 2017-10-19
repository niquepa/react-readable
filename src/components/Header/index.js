import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Drawer, DrawerHeader, DrawerHeaderContent, DrawerContent, Navigation, Icon, Tabbar, Tab } from 'react-mdc-web/lib';
import MenuIcon from 'mdi-react/MenuIcon';
import FilterIcon from 'mdi-react/FilterIcon';

class Header extends Component {
  state = {
    isOpen: false,
    activeCat: null
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle>
                <MenuIcon onClick={() => { this.setState({ isOpen: !this.state.isOpen }); }} />
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection align="start">
              <ToolbarTitle>Readable - a react project</ToolbarTitle>
            </ToolbarSection>
            <Tabbar>
            { categories && categories.map(category => (
                <Tab
                  active={this.state.activeCat===category.path}
                  onClick={() => {this.setState({activeCat:category.path})}}
                >
                  {category.name}
                </Tab>
              ))}
              <span className="mdc-tab-bar__indicator"></span>
            </Tabbar>
          </ToolbarRow>
        </Toolbar>
        <Drawer
          open={this.state.isOpen}
          onClose={() => { this.setState({ isOpen: false }); }}
        >
          <DrawerHeader>
            <DrawerHeaderContent>
              Categories
            </DrawerHeaderContent>
          </DrawerHeader>
          <DrawerContent>
            <Navigation>
              { categories && categories.map(category => (
                <a key={category.path} href="#" selected><Icon />{category.name.toUpperCase()}</a>
                ))}
            </Navigation>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
});

export default connect(mapStateToProps)(Header);
