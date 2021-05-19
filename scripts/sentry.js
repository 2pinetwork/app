const SentryCli = require('@sentry/cli')

const createRelease = async () => {
  const cli     = new SentryCli()
  const release = process.env.REACT_APP_SENTRY_RELEASE

  if (! release) {
    console.warn('REACT_APP_SENTRY_RELEASE is not set')
    return
  }

  try {
    const options = {
      include:   ['build/static/js'],
      urlPrefix: '~/static/js',
      rewrite:   false
    }

    console.log(`Creating sentry release ${release}`)
    await cli.releases.new(release)

    console.log('Uploading source maps')
    await cli.releases.uploadSourceMaps(release, options)

    console.log('Finalizing release')
    await cli.releases.finalize(release)
  } catch (error) {
    console.error('Source maps uploading failed:', error)
    process.exit(1)
  }
}

createRelease()
