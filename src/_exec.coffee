request = require 'request-promise'
Promise = require 'bluebird'

validate = require './_validate'
varString = require './_varString'
api = require '../api.json'

req = request.defaults
  baseUrl: 'https://api.trello.com/1/'
  json: true
  headers:
    Accept: 'application/json'

module.exports = (ns, values) ->

  err = validate ns, values

  if err then return Promise.reject err

  key = values.key
  token = values.token

  options =
    method: api[ns].method
    uri: varString.replace api[ns].url, values
    body: values

  if api[ns].method == 'GET'
    options.qs = values
  else
    varString.getVars(api[ns].url).forEach (varName) ->
      delete options.body[varName]

  req options
