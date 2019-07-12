const mongoose=require('mongoose')
mongoose.set('useFindAndModify', false);
const {mongoURI} =require('./config')

mongoose.connect(mongoURI, { useNewUrlParser: true })

mongoose.connection.on('connected',()=>{
    console.log('Database connected')
})
mongoose.connection.on('desconnected',()=>{
    console.log('Database disconnected')
})
mongoose.connection.on('error',(err)=>{
    console.log('Error:',err)
})