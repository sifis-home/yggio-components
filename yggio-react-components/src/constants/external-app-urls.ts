import {getConfig} from '../yggio-config';

interface ExternalUrls {
  docs: string;
  swagger: string;
  locationManager: string;
  ruleEngine: string;
  controlPanelV1: string;
  stripsConfig: string;
  webshop: string;
  deviceUpdater: string;
  stripsBatteryCalculator: string;
}

const getExternalUrls = (): ExternalUrls => {
  return {
    docs: `https://${getConfig().domain}/docs`,
    swagger: `https://${getConfig().domain}/swagger`,
    locationManager: `https://${getConfig().domain}/location-manager`,
    ruleEngine: `https://${getConfig().domain}/rule-manager/start`,
    controlPanelV1: `https://${getConfig().domain}/control-panel`,
    stripsConfig: `https://strips-lora-config-app.service.sensative.net/profiles`,
    webshop: 'https://shop.sensative.com/',
    deviceUpdater: `https://${getConfig().domain}/device-updater`,
    stripsBatteryCalculator: `https://strips-battery-calculator.service.sensative.net/`,
  };
};

export {
  getExternalUrls,
};
