import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function App() {
  const rowData = [
    { id: "1", name: "Name", value: 1 },
    { id: "2", name: "Name2", value: 32000 },
  ];

  const columnDefs: ColDef[] = [
    { field: "id" },
    { field: "name" },
    { field: "value" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>aaaaaaaaaaaaaaaaaaaa</h1>
      <div className="ag-theme-quartz" style={{ height: "500px" }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
}

export default App;