import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

/**
 * Combina clases de Tailwind de forma segura, eliminando conflictos.
 *
 * Internamente usa {@link clsx} para unir valores condicionales y
 * {@link twMerge} para resolver colisiones de utilidades de Tailwind.
 *
 * @param inputs - Cualquier valor válido de clases CSS (`string`, `object`, `array`, etc.).
 * @returns La cadena de clases CSS resultante, libre de conflictos.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-brand', 'py-3')
 * // → 'px-4 bg-brand py-3'  (py-2 es reemplazado por py-3)
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
