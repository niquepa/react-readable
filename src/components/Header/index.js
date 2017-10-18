import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from 'react-mdc-web/lib';

class Header extends Component {
  render() {
    const { categories } = this.props;

    return (
      <Toolbar fixed>
        <ToolbarRow>
          <ToolbarSection align="start">
            <ToolbarTitle>Readable - a react project</ToolbarTitle>
          </ToolbarSection>
          { categories && categories.map(category => (
            <ToolbarSection key={category.path} align="end">
              <ToolbarTitle>{category.name}</ToolbarTitle>
            </ToolbarSection>
            ))}
        </ToolbarRow>
      </Toolbar>
    );
  }
}

const mapStateToProps = ({ global }) => ({
  categories: global.categories,
});

export default connect(mapStateToProps)(Header);
