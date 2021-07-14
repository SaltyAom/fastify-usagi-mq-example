/* eslint-disable no-undef */

const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const append = () => {
    let header =
        readFileSync(resolve('scripts/header.js'), {
            encoding: 'utf-8'
        }) + ';'

    let isProduction = process.env.NODE_ENV === 'production'

    let file = resolve(isProduction ? 'build/index.js' : '.dev/index.js')
    let content = readFileSync(file, { encoding: 'utf8' })

    writeFileSync(file, header.trim() + content)
}

module.exports = append
