/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import type {YggioChannelPublish, deviceTypes} from 'yggio-types';
import {v4 as generateUUID} from 'uuid';
import mqtt from 'precompiled-mqtt/dist/mqtt.browser';

import {getConfig} from '../../yggio-config';
import {getYggioToken, getUserId} from '../token';
import {MQTT_EVENTS} from './constants';

const useSockets = () => {
  const queryClient = useQueryClient();
  const token = getYggioToken() as string;
  const userId = getUserId() as string;

  React.useEffect(() => {
    const topic = `yggio/output/v2/${userId}/iotnode/+`;
    const config = getConfig();

    const client = mqtt.connect(
      `mqtts://${config.socketHostname}:${config.socketPort}/ws`,
      {
        keepalive: 5,
        connectTimeout: 30 * 1000,
        clientId: `yggio-ui.${userId}.${generateUUID()}`,
        username: userId,
        password: token,
      }
    );

    /*
      On broker connection, subscribe to all devices for current user
    */
    client.on(MQTT_EVENTS.connect, () => {
      console.info('Connected to Yggio Broker');
      client.subscribe(topic, (err: Error) => {
        if (!err) {
          console.info(`Subscribed to ${topic}`);
        }
      });
    });

    /*
      Update @tanstack/react-query cache with new data on message received
    */
    client.on(MQTT_EVENTS.message, (topic: string, message: number) => {
      const parsedMessage = JSON.parse(message.toString()) as YggioChannelPublish;
      if (!_.has(parsedMessage, 'iotnode._id')) {
        console.error('MQTT error: Missing iotnode id');
        return;
      }

      queryClient.setQueriesData(['device', parsedMessage?.iotnode?._id], (oldData: object) => {
        const newData = {...oldData, ...parsedMessage?.diff};
        return newData;
      });

      queryClient.setQueriesData(['devices'], (oldData: object) => {
        if (_.isArray(oldData) && !_.isEmpty(oldData)) {
          return _.map(oldData, (data: deviceTypes.Device) => {
            if (data._id === parsedMessage?.iotnode?._id) {
              return {...data, ...parsedMessage?.diff};
            }
            return data;
          });
        }
        return oldData;
      });
    });

    /*
      These events are purely for information at this moment
    */
    client.on(MQTT_EVENTS.reconnect, () => {
      console.info('Reconnecting to Yggio Broker');
    });

    client.on(MQTT_EVENTS.close, () => {
      console.info('Disconnected from Yggio Broker');
    });

    client.on(MQTT_EVENTS.error, (err: Error) => {
      console.error('MQTT error: ', err);
    });

    /*
      Unsubscribe and close connection on component unmount
    */
    return () => {
      console.info('Disconnecting from Yggio Broker');
      client.unsubscribe(topic, (err: Error) => {
        if (!err) {
          console.info(`Unsubscribed from ${topic}`);
        }
      });
      client.end();
    };
  }, [userId, token]);
};

export {
  useSockets,
};
