require 'rubygems'
require 'bundler'
Bundler.require

require 'json'

REDIS_URL = ENV["REDISTOGO_URL"] || "redis://localhost:6379"
REDIS     = Redis.connect(:url => REDIS_URL)

NERD_LIST = "nerds"
DIGNITY_LIST = "dignity"
