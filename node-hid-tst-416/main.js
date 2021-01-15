// Show how to use node-hid with RawHID Arduino device
// Documentation for https://github.com/node-hid/node-hid/issues/416
// For use with "HIDProjectRawHID" Arduino sketch in this directory.
// Device has two 64-byte reports (input & output) and is NOT using reportIds.
// To use:
// - Install HIDProjectRawHID on Arduino device
// - Open Arduino Serial Monitor to see data received by device
// - Run this script with "npm run start"

var HID = require('node-hid');

var devices = HID.devices();
console.log("HID devices:\n",devices);

var isMyDevice = function(d) { 
    return d.vendorId===0x2341 && d.productId===0x8037;
}

var isRawHidUsage = function(d) { 
    return d.usagePage===0xFFC0 && d.usage===0xC00;
}

var deviceInfo = devices.find( function(d) {
    return isMyDevice(d) && isRawHidUsage(d);
});

if( deviceInfo ) {
    console.log(deviceInfo);

    var device = new HID.HID( deviceInfo.path );
    console.log('Opened device:', device);

    device.on('data', function(data) {
        console.log('data:',data);
    });

    device.on('error', function(err) {
        console.log('error:',err);
        device.close();
    });
    
    let command = [
        0x00, // first byte is reportId (zero if no report id used)
        0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
    ];
  
    console.log('Sending: ', command)
    device.write(command);
    console.log('Waiting 3 seconds for data...');

    setTimeout( function() {
        console.log('Closing device');
        device.close();
    }, 3000);

}
else {
    console.log('No matching HID device');
}
