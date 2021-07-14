import type { FastifyPluginCallback } from 'fastify'

const base: FastifyPluginCallback = (app, _, done) => {
    app.get('/queue', async (_req, res) => {
        const usagi = app.usagi

        try {
            const time = await usagi.sendRpc<string>('fastify_queue', {
                message: 'Hello World'
            })

            res.send(time)
        } catch (error) {
            console.log(error)

            res.send(error)
        }
    })

    done()
}

export default base
