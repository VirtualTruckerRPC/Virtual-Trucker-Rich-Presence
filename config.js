// VIRTUAL TRUCKER RICH PRESENCE 2.81

const packageInfo = require('./package.json');

module.exports = {
    applications: {
        ets2: '432559364772200479',
        ats: '454028920107565107',
    },
    version: `Virtual Trucker Rich Presence ${packageInfo.version}`,
    kmToMilesConversion: 0.62,
    mpCheckerIntervalMilliseconds: 1.5 * 60 * 1000,
    locationCheckerIntervalMilliseconds: 1 * 60 * 1000,
    kmString: 'KM',
    milesString: 'Mi',
    constants: {
        km: 'km',
        miles: 'm',
        ets2: 'ets2',
        ats: 'ats',
        brandPrefix: 'brand_',
        brandGenericKey: 'brand_generic',
        ets2LargeImagePrefix: 'ets2rpc_',
        atsLargeImagePrefix: 'atsrpc_',
        promodsLargeImagePrefix: 'promods_',
        largeImageKeys: {
            idle: 'idle',
            active: 'active',
        },
        speedMultiplierValue: 3.6
    },
    supportedBrands: [
        'daf',
        'freightliner',
        'international',
        'iveco',
        'kamaz',
        'kenworth',
        'mack',
        'man',
        'mercedes',
        'peterbilt',
        'renault',
        'scania',
        'skoda',
        'volvo',
        'tesla'
    ],
    latestReleaseAPIUrl: 'https://api.github.com/repos/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases/latest',
    latestReleasePage: 'https://github.com/VirtualTruckerRPC/Virtual-Trucker-Rich-Presence/releases/latest'
}