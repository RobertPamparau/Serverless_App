
const hello = async (event) => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world'
                
        
            })
        }
};

module.exports ={
    handler:hello
}
