# UI Components

Componentes atómicos reutilizables para el diseño del sistema.

## Componentes Disponibles

### Button

Botón versátil con múltiples variantes y tamaños.

**Props:**

- `variant`: `"primary" | "secondary" | "accent" | "ghost" | "outline"` (default: `"primary"`)
- `size`: `"sm" | "md" | "lg"` (default: `"md"`)
- `fullWidth`: `boolean` (default: `false`)
- `disabled`: `boolean` (default: `false`)
- `onClick`: `() => void`
- `type`: `"button" | "submit" | "reset"` (default: `"button"`)

**Ejemplo:**

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md" onClick={() => console.log("Clicked!")}>
  Click me
</Button>;
```

---

### Card

Contenedor con múltiples estilos y opciones de personalización.

**Props:**

- `variant`: `"default" | "elevated" | "outlined" | "neumorphic"` (default: `"default"`)
- `padding`: `"none" | "sm" | "md" | "lg"` (default: `"md"`)
- `rounded`: `"none" | "sm" | "md" | "lg" | "xl" | "full"` (default: `"lg"`)
- `hoverable`: `boolean` (default: `false`)
- `onClick`: `() => void`

**Ejemplo:**

```tsx
import { Card } from "@/components/ui";

<Card variant="neumorphic" padding="lg" rounded="xl" hoverable>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>;
```

---

### Badge

Etiqueta pequeña para mostrar estados o categorías.

**Props:**

- `variant`: `"primary" | "secondary" | "accent" | "success" | "warning" | "danger"` (default: `"primary"`)
- `size`: `"sm" | "md" | "lg"` (default: `"md"`)

**Ejemplo:**

```tsx
import { Badge } from "@/components/ui";

<Badge variant="success" size="sm">New</Badge>
<Badge variant="warning">Beta</Badge>
```

---

### Input

Campo de entrada con validación y estados de error.

**Props:**

- `type`: `"text" | "email" | "password" | "number" | "tel" | "url"` (default: `"text"`)
- `placeholder`: `string`
- `value`: `string`
- `onChange`: `(value: string) => void`
- `disabled`: `boolean` (default: `false`)
- `error`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)

**Ejemplo:**

```tsx
import { Input } from "@/components/ui";

<Input
  type="email"
  placeholder="tu@email.com"
  value={email}
  onChange={setEmail}
  error={!isValidEmail}
  fullWidth
/>;
```

---

## Importación

Puedes importar componentes individuales o todos a la vez:

```tsx
// Individual
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// Todos a la vez
import { Button, Card, Badge, Input } from "@/components/ui";
```

## Personalización

Todos los componentes aceptan una prop `className` para añadir clases CSS personalizadas:

```tsx
<Button className="my-custom-class">Custom Button</Button>
```

## Colores del Sistema

Los componentes usan las variables CSS del tema:

- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-success`
- `--color-warning`
- `--color-danger`
- `--color-foreground`
- `--color-background`
