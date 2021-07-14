/* eslint-disable no-undef */
const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const alias = require('esbuild-plugin-alias')

const { resolve } = require('path')

const append = require('../scripts/append.js')

esbuild
    .build({
        entryPoints: ['src/index.ts'],
        platform: 'node',
        format: 'cjs',
        target: 'node14',
        outdir: '.dev',
        bundle: true,
        logLevel: 'error',
        plugins: [
            nodeExternalsPlugin(),
            alias({
                '@modules': resolve('./src/modules'),
                '@services': resolve('./src/services')
            })
        ]
    })
    .then(append)
