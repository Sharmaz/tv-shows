var test = require('tape')
var nock = require('nock')
var tvmaze = require('../')
var Client = require('../lib/client')

var endpoint = 'http://api.tvmaze.test'

test('should create a client', function (t) {
  t.ok(tvmaze.createClient, 'should exist')
  t.equals(typeof tvmaze.createClient, 'function', 'should be a function')

  var client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instanceof Client')
  t.end()
})

test('should fail with unknown endpoint', function (t) {
  var client = tvmaze.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('/foo', 'GET', null, function (err, body) {
    t.ok(err, 'should fail')
    t.end()
  })
})

test('should fail if not query is passed', function (t) {
  var client = tvmaze.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/search/shows')
    .reply(400, {
      code: 0,
      message: 'Missing require parameter: q',
      name: 'Bad request',
      status: 400
    })

  client._request('/search/shows', 'GET', null, function (err, res) {
    t.ok(err, 'bad request error')
    t.notOk(res, 'should be null')
    t.end()
  })
})

test('should list shows', function (t) {
  var client = tvmaze.createClient({ endpoint: endpoint })

  t.equals(typeof client.shows, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows')
    .reply(200, [])

  client.shows(function (err, shows) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.end()
  })
})

test('should search shows', function (t) {
  var client = tvmaze.createClient({ endpoint: endpoint })

  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/search/shows')
    .query({ q: 'daredevil' })
    .reply(200, [{ name: 'Daredevil' }])

  client.search('daredevil', function (err, shows) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.equals(shows[0].name, 'Daredevil', 'should retrieve a show name')
    t.end()
  })
})
