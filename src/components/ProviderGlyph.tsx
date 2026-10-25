import { Waves } from 'lucide-react'
import { cn } from '../lib/cn'

export function ProviderGlyph({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5574ff] to-[#2a3eaf] text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.24),0_6px_16px_-8px_rgb(54_81_220_/_0.8)]',
        className,
      )}
      aria-hidden="true"
    >
      <Waves className={cn('size-[19px]', iconClassName)} strokeWidth={2.1} />
    </span>
  )
}
