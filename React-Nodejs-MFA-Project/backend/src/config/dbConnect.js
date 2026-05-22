import {connect} from 'mongoose';
const dbConnect = async () => {
    try {
        const mongoDBConnection = await connect(process.env.CONNECTION_STRING);
        console.log(`✅ Database connected: ${mongoDBConnection.connection.host}`);
    } catch (error) {
        console.log(`❌ Database connection failed: ${error.message}`);
        if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
            console.log('⚠️  MongoDB Atlas cluster not found. Please:');
            console.log('   1. Check your MongoDB Atlas connection string in .env');
            console.log('   2. Ensure your cluster is running and not paused');
            console.log('   3. Check network/firewall settings');
            console.log('   4. Update CONNECTION_STRING in backend/.env with a valid cluster');
        }
        process.exit(1);
    }
};

export default dbConnect;