require 'timeout'

class CircuitBreaker
  attr_accessor :invocation_timeout, :failure_threshold, :monitor

  def initialize(&block)
    @circuit = block
    @invocation_timeout = 0.01
    @failure_threshold = 5
    @monitor = acquire_monitor
    reset
  end

  def call(args)
    case state
    when :closed
      begin
        do_call(args)
      rescue Timeout::Error
        record_failure
        raise $!
      end
    when :open
      raise CircuitBreaker::Open
    else
      raise "Unreachable Code"
    end
  end

  def do_call(args)
    result = Timeout::timeout(@invocation_timeout) do
      @circuit.call(args)
    end
    reset
    return result
  end

  def record_failure
    @failure_count += 1
    @monitor.alert(:open_circuit) if state == :open
  end

  def reset
    @failure_count = 0
    @monitor.alert(:reset_circuit)
  end

  def state
    @failure_count >= @failure_threshold ? :open : :closed
  end

  class Open < StandardError; end

  private

  # monitor acquisition logic
  def acquire_monitor
    return Monitor.new
  end
end
