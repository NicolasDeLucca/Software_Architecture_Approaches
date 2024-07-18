# breaker
cb = CircuitBreaker.new {|arg| @supplier.func arg}


# https://martinfowler.com/bliki/CircuitBreaker.html