# UI Components

Reusable atomic components for the design system.

## Available components

### Button

A versatile button with multiple variants and sizes.

**Props:**

- `variant`: `"primary" | "secondary" | "accent" | "ghost" | "outline"` (default: `"primary"`)
- `size`: `"sm" | "md" | "lg"` (default: `"md"`)
- `fullWidth`: `boolean` (default: `false`)
- `disabled`: `boolean` (default: `false`)
- `onClick`: `() => void`
- `type`: `"button" | "submit" | "reset"` (default: `"button"`)

**Example:**

```tsx
import { Button } from "@/components/ui";

<Button>Click me</Button>;
```

### Card

A container with multiple styles and customization options.

**Props:**

- `variant`: `"default" | "elevated" | "outlined" | "neumorphic"` (default: `"default"`)
- `padding`: `"none" | "sm" | "md" | "lg"` (default: `"md"`)
- `rounded`: `"none" | "sm" | "md" | "lg" | "xl" | "full"` (default: `"lg"`)
- `hoverable`: `boolean` (default: `false`)
- `onClick`: `() => void`

**Example:**

```tsx
import { Card } from "@/components/ui";

<Card variant="neumorphic" padding="lg" rounded="xl" hoverable>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>;
```

### Badge

A compact label for states or categories.

**Props:**

- `variant`: `"primary" | "secondary" | "accent" | "success" | "warning" | "danger"` (default: `"primary"`)
- `size`: `"sm" | "md" | "lg"` (default: `"md"`)

**Example:**

```tsx
import { Badge } from "@/components/ui";

<Badge variant="success" size="sm">New</Badge>
<Badge variant="warning">Beta</Badge>
```

### Input

An input field with validation and error states.

**Props:**

- `type`: `"text" | "email" | "password" | "number" | "tel" | "url"` (default: `"text"`)
- `placeholder`: `string`
- `value`: `string`
- `onChange`: `(value: string) => void`
- `disabled`: `boolean` (default: `false`)
- `error`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Example:**

```tsx
import { Input } from "@/components/ui";

<Input
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
  error={!isValidEmail}
  fullWidth
/>;
```

## Imports

Import components individually or through the barrel export:

```tsx
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { Button, Card, Badge, Input } from "@/components/ui";
```

## Customization

Every component accepts a `className` prop for additional CSS classes:

```tsx
<Button className="my-custom-class">Custom Button</Button>
```

## System colors

Components use the theme's CSS variables:

- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-success`
- `--color-warning`
- `--color-danger`
- `--color-foreground`
- `--color-background`
