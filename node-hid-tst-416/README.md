## Show how to use node-hid with RawHID Arduino device

Example for:
- https://github.com/node-hid/node-hid/issues/416

To use:
- Install "HIDProjectRawHID" Arduino sketch on Arduino device
  - Be sure to install "HID-Project" library in Arduino Library Manager first
  - Tested on ATmega32U4 "Arduino Pro Micro"
  - Device has two 64-byte reports (input & output) and is NOT using reportIds
- Open Arduino Serial Monitor to see data received by device
- Run `node-hid` script with `npm run start`

Tested on:
- MacOS 11.1 x64 w/ node@14.5, node-hid@2.2.1
- Windows 10 Pro x64 w/ node@14.5, node-hid@2.2.1


The "HIDProjectRawHID" Arduino sketch creates a RawHID device with the
following properties:

```
 * vendorId:      0x2341
 * productId:     0x8037
 * usagePage:     0xFFC0
 * usage:         0x0C00
 *
 * HID Report Descriptor:
 * 0x06, 0xC0, 0xFF,  // Usage Page (Vendor Defined 0xFFC0)
 * 0x0A, 0x00, 0x0C,  // Usage (0x0C00)
 * 0xA1, 0x01,        // Collection (Application)
 * 0x75, 0x08,        //   Report Size (8)
 * 0x15, 0x00,        //   Logical Minimum (0)
 * 0x26, 0xFF, 0x00,  //   Logical Maximum (255)
 * 0x95, 0x40,        //   Report Count (64)
 * 0x09, 0x01,        //   Usage (0x01)
 * 0x81, 0x02,        //   Input (Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position)
 * 0x95, 0x40,        //   Report Count (64)
 * 0x09, 0x02,        //   Usage (0x02)
 * 0x91, 0x02,        //   Output (Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position,Non-volatile)
 * 0xC0,              // End Collection
 * // 28 bytes
```

