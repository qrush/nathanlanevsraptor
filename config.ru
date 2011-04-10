require './setup'

class App < Sinatra::Base
  get "/" do
    send_file "public/index.html"
  end

  def peek(list)
    REDIS.lindex list, -1
  end

  get "/tweets/nerds" do
    peek(NERD_LIST)
  end

  get "/tweets/dignity" do
    peek(DIGNITY_LIST)
  end
end

use App
run Sinatra::Application
