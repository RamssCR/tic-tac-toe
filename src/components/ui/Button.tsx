import type { ButtonHTMLAttributes } from 'react'
import { type ButtonVariantProps, buttonVariants } from '@variants/button'
import { cn } from '@utils/classMerger'

/** Props del componente `Button`. */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps

/**
 * Componente de botón reutilizable con variantes de estilo.
 *
 * Aplica las clases de `buttonVariants` y acepta cualquier atributo HTML
 * estándar de `<button>`. Admite la prop `className` para extensión puntual.
 *
 * @param props - {@link ButtonProps} — variant, size y atributos HTML nativos.
 * @returns Elemento `<button>` con estilos aplicados.
 *
 * @example
 * <Button variant="brand" size="lg" onClick={handleClick}>
 *   Jugar de nuevo
 * </Button>
 */
export const Button = ({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    />
  )
}
