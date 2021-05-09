import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Logout } from './logout_icon.svg';
import ResizableIconButton from '../buttons/ResizableIconButton/ResizableIconButton';

export default function LogoutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <ResizableIconButton
        size="large"
        onClick={() => {
          logout();
        }}
      >
        <SvgIcon>
          <Logout />
        </SvgIcon>
      </ResizableIconButton>
    )
  );
}
