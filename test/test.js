require('../index.js');

Promise

    // Test regular postpone functionality, without passing results
    .postpone(1000)
    .then(function() {
        console.log('1 second has passed.');
    })
    .postpone(1000)
    .then(function() {
        console.log('2 seconds have passed.');
        console.log('Done!');
    })

    // Test resolving data and passing it along
    .postpone(1000)
    .then(function() {
        console.log('Passing "Data" to next Promise.');
        return 'Data';
    })
    .postpone(1000)
    .then(function(result) {
        console.log('After 1 second, resolved "' + result + '".');
        console.log('Done!');
    })

    // Test function inclusion
    .postpone(function() {
        console.log('2 seconds have passed since then!');
    }, 2000);
