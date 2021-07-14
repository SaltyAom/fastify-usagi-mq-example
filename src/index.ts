import fastify from 'fastify'

import type { UsagiChannel } from 'usagi-mq'

import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import staticPlugin from 'fastify-static'

import dotenv from 'dotenv'
import { resolve } from 'path'

import base from '@modules/base'
import queue from '@modules/queue'

import run from '@services/cluster'
import usagiService from '@services/queue'

dotenv.config()

const app = fastify()

const main = async () => {
    const usagi = await usagiService()

    usagi.consumeRpc<string>('fastify_queue', async () => {
        return Date.now().toString()
    })

    app.register(helmet)
        .register(compress)
        .register(staticPlugin, {
            root: resolve('./public')
        })
        .decorate('usagi', usagi)
        .register(base)
        .register(queue)
        .listen(8080, '0.0.0.0', (error, address) => {
            if (error) return console.error(error)

            console.log(`Running at ${address}`)
        })
}

run(main)

declare module 'fastify' {
    interface FastifyInstance {
        usagi: UsagiChannel
    }
}
