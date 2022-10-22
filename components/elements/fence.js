import Highlight, { defaultProps } from 'prism-react-renderer'
import { createRef } from 'react'
import { ClipboardFill } from 'react-bootstrap-icons'

const langs = {
  js: 'Javascript',
  sh: 'Shell',
  bash: 'Shell',
  properties: 'Properties',
}

export function Fence({ children, language }) {
  const notifyRef = createRef()

  const copyToClipboard = async (e) => {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(children.trimEnd())
      notifyRef.current.classList.remove('hidden')
      setTimeout(() => {
        notifyRef.current.classList.add('hidden')
      }, 1000)
    }
  }

  return (
    <Highlight
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps, getLineProps }) => (
        <pre className={className} style={style}>
          <div className='toolbox'>
            <p className='controls'>
              <span className='close' />
              <span className='min' />
              <span className='max' />
            </p>
            <p>{langs[language]}</p>
            <ClipboardFill size={12} onClick={copyToClipboard} />
          </div>
          <div className='notify hidden' ref={notifyRef}>
            Copied
          </div>
          <code>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line
                  .filter((token) => !token.empty)
                  .map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                {'\n'}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
