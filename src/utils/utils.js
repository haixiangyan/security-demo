import hljs from 'highlight.js'

export const highlight = () => {
    const codePads = document.querySelectorAll('pre code')
    codePads.forEach(codePad => hljs.highlightBlock(codePad))
}
