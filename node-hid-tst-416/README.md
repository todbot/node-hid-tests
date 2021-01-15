Show how to use node-hid with RawHID Arduino device

Documentation for https://github.com/node-hid/node-hid/issues/416

To use:
- Install "HIDProjectRawHID" Arduino sketch on Arduino device
  - Be sure to install "HID-Project" library in Arduino Library Manager first
  - Tested on ATmega32U4 "Arduino Pro Micro"
  - Device has two 64-byte reports (input & output) and is NOT using reportIds.
- Open Arduino Serial Monitor to see data received by device
- Run `node-hid` script with `npm run start`
