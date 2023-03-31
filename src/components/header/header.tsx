import React, { useState, useEffect } from 'react';
import './header.less';
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { formatAddress } from '@/utils';
import { changeRole } from '@/store/role';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { InjectedConnector } from '@wagmi/core';

const Header = () => {
  const { address = '', isConnected } = useAccount();
  const role = useSelector((state: RootState) => state.role.value);
  const location = useLocation();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    chainId: 2206132,
    throwForSwitchChainNotSupported: true,
    onError(error) {
      console.log(error, '##error');
    },
  });

  useEffect(() => {
    if (isConnected && chain?.network !== 'PlatON') {
      switchNetwork?.(2206132);
    }
  }, [isConnected]);

  const handleClickConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const isActive = (path = '') => {
    const pathname = location?.pathname;
    if (pathname === path) {
      return { color: '#fff' };
    } else {
      return {};
    }
  };

  const handleChangeRole = (e: any) => {
    dispatch(changeRole(e.target.value));
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="text" style={isActive('/')}>
              SPREAD
          </Button>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isConnected ? (
          <div style={{ margin: '0 20px' }}>
            <Link to="/publish" style={{ textDecoration: 'none' }}>
              <Button variant="text" style={isActive('/publish')}>
                Publish
              </Button>
            </Link>
            <Link to="/receive" style={{ textDecoration: 'none' }}>
              <Button variant="text" style={isActive('/receive')}>
                Receive
              </Button>
            </Link>
          </div>
          ) : null}
          <Button variant="outlined" size="large" onClick={handleClickConnect} style={{ color: '#fff',padding: '12px 50px' }}>
            {isConnected ? formatAddress(address) : 'Connect'}
          </Button>
        </Box>
      </div>
    </header>
  );
};

export default Header;
