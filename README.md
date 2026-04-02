# probably-a-table
A table. Probably.

## Description
Another table library nobody asked for.
There are a million better ones out there, but who’s going to stop me.

## Why I built this
Because I didn’t think of using an existing table library.
And by the time I realized it, it was already too late.

On the bright side, I learned a lot about generics, RTL and building libraries. And… learning to be a bit more responsible for my irresponsible ideas — like, you know, building an entire table library by accident.

## Exact origin
And do you know where this whole thing actually came from? Well… forget the table — I decided to build a microservices backend for some ML stuff in Python (which I don’t even know), hook it all together with an API gateway in Node, and then write a React front for it. At some point I needed a table.
And because I really didn’t feel like thinking about a stupid table, I kept asking AI to suggest tools and code snippets until I ended up with an anti‑reusable code‑Frankenstein.
And then… I needed another table.
And that’s when I got the idea to refactor all that spaghetti — and that’s how this library was born.

## Status
This project is in more or less active development.

### Features in 0.1
- the basic table with customizable cell rendering (see the API section to make your cells look super cool)
- simple search
- pagination
- ugly but working drag & drop
- toggling column visibility
- column sorting
- a working demo

### Known issues
Filters are temporarily broken (yes, I know) and commented out  
(none always looks better than broken, doesn’t it?).  
You can still find the code in the repo if you really want to waste your precious time looking at it.

RTL blows up inside the library but works in the original MLOps project — needs further investigation.

The API may change in upcoming releases.  
~~For example, pagination size configuration was supposed to be added soon — and don’t worry, no fancy generics this time, just a simple `number[]`.~~ 
Good news: it made it into v0.1.
Bad news: it’s not a simple number[] after all.
Good news: at least there are no generics involved.”

No button translations yet — just default English — and some `t()` leftovers here and there, which don’t work in isolation. I’ll fix it and add a translation option soon. Looks like an easy thing. *Looks.* We shall see.


## 1. Installation
### Requirements
- React 18
- Radix Themes
- Tailwind
- TypeScript

### Installation
`npm install probably-a-table`

In case you still want to play with it and don’t want to use npm (don’t harm yourself in such a way, unless you really enjoy it — I don’t judge) or there is no npm publish yet because lazy-always-busy-me didn’t do it yet (the only reasonable argument to look at this section), then:

Fork and clone the repo:  
`git clone here-paste-the-repo-link-for-cloning-not-the-url-to-be-clear`

Install dependencies:  
`npm i`

Install yalc globally in case you don’t have it (it’s something like a local npm):  
`npm i -g yalc`

Build and publish the library to your local yalc. Don’t worry, it will stay only on your computer and you’ll be able to install it in your projects just like with npm — the commands are just a bit different.

First build:  
`npm run build`

Then publish:  
`yalc publish`

Now you can close this project and open any project where you want to use my probably-a-table. Add the package using:  
`yalc add probably-a-table`

### Peer dependencies
Run this command regardless of whether you use npm or yalc:  
`npm install react react-dom @radix-ui/react-dropdown-menu @radix-ui/react-tooltip`

## 2. Quick Start
`import { ProbablyATable } from "probably-a-table";`

### The simplest component
```js
export default function App() {
  return (
    <ProbablyATable
      data={data}
      columns={columns}
      filters={filters}
      defaultFilters={filters}
    />
  );
}
```
Remember that this library requires Radix Theme (don’t confuse it with Radix UI).
So in your main.ts you need to wrap your app in `<Theme>` like this:
```js
<Theme>
    <App />
</Theme>
```
If you want the fancy colour switcher I have in my demo, just add `<ThemePanel>`:
```js    
<Theme>
    <ThemePanel />
    <App />
</Theme>
```

### Styles configuration
If you want your own styles from scratch, feel free to ignore this section.

Since the library is accidentally headless (= no styles), and you belong - like me - to the half of devs who would gladly yeet CSS into the sun, I have good news for you:
you can turn on styling without writing a single line of CSS — just copy‑paste the code below into your `index.css`:
```js 
@import "tailwindcss";
@import "@radix-ui/themes/styles.css";
.sr-only {
  visibility: hidden;
}
```
The `sr-only` class is for screen‑reader labels only and must stay invisible so it doesn’t mess with the normal UI. That’s why you need this class.
It’s also used for catching components in RTL tests.

In a future version I might add some built‑in styles and let you toggle them through props, but I’m not sure yet.

## 3. API Reference

### ProbablyATable props
- **data** — your raw table data as an array of any JSON objects. The table will swallow them as a generic type.
- **columns** — the column configuration object.
- **filters** — the filters configuration object (filters don’t work in version 0.1, so don’t bother — just copy‑paste the placeholder for now).
- **defaultFilters** — same structure as `filters`. I might merge them in the future, not sure yet.

---

### Examples of props

#### 1. `data`
`newData` is simply your dataset — whatever shape you want.  
This is what you pass to `<ProbablyATable data={newData} ...>`:

```js
export const newData: NewData[] = [
  {
    "id": 1,
    "name": "Vision Encoder v3",
    "description": "Model do ekstrakcji cech z obrazów.",
    "baseModel": "resnet50",
    "version": "3.2.1",
    "loraCount": 1,
    "status": "ready",
    "type": "vision",
    "tags": ["vision", "encoder"],
    "size": "98M",
    "details": "Model zoptymalizowany do szybkiej ekstrakcji cech."
  }
];
```

It’s nice if you create an interface for your data
(your future self will thank you… or curse me and my generics — more likely).

Why is it called `NewData`?
Because in the previous version I had Data, messed it up, made a new dataset, and naming it `NewData` felt… logical.
Is it descriptive? No.
Will the world collapse because of one off‑name? Hopefully not.

```js
export interface NewData {
  id: number;
  name: string;
  description: string;
  baseModel: string;
  version: string;
  loraCount: number;
  status: "ready" | "loading";
  type: string;
  tags: string[];
  size: string;
  details: string;
}
```
2. `columns`
Columns are of type TableColumnsColumns<T>, and this T is your interface — in this example:
TableColumnsColumns<NewData>.

Columns have four fields:
- *id* — must match the field names of NewData (keyof T).
The column needs to know which data field it represents.
- *label* — the column header.
Can be a string, translation, dynamic value — whatever you want.
- *visible* — controls visibility and works with the column visibility toggler.
- *render* — sounds serious, but it’s simple.
If you want plain text:
```js 
(row) => row.name
```
If you want fancy JSX:
```js 
(row) => (
  <Badge color={row.status === "ready" ? "green" : "amber"}>
    {row.status}
  </Badge>
)
```
3. `filters` and `defaultFilters`
Both are of type:
```js 
type TableFiltersFilters<Filters> = {
  [K in keyof Filters]: string;
};
```
Since filters are broken and hidden in version 0.1, all you need is:
- an interface
- an object with empty strings
- another object with empty strings
That’s it.

Interface:
```js 
export interface FiltersMock {
  query: string;
  status: string;
  type: string;
  tag: string;
  baseModel: string;
  loraMin: string;
  loraMax: string;
  sizeMin: string;
  sizeMax: string;
}
```

Filters:
```js
export const filterMock: TableFiltersFilters<FiltersMock> = {
  query: "",
  status: "",
  type: "",
  tag: "",
  baseModel: "",
  loraMin: "",
  loraMax: "",
  sizeMin: "",
  sizeMax: "",
};
```

Default filters:
```js
export const defaultFilters: TableFiltersFilters<FiltersMock> = {
  query: "",
  status: "",
  type: "",
  tag: "",
  baseModel: "",
  loraMin: "",
  loraMax: "",
  sizeMin: "",
  sizeMax: "",
};
```

To be honest, you don’t need to think about this at all — just copy‑paste these three things and feed them to <ProbablyATable>.
It requires them, but does nothing with them (yet).

4. `paginationConfig` - optional
It's totally fine if you don't provide this prop — it's optional.
In that case, ProbablyATable will load the default configuration:
```js 
const defaultPaginationConfig: TablePaginationPageSizeConfig = {
    defaultPageSize: 10,
    availablePageSizes: [5, 10, 20, 50, 100]
}
```
This means your table will show 10 rows by default (defaultPageSize),
and the page size menu will let you choose from: 5, 10, 20, 50, 100.

If you want a different setup, just create your own configuration object of type `TablePaginationPageSizeConfig`.


### Final result
```js
<ProbablyATable 
  columns={newDataColumns}
  data={newData}
  filters={filterMock}
  defaultFilters={defaultFilters}
/>
```

## 4. Types

Well… the descriptions in the props section should cover everything you might need.  
But I once had a very unpleasant experience with a popular UI library where I needed to dynamically generate partial data — and they didn’t export the types I needed.  
It turned into generics hell.

I don’t want you to curse me the way I cursed the creators of one of PrimeNG’s paid skins (the company I worked for actually bought it). I even asked a senior dev if I was doing something wrong — and he confirmed that no, the types simply weren’t exported and I had to find weird workarounds.

So I decided to give developers access to **every type I have**, because:

- devs are creative  
- I’m not yet sure what’s important and what’s not  
- and knowing my own creativity with that PrimeNG skin… I will probably never know

Here’s the full list of exported types:

```js type 
type TableData<T extends {
    id: string | number;
}> = T[];

type TableFiltersOpen = boolean;
type TableFiltersSetOpen = React.Dispatch<React.SetStateAction<TableFiltersOpen>>;
type TableFiltersIsPending = boolean;
type TableFiltersFilters<Filters> = {
    [K in keyof Filters]: string;
};
type TableFiltersSetFilters<T> = React.Dispatch<React.SetStateAction<TableFiltersFilters<T>>>;
type TableFiltersHandleReset = () => void;

type TableColumnsColumn<Data> = {
    id: Extract<keyof Data, string>;
    label: string;
    visible: boolean;
    render: (row: Data) => React.ReactNode;
};
type TableColumnsColumns<T> = TableColumnsColumn<T>[];
type TableColumnsToggleColumn = (id: string) => void;

type TableDragDragged = string | null;
type TableDragSetDragged = React.Dispatch<React.SetStateAction<TableDragDragged>>;
type TableDragHandleDrop = (targetKey: string) => void;

type TablePaginationPage = number;
type TablePaginationSetPage = React.Dispatch<React.SetStateAction<TablePaginationPage>>;
type TablePaginationTotalPages = number;
type TablePaginationPageSize = number;
type TablePaginationSetPageSize = React.Dispatch<React.SetStateAction<TablePaginationPageSize>>;
interface TablePaginationPageSizeConfig {
    defaultPageSize: number;
    availablePageSizes: number[];
}

type TableSearchSearch = string;
type TableSearchSetSearch = React.Dispatch<React.SetStateAction<TableSearchSearch>>;

type TableSortDirection = "asc" | "desc";
type TableSortSort<Data> = {
    column: TableColumnsColumn<Data> | null;
    direction: TableSortDirection;
};
type TableSortToggleSort<Data> = (column: TableColumnsColumn<Data> | null) => void;

interface ProbablyATableProps<Data extends {
    id: string | number;
}, Filters> {
    columns: TableColumnsColumns<Data>;
    data: TableData<Data>;
    filters: TableFiltersFilters<Filters>;
    defaultFilters: TableFiltersFilters<Filters>;
    paginationConfig?: TablePaginationPageSizeConfig;
}
declare function ProbablyATable<Data extends {
    id: string | number;
}, Filters>(props: ProbablyATableProps<Data, Filters>): react_jsx_runtime.JSX.Element;
```

## 5. Examples of table
All you need is this:
```js 
<ProbablyATable 
    columns={newDataColumns} 
    data={newData} 
    filters={filterMock} 
    defaultFilters={defaultFilters}
/>
```
Optionally:
```js 
<ProbablyATable 
    columns={newDataColumns} 
    data={newData} 
    filters={filterMock} 
    defaultFilters={defaultFilters}
    paginationConfig={paginationConfigData}
/>
```
And all your creativity goes into the render field.
Nothing else to mess with. Yet.
But filters will bring some fun. And pain...

## 6.Roadmap
### v 0.2
- [ ] Configurable menu position and visibility of its elements
- [ ] Merge `SimpleSearch` as a configurable part of the table
- [ ] Consider renaming some types — they’re really long, slightly epileptic in their current camelCase form, and honestly drive me mad
- [ ] Write a Python automation script so I don’t have to manually rewrite this README into the fancy JSX‑driven JSON that ProbablyATable likes
- [ ] Add an API to disable column sorting (I really hope no one gets the idea to sort my documentation steps alphabetically… unless someone genuinely enjoys puzzles). Also add a “reset sorting” button in the menu.
- [ ] Make filter props optional 


### v 0.3
- [ ] Fixing filters (read: remake them from scratch, but self‑generating and super cool, with zero consideration for feasibility — otherwise I’d never even touch this)

### Wishlist for the future
- [ ] Add optional built‑in styles so the table doesn’t depend on the user’s CSS setup
- [ ] RTL-friendly API
- [ ] JSDocs

## 7. Contributing
Emm… give me a moment, I’m new to this.
If you really want to contribute — amazing, thank you!
Just open an issue or a PR and I’ll try to figure out what to do with it.

More proper guidelines will appear here once I learn how to write them without crying.

## 8. Demo link
[Demo](https://bjeziorek.github.io/probably-a-table/)

## Changelog

### v0.1.2
- Fixed leftover i18n-related conflicts in dependencies. Removed `i18next` and `react-i18next` from `peerDependencies`.

- Fixed an issue with non‑unique keys. Added `uuid` to `peerDependencies`.

- Updated outdated settings in `tsconfig.json`.

### v0.1.1
- Minor improvements to the README.