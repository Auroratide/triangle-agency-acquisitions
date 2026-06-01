# Triangle Agency Mission Maker

The Triangle Agency Mission Maker turns markdown into pages that fit the styling of a Triangle Agency Mission. Help create the initial harness for this upon which I will build custom parsing rules and styling.

## User Experience

Desktop and tablet are the primary expected sizes for this tool, but support for mobile is good too.

For desktop/tablet:

- Dual-screen setup: A rendered preview will appear on the left, and the editable markdown on the right.
- Whenever changes are made to the markdown, the changes can be seen almost immediately in the preview.
- The preview should as closely as possible match what the pages would look like if printed. The markdown will have cues for when new pages begin and end, and the preview must show this.
- The top of the page has a toolbar. For now, the toolbar contains a toggle button for seeing the preview only, hiding the textarea.
- The toolbar should also have a button for showing document metadata fields that can be edited (title, subtitle, etc; see next section for list of starting fields).

For mobile:

- By default only the markdown is shown.
- The aforementioned toolbar sits at the top, with the toggle button for seeing the preview, hiding the textarea.

## Technical Details and Requirements

- Find the best library for an extensible markdown-to-html parsing. I do NOT want to reimplement markdown.
- I will need to create custom parsing rules and/or web components for special elements that are used often. For example, instead of `-----` representing a horizontal line, it will represent a new page. Therefore, the library needs to make it easy to add parsing rules or modify existing ones.
- The intended output is HTML that is meant to be printed in a highly consistent way. Help set up any initial CSS media queries or `@page` queries that will make this work.
- The live preview also needs to look page-like, so the user gets as accurate as possible a representation of what the page will look like without having to see print preview.
- Storage: Use indexedDB (use the idb library for this). For now, simply store the current document into it, and load it up whenever the page is refreshed.
- Images: Whenever a Paste event occurs which contains an image, save the image into indexeddb as base64, and use an object url for it in the preview. The markdown code should simply use a key to reference the image in indexeddb. Whenever the last instance of an image is removed from the markdown, then it should also be removed from indexeddb.
- Metadata fields that can be edited (I will add more later):
  - Title
  - Subtitle
  - Primary Color
  - Secondary Color
- Save metadata fields as frontmatter to the document in indexeddb. When retrieving, extract the frontmatter to populate into the metadata fields. Do NOT show the frontmatter in the textarea editor.
- Note, I will add more metadata fields later, so make sure in the code it is easy to add more fields; one of the reasons I am saving to frontmatter is 1) so that in the future when the files are saved externally, it can be done as a single markdown file, and 2) so I don't need to manage migrations of the indexeddb document(s).
