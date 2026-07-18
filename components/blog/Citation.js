export default function Citation({ url, title, number }) {
  return (
    <sup className="ml-0.5">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold hover:text-gold-light text-[10px] font-bold transition-colors"
        title={title}
      >
        [{number}]
      </a>
    </sup>
  )
}

export function SourceList({ sources }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="font-serif text-xl text-[#1a1a1a] mb-4">Sources</h3>
      <ol className="space-y-2 text-sm text-[#1a1a1a]/60">
        {sources.map((source, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-gold font-bold text-xs mt-0.5">[{i + 1}]</span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors underline decoration-gray-200 underline-offset-2"
            >
              {source.title}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
