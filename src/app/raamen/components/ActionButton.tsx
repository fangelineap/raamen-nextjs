'use client'

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';

const ITEM_HEIGHT = 48;

interface ActionButtonProps {
  icon: React.ReactNode;
  options: {
      name: string;
      icon: React.ReactNode;
      handleClick: () => void;
  }[];
}

const ActionButton = ({ icon, options }: ActionButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (handleClick: () => void) => {
    handleClose();
    handleClick();
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} defaultValue={'Edit'} onClick={() => handleAction(option.handleClick)}>
            <ListItemIcon>
                {option.icon}
            </ListItemIcon>
            <ListItemText>
            {option.name}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default ActionButton;