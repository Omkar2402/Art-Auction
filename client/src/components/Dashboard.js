import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// MUI
import {
  Box,
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
// Style files
import { boxStyle, paperStyle } from './css/adStyles';
import { profileTableStyle, tableCellStyle } from './css/dashStyle';
// Actions
import { clearAlerts } from '../actions/alert';

// Project files
import Spinner from './Spinner';
import DashboardAdList from './DashboardAdList';
import LoadingDisplay from './LoadingDisplay';
// Actions
import { getUserPurchasedAds } from '../actions/ad';
import DashPurchasedList from './DashPurchasedList';

const Dashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuth) {
      props.getUserPurchasedAds();
    }
  }, [props.loading]);

  useEffect(() => {
    return () => {
      props.clearAlerts();
    };
  }, []);

  // Check if the user is logged in, redirect to login if not
  if (!props.isAuth) {
    navigate('/login');
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Box sx={{ ...boxStyle, marginBottom: '20px' }}>
        <Paper sx={{ ...paperStyle, backgroundColor: '#f0f0f0', color: '#333', padding: '20px' }}>
          <Typography variant='h5' style={{ fontFamily: 'YourChosenFont', fontWeight: 'bold', marginBottom: '20px' }}>
            My Profile
          </Typography>
          <Table sx={{ width: '100%', minWidth: '200px', '@media (min-width: 600px)': { width: '60%' } }} aria-label='simple table'>
            <TableBody>
              <TableRow key='Username'>
                <TableCell align='right' sx={{ ...tableCellStyle }}>
                  User name
                </TableCell>
                <TableCell align='left' sx={tableCellStyle}>
                  {props.user.username}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right' sx={{ ...tableCellStyle }}>
                  Email
                </TableCell>
                <TableCell align='left' sx={tableCellStyle}>
                  {props.user.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right' sx={{ ...tableCellStyle }}>
                  Phone
                </TableCell>
                <TableCell align='left' sx={tableCellStyle}>
                  {props.user.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right' sx={{ ...tableCellStyle }}>
                  Address
                </TableCell>
                <TableCell align='left' sx={tableCellStyle}>
                  {props.user.address}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box sx={{ ...boxStyle, marginBottom: '20px' }}>
        <Paper sx={{ ...paperStyle, backgroundColor: '#f0f0f0', color: '#333', padding: '20px' }}>
          <Typography variant='h5' style={{ fontFamily: 'YourChosenFont', fontWeight: 'bold', marginBottom: '20px' }}>
            My Ads
          </Typography>
          <DashboardAdList />
        </Paper>
      </Box>

      <Box sx={{ ...boxStyle, marginBottom: '20px' }}>
        <Paper sx={{ ...paperStyle, backgroundColor: '#f0f0f0', color: '#333', padding: '20px' }}>
          <Typography variant='h5' style={{ fontFamily: 'YourChosenFont', fontWeight: 'bold', marginBottom: '20px' }}>
            My Purchases
          </Typography>
          {props.purchasedLoading ? (
            <LoadingDisplay />
          ) : (
            <DashPurchasedList ads={props.purchased} />
          )}
        </Paper>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds, clearAlerts })(Dashboard);
