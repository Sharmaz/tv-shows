var request = require('client-request')

function Client (options) {
  this.options = options || { }

  this.endpoint = this.options.endpoint || 'http://api.tvmaze.com'
}

Client.prototype.shows = function (callback) {
  var uri = this.endpoint + '/shows'

  request({
    uri: uri,
    method: 'GET',
    json: true
  }, function (err, res, body) {
    if (err) return callback(err)

    if (res.statusCode !== 200) return callback(new Error('an error ocurred in the request'))

    callback(null, body)
  })
}

module.exports = Client
