function setupWebViewJavascriptBridge(name, data, callback) {
  if (window.bridge) {
    window.bridge.callHandler(name, data, callback)
    return
  }
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

export default {
  callhandler(name, data, callback) {
    setupWebViewJavascriptBridge(name, data, function(bridge) {
      if (!window.bridge) {
        window.bridge = bridge
      }
      window.bridge.callHandler(name, data, callback)
    })
  },
  registerhandler(name, callback) {
    setupWebViewJavascriptBridge(function(bridge) {
      if (!window.bridge) {
        window.bridge = bridge
      }
      window.bridge.registerHandler(name, function(data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}
