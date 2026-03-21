[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Markdown Blog - Roadmap"
[_metadata_:tags]:- "markdown,blog"
[_metadata_:date]:- "31/8/2022"

# Blog Component

The component content will be based on Markdown files to make it natural for a developer to maintain.
the markdown files will be loaded and styled, added with a Copy-to-Clipboard button and a better code area styling necessary for a dev blog.  <br><br>


## Roadmap:

- Create a new Page and instrument it into the website menu, include basic styling.
- create Article component, load the markdown and apply basic styling
- Add Code Component to render instead of the code markdown block.
- Add Copy-Paste Icon and apply functionality.
- Test the look&feel of a 'Dark' Mode

---

## Stories:

### Blog Page Skeleton

1. Add the menu item "Blog"

  <code language='json'>
    {
      label: 'Blog',
      path: '/blog',
    }
  </code>

2. Add the page component
3. Add basic styling

### Create Article component

1. Add Article component to show a single post

#### Loading Markdown

1. Load the markdown using ***markdown-to-jsx Library***

2. Extract hidden fields from the Markdown

<br>
Markdown do not have a well defined standard for non visible metadata, one option is to hide them as follows:
```
  [_metadata_:<field>]:- "<some value>""
  ...
```
<br>
then by using this regex we are able to extract them out:
```
const metadataRegex = 
/_metadata_:(?<field>(\w)*)(]:-\s")(?<value>[\w\s\d/'+-]*)(")/g;
```
<br>
Afterwards we can use the function to extend the markdown and return a more elaborated object holding the markdown, word count and additional metadata fields:
<code language="javascript">
const collectMetatada = (markdown) => {
  const count = markdown.split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;
  const metadata = [...markdown.matchAll(metadataRegex)]
    .reduce((acc, match) => ({ ...acc, [match[1]]: match[4] }), {});
  return { ...metadata, wordcount: count, markdown };
};
</code>

2. Place inside Article Component
3. Style the Article frame

---

## Useful links:
- [Basic Syntax | Markdown Guide](https://www.markdownguide.org/basic-syntax/ "Where this idea got its wings")
- [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy")
- [markdown-to-jsx Library](https://www.npmjs.com/package/markdown-to-jsx "Rendering Markdown in React and easily override it's components")
- [React Syntax Highlighter Library](https://www.npmjs.com/package/react-syntax-highlighter "Syntax highlighting component for React using the seriously super amazing lowlight and refractor by wooorm")
- [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard "Copy to clipboard React component")
- [heroicons SVG Icons](https://heroicons.com "Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS")