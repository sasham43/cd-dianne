var gpio = require('pi-gpio');

gpio.open(11, 'input', function(err){
  gpio.read(11, function(err, value){
    console.log('err:', err);
    console.log('value:', value);
  });
});
