
module.exports = (api, options) => {
  api.chainWebpack(chainConfig => {
    if (!['web', 'h5'].includes(process.env.PLATFORM)) {

    }
  })
}
