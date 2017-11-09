const var LED_SERVICE = 0xC2BD
const var LED_ON_CHAR = 0xC24C

var LED_characteristic;
function bt_init() {
	LED_characteristic = navigator.bluetooth.requestDevice({
	  acceptAllDevices:true,
	  optionalServices: [LED_SERVICE],
	})
	.then(device => device.gatt.connect())
	.then(server => server.getPrimaryService(LED_SERVICE))
	.then(service => service.getCharacteristic(LED_ON_CHAR));
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

