# tv-shows

## Usage
```javascript
var tvshows = require('tv-shows')

var client = tvshows.createClient()

client.shows(function (err, shows) {
	// do something shows...
})

client.search('lost', function (err, shows) {
	// do something shows...
})

client.search('lost', { single: true }, function (err, show) {
  // do something whit show...
})
```