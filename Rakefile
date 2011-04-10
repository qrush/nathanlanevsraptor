require './setup'

desc "watch tweets"
task :watch do
  TweetStream::Client.new(ENV['USER'],ENV['PASSWORD']).track("'my dignity'", "dignity", "nerds") do |status|
    handle = status.user.screen_name
    text   = status.text

    if text.downcase.include?("nerds")
      list = NERD_LIST
    else
      list = DIGNITY_LIST
    end

    puts "[#{list}] [#{handle}] #{text}"

    REDIS.lpush list, {text: text, handle: handle}.to_json
    REDIS.ltrim list, 0, 10
  end
end
