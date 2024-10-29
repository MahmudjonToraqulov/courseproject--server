const corsOption = {
    origin: '*',
    methods: '*',
    credentials: true,
    transport: '*',
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsOption