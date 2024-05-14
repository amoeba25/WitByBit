import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";

const Contact = () => {
  const [contacts, setContacts] = useState([]); //state to maintain all the contact values
  const [columnVal, setColumnVal] = useState([]); // state to maintain columns that are displayed
  const [editedData, setEditedData] = useState({}); // changing the data for bulk update
  const [editing, setEditing] = useState(false); // editing state

  useEffect(() => {
    axios
      .get("http://localhost:8000/contact/entries/")
      .then((response) => {
        setContacts(response.data);

        // scans through data and creates
        // columns from the keys of the first objects in JSON data
        if (response.data.length > 0) {
          const keys = Object.keys(response.data[0]);
          const newColumns = keys.map((key) => ({
            Header:
              key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            accessor: key,
          }));
          setColumnVal(newColumns);
        }
      })
      .catch((error) => {
        console.error("Error occured while fetching contacts", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog and delete the contact if confirmed
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios
        .delete(`http://localhost:8000/contact/entries/${id}`)
        .then((response) => {
          // Remove the deleted contact from the state
          setContacts(contacts.filter((contact) => contact.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    }
  };

  const handleInputchange = (e, row, accessor) => {
    const value = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [row.id]: { ...prevState[row.id], [accessor]: value },
    }));
  };

  const handleSave = (row) => {
    // Here you can send the edited data to the backend to update the record
    console.log("Saving edited data:", editedData[row.id]);
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columnVal, data: contacts });

  return (
    <div className="App">
      {/* Edit button or Submit button logic  */}

      {editing ? (
        <div>
          <button onClick={toggleEditing}>Cancel</button>
          <button>Submit</button>
        </div>
      ) : (
        <button onClick={toggleEditing}>Edit</button>
      )}

      <div className="container">
        {contacts ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                  <th>delete</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        <input
                          type="text"
                          value={
                            editedData[row.id]?.[cell.column.id] || cell.value
                          }
                          disabled={!editing}
                          onChange={(e) =>
                            handleInputChange(e, row, cell.column.id)
                          }
                        />
                      </td>
                    ))}
                    <td>
                      {editing && (
                        <button onClick={() => handleDelete(row.original.id)}>
                          delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
