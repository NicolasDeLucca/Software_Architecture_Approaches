require 'timeout'

# circuit breaker reset
class ResetCircuitBreaker
  attr_accessor :invocation_timeout, :failure_threshold, :monitor

  def initialize(&block)
    @circuit = block
    @invocation_timeout = 0.01
    @failure_threshold = 5
    @monitor = BreakerMonitor.new
    @reset_timeout = 0.1
    reset
  end

  def reset
    @failure_count = 0
    @last_failure_time = nil
    @monitor.alert(:reset_circuit)
  end

  def state
    if @failure_count >= @failure_threshold && 
       (Time.now - @last_failure_time.to_f) > @reset_timeout
      :half_open
    elsif @failure_count >= @failure_threshold
      :open
    else
      :closed
    end
  end

  def call(args)
    case state
    when :closed, :half_open
      begin
        do_call(args)
      rescue Timeout::Error
        record_failure
        raise $!
      end
    when :open
      raise CircuitBreaker::Open
    else
      raise "Unreachable"
    end
  end

  def record_failure
    @failure_count += 1
    @last_failure_time = Time.now
    @monitor.alert(:open_circuit) if state == :open
  end

  class Open < StandardError; end

  private

  def do_call(args)
    result = Timeout::timeout(@invocation_timeout) do
      @circuit.call(args)
    end
    reset
    result
  end
end
