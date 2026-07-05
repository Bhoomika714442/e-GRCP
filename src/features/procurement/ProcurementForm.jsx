import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  vendor: yup.string().required("Vendor is required"),

  department: yup.string().required("Department is required"),

  category: yup.string().required("Category is required"),

  amount: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  priority: yup.string().required("Priority is required"),

  description: yup
    .string()
    .required("Description is required"),
});

const ProcurementForm = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      vendor: "",
      department: "",
      category: "",
      amount: "",
      priority: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    alert("Procurement Request Submitted Successfully");

    navigate("/procurement");
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        New Procurement Request
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Vendor"
              {...register("vendor")}
              error={!!errors.vendor}
              helperText={errors.vendor?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Department"
                  error={!!errors.department}
                  helperText={errors.department?.message}
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Operations">
                    Operations
                  </MenuItem>
                </TextField>
              )}
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

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              {...register("amount")}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Priority"
                  error={!!errors.priority}
                  helperText={errors.priority?.message}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">
                    Medium
                  </MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
            >
              Submit Request
            </Button>

            <Button
              sx={{ ml: 2 }}
              variant="outlined"
              onClick={() => navigate("/procurement")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProcurementForm;