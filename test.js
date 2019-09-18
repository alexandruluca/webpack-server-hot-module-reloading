let series = [1, 2, 3, 4];

function chainIterator(input, iterator, done) {
    if(!input) {
        return;
    }
    done = done || function() {};
    let idx = 0;
    
   return new Promise((resolve, reject) => {
    var iterate = function() {
        if(idx > input.length - 1) {
            done();
            resolve();
            return;
        }
        let item = input[idx++];
        process.nextTick(() =>  iterator(item, iterate));
    }
    
    iterate();
   });
    
}

(async function() {
    await chainIterator(series, function(item, next) {
        console.log('item', item);
        next();
    }, function() {
        console.log('done 1');
    });
    
    console.log('done');
})();