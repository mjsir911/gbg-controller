var LED_characteristic;
function bt_init() {
	LED_characteristic = navigator.bluetooth.requestDevice({
	  acceptAllDevices:true,
	  optionalServices: [0x00FF],
	})
	.then(device => device.gatt.connect())
	.then(server => server.getPrimaryService(0x00FF))
	.then(service => service.getCharacteristic(0xFF01));
	LED_characteristic.then(characteristic => characteristic.writeValue(Uint8Array.of(0)));
}

function bt_toggle() {
	var val;
	LED_characteristic
	.then(characteristic => characteristic.readValue())
	.then(value => {
		value = value.getUint8(0);
		console.log(value);
		LED_characteristic.then(characteristic => {
			characteristic.writeValue(Uint8Array.of(!value));
		})
	})
}

