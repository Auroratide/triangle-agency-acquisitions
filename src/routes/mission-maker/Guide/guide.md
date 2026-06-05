## Formatting Guide

The formatting guide demonstrates what code to use how to achieve certain things. This _would have been_ a nice handy toolbar, but R&D said they ran out of budget.

Mission Maker uses a customized version of [Markdown](https://www.markdownguide.org/cheat-sheet/). Everything, including our proprietary Agency Document Typography (ADT™), is documented here for your benefit.

<two-columns>

- [New Pages](#new-pages)
- [Headings](#headings)
- [Formatting](#formatting)
- [Icons](#icons)
- [Lists](#lists)
- [Columns](#columns)
- [Callouts](#callouts)
- [Tables](#tables)

</two-columns>

### <a name="new-pages"></a>New Pages

Create a new page with `----` on its own line. For example:

```
This is a paragraph.

----

This is a new page.
```

### <a name="headings"></a>Headings

**Note**: There is no "Level 1" heading. The mission title on the front page _is_ the Level 1 heading.

```
## Section Heading (Level 2)
### Page Heading (Level 3)
#### Page Sub-Heading (Level 4)
##### Minor Heading (Level 5)
```

## Section Heading (Level 2)

<h3 style="margin-block-start: initial;">Page Heading (Level 3)</h3>

#### Page Sub-Heading (Level 4)
##### Minor Heading (Level 5)

### <a name="formatting"></a>Formatting

```
**Bold Text**
_Emphasized Text_
**_Bold and Emphasized_**
~~Strikethrough~~
```

**Bold Text**
_Emphasized Text_
**_Bold and Emphasized_**
~~Strikethrough~~

### <a name="icons"></a>Icons

All icons are fenced by `@` symbols, with the name of the icon in the middle.

<two-columns style="font-size: 1.125em;">

- @ability-additional-outcome@: `@ability-additional-outcome@`
- @ability-cost@: `@ability-cost@`
- @ability-failure@: `@ability-failure@`
- @ability-success@: `@ability-success@`
- @ability-triscendence@: `@ability-triscendence@`
- @agent-exclamation-point@: `@agent-exclamation-point@`
- @agent-personal-anomaly@: `@agent-personal-anomaly@`
- @agent-question@: `@agent-question@`
- @briefcase@: `@briefcase@`
- @burnout@: `@burnout@`
- @chaos@: `@chaos@`
- @commendation@: `@commendation@`
- @demerit@: `@demerit@`
- @dossier@: `@dossier@`
- @escape@: `@escape@`
- @eye@: `@eye@`
- @field-agent-manual@: `@field-agent-manual@`
- @lock@: `@lock@`
- @loose-ends@: `@loose-ends@`
- @minor-anomaly@: `@minor-anomaly@`
- @ripple-gun@: `@ripple-gun@`
- @superlative-mvp@: `@superlative-mvp@`
- @superlative-participant@: `@superlative-participant@`
- @superlative-probation@: `@superlative-probation@`
- @wait@: `@wait@`

</two-columns>

### <a name="lists"></a>Lists

```
- Triangular Bulleted List.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

?- Question List.
?- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
?- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

!- Exclaim List.
!- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
!- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

++ Commendation List.
++ **+1 Commendation**, use `++`
-- **+1 Demerit**, use `--`
```

- Triangular Bulleted List.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<br>

?- Question List.
?- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
?- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<br>

!- Exclaim List.
!- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
!- Lorem ipsum dolor sit amet, consectetur adipiscing elit.

<br>

++ Commendation List.
++ **+1 Commendation**, use `++`
-- **+1 Demerit**, use `--`

### <a name="columns"></a>Columns

Use `<two-columns>` to automatically create two columns from one block of text. Note, the space between `<two-columns>` and the next line is necessary. You end a block of columns with `</two-columns>`.

```
<two-columns>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</two-columns>
```

<two-columns>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</two-columns>

You can gain more control over the columns by using two `<one-column>` tags instead. This lets you, for example, specify uneven columns.

```
<one-column>

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

</one-column>
<one-column>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</one-column>
```

<one-column>

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

</one-column>
<one-column>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</one-column>

### <a name="callouts"></a>Callouts

```
<major-callout title="Callout Title">

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</major-callout>
```

<major-callout title="Callout Title">

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</major-callout>

<br><br>

```
<minor-callout title="Callout Title">

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</minor-callout>
```

<minor-callout title="Callout Title">

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</minor-callout>

<br><br>

```
<major-callout type="requisition" title="Requisition: Title">

<commendation-cost>3</commendation-cost>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</major-callout>
```

<major-callout type="requisition" title="Requisition: Title">

<commendation-cost>3</commendation-cost>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</major-callout>

<br><br>

```
<major-callout type="anomaly" title="Anomaly: Title">

<on-success>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</on-success>

<on-special>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</on-special>

<on-failure>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</on-failure>

</major-callout>
```

<major-callout type="anomaly" title="Anomaly: Title">

<on-success>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</on-success>

<on-special>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</on-special>

<on-failure>

Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. Maecenas mattis, justo quis molestie convallis, arcu elit faucibus dui, in hendrerit dui ante mattis risus.

</on-failure>

</major-callout>

### <a name="tables"></a>Tables

Chaos Tables are special. The system automatically assigns the chaos symbol to the numbers and determines which rows are unique chaos effects, denoting them with a triangle.

```
| Chaos | Name    | Effect   |
| ----- | ------- | -------- |
| 2     | Corrupt | Use this table to describe unique chaos effects anomalies can invoke. |
| 3     | Engulf | Custom chaos effects are automatically highlighted and marked with a triangle, indicating that they are unique to this mission and anomaly. |
| 6     | Expand | **Formatting** is allowed inside of the table. However, in order to get multiple lines, you need to use three slashes `///`, like indicated here. /// This is a separate paragraph for the same anomalous feature. |
| 10    | Kill | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. |
```

| Chaos | Name    | Effect   |
| ----- | ------- | -------- |
| 2     | Corrupt | Use this table to describe unique chaos effects anomalies can invoke. |
| 3     | Engulf | Custom chaos effects are automatically highlighted and marked with a triangle, indicating that they are unique to this mission and anomaly. |
| 6     | Expand | **Formatting** is allowed inside of the table. However, in order to get multiple lines, you need to use three slashes `///`, like indicated here. /// This is a separate paragraph for the same anomalous feature. |
| 10    | Kill | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consectetur lectus et ipsum congue, in rhoncus tortor laoreet. Duis porttitor eros ac erat egestas ultricies. Suspendisse diam justo, tempus faucibus velit ac, ultrices condimentum tellus. |

You can also make regular tables like so.

```
| Special Rules   | Description |
| --------------- | ----------- |
| +5 @chaos@ | Cras gravida dictum orci ac congue. Praesent dictum ex laoreet vulputate auctor. Praesent aliquet tellus et nisi porta, gravida fringilla tellus pretium.  |
| +2 @chaos@ | Cras gravida dictum orci ac congue. Praesent dictum ex laoreet vulputate auctor. Praesent aliquet tellus et nisi porta, gravida fringilla tellus pretium.  |
```

| Special Rules   | Description |
| --------------- | ----------- |
| +5 @chaos@ | Cras gravida dictum orci ac congue. Praesent dictum ex laoreet vulputate auctor. Praesent aliquet tellus et nisi porta, gravida fringilla tellus pretium.  |
| +2 @chaos@ | Cras gravida dictum orci ac congue. Praesent dictum ex laoreet vulputate auctor. Praesent aliquet tellus et nisi porta, gravida fringilla tellus pretium.  |