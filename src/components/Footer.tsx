import { ArrowUpRight, LockKeyhole } from 'lucide-react'
import { BrandMark } from './Brand'

interface FooterProps {
  docsUrl: string
  apiKeysUrl: string
}

export function Footer({ docsUrl, apiKeysUrl }: FooterProps) {
  return (
    <footer className="border-t border-line/80">
      <div className="page-wrap flex flex-col gap-7 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-8 rounded-[9px]" />
          <p className="max-w-md text-xs leading-5 text-muted">
            <span className="font-semibold text-ink">Keylight</span> is a static site. Cloudflare
            Pages only serves these files. Your key goes from this browser to the official API.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole className="size-3.5 text-accent" aria-hidden="true" />
            No backend
          </span>
          <span className="text-faint/60" aria-hidden="true">
            /
          </span>
          <a className="transition hover:text-ink" href={apiKeysUrl} target="_blank" rel="noreferrer">
            Get a DeepSeek key
            <ArrowUpRight className="ml-1 inline size-3" aria-hidden="true" />
          </a>
          <a className="transition hover:text-ink" href={docsUrl} target="_blank" rel="noreferrer">
            Official API docs
            <ArrowUpRight className="ml-1 inline size-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
