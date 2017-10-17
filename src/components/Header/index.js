import React, { Component } from 'react';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from 'react-mdc-web/lib';

class Header extends Component {
  render() {
    return (
      <Toolbar fixed>
        <ToolbarRow>
          <ToolbarSection align="start">
            <ToolbarTitle>Title</ToolbarTitle>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    );
  }
}

export default Header;
