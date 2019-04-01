const smpp = require('smpp');

const conf = {
    endpoint: 'smpp1.world-text.com', //SMSC
    port: 12775,
    bindType: 'transmitter',
    user: 'grawdanin@gmail.com',
    pass: 'k9aubjGJns',
    scrTon: 4,
    srcNpi: 5,
    dstTon: 6,
    dstNpi: 7,
    encoding: 3,
    scrAddr: '+380683362309'
};

module.exports = () => {
    // const session = smpp.connect(`  smpp://${conf.endpoint}:${conf.port}`);
    //
    // session['bind_'+conf.bindType]({
    //     system_id: conf.user,
    //     password: conf.pass,
    //     addr_ton: conf.scrTon,
    //     addr_npi: conf.srcNpi,
    //     dest_addr_ton: conf.dstTon,
    //     dest_addr_npi: conf.dstNpi
    // }, function (pdu) {
    //     if (pdu.command_status === 0) {
    //         console.log('bind is up');
    //
    //         session.submit_sm({
    //             destination_addr: '+380683362309',
    //             short_message: 'test',
    //             source_addr: conf.scrAddr,
    //             registered_delivery:1,
    //             data_coding: 0,
    //
    //         }, function(pdu) {
    //             if (pdu.command_status === 0) {
    //                 // Message successfully sent
    //                 console.log(JSON.stringify(pdu));
    //             }
    //         });
    //
    //     }
    // });
    //
    //
    // session.on('connect', () => {
    //     console.log('SMSC online');
    // });
    //
    //
    // session.on('close', () => {
    //     console.log('SMPP connection close');
    // });
    //
    // session.on('error', err => {
    //     console.log(err, 'error 23');
    // });






    // var session = new smpp.Session({host: 'localhost', port: 8080});
    // // We will track connection state for re-connecting
    // var didConnect = false;
    // session.on('connect', function(){
    //     didConnect = true;
    //
    //     session.bind_transceiver({
    //         system_id: '22119',
    //         password: 'k9aubjGJns'
    //     }, function(pdu) {
    //         console.log('pdu status', lookupPDUStatusKey(pdu.command_status));
    //         if (pdu.command_status == 0) {
    //             console.log('Successfully bound\n')
    //         }
    //     });
    // })



    var session = smpp.connect('localhost', 8080);
    session.bind_transceiver({
        system_id: '22119',
        password: 'YOUR_PASSWORD'
    }, function(pdu) {
        if (pdu.command_status == 0) {
            // Successfully bound
            session.submit_sm({
                destination_addr: '0683362309',
                short_message: 'Hello!'
            }, function(pdu) {
                if (pdu.command_status == 0) {
                    // Message successfully sent
                    console.log(pdu.message_id);
                }
            });
        }
    });

};