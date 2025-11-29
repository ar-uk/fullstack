// AddItem.tsx
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import type { Item } from "./types";

type AddItemProps = {
  addItem: (item: Item) => void;
};

function AddItem(props: AddItemProps) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
    product: "",
    amount: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    props.addItem(item);
    setItem({ product: "", amount: "" });
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Add Item
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>

        <DialogContent>
          <TextField
            label="Product"
            value={item.product}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setItem({ ...item, product: e.target.value })
            }
          />

          <TextField
            label="Amount"
            value={item.amount}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setItem({ ...item, amount: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItem;
