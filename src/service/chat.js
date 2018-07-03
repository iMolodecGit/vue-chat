import io from 'socket.io-client'

class Chat {

    constructor() {

       this.socket = io("http://localhost:48689");

        this.socket.on('connect', () => {
           console.info('ON:', 'connect')
           this.socket.emit('p', {a:1, b:2});
        });


        this.socket.on('p', (data) => {
            console.info('p data', data)
        });


        this.foo = 5
    }

    send(){
        console.log(this.foo++);
    }

    get(){
        console.log(this.foo--);
    }
}

export default new Chat();