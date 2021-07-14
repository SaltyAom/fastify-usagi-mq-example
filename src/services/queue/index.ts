import Usagi from 'usagi-mq'

const usagiService = async () => {
    const usagi = new Usagi('amqp://localhost')
    await usagi.connect()

    const channel = await usagi.createChannel({
        queues: [{ name: 'fastify_queue' }]
    })

    return channel
}

export default usagiService