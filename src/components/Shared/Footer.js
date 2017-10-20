import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from 'react-mdc-web/lib';
import MenuIcon from 'mdi-react/MenuIcon';

class Footer extends Component {
  
  render() {
    
    return (
      <div>
        <Toolbar className='footer'>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle>Made by niquepa</ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    );
  }
}

export default Footer;