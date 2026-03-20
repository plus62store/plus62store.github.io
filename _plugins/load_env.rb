require 'dotenv'
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  site.config['API_KEY'] = ENV['API_KEY']
  site.config['AUTH_DOMAIN'] = ENV['AUTH_DOMAIN']
  site.config['PROJECT_ID'] = ENV['PROJECT_ID']
  site.config['APP_ID'] = ENV['APP_ID']
  site.config['PAYPAL_CLIENT_ID'] = ENV['PAYPAL_CLIENT_ID']
  site.config['MIDTRANS_CLIENT_KEY'] = ENV['MIDTRANS_CLIENT_KEY']
  site.config['MIDTRANS_URL'] = ENV['MIDTRANS_URL']
end
