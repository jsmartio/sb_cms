
module.exports.stripDown = function (refer) {
    //console.log('processing...' + refer +' in -> ' + __filename )
    if(refer === undefined) {
        return 'illegalrefer'
      } else {
        refer = refer.toString().replace('http://','').replace('https://','');
        refer = refer.substring(0, refer.indexOf(':')) // remove all after ':'
        
        if(refer.includes('/')){ // if multiple slashes? take only what is before first slash
          let t = refer.toString().split('/')
          refer = t[0];
        }
        return refer
    }
}

