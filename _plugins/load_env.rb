require 'dotenv'
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  # Create a hash for env variables if it doesn't exist
  site.config['env'] ||= {}

  [
    'WA_KEY',
    'SITE_KEY',
    'API_KEY',
    'AUTH_DOMAIN',
    'DATABASE_URL',
    'PROJECT_ID',
    'APP_ID',
    'SENDER_ID'
  ].each do |var|
    value = ENV[var]
    site.config[var] = value
    site.config['env'][var] = value
  end
end
