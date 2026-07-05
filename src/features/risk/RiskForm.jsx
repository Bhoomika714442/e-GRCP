import {
  Button,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  useForm,
  Controller,
} from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup.object({
  title: yup
    .string()
    .required("Risk title is required"),

  owner: yup
    .string()
    .required("Owner is required"),

  severity: yup
    .string()
    .required("Severity is required"),
});

const RiskForm = () => {
  const {
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({
          field,
          fieldState,
        }) => (
          <TextField
            {...field}
            label="Risk Title"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
          />
        )}
      />

      <Controller
        name="owner"
        control={control}
        defaultValue=""
        render={({
          field,
          fieldState,
        }) => (
          <TextField
            {...field}
            label="Owner"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
          />
        )}
      />

      <Controller
        name="severity"
        control={control}
        defaultValue=""
        render={({
          field,
          fieldState,
        }) => (
          <TextField
            {...field}
            select
            label="Severity"
            fullWidth
            margin="normal"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message
            }
          >
            <MenuItem value="Low">
              Low
            </MenuItem>

            <MenuItem value="Medium">
              Medium
            </MenuItem>

            <MenuItem value="High">
              High
            </MenuItem>
          </TextField>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Save Risk
      </Button>
    </form>
  );
};

export default RiskForm;