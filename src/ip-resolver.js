const getip = require('../lib/ip');

const types = {
  wifi: 'wifi',
  eth: 'eth',
};

const platforms = {
  win32: { [types.eth]: 'Ethernet', [types.wifi]: 'Wi-Fi' },
  linux: { [types.eth]: 'eth0', [types.wifi]: 'wlan0' },
  // More Names: https://nodejs.org/api/process.html#process_process_platform
};

const ipResolver = {
  network(networkName) {
    return getip(networkName);
  },

  primary(type = types.wifi) {
    const networkName = platforms[process.platform][type];

    return getip(networkName);
  },

  get eth() {
    return types.eth;
  },

  get wifi() {
    return types.wifi;
  },
};

module.exports = ipResolver;
