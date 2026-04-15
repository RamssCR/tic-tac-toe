import { tv, type VariantProps } from 'tailwind-variants'

/**
 * Variantes de estilo para el componente `Button`.
 *
 * Los colores provienen **exclusivamente** de los tokens CSS registrados
 * en `index.css` dentro del bloque `@theme`. No se usan valores hardcoded.
 *
 * @example
 * buttonVariants({ variant: 'brand', size: 'lg' })
 * // → 'bg-brand text-brand-fg hover:bg-brand-hover ...'
 */
export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md text-sm font-medium',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    'select-none',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      /** Acción primaria — usa el color de marca del tema. */
      brand: 'bg-brand text-brand-fg hover:bg-brand-hover active:scale-95',
      /** Contorno sutil para acciones secundarias. */
      outline:
        'border border-border bg-transparent text-text-primary hover:bg-surface active:scale-95',
      /** Fondo fantasma (solo hover). */
      ghost:
        'bg-transparent text-text-primary hover:bg-surface active:scale-95',
      /** Acción peligrosa — usa el color del jugador X. */
      danger: 'bg-x text-white hover:opacity-90 active:scale-95',
    },
    size: {
      sm: 'h-8  px-3 text-xs  rounded-md',
      default: 'h-10 px-4 text-sm  rounded-md',
      lg: 'h-12 px-6 text-base rounded-lg',
      /** Botón cuadrado para iconos. */
      icon: 'h-10 w-10 rounded-md',
    },
  },
  defaultVariants: {
    variant: 'brand',
    size: 'default',
  },
})

/** Props de variante inferidas de `buttonVariants`. */
export type ButtonVariantProps = VariantProps<typeof buttonVariants>
