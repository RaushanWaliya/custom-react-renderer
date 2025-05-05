// Custom createElement and Fragment
const React = {
    createElement(type, props, ...children) {
      return {
        type,
        props: {
          ...props,
          children: children.flat(),
        },
      };
    },
    Fragment: Symbol('React.Fragment'),
  };
  
  // Recursive render function
  function renderElement(element, indent = 0) {
    const space = '  '.repeat(indent);
  
    if (typeof element === 'string' || typeof element === 'number') {
      console.log(`${space}${element}`);
      return;
    }
  
    if (Array.isArray(element)) {
      element.forEach(child => renderElement(child, indent));
      return;
    }
  
    if (!element || typeof element.type === 'undefined') return;
  
    // Support for functional components
    if (typeof element.type === 'function') {
      return renderElement(element.type(element.props), indent);
    }
  
    // Support for Fragments
    if (element.type === React.Fragment) {
      return renderElement(element.props.children, indent);
    }
  
    console.log(`${space}<${element.type}>`);
  
    const children = element.props?.children || [];
    const childArray = Array.isArray(children) ? children : [children];
  
    childArray.forEach(child => renderElement(child, indent + 1));
  
    console.log(`${space}</${element.type}>`);
  }
  
  // Example components
  function Title() {
    return React.createElement('h1', null, 'Hello from custom React');
  }
  
  function App() {
    return React.createElement(
      'div',
      null,
      React.createElement(Title),
      React.createElement('p', null, 'This is a custom renderer'),
      [
        React.createElement('li', null, 'Item 1'),
        React.createElement('li', null, 'Item 2'),
      ],
      React.createElement(React.Fragment, null,
        React.createElement('span', null, 'Inside Fragment')
      )
    );
  }
  
  // Run the renderer
  const appElement = App();
  renderElement(appElement);
  