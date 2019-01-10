import React, { Component } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'

import './Navbar.css'

type NavbarState = {
    activeItem?: NavbarOptions
}

enum NavbarOptions {
    SOUNDSLIKE = 'soundslike',
    LOGIN = 'Log In',
}

class Navbar extends Component<{}, NavbarState> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleItemClick = (e, menuProps: MenuItemProps) =>
        this.setState({ activeItem: menuProps.name! as NavbarOptions })

    render() {
        const { activeItem } = this.state
        return (
            <header className="Navbar">
                <Menu>
                    <Menu.Item
                        header
                        active={false}
                        name={NavbarOptions.SOUNDSLIKE}
                    >
                        {NavbarOptions.SOUNDSLIKE}
                    </Menu.Item>

                    <Menu.Item
                        name={NavbarOptions.LOGIN}
                        active={activeItem === NavbarOptions.LOGIN}
                        onClick={this.handleItemClick}
                    >
                        {NavbarOptions.LOGIN}
                    </Menu.Item>
                </Menu>
            </header>
        )
    }
}

export default Navbar
