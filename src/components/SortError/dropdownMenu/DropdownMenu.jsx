import { Dropdown, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from 'react';
import './DropdownMenu.css';
import PropTypes from 'prop-types';

const DropdownMenu = ({ isDisabled }) => {
    const [selected, setSelected] = useState(null);

    const handleMenuClick = (e) => {
        const option = options.find((opt) => opt.key === e.key);
        setSelected(option.label);
    };

    const options = [
        {
            label: "Option 1",
            key: "1",
            icon: <UserOutlined />,
            disabled: isDisabled,
        },
        {
            label: "Option 2",
            key: "2",
            icon: <UserOutlined />,
            disabled: isDisabled,
        },

    ];

    const menuProps = {
        items: options,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown menu={menuProps} className="dropdownMenu" disabled={isDisabled}>
            <Button className="dropdownButton">
                <span
                    className={selected ? "dropdownLabel" : "dropdownPlaceholder"}
                >
                    {selected || "Выбор документа"}
                </span>
                <DownOutlined />
            </Button>
        </Dropdown>
    )
}

DropdownMenu.propTypes = {
    isDisabled: PropTypes.bool.isRequired,
}

export default DropdownMenu;