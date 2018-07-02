/* eslint-disable redux-saga/no-unhandled-errors, redux-saga/yield-effects */

import { takeLatest } from 'redux-saga/effects'; // eslint-disable-line

import { fetchEntity } from '../utils/misc';
import * as ActionTypes from '../constants/ActionTypes';
import ConfigFileAPIService from '../utils/api/ConfigFileAPIService';
import HDDAPIService from '../utils/api/HDDAPIService';
import MiscAPIService from '../utils/api/MiscAPIService';
import NetworkAPIService from '../utils/api/NetworkAPIService';
import StatusAPIService from '../utils/api/StatusAPIService';
import TimeAPIService from '../utils/api/TimeAPIService';

export const configFileSagas = [
    takeLatest(
        ActionTypes.checkConfigFile.TRIGGER,
        fetchEntity,
        ActionTypes.checkConfigFile,
        ConfigFileAPIService.checkConfigFile
    ),
    takeLatest(
        ActionTypes.configWhitelist.TRIGGER,
        fetchEntity,
        ActionTypes.configWhitelist,
        ConfigFileAPIService.configWhitelist
    ),
    takeLatest(
        ActionTypes.configFile.TRIGGER,
        fetchEntity,
        ActionTypes.configFile,
        ConfigFileAPIService.configFile
    ),
    takeLatest(
        ActionTypes.updateConfigFile.TRIGGER,
        fetchEntity,
        ActionTypes.updateConfigFile,
        ConfigFileAPIService.updateConfigFile
    )
];

export const hddSagas = [
    takeLatest(
        ActionTypes.checkHDD.TRIGGER,
        fetchEntity,
        ActionTypes.checkHDD,
        HDDAPIService.checkHDD
    ),
    takeLatest(
        ActionTypes.enableHDD.TRIGGER,
        fetchEntity,
        ActionTypes.enableHDD,
        HDDAPIService.enableHDD
    ),
    takeLatest(
        ActionTypes.formatHDD.TRIGGER,
        fetchEntity,
        ActionTypes.formatHDD,
        HDDAPIService.formatHDD
    )
];

export const miscSagas = [
    takeLatest(
        ActionTypes.getHostname.TRIGGER,
        fetchEntity,
        ActionTypes.getHostname,
        MiscAPIService.getHostname
    )
];

export const networkSagas = [
    takeLatest(
        ActionTypes.checkVPN.TRIGGER,
        fetchEntity,
        ActionTypes.checkVPN,
        NetworkAPIService.checkVPN
    ),
    takeLatest(
        ActionTypes.restartVPN.TRIGGER,
        fetchEntity,
        ActionTypes.restartVPN,
        NetworkAPIService.restartVPN
    ),
    takeLatest(
        ActionTypes.checkInternet.TRIGGER,
        fetchEntity,
        ActionTypes.checkInternet,
        NetworkAPIService.checkInternet
    ),
    takeLatest(
        ActionTypes.restartModem.TRIGGER,
        fetchEntity,
        ActionTypes.restartModem,
        NetworkAPIService.restartModem
    )
];

export const statusSagas = [
    takeLatest(
        ActionTypes.latestLog.TRIGGER,
        fetchEntity,
        ActionTypes.latestLog,
        StatusAPIService.latestLog
    ),
    takeLatest(
        ActionTypes.secondLatestLog.TRIGGER,
        fetchEntity,
        ActionTypes.secondLatestLog,
        StatusAPIService.secondLatestLog
    )
];

export const timeSagas = [
    takeLatest(
        ActionTypes.outputTime.TRIGGER,
        fetchEntity,
        ActionTypes.outputTime,
        TimeAPIService.outputTime
    ),
    takeLatest(
        ActionTypes.getTimezone.TRIGGER,
        fetchEntity,
        ActionTypes.getTimezone,
        TimeAPIService.getTimezone
    ),
    takeLatest(
        ActionTypes.changeTimezone.TRIGGER,
        fetchEntity,
        ActionTypes.changeTimezone,
        TimeAPIService.changeTimezone
    )
];
