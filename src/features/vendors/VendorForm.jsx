import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  useForm,
  Controller,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Vendor name is required"),

  category: yup.string().required("Category is required"),

  contact: yup
    .string()
    .required("Contact person is required"),

  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),

  phone: yup
    .string()
    .required("Phone number is required"),

  status: yup
    .string()
    .required("Status is required"),
});

const VendorForm = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      status: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    alert("Vendor Added Successfully");

    navigate("/vendors");
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Add Vendor
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Vendor Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Category"
              {...register("category")}
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Person"
              {...register("contact")}
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="Active">
                    Active
                  </MenuItem>

                  <MenuItem value="Inactive">
                    Inactive
                  </MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
            >
              Save Vendor
            </Button>

            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() =>
                navigate("/vendors")
              }
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default VendorForm;