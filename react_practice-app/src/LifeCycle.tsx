import React, { Component } from 'react';

interface LifeCycleProps {
  initialCount: number;
  onIncrement: (count: number) => void;
}

interface LifeCycleState {
  count: number;
}

class LifeCycle extends Component<LifeCycleProps, LifeCycleState> {
  constructor(props: LifeCycleProps) {
    super(props);
    this.state = {
      count: props.initialCount || 0,
    };
    console.log('✅ Constructor called');
  }

  static getDerivedStateFromProps(props: LifeCycleProps, state: LifeCycleState) {
    console.log('✅ getDerivedStateFromProps called - props:', props, 'state:', state);
    // Return null if no state update needed, or new state object
    return null;
  }

  componentDidMount() {
    console.log('✅ componentDidMount called');
  }

  componentDidUpdate(prevProps: LifeCycleProps, prevState: LifeCycleState) {
    console.log('✅ componentDidUpdate called');
    console.log('Previous count:', prevState.count, '| Current count:', this.state.count);
  }

  componentWillUnmount() {
    console.log('✅ componentWillUnmount called');
  }

  handleIncrement = () => {
    const newCount = this.state.count + 1;
    this.setState({ count: newCount });
    this.props.onIncrement(newCount);
  };

  render() {
    console.log('✅ render called');
    return (
      <div style={{ border: '2px solid blue', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>LifeCycle Component</h2>
        <p><strong>Current Count:</strong> {this.state.count}</p>
        <button 
          onClick={this.handleIncrement}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Increment Count
        </button>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Check console to see lifecycle methods being called
        </p>
      </div>
    );
  }
}

export default LifeCycle;
