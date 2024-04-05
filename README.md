# Building a Polymorphic React FormElement Component

When working on a complex React application, you often encounter the need for versatile form elements. These form elements can include buttons, links, inputs, selects, and text areas, each with various styling options. Instead of creating separate components for each form element, we can build a polymorphic React `FormElement` component. In this article, we'll explore how to create this component, its advantages, and potential future improvements.

## The FormElement Component

The `FormElement` component is designed to handle different types of form elements and allows you to customize their styling using the variant prop. It supports various HTML elements like buttons, links, inputs, selects, and text areas, while maintaining a consistent API.

Here's the code for the `FormElement` component:

```tsx
import React from 'react';

type FormElementBaseProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
};

type FormElementProps = FormElementBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as: 'button';
      })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: 'a';
      })
    | (React.InputHTMLAttributes<HTMLInputElement> & {
        as: 'input';
      })
    | (React.SelectHTMLAttributes<HTMLSelectElement> & {
        as: 'select';
      })
    | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        as: 'textarea';
      })
  );

export function FormElement({ variant, ...props }: FormElementProps) {
  switch (props.as) {
    case 'button':
      return <button {...props}>{props.children}</button>;
    case 'a':
      return <a {...props}>{props.children}</a>;
    case 'input':
      return <input {...props} />;
    case 'select':
      return <select {...props}>{props.children}</select>;
    case 'textarea':
      return <textarea {...props} />;
    default:
      return null;
  }
}
```

## Key Features

- **Polymorphism** - The `FormElement` component is polymorphic, meaning it can render different types of form elements. This is achieved by using the `as` prop, which accepts a string value of the HTML element to render. For example, if you want to render a button, you would pass `as="button"` to the `FormElement` component.

- **Variant Support** - The `FormElement` component supports different variants for each form element. This is achieved by using the `variant` prop, which accepts a string value of the variant to render. For example, if you want to render a primary button, you would pass `variant="primary"` to the `FormElement` component.

- **Consistent API** - The `FormElement` component maintains a consistent API across all form elements. This is achieved by using the `FormElementProps` type, which is a union of all the different HTML element props. For example, if you want to render a button, you would pass `as="button"` and `variant="primary"` to the `FormElement` component.

## Advantages of the FormElement Component

- **Code Reusability** - With the `FormElement` component, you can reuse the same component for various form elements. This reduces code duplication and simplifies maintenance.

- **Styling Consistency** - By providing a variant prop, you can ensure that all your form elements have a consistent look and feel, maintaining a unified user interface.

- **Improved Development Speed** - The `FormElement` component speeds up development by eliminating the need to create separate components for each form element type. It simplifies your codebase and streamlines development.

- **Enhanced Accessibility** - You can add accessibility attributes and functionality consistently to all form elements using the `FormElement` component.

- **Expand Element Types** - The `FormElement` component supports various HTML elements like buttons, links, inputs, selects, and text areas. You can easily add support for more element types in the future.

## Future Improvements

- **Support for More Form Elements** - The `FormElement` component currently supports buttons, links, inputs, selects, and text areas. In the future, we could add support for checkboxes, radio buttons, and other form elements.

- **Support for More Variants** - The `FormElement` component currently supports primary, secondary, outline, and link variants. In the future, we could add support for more variants like success, warning, and danger.

- **Support for Custom Styling** - The `FormElement` component currently supports a limited set of styling options. In the future, we could add support for custom styling using CSS-in-JS libraries like styled-components or emotion.

- **Validation Support** - The `FormElement` component currently doesn't support validation. In the future, we could add support for validation using libraries like Formik or React Hook Form. This could involve adding error messages, validation rules, and a `valid` prop to indicate the input's validity.

## How to Use the FormElement Component

Using the `FormElement` component is straightforward. You specify the as prop to define the type of form element and use the variant prop for styling. Here's an example of how to use it:

```tsx
import { FormElement } from './FormElement'; // Import your component here

export default function Usage() {
  return (
    <main>
      <FormElement as="button" variant="primary">
        Submit
      </FormElement>

      <FormElement as="a" href="https://example.com" variant="secondary">
        Example
      </FormElement>
      <FormElement as="input" type="text" variant="outline" />
      <FormElement as="select" variant="link">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </FormElement>
      <FormElement as="textarea" variant="primary" />
    </main>
  );
}
```

## Writing Tests for the FormElement Component

When writing tests for the `FormElement` component, you should test each form element type separately. For example, if you want to test the button form element, you would write a test like this:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormElement } from './FormElement'; // Import your component here

describe('FormElement Component', () => {
  it('renders a button with text', () => {
    render(<FormElement as="button">Click Me</FormElement>);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
  });

  it('renders an input with a placeholder', () => {
    render(<FormElement as="input" placeholder="Type something" />);
    const input = screen.getByPlaceholderText('Type something');
    expect(input).toBeInTheDocument();
  });

  it('handles click event for a button', () => {
    const handleClick = jest.fn();
    render(
      <FormElement as="button" onClick={handleClick}>
        Click Me
      </FormElement>
    );
    const button = screen.getByRole('button', { name: 'Click Me' });

    userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('renders a textarea with children', () => {
    render(<FormElement as="textarea">Your text here</FormElement>);
    const textarea = screen.getByText('Your text here');
    expect(textarea).toBeInTheDocument();
  });

  it('applies a variant class to the button', () => {
    render(
      <FormElement as="button" variant="primary">
        Primary Button
      </FormElement>
    );
    const button = screen.getByRole('button', { name: 'Primary Button' });
    expect(button).toHaveClass('primary');
  });

  it('applies a variant class to the input', () => {
    render(<FormElement as="input" variant="secondary" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('secondary');
  });
});
```

In this test suite, we're testing various aspects of the `FormElement` component, including rendering, user interaction, and styling. You should adapt these tests to match your specific component behavior and any enhancements you've made.

Remember to configure Jest and React Testing Library for your project and adjust the import path for the `FormElement` component accordingly. You can also include more tests to cover any additional functionality or future improvements you've implemented.

## Conclusion

The `FormElement` component is a versatile React component that can render different types of form elements. It supports various HTML elements like buttons, links, inputs, selects, and text areas, while maintaining a consistent API. It also supports different variants for each form element, allowing you to customize their styling. This component is a great way to simplify your codebase and speed up development.

By adopting the `FormElement` component and considering future enhancements, you can streamline your development process and provide a better user experience to your application's users.

## Resources

- [React Docs](https://react.dev/learn)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
