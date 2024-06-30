import { Button, Group, Paper, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/common";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddInventory() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      numberOfItems: "",
      date: "",
      pricePerUnit: "",
    },
  });

  const handleFormSubmit = async () => {
    const userId = localStorage.getItem("id");
    const inventoryData = { ...form.values, userId: userId };
    console.log(inventoryData);
    // return;
    try {
      const response = await fetch(`${serverUrl}/purchase/add`, {
        method: "POST",
        body: JSON.stringify(inventoryData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log(data)

      if (data) {
        toast('Purchase Added')
        navigate("/inventory");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition: Bounce,
        />
        {/* Same as */}
        <ToastContainer />
      <div style={{ width: "80%", backgroundColor: "#E9ECEF", marginTop: "20px", padding: "14px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3>Add New Inventory Item</h3>
          <Paper radius="md" p="xl">
            <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
              <Stack >
                <TextInput
                  required
                  label="Name"
                  placeholder="Item Name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  type="number"
                  label="Number of Items"
                  placeholder="Number of Items"
                  value={form.values.numberOfItems}
                  onChange={(event) =>
                    form.setFieldValue("numberOfItems", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  type="date"
                  label="Date"
                  value={form.values.date}
                  onChange={(event) =>
                    form.setFieldValue("date", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  type="number"
                  label="Price per Unit"
                  placeholder="Price per Unit"
                  value={form.values.pricePerUnit}
                  onChange={(event) =>
                    form.setFieldValue("pricePerUnit", event.currentTarget.value)
                  }
                  radius="md"
                />
                <Group  justify="end" mt="xl">
                  <Link to="/inventory" style={{ textDecoration: "none" }}>
                    <Button color="red" radius="xl">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" radius="xl">
                    Submit
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AddInventory;
