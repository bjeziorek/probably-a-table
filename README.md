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

RTL blow up in library but works in original MLOps projects, needs further investigation

The API may change in upcoming releases.  
For example, pagination size configuration will be added soon — and don’t worry, no fancy generics this time, just a simple `number[]`.

## 1. Installation
### Installation
//todo

### Peer dependencies
npm install react react-dom @radix-ui/react-dropdown-menu @radix-ui/react-tooltip

## 2. Quick Start
import { TableWrapper } from "probably-a-table";

```js export default function App() {
  return (
    <TableWrapper
      data={data}
      columns={columns}
      filters={filters}
      defaultFilters={filters}
    />
  );
}
````
## 3. API Reference
### TableWrapper props
- data
- columns
- filters
- defaultFilters

### Examples of props
// todo

## 4. Types
- TableData<T>
- TableColumnsColumns<T>
- TableFiltersFilters<T>
- TableSearchSearch
// todo

## 5. Examples of table
// todo

## Roadmap
### v 0.2
- [ ] RTL-friendly API
- [ ] Fixing filters
- [ ] Adding API for pagination configuration

## 6. Demo link
// to add