let count    = 0;

module.exports.incr  = function() { count++;      }
module.exports.reset = function() { count = 0;    }
module.exports.get   = function() { return count; }
