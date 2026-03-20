require 'dotenv'
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  # Create a hash for env variables if it doesn't exist
  site.config['env'] ||= {}

  [
    'API_KEY',
    'AUTH_DOMAIN',
    'PROJECT_ID',
    'APP_ID',
    'PAYPAL_CLIENT_ID',
    'MIDTRANS_CLIENT_KEY',
    'MIDTRANS_URL',
    'WA_KEY',
    'DATABASE_URL',
    'STORAGE_BUCKET',
    'SENDER_ID',
    'MEASUREMENT_ID'
  ].each do |var|
    value = ENV[var]
    site.config[var] = value
    site.config['env'][var] = value
  end
end
