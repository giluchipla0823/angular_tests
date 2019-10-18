var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/',
  target: 'https://servicios.crea-energia.com',
  secure: false
}];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }

  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
