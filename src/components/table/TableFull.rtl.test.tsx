if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() { }
    unobserve() { }
    disconnect() { }
  };
}


import { fireEvent, render, screen } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { describe, expect, it, vi } from 'vitest';
import userEvent from "@testing-library/user-event";
import { TableFull } from './TableFull';
import type { TableColumnsColumns } from '../../types/columns';
import { TableContext } from '../../providers/TableProvider';

describe('TableHeader tests', () => {

  interface Data {
    name: string,
    id: number,
    age: number
  }

  it("renders TableHeader and TableBody", () => {
    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row: Data) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
      <Theme>
        <TableContext.Provider value={{ tableUUID: "renders-TableHeader-and-TableBody" }}>
          <TableFull
            columns={columns}
            paginated={data}
            setDragged={() => { }}
            handleDrop={() => { }}
            toggleSort={() => { }}
            sort={{ column: columns[0], direction: 'asc' }}
          />
        </TableContext.Provider>
      </Theme>
    );

    expect(screen.getByText((t) => t.includes("Name"))).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("passes columns to header and body", () => {
    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row: Data) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
      <Theme>
        <TableContext.Provider value={{ tableUUID: "renders-TableHeader-and-TableBody" }}>
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
      </TableContext.Provider>
      </Theme>
    );

    expect(screen.getByText((t) => t.includes("Name"))).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
  it("calls toggleSort when header is clicked", async () => {
    const user = userEvent.setup();
    const toggleSort = vi.fn();

    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
        <Theme>
        <TableContext.Provider value={{ tableUUID: "calls-toggleSort-when-header-is-clicked" }}>
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={toggleSort}
        sort={{ column: columns[0], direction: 'asc' }}
      />
      </TableContext.Provider>
      </Theme>
    );

    const header = screen.getByText((t) => t.includes("Name"));
    await user.click(header);

    expect(toggleSort).toHaveBeenCalledWith(columns[0]);
  });
  it("calls setDragged and handleDrop on drag events", () => {
    const setDragged = vi.fn();
    const handleDrop = vi.fn();

    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row) => row.name },
    ];
    const data = [{ id: 1, name: "Alice", age: 20 }];

    render(
        <Theme>
        <TableContext.Provider value={{ tableUUID: "calls-setDragged-and-handleDrop-on-drag-events" }}>
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={setDragged}
        handleDrop={handleDrop}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
      </TableContext.Provider>
      </Theme>
    );

    const header = screen.getByText((t) => t.includes("Name"));

    fireEvent.dragStart(header);
    fireEvent.drop(header);

    expect(setDragged).toHaveBeenCalledWith("name");
    expect(handleDrop).toHaveBeenCalledWith("name");
  });

  it("renders one row per item in paginated", () => {
    const columns: TableColumnsColumns<Data> = [
      { id: "name", label: "Name", visible: true, render: (row) => row.name },
    ];
    const data = [
      { id: 1, name: "Alice", age: 30 },
      { id: 2, name: "Bob", age: 20 },
    ];

    render(
        <Theme>
        <TableContext.Provider value={{ tableUUID: "renders-one-row-per-item-in-paginated" }}>
      <TableFull
        columns={columns}
        paginated={data}
        setDragged={() => { }}
        handleDrop={() => { }}
        toggleSort={() => { }}
        sort={{ column: columns[0], direction: 'asc' }}
      />
      </TableContext.Provider>
      </Theme>
    );

    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1 + data.length);
  });


});
